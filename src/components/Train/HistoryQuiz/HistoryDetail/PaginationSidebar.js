import React, { Component } from "react";
import { connect } from "react-redux";

import * as trainAction from "../../../../actions/train";
import getChannel from "../../../../ultis/channel";
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
      customerId,
      limit,
      setPage,
      historyInfo,
      getDetailQuizHistoryForCustomer,
    } = this.props;
    setPage(page);

    getDetailQuizHistoryForCustomer(
      store_code,
      customerId,
      historyInfo?.id,
      `page=${page}&limit=${limit}`
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
    var links = this.props.allHistoryCustomerTryTrainQuiz.links || [];
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
    getDetailHistoryQuizzesForCustomer: (store_code, customer_id, params) => {
      dispatch(
        trainAction.getDetailHistoryQuizzesForCustomer(
          store_code,
          customer_id,
          params
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);
