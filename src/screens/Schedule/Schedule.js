import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Schedule/Delete/Modal";

import Table from "../../components/Schedule/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as scheduleAction from "../../actions/schedule";
import config from "../../ultis/datatable"
import NotAccess from "../../components/Partials/NotAccess";

class Schedule extends Component {
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
    this.props.fetchAllSchedule(this.props.store_code);
  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading != true && typeof this.props.permission.product_list != "undefined") {
      var permissions = this.props.permission

      var isShow = permissions.notification_schedule_list

      this.setState({ isLoading: true, insert: true, update: true, _delete: true, isShow })

    }
    $("#dataTable").DataTable(config());
  }
  render() {
    var { store_code } = this.props
    var { schedule } = this.props
    var { insert, update, _delete, isShow } = this.state

    if (this.props.auth) {
      return (
        <div className="">
    
        <div
          style={{ display: "flex", justifyContent: "end" }}
        >
        
          <Link to={`/notifications/schedule/create/${store_code}`}
            class={`btn btn-info btn-icon-split btn-sm ${insert == true ? "show" : "hide"}`}
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus"></i>
            </span>
            <span class="text">Thêm lịch thông báo
            </span>
          </Link>
        </div>

        <div className="card shadow mb-4" style = {{marginTop : "8px"}}>

          <div className="card-body">
            <Table update={update} _delete={_delete} store_code={store_code} handleDelCallBack={this.handleDelCallBack} data={schedule} />
          </div>
        </div>
        <ModalDelete store_code={store_code} modal={this.state.modal} />

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
    schedule: state.scheduleReducers.schedule.allSchedule,
    auth: state.authReducers.login.authentication,
    alert: state.scheduleReducers.alert.alert_success,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllSchedule: (id) => {
      dispatch(scheduleAction.fetchAllSchedule(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
