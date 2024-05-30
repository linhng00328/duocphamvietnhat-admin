import React, { Component } from "react";
import { connect } from "react-redux";
import getChannel from "../../ultis/channel"
import * as customerAction from "../../actions/customer_sales";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    console.log("page in customer", page);
    var params = this.props.getParams(this.props.filter_by_status , page)
    this.props.fetchAllCustomerSale(this.props.store_code, page , params);
    this.props.getPaginate(page)
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
      <nav aria-label="Page navigation" className={`float-pagination ${getChannel()}`}>
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.customers.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
