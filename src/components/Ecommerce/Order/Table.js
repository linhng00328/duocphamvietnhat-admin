import React, { Component } from "react";
import styled from "styled-components";
import { connect, shallowEqual } from "react-redux";
import { filter_arr, formatNumberV2 } from "../../../ultis/helpers";
import ModalCustom from "./ModalCustom";
import * as ecommerceAction from "../../../actions/ecommerce";
import { ecommerceStatus } from "../../../ultis/ecommerce";

const TableProductStyles = styled.div`
  .dropdown__product {
    position: relative;
    .dropdown__product__menu {
      position: absolute;
      top: calc(100% + 2px);
      right: 0;
      z-index: 100;
      padding: 0.5rem 0;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.1875rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      .dropdown__product__item {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelected: null,
      error: "",
      price: "",
      selected: [],
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { selected } = this.state;
    const { setListOrderSelected } = this.props;
    if (!shallowEqual(selected, nextState.selected)) {
      setListOrderSelected(nextState.selected);
    }
    return true;
  }

  handleClickOutside = (e) => {
    const isDropdownToggle = e.target.closest(".dropdown__product__toggle");
    if (!isDropdownToggle) {
      this.setState({
        productSelected: null,
      });
    }
  };

  handleShowActions = (data) => {
    this.setState({
      productSelected: data,
      price: data.price ? formatNumberV2(data.price) : "",
    });
  };

  handleOpenModal = () => {
    window.removeEventListener("click", this.handleClickOutside);
  };
  handleCloseModal = () => {
    this.setState({
      productSelected: null,
      error: "",
    });
    window.addEventListener("click", this.handleClickOutside);
  };
  //HandlePrice
  handleSubmitModalPrice = () => {
    const { price, productSelected } = this.state;
    const {
      updatePriceProductEcommerce,
      store_code,
      fetchListProductEcommerce,
    } = this.props;
    if (price === "") {
      this.setState({
        error: "Dữ liệu chưa hợp lệ",
      });
      return;
    }
    const data = {
      price: price?.toString().replace(/\./g, ""),
    };
    updatePriceProductEcommerce(store_code, data, productSelected?.id, () => {
      window.$(".modal").modal("hide");
      this.handleCloseModal();
      fetchListProductEcommerce();
    });
  };

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: formatNumberV2(value),
      error: "",
    });
  };

  handleAddress = (addressDetail, wards, district, province) => {
    return `${
      addressDetail && (wards || district || province)
        ? `${addressDetail}, `
        : ""
    }${wards && (district || province) ? `${wards}, ` : ""}${
      district && province ? `${district}, ` : ""
    }${province ? province : ""}`;
  };

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item.id == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };
  onChangeSelected = (e, data) => {
    var { checked } = e.target;
    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(data);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item.id == data.id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { products } = this.props;
    var _selected = [...this.state.selected];

    var listBills = filter_arr(products.data);

    if (listBills.length > 0) {
      if (checked == false) {
        this.setState({ selected: [] });
      } else {
        _selected = [];
        listBills.forEach((bill) => {
          _selected.push(bill);
        });
        this.setState({ selected: _selected });
      }
    }
  };

  showData = (products, per_page, current_page) => {
    var result = null;
    const { productSelected } = this.state;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var checked = this.checkSelected(data.id);
        return (
          <tr key={data.id}>
            <td>
              <input
                name="checked"
                style={{
                  height: "initial",
                  marginBottom: "0px",
                }}
                type="checkbox"
                checked={checked}
                onChange={(e) => this.onChangeSelected(e, data)}
              />
            </td>
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td>{data.order_code}</td>
            <td>
              <div>
                <div>{data.customer_name}</div>
                <div>
                  {this.handleAddress(
                    data.customer_address_detail,
                    data.customer_wards_name,
                    data.customer_district_name,
                    data.customer_province_name
                  )}
                </div>
                <div
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {data.shop_name ? data.shop_name : ""}
                </div>
              </div>
            </td>
            <td>
              {data.total_final
                ? `${formatNumberV2(data.total_final)} đ`
                : "0 đ"}
            </td>
            <td>
              <div>
                {data.total_shipping_fee
                  ? `${formatNumberV2(data.total_shipping_fee)}`
                  : "0 đ"}
              </div>
              <div>{data.package_weight ? `${data.package_weight}g ` : ""}</div>
            </td>
            <td>{data.payment_status}</td>
            <td
              style={{
                color: this.props.handleShowStatus(
                  data.order_status,
                  data.from_platform
                )?.color
                  ? this.props.handleShowStatus(
                      data.order_status,
                      data.from_platform
                    )?.color
                  : "initial",
              }}
            >
              {
                this.props.handleShowStatus(
                  data.order_status,
                  data.from_platform
                )?.name
              }
            </td>
            <td
              style={{
                textAlign: "center",
              }}
            >
              <span class="dropdown__product">
                <span
                  className="dropdown__product__toggle"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleShowActions(data)}
                >
                  <i className="fa fa-bars"></i>
                </span>
                {/* <div
                  class="dropdown__product__menu"
                  style={{
                    display: productSelected?.id == data.id ? "block" : "none",
                  }}
                >
                  <div
                    className="dropdown__product__item"
                    type="button"
                    data-toggle="modal"
                    data-target="#updatePriceProductEcommerce"
                    onClick={this.handleOpenModal}
                  >
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </span>
                    <span>Sửa giá</span>
                  </div>
                </div> */}
              </span>
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
    const { products } = this.props;
    const { productSelected, price, error, selected } = this.state;
    var _selected =
      selected.length > 0 && selected.length == products.data?.length
        ? true
        : false;
    return (
      <TableProductStyles>
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>
                {" "}
                <input
                  type="checkbox"
                  checked={_selected}
                  onChange={this.onChangeSelectAll}
                />
              </th>
              <th>STT</th>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th style={{ width: "20%" }}>Tổng tiền</th>
              <th>Vận chuyển</th>
              <th>Trạng thái thanh toán</th>
              <th>Trạng thái đơn hàng</th>
              <th style={{ width: "100px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shop_ids === "" ? (
              <tr>
                <td
                  colspan="7"
                  style={{
                    textAlign: "center",
                    color: "#434040",
                  }}
                >
                  Chọn cửa hàng để xem thông tin sản phẩm!
                </td>
              </tr>
            ) : (
              <>
                {" "}
                {this.showData(
                  products.data,
                  products.per_page,
                  products.current_page
                )}
              </>
            )}
          </tbody>
        </table>
        {productSelected && (
          <ModalCustom
            title="Sửa giá sản phẩm trên hệ thống"
            content="Chỉ sửa lại giá của sản phẩm nếu bạn đã thay đổi thông tin giá này trên sàn, nếu không việc đồng bộ đơn hàng, tồn kho với sản phẩm này có thể bị lỗi."
            id="updatePriceProductEcommerce"
            error={error}
            productName={productSelected?.name}
            onClose={this.handleCloseModal}
            onSubmit={this.handleSubmitModalPrice}
          >
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="Sửa giá"
              value={price}
              onChange={this.onChange}
            />
          </ModalCustom>
        )}
      </TableProductStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePriceProductEcommerce: (store_code, data, id, funcModal) => {
      dispatch(
        ecommerceAction.updatePriceProductEcommerce(
          store_code,
          data,
          id,
          funcModal
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
