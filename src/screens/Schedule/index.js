import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";

import Alert from "../../components/Partials/Alert";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import NotAccess from "../../components/Partials/NotAccess";
import Schedule from "./Schedule";
import Popup from "../Popup/index";
// import FooterTheme from "../../components/Theme/Footer/index";

import * as calendarShiftAction from "../../actions/calendar_shift";
import { Redirect, Link } from "react-router-dom";

import { shallowEqual } from "../../ultis/shallowEqual";

import moment from "moment";
import * as helper from "../../ultis/helpers";
import { getBranchId } from "../../ultis/branchUtils";
// import ModalPostDate from "../../components/Timekeeping/CalendarShift/ModalPostDates";
// import ModalPut from "../../components/Timekeeping/CalendarShift/PutALot/Modal";

class Accountant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
      isShow: true,
    };
    this.defaultIndex =  0

  }
  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var tabIndex = urlParams.get('tab-index');
    if (!tabIndex) {
      tabIndex = 0;
    }
    this.defaultIndex = tabIndex;

  }

  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.revenue_expenditure != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.notification_schedule_list;
      this.setState({ isLoading: true, isShow });
    }
  }
  render() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    var { isShow, tabId } = this.state;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Lên lịch thông báo
                    </h4>
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div className="">
                      <Tabs
                        defaultIndex={this.defaultIndex}
                        onSelect={(index) => this.fetchDataOnTap(index)}
                      >
                        <TabList>
                          <Tab>
                       
                            <Link to ={"?tab-index=0"}>     <i class="fa fa-calendar"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Lịch thông báo đẩy
                            </span></Link>
                          </Tab>

                          <Tab>
                          <Link to ={"?tab-index=1"}>       <i class="fa fa-bell"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Popup quảng cáo
                            </span></Link>
                          
                          </Tab>
                        </TabList>

                        <TabPanel>
                          <Schedule
                            tabId={tabId}

                            store_code={store_code}
                          />
                        </TabPanel>
                        <TabPanel>
                          <Popup
                            tabId={tabId}

                            store_code={store_code}
                          />
                        </TabPanel>
                      </Tabs>
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,

    permission: state.authReducers.permission.data,

    alert: state.themeReducers.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Accountant);
