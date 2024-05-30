import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

// import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNoD } from "../../../ultis/helpers";
import moment from "moment";
// import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";
import ModalDetail from "./ModalDetail";
import ModalHistory from "./ModalHistory";
import ModalHistoryRecord from "./ModalHistoryRecord";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      isLoading: false,
      data: [],
      data2: {},
      dataDetail: {},
      idModalShow: null,
      keeping_histories: [],
      recording_time: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.calendarShift, this.props.calendarShift) &&
      nextState.isLoading == false
    ) {
      this.setState({
        isLoading: true,
      });
    }
    return true;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!shallowEqual(this.props.datePrime, nextProps.datePrime)) {
  //     // {from: '2022-04-01', to: '2022-04-01'}

  //   }
  // }
  // componentDidMount() {
  //   console.log({
  //     day: weekday[new Date(this.props.datePrime.from).getDay()],
  //     date: new Date(this.props.datePrime.from).getDate(),
  //   });
  //   this.setState({
  //     arrDate: [
  //       {
  //         day: weekday[new Date(this.props.datePrime.from).getDay()],
  //         date: new Date(this.props.datePrime.from).getDate(),
  //       },
  //     ],
  //   });
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (!shallowEqual(prevProps.datePrime, this.props.datePrime)) {
  //     var arr = [];
  //     var dateFrom = new Date(this.props.datePrime.from);
  //     while (dateFrom <= new Date(this.props.datePrime.to)) {
  //       arr.push(new Date(dateFrom));
  //       dateFrom.setDate(dateFrom.getDate() + 1);
  //     }
  //     var newArr = arr.map((e) => {
  //       return {
  //         day: weekday[new Date(e).getDay()],
  //         date: new Date(e).getDate(),
  //       };
  //     });

  //     this.setState({
  //       arrDate: newArr,
  //     });
  //   }
  //   if (!shallowEqual(prevProps.typeDate, this.props.typeDate)) {
  //     var arr = [];
  //     if (this.props.typeDate == "DAY") {
  //       var datePrime = {
  //         from: moment().format("YYYY-MM-DD"),
  //         to: moment().format("YYYY-MM-DD"),
  //       };
  //     }
  //     if (this.props.typeDate == "WEEK") {
  //       var datePrime = {
  //         from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
  //         to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
  //       };
  //     }
  //     if (this.props.typeDate == "MONTH") {
  //       var datePrime = {
  //         from: moment().startOf("month").format("YYYY-MM-DD"),
  //         to: moment().endOf("month").format("YYYY-MM-DD"),
  //       };
  //     }
  //     var dateFrom = new Date(datePrime.from);
  //     while (dateFrom <= new Date(datePrime.to)) {
  //       arr.push(new Date(dateFrom));
  //       dateFrom.setDate(dateFrom.getDate() + 1);
  //     }
  //     var newArr = arr.map((e) => {
  //       return {
  //         day: weekday[new Date(e).getDay()],
  //         date: new Date(e).getDate(),
  //       };
  //     });
  //     console.log(datePrime, newArr);
  //     this.setState({
  //       arrDate: newArr,
  //     });
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    // if (this.props.typeDate !== nextProps.typeDate) {
    //   var arr = [];
    //   var dateFrom = new Date(this.props.datePrime.from);
    //   while (dateFrom <= new Date(this.props.datePrime.to)) {
    //     arr.push(new Date(dateFrom));
    //     dateFrom.setDate(dateFrom.getDate() + 1);
    //   }
    //   var newArr = arr.map((e) => {
    //     return {
    //       day: weekday[new Date(e).getDay()],
    //       date: new Date(e).getDate(),
    //     };
    //   });
    //   this.setState({
    //     arrDate: newArr,
    //   });
    // }
  }
  getTotalSalary = (listTimeSheet) => {
    var result = null;
    var total = 0;
    if (listTimeSheet.length > 0) {
      result = listTimeSheet?.map((data, index) => {
        if (data.total_salary != null) {
          total = total + data.total_salary;
        }
      });
    }
    return total;
  };
  passData = (keeping_histories, recording_time) => {
    this.setState({ keeping_histories, recording_time });
  };

  showShiftWork = (data) => {
    var result = null;
    result = data.map((data, key) => {
      return (
        <div className="time-shift">
          <span>
            {moment(
              `${data.start_work_hour}:${data.start_work_minute}`,
              "HH:mm"
            ).format("HH:mm")}
          </span>
          -{" "}
          <span>
            {moment(
              `${data.end_work_hour}:${data.end_work_minute}`,
              "HH:mm"
            ).format("HH:mm")}
          </span>
        </div>
      );
    });
    return result;
  };
  showData = (listTimeSheet) => {
    var { store_code, branch_id, timeSheet, datePrime } = this.props;
    console.log(listTimeSheet);

    var result = null;
    if (listTimeSheet.length > 0) {
      result = listTimeSheet?.map((data, index) => {
        var total_seconds = data?.total_seconds;
        total_seconds = total_seconds < 0 ? total_seconds * -1 : total_seconds;
        console.log(
          total_seconds * 1000,
          Math.trunc(moment.duration(data?.total_seconds * 1000).asHours())
        );
        var status1 = data?.keeping_histories[0]?.status;

        var status2 =
          data?.keeping_histories[data?.keeping_histories.length - 1]?.status;

        var status_name1 =
          status1 == 1
            ? "Chờ xử lý"
            : status1 == 2
            ? "Đã đồng ý"
            : status1 == 3
            ? "Đã hủy"
            : null;
        var status_color1 =
          status1 == 1
            ? "secondary"
            : status1 == 2
            ? "success"
            : status1 == 3
            ? "danger"
            : null;

        var status_name2 =
          status1 == 1
            ? "Chờ xử lý"
            : status2 == 2
            ? "Đã đồng ý"
            : status2 == 3
            ? "Đã hủy"
            : null;
        var status_color2 =
          status1 == 1
            ? "secondary"
            : status2 == 2
            ? "success"
            : status2 == 3
            ? "danger"
            : null;

        return (
          <React.Fragment>
            <tr
            // style={{ textAlign: "center", cursor: "pointer" }}
            // data-toggle="modal"
            // data-target="#modalDetail"
            // onClick={() =>
            //   this.setState({
            //     idModalShow: data.staff_id,
            //   })
            // }
            >
              <td style={{ textAlign: "center" }}>
                <div> {data.staff.name}</div>
                <div>{this.showShiftWork(data.shift_work)}</div>
              </td>
              {this.props.typeDate == "DAY" ||
              (this.props.typeDate == "OPTION" &&
                this.props.datePrime.from === this.props.datePrime.to &&
                data?.keeping_histories.length !== 0) ? (
                <React.Fragment>
                  <td
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#modalHistory"
                    onClick={() => {
                      this.passData(
                        data?.keeping_histories,
                        data?.recording_time
                      );
                    }}
                  >
                    {data.keeping_histories?.length > 0 && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            background: "lightgreen",
                            width: "fit-content",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                background: "green",
                                padding: "0.02rem 0.5rem",
                                borderRadius: "50%",
                                marginRight: "0.3rem",
                                color: "green",
                              }}
                            ></span>
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              Vào làm:{" "}
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {moment(
                                data?.keeping_histories[0]?.time_check
                              ).format("HH:mm:ss")}
                            </span>
                            &nbsp;
                            {data?.keeping_histories[0]?.remote_timekeeping ===
                            true ? (
                              ""
                            ) : data?.keeping_histories[0]?.is_bonus == true ? (
                              <span style={{ color: "green" }}>
                                (Thêm công)
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>(Bớt công)</span>
                            )}
                          </div>
                          <div>
                            {data?.keeping_histories[0]?.remote_timekeeping ? (
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  fontSize: "0.7rem",
                                }}
                              >
                                (Từ xa){" "}
                              </span>
                            ) : (
                              <span></span>
                            )}

                            <span style={{ color: "gray" }}>
                              {data?.keeping_histories[0]?.reason
                                ? `Lý do: ${data?.keeping_histories[0]?.reason}`
                                : ""}
                            </span>
                            <span style={{ color: "gray", display: "block" }}>
                              {data?.keeping_histories[0]?.from_user
                                ? `Được tạo bởi: Quản lý ${data?.keeping_histories[0]?.from_user_created?.name}`
                                : `Được tạo bởi:  Nhân viên ${data?.keeping_histories[0]?.from_staff_created?.name}`}
                            </span>
                          </div>
                          <div>
                            {status_name1 !== null && (
                              <span>
                                Trạng thái:{" "}
                                <span
                                  style={{ fontWeight: "500" }}
                                  className={status_color1}
                                >
                                  {status_name1}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            background: "lightgoldenrodyellow",
                            width: "fit-content",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                background: "orange",
                                padding: "0.02rem 0.5rem",
                                borderRadius: "50%",
                                marginRight: "0.3rem",
                                color: "orange",
                              }}
                            ></span>
                            <span
                              style={{ color: "orange", fontWeight: "bold" }}
                            >
                              Tan làm:{" "}
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {moment(
                                data?.keeping_histories[
                                  data?.keeping_histories.length - 1
                                ]?.time_check
                              ).format("HH:mm:ss")}
                            </span>
                            &nbsp;
                            {data?.keeping_histories[
                              data?.keeping_histories.length - 1
                            ]?.remote_timekeeping === true ? (
                              ""
                            ) : data?.keeping_histories[
                                data?.keeping_histories.length - 1
                              ]?.is_bonus == true ? (
                              <span style={{ color: "green" }}>
                                (Thêm công)
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>(Bớt công)</span>
                            )}
                          </div>
                          <div>
                            {data?.keeping_histories[
                              data?.keeping_histories.length - 1
                            ]?.remote_timekeeping ? (
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  fontSize: "0.7rem",
                                }}
                              >
                                (Từ xa){" "}
                              </span>
                            ) : (
                              <span></span>
                            )}

                            <span style={{ color: "gray" }}>
                              {data?.keeping_histories[
                                data?.keeping_histories.length - 1
                              ]?.reason
                                ? `Lý do: ${
                                    data?.keeping_histories[
                                      data?.keeping_histories.length - 1
                                    ]?.reason
                                  }`
                                : ""}
                            </span>
                            <span style={{ color: "gray", display: "block" }}>
                              {data?.keeping_histories[
                                data?.keeping_histories.length - 1
                              ]?.from_user
                                ? `Được tạo bởi: Quản lý ${
                                    data?.keeping_histories[
                                      data?.keeping_histories.length - 1
                                    ]?.from_user_created?.name
                                  }`
                                : `Được tạo bởi:  Nhân viên ${
                                    data?.keeping_histories[
                                      data?.keeping_histories.length - 1
                                    ]?.from_staff_created?.name
                                  }`}
                            </span>
                          </div>
                          <div>
                            {status_name2 !== null && (
                              <span>
                                Trạng thái:{" "}
                                <span
                                  style={{ fontWeight: "500" }}
                                  className={status_color2}
                                >
                                  {status_name2}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <td></td>
                </React.Fragment>
              )}

              {data.total_seconds !== 0 ? (
                <td>
                  {Math.trunc(moment.duration(total_seconds * 1000).asHours())}{" "}
                  giờ {moment.utc(total_seconds * 1000).minutes()} phút -{" "}
                  {formatNoD(
                    data.total_salary ? data.total_salary.toFixed() : 0
                  )}
                  đ
                  <p
                    data-toggle="modal"
                    data-target="#modalHistoryRecord"
                    onClick={() => {
                      this.passData(
                        data?.keeping_histories,
                        data?.recording_time
                      );
                    }}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Chi tiết
                  </p>
                </td>
              ) : (
                <td>0 giờ 0 phút</td>
              )}
               {(this.props.typeDate == "DAY" ||
              (this.props.typeDate == "OPTION" &&
                this.props.datePrime.from === this.props.datePrime.to &&
                data?.keeping_histories.length !== 0) )&&
              <td>{formatNoD(data.salary_one_hour)}đ/h</td>}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  toHHMMSS = (secs) => {
    var sec_num = parseFloat(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return `${hours || 0} giờ ${minutes } phút ${seconds} giây`

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}
  render() {
    var { store_code, branch_id, timeSheet } = this.props;
    var { keeping_histories, recording_time } = this.state;
    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;

    var listTimeSheet =
      typeof timeSheet.list_staff_timekeeping == "undefined"
        ? []
        : timeSheet.list_staff_timekeeping;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    return (
      
      <React.Fragment>
     
        <div class="table-responsive " style={{ minHeight: 300 }}>
          <p style={{ fontWeight: "500" }}>
            Tổng lương:{" "}
            {formatNoD(this.getTotalSalary(listTimeSheet)?.toFixed())}đ
          </p>
          <table
            class="table table-border table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>Nhân viên</td>
                {console.log("133131", this.props.datePrime)}
                {this.props.typeDate == "DAY" ? (
                  <React.Fragment>
                    <td>Vào/Tan ca</td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td></td>
                  </React.Fragment>
                )}
                <td>Số giờ làm</td>
                {this.props.typeDate == "DAY" && <td>Số tiền làm theo giờ</td>}

                {/* {this.props.typeDate == "DAY" ||
                  (this.props.typeDate == "OPTION" &&
                    this.props.datePrime.from === this.props.datePrime.to) ? (
                  <td>Hành động</td>
                ) : (
                  <td></td>
                )} */}
              </tr>

              {this.showData(listTimeSheet)}
            </tbody>
          </table>
          <ModalDetail
            resetModal={this.props.resetModal}
            store_code={store_code}
            branch_id={branch_id}
            time_sheet_id={this.state.idModalShow}
            dataDetail={this.state.dataDetail}
            timeSheet={this.props.timeSheet}
            datePrime={this.props.datePrime}
            typeDate={this.props.typeDate}
          />
          <ModalHistory keeping_histories={keeping_histories} />
          <ModalHistoryRecord recording_time={recording_time} />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
