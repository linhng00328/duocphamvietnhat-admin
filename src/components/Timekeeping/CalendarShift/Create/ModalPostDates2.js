import React, { Component } from "react";
import { connect } from "react-redux";

import FormPostDay2 from "./PostDate2/PostDay2";
import FormPostMonth2 from "./PostDate2/PostMonth2";
import FormPostWeek2 from "./PostDate2/PostWeek2";
import FormPostOption2 from "./PostDate2/PostOption2";

import moment from "moment";

class ModalPostDate2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePrime: "",
      time: "",
    };
  }

  handlePostDate = (date) => {
    // this.setState({
    //   datePrime: date.datePrime,
    // });
    var  datePrime  = date.datePrime;

    var datePrime = {
      from: moment(datePrime.from, "DD-MM-YYYY").format("YYYY-MM-DD"),
      to: moment(datePrime.to, "DD-MM-YYYY").format("YYYY-MM-DD"),
    };

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

  

  onSave = (e) => {
    e.preventDefault();

    var { store_code } = this.props;
    var { datePrime } = this.state;

    var datePrime = {
      from: moment(datePrime.from, "DD-MM-YYYY").format("YYYY-MM-DD"),
      to: moment(datePrime.to, "DD-MM-YYYY").format("YYYY-MM-DD"),
    };

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
        <div class="d-flex" style = {{marginLeft : "20px"}}>
          <FormPostDay2
            reset={reset}
            handlePostDate={this.handlePostDate}
            handleChangeDate
            isDay={isDay}
            typeDate = {typeDate}
          />
          <FormPostMonth2
            reset={reset}
            handlePostDate={this.handlePostDate}
            isMonth={isMonth}
            typeDate = {typeDate}

          />
          <FormPostWeek2
            reset={reset}
            handlePostDate={this.handlePostDate}
            isWeek={isWeek}
            typeDate = {typeDate}

          />
          <FormPostOption2
            reset={reset}
            handlePostDate={this.handlePostDate}
            isOption={isOption}
            typeDate = {typeDate}

          />

          {/* <button
            type="button"
            class="btn btn-info  btn-sm"
            onClick={this.onSave}
          >
            <span class="text">Chọn ngày</span>
          </button> */}
        </div>
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

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ModalPostDate2);
