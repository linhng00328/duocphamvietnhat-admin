import React, { Component } from "react";
import { formatNoD } from "../../../../ultis/helpers";

import * as themeAction from "../../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as customerAction from "../../../../actions/customer";
import { getBranchId } from "../../../../ultis/branchUtils";
import * as Env from "../../../../ultis/default";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { customerId, store_code } = this.props;
    this.props.fetchAllPointHistory(customerId, store_code, 1, getBranchId());
  }

  showBills = (listBills) => {
    var result = null;
    var { store_code } = this.props;
    if (typeof listBills == "undefined") {
      return result;
    }
    if (listBills.length > 0) {
      result = listBills.map((bill, index) => {
        return (
          <tr style={{ cursor: "pointer" }}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/order/detail/${store_code}/${bill.references_value}`}>
                {bill.references_value}
              </Link>
            </td>

            <td>{formatNoD(bill.point)}</td>
            <td>{bill.content}</td>

            <td>{bill.updated_at}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, pointHistory, customer } = this.props;
    var listBills = pointHistory.data;
    return (
      <div className="support">
        <form role="form">
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>

            <div className="form-group">
              <label htmlFor="name">
                Xu hiện tại:&nbsp;
                {customer.points > 0 ? formatNoD(customer.points || 0) : 0}
              </label>

              <div class="table-responsive">
                <table class="table table-hover table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã liên kết</th>
                      <th>Số xu</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>{this.showBills(listBills)}</tbody>
                </table>
              </div>
              <Pagination
                customer={this.props.customerId}
                store_code={store_code}
                bills={pointHistory}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducers.customer.customerID,
    pointHistory: state.customerReducers.customer.pointHistory,

    theme: state.themeReducers.theme,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    fetchTheme: (store_code) => {
      dispatch(themeAction.fetchTheme(store_code));
    },
    fetchAllPointHistory: (id, store_code, page, branch_id, params) => {
      dispatch(
        customerAction.fetchAllPointHistory(
          id,
          store_code,
          page,
          branch_id,
          params
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
