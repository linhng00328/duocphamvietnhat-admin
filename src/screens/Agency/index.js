import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalCreate from "../../components/Agency/Config/ModalCreate";
import ModalUpdate from "../../components/Agency/Config/ModalUpdate";
import ModalRemove from "../../components/Agency/Config/ModalRemove";

import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Config from "../../components/Agency/Config";
import ListAgency from "../../components/Agency/ListAgency";
import ListAgencyRegisterRequest from "../../components/Agency/AgencyRegisterRequest";
import TopReport from "../../components/Agency/TopReport";
import RequestPayment from "../../components/Agency/RequestPayment";
import Type from "../../components/Agency/Type";

import NotAccess from "../../components/Partials/NotAccess";
import BonusProgram from "../../components/Agency/BonusProgram";
import HistoryPayment from "../../components/Agency/HistoryPayment";
import TopComission from "../../components/Agency/TopComiss";
import ModalCreateImport from "../../components/Agency/Config/ModalCreateImport";
import ModalRemoveImport from "../../components/Agency/Config/ModalRemoveImport";
import ModalUpdateImport from "../../components/Agency/Config/ModalUpdateImport";

class agency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {},
      modalremoveImport: {
        title: "",
        id: "",
      },
      modalupdateImport: {},
      tabId: 0,
      isAutoSetLevelAgency: false,
    };
    this.defaultIndex =
      this.props.match.params.action == "request_payment" ? 2 : 0;
  }

  setIsAutoSetLevelAgency = (isAuto) => {
    this.setState({
      isAutoSetLevelAgency: isAuto,
    });
  };
  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };

  handleEditCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };
  handleDelCallBackImport = (modal) => {
    this.setState({ modalremoveImport: modal });
  };

  handleEditCallBackImport = (modal) => {
    this.setState({ modalupdateImport: modal });
  };
  setModalUpdateImport = (modal) => {
    this.setState({ modalupdateImport: modal });
  };
  setModalUpdate = (modal) => {
    this.setState({ modalupdate: modal });
  };
  fetchDataOnTap = (index) => {
    this.setState({ tabId: index });
    // var urlParams = new URLSearchParams(window.location.search);
    // urlParams.set('tab-index', index);
    // window.location.search = urlParams;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var agency_view = permissions.agency_view;
      var agency_config = permissions.agency_config;
      var agency_register = permissions.agency_register;
      var agency_top_import = permissions.agency_top_import;
      var agency_bonus_program = permissions.agency_bonus_program;
      var agency_top_commission = permissions.agency_top_commission;
      var agency_payment_request_list = permissions.agency_payment_request_list;
      var agency_payment_request_history =
        permissions.agency_payment_request_history;
      var agency_add_sub_balance = permissions.agency_add_sub_balance;
      var agency_change_level = permissions.agency_change_level;

      var isShow = permissions.agency_list;

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
        agency_view,
        agency_config,
        agency_register,
        agency_top_import,
        agency_bonus_program,
        agency_top_commission,
        agency_payment_request_list,
        agency_payment_request_history,
        agency_add_sub_balance,
        agency_change_level,
      });
    }
  }
  render() {
    var { store_code, id } = this.props.match.params;
    var {
      tabId,
      tabDefault,
      agency_view,
      agency_config,
      agency_register,
      agency_top_import,
      agency_bonus_program,
      agency_top_commission,
      agency_payment_request_list,
      agency_payment_request_history,
      agency_add_sub_balance,
      isShow,
      isAutoSetLevelAgency,
      agency_change_level,
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
                      Đại lý
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
                          {/* {config == true ? (
                            <Tab>
                              <Link to={"?tab-index=0"}>
                                <i class="fa fa-cog"></i>
                                <span>Cấu hình hoa hồng</span>
                              </Link>
                            </Tab>
                          ) : null} */}
                          {agency_config == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=0"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                <i class="fa fa-cogs"></i>
                                <span>Cấu hình đại lý</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {agency_view == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=1"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                <i class="fa fa-users"></i>
                                <span>Danh sách đại lý</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {agency_register == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=2"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                <i className="fa fa-sign-language"></i> {"  "}
                                <span>Yêu cầu làm đại lý</span>
                              </Link>
                            </Tab>
                          ) : null}

                          {agency_top_import == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=3"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                <i class="fa fa-chart-bar"></i>
                                <span> Top nhập hàng</span>
                              </Link>
                            </Tab>
                          ) : null}

                          {agency_bonus_program == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=4"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                <i class="fa fa-gift"></i>
                                <span>Chương trình thưởng đại lý</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {agency_top_commission == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=5"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                {" "}
                                <i class="fa fa-chart-bar"></i>
                                <span> Top hoa hồng</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {agency_payment_request_list == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=6"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                {" "}
                                <i class="fa fa-money"></i>
                                <span> Danh sách yêu cầu thanh toán</span>
                              </Link>
                            </Tab>
                          ) : null}
                          {agency_payment_request_history == true ? (
                            <Tab>
                              <Link
                                to={"?tab-index=7"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                {" "}
                                <i class="fa fa-history"></i>
                                <span> Lịch sử thanh toán</span>
                              </Link>
                            </Tab>
                          ) : null}
                        </TabList>

                        {agency_config == true ? (
                          <TabPanel>
                            <Type
                              tabId={tabId}
                              store_code={store_code}
                              isAutoSetLevelAgency={isAutoSetLevelAgency}
                            >
                              <Config
                                tabId={tabId}
                                store_code={store_code}
                                handleEditCallBack={this.handleEditCallBack}
                                handleDelCallBack={this.handleDelCallBack}
                                setIsAutoSetLevelAgency={
                                  this.setIsAutoSetLevelAgency
                                }
                              />
                            </Type>
                          </TabPanel>
                        ) : null}
                        {agency_view == true ? (
                          <TabPanel>
                            <ListAgency
                              tabId={tabId}
                              store_code={store_code}
                              agency_add_sub_balance={agency_add_sub_balance}
                              agency_change_level={agency_change_level}
                            />
                          </TabPanel>
                        ) : null}
                        {agency_register == true ? (
                          <TabPanel>
                            <ListAgencyRegisterRequest
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}
                        {agency_top_import == true ? (
                          <TabPanel>
                            <TopReport
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={agency_top_import}
                            />
                          </TabPanel>
                        ) : null}
                        {agency_bonus_program == true ? (
                          <TabPanel>
                            <BonusProgram
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={agency_bonus_program}
                              handleEditCallBack={this.handleEditCallBack}
                              handleDelCallBack={this.handleDelCallBack}
                              handleEditCallBackImport={
                                this.handleEditCallBackImport
                              }
                              handleDelCallBackImport={
                                this.handleDelCallBackImport
                              }
                            />
                          </TabPanel>
                        ) : null}
                        {agency_top_commission == true ? (
                          <TabPanel>
                            <TopComission
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={agency_top_commission}
                            />
                          </TabPanel>
                        ) : null}
                        {agency_payment_request_list == true ? (
                          <TabPanel>
                            <RequestPayment
                              paramId={id}
                              tabId={tabId}
                              store_code={store_code}
                              payment_request_solve={
                                agency_payment_request_list
                              }
                            />
                          </TabPanel>
                        ) : null}
                        {agency_payment_request_history == true ? (
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
              setModalUpdate={this.setModalUpdate}
              store_code={store_code}
            />
            <ModalCreateImport store_code={store_code} />
            <ModalRemoveImport
              modal={this.state.modalremoveImport}
              store_code={store_code}
            />
            <ModalUpdateImport
              modal={this.state.modalupdateImport}
              setModalUpdateImport={this.setModalUpdateImport}
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
    alert: state.agencyReducers.alert.alert_uid_config,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(agency);
