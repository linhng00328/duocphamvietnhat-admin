import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import * as productAction from "../../actions/product";
import getChannel from "../../ultis/channel";
import { getBranchId } from "../../ultis/branchUtils";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPaginationProduct = (page) => {
    var {
      store_code,
      limit,
      searchValue,
      passNumPage,
      categorySelected,
      getParams,
    } = this.props;
    const params = getParams(searchValue, limit, categorySelected);
    passNumPage(page);
    history.push(`/product/index/${store_code}?page=${page}${params}`);
    this.props.fetchAllProductV2(store_code, getBranchId(), page, params);
  };
  passPagination = (page) => {
    var {
      store_code,
      limit,
      search,
      categorySelected,
      getParams,
      passNumPage,
    } = this.props;

    passNumPage(page);
    const params = getParams(search, limit, categorySelected);
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id, page, params);
    this.props.passNumPage(page);
  };

  passNumPage = (page) => {
    this.setState({ page: page });
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
              {this.props.pageProduct ? (
                <a
                  onClick={() =>
                    this.passPaginationProduct(data.url.split("?page=")[1])
                  }
                  class="page-link"
                >
                  {label}
                </a>
              ) : (
                <a
                  onClick={() =>
                    this.passPagination(data.url.split("?page=")[1])
                  }
                  class="page-link"
                >
                  {label}
                </a>
              )}
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
    var links = this.props.products.links || [];
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${this.props.style} ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
