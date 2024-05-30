import React, { Component } from "react";
import Footer from "../../components/Partials/Footer";
import NotAccess from "../../components/Partials/NotAccess";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import ModalUpdate from "../../components/OtpUnit/ModalUpdate";
import ModalCreate from "../../components/OtpUnit/ModalCreate";
import ModalDelete from "../../components/OtpUnit/ModalDelete";

import { connect, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import * as otpUnitAction from "../../actions/otp_unit";
import * as configSmsAction from "../../actions/config_sms";
import Table from "../../components/OtpUnit/Table";
import TableHistorySMS from "../../components/OtpUnit/TableHistorySMS";
import Pagination from "../../components/OtpUnit/Pagination";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import Loading from "../Loading";
import SmsConfig from "./ConfigSms";

class ConfigSms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        id: "",
        title: "",
        sender: "",
      },
      modalupdate: {
        token: "",
        id: "",
      },
      is_use: true,
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };

  handleUpdateCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    var { store_code } = this.props.match.params;

    this.props.fetchAllOtpUnit(store_code);
    this.props.fetchSmsConfig(store_code);
    this.props.fetchHistorySMS(store_code, "");
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.smsConfig, this.props.smsConfig)) {
      var { smsConfig } = nextProps;

      this.setState({
        is_use: smsConfig.is_use,
        is_use_from_default: smsConfig.is_use_from_default,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var update = permissions.delivery_provider_update
      var isShow = permissions.config_sms;

      this.setState({ isLoading: true, isShow });
    }
    // $("#dataTable").DataTable(config());
  }

  onHandleUpdate = (e) => {
    var { name } = e.target;
    const { smsConfig } = this.props;
    var { store_code } = this.props.match.params;

    var { is_use } = this.state;

    const formData = {
      is_use: !is_use,
    };
    this.props.updateSmsConfig(store_code, formData, smsConfig.id, () => {
      this.setState({ is_use: !is_use });
    });
  };
  render() {
    var { store_code } = this.props.match.params;
    var { alert, allOtpUnit, allHistorySMS } = this.props;
    var { update, isShow, is_use } = this.state;

    if (this.props.auth) {
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
                  <div class="container-fluid">
                    <Alert type={Types.ALERT_UID_STATUS} alert={alert} />
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Cài đặt SMS
                      </h4>{" "}
                    </div>
                    <br></br>
                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Cấu hình sms
                        </h6>
                      </div>
                      <SmsConfig store_code={store_code}></SmsConfig>
                    </div> */}
                    <div class="card shadow mb-4">
                      <div
                        class="card-header py-3"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "5px",
                        }}
                      >
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Danh sách cài đặt sms
                        </h6>
                        <div
                          className="wrap-setting"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "5px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              color: "black",
                            }}
                          >
                            Bắt buộc xác nhận bằng mã OTP
                          </div>

                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="switch2"
                              name="is_use"
                              checked={is_use}
                              onChange={this.onHandleUpdate}
                            />
                            <label
                              class="custom-control-label"
                              for="switch2"
                            ></label>
                          </div>
                        </div>
                        {/* <button
                          type="button"
                          data-toggle="modal"
                          data-target="#createOtpUnitModal"
                          class="btn btn-primary btn-sm"
                        >
                          <i class="fa fa-plus"></i> Thêm
                        </button> */}
                      </div>
                      <div class="card-body" style={{ padding: "2px" }}>
                        <Table
                          update={update}
                          store_code={store_code}
                          allOtpUnit={allOtpUnit}
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                        />
                      </div>
                    </div>
                    <div class="card shadow mb-4">
                      <div
                        class="card-header py-3"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "5px",
                        }}
                      >
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Lịch sử sms
                        </h6>
                      </div>
                      <div class="card-body" style={{ padding: "2px" }}>
                        <TableHistorySMS
                          update={update}
                          store_code={store_code}
                          allHistorySMS={allHistorySMS}
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                        />
                        <div>
                          <Pagination
                            store_code={store_code}
                            allHistorySMS={allHistorySMS}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalCreate store_code={store_code} />
            <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />
            <ModalDelete
              modal={this.state.modalremove}
              store_code={store_code}
            />
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    allOtpUnit: state.otpUnitReducers.otp_unit.allOtpUnit,
    allHistorySMS: state.otpUnitReducers.otp_unit.allHistorySMS,
    smsConfig: state.configSmsReducers.configSms.smsConfig,
    alert: state.otpUnitReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllOtpUnit: (store_code) => {
      dispatch(otpUnitAction.fetchAllOtpUnit(store_code));
    },
    fetchHistorySMS: (store_code, params) => {
      dispatch(otpUnitAction.fetchHistorySMS(store_code, params));
    },
    fetchSmsConfig: (store_code) => {
      dispatch(configSmsAction.fetchSmsConfig(store_code));
    },
    updateSmsConfig: (store_code, data, id, onSuccess) => {
      dispatch(
        configSmsAction.updateSmsConfig(store_code, data, id, onSuccess)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigSms);
