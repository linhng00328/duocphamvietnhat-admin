import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import {
  filter_arr,
  filter_var,
  format,
  formatNumber,
  contactOrNumber,
} from "../../ultis/helpers";
import * as Env from "../../ultis/default";

import { shallowEqual } from "../../ultis/shallowEqual";
import * as productAction from "../../actions/product";
import UpdatePriceAgencyModal from "../../screens/ProductAgency/UpdatePriceAgencyModal";
import { connect } from "react-redux";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      arrayCheckBox: [],
      productId: null,
      showModalUpdatePriceAgency: false,
    };
  }

  setShowModalUpdatePriceAgency = (showModal) => {
    this.setState({ showModalUpdatePriceAgency: showModal });
  };
  handleShowUpdatePrice = (product) => {
    var { store_code, agency_type_id } = this.props;
    this.setState({ productId: product.id, showModalUpdatePriceAgency: true });
    this.props.fetchProductAgencyPrice(store_code, product.id, agency_type_id);
  };

  passDataModal = (event, store_code, id, name) => {
    this.props.handleDelCallBack({
      table: "Sản phẩm",
      id: id,
      store_code: store_code,
      name: name,
    });
    event.preventDefault();
  };

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.products.data, this.props.products.data)) {
      this.setState({ selected: [] });
    }
  }
  onChangeSelected = (e, id) => {
    var { checked } = e.target;
    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(id);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item == id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  handleMultiDelCallBack = (e, data) => {
    var { store_code } = this.props;
    this.props.handleMultiDelCallBack({
      table: "Sản phẩm",
      data: data,
      store_code: store_code,
    });
    e.preventDefault();
  };

  changePage = (data) => {
    var {
      store_code,
      page,
      agency_type_id,
      numPage,
      searchValue,
      getParams,
      categorySelected,
      categoryChildSelected,
    } = this.props;
    var price =
      data.distributes?.length > 0
        ? ""
        : window.$(`.price-${data.id} > input`).val();
    var importPrice = data.distributes?.length > 0 ? "" : data.import_price;
    const params = getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    history.push(
      `/product-agency/edit-price/${store_code}/${
        data.id
      }/${agency_type_id}?page=${page}${price !== "" ? `&price=${price}` : ""}${
        importPrice !== "" ? `&importPrice=${importPrice}` : ""
      }${params}`
    );
  };
  fetchAllProduct = () => {
    var {
      store_code,
      page,
      agency_type_id,
      numPage,
      searchValue,
      getParams,
      categorySelected,
      categoryChildSelected,
    } = this.props;

    const params = getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    this.props.fetchAllProduct(store_code, page, params, agency_type_id);
  };
  onchangeCheckBox = (e) => {
    var value = e.target.value;
    var checked = e.target.checked;
    console.log(checked);
    var arrayCheckBox = [...this.props.arrayCheckBox];
    if (checked == true) {
      arrayCheckBox.push(value);
      this.props.setArrayCheckBox(arrayCheckBox);
    } else {
      arrayCheckBox.forEach((element, index) => {
        console.log(element);
        if (element == value) {
          arrayCheckBox.splice(index, 1);
        }
      });
      this.props.setArrayCheckBox(arrayCheckBox);
    }
  };
  checkExsit = (id) => {
    for (const item of this.props.arrayCheckBox) {
      if (item == id) {
        return true;
      }
    }
    return false;
  };
  handleChangeAgencyPrice(data) {
    var {
      store_code,
      page,
      agency_type_id,
      numPage,
      searchValue,
      getParams,
      categorySelected,
      categoryChildSelected,
    } = this.props;
    var price =
      data.distributes?.length > 0
        ? ""
        : window.$(`.price-${data.id} > input`).val();
    var importPrice = data.distributes?.length > 0 ? "" : data.import_price;
    const params = getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    history.push(
      `/product-agency/index/${store_code}/${agency_type_id}?page=${page}${
        price !== "" ? `&price=${price}` : ""
      }${importPrice !== "" ? `&importPrice=${importPrice}` : ""}${params}`
    );
    this.handleShowUpdatePrice(data);
  }
  showData = (products, per_page, current_page) => {
    var result = null;
    var { store_code, page, agency_type_id } = this.props;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      var { _delete, update, insert } = this.props;
      result = products.map((data, index) => {
        let discount_percent = null;

        if (data.product_discount) {
          discount_percent = data.product_discount?.value;
        }

        var min_price = data.min_price;
        var max_price = data.max_price;
        var product_discount = data.product_discount;
        var distributes = data.distributes;
        var checked = this.checkExsit(data.id);
        var a_min_price = null;
        var a_max_price = null;
        var a_distributes = null;
        if (data.agency_price) {
          a_min_price = data.agency_price.min_price;
          a_max_price = data.agency_price.max_price;
          a_distributes = data.agency_price.distributes;
        }
        return (
          <tr className="hover-product">
            <td>
              <div class="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.onchangeCheckBox}
                    value={data.id}
                  />
                </label>
              </div>
            </td>
            <td>{per_page * (current_page - 1) + (index + 1)}</td>

            <td className="item">
              <img
                src={
                  data.images.length > 0
                    ? data.images[0].image_url
                    : Env.IMG_NOT_FOUND
                }
                alt=""
                width="60px"
                height="60px"
              ></img>
            </td>

            <td>{data.sku}</td>

            <td>
              <Link to={`/product/edit/${store_code}/${data.id}?page=${page}`}>
                {data.name}
              </Link>
            </td>
            <td>{data?.agency_price?.percent_agency}%</td>
            <td>
              {product_discount == null && (
                <div className={`price-${data.id}`}>
                  {min_price === max_price ? (
                    <>
                      <input
                        type={"hidden"}
                        value={
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        }
                      ></input>
                      {contactOrNumber(
                        format(
                          Number(
                            discount_percent == null
                              ? min_price
                              : min_price - min_price * discount_percent * 0.01
                          )
                        )
                      )}{" "}
                    </>
                  ) : distributes && distributes.length == 0 ? (
                    <>
                      <input
                        type={"hidden"}
                        value={
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        }
                      ></input>
                      {contactOrNumber(
                        format(
                          Number(
                            discount_percent == null
                              ? min_price
                              : min_price - min_price * discount_percent * 0.01
                          )
                        )
                      )}{" "}
                    </>
                  ) : (
                    <div className="price">
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
                  className={`price-${data.id}`}
                  style={{
                    float: "left",
                  }}
                >
                  {min_price === max_price ? (
                    <>
                      <input type={"hidden"} value={min_price}></input>
                      {contactOrNumber(format(Number(min_price)))}
                    </>
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
            <td>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {product_discount == null && (
                  <div className="eea">
                    {a_min_price === a_max_price ? (
                      contactOrNumber(
                        format(
                          Number(
                            discount_percent == null
                              ? a_min_price
                              : a_min_price -
                                  a_min_price * discount_percent * 0.01
                          )
                        )
                      )
                    ) : distributes && distributes.length == 0 ? (
                      contactOrNumber(
                        format(
                          Number(
                            discount_percent == null
                              ? a_min_price
                              : a_min_price -
                                  a_min_price * discount_percent * 0.01
                          )
                        )
                      )
                    ) : (
                      <div className="ae">
                        {format(
                          Number(
                            discount_percent == null
                              ? a_min_price
                              : a_min_price -
                                  a_min_price * discount_percent * 0.01
                          )
                        )}
                        {" - "}
                        {format(
                          Number(
                            discount_percent == null
                              ? a_max_price
                              : a_max_price -
                                  a_max_price * discount_percent * 0.01
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
                    {a_min_price === a_max_price ? (
                      contactOrNumber(format(Number(a_min_price)))
                    ) : (
                      <div className="row e">
                        <div
                          style={
                            {
                              // textDecoration: "line-through",
                            }
                          }
                        >
                          {format(Number(a_min_price))}
                          {" - "}
                          {format(Number(a_max_price))}
                        </div>

                        {/* <div className="discount e">&emsp; -{discount_percent}%</div> */}
                      </div>
                    )}
                  </div>
                )}
                <span
                  style={{
                    color: "rgb(127, 140, 141)",
                  }}
                >
                  <i
                    onClick={() => this.handleChangeAgencyPrice(data)}
                    data-toggle="modal"
                    data-target="#updateModalNewPriceAgeny"
                    class="fa fa-edit"
                  ></i>
                </span>
              </div>
            </td>
            {/* <td>{format(Number(data.price))}</td> */}

            {/* <td>{typeof data.agency_price != "undefined" ? format(Number(data.agency_price.main_price)) : null  }</td> */}

            <td
              onClick={() => {
                this.changePage(data);
              }}
            >
              <button
                class={`btn btn-outline-warning btn-sm ${
                  update == true ? "" : "hide"
                }`}
              >
                <i class="fa fa-edit"></i> Chỉnh sửa giá
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
  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { products } = this.props;
    var _selected = [...this.props.arrayCheckBox];

    var listProduct = filter_arr(products.data);

    if (listProduct.length > 0) {
      if (checked == false) {
        this.props.setArrayCheckBox([]);
      } else {
        _selected = [];
        listProduct.forEach((product) => {
          _selected.push(product.id);
        });
        this.props.setArrayCheckBox(_selected);
      }
    }
  };
  render() {
    var { products, store_code, agency_type_id } = this.props;
    var { selected, arrayCheckBox, productId, showModalUpdatePriceAgency } =
      this.state;
    var per_page = products.per_page;
    var current_page = products.current_page;

    var listProduct = filter_arr(products.data);
    var _selected =
      selected.length > 0 && selected.length == listProduct.length
        ? true
        : false;
    var _array =
      this.props.arrayCheckBox.length > 0 &&
      this.props.arrayCheckBox.length == listProduct.length
        ? true
        : false;
    var multiDelete = selected.length > 0 ? "show" : "hide";
    var { _delete, update, insert } = this.props;

    return (
      <div>
        {/* <button
          onClick={(e) => this.handleMultiDelCallBack(e, selected)}
          data-toggle="modal"
          data-target="#removeMultiModal"
          style={{ marginLeft: "10px" }}
          class={`btn btn-danger btn-sm ${multiDelete}`}
        >
          <i class="fa fa-trash"></i> Xóa {selected.length} sản phẩm
        </button> */}
        {showModalUpdatePriceAgency ? (
          <UpdatePriceAgencyModal
            store_code={this.props.store_code}
            agency_type_id={agency_type_id}
            productId={productId}
            setShowModalUpdatePriceAgency={this.setShowModalUpdatePriceAgency}
            fetchAllProduct={this.fetchAllProduct}
            updatePriceOneProduct={this.props.updatePriceOneProduct}
          ></UpdatePriceAgencyModal>
        ) : null}

        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={_array}
                  onChange={this.onChangeSelectAll}
                />
              </th>
              <th>STT</th>

              <th>Hình ảnh</th>

              <th>Mã SKU</th>

              <th>Tên sản phẩm</th>

              <th>Hoa hồng</th>

              <th>Giá bán lẻ</th>

              <th>Giá đại lý</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(listProduct, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducers.product.product_agency_price_id,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchProductAgencyPrice: (store_code, productId, agency_type_id) => {
      dispatch(
        productAction.fetchProductAgencyPrice(
          store_code,
          productId,
          agency_type_id
        )
      );
    },
    fetchAllProduct: (store_code, page, params, agency_type_id) => {
      dispatch(
        productAction.fetchAllProduct(store_code, page, params, agency_type_id)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
