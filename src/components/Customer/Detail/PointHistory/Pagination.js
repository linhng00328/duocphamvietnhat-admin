import React, { Component } from "react";
import { connect } from "react-redux";

import { getBranchId } from "../../../../ultis/branchUtils";
import getChannel from "../../../../ultis/channel";
import * as customerAction from "../../../../actions/customer";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      status: null,
      isStatus: ""
    }
  }

  passPagination = (page) => {
    var { store_code, customer } = this.props
    const branch_id = getBranchId()
    var params = null
    this.props.fetchAllPointHistory(customer , store_code, page, getBranchId());


  }



  showData = (links) => {
    var result = null;
    var url = null
    if (typeof links == "undefined") {
      return result
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label = (data.label.includes("&laquo; ") || data.label.includes(" &raquo;"))
          ? data.label.replace("&laquo; Previous", "Trước").replace("Next &raquo;", "Sau")
          : data.label
        if (data.url == null) {
          return (
            <li class={`page-item ${active} `}><a class="page-link">{label}</a></li>
          );
        }
        else {

          return (
            <li class={`page-item ${active} `}><a onClick={() => this.passPagination(data.url.split('?page=')[1])} class="page-link">{label}</a></li>
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
          {this.showData(this.props.bills.links)}
        </ul>
      </nav>


    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchAllPointHistory: (id, store_code , page, branch_id, params) => {
        dispatch(customerAction.fetchAllPointHistory(id, store_code,page, branch_id, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);