import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "../../components/BannerAds/Create/Form";
import Loading from "../Loading";
import * as Types from "../../constants/ActionType";
import NotAccess from "../../components/Partials/NotAccess";

import Alert from "../../components/Partials/Alert";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.banner_ads;
      this.setState({ isLoading: true, isShow: true });
    }
  }

  render() {
    var { store_code } = this.props.match.params;
    var { history } = this.props;
    var { isShow } = this.state;

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
                <div class="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Thêm banner quảng cáo
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
                              <Form history={history} store_code={store_code} />
                            </div>
                          </div>
                        </div>
                      </section>
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
    alert: state.categoryBReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
  };
};

export default connect(mapStateToProps, null)(Create);
