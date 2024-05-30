import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString, formatNoD } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
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

  showData = (topReport) => {
    var { store_code } = this.props;
    var result = null;
    if (topReport.length > 0) {
      result = topReport.map((data, index) => {
        var avatar =
          data.customer.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.customer.avatar_image;
        var img_front =
          data.front_card == null ? Env.IMG_NOT_FOUND : data.front_card;
        var img_back =
          data.back_card == null ? Env.IMG_NOT_FOUND : data.back_card;

        var address_default = "";

        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>{index + 1}</td> <td>{data.customer?.name}</td>{" "}
              <td>{data.customer?.phone_number}</td>
              <td>
                {typeof data.balance != "undefined"
                  ? format(Number(data.balance))
                  : null}
              </td>
              <td>{formatNoD(data.orders_count)}</td>
              <td>
                {typeof data.sum_share_agency != "undefined"
                  ? format(Number(data.sum_share_agency))
                  : 0}
              </td>
              <td>
                {typeof data.sum_total_after_discount != "undefined"
                  ? format(Number(data.sum_total_after_discount))
                  : 0}
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
      <div class="table-responsive">
        <table class="table table-border">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Số dư hiện tại</th>

              <th>Số đơn hàng</th>

              <th>Tổng hoa hồng</th>
              <th>Tổng doanh số</th>
            </tr>
          </thead>

          <tbody>{this.showData(topReport)}</tbody>
        </table>
      </div>
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
