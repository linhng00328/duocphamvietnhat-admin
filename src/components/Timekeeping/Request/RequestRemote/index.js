import React, { Component } from "react";

import Table from "./Table";
import Pagination from "./Pagination";

import Alert from "../../../Partials/Alert";
import * as Types from "../../../../constants/ActionType";
import * as requestRemoteAction from "../../../../actions/request_remote";

import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";

import NotAccess from "../../../Partials/NotAccess";

import Loading from "../../../../screens/Loading";

import moment from "moment";
import * as helper from "../../../../ultis/helpers";
import ModalIsEnd from "./Modal";

class RequestRemote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        table: "",
        name: "",
        id: "",
        status: 1,
        store_code: "",
        searchValue: "",

      },
      modalIsEnd: {},
    };
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  };

  componentDidMount() {
    var { store_code, branch_id } = this.props;

    this.props.fetchAllRequestRemote(store_code, branch_id, 1);
  }

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllRequestRemote(store_code, branch_id, 1 , params);
  };

  render() {
    var { requestRemote } = this.props;
    var { store_code, branch_id } = this.props;
    var { modal, modalIsEnd } = this.state;
    var { searchValue } = this.state

    return (
      <div className="requestRemote">
           <form style={{marginTop : "10px" , marginBottom: "10px"}} onSubmit={this.searchData}>
              <div
                class="input-group mb-6"
              >
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm nhân viên"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
        
            </form>
        <div class="box-body">
          <Table
            store_code={store_code}
            branch_id={branch_id}
            requestRemote={requestRemote}
            handleIsEndCallback={this.handleIsEndCallback}
          />
        </div>
        <div>
          <Pagination
            store_code={store_code}
            branch_id={branch_id}
            requestRemote={requestRemote}
          />
        </div>
        <div class="box-footer"></div>
        <ModalIsEnd
          modal={modalIsEnd}
          store_code={store_code}
          branch_id={branch_id}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    // shifts: state.shiftReducers.shift.allShift,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    requestRemote: state.requestRemoteReducers.requestRemote.allRequestRemote,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllRequestRemote: (store_code, branch_id, page , params) => {
      dispatch(
        requestRemoteAction.fetchAllRequestRemote(store_code, branch_id, page ,params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestRemote);
