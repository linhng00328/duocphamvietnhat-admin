import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

// import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../../ultis/shallowEqual";
import "./style.css";
import ModalDetail from "./Detail/Modal";
import moment from "moment";
// import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";
const weekday = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      arrDate: [],

      isLoading: false,
      data: [],
      data2: {},
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
  componentDidMount() {
    var arr = []
    var datePrime = {
      from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
          to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
    };
    var dateFrom = new Date(datePrime.from);
    while (dateFrom <= new Date(datePrime.to)) {
      arr.push(new Date(dateFrom));
      dateFrom.setDate(dateFrom.getDate() + 1);
    }
    var newArr = arr.map((e) => {
      return {
        day: weekday[new Date(e).getDay()],
        date: new Date(e).getDate(),
      };
    });
    this.setState({
      arrDate: newArr,
    });
    // this.setState({
    //   arrDate: [
    //     {
    //       day: weekday[new Date(this.props.datePrime.from).getDay()],
    //       date: new Date(this.props.datePrime.from).getDate(),
    //     },
    //   ],
    
    // });

  }
  componentDidUpdate(prevProps, prevState) {
    if (!shallowEqual(prevProps.datePrime, this.props.datePrime)) {
      var arr = [];
      var dateFrom = new Date(this.props.datePrime.from);
      while (dateFrom <= new Date(this.props.datePrime.to)) {
        arr.push(new Date(dateFrom));
        dateFrom.setDate(dateFrom.getDate() + 1);
      }
      var newArr = arr.map((e) => {
        return {
          day: weekday[new Date(e).getDay()],
          date: moment(e).format("DD-MM-YYYY"),
        };
      });

      this.setState({
        arrDate: newArr,
      });
      console.log("vao roi", newArr);

    }
    if (!shallowEqual(prevProps.typeDate, this.props.typeDate  )) {
      var arr = [];
      if (this.props.typeDate == "DAY") {
        var datePrime = {
          from: moment().format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
      }
      if (this.props.typeDate == "WEEK") {
        var datePrime = {
          from: moment().startOf("isoWeek").format("YYYY-MM-DD"),
          to: moment().endOf("isoWeek").format("YYYY-MM-DD"),
        };
      }
      if (this.props.typeDate == "MONTH") {
        var datePrime = {
          from: moment().startOf("month").format("YYYY-MM-DD"),
          to: moment().endOf("month").format("YYYY-MM-DD"),
        };
      }
      if(typeof datePrime == "undefined")
      {
        var datePrime = {
          from: moment().format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
      }
      var dateFrom = new Date(datePrime.from);
      while (dateFrom <= new Date(datePrime.to)) {
        arr.push(new Date(dateFrom));
        dateFrom.setDate(dateFrom.getDate() + 1);
      }
      var newArr = arr.map((e) => {
        return {
          day: weekday[new Date(e).getDay()],
          date: new Date(e).getDate(),
        };
      });
      this.setState({
        arrDate: newArr,
      });
    }

  }
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

  showData = (listCalendarShift) => {
    var { store_code, branch_id, calendarShift, datePrime } = this.props;
    console.log(listCalendarShift);

    var result = null;
    if (listCalendarShift.length > 0) {
      result = listCalendarShift?.map((data, index) => {
        return (
          <React.Fragment>
            <tr>
              {/* <td>{ data.staff_in_time }</td>
              <td data-toggle="modal"
              data-target="#modalDetail"
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({
                  idModalShow: data.id,
                })
              }>{}</td> */}

              <td >
                <span style = {{fontWeight : "500"}}>{data.shift.name}</span>  ( {moment(`${data.shift.start_work_hour}:${data.shift.start_work_minute}` , "HH:mm").format("HH:mm")} - {moment(`${data.shift.end_work_hour}:${data.shift.end_work_minute}` , "HH:mm").format("HH:mm")})
               
              </td>

              {data.staff_in_time.map((data2) => {
                return (
                  <td>
                    <div
                      style={{
                        height: "100px",
                        overflowY: "hidden",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      data-toggle="modal"
                      data-target="#modalDetail"
                      // onClick={() =>
                      //   this.setState({
                      //     idModalShow: data.id,
                      //   })
                      // }
                      onClick={() =>
                        this.setState({
                          data2: data2,
                          data: data,
                        })
                      }
                    >
                      <span
                        style={{
                          height: "20px",
                          color: "dimgray",
                          position: "absolute",
                          bottom: "-4px",
                          right: 0,
                        }}
                      >
                        {data2.staff_work?.length > 3 ? (
                          <span>
                            ...+{data2.staff_work.length - 3} Nhân viên
                          </span>
                        ) : null}
                      </span>
                      {data2.staff_work
                        ? data2.staff_work.map((data3) => {
                            return (
                              <>
                                <h6 style={{ height: "25px" }}>{data3.name}</h6>
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, branch_id, calendarShift } = this.props;

    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;

    var listCalendarShift =
      typeof calendarShift == "undefined" ? [] : calendarShift;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    console.log(this.state.arrDate)
    return (
      <React.Fragment>
        <div
          class="table-responsive table-transpose"
          style={{ minHeight: 370 }}
        >
          <table
            class="table table-bordered  "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <tbody>
              <tr>
                <td style = {{fontWeight : "500"}}>Lịch</td>
                {/* {console.log(
                  calendarShift,
                  calendarShift?.map((value) => {
                    console.log(value);
                    return <th>{value?.shift?.name}</th>;
                  })
                )}
                {calendarShift?.map((value) => {
                  return <th>{value?.shift?.name}</th>;
                })} */}

                {this.state.arrDate?.map((e) => {
                  return (
                    <td style = {{fontWeight : "500"}}>
                      {e.day}, {e.date}
                    </td>
                  );
                })}
              </tr>

              {this.showData(listCalendarShift)}
            </tbody>
          </table>
          <ModalDetail
            store_code={store_code}
            branch_id={branch_id}
            // calendar_shift_id={this.state.idModalShow}
            data2={this.state.data2}
            data={this.state.data}
            datePrime={this.props.datePrime}
          />
          {/* <ModalDetail
            store_code={store_code}
            branch_id={branch_id}
            revenue_expenditure_id={this.state.idModalShow}
            staff={staff}
            supplier={supplier}
            customers={customers}
          /> */}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
