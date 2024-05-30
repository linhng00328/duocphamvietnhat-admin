import React, { Component } from "react";
import { connect } from "react-redux";
import * as reportAction from "../../../../actions/report"
import { getBranchId } from "../../../../ultis/branchUtils";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 1
    }
  }

  passPagination = (page) => {
    const branch_id = getBranchId()
    var { time_from, time_to } = this.props
    var params = ``

    if (time_to != "" && time_to != null) {
      params = params + `&date_to=${time_to}`;

    }
    if (time_from != "" && time_from != null) {
      params = params + `&date_from=${time_from}`;
    }
    this.props.fetchReportExpenditure(this.props.store_code,branch_id , page,params)    
}



  showData = (links) => {
    var result = null;
    var url = null
    if(typeof links == "undefined")
    {
      return result
    }
    if (links.length > 0) {
      result = links.map((data, index) => {
        var active = data.active == true ? "active" : null;
        var label = (data.label.includes("&laquo; ") || data.label.includes(" &raquo;")) 
        ? data.label.replace("&laquo; Previous", "Trước").replace("Next &raquo;", "Sau")
        : data.label
        if(data.url == null)
        {
          return (
            <li class={`page-item ${active} `}><a class="page-link">{label}</a></li>
          );
        }
        else{
     
          return (
            <li class={`page-item ${active} `}><a onClick = {()=> this.passPagination(data.url.split('?page=')[1])} class="page-link">{label}</a></li>
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
        
   
<nav aria-label="Page navigation" className="float-pagination">
  <ul class="pagination  tab-pagination pg-blue">
    {this.showData(this.props.reportExpenditure.links)}
  </ul>
</nav>
        
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportExpenditure: (store_code, branch_id,page, params) => {
      dispatch(reportAction.fetchReportExpenditure(store_code, branch_id,page, params))
    }
  };
};
export default connect(null, mapDispatchToProps)(Pagination);