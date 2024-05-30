import React, { Component } from "react";
import * as calendarShiftAction from "../../../../actions/calendar_shift";
import * as staffAction from "../../../../actions/staff";
import * as shiftAction from "../../../../actions/shift";
import { connect } from "react-redux";
import * as helper from "../../../../ultis/helpers";
import * as Types from "../../../../constants/ActionType";
import Table from "./Table";
import ModalListShift from "./ListShift";
import Table2 from "./Table2";
import ModalListStaff from "./ListStaff";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import { isEmpty } from "../../../../ultis/helpers";
import moment from "moment";
import ModalPostDate2 from "../ModalPostDates";
// import ModalPostDate2 from "./ModalPostDates2";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import history from "../../../../history";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      listStaff: [],
      saveListShift: [],
      saveListStaff: [],

      listShift: [],
      typeSelect: "Ngày",
      datePrime: "",
      typeDate: "DAY",
      reset: "",
      showDateTime: "hide",
    };
  }

  componentWillMount() {
    this.setState({
      datePrime: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      },
    });
  }

  handleGetDatePost = (date, value) => {
    console.log(date,value)
    var typeSelect =
      value == "DAY"
        ? "Ngày"
        : value == "WEEK"
          ? "Tuần"
          : value == "MONTH"
            ? "Tháng"
            : "Tùy chọn";
    this.setState({
      datePrime: {
        from: date.datePrime?.from,
        to: date.datePrime?.to,
      },

      typeDate: value, typeSelect: typeSelect
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
            : "Tùy chọn";
    this.setState({ typeDate: value, reset: resetId, typeSelect: typeSelect });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  // componentWillReceiveProps(nextProps){
  //   // if (!shallowEqual(nextProps.shifts, this.props.shifts)) {
  //   //   var { store_code } = this.props;

  //   //   const branch_id = localStorage.getItem("branch_id");
  //   //   var params = `&limit=${10}`;
  //   //   this.props.fetchAllStaff(store_code);
  //   //   this.props.fetchAllShift(store_code, branch_id, 1, params);
  //   // }
  // }
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onchangeDateFromTo = (e) => {
    var from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
    var to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
  };






  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');
    console.log(this.state.datePrime.from, this.state.datePrime.to)
    const {
      listStaff,

      listShift,

      isCheck,
    } = this.state;

    var {store_code} = this.props

    if (listStaff.length === 0) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa chọn nhân viên trong ca",
        },
      });
      return;
    }
    if (listShift.length === 0) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Chưa chọn ca làm việc",
        },
      });
      return;
    }
    var shift_ids = "";
    listShift.data?.forEach((element, index) => {
      if (listShift.length == index + 1) shift_ids = shift_ids + element.id;
      else shift_ids = shift_ids + element.id + ",";
    });
    var staff_ids = "";
    listStaff.data?.forEach((element, index) => {
      if (listStaff.length == index + 1) staff_ids = staff_ids + element.id;
      else staff_ids = staff_ids + element.id + ",";
    });
    console.log(this.state.datePrime, listStaff, listShift);
    const param = `date_from=${moment().startOf("isoWeek").format("YYYY-MM-DD")}&date_to=${moment().endOf("isoWeek").format("YYYY-MM-DD")}`;
    var arr1 = listStaff.map((e) => {
      return e.id;
    });
    var arr2 = listShift.map((e) => {
      return e.id;
    });
    console.log({
      start_time: this.state.datePrime.from,
      end_time: this.state.datePrime.to,
      list_staff_id: arr1,
      list_shift_id: arr2,
    });
    var typeDate = this.state.typeDate || "DAY"
    this.props.putALot(
      this.props.store_code,
      this.props.branch_id,
      {
        start_time: this.state.datePrime.from,
        end_time: this.state.datePrime.to,
        list_staff_id: arr1,
        list_shift_id: arr2,
      },
      param , typeDate
    );
    history.goBack();
  };
  handleAddShift = (shift, id, type, onSave = null) => {
    var shifts = [...this.state.listShift];

    if (type == "remove") {
      if (shifts.length > 0) {
        shifts.forEach((item, index) => {
          if (item.id === id) {
            shifts.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true;
      shifts.forEach((item, index) => {
        if (item.id === shifts.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        shifts.push(shift);
      }
    }
    if (onSave == true)
      this.setState({ saveListShift: shifts, listShift: shifts })
    else
      this.setState({ listShift: shifts })
  };


  onSaveShift = () => {
    this.setState({ saveListShift: [...this.state.listShift] })
  }

  onSaveStaff = () => {
    this.setState({ saveListStaff: [...this.state.listStaff] })
  }

  handleAddStaff = (staff, id, type, onSave = null) => {
    var staffs = [...this.state.listStaff];

    if (type == "remove") {
      if (staffs.length > 0) {
        staffs.forEach((item, index) => {
          if (item.id === id) {
            staffs.splice(index, 1);
          }
        });
      }
    } else {
      var checkExsit = true;
      staffs.forEach((item, index) => {
        if (item.id === staffs.id) {
          checkExsit = false;
          return;
        }
      });
      if (checkExsit == true) {
        staffs.push(staff);
      }
    }
    if (onSave == true)
      this.setState({ saveListStaff: staffs, listStaff: staffs })
    else
      this.setState({ listStaff: staffs })
  



};

render() {
  const {
    listStaff,
    isCheck,
    listShift,
    typeSelect,
    typeDate,
    reset,
    saveListShift,
    saveListStaff,

    datePrime,
  } = this.state;
  const { store_code, staff, shifts } = this.props;
  const branch_id = localStorage.getItem("branch_id");

  return (
    <React.Fragment>
      <form role="form" onSubmit={this.onSave} method="post">
        <div class="box-body">
          <div class="form-group">
            <label for="product_name">Thời gian :</label>

            <div
              class="row"
              style={{
                "justify-content": "flex-start",
                alignItems: "flex-end ",
              }}
            >
              <div className={this.state.showDateTime}>
                <DateRangePickerComponent
                  id="daterangepicker"
                  placeholder="Chọn từ ngày... đến ngày..."
                  format="dd/MM/yyyy"
                  onChange={this.onchangeDateFromTo}
                />
              </div>
              <div class="dropdown" style={{ marginBottom: "3px" }}>
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
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <p
                    // data-toggle="modal"
                    // data-target="#postDateModal"
                    onClick={() => this.onchangeDate("DAY")}
                    class="dropdown-item"
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Ngày
                  </p>
                  <p
                    // data-toggle="modal"
                    // data-target="#postDateModal"
                    onClick={() => this.onchangeDate("WEEK")}
                    class="dropdown-item"
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Tuần{" "}
                  </p>
                  <p
                    // data-toggle="modal"
                    // data-target="#postDateModal"
                    onClick={() => this.onchangeDate("MONTH")}
                    class="dropdown-item"
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Tháng
                  </p>
                  <p
                    onClick={() => this.onchangeDate("OPTION")}
                    class="dropdown-item"
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Tùy chỉnh
                  </p>
                </div>
              </div>
              <ModalPostDate2
              isGet = {true}
                style={{ marginLeft: "20px" }}
                reset={reset}
                handleGetDatePost={this.handleGetDatePost}
                store_code={store_code}
                typeDate={typeDate}
              />
            </div>
          </div>

        </div>
        <div class="box-body">
          <Table
            handleAddShift={this.handleAddShift}
            shifts={saveListShift}
          ></Table>
        </div>

        <div class="box-body">
          <Table2
            handleAddStaff={this.handleAddStaff}
            staffs={saveListStaff}
          ></Table2>
        </div>

        <div class="box-footer">
        <button type = "submit" class="btn btn-info   btn-sm">
                  <i class="fas fa-save"></i>  Tạo

                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class="btn btn-warning   btn-sm"
                >
                  <i class="fas fa-arrow-left"></i> Trở về

                </button>
     
        </div>
      </form>
      <ModalListShift
        onSaveShift={this.onSaveShift}

        handleAddShift={this.handleAddShift}
        listShift={listShift}
        store_code={this.props.store_code}
        shifts={shifts}
        branch_id={branch_id}
      />
      <ModalListStaff
      onSaveStaff = {this.onSaveStaff}
        handleAddStaff={this.handleAddStaff}
        listStaff={listStaff}
        store_code={this.props.store_code}
        staffs={staff}
      />
    </React.Fragment>
  );
}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },

    putALot: (store_code, branch_id, data, params , typeDate) => {
      dispatch(
        calendarShiftAction.putALot(store_code, branch_id, data, params,typeDate)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Form);
