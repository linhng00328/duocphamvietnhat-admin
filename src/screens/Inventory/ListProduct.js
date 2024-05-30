import React, { Component } from "react";
import { connect } from "react-redux";
// import Pagination from "../../../Product/Pagination";
import { format, formatNumber, contactOrNumber } from "../../ultis/helpers";
import themeData from "../../ultis/theme_data";
import * as productAction from "../../actions/product";
import * as Env from "../../ultis/default";
import { shallowEqual } from "../../ultis/shallowEqual";
import Pagination from "./Pagination";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
      searchValue: "",
      listProducts: [],
    };
  }

  onChange = (e) => {
    var { value, checked } = e.target;
    var data = JSON.parse(value);
    if (checked == true) {
      this.setState((prevState) => ({
        listProducts: [...prevState.listProducts, data],
      }));
    } else {
      this.setState((prevState) => {
        const newListProducts = prevState?.listProducts.filter(
          (item) => JSON.stringify(item) !== value
        );
        return {
          listProducts: newListProducts,
        };
      });
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
    if (list?.length > 0) {
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
    const { listProducts } = this.state;
    const { exportSheetInventory, store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");

    if (listProducts?.length > 0) {
      const newListProducts = listProducts.map((item) => ({
        product_id: item.id,
        name: item.name,
        reality_exist: 0,
        distribute_name: item.distribute_name,
        element_distribute_name: item.element_distribute_name,
        sub_element_distribute_name: item.sub_element_distribute_name,
      }));

      exportSheetInventory(store_code, branch_id, "", newListProducts);
      window.$(".modal").modal("hide");
    }
  };

  getistribute = (listDistribute, product) => {
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
                var _data = {
                  id: product.id,
                  quantity: 1,
                  distribute_name: listDistribute.name,
                  element_distribute_name: element.name,
                  sub_element_distribute_name: sub_element.name,
                  sku: product.sku,
                  name: product.name,
                  allows_all_distribute: false,
                };
                count = count + 1;

                var checked = this.checkExsit(list, _data);
                result.push(
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
              allows_all_distribute: false,
            };

            var checked = this.checkExsit(list, _data);
            result.push(
              <div>
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
        var _data = {
          id: data.id,
          quantity: 1,
          distribute_name: null,
          element_distribute_name: null,
          sub_element_distribute_name: null,
          sku: data.sku,
          name: data.name,
          allows_all_distribute: false,
        };
        var checked = this.checkExsit(list, _data);
        const { product_discount, min_price, max_price, distributes } = data;
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
          <tr className={disaled == true ? "" : "hover-product"}>
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
                  width: "59px",
                  background: "#0000000d",
                }}
              />
            </td>
            <td>{data.sku}</td>

            <td>{data.name}</td>
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
    var { searchValue, numPage } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = this.getParams(null, null, searchValue, numPage);
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  onChangeNumPage = (e) => {
    const { categorySelected, searchValue } = this.state;
    const { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    var numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    const params = this.getParams(
      "",
      "",
      searchValue,
      numPage
      // categorySelected
    );
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  getParams = (listType, is_near_out_of_stock, search, limit) => {
    var params = "";

    if (limit) {
      params += `&limit=${limit}`;
    }
    if (search) {
      params += `&search=${search}`;
    }

    return params;
  };

  render() {
    var { products, store_code } = this.props;
    var { searchValue, numPage, listProducts } = this.state;
    console.log("🚀 ~ render ~ listProducts:", listProducts);
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
              <div>
                <h4 style={{ color: "black", display: "block" }}>
                  Chọn nhóm sản phẩm để xuất file
                </h4>
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

                <tbody>{this.showData(products.data, listProducts)}</tbody>
              </table>
            </div>

            <div
              class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flexShrink: "0",
                    marginBottom: "-6px",
                  }}
                >
                  {products && (
                    <Pagination
                      store_code={store_code}
                      limit={numPage}
                      search={searchValue}
                      products={products}
                      passNumPage={this.passNumPage}
                      getParams={this.getParams}
                    />
                  )}
                </div>
                <select
                  name="numPage"
                  value={numPage}
                  onChange={this.onChangeNumPage}
                  id="input"
                  class="form-control"
                  style={{
                    width: "80px",
                  }}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>

              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
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
    exportSheetInventory: (store_code, branch_id, params, data) => {
      dispatch(
        productAction.exportSheetInventory(store_code, branch_id, params, data)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ListProduct);
