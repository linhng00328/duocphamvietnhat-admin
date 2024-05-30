import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalCreate from "../../components/Collaborator/Config/ModalCreate";
import ModalUpdate from "../../components/Collaborator/Config/ModalUpdate";
import ModalRemove from "../../components/Collaborator/Config/ModalRemove";
import TopReport from "../../components/Collaborator/TopReport";

import Alert from "../../components/Partials/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Config from "../../components/Collaborator/Config";
import ListCollaborator from "../../components/Collaborator/ListCollaborator";
import ListCollaboratorRegisterRequest from "../../components/Collaborator/CollaboratorRegisterRequest";
import HistoryPayment from "../../components/Collaborator/HistoryPayment";
import RequestPayment from "../../components/Collaborator/RequestPayment";
import NotAccess from "../../components/Partials/NotAccess";

class collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {},
      tabId: 0,
    };
    this.defaultIndex =
      this.props.match.params.action == "request_payment" ? 2 : 0;
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };

  handleEditCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };
  fetchDataOnTap = (index) => {
    this.setState({ tabId: index });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var collaborator_view = permissions.collaborator_view;
      var collaborator_config = permissions.collaborator_config;
      var collaborator_register = permissions.collaborator_register;
      var collaborator_top_sale = permissions.collaborator_top_sale;
      var collaborator_payment_request_list =
        permissions.collaborator_payment_request_list;
      var collaborator_payment_request_history =
        permissions.collaborator_payment_request_history;
      var collaborator_add_sub_balance =
        permissions.collaborator_add_sub_balance;
      var isShow = permissions.collaborator_list;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      var tabIndex = urlParams.get("tab-index");
      if (!tabIndex) {
        tabIndex = 0;
      }
      this.defaultIndex = tabIndex;
      this.setState({
        isLoading: true,
        isShow,
        collaborator_view,
        collaborator_config,
        collaborator_register,
        collaborator_top_sale,
        collaborator_payment_request_list,
        collaborator_payment_request_history,
        collaborator_add_sub_balance,
      });
    }
  }
  render() {
    var { store_code, id } = this.props.match.params;
    var {
      tabId,
      tabDefault,
      collaborator_view,
      collaborator_config,
      collaborator_register,
      collaborator_top_sale,
      collaborator_payment_request_list,
      collaborator_payment_request_history,
      collaborator_add_sub_balance,
      isShow,
    } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
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
                      Cộng tác viên
                    </h4>{" "}
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <Tabs
                        defaultIndex={this.defaultIndex}
                        onSelect={(index) => this.fetchDataOnTap(index)}
                      >
                        <TabList>
                          {collaborator_config == true ? (
                            <Tab>
                              <Link to={"?tab-index=0"}>
                                {" "}
                                <i class="fa fa-cog"></i>
                                {"  "}
                                <span>Cấu hình hoa hồng</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {collaborator_view == true ? (
                            <Tab>
                              <Link to={"?tab-index=1"}>
                                {" "}
                                <i class="fa fa-users"></i>
                                {"  "}
                                <span>Danh sách cộng tác viên</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {collaborator_register == true ? (
                            <Tab>
                              <Link to={"?tab-index=2"}>
                                {" "}
                                <i class="fa fa-sign-language"></i> {"  "}
                                <span>Yêu cầu làm cộng tác viên</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {collaborator_top_sale == true ? (
                            <Tab>
                              <Link to={"?tab-index=3"}>
                                {" "}
                                <i class="fa fa-chart-bar"></i>
                                {"  "}
                                <span> Top doanh số</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {collaborator_payment_request_list == true ? (
                            <Tab>
                              <Link to={"?tab-index=4"}>
                                {" "}
                                <i class="fas fa-list"></i>
                                {"  "}
                                <span> Danh sách yêu cầu thanh toán</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {collaborator_payment_request_history == true ? (
                            <Tab>
                              <Link to={"?tab-index=5"}>
                                {" "}
                                <i class="fa fa-history"></i>
                                {"  "}
                                <span> Lịch sử thanh toán</span>
                              </Link>
                            </Tab>
                          ) : null}
                        </TabList>

                        {collaborator_config == true ? (
                          <TabPanel>
                            <Config
                              tabId={tabId}
                              store_code={store_code}
                              handleEditCallBack={this.handleEditCallBack}
                              handleDelCallBack={this.handleDelCallBack}
                            />
                          </TabPanel>
                        ) : null}

                        {collaborator_view == true ? (
                          <TabPanel>
                            <ListCollaborator
                              tabId={tabId}
                              store_code={store_code}
                              collaborator_add_sub_balance={
                                collaborator_add_sub_balance
                              }
                            />
                          </TabPanel>
                        ) : null}

                        {collaborator_register == true ? (
                          <TabPanel>
                            <ListCollaboratorRegisterRequest
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}

                        {collaborator_top_sale == true ? (
                          <TabPanel>
                            <TopReport
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={collaborator_top_sale}
                            />
                          </TabPanel>
                        ) : null}
                        {collaborator_payment_request_list == true ? (
                          <TabPanel>
                            <RequestPayment
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={
                                collaborator_payment_request_list
                              }
                            />
                          </TabPanel>
                        ) : null}
                        {collaborator_payment_request_history == true ? (
                          <TabPanel>
                            <HistoryPayment
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}
                      </Tabs>
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>
            <ModalCreate store_code={store_code} />
            <ModalRemove
              modal={this.state.modalremove}
              store_code={store_code}
            />
            <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />

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
    alert: state.collaboratorReducers.alert.alert_uid_config,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(collaborator);
