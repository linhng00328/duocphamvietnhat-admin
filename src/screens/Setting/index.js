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

import NotAccess from "../../components/Partials/NotAccess";

import Inventory from "./Inventory";
import NotiEmail from "./NotiEmail";

import * as themeAction from "../../actions/theme";
import * as helper from "../../ultis/helpers";
import TermsAgencyCollaborator from "./TermsAgencyCollaborator";
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
    };
  }

  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.isLoading != true &&
  //     typeof this.props.permission.product_list != "undefined"
  //   ) {
  //     var permissions = this.props.permission;

  //     var web_theme_overview = permissions.web_theme_overview;
  //     var web_theme_contact = permissions.web_theme_contact;
  //     var web_theme_help = permissions.web_theme_help;
  //     var web_theme_footer = permissions.web_theme_footer;
  //     var web_theme_banner = permissions.web_theme_banner;
  //     var isShow =
  //       web_theme_overview == false &&
  //         web_theme_contact == false &&
  //         web_theme_help == false &&
  //         web_theme_footer == false &&
  //         web_theme_banner == false
  //         ? false
  //         : true;

  //     this.setState({
  //       isLoading: true,
  //       web_theme_overview,
  //       web_theme_contact,
  //       web_theme_help,
  //       web_theme_footer,
  //       web_theme_banner,
  //       isShow,
  //     });
  //   }
  // }

  componentWillReceiveProps = (nextProps) => {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.branch_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var config_terms_agency_collaborator =
        permissions.config_terms_agency_collaborator;
      this.setState({ isLoading: true, config_terms_agency_collaborator });
    }
  };
  render() {
    var { store_code } = this.props.match.params;
    var { tabId, web_theme_overview, config_terms_agency_collaborator } =
      this.state;
    var { theme } = this.props;

    var isShow = true;
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
                      Cài đặt chung
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
                            <i class="fa fa-cog"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Cài đặt chung
                            </span>
                          </Tab>
                          <Tab>
                            <i class="fa fa-envelope"></i>
                            <span style={{ fontSize: "0.8rem" }}>
                              Email gửi tới khách hàng
                            </span>
                          </Tab>
                          {config_terms_agency_collaborator ? (
                            <Tab>
                              <i class="fa fa-cogs"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Cài đặt điều khoản đăng ký đại lý, ctv
                              </span>
                            </Tab>
                          ) : null}
                        </TabList>

                        <TabPanel>
                          <Inventory
                            tabId={tabId}
                            store_code={store_code}
                            theme={theme}
                          />
                        </TabPanel>
                        <TabPanel>
                          <NotiEmail
                            tabId={tabId}
                            store_code={store_code}
                            theme={theme}
                          />
                        </TabPanel>
                        {config_terms_agency_collaborator ? (
                          <TabPanel>
                            <TermsAgencyCollaborator
                              tabId={tabId}
                              store_code={store_code}
                              theme={theme}
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
export default connect(mapStateToProps, mapDispatchToProps)(Theme);
