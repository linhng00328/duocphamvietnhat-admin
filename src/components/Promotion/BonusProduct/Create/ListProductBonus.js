import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../../Product/Pagination";
import {
  format,
  formatNumber,
  contactOrNumber,
} from "../../../../ultis/helpers";
import themeData from "../../../../ultis/theme_data";
import * as productAction from "../../../../actions/product";
import * as Env from "../../../../ultis/default";
import { shallowEqual } from "../../../../ultis/shallowEqual";

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
    console.log(checked);
    var data = JSON.parse(value);
    if (checked == true)
      this.props.handleAddProduct(data, null, "add", null, true);
    // true đến từ sản phẩm bonus
    else {
      if (data.length > 0) {
        this.props.handleAddProduct(data, data.id, "remove", null, true);
      } else {
        this.props.handleAddProduct(data, data.id, "remove", null, true);
      }
    }
  };

  passNumPage = (page) => {
    this.setState({ page: page });
  };
  compareTwoProduct(item1, item2) {
    var product1 = { ...item1 };
    var product2 = { ...item2 };

    delete product1.quantity;
    delete product1.product;
    delete product2.quantity;
    delete product2.product;
    delete product2.bonus_quantity;
    delete product1.bonus_quantity;
    if (shallowEqual(product1, product2)) {
      return true;
    }
    return false;
  }
  checkExsit = (list, data) => {
    if (list.length > 0) {
      for (const element of list) {
        // console.log(element,data,this.compareTwoProduct(element == data));

        if (this.compareTwoProduct(element, data)) {
          return true;
        }
      }
    }
    return false;
  };

  checkDisable = (combos, id, listDistribute, product) => {
    var dataDistribute = this.getistribute(listDistribute, product);
    if (dataDistribute.length > 0) {
      return true;
    }
    return false;
  };
  onSaveProduct = () => {
    this.props.onSaveProduct(true);
    window.$("#modalBonus").modal("hide");
  };

  getistribute = (listDistribute, product) => {
    var result = [];
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result;
    }
    if (listDistribute.element_distributes) {
      listDistribute.element_distributes.map((element, _index) => {
        if (typeof element.sub_element_distributes != "undefined") {
          if (
            listDistribute.element_distributes[0].sub_element_distributes
              .length > 0
          ) {
            listDistribute.element_distributes[0].sub_element_distributes.map(
              (sub_element, index) => {
                const cost_of_capital =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.cost_of_capital;
                const stock =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.stock;
                result.push({
                  id: product.id,
                  quantity: 1,
                  distribute_name: listDistribute.name,
                  element_distribute_name: element.name,
                  sub_element_distribute_name: sub_element.name,
                  sku: product.sku,
                  name: product.name,
                });
              }
            );
          } else {
            result.push({
              id: product.id,
              quantity: 1,
              distribute_name: listDistribute.name,
              element_distribute_name: element.name,
              sub_element_distribute_name: null,
              sku: product.sku,
              name: product.name,
            });
          }
        }
      });
    }
    return result;
  };

  getData = (data, listDistribute, id) => {
    var dataDistribute = this.getistribute(listDistribute, id);
    if (dataDistribute.length == 0) {
      return JSON.stringify(data);
    } else {
      return JSON.stringify(dataDistribute);
    }
  };

  showDistribute = (listDistribute, product, list) => {
    var result = [];
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result;
    }
    var count = 0;

    if (listDistribute.element_distributes) {
      listDistribute.element_distributes.map((element, _index) => {
        if (typeof element.sub_element_distributes != "undefined") {
          if (
            listDistribute.element_distributes[0].sub_element_distributes
              .length > 0
          ) {
            listDistribute.element_distributes[0].sub_element_distributes.map(
              (sub_element, index) => {
                const cost_of_capital =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.cost_of_capital;
                const stock =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.stock;
                var length =
                  listDistribute.element_distributes[0].sub_element_distributes
                    ?.length ?? 0;
                var _data = {
                  id: product.id,
                  quantity: 1,
                  distribute_name: listDistribute.name,
                  element_distribute_name: element.name,
                  sub_element_distribute_name: sub_element.name,
                  sku: product.sku,
                  name: product.name,
                  allows_choose_distribute: false,
                };
                var _dataAllowDistribute = {
                  id: product.id,
                  quantity: 1,
                  distribute_name: null,
                  element_distribute_name: null,
                  sub_element_distribute_name: null,
                  sku: product.sku,
                  name: product.name,
                  allows_choose_distribute: true,
                };
                count = count + 1;
                var checked = this.checkExsit(list, _data);
                var checkedAllow = this.checkExsit(list, _dataAllowDistribute);
                result.push(
                  <>
                    {count == 1 && length > 1 && (
                      <div class="form-group">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            // disabled={disaled}
                            checked={checkedAllow}
                            onChange={this.onChange}
                            value={JSON.stringify(_dataAllowDistribute)}
                            class="form-check-input"
                            id="gridCheck"
                          />
                          <label class="form-check-label" for="gridCheck">
                            Cho phép tự chọn phân loại{" "}
                          </label>
                        </div>
                      </div>
                    )}
                    {/* <div className='wrap-item hover-product' > */}

                    {/* <label style={{ color: "#ff8100" }}>&nbsp;Phân loại: </label>
                  <div className='name-distribute' >{element.name},{sub_element.name}</div> */}
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          // disabled={disaled}
                          checked={checked}
                          onChange={this.onChange}
                          value={JSON.stringify(_data)}
                          class="form-check-input"
                          id="gridCheck"
                        />
                        <label class="form-check-label" for="gridCheck">
                          {element.name},{sub_element.name}{" "}
                        </label>
                      </div>
                    </div>

                    {/* </div> */}
                  </>
                );
              }
            );
          } else {
            var _data = {
              id: product.id,
              quantity: 1,
              distribute_name: listDistribute.name,
              element_distribute_name: element.name,
              sub_element_distribute_name: null,
              sku: product.sku,
              name: product.name,
              allows_choose_distribute: false,
            };
            var length = listDistribute.element_distributes.length ?? 0;
            var _dataAllowDistribute = {
              id: product.id,
              quantity: 1,
              distribute_name: null,
              element_distribute_name: null,
              sub_element_distribute_name: null,
              sku: product.sku,
              name: product.name,
              allows_choose_distribute: true,
            };
            var checked = this.checkExsit(list, _data);
            var checkedAllow = this.checkExsit(list, _dataAllowDistribute);
            result.push(
              <div>
                {_index == 0 && length > 1 && (
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        // disabled={disaled}
                        checked={checkedAllow}
                        onChange={this.onChange}
                        value={JSON.stringify(_dataAllowDistribute)}
                        class="form-check-input"
                        id="gridCheck"
                      />
                      <label class="form-check-label" for="gridCheck">
                        Cho phép tự chọn phân loại{" "}
                      </label>
                    </div>
                  </div>
                )}

                <div class="form-group">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      // disabled={disaled}
                      checked={checked}
                      onChange={this.onChange}
                      value={JSON.stringify(_data)}
                      class="form-check-input"
                      id="gridCheck"
                    />
                    {/* <input class="form-check-input" name="is_set_order_max_point" type="checkbox" id="gridCheck" /> */}
                    <label class="form-check-label" for="gridCheck">
                      {element.name}{" "}
                    </label>
                  </div>
                </div>
              </div>
            );
          }
        }
      });
    }
    return result;
  };

  showData = (products, list, combos) => {
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
        var _data = {
          id: data.id,
          quantity: 1,
          distribute_name: null,
          element_distribute_name: null,
          sub_element_distribute_name: null,
          sku: data.sku,
          name: data.name,
          allows_choose_distribute: false,
        };
        var checked = this.checkExsit(list, _data);
        var background_disable = disaled == true ? "#55b8c3" : "white";
        const {
          product_discount,
          min_price,
          max_price,
          _delete,
          update,
          insert,
          per_page,
          current_page,
          store_code,
          page,
          status_stock,
          discount,
          historyInventory,
          distributes,
        } = data;
        let discount_percent = null;

        if (product_discount) {
          discount_percent = product_discount.value;
        }
        const listDistribute =
          data.inventory?.distributes !== null &&
          data.inventory?.distributes.length > 0
            ? data.inventory?.distributes[0]
            : [];
        var disaled = this.checkDisable(combos, data.id, listDistribute, data);

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
                    onChange={(e) => this.onChange(e, "PARENT")}
                    value={this.getData(_data, listDistribute, data)}
                  />
                </label>
              </div>
            </td>
            <td>
              <img
                src={
                  data.images.length > 0
                    ? data.images[0].image_url
                    : Env.IMG_NOT_FOUND
                }
                className="img-responsive"
                alt="Image"
                style={{
                  width: "100%",
                  height: "59px",
                  background: "#0000000d",
                }}
              />
            </td>
            <td>{data.sku}</td>

            <td style={{ width: "240px" }}>{data.name}</td>
            <td> {this.showDistribute(listDistribute, data, list)}</td>
            <td>
              {product_discount == null && (
                <div className="eea">
                  {min_price === max_price ? (
                    contactOrNumber(
                      format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )
                    )
                  ) : distributes && distributes.length == 0 ? (
                    contactOrNumber(
                      format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )
                    )
                  ) : (
                    <div className="ae">
                      {format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )}
                      {" - "}
                      {format(
                        Number(
                          discount_percent == null
                            ? max_price
                            : max_price - max_price * discount_percent * 0.01
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {product_discount && (
                <div
                  className="a"
                  style={{
                    float: "left",
                  }}
                >
                  {min_price === max_price ? (
                    contactOrNumber(format(Number(min_price)))
                  ) : (
                    <div className="row e">
                      <div
                        style={
                          {
                            // textDecoration: "line-through",
                          }
                        }
                      >
                        {format(Number(min_price))}
                        {" - "}
                        {format(Number(max_price))}
                      </div>

                      {/* <div className="discount e">&emsp; -{discount_percent}%</div> */}
                    </div>
                  )}
                </div>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  passNumPage = (page) => {
    this.setState({ page: page });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  getParams = (listType, is_near_out_of_stock, search, limit) => {
    var params = "";

    if (search) {
      params += `&search=${search}`;
    }
    if (limit) {
      params += `&limit=${search}`;
    }

    return params;
  };

  render() {
    var { products, store_code, listProducts, combos } = this.props;
    var { searchValue } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalBonus"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <div>
                <h4 style={{ color: "black", display: "block" }}>
                  Chọn nhóm sản phẩm tặng
                </h4>

                <i style={{ color: "red" }}>
                  {" "}
                  Những sản phẩm được tô đậm là những sản phẩm đang nằm trong
                  các chương trình khuyến mại khác! Vui lòng xóa nếu muốn thêm
                  vào chương trình này
                </i>
              </div>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form style={{ marginTop: "10px" }} onSubmit={this.searchData}>
              <div class="input-group mb-6" style={{ padding: "0 20px" }}>
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <div class="table-responsive">
              <table class="table table-hover table-border">
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ width: "13%" }}>Hình ảnh</th>

                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Phân loại</th>

                    <th>Giá</th>
                  </tr>
                </thead>

                <tbody>
                  {this.showData(products.data, listProducts, combos)}
                </tbody>
              </table>
            </div>

            <div
              class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Pagination
                style="float-fix"
                store_code={store_code}
                products={products}
                passNumPage={this.passNumPage}
                getParams={this.getParams}
              />
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px",
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  style={{ backgroundColor: themeData().backgroundColor }}
                  onClick={this.onSaveProduct}
                  class="btn btn-info"
                >
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
