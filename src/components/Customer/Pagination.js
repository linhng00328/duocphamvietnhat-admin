import React, { Component } from "react";
import { connect } from "react-redux";
import getChannel from "../../ultis/channel";
import * as customerAction from "../../actions/customer";
import * as saleAction from "../../actions/sale";
import history from "../../history";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    const {
      searchValue,
      store_code,
      isSale,
      fetchAllCustomer,
      fetchListCustomerOfSale,
    } = this.props;
    const jsonListFilter = localStorage.getItem("optionsFilter");
    var params = `&search=${searchValue}&json_list_filter=${jsonListFilter}`;
    if (isSale()) {
      history.push(
        `/customer/${store_code}/customerSale?page=${page}&search=${searchValue}&json_list_filter=${jsonListFilter}`
      );
      fetchListCustomerOfSale(store_code, page, params);
    } else {
      history.push(
        `/customer/${store_code}?page=${page}&search=${searchValue}&json_list_filter=${jsonListFilter}`
      );
      fetchAllCustomer(store_code, page, params);
    }
    this.props.getPaginate(page);
  };
  handlePaginationReferralPhone = (page) => {
    this.props.setPageReferralPhone(page);
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
              {this.props.setPageReferralPhone === undefined ? (
                <a
                  onClick={() =>
                    this.passPagination(data.url.split("?page=")[1])
                  }
                  class="page-link"
                >
                  {label}
                </a>
              ) : (
                <a
                  onClick={() =>
                    this.handlePaginationReferralPhone(
                      data.url.split("?page=")[1]
                    )
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
    return (
      <nav
        aria-label="Page navigation"
        className={`float-pagination ${getChannel()}`}
      >
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.customers.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (store_code, page, params) => {
      dispatch(customerAction.fetchAllCustomer(store_code, page, params));
    },
    fetchListCustomerOfSale: (store_code, page, queryString) => {
      dispatch(
        saleAction.fetchListCustomerOfSale(store_code, page, queryString)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
