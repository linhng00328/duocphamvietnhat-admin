import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../../history";
import moment from "moment";
import { formatNoD } from "../../../ultis/helpers";

class Table extends Component {
  constructor(props) {
    super(props);
  }
  handleDelCallBack = (event, store_code, id, name, is_end) => {
    this.props.handleDelCallBack({
      table: "Chương trình",
      id: id,
      store_code: store_code,
      name,
      is_end,
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
          `/voucher/edit/${store_code}/${supplierId}?type=${is_end}&page=${page}`
        );
      } else {
        history.push(
          `/voucher/edit/${store_code}/${supplierId}?type=${is_end}&search=${searchValue}`
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
      // console
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
  showData = (vouchers, per_page, current_page) => {
    var vouchers =
      this.props.is_end == 0 || this.props.is_end == 2
        ? vouchers
        : vouchers.data;
    var is_end = this.props.is_end;
    var count = 0;
    var result = null;
    var { store_code } = this.props.params;
    if (typeof vouchers === "undefined") {
      return result;
    }
    if (vouchers.length > 0) {
      var { update, _delete } = this.props;

      result = vouchers.map((data, index) => {
        var value_discount = "";
        var is_free_ship = false;
        if (data.discount_for !== 1) {
          if (data.discount_type == 0) {
            value_discount = formatNoD(data.value_discount);
          } else {
            value_discount = data.value_discount + "%";
          }
        } else {
          if (data.is_free_ship === true) {
            is_free_ship = true;
          }
          value_discount = formatNoD(data.ship_discount_value);
        }

        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";

        var type_voucher =
          data.voucher_type == 0 ? "Toàn shop" : "Theo sản phẩm";
        var discount_for = data.discount_for !== 1 ? "Đơn hàng" : "Vận chuyển";
        var type_discount = data.discount_type == 0 ? "Cố định" : "Theo %";
        var is_show_voucher =
          data.is_show_voucher == true ? "Hiển thị" : "Đang ẩn";
        var status_show_voucher =
          data.is_show_voucher == true ? "success" : "secondary";
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
              <td>{type_voucher}</td>
              <td>{discount_for}</td>

              <td>{data.start_time}</td>

              <td>{data.end_time}</td>

              <td>
                {data.value_limit_total && formatNoD(data.value_limit_total)}
              </td>
              <td>
                {is_free_ship == true ? "Miễn phí vận chuyển" : value_discount}
                {/* {value_discount} */}
              </td>

              <td
                className={`group-btn-table three-btn-group ${action}`}
                style={{ maxWidth: "150px" }}
              >
                {(this.props.is_end == 0 || this.props.is_end == 2) && (
                  <Link
                    to={`/voucher/edit/${store_code}/${data.id}`}
                    class={`btn btn-warning btn-sm ${action_edit}`}
                  >
                    <i class="fa fa-edit"></i> Sửa
                  </Link>
                )}

                <button
                  onClick={(e) =>
                    this.handleDelCallBack(
                      e,
                      store_code,
                      data.id,
                      data.name,
                      this.props.is_end
                    )
                  }
                  data-toggle="modal"
                  name="toggle"
                  data-target="#removeModal"
                  class={`btn btn-danger btn-sm ${action_remove}`}
                >
                  <i class="fa fa-trash"></i> Xóa
                </button>
                <button
                  onClick={(e) =>
                    this.handleIsEndCallback(e, store_code, data.id)
                  }
                  data-toggle="modal"
                  name="toggle"
                  data-target="#isEndModal"
                  class={`btn btn-primary btn-sm ${action_end} `}
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
    var { vouchers } = this.props;
    var per_page = vouchers.per_page;
    var current_page = vouchers.current_page;
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
              <th>Loại voucher</th>
              <th>Giảm giá cho</th>

              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Đơn đạt tối thiểu</th>
              <th>Giảm giá</th>

              <th className={action}>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(vouchers, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
