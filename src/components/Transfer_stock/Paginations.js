import React, { Component } from "react";
import { connect } from "react-redux";

import * as productAction from "../../actions/product";
import { getBranchId } from "../../ultis/branchUtils";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  passPagination = (page) => {
    var { store_code, limit , agency_type_id,bonusParam } = this.props
    const branch_id =getBranchId()
    this.props.fetchAllProductV2(store_code, branch_id,page,bonusParam);

  }


  showData = (links) => {
    var result = null;
    var url = null
    if (typeof links == "undefined") {
      return result
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active_pos" : null;
        var label = (data.label.includes("&laquo; ") || data.label.includes(" &raquo;"))
          ? data.label.replace("&laquo; Previous", "Trước").replace("Next &raquo;", "Sau")
          : data.label
        if (data.url == null) {
          return (
            <li class={`page-item ${active} `}><a class="page-link" style={{ padding: "7px" }}>{label}</a></li>
          );
        }
        else {

          return (
            <li class={`page-item ${active} `}><a onClick={() => this.passPagination(data.url.split('?page=')[1])} class="page-link" style={{ padding: "7px" }}>{label}</a></li>
          );
        }

      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var links = this.props.products.links || []
    return (


      <nav aria-label="Page navigation" className={`float-pagination ${this.props.style}`}>
        <ul class="pagination  tab-pagination pg-blue" style={{ justifyContent: "flex-end", padding: "2px", margin: 0 }}>
          {this.showData(links)}
        </ul>
      </nav>


    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page,bonusParam) => {
      dispatch(productAction.fetchAllProductV2(store_code, branch_id, page,bonusParam));

    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);