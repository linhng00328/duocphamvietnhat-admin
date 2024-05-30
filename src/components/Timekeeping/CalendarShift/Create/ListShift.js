import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../Shift/Pagination";
import { filter_arr, format } from "../../../../ultis/helpers";
import themeData from "../../../../ultis/theme_data";
import * as shiftAction from "../../../../actions/shift";

class ListShift extends Component {
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
    if (checked == true) this.props.handleAddShift(data, null, "add");
    else this.props.handleAddShift(null, data.id, "remove");
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
  onSaveShift = () => {
    this.props.onSaveShift()
    window.$(".modal").modal("hide");
  }

  showData = (products, list) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
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

            <td>{`${("0" + data.start_work_hour).slice(-2)}:${(
              "0" + data.start_work_minute
            ).slice(-2)}`}</td>
            <td>{`${("0" + data.end_work_hour).slice(-2)}:${(
              "0" + data.end_work_minute
            ).slice(-2)}`}</td>
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
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { shifts, store_code, listShift } = this.props;
    var { searchValue } = this.state
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListShift"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
          <div class="modal-header" style={{ backgroundColor: themeData().backgroundColor }}>
              <h4
                class="modal-title"
                // style={{ color: "black", fontWeight: "bold" }}
              >
                Ca chấm công
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

            <form style={{marginTop : "10px"}} onSubmit={this.searchData}>
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
                  placeholder="Tìm kiếm ca chấm công"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
        
            </form>

            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên ca</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Ngày trong tuần</th>
                  </tr>
                </thead>

                <tbody>{this.showData(shifts?.data, listShift)}</tbody>
              </table>
            </div>
            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "space-between" }}>

            <Pagination
                  style="float-fix"
                  store_code={store_code}
                  shifts={shifts}
                  limit={this.state.numPage}
                  branch_id={this.props.branch_id}
                />
              <div style={{ marginTop: "10px" }}>
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
                <button style={{ backgroundColor: themeData().backgroundColor }} onClick={this.onSaveShift} class="btn btn-info">
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

    shifts: state.shiftReducers.shift.allShift,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  
    fetchAllShift: (store_code, branch_id, page, params) => {
      dispatch(shiftAction.fetchAllShift(store_code, branch_id, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListShift);

