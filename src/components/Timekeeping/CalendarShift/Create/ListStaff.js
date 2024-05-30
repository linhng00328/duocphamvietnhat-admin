import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../../../ultis/theme_data";
import * as staffAction from "../../../../actions/staff";
import config from "../../../../ultis/datatable"
import $ from "jquery";

import { filter_arr, format } from "../../../../ultis/helpers";

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPage: 10,
      searchValue: "",

    };
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllShift(store_code, branch_id, 1, params);
  };
  onChange = (e) => {
    var { value, checked } = e.target;
    console.log(checked);
    var data = JSON.parse(value);
    if (checked == true) this.props.handleAddStaff(data, null, "add");
    else this.props.handleAddStaff(null, data.id, "remove");
  };

  checkExsit = (list, id) => {
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };
  onSaveStaff = () => {
    this.props.onSaveStaff()
    window.$(".modal").modal("hide");
  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }

  componentDidUpdate(prevProps, prevState) {

    $("#dataTable").DataTable(
      config()
    );

    $("#dataTable").DataTable(config());

    window.$(".dataTables_info").hide()

  }
  showData = (staffs, list) => {
    console.log("dfasufbasdbfasdkjfbasdkf", staffs, list);
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
        var checked = this.checkExsit(list, data.id);

        return (
          <tr>
            <td>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)}
                  />
                </label>
              </div>
            </td>

            <td>{data.name}</td>

            <td>{data.username}</td>
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
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { staffs, store_code, listStaff, searchValue } = this.props;
    console.log("stafff", staffs);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListStaff"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4
                class="modal-title"
              >
                Nhân viên
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

            {/* <form style={{marginTop : "10px"}} onSubmit={this.searchData}>
              <div
                class="input-group mb-6"
                style={{ padding: "0 20px" }}
              >
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm nhân viên"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
        
            </form> */}
            <div class="table-responsive table-staff">
              <table style = {{marginTop : "15px"}} class="table pag-staff-datatable " id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên nhân viên</th>
                    <th>Tên đăng nhập</th>
                    <th>Số điện thoại</th>
                    <th>Lương theo giờ</th>
                    <th>Phân quyền</th>
                    {/* <th>Trạng thái</th> */}
                  </tr>
                </thead>

                <tbody>{this.showData(staffs, listStaff)}</tbody>
              </table>
            </div>
            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "end" }}>

              {/* <Pagination
                style="float-fix"
                store_code={store_code}
                shifts={shifts}
                limit={this.state.numPage}
                branch_id={this.props.branch_id}
              /> */}
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px"
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button style={{ backgroundColor: themeData().backgroundColor }} onClick={this.onSaveStaff} class="btn btn-info">
                  Xác nhận
                </button>
              </div>
            </div>




          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

    staff: state.staffReducers.staff.allStaff,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id) => {
      dispatch(staffAction.fetchAllStaff(id));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListStaff);