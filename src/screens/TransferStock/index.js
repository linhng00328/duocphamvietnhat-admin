import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Seo from "../../components/Theme/Seo";
import Alert from "../../components/Partials/Alert";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Sender from "./Sender";
import Receiver from "./Receiver";

import NotAccess from "../../components/Partials/NotAccess";
import { getQueryParams } from "../../ultis/helpers";

import Custom_Screen from "../../components/Theme/Custom_Screen/index";
import * as themeAction from "../../actions/theme";
import * as helper from "../../ultis/helpers";
import history from "../../history";
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
    };
    this.defaultIndex = getQueryParams("tab-index") == 2 ? 1 : 0;
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.inventory_import != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.transfer_stock;

      this.setState({ isLoading: true, isShow });
    }
  }

  fetchDataOnTap = (index) => {
    var { store_code } = this.props.match.params;
    history.push(
      `/transfer_stocks/index/${store_code}?tab-index=${index == 1 ? 2 : 1}`
    );
    this.setState({ tabId: index, change: helper.randomString(10) });
  };
  render() {
    var { store_code } = this.props.match.params;
    var { isShow } = this.state;
    console.log(isShow);
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
                      Chuyển kho
                    </h4>
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <Tabs
                        defaultIndex={this.defaultIndex}
                        onSelect={(index) => this.fetchDataOnTap(index)}
                      >
                        <TabList>
                          <Tab>
                            <i class="fa fa-truck"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Chuyển kho
                            </span>
                          </Tab>
                          <Tab>
                            <i class="fa fa-home"></i>
                            <span style={{ fontSize: "0.8rem" }}>Nhập kho</span>
                          </Tab>
                        </TabList>

                        <TabPanel>
                          <Sender store_code={store_code} />
                        </TabPanel>
                        <TabPanel>
                          <Receiver store_code={store_code} />
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
    permission: state.authReducers.permission.data,
  };
};
export default connect(mapStateToProps, null)(Theme);
