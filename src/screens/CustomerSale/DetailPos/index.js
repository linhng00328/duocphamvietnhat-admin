import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import NotAccess from "../../../components/Partials/NotAccess";

import Alert from "../../../components/Partials/Alert";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderHistory from "../../../components/Customer/Detail/OrderHistory";
import Info from "../../../components/Customer/Detail/Info";
import CustomerDebt from "../../../components/Customer/Detail/CustomerDebt";


import * as themeAction from "../../../actions/theme";
import * as helper from "../../../ultis/helpers";
class DetailPos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
    };
  }
  componentDidMount() {
    var { store_code } = this.props.match.params;
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.customer_list;
      this.setState({ isLoading: true, isShow });
    }
  }

  render() {
    var { store_code , customerId } = this.props.match.params;
    var {isShow} = this.state
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
                      Thông tin khách hàng
                    </h4>
                  </div>
                  <br></br>

                  <div className="card shadow mb-4 tab-pos">
                    <div className="card-body">
                      <Tabs
                        defaultIndex={0}
                      >
                        <TabList>
                            <Tab>
                              <i class="fa fa-user"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Thông tin KH
                              </span>
                            </Tab>
                            <Tab>
                              <i class="fa fa-credit-card"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                               Công nợ
                              </span>
                            </Tab>
                            <Tab>
                              <i class="fa fa-history"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Lịch sử mua hàng
                              </span>
                            </Tab>
                    
                        </TabList>

                          <TabPanel>
                            <Info
                            customerId = {customerId}
                              store_code={store_code}
                            />
                          </TabPanel>
                          <TabPanel>
                         
                              <CustomerDebt
                              store_code={store_code}
                            />
                          </TabPanel>
                          <TabPanel>
                          <OrderHistory
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
    theme: state.themeReducers.theme,
    permission: state.authReducers.permission.data,

    alert: state.themeReducers.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTheme: (store_code) => {
      dispatch(themeAction.fetchTheme(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPos);
