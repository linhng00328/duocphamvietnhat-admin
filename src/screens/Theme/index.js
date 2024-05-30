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
import Contact from "../../components/Theme/Contact/index";
import Support from "../../components/Theme/Support/index";
import Banner from "../../components/Theme/Banner/index";
import NotAccess from "../../components/Partials/NotAccess";

import FooterTheme from "../../components/Theme/Footer/index";
import Overview from "../../components/Theme/OverView/index";
import HomeScreen from "../../components/Theme/Home_Screen/index";
import Custom_Screen from "../../components/Theme/Custom_Screen/index";
import * as themeAction from "../../actions/theme";
import * as helper from "../../ultis/helpers";
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",
    };
  }
  componentDidMount() {
    var { store_code } = this.props.match.params;

    this.props.fetchTheme(store_code);
  }

  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var web_theme_overview = permissions.web_theme_overview;
      var web_theme_edit = permissions.web_theme_edit;
      var web_theme_contact = permissions.web_theme_contact;
      var web_theme_help = permissions.web_theme_help;
      var web_theme_footer = permissions.web_theme_footer;
      var web_theme_banner = permissions.web_theme_banner;
      var web_theme_seo = permissions.web_theme_seo;
      var isShow =
        web_theme_overview == false &&
        web_theme_edit == false &&
        web_theme_contact == false &&
        web_theme_help == false &&
        web_theme_footer == false &&
        web_theme_banner == false &&
        web_theme_seo == false
          ? false
          : true;

      this.setState({
        isLoading: true,
        web_theme_overview,
        web_theme_edit,
        web_theme_contact,
        web_theme_help,
        web_theme_footer,
        web_theme_banner,
        web_theme_seo,
        isShow,
      });
    }
  }
  render() {
    var { store_code } = this.props.match.params;
    var {
      tabId,
      web_theme_overview,
      web_theme_edit,
      web_theme_contact,
      web_theme_help,
      web_theme_footer,
      web_theme_banner,
      web_theme_seo,
      isShow,
    } = this.state;
    var { theme } = this.props;
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
                      Chỉnh sửa giao diện Khách hàng
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
                          {web_theme_overview == true ? (
                            <Tab>
                              <i class="fa fa-cogs"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Tổng quan
                              </span>
                            </Tab>
                          ) : null}
                          {web_theme_edit == true ? (
                            <Tab>
                              <i class="fa fa-home"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Màn hình trang chủ
                              </span>
                            </Tab>
                          ) : null}

                          {web_theme_contact == true ? (
                            <Tab>
                              <i class="fas fa-address-book"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                Liên hê
                              </span>
                            </Tab>
                          ) : null}

                          {web_theme_help == true ? (
                            <Tab>
                              <i class="fas fa-address-book"></i>
                              <span style={{ fontSize: "0.8rem" }}>Hỗ trợ</span>
                            </Tab>
                          ) : null}

                          {web_theme_footer == true ? (
                            <Tab>
                              <i class="fa fa-list"></i>
                              <span style={{ fontSize: "0.8rem" }}>
                                {" "}
                                Chân trang
                              </span>
                            </Tab>
                          ) : null}

                          {web_theme_banner == true ? (
                            <Tab>
                              <i class="fa fa-list"></i>
                              <span>Banners</span>
                            </Tab>
                          ) : null}

                          {web_theme_seo == true ? (
                            <Tab>
                              <i class="fa fa-search-plus "></i>
                              <span>SEO</span>
                            </Tab>
                          ) : null}
                        </TabList>

                        {web_theme_overview == true ? (
                          <TabPanel>
                            <Overview
                              tabId={tabId}
                              store_code={store_code}
                              theme={theme}
                            />
                          </TabPanel>
                        ) : null}
                        {web_theme_edit == true ? (
                          <TabPanel>
                            <HomeScreen
                              tabId={tabId}
                              store_code={store_code}
                              theme={theme}
                            />
                          </TabPanel>
                        ) : null}

                        {web_theme_contact == true ? (
                          <TabPanel>
                            <Contact
                              theme={theme}
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}

                        {web_theme_help == true ? (
                          <TabPanel>
                            <Support
                              theme={theme}
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}

                        {web_theme_footer == true ? (
                          <TabPanel>
                            <FooterTheme
                              theme={theme}
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}

                        {web_theme_banner == true ? (
                          <TabPanel>
                            <Banner
                              theme={theme}
                              tabId={tabId}
                              store_code={store_code}
                            />
                          </TabPanel>
                        ) : null}

                        {web_theme_seo == true ? (
                          <TabPanel>
                            <Seo
                              theme={theme}
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
