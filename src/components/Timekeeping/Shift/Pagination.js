import React, { Component } from "react";
import { connect } from "react-redux";

// import * as billAction from "../../actions/bill";
import * as shiftAction from "../../../actions/shift";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      // status: null,
      // isStatus : ""
    };
  }

  passPagination = (page) => {
    // var { store_code, status_payment , status_order , limit , searchValue } = this.props

    var { store_code, branch_id, limit } = this.props;
    // var params = `&order_status_code=${status_order}&payment_status_code=${status_payment}&limit=${limit}`;
    var params = `&limit=${limit}`;

    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, page, params);
    this.props.fetchAllShift(store_code, branch_id, page, params);
  };

  showData = (links) => {
    var result = null;
    var url = null;
    if (typeof links == "undefined") {
      return result;
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label =
          data.label.includes("&laquo; ") || data.label.includes(" &raquo;")
            ? data.label
                .replace("&laquo; Previous", "Trước")
                .replace("Next &raquo;", "Sau")
            : data.label;
        if (data.url == null) {
          return (
            <li class={`page-item ${active} `}>
              <a class="page-link">{label}</a>
            </li>
          );
        } else {
          return (
            <li class={`page-item ${active} `}>
              <a
                onClick={() => this.passPagination(data.url.split("?page=")[1])}
                class="page-link"
              >
                {label}
              </a>
            </li>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    return (
      <nav aria-label="Page navigation" className="float-pagination">
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.shifts?.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    // fetchAllRevenueExpenditures: (id, branch_id, page, params) => {
    //   dispatch(
    //     revenueExpendituresAction.fetchAllRevenueExpenditures(
    //       id,
    //       branch_id,
    //       page,
    //       params
    //     )
    //   );
    // },

    fetchAllShift: (store_code, branch_id, page, params) => {
      dispatch(shiftAction.fetchAllShift(store_code, branch_id, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
