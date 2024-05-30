import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Seo from "../../../components/Theme/Seo";
import Alert from "../../../components/Partials/Alert";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Redirect, Link } from "react-router-dom";

import NotAccess from "../../../components/Partials/NotAccess";
import Chapter from "./Chapter";
import Quiz from "../Quiz";



import * as helper from "../../../ultis/helpers";
import history from "../../../history";
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: "",
      change: "",

    };
    this.defaultIndex = 0

  }


  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var tabIndex = urlParams.get('tab-index');
    if (!tabIndex) {
      tabIndex = 0;
    }
    this.defaultIndex = tabIndex;
    

  }

  render() {
    var { store_code, courseId } = this.props.match.params

    var { tabId } = this.state
    var isShow = true
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
                      Chương - Trắc nghiệm
                    </h4>
                    <button onClick={()=>history.goBack()}
                        class={`btn btn-warning btn-icon-split btn-sm`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-arrow-left"></i>
                        </span>
                        <span class="text">Trở về</span>
                      </button>
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
                            <Link to={"?tab-index=0"}>              
                             <i class="fas fa-book-open"></i> {" "}
                              <span style={{ fontSize: "0.8rem" }}>
                                Chương
                              </span></Link>

                          </Tab>
                          <Tab>
                            <Link to={"?tab-index=1"}>    
                                        <i class="fas fa-book-reader"></i>{" "}
                              <span style={{ fontSize: "0.8rem" }}>
                                Trắc nghiệm
                              </span></Link>

                          </Tab>








                        </TabList>

                        <TabPanel>
                          <Chapter
                            tabId={tabId}
                            store_code={store_code}
                            courseId={courseId}

                          />
                        </TabPanel>
                        <TabPanel>
                          <Quiz
                            tabId={tabId}
                            store_code={store_code}
                            courseId={courseId}

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
      //   dispatch(themeAction.fetchTheme(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Theme);
