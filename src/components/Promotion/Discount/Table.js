import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import history from "../../../history";
import moment from "moment";
import getChannel, { IKITECH, IKIPOS } from "../../../ultis/channel";
class Table extends Component {
  constructor(props) {
    super(props);
  }
  handleDelCallBack = (event, store_code, id, name) => {
    this.props.handleDelCallBack({
      table: "Chương trình",
      id: id,
      store_code: store_code,
      name,
    });
    event.preventDefault();
  };

  handleIsEndCallback = (event, store_code, id) => {
    this.props.handleIsEndCallback({ id: id, store_code: store_code });
    event.preventDefault();
  };

  showListProduct = (products) => {
    console.log(products);
    var result = null;
    if (products.length > 0) {
      result = products.map((data, index) => {
        return (
          <h6 style={{ display: "inline-block", marginRight: "7px" }}>
            <span
              style={{
                display: "inline-block",
                maxWidth: "240px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              class="badge badge-success"
            >
              {data.name}
            </span>
          </h6>
        );
      });
    }
    return result;
  };
  changePage = (e, store_code, supplierId) => {
    const { is_end, page, searchValue } = this.props;
    if (e.target.name !== "toggle" && e.target.parentNode.name !== "toggle") {
      if (Number(is_end) === 1) {
        history.push(
          `/discount/edit/${store_code}/${supplierId}?type=${is_end}&page=${page}`
        );
      } else {
        history.push(
          `/discount/edit/${store_code}/${supplierId}?type=${is_end}&search=${searchValue}`
        );
      }
    }
  };

  filterColDiscount = (data) => {
    var is_end = this.props.is_end;
    var now = moment().valueOf();
    var start_time = moment(data.start_time, "YYYY-MM-DD HH:mm:ss").valueOf();
    console.log(now, start_time, now < start_time, is_end);
    if (is_end == 0) {
      if (now < start_time) {
        return true;
      } else {
        return false;
      }
    } else if (is_end == 2) {
      if (now > start_time) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  showData = (discounts, per_page, current_page) => {
    var is_end = this.props.is_end;
    var count = 0;

    var discounts =
      this.props.is_end == 0 || this.props.is_end == 2
        ? discounts
        : discounts.data;
    var result = null;
    var { store_code } = this.props.params;
    if (typeof discounts === "undefined") {
      return result;
    }
    if (discounts.length > 0) {
      var { update, _delete } = this.props;

      result = discounts.map((data, index) => {
        if (getChannel() == IKITECH) {
          // var set_limit_amount =
          // data.set_limit_amount == true ? data.amount : "Không giới hạn";
          var set_limit_amount = data.value;
        } else {
          var set_limit_amount = data.value;
        }
        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";
        var image_url =
          data.image_url == null || data.image_url == ""
            ? Env.IMG_NOT_FOUND
            : data.image_url;
        var showCurrentPage =
          typeof per_page != "undefined" && per_page != null ? true : false;
        var action_edit =
          this.props.is_end == 0 || this.props.is_end == 2 ? "show" : "hide";
        var action_end = this.props.is_end == 2 ? "show" : "hide";
        var action_remove = this.props.is_end == 0 ? "show" : "hide";
        var action = this.props.is_end !== 1 ? "show" : "hide";

        if (this.filterColDiscount(data) == true) {
          count = count + 1;
          return (
            <tr
              className="hover-product"
              onClick={(e) => this.changePage(e, store_code, data.id)}
            >
              <td class={showCurrentPage ? "hide" : "show"}>
                {is_end == 0 || is_end == 2 ? count : index}
              </td>

              <td class={showCurrentPage ? "show" : "hide"}>
                {per_page * (current_page - 1) +
                  (is_end == 0 || is_end == 2 ? count + 1 : index + 1)}
              </td>

              <td>{data.name}</td>

              <td>{data.start_time}</td>

              <td>{data.end_time}</td>

              <td>
                {!isNaN(Number(set_limit_amount)) && set_limit_amount != null
                  ? new Intl.NumberFormat().format(
                      set_limit_amount.toString()
                    ) + "%"
                  : set_limit_amount}
              </td>
              <td style={{ maxWidth: "300px" }}>
                {" "}
                {this.showListProduct(data.products || [])}
              </td>

              <td
                className={`group-btn-table three-btn-group ${action}`}
                style={{ maxWidth: "150px" }}
              >
                <Link
                  to={`/discount/edit/${store_code}/${data.id}`}
                  class={`btn btn-warning btn-sm ${action_edit}`}
                >
                  <i class="fa fa-edit"></i> Sửa
                </Link>
                <button
                  onClick={(e) =>
                    this.handleDelCallBack(e, store_code, data.id, data.name)
                  }
                  style={{ marginLeft: "10px" }}
                  data-toggle="modal"
                  data-target="#removeModal"
                  name="toggle"
                  class={`btn btn-danger btn-sm ${action_remove}`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
                <button
                  onClick={(e) =>
                    this.handleIsEndCallback(e, store_code, data.id, data.name)
                  }
                  style={{ marginLeft: "10px" }}
                  data-toggle="modal"
                  name="toggle"
                  data-target="#isEndModal"
                  class={`btn btn-primary btn-sm ${action_end}`}
                >
                  <i class="fa fa-clock-o"></i> Kết thúc
                </button>
              </td>
            </tr>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { discounts, is_end } = this.props;
    var per_page = discounts.per_page;
    var current_page = discounts.current_page;
    var action = this.props.is_end !== 1 ? "show" : "hide";

    return (
      <div class="table-responsive">
        <table
          class="table table-border"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>

              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Giảm giá</th>
              <th style={{ maxWidth: "300px" }}>Áp dụng sản phẩm</th>
              <th className={action}>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(discounts, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
