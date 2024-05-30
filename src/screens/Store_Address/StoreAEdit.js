import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { Redirect } from "react-router-dom";
import Form from "../../components/Store_Address/Edit/Form";
import Loading from "../Loading";
import * as StoreAAction from "../../actions/store_address";
import * as placeAction from "../../actions/place";

class StoreAEdit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;

    this.props.fetchAllStoreA(this.props.match.params.store_code,this.props.currentBranch.id);
    this.props.fetchPlaceWards();
    this.props.fetchPlaceDistrict();
    this.props.fetchPlaceProvince();
  }


  render() {
    var { storeAId, store_code } = this.props.match.params;
    var { store_address, history, wards, district, province } = this.props

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar  store_code = { store_code} />
          <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div class="container-fluid">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Chỉnh sửa địa chỉ giao vận
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
                            <Form wards = {wards} district = {district} province = {province} history={history} storeAId={storeAId} store_address={store_address} store_code={store_code} />
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
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    store_address: state.storeAReducers.storeAddress.allStoreA,
    auth: state.authReducers.login.authentication,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStoreA: (id, branch_id) => {
      dispatch(StoreAAction.fetchAllStoreA(id, branch_id));
    },
    fetchPlaceDistrict: () => {
      dispatch(placeAction.fetchPlaceDistrict());
    },
    fetchPlaceWards: () => {
      dispatch(placeAction.fetchPlaceWards());
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAEdit);
