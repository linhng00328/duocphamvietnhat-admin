import React, { Component } from 'react';
import * as Types from '../../constants/ActionType';
import Sidebar from '../../components/Partials/Sidebar';
import Topbar from '../../components/Partials/Topbar';
import Footer from '../../components/Partials/Footer';
import Seo from '../../components/Theme/Seo';
import Alert from '../../components/Partials/Alert';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Setting from './Setting.js';

import NotAccess from '../../components/Partials/NotAccess';

import * as themeAction from '../../actions/theme';
import * as helper from '../../ultis/helpers';
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: '',
      change: '',
    };
  }

  fetchDataOnTap = (index) => {
    this.setState({ tabId: index, change: helper.randomString(10) });
  };

  render() {
    var { store_code } = this.props.match.params;
    var { tabId, web_theme_overview } = this.state;
    var { theme } = this.props;
    console.log('theme eeeeeeeeeee', theme);

    var isShow = true;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == 'undefined' ? (
                <div></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 className="h4 title_content mb-0 text-gray-800">Public API webhook</h4>
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <Tabs defaultIndex={0} onSelect={(index) => this.fetchDataOnTap(index)}>
                        <TabList>
                          <Tab>
                            <i class="fa fa-cog"></i>
                            <span style={{ fontSize: '0.8rem' }}>Cài đặt</span>
                          </Tab>
                        </TabList>

                        <TabPanel>
                          <Setting tabId={tabId} store_code={store_code} theme={theme} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Theme);
