import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";

import Alert from "../../../components/Partials/Alert";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import NotAccess from "../../../components/Partials/NotAccess";
import RequestRemote from "../../../components/Timekeeping/Request/RequestRemote/index";
import RequestMobile from "../../../components/Timekeeping/Request/RequestMobile/index";
// import FooterTheme from "../../components/Theme/Footer/index";

import * as calendarShiftAction from "../../../actions/calendar_shift";
import { Redirect, Link } from "react-router-dom";

import Loading from "../../Loading";
import { shallowEqual } from "../../../ultis/shallowEqual";

import moment from "moment";
import * as helper from "../../../ultis/helpers";
import { getBranchId } from "../../../ultis/branchUtils";
// import ModalPostDate from "../../../components/Timekeeping/CalendarShift/ModalPostDates";
// import ModalPut from "../../../components/Timekeeping/CalendarShift/PutALot/Modal";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
    };
  }
  componentDidMount() {
    var { store_code } = this.props.match.params;
    console.log(store_code);
  }

  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };

  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.timekeeping != "undefined") {
        var permissions = this.props.permission
        // var insert = permissions.timekeeping_shift_add
        // var update = permissions.timekeeping_shift_update
        // var _delete = permissions.timekeeping_shift_delete

        var isShow = permissions.timekeeping

        this.setState({ isLoading: true, insert:true, update:true, _delete:true ,isShow})

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
                      Xử lý yêu cầu
                    </h4>
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <Tabs
                        defaultIndex={0}
                        onSelect={(index) => this.fetchDataOnTap(index)}
                      >
                        <TabList>
                          <Tab>
                            <i class="fa fa-wifi"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Danh sách yêu cầu chấm công từ xa
                            </span>
                          </Tab>

                          <Tab>
                            <i class="fa fa-mobile"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Danh sách thiết bị yêu cầu
                            </span>
                          </Tab>
                        </TabList>

                        <TabPanel>
                          <RequestRemote
                            tabId={tabId}
                            branch_id={branch_id}
                            store_code={store_code}
                          />
                        </TabPanel>
                        <TabPanel>
                          <RequestMobile
                            tabId={tabId}
                            branch_id={branch_id}
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
export default connect(mapStateToProps, mapDispatchToProps)(Request);
