import React, { Component } from "react";
import { connect } from "react-redux";
import * as ImportAction from "../../actions/import_stock";
import history from "../../history";
import { getBranchId } from "../../ultis/branchUtils";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    const branch_id = getBranchId();
    var { filterStatus, searchValue, store_code, setPage } = this.props;
    var params = "";
    if (filterStatus) params = params + `&status_list=${filterStatus}`;

    params += params + `&page=${page}&search=${searchValue}`;
    setPage(page);
    history.push(
      `/import_stocks/index/${store_code}?page=${page}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    this.props.fetchAllImportStock(store_code, branch_id, page, params);
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
          {this.showData(this.props.listImportStock.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllImportStock: (store_code, branch_id, page, params) => {
      dispatch(
        ImportAction.fetchAllImportStock(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
