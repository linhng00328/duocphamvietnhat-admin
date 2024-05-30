import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../../history";
import moment from "moment";
import { formatNoD } from "../../../ultis/helpers";
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
  changePage = (e, store_code, supplierId) => {
    const { is_end, page, searchValue } = this.props;

    if (e.target.name !== "toggle" && e.target.parentNode.name !== "toggle") {
      if (Number(is_end) === 1) {
        history.push(
          `/combo/edit/${store_code}/${supplierId}?type=${is_end}&page=${page}`
        );
      } else {
        history.push(
          `/combo/edit/${store_code}/${supplierId}?type=${is_end}&search=${searchValue}`
        );
      }
    }
  };
  filterColDiscount = (data) => {
    var is_end = this.props.is_end;
    var now = moment().valueOf();
    var start_time = moment(data.start_time, "YYYY-MM-DD HH:mm:ss").valueOf();
    console.log(now, start_time);
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
  showData = (combos, per_page, current_page) => {
    console.log("davao");
    var is_end = this.props.is_end;
    var count = 0;
    var combos =
      this.props.is_end == 0 || this.props.is_end == 2 ? combos : combos.data;
    var result = null;
    var { store_code } = this.props.params;
    if (typeof combos === "undefined") {
      return result;
    }
    if (combos.length > 0) {
      var { update, _delete } = this.props;

      result = combos.map((data, index) => {
        var set_limit_amount =
          data.set_limit_amount == true ? data.amount : "Không giới hạn";
        var status_limit_amount = data.set_limit_amount == true ? "" : "danger";
        var type_discount = data.discount_type == 0 ? "Cố định" : "Theo %";
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
              <td>{type_discount}</td>
              <td>
                {data.value_discount == null
                  ? null
                  : formatNoD(data.value_discount.toString())}{" "}
              </td>

              <td style={{ width: "20%" }}>
                {this.showListProduct(data.products_combo || [])}
              </td>

              <td
                className={`group-btn-table three-btn-group ${action}`}
                style={{ maxWidth: "150px" }}
              >
                <Link
                  to={`/combo/edit/${store_code}/${data.id}`}
                  class={`btn btn-warning btn-sm ${action_edit}`}
                >
                  <i class="fa fa-edit"></i> Sửa
                </Link>

                <button
                  onClick={(e) =>
                    this.handleDelCallBack(e, store_code, data.id, data.name)
                  }
                  data-toggle="modal"
                  data-target="#removeModal"
                  name="toggle"
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
              {data.product.name}
            </span>
          </h6>
        );
      });
    }
    return result;
  };

  render() {
    var { combos, is_end } = this.props;
    var per_page = combos.per_page;
    var current_page = combos.current_page;
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
              <th>Loại giảm giá</th>
              <th>Giá trị</th>

              <th style={{ maxWidth: "200px" }}>Áp dụng sản phẩm</th>

              <th className={action}>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(combos, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
