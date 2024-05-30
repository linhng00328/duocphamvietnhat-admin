import React, { Component } from "react";
import { connect } from "react-redux";
import * as reportAction from "../../actions/report";
import FormPostDay from "./PostDate/PostDay";
import FormPostMonth from "./PostDate/PostMonth";
import FormPostWeek from "./PostDate/PostWeek";
import FormPostYear from "./PostDate/PostYear";
import FormPostOption from "./PostDate/PostOption";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import { dateToNumber } from "xlsx-populate/lib/dateConverter";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
class ModalPostDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePrime: "",
      dateCompare: "",
      hasCompare: "",
    };
  }

  handlePostDate = (date) => {
    this.setState({
      datePrime: date.datePrime,
      dateCompare: date.dateCompare,
      hasCompare: date.isShowCompare,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");

    var { store_code } = this.props;
    var { datePrime, dateCompare, hasCompare } = this.state;

    var datePrime = {
      from: moment(datePrime.from, "DD-MM-YYYY").format("YYYY-MM-DD"),
      to: moment(datePrime.to, "DD-MM-YYYY").format("YYYY-MM-DD"),
    };
    var dateCompare = {
      from: moment(dateCompare.from, "DD-MM-YYYY").format("YYYY-MM-DD"),
      to: moment(dateCompare.to, "DD-MM-YYYY").format("YYYY-MM-DD"),
    };
    if (hasCompare == "show")
      this.props.fetchOverview(
        store_code,
        `?date_from=${datePrime.from}&date_to=${
          datePrime.to
        }&date_from_compare=${dateCompare.from}&date_to_compare=${
          dateCompare.to
        }&agency_by_customer_id=${
          this.props.agency_by_customer_id ?? ""
        }&collaborator_by_customer_id=${
          this.props.collaborator_by_customer_id ?? ""
        }`
      );
    else
      this.props.fetchOverview(
        store_code,
        `?date_from=${datePrime.from}&date_to=${
          datePrime.to
        }&agency_by_customer_id=${
          this.props.agency_by_customer_id ?? ""
        }&collaborator_by_customer_id=${
          this.props.collaborator_by_customer_id ?? ""
        }`
      );

    var { typeDate } = this.props;
    var typeSelect =
      typeDate == "DAY"
        ? "Ngày"
        : typeDate == "WEEK"
        ? "Tuần"
        : typeDate == "MONTH"
        ? "Tháng"
        : typeDate == "YEAR"
        ? "Năm"
        : typeDate == "OPTION"
        ? "Tùy chọn"
        : "Hôm nay";
    this.props.handleGetDatePost(
      { datePrime, dateCompare, hasCompare },
      typeSelect
    );
  };

  render() {
    var { typeDate, reset } = this.props;
    var isDay = typeDate == "DAY" ? "show" : "hide";
    var isWeek = typeDate == "WEEK" ? "show" : "hide";
    var isMonth = typeDate == "MONTH" ? "show" : "hide";
    var isYear = typeDate == "YEAR" ? "show" : "hide";
    var isOption = typeDate == "OPTION" ? "show" : "hide";

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="postDateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "white" }}>
              <h4 class="modal-title" style={{ color: "black" }}>
                Chọn ngày
              </h4>

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
              id="removeForm"
            >
              <div className="modal-body">
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
                  <FormPostYear
                    reset={reset}
                    handlePostDate={this.handlePostDate}
                    isYear={isYear}
                  />
                  <FormPostOption
                    reset={reset}
                    handlePostDate={this.handlePostDate}
                    isOption={isOption}
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
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

const mapDispatchToProps = (dispatch, props) => {
  const branch_id = getBranchId();
  const branch_ids = getBranchIds();
  const branchIds = branch_ids ? branch_ids : branch_id;
  return {
    fetchOverview: (store_code, params) => {
      dispatch(reportAction.fetchOverview(store_code, branchIds, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalPostDate);
