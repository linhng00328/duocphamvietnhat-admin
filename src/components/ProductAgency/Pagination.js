import React, { Component } from "react";
import { connect } from "react-redux";
import getChannel from "../../ultis/channel";

import * as productAction from "../../actions/product";
import history from "../../history";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    var {
      store_code,
      limit,
      searchValue,
      agency_type_id,
      categorySelected,
      categoryChildSelected,
      getParams,
    } = this.props;
    var params = getParams(
      searchValue,
      limit,
      categorySelected,
      categoryChildSelected
    );
    // this.props.fetchAllProduct(store_code , page,params, agency_type_id)
    this.props.passNumPage(page);
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=${page}${params}`
    );
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
    var links = this.props.products.links || [];
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${this.props.style} ${getChannel()}`}
        style={{ paddingRight: "13px" }}
      >
        <ul
          class="pagination  tab-pagination pg-blue"
          style={{ justifyContent: "flex-end" }}
        >
          {this.showData(links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (store_code, page, params, agency_type_id) => {
      dispatch(
        productAction.fetchAllProduct(store_code, page, params, agency_type_id)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
