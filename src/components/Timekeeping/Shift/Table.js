import React, { Component } from "react";
import { Link } from "react-router-dom";
import { shallowEqual } from "../../../ultis/shallowEqual";
import $ from "jquery";
import ModalEdit from "./Edit/Modal";
import ModalDelete from "./Delete/Modal";
import { connect } from "react-redux";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idModalShow: null,
      isLoading: false,
      modal: {
        table: "",
        id: "",
        store_code: "",
        branch_id: "",
      },
    };
  }
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };



  showData = (shifts, per_page, current_page) => {
    var { store_code, branch_id } = this.props;
    var result = null;

    if (typeof shifts === "undefined") {
      return result;
    }
    if (shifts.length > 0) {
      //   var { update, _delete } = this.props;

      result = shifts.map((data, index) => {
        return (
          <React.Fragment>
            <tr
            // data-toggle="modal"
            // data-target="#modalEdit"
            // style={{ cursor: "pointer" }}
            // onClick={() =>
            //   this.setState({
            //     idModalShow: data.id,
            //   })
            // }
            >
              <td style={{ textAlign: "center" }}>
                {per_page * (current_page - 1) + (index + 1)}
              </td>
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
              {data.end_break_hour === null &&
              data.end_break_minute === null ? (
                <td style={{ textAlign: "center" }}>00:00</td>
              ) : (
                <td style={{ textAlign: "center" }}>{`${(
                  "0" + data.end_break_hour
                ).slice(-2)}:${("0" + data.end_break_minute).slice(-2)}`}</td>
              )} */}

              {/* <td style={{ textAlign: "center" }}>{data.minutes_late_allow}</td>
              <td style={{ textAlign: "center" }}>
                {data.minutes_early_leave_allow}
              </td> */}
              <td style = {{textAlign : "center"}}>
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
              <td style = {{textAlign : "center"}} >
                <button
                  class={`btn btn-warning btn-sm `}
                  data-toggle="modal"
                  data-target="#modalEdit"
                  name=""
                  onClick={() =>

                    this.setState({
                      idModalShow: data.id,
                    })
                  }
                >
                  <i class="fa fa-edit"></i> Sửa
                </button>
                <button
                  // onClick={(e) => {
                  //   this.handleDelCallBack(
                  //     e,
                  //     this.props.store_code,
                  //     this.props.branch_id,
                  //     this.props.shiftDetail.id,
                  //     this.props.shiftDetail.name
                  //   );
                  // }}
                  onClick={(e) => {
                    this.handleDelCallBack(

                      {
                        store_code: this.props.store_code,
                        branch_id: this.props.branch_id,
                        id: data.id,
                        name: data.name
                      }
                    );
                  }}
                  style = {{marginLeft: "7px"}}
                  name="delete"
                  data-toggle="modal"
                  data-target="#removeModal"
                  class={`btn btn-danger btn-sm`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
              </td>
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
    var { shifts, store_code, branch_id } = this.props;
    var { modal } = this.state;
    var listShifts = typeof shifts.data == "undefined" ? [] : shifts.data;

    return (
      <React.Fragment>
        <div class="table-responsive" style={{ minHeight: 370 }}>
          <table
            class="table table-border table-hover table-striped"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên ca</th>

                <th style = {{textAlign : "center"}}>Thời gian bắt đầu</th>
                <th style = {{textAlign : "center"}}>Thời gian kết thúc</th>
{/* 
                <th>Phút đi trễ cho phép </th>
                <th>Phút về sớm cho phép</th> */}
                <th style = {{textAlign : "center"}}>Ngày trong tuần</th>
                <th style = {{textAlign : "center"}}>Hành động</th>

              </tr>
            </thead>

            <tbody>
              {this.showData(shifts.data, shifts.per_page, shifts.current_page)}
            </tbody>
          </table>

          <ModalEdit
            store_code={store_code}
            branch_id={branch_id}
            shift_id={this.state.idModalShow}
            handleDelCallBack={this.handleDelCallBack}
            limit={this.props.limit}
          />
          <ModalDelete modal={modal} limit={this.props.limit} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shiftDetail: state.shiftReducers.shift.shiftId,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);