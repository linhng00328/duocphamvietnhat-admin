import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";

import Table from "../../../components/Timekeeping/Shift/Table";
import Pagination from "../../../components/Timekeeping/Shift/Pagination";
import ModalCreate from "../../../components/Timekeeping/Shift/Create/Modal";

import * as shiftAction from "../../../actions/shift";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import NotAccess from "../../../components/Partials/NotAccess";

import Loading from "../../Loading";
import { getBranchId } from "../../../ultis/branchUtils";

class Shift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPage: 10,
    };
  }

  componentDidMount() {
    var { numPage } = this.state;
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    var params = `&limit=${numPage}`;
    this.props.fetchAllShift(store_code, branch_id, 1, params);
  }

  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.timekeeping != "undefined") {
        var permissions = this.props.permission
        // var insert = permissions.timekeeping_shift_add
        // var update = permissions.timekeeping_shift_update
        // var _delete = permissions.timekeeping_shift_delete

        var isShow = permissions.timekeeping

        this.setState({ isLoading: true, insert:true, update:true, _delete:true ,isShow})

      }

  }
  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;

    const branch_id = getBranchId();

    var numPage = e.target.value;
    this.setState({
      numPage,
    });

    // var params = `&search=${searchValue}&order_status_code=${statusOrder}&limit=${numPage}`;
    var params = `&limit=${numPage}`;

    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
    this.props.fetchAllShift(store_code, branch_id, 1, params);
  };
  render() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();

    var { shifts } = this.props;

    // var { insert, update, _delete ,isShow} = this.state
    var { isShow, modal, numPage } = this.state;

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
                        Ca chấm công
                      </h4>{" "}
                      <a
                        data-toggle="modal"
                        data-target="#modalCreate"
                        class={`btn btn-info btn-icon-split btn-sm ${
                          true ? "show" : "hide"
                        }`}
                        style={{ marginRight: "1rem" }}
                      >
                        <span
                          class="icon text-white-50"
                          style={{ marginRight: 0 }}
                        >
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{ color: "white", margin: "0 0.75rem" }}
                          class={`text `}
                        > Thêm ca
                          
                        </span>
                      </a>
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">
                          Danh sách ca
                        </h6>
                      </div>

                      <div className="card-body">
                        {shifts.data !== undefined && (
                          //   <Table
                          //     update={update}
                          //     _delete={_delete}
                          //     handleDelCallBack={this.handleDelCallBack}
                          //     store_code={store_code}
                          //     branch_id={branch_id}
                          //     shifts={shifts}
                          //   />
                          <Table
                            store_code={store_code}
                            branch_id={branch_id}
                            shifts={shifts}
                            limit={numPage}
                          />
                        )}
                      </div>
                      <div style={{ display: "flex"  , justifyContent : "end" , marginRight : "20px"}}>
                        <div style={{ display: "flex" }}>
                          <span
                            style={{
                              margin: "20px 10px auto auto",
                            }}
                          >
                            Hiển thị
                          </span>
                          <select
                            style={{
                              margin: "auto",
                              marginTop: "10px",
                              marginRight: "20px",
                              width: "70px",
                            }}
                            onChange={this.onChangeNumPage}
                            value={numPage}
                            name="numPage"
                            class="form-control"
                          >
                            <option value="5">5</option>
                            <option value="10" selected>
                              10
                            </option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <Pagination
                          limit={numPage}
                          store_code={store_code}
                          branch_id={branch_id}
                          shifts={shifts}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              {shifts.data !== undefined && (
                <ModalCreate
                  store_code={store_code}
                  branch_id={branch_id}
                  shifts={shifts}
                  limit={numPage}
                />
              )}
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
    auth: state.authReducers.login.authentication,
    shifts: state.shiftReducers.shift.allShift,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllShift: (store_code, branch_id, page, params) => {
      dispatch(shiftAction.fetchAllShift(store_code, branch_id, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shift);
