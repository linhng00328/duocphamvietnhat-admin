import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../history";
import * as productAction from "../../actions/product";
import getChannel from "../../ultis/channel";
import * as otpUnitAction from "../../actions/otp_unit";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  passPagination = (page) => {
    var { store_code } = this.props;
    this.passNumPage(page);

    this.props.fetchHistorySMS(store_code, `page=${page}`);
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
    var links = this.props.allHistorySMS.links || [];
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
    fetchHistorySMS: (store_code, params) => {
      dispatch(otpUnitAction.fetchHistorySMS(store_code, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
