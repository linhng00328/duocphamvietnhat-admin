import React, { Component } from "react";
import { connect } from "react-redux";
import * as timeSheetAction from "../../../actions/time_sheet";
import FormPostDay from "./PostDate/PostDay";
import FormPostMonth from "./PostDate/PostMonth";
import FormPostWeek from "./PostDate/PostWeek";
import FormPostOption from "./PostDate/PostOption";

import moment from "moment";

class ModalPostDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePrime: "",
    };
  }

  handlePostDate = (date) => {
    this.setState({
      datePrime: date.datePrime,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.typeDate !== nextProps.typeDate) {
      if (nextProps.typeDate == "DAY") {
        var datePrime = {
          from: moment().format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
      }
      if (nextProps.typeDate == "WEEK") {
        var datePrime = {
          from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
          to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
        };
      }
      if (nextProps.typeDate == "MONTH") {
        var datePrime = {
          from: moment().startOf("month").format("YYYY-MM-DD"),
          to: moment().endOf("month").format("YYYY-MM-DD"),
        };
      }
      if (nextProps.typeDate == "OPTION") {
        var datePrime = {
          from: moment().format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
      }
      const param = `date_from=${datePrime?.from}&date_to=${datePrime?.to}`;

      var { store_code } = this.props;
      const branch_id = localStorage.getItem("branch_id");
      this.props.fetchAllTimeSheet(store_code, branch_id, param);
    }
  }
  onSave = (e) => {
    console.log("a");
    e.preventDefault();
    window.$(".modal").modal("hide");

    var { datePrime } = this.state;

    var datePrime = {
      from: moment(datePrime.from, "DD-MM-YYYY").format("YYYY-MM-DD"),
      to: moment(datePrime.to, "DD-MM-YYYY").format("YYYY-MM-DD"),
    };
    const param = `date_from=${datePrime.from}&date_to=${datePrime.to}`;

    var { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllTimeSheet(store_code, branch_id, param);

    var { typeDate } = this.props;
    var typeSelect =
      typeDate == "DAY"
        ? "Ngày"
        : typeDate == "WEEK"
        ? "Tuần"
        : typeDate == "MONTH"
        ? "Tháng"
        : "Tùy chọn";
    this.props.handleGetDatePost({ datePrime }, typeSelect);
  };

  render() {
    var { typeDate, reset } = this.props;
    var isDay = typeDate == "DAY" ? "show" : "hide";
    var isWeek = typeDate == "WEEK" ? "show" : "hide";
    var isMonth = typeDate == "MONTH" ? "show" : "hide";
    var isOption = typeDate == "OPTION" ? "show" : "hide";

    return (
      <div
      // class="modal fade"
      // tabindex="-1"
      // role="dialog"
      // id="postDateModal"
      // data-keyboard="false"
      // data-backdrop="static"
      >
        {/* <div class="modal-dialog" role="document">
          <div class="modal-content"> */}
        {/* <div class="modal-header" style={{ background: "white" }}>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div> */}
        {/* <form
          onSubmit={this.onSave}
          role="form"
          action="#"
          method="post"
          id="removeForm"
        > */}
        {/* <div className="modal-body"> */}
        <form onSubmit={this.onSave}>
          <FormPostDay
            reset={reset}
            handlePostDate={this.handlePostDate}
            isDay={isDay}
          />
          <FormPostMonth
            reset={reset}
            handlePostDate={this.handlePostDate}
            isMonth={isMonth}
          />
          <FormPostWeek
            reset={reset}
            handlePostDate={this.handlePostDate}
            isWeek={isWeek}
          />
          <FormPostOption
            reset={reset}
            handlePostDate={this.handlePostDate}
            isOption={isOption}
          />
        </form>
        {/* </div> */}
        {/* <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Đóng
            </button>
            <button type="submit" class="btn btn-info">
              Lưu
            </button>
          </div> */}
        {/* // </form> */}
        {/* </div>
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    timeSheet: state.timeSheetReducers.timeSheet.allTimeSheet,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTimeSheet: (store_code, branch_id, params) => {
      dispatch(
        timeSheetAction.fetchAllTimeSheet(store_code, branch_id, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalPostDate);
