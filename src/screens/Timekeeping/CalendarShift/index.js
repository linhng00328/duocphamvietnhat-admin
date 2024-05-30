import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Table from "../../../components/Timekeeping/CalendarShift/Table";

import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";

import * as calendarShiftAction from "../../../actions/calendar_shift";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import NotAccess from "../../../components/Partials/NotAccess";

import Loading from "../../Loading";
import { shallowEqual } from "../../../ultis/shallowEqual";

import moment from "moment";
import * as helper from "../../../ultis/helpers";
import ModalPostDate from "../../../components/Timekeeping/CalendarShift/ModalPostDates";
// import ModalPut from "../../../components/Timekeeping/CalendarShift/PutALot/Modal";
import "./style.css";
import { getBranchId } from "../../../ultis/branchUtils";
import { getQueryParams } from "../../../ultis/helpers"

class CalendarShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelect: "Tuần",
      datePrime: "",
      typeDate: "WEEK",
      reset: "",
    };
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    this.setState({
      datePrime: {
        // from: moment().format("YYYY-MM-DD"),
        // to: moment().format("YYYY-MM-DD"),
        from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
        to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
      },
    });
    var typeDate = getQueryParams("type")

    if (typeDate) {
      var resetId = helper.randomString(10);

      typeDate = typeDate == "DAY" || typeDate == "WEEK" || typeDate == "MONTH" ? typeDate : "DAY"
      var typeSelect =
        typeDate == "DAY"
          ? "Ngày"
          : typeDate == "WEEK"
            ? "Tuần"
            : typeDate == "MONTH"
              ? "Tháng"
              : "";
      console.log(typeDate, typeSelect)
      this.setState({ typeDate: typeDate, reset: resetId, typeSelect: typeSelect });
    }

    const time = moment().format("YYYY-MM-DD");

    var params = `date_from=${time}&date_to=${time}`;

    this.props.fetchAllCalendarShift(store_code, branch_id, params);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.datePrime !== nextState.datePrime) {
      console.log("vo day")
      const param = `date_from=${nextState.datePrime.from}&date_to=${nextState.datePrime.to}`;

      var { store_code } = this.props.match.params;
      const branch_id = getBranchId();
      this.props.fetchAllCalendarShift(store_code, branch_id, param);
    }
    return true;
  }
  handleGetDatePost = (date, typeDate) => {
    console.log(date, typeDate)
    var typeSelect =
      typeDate == "DAY"
        ? "Ngày"
        : typeDate == "WEEK"
          ? "Tuần"
          : typeDate == "MONTH"
            ? "Tháng"
            : ""; this.setState({
              datePrime: {
                from: date.datePrime?.from,
                to: date.datePrime?.to,
              },

              typeDate: typeDate, typeSelect: typeSelect
            });
  };
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);
    var typeSelect =
      value == "DAY"
        ? "Ngày"
        : value == "WEEK"
          ? "Tuần"
          : value == "MONTH"
            ? "Tháng"
            : "";
    this.setState({ typeDate: value, reset: resetId, typeSelect: typeSelect });
  };
  componentDidUpdate() {
    if (this.state.isLoading != true && typeof this.props.permission.timekeeping != "undefined") {
      var permissions = this.props.permission
      // var insert = permissions.timekeeping_shift_add
      // var update = permissions.timekeeping_shift_update
      // var _delete = permissions.timekeeping_shift_delete

      var isShow = permissions.timekeeping

      this.setState({ isLoading: true, insert: true, update: true, _delete: true, isShow })

    }

  }

  render() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    var { calendarShift } = this.props;
    var {
      isShow,
      typeSelect,
      typeDate,
      reset,

      datePrime,
    } = this.state;
    console.log(datePrime, typeSelect,
      typeDate)
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? <div></div> : isShow == true ?

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
                      Sắp xếp lịch làm việc
                    </h4>{" "}
                    <Link
                      to={`/calendar_shift/putALot/${store_code}`}
                      class={`btn btn-info btn-icon-split btn-sm `}
                    >
                      <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                      </span>
                      <span class="text">Xếp ca</span>
                    </Link>
                  </div>

                  <br></br>
                  <div className="card shadow ">
                    <div class="card-header py-3">
                      <div
                        class="row"
                        style={{
                          "justify-content": "space-between",
                          alignItems: "center",
                        }}
                      >

                        <div class="dropdown">
                          <button
                            style={{
                              background: "white",
                              border: "0px",
                              color: "#4141bb",
                            }}
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {typeSelect}
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("DAY")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Ngày
                            </p>
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("WEEK")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Tuần{" "}
                            </p>
                            <p
                              // data-toggle="modal"
                              // data-target="#postDateModal"
                              onClick={() => this.onchangeDate("MONTH")}
                              class="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Tháng
                            </p>
                          </div>
                        </div>
                        <ModalPostDate
                          reset={reset}
                          handleGetDatePost={this.handleGetDatePost}
                          store_code={store_code}
                          typeDate={typeDate}
                        />
                      </div>
                    </div>

                    <div className="card-body">
                      <Table
                        store_code={store_code}
                        branch_id={branch_id}
                        calendarShift={calendarShift}
                        datePrime={datePrime}
                        typeDate={typeDate}
                      />
                    </div>
                  </div>
                </div>
                                                                                                                                        : <NotAccess/>}

              </div>

              {/* <ModalPut
                store_code={store_code}
                branch_id={branch_id}
                calendarShift={calendarShift}
                datePrime={datePrime}
              /> */}

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
    // shifts: state.shiftReducers.shift.allShift,
    alert: state.comboReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    calendarShift: state.calendarShiftReducers.calendarShift.allCalendarShift,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCalendarShift: (store_code, branch_id, params) => {
      dispatch(
        calendarShiftAction.fetchAllCalendarShift(store_code, branch_id, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CalendarShift);
