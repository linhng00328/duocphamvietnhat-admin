import React, { Component } from "react";
import * as shiftAction from "../../../../actions/shift";
import { connect } from "react-redux";

import * as Types from "../../../../constants/ActionType";

import { shallowEqual } from "../../../../ultis/shallowEqual";
import { isEmpty } from "../../../../ultis/helpers";
import moment from "moment";
import MomentInput from "react-moment-input";
import "./style.css";
import themeData from "../../../../ultis/theme_data";
import { randomString } from "../../../../ultis/helpers";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: randomString(8),
      start_work_hour: 0,
      start_work_minute: 0,
      end_work_hour: 0,
      end_work_minute: 0,
      start_break_hour: 0,
      start_break_minute: 0,
      icon: false,

      end_break_hour: 0,
      end_break_minute: 0,
      minutes_late_allow: 0,
      minutes_early_leave_allow: 0,
      days_of_week_list: [],

      isCheck: false,
      list_days_of_week_list: [
        {
          id: 0,
          value: 2,
          label: "Thứ Hai",
        },
        {
          id: 1,
          value: 3,
          label: "Thứ Ba",
        },
        {
          id: 2,
          value: 4,
          label: "Thứ Tư",
        },
        {
          id: 3,
          value: 5,
          label: "Thứ Năm",
        },
        {
          id: 4,
          value: 6,
          label: "Thứ Sáu",
        },
        {
          id: 5,
          value: 7,
          label: "Thứ Bảy",
        },
        {
          id: 6,
          value: 8,
          label: "Chủ Nhật",
        },
      ],
    };
  }

  componentDidMount() {}

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.shifts, this.props.shifts)) {
      window.$(".modal").modal("hide");

      this.setState({
        name: "",
        start_work_hour: 0,
        start_work_minute: 0,
        end_work_hour: 0,
        end_work_minute: 0,
        start_break_hour: 0,
        start_break_minute: 0,
        end_break_hour: 0,
        end_break_minute: 0,
        minutes_late_allow: 0,
        minutes_early_leave_allow: 0,
        days_of_week_list: [],
        isCheck: false,
      });
    }
  }

  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');

    const {
      name,
      code,
      end_work_hour,
      end_work_minute,
      start_work_hour,
      start_work_minute,

      start_break_hour,
      start_break_minute,
      end_break_hour,
      end_break_minute,
      minutes_late_allow,
      minutes_early_leave_allow,
      days_of_week_list,
      list_days_of_week_list,

      isCheck,
    } = this.state;

    if (name == null || !isEmpty(name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên ca không được để trống",
        },
      });
      return;
    }
    // if (code == null || !isEmpty(code)) {
    //   this.props.showError({
    //     type: Types.ALERT_UID_STATUS,
    //     alert: {
    //       type: "danger",
    //       title: "Lỗi",
    //       disable: "show",
    //       content: "Mã ca không được để trống",
    //     },
    //   });
    //   return;
    // }
    if (days_of_week_list.length === 0) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa chọn ngày trong tuần",
        },
      });
      return;
    }

    var start = moment(`${start_work_hour}:${start_work_minute}`, "HH:mm");
    var end = moment(`${end_work_hour}:${end_work_minute}`, "HH:mm");
    if (end != "" && start != "") {
      if (!moment(start, "HH:mm").isBefore(moment(end, "HH:mm"))) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Thời gian kết thúc ca phải sau thời gian bắt đầu ca",
          },
        });
        return;
      }
    }

    var start2 = moment(`${start_break_hour}:${start_break_minute}`, "HH:mm");
    var end2 = moment(`${end_break_hour}:${end_break_minute}`, "HH:mm");

    if (end2 != "" && start2 != "") {
      if (
        !moment(start2, "HH:mm").isBefore(moment(end2, "HH:mm")) &&
        !moment(start2, "HH:mm").isSame(
          moment(moment(`${0}:${0}`, "HH:mm"), "HH:mm")
        ) &&
        !moment(end2, "HH:mm").isSame(
          moment(moment(`${0}:${0}`, "HH:mm"), "HH:mm")
        )
      ) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content:
              "Thời gian kết thúc nghỉ ca phải sau thời gian bắt đầu nghỉ ca",
          },
        });
        return;
      }
    }
    const integer_end_work_hour = parseInt(end_work_hour);
    const integer_end_work_minute = parseInt(end_work_minute);
    const integer_start_work_hour = parseInt(start_work_hour);
    const integer_start_work_minute = parseInt(start_work_minute);
    const integer_start_break_hour = parseInt(start_break_hour);
    const integer_start_break_minute = parseInt(start_break_minute);
    const integer_end_break_hour = parseInt(end_break_hour);
    const integer_end_break_minute = parseInt(end_break_minute);
    const integer_minutes_late_allow = parseInt(minutes_late_allow);
    const integer_minutes_early_leave_allow = parseInt(
      minutes_early_leave_allow
    );
    const new_days_of_week_list = days_of_week_list.map((value) => value.value);
    console.log({
      name,
      code,
      end_work_hour: integer_end_work_hour,
      end_work_minute: integer_end_work_minute,
      start_work_hour: integer_start_work_hour,
      start_work_minute: integer_start_work_minute,
      start_break_hour: integer_start_break_hour,
      start_break_minute: integer_start_break_minute,
      end_break_hour: integer_end_break_hour,
      end_break_minute: integer_end_break_minute,
      minutes_late_allow: integer_minutes_late_allow,
      minutes_early_leave_allow: integer_minutes_early_leave_allow,

      days_of_week: new_days_of_week_list,
    });
    // var paymentMethodValue = payment_method.value;
    // var typeValue = type.value;
    // var recipientGroupValue = recipient_group.value;
    // var recipientReferencesIdValue = recipient_references_id?.value
    //   ? recipient_references_id?.value
    //   : null;
    var params = `&limit=${this.props.limit}`;
    this.props.createShift(
      this.props.store_code,
      this.props.branch_id,
      {
        name,
        code,
        end_work_hour: integer_end_work_hour,
        end_work_minute: integer_end_work_minute,
        start_work_hour: integer_start_work_hour,
        start_work_minute: integer_start_work_minute,
        start_break_hour: integer_start_break_hour,
        start_break_minute: integer_start_break_minute,
        end_break_hour: integer_end_break_hour,
        end_break_minute: integer_end_break_minute,
        minutes_late_allow: integer_minutes_late_allow,
        minutes_early_leave_allow: integer_minutes_early_leave_allow,

        days_of_week: new_days_of_week_list,
      },
      params
    );
  };
  onChangeStart = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");
    let arr = time.split(":");
    console.log(e, arr);
    this.setState({
      start_work_hour: arr[0],
      start_work_minute: arr[1],
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");
    let arr = time.split(":");

    this.setState({
      end_work_hour: arr[0],
      end_work_minute: arr[1],
    });
  };

  onChangeStart2 = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");
    let arr = time.split(":");

    this.setState({
      start_break_hour: arr[0],
      start_break_minute: arr[1],
    });
  };

  onChangeEnd2 = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");
    let arr = time.split(":");

    this.setState({
      end_break_hour: arr[0],
      end_break_minute: arr[1],
    });
  };
  handleDayClick = (value) => {
    if (
      this.state.days_of_week_list.some(
        (e) => Object.entries(e).toString() === Object.entries(value).toString()
      )
    ) {
      const arr = this.state.days_of_week_list.filter((x) => {
        return x.id !== value.id;
      });
      this.setState({
        days_of_week_list: arr,
      });
    }
    if (
      !this.state.days_of_week_list.some(
        (e) => Object.entries(e).toString() === Object.entries(value).toString()
      )
    ) {
      this.setState({
        days_of_week_list: [...this.state.days_of_week_list, value],
      });
    }
  };
  onChangeIcon = () => {
    this.setState({ icon: !this.state.icon });
  };
  handleCheck = (e) => {
    if (e.target.checked == true) {
      this.setState({
        days_of_week_list: [...this.state.list_days_of_week_list],
        isCheck: e.target.checked,
      });
    } else {
      this.setState({
        days_of_week_list: [],
        isCheck: e.target.checked,
      });
    }
  };
  render() {
    const {
      name,
      code,
      end_work_hour,
      end_work_minute,
      start_work_hour,
      start_work_minute,

      start_break_hour,
      start_break_minute,
      end_break_hour,
      end_break_minute,
      minutes_late_allow,
      minutes_early_leave_allow,
      days_of_week_list,
      list_days_of_week_list,

      isCheck,
    } = this.state;

    const { shifts } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalCreate"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm ca chấm công</h4>

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
              id="createForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label>Tên ca</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={name}
                    name="name"
                    placeholder="Nhập tên ca"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>
                {/* <div class="form-group">
                  <label>Mã ca</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    value={code}
                    name="code"
                    placeholder="Nhập mã ca"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div> */}
                <div class="form-group">
                  <label for="product_name">Thời gian ca</label>

                  <MomentInput
                    placeholder="Chọn thời gian bắt đầu"
                    value={moment(
                      `${start_work_hour}:${start_work_minute}`,
                      "HH:mm"
                    )}
                    format="HH:mm"
                    tab={1}
                    options={false}
                    enableInputClick={true}
                    // monthSelect={true}
                    readOnly={true}
                    translations={{
                      //   DATE: "Ngày",
                      //   TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={this.onChangeStart}
                    onChange={this.onChangeStart}
                    style={{ marginBottom: "0.5rem" }}
                    // onChange={(date) => {
                    //   console.log(date);
                    // }}
                  />

                  <MomentInput
                    value={moment(
                      `${end_work_hour}:${end_work_minute}`,
                      "HH:mm"
                    )}
                    format="HH:mm"
                    tab={1}
                    options={false}
                    enableInputClick={true}
                    // monthSelect={true}
                    readOnly={true}
                    translations={{
                      //   DATE: "Ngày",
                      //   TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={this.onChangeEnd}
                    onChange={this.onChangeEnd}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Thời gian nghỉ giữa ca</label>

                  <MomentInput
                    placeholder="Chọn thời gian bắt đầu"
                    value={moment(
                      `${start_break_hour}:${start_break_minute}`,
                      "HH:mm"
                    )}
                    format="HH:mm"
                    tab={1}
                    options={false}
                    enableInputClick={true}
                    // monthSelect={true}
                    readOnly={true}
                    translations={{
                      //   DATE: "Ngày",
                      //   TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={this.onChangeStart2}
                    onChange={this.onChangeStart2}
                    style={{ marginBottom: "0.5rem" }}
                    // onChange={(date) => {
                    //   console.log(date);
                    // }}
                  />

                  <MomentInput
                    value={moment(
                      `${end_break_hour}:${end_break_minute}`,
                      "HH:mm"
                    )}
                    format="HH:mm"
                    tab={1}
                    options={false}
                    enableInputClick={true}
                    // monthSelect={true}
                    readOnly={true}
                    translations={{
                      //   DATE: "Ngày",
                      //   TIME: "Giờ",
                      SAVE: "Lưu",
                      HOURS: "Giờ",
                      MINUTES: "Phút",
                    }}
                    onSave={this.onChangeEnd2}
                    onChange={this.onChangeEnd2}
                    // onChange={this.onChangeEnd}
                  />
                </div>

                <div class="form-group">
                  <div class="form-check pl-0">
                    <div class="row">
                      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <h6 style={{ fontWeight: "bold" }}>Ngày trong tuần</h6>
                      </div>
                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={
                            list_days_of_week_list.length ===
                            this.state.days_of_week_list?.length
                              ? true
                              : false
                          }
                          onChange={this.handleCheck}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Tất cả
                        </label>
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center"
                      style={{ flexWrap: "wrap" }}
                    >
                      {list_days_of_week_list.map((value) => {
                        return (
                          <button
                            type="button"
                            class={`btn btn-primary btn-day ${
                              days_of_week_list.some(
                                (e) =>
                                  Object.entries(e).toString() ===
                                  Object.entries(value).toString()
                              )
                                ? "active"
                                : ""
                            }`}
                            index={value.id}
                            onClick={() => {
                              this.handleDayClick(value);
                            }}
                          >
                            {value.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* <div id="accordion">
                  <div>
                    <button
                                    onClick = {this.onChangeIcon}

                      id="headingOne"
                      class="btn btn-link btn-collapse btn-accordion-collapse"
          
                      type="button"
                      style={{
                        width: "100%",
                        textAlign: "left",
                        marginLeft: "0px",
                        padding: "1.5rem 0.5rem",
                        border: "none",
                        paddingLeft: 0,
                        background: "white",
                        borderTop: "1px solid rgba(0,0,0,0.3)",
                        borderBottom: "1px solid rgba(0,0,0,0.3)",
                        paddingLeft: "0px",
                      }}
                    >
                      <h6
                        class="mb-0 f-flex"
                        style={{ fontWeight: "bold", position: "relative" }}
                      >
                        <span>Cài đặt nâng cao</span>        <i
                    class={this.state.icon ? "fa fa-caret-down" : "fa fa-caret-up"}
                  ></i>

                     
                      </h6>
                    </button>

                    <div
                      id="collapseOne"
                      class={`collapse ${this.state.icon ? "show" : "hide"}`}
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div class="form-group">
                        <label
                          style={{
                            marginTop: "0.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          Thời gian cho phép đi muộn
                        </label>
                        <div class="row align-items-center">
                          <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <input
                              type="number"
                              class="form-control"
                              id="minutes_late_allow"
                              value={minutes_late_allow}
                              name="minutes_late_allow"
                              autoComplete="off"
                              onChange={this.onChange}
                              min={0}
                            />
                          </div>
                          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Phút
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Thời gian cho phép về sớm
                        </label>
                        <div class="row align-items-center">
                          <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <input
                              type="number"
                              class="form-control"
                              id="minutes_early_leave_allow"
                              value={minutes_early_leave_allow}
                              name="minutes_early_leave_allow"
                              autoComplete="off"
                              onChange={this.onChange}
                              min={0}
                            />
                          </div>
                          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Phút
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createShift: (store_code, branch_id, data, params) => {
      dispatch(shiftAction.createShift(store_code, branch_id, data, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
