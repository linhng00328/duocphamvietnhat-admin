import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as staffAction from "../../../actions/staff";
import { getBranchId } from "../../../ultis/branchUtils";

const TableStyles = styled.div`
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
  .total_customers,
  .name_customers {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      is_sale: false,
    };
  }

  onChange = (e, id) => {
    const checked = e.target.checked;
    const { updateCustomerToSale, store_code } = this.props;

    const data = {
      is_sale: checked,
    };
    const branch_id = getBranchId();
    updateCustomerToSale(store_code, id, data, branch_id);
  };
  handleShowSidebar = (data) => {
    const { setSaleInfo, setShowCustomerOfSale } = this.props;
    setSaleInfo(data);
    setShowCustomerOfSale(true);
  };

  showData = (staff) => {
    var result = null;
    const { role, handleShowStatistical } = this.props;
    if (staff.length > 0) {
      result = staff.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{index + 1}</td>
            <td>
              <span
                className="primary name_customers"
                onClick={() => handleShowStatistical(data)}
              >
                {data.name}
              </span>
            </td>
            <td>{data.username}</td>
            <td>{data.phone_number}</td>
            {role === "all" ? (
              <td>
                <label
                  className="status-product"
                  onClick={this.handleChangeStatusProduct}
                >
                  <input
                    type="checkbox"
                    hidden
                    name="is_sale"
                    value={data.is_sale}
                    checked={data.is_sale}
                    onChange={(e) => this.onChange(e, data.id)}
                  />
                  <div></div>
                </label>
              </td>
            ) : null}
            <td>
              <span
                className="total_customers primary"
                onClick={() => this.handleShowSidebar(data)}
              >
                {data.total_customers}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              {data.online ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "green",
                      height: "16px",
                      width: "16px",
                      borderRadius: "50%",
                      marginTop: "2px",
                      marginRight: "6px",
                    }}
                  ></div>

                  <div>Online</div>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "red",
                      height: "16px",
                      width: "16px",
                      borderRadius: "50%",
                      marginTop: "2px",
                      marginRight: "6px",
                    }}
                  ></div>

                  <div>Offline</div>
                </div>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    const { data, role } = this.props;

    return (
      <TableStyles class="table-responsive">
        <table class="table" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>

              <th>Tên tài khoản</th>
              <th>Số điện thoại</th>
              {role === "all" ? <th>Sale</th> : null}
              <th>Số lượng khách hàng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>{this.showData(data)}</tbody>
        </table>
      </TableStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateCustomerToSale: (store_code, id, data, branch_id) => {
      dispatch(
        staffAction.updateCustomerToSale(store_code, id, data, branch_id)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
