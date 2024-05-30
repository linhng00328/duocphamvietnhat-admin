import React, { Component } from "react";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
    };
  }

  removeItem = (id) => {
    this.props.handleAddStaff(null, id, "remove" , true);
  };


  showData = (staffs) => {
    var result = null;
    if (typeof staffs === "undefined") {
      return result;
    }
    if (staffs.length > 0) {
      result = staffs.map((data, index) => {
        var decentralization =
          typeof data.decentralization != "undefined" &&
          data.decentralization != null
            ? data.decentralization.name
            : "";
        return (
          <tr>
            <td>{data.name}</td>

            <td >{data.username}</td>
            <td>{data.phone_number}</td>

            <td>
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.salary_one_hour)}
            </td>
            <td>{decentralization}</td>
            {/* <td style={{ textAlign: "center" }}>
              {data.online ? (
                <>
                  <span
                    style={{
                      background: "green",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      background: "red",
                      padding: "0.005px 8px",
                      borderRadius: "50%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {" "}
                  </span>
                  <span>Offline</span>
                </>
              )}
            </td> */}

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
    var { staffs } = this.props;

    return (
      <React.Fragment>
        <div class="form-group mb-0">
          <label for="product_name mb-0">Đối tượng áp dụng : </label>
        </div>
        {staffs.length !== 0 ? (
          <div class="form-group">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pl-0">
              <div class="table-responsive">
                <table class="table table-border table-hover">
                  <thead>
                    <tr>
                      <th>Tên nhân viên</th>
                      <th>Tên đăng nhập</th>
                      <th>Số điện thoại</th>
                      <th>Lương theo giờ</th>
                      <th>Phân quyền</th>
                      {/* <th>Trạng thái</th> */}

                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>{this.showData(staffs)}</tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            <span style={{ color: "#C12026" }}>
              Chưa chọn đối tượng áp dụng
            </span>
          </>
        )}
        <div
          class={`form-group d-flex align-items-center my-3 ${staffs.length > 0 ? "justify-content-center" : null}`}
          data-toggle="modal"
          data-target="#showListStaff"
          style={{ cursor: "pointer" }}
        >
      <button
            type="button"
            class="btn btn-primary-no-background btn-sm"

          >
            <i class="fas fa-plus" ></i>
            <span class="text">&nbsp;Thêm nhân viên</span>
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
