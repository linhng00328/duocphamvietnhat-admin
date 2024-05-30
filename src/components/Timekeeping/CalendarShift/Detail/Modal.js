import React, { Component } from "react";
import * as calendarShiftAction from "../../../../actions/calendar_shift";
import * as staffAction from "../../../../actions/staff";
import { connect } from "react-redux";
import themeData from "../../../../ultis/theme_data";

import * as Types from "../../../../constants/ActionType";

import { shallowEqual } from "../../../../ultis/shallowEqual";
import { isEmpty } from "../../../../ultis/helpers";
import moment from "moment";
import { getBranchId } from "../../../../ultis/branchUtils";

// import { compressed } from "../../ultis/helpers";
// import * as helper from "../../ultis/helpers";

// import CurrencyInput from "react-currency-input-field";
// import Select from "react-select";
const weekday = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      listStaff: [],

      listAllStaff: [],
    };
  }

  componentDidMount() {
    var { store_code } = this.props;
    const branch_id = getBranchId()
    var params = `limit=${10}&branch_id=${getBranchId()}`;
    this.props.fetchAllStaff(store_code , null , params , null );
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.data2, this.props.data2)) {
      window.$(".modal").modal("hide");
      const { store_code, branch_id, data2 } = nextProps;
      // this.props.fetchCalendarShiftId(store_code, branch_id, calendar_shift_id);
      this.props.fetchAllStaff(store_code);

      this.setState({
        listStaff: data2.staff_work,
        isCheck :  data2.staff_work?.length == this.props.staff?.length ? true : false,
        listAllStaff: this.props.staff.map((e) => {
          return { name: e.name, id: e.id, avatar_image: e.avatar_image };
        }),
      });
    }
  }

  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');

    const {
      // name,
      // code,

      listStaff,
    } = this.state;
    const { data2, data } = this.props;

    console.log(listStaff)

    // if (listStaff.length === 0) {
    //   this.props.showError({
    //     type: Types.ALERT_UID_STATUS,
    //     alert: {
    //       type: "danger",
    //       title: "Lỗi",
    //       disable: "show",
    //       content: "Chưa chọn nhân viên trong ca",
    //     },
    //   });
    //   return;
    // }

    var arr = listStaff.map((e) => {
      return e.id;
    });
    const param = `date_from=${this.props.datePrime.from}&date_to=${this.props.datePrime.to}`;
    this.props.putOne(
      this.props.store_code,
      this.props.branch_id,
      {
        date: data2.date,
        shift_id: data.shift.id,
        list_staff_ids: arr,
      },
      param
    );
    window.$(".modal").modal("hide");
  };

  handleStaffClick = (value) => {
    console.log(this.props.datePrime.from , this.props.datePrime.to)
    if (
      this.state.listStaff?.some(
        (e) => Object.entries(e).toString() === Object.entries(value).toString()
      )
    ) {
      const arr = this.state.listStaff.filter((x) => {
        return x.id !== value.id;
      });
      this.setState({
        listStaff: arr,
      });
    }
    if (
      !this.state.listStaff?.some(
        (e) => Object.entries(e).toString() === Object.entries(value).toString()
      )
    ) {
      this.setState({
        listStaff: [...this.state.listStaff, value],
      });
    }
  };
  handleCheck = (e) => {
    if(e.target.checked == false)
    {
      this.setState({
        listStaff: [],
        isCheck: e.target.checked,
      });
    }
    else{
      this.setState({
        listStaff: [...this.state.listAllStaff],
        isCheck: e.target.checked,
      });
    }
    // if (this.state.listStaff.length === this.state.listAllStaff.length) {
    //   this.setState({
    //     listStaff: [],
    //     isCheck: !this.state.isCheck,
    //   });
    // } else {
    //   this.setState({
    //     listStaff: [...this.state.listAllStaff],
    //     isCheck: !this.state.isCheck,
    //   });
    // }
  };
  render() {
    const { data2, data, staff } = this.props;

    const { listStaff, listAllStaff, isCheck } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalDetail"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <div>
                <h4
                  class="modal-title"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {data.shift.name} (
                  {`${("0" + data.shift.start_work_hour).slice(-2)}:${(
                    "0" + data.shift.start_work_minute
                  ).slice(-2)}`}{" "}
                  -{" "}
                  {`${("0" + data.shift.end_work_hour).slice(-2)}:${(
                    "0" + data.shift.end_work_minute
                  ).slice(-2)}`}
                  )
                </h4>
                <h6 style={{ color: "white" }}>
                  {weekday[new Date(data2.date).getDay()]},{" "}
                  {new Date(data2.date).getDate()} tháng{" "}
                  {new Date(data2.date).getMonth() + 1}{" "}
                  {new Date(data2.date).getFullYear()}
                </h6>
              </div>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="createForm2"
            >
              <div class="modal-body">
                <div class="form-group">
                  <div class="form-check pl-0">
                    <div class="row">
                      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <h6 style={{ fontWeight: "bold" }}>
                          {listStaff.length}/{listAllStaff.length} Nhân viên
                        </h6>
                      </div>
                      <div
                        class="col-xs-5 col-sm-5 col-md-5 col-lg-5 "
                        style={{ position: "relative" }}
                      >
                        <div class="form-check">
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                            style={{ position: "absolute", right: "3.2rem" }}
                          >
                            Tất cả nhân viên
                          </label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            checked={isCheck}
                            onChange={this.handleCheck}
                            style={{ position: "absolute", right: "2rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center"
                      style={{ flexWrap: "wrap" }}
                    >
                      {listAllStaff?.map((value) => {
                        return (
                          <button
                            type="button"
                            class={`btn btn-primary btn-day ${
                              this.state.listStaff?.some(
                                (e) =>
                                  Object.entries(e).toString() ===
                                  Object.entries(value).toString()
                              )
                                ? "active"
                                : ""
                            }`}
                            index={value.id}
                            onClick={() => {
                              this.handleStaffClick(value);
                            }}
                          >
                            {value.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
              <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu

                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // calendarShiftDetail:
    //   state.calendarShiftReducers.calendarShift.calendarShiftId,
    staff: state.staffReducers.staff.allStaff,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    putOne: (store_code, branch_id, data, params) => {
      dispatch(calendarShiftAction.putOne(store_code, branch_id, data, params));
    },
    fetchAllStaff: (id , page , params , branch_id) => {
      dispatch(staffAction.fetchAllStaff(id , page , params , branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
