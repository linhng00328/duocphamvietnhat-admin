import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString, formatNoD } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import styled from "styled-components";

const TableStyles = styled.div`
  .sale__countCustomer {
    color: #36a1e9;
    &:hover {
      color: #2980b9;
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFrist: false,
    };
  }

  showChatBox = (agencyId, status) => {
    this.props.handleShowChatBox(agencyId, status);
  };

  componentDidMount() {
    this.setState({ loadFrist: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (!shallowEqual(prevProps.topReport, this.props.topReport) &&
        prevProps.topReport.length == 0) ||
      prevProps.tabId != 1 ||
      prevState.loadFrist != this.state.loadFrist
    ) {
      helper.loadExpandTable();
    }
  }

  onChangeStatus = (e, id) => {
    var checked = !this["checked" + id].checked;
    var status = checked == true ? 1 : 0;
    this.props.updateAgency(this.props.store_code, id, {
      status: status,
    });
  };

  changeAgencyType = (e, id) => {
    var value = e.target.value;
    this.props.updateAgency(this.props.store_code, id, {
      agency_type_id: value,
    });
  };
  handleShowSidebar = (data) => {
    const { setSaleInfo, setShowCustomerOfSale } = this.props;
    setSaleInfo(data);
    setShowCustomerOfSale(true);
  };
  showData = (topReport) => {
    var { store_code } = this.props;
    var result = null;
    if (topReport.length > 0) {
      result = topReport.map((data, index) => {
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>{index + 1}</td> <td>{data.name}</td>{" "}
              <td>{data.phone_number}</td>
              <td
                className="sale__countCustomer"
                onClick={() => this.handleShowSidebar(data)}
              >
                {typeof data.total_customer_in_filer != "undefined"
                  ? Number(data.total_customer_in_filer)
                  : null}
              </td>
              <td>{formatNoD(data.orders_count)}</td>
              <td>
                {typeof data.sum_total_after_discount_no_use_bonus !=
                "undefined"
                  ? `${format(
                      Number(data.sum_total_after_discount_no_use_bonus)
                    )}`
                  : "0 ₫"}
              </td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var topReport =
      typeof this.props.topReport.data == "undefined"
        ? []
        : this.props.topReport.data;
    return (
      <TableStyles class="table-responsive">
        <table class="table table-border">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Số khách hàng</th>

              <th>Số đơn hàng</th>

              <th>
                Tổng doanh số(
                {typeof this.props.topReport
                  .sum_total_after_discount_no_use_bonus != "undefined"
                  ? `${format(
                      Number(
                        this.props.topReport
                          .sum_total_after_discount_no_use_bonus
                      )
                    )}`
                  : "0 ₫"}
                )
              </th>
            </tr>
          </thead>

          <tbody>{this.showData(topReport)}</tbody>
        </table>
      </TableStyles>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgency: (store_code, id, data) => {
      dispatch(agencyAction.updateAgency(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
