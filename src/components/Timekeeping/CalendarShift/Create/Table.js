import React, { Component } from "react";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
    };
  }

  removeItem = (id) => {
    this.props.handleAddShift(null, id, "remove", true);
  };

  showData = (shifts) => {
    var result = null;
    if (typeof shifts === "undefined") {
      return result;
    }
    if (shifts.length > 0) {
      result = shifts.map((data, index) => {
        return (
          <tr>
            <td>{data.name}</td>
            <td style={{ textAlign: "center" }}>{`${(
              "0" + data.start_work_hour
            ).slice(-2)}:${("0" + data.start_work_minute).slice(-2)}`}</td>
            <td style={{ textAlign: "center" }}>{`${(
              "0" + data.end_work_hour
            ).slice(-2)}:${("0" + data.end_work_minute).slice(-2)}`}</td>
            {/* {data.start_break_hour === null &&
            data.start_break_minute === null ? (
              <td style={{ textAlign: "center" }}>00:00</td>
            ) : (
              <td style={{ textAlign: "center" }}>{`${(
                "0" + data.start_break_hour
              ).slice(-2)}:${("0" + data.start_break_minute).slice(-2)}`}</td>
            )}
            {data.end_break_hour === null && data.end_break_minute === null ? (
              <td style={{ textAlign: "center" }}>00:00</td>
            ) : (
              <td style={{ textAlign: "center" }}>{`${(
                "0" + data.end_break_hour
              ).slice(-2)}:${("0" + data.end_break_minute).slice(-2)}`}</td>
            )} */}

            <td style={{ textAlign: "center" }}>{data.minutes_late_allow}</td>
            <td style={{ textAlign: "center" }}>
              {data.minutes_early_leave_allow}
            </td>
            <td>
              {data.days_of_week_list
                .sort((a, b) => a - b)
                .map((value) => {
                  if (value === 8) {
                    return `CN, `;
                  } else {
                    return `T${value}, `;
                  }
                })

                .join("")
                .slice(0, -2)}
            </td>

            <td style={{ textAlign: "center" }}>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => this.removeItem(data.id)}
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { shifts } = this.props;

    return (
      <React.Fragment>
        <div class="form-group mb-0">
          <label for="product_name mb-0">Ca làm việc : </label>
        </div>
        {shifts?.length !== 0 ? (
          <div class="form-group">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pl-0">
              <div class="table-responsive">
                <table class="table table-border table-hover">
                  <thead>
                    <tr>
                      <th>Tên ca</th>
                      <th>Thời gian bắt đầu</th>
                      <th>Thời gian kết thúc</th>

                      <th>Phút đi trễ cho phép </th>
                      <th>Phút về sớm cho phép</th>
                      <th>Ngày trong tuần</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{this.showData(shifts)}</tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            <span style={{ color: "#C12026" }}>Chưa chọn ca làm việc</span>
          </>
        )}
        <div
          class={`form-group d-flex align-items-center my-3 ${shifts.length > 0 ? "justify-content-center" : null}`}
          data-toggle="modal"
          data-target="#showListShift"
          style={{ cursor: "pointer" }}
        >
          <button
            type="button"
            class="btn btn-primary-no-background btn-sm"

          >
            <i class="fas fa-plus" ></i>
            <span class="text">&nbsp;Thêm ca</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
