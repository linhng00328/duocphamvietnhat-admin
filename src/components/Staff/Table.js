import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getBranchId } from "../../ultis/branchUtils";
import * as Env from "../../ultis/default";
import { format } from "../../ultis/helpers";
import * as staffAction from "../../actions/staff";
import { connect } from "react-redux";

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
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  passDataModal = (event, store_code, name) => {
    this.props.handleDelCallBack({
      table: "Nhân viên",
      id: store_code,
      name: name,
    });
    event.preventDefault();
  };

  showData = (staff) => {
    console.log(staff);
    var { store_code } = this.props;
    var result = null;
    if (staff.length > 0) {
      var { update, _delete } = this.props;

      result = staff.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";

        return (
          <tr className="hover-product">
            <td>{index + 1}</td>
            <td>{data.name}</td>

            <td>{data.username}</td>
            <td>{data.phone_number}</td>

            {/* <td>
              {data.salary_one_hour != null ? format(data.salary_one_hour) : ""}
            </td> */}
            <td>{decentralization}</td>
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

            <td style={{ display: "flex" }}>
              <Link
                to={`/staff/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${
                  update == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.passDataModal(e, data.id, data.name)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${
                  _delete == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
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
    return (
      <TableStyles class="table-responsive">
        <table class="table  " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>

              <th>Tên tài khoản</th>
              <th>Số điện thoại</th>

              {/* <th>Lương theo giờ</th> */}

              <th>Vai trò</th>
              <th>Sale</th>
              <th>Trạng thái</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
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
