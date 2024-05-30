import React, { Component } from "react";
import { connect } from "react-redux";

import * as agencyAction from "../../../actions/agency";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 1
    }
  }

  passPagination = (page) => {
    this.props.fetchAllAgency(this.props.store_code , page)    
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
            <li key ={index} class={`page-item ${active} `}><a class="page-link">{label}</a></li>
          );
        }
        else{
     
          return (
            <li key ={index} class={`page-item ${active} `}><a onClick = {()=> this.passPagination(data.url.split('?page=')[1])} class="page-link">{label}</a></li>
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
    {this.showData(this.props.topReport.links)}
  </ul>
</nav>
   
        
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchAllAgency: (store_code , page) => {
      dispatch(agencyAction.fetchAllAgency(store_code , page));
    },
  };
};
export default connect(null, mapDispatchToProps)(Pagination);