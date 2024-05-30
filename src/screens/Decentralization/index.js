import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Decentralization/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Decentralization/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as decentralizationAction from "../../actions/decentralization";
import config from "../../ultis/datatable";
class Decentralization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        name: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    this.props.fetchAllDecentralization(this.props.match.params.store_code);
  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var insert = permissions.decentralization_list;
      var update = permissions.decentralization_list;
      var _delete = permissions.decentralization_list;
      var isShow = permissions.decentralization_list;

      this.setState({ isLoading: true, insert, update, _delete, isShow });
    }
    $("#dataTable").DataTable(config());

    $("#dataTable").DataTable(config());

    window.$(".dataTables_info").hide();
  }

  render() {
    var { store_code } = this.props.match.params;
    var { decentralization } = this.props;
    var { insert, update, _delete, isShow } = this.state;

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
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
                        Cài đặt phân quyền
                      </h4>{" "}
                      <Link
                        to={`/decentralization/create/${store_code}`}
                        class={`btn btn-info btn-icon-split btn-sm ${
                          insert == true ? "show" : "hide"
                        }`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span class="text">Thêm phân quyền</span>
                      </Link>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 title_content font-weight-bold text-primary">
                          Danh sách phân quyền
                        </h6>
                      </div>
                      <div className="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          data={decentralization}
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
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    decentralization:
      state.decentralizationReducers.decentralization.allDecentralization,
    auth: state.authReducers.login.authentication,
    alert: state.decentralizationReducers.alert.alert_success,

    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllDecentralization: (id) => {
      dispatch(decentralizationAction.fetchAllDecentralization(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Decentralization);
