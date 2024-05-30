import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as scheduleAction from "../../actions/schedule";
import moment from "moment";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, scheduleId, name) => {
    this.props.handleDelCallBack({
      table: "Lịch thông báo",
      id: scheduleId,
      name,
    });
    event.preventDefault();
  };

  stopSchedule = (item) => {
    var { store_code } = this.props;
    var item = JSON.parse(item);
    item.status = 1;
    this.props.updateScheduleStatus(item.id, item, store_code);
  };

  runSchedule = (item) => {
    var { store_code } = this.props;
    var item = JSON.parse(item);
    item.status = 0;
    this.props.updateScheduleStatus(item.id, item, store_code);
  };
  showData = (schedule) => {
    var { store_code } = this.props;
    var result = null;
    if (schedule.length > 0) {
      var { update, _delete } = this.props;

      result = schedule.map((data, index) => {
        var group_customer =
          data.group_customer == 0
            ? "Tất cả"
            : data.group_customer == 1
            ? "Khách hàng có ngày sinh nhật "
            : data.group_customer == 2
            ? "Đại lý"
            : data.group_customer == 4
            ? "Nhóm khách hàng"
            : "Cộng tác viên";
        var type_schedule =
          data.type_schedule == 0
            ? "Chạy 1 lần duy nhất"
            : data.type_schedule == 1
            ? "Hàng ngày"
            : data.type_schedule == 2
            ? "Hàng tuần"
            : "Hàng tháng";
        var date =
          data.type_schedule == 0
            ? moment(data.time_run, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY")
            : data.type_schedule == 1
            ? "Hàng ngày"
            : data.type_schedule == 2
            ? "Thứ " + Number(data.day_of_week + 2)
            : "Ngày " + data.day_of_month;
        var time =
          data.type_schedule == 0
            ? moment(data.time_run, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")
            : data.time_of_day;

        var status_name =
          data.status == 0
            ? "Đang chạy"
            : data.status == 1
            ? "Tạm dừng"
            : data.status == 2
            ? "Đã xong"
            : null;
        var status =
          data.status == 0
            ? "primary"
            : data.status == 1
            ? "secondary"
            : data.status == 2
            ? "success"
            : null;
        var disableRun =
          data.status == 0 ? "hide" : data.status == 2 ? "hide" : "show";
        var disableStop =
          data.status == 1 ? "hide" : data.status == 2 ? "hide" : "show";
        var statusRun = data.status == 2 ? "Chạy lại" : "Chỉnh sửa";
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{data.title}</td>

            <td>
              {data.description == null || data.description?.lengh == 0
                ? null
                : data.description?.slice(0, 20) + "..."}
            </td>

            <td>{group_customer}</td>
            <td>{type_schedule}</td>
            <td>{date == "Thứ 8" ? "Chủ Nhật" : date}</td>
            <td>{time}</td>

            <td>
              <span class={`${status}`}>{status_name}</span>
            </td>

            <td className="btn-voucher">
              <Link
                to={`/notifications/schedule/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${
                  update == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-edit"></i> {statusRun}
              </Link>
              <button
                onClick={(e) => this.passDataModal(e, data.id, data.title)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${
                  _delete == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
              <button
                onClick={() => this.runSchedule(JSON.stringify(data))}
                class={`btn btn-success btn-sm ${disableRun} ${
                  update == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-clock-o"></i> Tiếp tục
              </button>
              <button
                onClick={() => this.stopSchedule(JSON.stringify(data))}
                class={`btn btn-primary btn-sm ${disableStop} ${
                  update == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-clock-o"></i> Tạm dừng
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
    console.log(this.props);
    return (
      <div class="table-responsive">
        <table class="table  " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Gửi tới</th>
              <th>Kiểu thông báo</th>
              <th>Ngày thông báo</th>
              <th>Thời gian thông báo trong ngày</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateScheduleStatus: (id, data, store_code) => {
      dispatch(scheduleAction.updateScheduleStatus(id, data, store_code));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
