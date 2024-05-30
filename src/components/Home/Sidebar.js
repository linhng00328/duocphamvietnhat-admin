import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux"
import themeData from "../../ultis/theme_data";

class Sidebar extends Component {

  
  componentDidMount() {

    window.loadScript()
  }
 

  render() {

    var { badges } = this.props;
    return (
      <React.Fragment>
       <ul
        className="navbar-nav navbar-main sidebar sidebar-dark accordion"
        id="accordionSidebar"
       
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to={`/dashboard/duocphamnhatban`}
        >
          {/* <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div> */}
          <div class="sidebar-brand-icon ">
          <img width = "80%" src={badges?.config_user_vip?.url_logo_small_image != null ? badges?.config_user_vip?.url_logo_small_image : "/images/logo_tab.png"} class="img-responsive" alt="Image"/>
                </div>
          <div className="sidebar-brand-text">
            
            <img width = "80%" src={badges?.config_user_vip?.url_logo_image != null ? badges?.config_user_vip?.url_logo_image : "/images/logoikitech-do.jpg"}  class="img-responsive" alt="Image"/>
            
          </div>
        </Link>

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,

  };
};
export default connect(mapStateToProps, null)(Sidebar);
