import React, { Component } from "react";
import { connect } from "react-redux";

import * as billAction from "../../actions/bill";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import getChannel from "../../ultis/channel";
import { insertParam } from "../../ultis/helpers";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      status: null,
      isStatus: "",
    };
  }

  passPagination = (page) => {
    var {
      store_code,
      status_payment,
      status_order,
      limit,
      searchValue,
      hasPhone,
      phone,
      time_to,
      time_from,
      orderFrom,
      collaborator_by_customer_id,
      statusTime,
      getParams,
      setPaginate,
    } = this.props;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = "";
    if (hasPhone) params = `&phone_number=${phone}`;
    else
      params = getParams(
        time_from,
        time_to,
        searchValue,
        status_order,
        status_payment,
        limit,
        orderFrom,
        collaborator_by_customer_id,
        statusTime
      );

    if (setPaginate) {
      setPaginate(page);
    }

    insertParam({ page: page });
    var params_agency =
      this.props.agency_by_customer_id != null
        ? `&agency_by_customer_id=${this.props.agency_by_customer_id}`
        : null;
    this.props.fetchAllBill(store_code, page, branchIds, params, params_agency);
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
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.bills.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params, param_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, param_agency)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
