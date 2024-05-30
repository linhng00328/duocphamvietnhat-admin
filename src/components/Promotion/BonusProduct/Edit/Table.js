import React, { Component } from "react";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  onChange = (e, data) => {
    this.props.handleChangeQuantity(data, e.target.value, null, true);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({ txtQuantity: nextProps.quantity });
    }
  }

  removeItem = (data) => {
    this.props.handleAddProduct(data, data, "remove", true);
  };

  decrement = (data) => {
    this.props.handleChangeQuantity(data, null, -1, true);
  };
  increment = (data) => {
    this.props.handleChangeQuantity(data, null, 1, true);
  };
  showData = (products) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var element_distribute_name = data.element_distribute_name
          ? data.element_distribute_name
          : "";
        var sub_element_distribute_name = data.sub_element_distribute_name
          ? " , " + data.sub_element_distribute_name
          : "";
        var distribute = element_distribute_name + sub_element_distribute_name;

        return (
          <tr>
            <td>{index + 1}</td>

            <td>{data.product.sku}</td>

            <td>{data.product.name}</td>
            <td>
              {data.allows_all_distribute === true
                ? "Tự chọn phân loại"
                : distribute}
            </td>

            <td className="quantity" style={{ display: "flex" }}>
              <span
                onClick={() => {
                  this.decrement(data.product);
                }}
                class="input-quantity input-number-decrement"
              >
                –
              </span>
              <input
                class="input-number"
                name="txtQuantity"
                value={data.quantity}
                type="text"
                onChange={(e) => this.onChange(e, data.product)}
              />
              <span
                onClick={() => this.increment(data.product)}
                class="input-quantity input-number-increment"
              >
                +
              </span>
            </td>

            <td>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => this.removeItem(data.product)}
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
    var { products } = this.props;
    console.log(products);
    return (
      <React.Fragment>
        <div class="form-group">
          <label for="product_name">Chọn nhóm sản phẩm mua</label>

          <button
            type="button"
            class="btn btn-primary-no-background btn-sm"
            style={{ marginLeft: "10px" }}
            data-toggle="modal"
            data-target="#showListProduct"
          >
            <i class="fas fa-plus"></i>
            <span class="text">&nbsp;Chọn sản phẩm</span>
          </button>
        </div>
        <div class="form-group">
          <label for="product_name">Nhóm sản phẩm mua : </label>

          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="table-responsive">
              <table class="table table-border table-hover">
                <thead className="">
                  <tr>
                    <th>STT</th>
                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Phân loại</th>

                    <th>Số lượng</th>

                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>{this.showData(products)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(Table);
