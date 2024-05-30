import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Store_Address/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Store_Address/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as StoreAAction from "../../actions/store_address";
import config from "../../ultis/datatable";
import { shallowEqual } from "../../ultis/shallowEqual";

class StoreAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    if(this.props.currentBranch != null && this.props.currentBranch.id != null) {
      this.props.fetchAllStoreA(
        this.props.match.params.store_code,
       this. props.currentBranch.id
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.currentBranch, this.props.currentBranch)) {
      this.props.fetchAllStoreA(
        this.props.match.params.store_code,
        nextProps.currentBranch.id
      );
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var update = permissions.delivery_pick_address_update
      var isShow = permissions.delivery_pick_address_list;

      this.setState({ isLoading: true, update: true, isShow });
    }
    $("#dataTable").DataTable(config());
  }
  render() {
    var { store_code } = this.props.match.params;
    var { update, isShow } = this.state;

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
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Địa chỉ giao vận
                    </h4>{" "}
                    <Link
                      to={`/store_address/create/${store_code}`}
                      class="btn btn-info btn-icon-split btn-sm"
                    >
                      <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                      </span>
                      <span class="text">Thêm địa chỉ</span>
                    </Link>
                  </div>

                  <br></br>
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 title_content font-weight-bold text-primary">
                        Danh sách địa chỉ giao vận{" "}
                        {this.props.currentBranch == null
                          ? ""
                          : "(" + this.props.currentBranch.name + ")"}
                      </h6>
                    </div>
                    <div className="card-body">
                      <Table
                        update={update}
                        store_code={store_code}
                        handleDelCallBack={this.handleDelCallBack}
                        data={this.props.store_address}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
          </div>
          <ModalDelete store_code={store_code} modal={this.state.modal} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store_address: state.storeAReducers.storeAddress.allStoreA,
    auth: state.authReducers.login.authentication,
    alert: state.storeAReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStoreA: (store_code, branch_id) => {
      dispatch(StoreAAction.fetchAllStoreA(store_code, branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAddress);
