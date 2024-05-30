import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/BannerAds/Edit/Form";
import * as bannerAdsAction from "../../../actions/banner_ads";
import * as Types from "../../../constants/ActionType";

import Alert from "../../../components/Partials/Alert";
class BannerAdsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllBannerAds(store_code);
  }




  render() {
    var { bannerAdsId, store_code } = this.props;
    var { banner_ads, history } = this.props

      return (
        
                    <div class="container-fluid">
                      <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={this.props.alert}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <h4 className="h4 title_content mb-0 text-gray-800">
                          Chỉnh sửa banner quảng cáo
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
                                  {
                                  <Form history={history} bannerAdsId={bannerAdsId} banner_ads={banner_ads} store_code={store_code} />
                                  }
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>

           

      );
  
  }
}

const mapStateToProps = (state) => {
  return {
    banner_ads: state.bannerAdsReducers.bannerAds.allBannerAds,
    auth: state.authReducers.login.authentication,
    alert: state.bannerAdsReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBannerAds: (store_code) => {
      dispatch(bannerAdsAction.fetchAllBannerAds(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BannerAdsEdit);
