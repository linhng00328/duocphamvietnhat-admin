import React, { Component } from "react";
import * as ecommerceAction from "../../../actions/ecommerce";
import { connect, shallowEqual } from "react-redux";
import { formatNumber, callUrl } from "../../../ultis/helpers";

class ModalUpdateConnectEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_name: "",
      type_sync_products: 0,
      type_sync_inventory: 0,
      type_sync_orders: 0,
      customer_name: "",
      customer_phone: "",
      successMessage: "",
    };
  }
  shouldComponentUpdate(nextProps) {
    const { ecommerceSelected } = this.props;
    if (
      !shallowEqual(ecommerceSelected, nextProps.ecommerceSelected) &&
      nextProps.ecommerceSelected
    ) {
      this.setState({
        shop_name: nextProps.ecommerceSelected.shop_name,
        type_sync_products: nextProps.ecommerceSelected?.type_sync_products,
        type_sync_inventory: nextProps.ecommerceSelected?.type_sync_inventory,
        type_sync_orders: nextProps.ecommerceSelected?.type_sync_orders,
        customer_name: nextProps.ecommerceSelected?.customer_name,
        customer_phone: nextProps.ecommerceSelected?.customer_phone,
      });
    }

    return true;
  }

  onSave = (e) => {
    e.preventDefault();
    const { updateConnectEcommerce, store_code, ecommerceSelected } =
      this.props;
    const {
      shop_name,
      customer_name,
      customer_phone,
      type_sync_products,
      type_sync_inventory,
      type_sync_orders,
    } = this.state;

    const data = {
      shop_name,
      customer_name,
      customer_phone,
      type_sync_products,
      type_sync_inventory,
      type_sync_orders,
    };

    updateConnectEcommerce(store_code, ecommerceSelected?.shop_id, data, () => {
      this.setState({ successMessage: "Cập nhật thông tin thành công!" });
    });
  };
  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
      successMessage: "",
    });
  };
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
    this.setState({
      successMessage: "",
    });
  };

  render() {
    var {
      shop_name,
      customer_name,
      customer_phone,
      type_sync_products,
      type_sync_inventory,
      type_sync_orders,
      successMessage,
    } = this.state;
    var { ecommerceSelected, onClose } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalUpdateConnectEcommerce"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <h4
                class="modal-title"
                style={{
                  color: "#414141",
                }}
              >
                Thay đổi thông tin đồng bộ {ecommerceSelected?.platform}
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.handleClose}
              >
                &times;
              </button>
            </div>

            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                <div class="form-group">
                  <label for="shop_name">Tên cửa hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="shop_name"
                    placeholder="Nhập tên cửa hàng..."
                    autoComplete="off"
                    value={shop_name}
                    onChange={this.onChange}
                    name="shop_name"
                  />
                </div>
                <div class="form-group">
                  <label for="customer_name">Tên khách hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="customer_name"
                    placeholder="Nhập tên khách hàng..."
                    autoComplete="off"
                    value={customer_name}
                    onChange={this.onChange}
                    name="customer_name"
                  />
                </div>
                <div class="form-group">
                  <label for="customer_phone">SĐT khách hàng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="customer_phone"
                    placeholder="Nhập SĐT khách hàng..."
                    autoComplete="off"
                    value={customer_phone}
                    onChange={this.onChange}
                    name="customer_phone"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    columnGap: "10px",
                  }}
                >
                  <div class="form-group">
                    <label for="type_sync_inventory">Đồng bộ tồn kho</label>
                    <select
                      value={type_sync_inventory}
                      name="type_sync_inventory"
                      id="input"
                      class="form-control"
                      onChange={this.onChange}
                      placeholder="Cập nhập tồn kho"
                    >
                      <option value="" disabled>
                        ---Cập nhập tồn kho---
                      </option>
                      <option value="0">Thủ công</option>
                      <option value="1">Tự động</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="type_sync_orders">Đồng bộ đơn hàng</label>
                    <select
                      value={type_sync_orders}
                      name="type_sync_orders"
                      id="input"
                      class="form-control"
                      onChange={this.onChange}
                      placeholder="Đồng bộ đơn hàng..."
                    >
                      <option value="" disabled>
                        ---Đồng bộ tồn kho---
                      </option>
                      <option value="0">Thủ công</option>
                      <option value="1">Tự động</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="type_sync_products">Đồng bộ sản phẩm</label>
                  <select
                    value={type_sync_products}
                    name="type_sync_products"
                    id="input"
                    class="form-control"
                    onChange={this.onChange}
                    placeholder="Đồng bộ sản phẩm..."
                  >
                    <option value="" disabled>
                      ---Đồng bộ tồn kho---
                    </option>
                    <option value="0">Thủ công</option>
                    <option value="1">Tự động</option>
                  </select>
                </div>
              </div>
              {successMessage && (
                <div
                  class="alert alert-success"
                  style={{
                    margin: "0 1rem 1rem 1rem",
                  }}
                >
                  Cập nhật thông tin thành công
                </div>
              )}

              <div class="modal-footer">
                <button type="submit" class="btn btn-success">
                  Lưu
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.handleClose}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateConnectEcommerce: (store_code, shop_id, data, funcModal) => {
      dispatch(
        ecommerceAction.updateConnectEcommerce(
          store_code,
          shop_id,
          data,
          funcModal
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateConnectEcommerce);
