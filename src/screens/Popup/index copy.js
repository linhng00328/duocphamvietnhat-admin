import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Popup/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Popup/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as popupAction from "../../actions/popup";
import config from "../../ultis/datatable"

class Popup extends Component {
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
    this.setState({modal : modal });
  };

  componentDidMount() {
    this.props.fetchAllPopup(this.props.match.params.store_code);
  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission
      // var insert = permissions.popup_add
      // var update = permissions.popup_update
      // var _delete = permissions.popup_remove
      var isShow = permissions.notification_schedule_list

      this.setState({ isLoading: true, insert:true, update:true, _delete:true , isShow })

    }
    $("#dataTable").DataTable(config());
  }
  render() {
    var {store_code} = this.props.match.params
    var {popup} = this.props
    var { insert, update, _delete ,isShow} = this.state

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
<div className="col-10 col-10-wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code= {store_code} />
              {typeof isShow == "undefined" ?             <div style = {{height : "500px"}}></div> :
 isShow == true ?

              <div className="container-fluid">
                <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Quảng cáo
                  </h4>{" "}
                  <Link to={`/popup/create/${store_code}`} 
                                      class={`btn btn-info btn-icon-split btn-sm ${insert == true ? "show" : "hide"}`}

                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Thêm quảng cáo</span>
                  </Link>
                </div>

                <br></br>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 title_content font-weight-bold text-primary">
                      Danh sách popup thông báo
                    </h6>
                  </div>
                  <div className="card-body">
                    <Table update={update} _delete={_delete} store_code = {store_code}  handleDelCallBack = {this.handleDelCallBack}  data={popup} />
                  </div>
                </div>
              </div>

: <NotAccess/>}

            </div>

            <Footer />
          </div>
          <ModalDelete store_code = {store_code}  modal = {this.state.modal} />

          
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
    popup: state.popupReducers.popup.allPopup,
    auth: state.authReducers.login.authentication,
    alert: state.popupReducers.alert.alert_success,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllPopup: (id) => {
      dispatch(popupAction.fetchAllPopup(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
