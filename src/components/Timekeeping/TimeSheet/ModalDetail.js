import React, { Component } from "react";
// import * as shiftAction from "../../../../actions/shift";
import { connect } from "react-redux";

import * as Types from "../../../constants/ActionType";

import { shallowEqual } from "../../../ultis/shallowEqual";
import { isEmpty } from "../../../ultis/helpers";

// import { compressed } from "../../ultis/helpers";
// import * as helper from "../../ultis/helpers";
import themeData from "../../../ultis/theme_data";

// import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import moment from "moment";
import MomentInput from "react-moment-input";
import * as timeSheetAction from "../../../actions/time_sheet";
class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff_name: "",
      staff_id: null,
      reason: "",
      checkin_date: moment().format("DD-MM-YYYY"),
      checkout_date: "",
      checkin_hour: "00:00",
      checkout_hour: "00:00",
      is_bonus: null,
    };
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
    if (nextProps.resetModal != this.props.resetModal) {
      this.setState({
        staff_name: "",
        staff_id: null,
        reason: "",
        checkin_date: moment().format("DD-MM-YYYY"),
        checkout_date: "",
        checkin_hour: "00:00",
        checkout_hour: "00:00",
        is_bonus: null,
        selectValue: null,
      })
    }
    // if (!shallowEqual(nextProps.dataDetail, this.props.dataDetail)) {
    //   window.$(".modal").modal("hide");
    //   const { dataDetail, time_sheet_id } = this.props;
    //   console.log(this.props.dataDetail);
    //   this.setState({
    //     staff_id: dataDetail.staff?.id,
    //     reason: dataDetail?.keeping_histories[0]?.reason,
    //     checkin_time: moment(
    //       dataDetail?.keeping_histories[0]?.time_check
    //     ).format("YYYY-MM-DD HH:mm:ss"),
    //     checkout_time: moment(
    //       dataDetail?.keeping_histories[
    //         dataDetail?.keeping_histories.length - 1
    //       ]?.time_check
    //     ).format("YYYY-MM-DD HH:mm:ss"),
    //     is_bonus: dataDetail?.keeping_histories[0]?.isBonus,
    //   });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowEqual(prevProps.dataDetail, this.props.dataDetail)) {
      const { dataDetail, time_sheet_id } = this.props;

      if (dataDetail?.keeping_histories.length !== 0) {
        var checkin_date = moment(
          dataDetail?.keeping_histories[0]?.time_check
        ).format("DD-MM-YYYY");
      } else {
        var checkin_date = "";
      }
      if (dataDetail?.keeping_histories.length !== 0) {
        var checkout_date = moment(
          dataDetail?.keeping_histories[
            dataDetail?.keeping_histories.length - 1
          ]?.time_check
        ).format("DD-MM-YYYY");
      } else {
        var checkout_date = "";
      }

      if (dataDetail?.keeping_histories.length !== 0) {
        var checkin_hour = moment(
          dataDetail?.keeping_histories[0]?.time_check
        ).format("HH:mm:ss");
      } else {
        var checkin_hour = "00:00";
      }
      if (dataDetail?.keeping_histories.length !== 0) {
        var checkout_hour = moment(
          dataDetail?.keeping_histories[
            dataDetail?.keeping_histories.length - 1
          ]?.time_check
        ).format("HH:mm:ss");
      } else {
        var checkout_hour = "00:00";
      }



      this.setState({
        staff_name: dataDetail.staff.name,
        staff_id: dataDetail.staff.id,
        reason: dataDetail?.keeping_histories[dataDetail?.keeping_histories.length - 1]?.reason,
        checkin_date: checkin_date,
        checkout_date: checkout_date,
        checkin_hour: checkin_hour,
        checkout_hour: checkout_hour,
        is_bonus: dataDetail?.keeping_histories[dataDetail?.keeping_histories.length - 1]?.is_bonus,
      });
    }
  }

  onSave = async (e) => {
    e.preventDefault();

    const {
      staff_id,
      reason,
      checkin_date,
      checkout_date,
      checkin_hour,
      checkout_hour,
      is_bonus,
      staff_name,
    } = this.state;
    const { dataDetail, time_sheet_id } = this.props;
    if (reason == null || !isEmpty(reason)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Lý do không được để trống",
        },
      });
      return;
    }
    if (is_bonus == null || is_bonus == undefined || !isEmpty(is_bonus)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa chọn thêm công/bớt công",
        },
      });
      return;
    }
    if (staff_id == null || staff_id == "") {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa chọn nhân viên",
        },
      });
      return;
    }
    var start = moment(checkin_hour, "HH:mm");
    var end = moment(checkout_hour, "HH:mm");
    if (end != "" && start != "") {
      if (!moment(start, "HH:mm").isBefore(moment(end, "HH:mm"))) {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Thời gian checkout phải sau thời gian checkin",
          },
        });
        return;
      }
    }
    // window.$(".modal").modal("hide");

    let params = `date_from=${this.props.datePrime.from}&date_to=${this.props.datePrime.to}`;
    var date1 = null;
    var date2 = null
    console.log(checkin_date)
    if (checkin_date) {
       date1 = moment(
        `${moment(checkin_date, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )} ${checkin_hour}`
      ).format("YYYY-MM-DD HH:mm:ss");
       date2 = moment(
        `${moment(checkin_date, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )} ${checkout_hour}`
      ).format("YYYY-MM-DD HH:mm:ss");
    } 
    // if (checkout_date) {
    //   var date2 = moment(
    //     `${moment(checkout_date, "DD-MM-YYYY").format(
    //       "YYYY-MM-DD"
    //     )} ${checkout_hour}`
    //   ).format("YYYY-MM-DD HH:mm:ss");
    // } else {
    //   var date2 = moment(
    //     `${moment(this.props.datePrime.to, "YYYY-MM-DD").format(
    //       "YYYY-MM-DD"
    //     )} ${checkout_hour}`
    //   ).format("YYYY-MM-DD HH:mm:ss");
    // }

    console.log(this.props.store_code,
      this.props.branch_id,
      params,
      {
        is_bonus: is_bonus,
        checkin_time: date1,
        checkout_time: date2,
        reason: reason,
        staff_id: staff_id,
      },
    )

    this.props.bonusLessCheckinCheckout(
      this.props.store_code,
      this.props.branch_id,
      params,
      {
        is_bonus: is_bonus,
        checkin_time: date1,
        checkout_time: date2,
        reason: reason,
        staff_id: staff_id,
      }
    );
    window.$(".modal").modal("hide");
  };

  onChangeStart = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");

    console.log("timestart", time);
    this.setState({
      checkin_hour: time,
    });
  };

  onChangeEnd = (e) => {
    var time = moment(e, "HH:mm").format("HH:mm");
    console.log("timesend", time);

    this.setState({
      checkout_hour: time,
    });
  };


  listStaff = () => {

    var listStaff = []

    this.props.staff.map((staff) => {
      listStaff.push(
        { value: staff.id, label: staff.name, id: staff.id }
      );
    })


    return listStaff
  }

  onChangeStaff = (selectValue) => {
    if(selectValue)
    {
      this.setState({
        selectValue: selectValue,
        staff_name: selectValue.name,
        staff_id: selectValue.id,
      });
    }
 
  };

  onChangeDate = (e) => {
    var time = ""
    time = moment(e, "DD-MM-YYYY").format("DD-MM-YYYY");
    this.setState({
      checkin_date: time,
    });
  };

  render() {
    const {
      staff_id,
      reason,
      checkin_date,
      checkout_date,
      checkin_hour,
      checkout_hour,
      is_bonus,
      staff_name,
      listStaff
    } = this.state;
    const { datePrime } = this.props;

    console.log(checkin_date)

    return (
      <div
        class="modal fade modalDetail"
        tabindex="-1"
        role="dialog"
        id="modalDetail"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4 style={{ color: "white" }}>Thêm bớt công</h4>

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

                <Select
                  isClearable
                  isSearchable
                  placeholder="-- Chọn nhân viên --"
                  value={this.state.selectValue}
                  options={this.listStaff()}
                  name="recipientReferences"
                  onChange={this.onChangeStaff}
                />

                {/* <div class="form-group">
                  <label>Tên nhân viên</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={staff_name ? staff_name : ""}
                    name="name"
                    disabled
                    onChange={this.onChange}
                  />
                </div> */}


                <div class="form-group">
                  <label>Ngày yêu cầu</label>
                  <MomentInput
                    value={
                      checkin_date && checkin_date != ""
                        ? moment(checkin_date, "DD-MM-YYYY")
                        : moment()
                    }
                    format="DD-MM-YYYY"
                    options={false}
                    tab={0}

                    enableInputClick={true}
                    monthSelect={true}
                    readOnly={true}

                    translations={
                      { DATE: "Ngày", TIME: "Giờ", SAVE: "Đóng", HOURS: "Giờ", MINUTES: "Phút" }
                    }
                    onSave={() => { }}
                    onChange={this.onChangeDate}
                  />
                  {/* <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={
                      checkin_date
                        ? checkin_date
                        : moment(datePrime.from).format("DD-MM-YYYY")
                    }
                    name="name"
                    // disabled
                    onChange={this.onChange}
                  /> */}
                </div>

                <div class="form-group">
                  <label for="product_name">Bắt đầu</label>

                  <MomentInput
                    placeholder="Chọn thời gian bắt đầu"
                    value={moment(checkin_hour, "HH:mm")}
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
                  />
                </div>
                {/* <div class="form-group">
                  <label>Ngày checkout</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={
                      checkout_date
                        ? checkout_date
                        : moment(datePrime.to).format("DD-MM-YYYY")
                    }
                    name="name"
                    disabled
                    onChange={this.onChange}
                  />
                </div> */}
                <div class="form-group">
                  <label for="product_name">Kết thúc</label>

                  <MomentInput
                    placeholder="Chọn thời gian bắt đầu"
                    value={moment(checkout_hour, "HH:mm")}
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
                  <label>Lý do</label>
                  <input
                    type="text"
                    class="form-control"
                    id="reason"
                    value={reason ? reason : ""}
                    name="reason"
                    placeholder="Nhập lý do"
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked={is_bonus === true}
                    onClick={() => {
                      this.setState({
                        is_bonus: true,
                      });
                    }}
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Thêm công
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                    checked={is_bonus === false}
                    onClick={() => {
                      this.setState({
                        is_bonus: false,
                      });
                    }}
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    Bớt công
                  </label>
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
    // shiftDetail: state.shiftReducers.shift.shiftId,
    staff: state.staffReducers.staff.allStaff,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    bonusLessCheckinCheckout: (store_code, branch_id, params, data) => {
      dispatch(
        timeSheetAction.bonusLessCheckinCheckout(
          store_code,
          branch_id,
          params,
          data
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail);
