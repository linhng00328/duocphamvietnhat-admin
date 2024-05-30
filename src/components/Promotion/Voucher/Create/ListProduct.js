import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../../Product/Pagination";
import { filter_arr, format } from "../../../../ultis/helpers";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target;
    console.log(value);
    var data = JSON.parse(value);
    console.log(data);
    if (checked == true) this.props.handleAddProduct(data, null, "add");
    else this.props.handleAddProduct(null, data.id, "remove");
  };

  passNumPage = (page) => {
    this.setState({ page: page });
  };

  checkExsit = (list, id) => {
    console.log(list, id);
    if (list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };

  checkDisable = (vouchers, id) => {
    if (vouchers.length > 0) {
      for (const element of vouchers) {
        for (const item of element.products) {
          if (item.id == id) {
            return true;
          }
        }
      }
    }
    return false;
  };

  showData = (products, list, vouchers) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var status_name =
          data.status == 0
            ? "Còn hàng"
            : data.status == 1
            ? "Đã ẩn"
            : data.status == 2
            ? "Hết hàng"
            : null;
        var status =
          data.status == 0
            ? "success"
            : data.status == 1
            ? "secondary"
            : data.status == 2
            ? "danger"
            : null;
        var checked = this.checkExsit(list, data.id);
        var disaled = this.checkDisable(vouchers, data.id);
        var background_disable = disaled == true ? "#55b8c3" : "white";

        return (
          <tr
            className={disaled == true ? "" : "hover-product"}
            style={{ background: background_disable }}
          >
            <td>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    disabled={disaled}
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)}
                  />
                </label>
              </div>
            </td>

            <td>{data.id}</td>

            <td>{data.name}</td>

            <td>{format(data.price)}</td>
            <td>
              {" "}
              <h5>
                <span class={`badge badge-${status}`}>{status_name}</span>
              </h5>
            </td>

            <td>{data.has_in_voucher}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { products, store_code, listProducts, vouchers } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListProduct"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <i style={{ color: "red" }}>
                {" "}
                Những sản phẩm được tô đậm là những sản phẩm đang nằm trong các
                chương trình khuyến mại khác! Vui lòng xóa nếu muốn thêm vào
                chương trình này
              </i>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Giảm giá</th>
                  </tr>
                </thead>

                <tbody>
                  {this.showData(products.data, listProducts, vouchers)}
                </tbody>
              </table>
            </div>

            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Pagination
                style="float-fix"
                store_code={store_code}
                products={products}
                passNumPage={this.passNumPage}
                limit={this.state.numPage}
              />
              <button
                type="button"
                class="btn btn-primary pagination-btn"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ListProduct);
