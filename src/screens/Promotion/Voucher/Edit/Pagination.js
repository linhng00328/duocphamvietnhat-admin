import React, { Component } from "react";
import { connect } from "react-redux";
import * as voucherAction from '../../../../actions/voucher';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    this.props.fetchVoucherCodes(
      this.props.store_code,
      this.props.vourcher_id, page, '', '', 10
    );
    this.props.setPage(page);
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
      <nav aria-label="Page navigation">
        <ul class="pagination  tab-pagination pg-blue">
          {this.showData(this.props.listVoucherCodes?.links)}
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchVoucherCodes: (store_code, vourcher_id, page, search_value, status, perpage) => {
      dispatch(voucherAction.fetchAllVoucherCodes(store_code, vourcher_id, page, search_value, status, perpage));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
