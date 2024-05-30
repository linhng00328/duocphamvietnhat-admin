import React, { Component } from "react";
import { connect } from "react-redux";
import getChanel from "../../../ultis/channel";

import * as bonusProductsAction from "../../../actions/bonus_product";
import { insertParam } from "../../../ultis/helpers";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  fetchAllBonusProductEnd = (page) => {
    var { store_code, setPage } = this.props;
    insertParam({
      page,
    });
    setPage(page);
    this.props.fetchAllBonusProductEnd(store_code, page);
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
                onClick={() =>
                  this.fetchAllBonusProductEnd(data.url.split("?page=")[1])
                }
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
    var { display, bonusProducts } = this.props;
    var links =
      typeof bonusProducts.links !== "undefined" ? bonusProducts.links : [];
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${display} ${getChanel()}`}
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
    fetchAllBonusProductEnd: (store_code, page) => {
      dispatch(bonusProductsAction.fetchAllBonusProductEnd(store_code, page));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
