import React, { Component } from "react";

import { connect } from "react-redux";

import NotAccess from "../../components/Partials/NotAccess";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Table from "../../components/BannerAds/Table";
import Alert from "../../components/Partials/Alert";
import { Link, Redirect } from "react-router-dom";
import Footer from "../../components/Partials/Footer";
import * as configVipAction from "../../actions/config_vip";

import Form from "./Form";
class ConfigVip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getConfigVip();
  }

  render() {
    var { store_code } = this.props.match.params;

    var { user, getConfigVip, configVipUser, vip_user } = this.props;
    console.log("vip_user", vip_user);
    console.log("user.is_vip", user);

    console.log("this.props?.vip_user", this.props?.vip_user);
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              {user.is_vip == true ? (
                <div className="container-fluid">
                  {/* <Alert
                                            type={Types.ALERT_UID_STATUS}
                                            alert={this.props.alert}
                                        /> */}

                  <br></br>
                  <div class="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Cài đặt cho VIP
                      </h4>
                    </div>
                    <br></br>
                    <div class="card shadow mb-4">
                      <div class="card-body">
                        <section class="content">
                          <div class="row">
                            <div class="col-md-12 col-xs-12">
                              <div id="messages"></div>

                              <div class="box">
                                {/* {this.props?.vip_user == null ? "" : */}
                                <Form
                                  store_code={store_code}
                                  getConfigVip={getConfigVip}
                                  configVipUser={configVipUser}
                                  vip_user={vip_user}
                                />
                                {/* } */}
                              </div>
                            </div>
                          </div>
                        </section>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user.userID,
    vip_user: state.vipUserReducers.vip_user.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getConfigVip: () => {
      dispatch(configVipAction.getConfigVipUser());
    },
    configVipUser: (data) => {
      dispatch(configVipAction.configVipUser(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigVip);
