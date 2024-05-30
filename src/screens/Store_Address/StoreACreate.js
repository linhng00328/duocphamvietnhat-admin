import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "../../components/Store_Address/Create/Form";
import Loading from "../Loading";
import * as Types from "../../constants/ActionType";
import * as placeAction from "../../actions/place";

import Alert from "../../components/Partials/Alert";

class StoreACreate extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  
    this.props.fetchPlaceProvince();


  }

  render() {
    var {store_code} = this.props.match.params
    var {wards , district , province , history} = this.props

      return (
        <div id="wrapper">
          <Sidebar  store_code = { store_code} />
          <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code= {store_code} />

              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Thêm địa chỉ giao vận
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
                      <Form wards = {wards} district = {district} province = {province} history = {history}  store_code = {store_code}/>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
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
    alert: state.storeAReducers.alert.alert_uid,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {

    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreACreate);
