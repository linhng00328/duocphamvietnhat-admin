import React, { Component } from "react";
import { connect } from "react-redux";
import * as reportAction from "../../actions/report";
// import * as billAction from "../../actions/bill";
import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import getChannel from "../../ultis/channel";

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

    var {
      store_code,
      branch_id,
      limit,
      searchValue,
      revenueExpendituresValue,
      setPage,
      datePrime,
      recipient_group,
      recipient_references_id,
    } = this.props;
    var params = null;

    // setPage(page);
    if (typeof recipient_group != "undefined" && recipient_references_id)
      params = `&recipient_group=${recipient_group}&recipient_references_id=${recipient_references_id}`;
    else
      params = `&search=${searchValue}&limit=${limit}&is_revenue=${
        revenueExpendituresValue || ""
      }`;

    if (datePrime)
      params =
        params + `&date_from=${datePrime?.from}&date_to=${datePrime?.to}`;
    if (typeof recipient_group != "undefined" && recipient_references_id)
      this.props.fetchAllRevenueExpenditures(
        store_code,
        branch_id,
        page,
        `&recipient_group=${recipient_group}&recipient_references_id=${recipient_references_id}`
      );
    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, page, params);
    else this.props.fetchReportExpenditure(store_code, branch_id, page, params);
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
              <a class="page-link"  onClick={() => this.passPagination(data?.url?.split("?page=")[1])}>{label}</a>
            </li>
          );
        } else {
          return (
            <li class={`page-item ${active} `}>
              <a
                onClick={() => this.passPagination(data?.url?.split("?page=")[1])}
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
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.revenueExpenditures.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllRevenueExpenditures: (id, branch_id, page, params) => {
      dispatch(
        revenueExpendituresAction.fetchAllRevenueExpenditures(
          id,
          branch_id,
          page,
          params
        )
      );
    },

    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
