import React, { Component } from "react";
import { connect } from "react-redux";
import getChannel from "../../../ultis/channel";
import * as agencyAction from "../../../actions/agency";
import { insertParam } from "../../../ultis/helpers";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    var {
      searchValue,
      numPage,
      getParams,
      setPage,
      store_code,
      fetchAllAgency,
      typeAgency,
    } = this.props;
    insertParam({ page: page });
    setPage(page);
    fetchAllAgency(
      store_code,
      page,
      getParams(searchValue, typeAgency, numPage)
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
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.agencys.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
