import React, { Component } from "react";
import { connect } from "react-redux";
import * as reportAction from "../../../actions/report";
import { getBranchId, getBranchIds } from "../../../ultis/branchUtils";
import { insertParam } from "../../../ultis/helpers";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    var { time_from, time_to, setPaginate } = this.props;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = `${branch_ids ? "" : `branch_id=${branch_id}`}`;

    if (time_to != "" && time_to != null) {
      params = params + `&date_to=${time_to}`;
    }
    if (time_from != "" && time_from != null) {
      params = params + `&date_from=${time_from}`;
    }
    insertParam({
      page: page,
    });
    setPaginate(page);
    this.props.fetchAllInventoryHistory(
      this.props.store_code,
      branchIds,
      page,
      params
    );
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
          {this.showData(this.props.reportHistory.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllInventoryHistory: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchAllInventoryHistory(
          store_code,
          branch_id,
          page,
          params
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
