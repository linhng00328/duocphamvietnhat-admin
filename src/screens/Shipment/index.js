import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalUpdate from "../../components/Shipment/ModalUpdate";
import NotAccess from "../../components/Partials/NotAccess";

import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Table from "../../components/Shipment/Table";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as shipmentAction from "../../actions/shipment";
import config from "../../ultis/datatable";
import ShipConfig from "./ShipConfig";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
      },
      modalupdate: {
        token: "",
        id: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };

  handleUpdateCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    var { store_code } = this.props.match.params;

    this.props.fetchAllShipment(store_code);
  }
  componentWillReceiveProps(nextProps) {
    // $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var update = permissions.delivery_provider_update
      var isShow = permissions.delivery_pick_address_list;

      this.setState({ isLoading: true, isShow });
    }
    // $("#dataTable").DataTable(config());
  }
  render() {
    var { store_code } = this.props.match.params;
    var { alert, shipment } = this.props;
    var { update, isShow } = this.state;

    if (this.props.auth) {
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
                  <div class="container-fluid">
                    <Alert type={Types.ALERT_UID_STATUS} alert={alert} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Đơn vị vận chuyển
                      </h4>{" "}
                    </div>
                    <br></br>
                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Danh sách đơn vị vận chuyển
                        </h6>
                      </div>
                      <div class="card-body" style={{ padding: "2px" }}>
                        <Table
                          update={update}
                          store_code={store_code}
                          shipment={shipment}
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                        />
                      </div>
                    </div>
                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 title_content font-weight-bold text-primary">
                          Cấu hình phí ship
                        </h6>
                      </div>
                      <ShipConfig store_code={store_code}></ShipConfig>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />
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
    auth: state.authReducers.login.authentication,
    shipment: state.shipmentReducers.shipment.allShipment,
    alert: state.shipmentReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllShipment: (store_code) => {
      dispatch(shipmentAction.fetchAllShipment(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
