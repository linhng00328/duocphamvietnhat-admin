import React, { Component } from "react";
import { filter_arr, format } from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill";
import * as Types from "../../constants/ActionType";
class InfoProductPos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refund: 0,
      list_refunds: [],
    };
    this.refund = 0;
  }
  componentWillMount() {
    this.props.resetCalculate({
      type: Types.GET_CALCULATE,
      data: {},
    });
  }

  hasBonusProduct = (listProduct) => {
    if (listProduct?.length == 0) {
      return false;
    } else {
      for (const item of listProduct) {
        if (item.is_bonus === true) return true;
      }
    }
    return false;
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.check != nextProps.check &&
      this.state.list_refunds.length == 0
    ) {
      if (nextProps.check == true) {
        var list_items = filter_arr(nextProps.bill.line_items);
        var array = [];
        list_items &&
          list_items.forEach((element) => {
            array.push({
              line_item_id: element.id,
              quantity: element.quantity - element.total_refund,
              check: this.hasBonusProduct(list_items),
            });
          });
        this.setState({ list_refunds: [...array] });
        if (this.hasBonusProduct(list_items) === true)
          this.postTotalRefund(array);
      } else {
      }
    }
  }

  showListDistribute = (distributes) => {
    var result = null;
    if (distributes == null) {
      return result;
    }
    if (distributes.length > 0) {
      result = distributes.map((distribute, index) => {
        return (
          <>
            {distribute.name !== null ? (
              <div>
                <p class=" bold sale_user_label">
                  Phân loại:
                  <span class="cart_payment_method">{distribute.value}</span>
                </p>
                {distribute.sub_element_distributes != null &&
                  distribute.sub_element_distributes != "" && (
                    <p class=" bold sale_user_label">
                      <span class="cart_payment_method">
                        {distribute.sub_element_distributes}
                      </span>
                    </p>
                  )}
              </div>
            ) : null}
          </>
        );
      });
    }
    return result;
  };

  getRefund = (id, list_items) => {
    for (const element of list_items) {
      if (element.product && element.product.id == id) {
        if (element.is_refund == false) {
          // this.refund = element.total_refund;
          return (this.refund = element.total_refund || 0);
        } else {
          return false;
        }
      }
    }
  };

  getNumQuantity = (id, list_items) => {
    for (const element of list_items) {
      if (element.product && element.product.id == id) {
        if (element.is_refund == false) {
          // this.refund = element.total_refund;
          return Number(element.quantity) - Number(element.total_refund);
        } else {
          return 0;
        }
      }
    }
  };

  getCanQuantity = (id, list_items) => {
    if (this.state.list_refunds.length > 0) {
      var list_refunds = [...this.state.list_refunds];
      var line_item_id = this.getLineItemId(id);
      for (const element of list_refunds) {
        if (element.line_item_id == line_item_id) {
          return element.quantity;
        }
      }
    } else {
      for (const element of list_items) {
        if (element.product && element.product.id == id) {
          if (element.is_refund == false) {
            // this.refund = element.total_refund;
            return Number(element.quantity) - Number(element.total_refund);
          } else {
            return 0;
          }
        }
      }
    }
    return 1;
  };

  postTotalRefund = (list) => {
    var list_refunds = [...list];
    var newArray = [];
    list_refunds.forEach((element) => {
      if (element.check == true) {
        var item = { ...element };
        delete item.check;
        newArray.push(item);
      }
    });

    var { bill } = this.props;
    var order_code = bill.order_code;
    var data = {
      order_code: order_code,
      refund_line_items: newArray,
    };
    var { store_code } = this.props;

    this.props.getCalculate(store_code, data);
  };

  checkItem = (id) => {
    var list_refunds = [...this.state.list_refunds];
    var listItems = [];
    var _id = this.getLineItemId(id);
    if (list_refunds?.length == 0) return false;
    else {
      listItems = list_refunds.filter(function (e) {
        return e.line_item_id === _id && e.check === true;
      });
    }
    return listItems.length > 0;
  };

  check = (e, id) => {
    var list_refunds = [...this.state.list_refunds];

    for (var element of list_refunds) {
      if (element.line_item_id == id) {
        element.check = e.target.checked;
      }
    }
    var newArray = [];
    list_refunds.forEach((element) => {
      if (element.check == true) {
        var item = { ...element };
        delete item.check;
        newArray.push(element);
      }
    });

    this.setState({ list_refunds: [...list_refunds] });
    this.postTotalRefund(list_refunds);
  };

  getLineItemId = (product_id) => {
    var list_items = filter_arr(this.props.bill.line_items);

    for (const element of list_items) {
      if (element.product.id == product_id) {
        return element.id;
      }
    }
    return null;
  };

  onChangeInputQuantity = (e, id, max = 1) => {
    var list_refunds = [...this.state.list_refunds];
    var value = Number(e.target.value);
    for (var element of list_refunds) {
      if (element.line_item_id == id) {
        if (e.target.value == "") {
          element.quantity = 0;
        } else if (value > max || value < 1 || !Number.isInteger(value)) {
          return;
        } else element.quantity = value;
      }
    }
    this.setState({ list_refunds: [...list_refunds] });
    this.postTotalRefund(list_refunds);
  };

  changeQuantity = (type, id, max = 1) => {
    var list_refunds = [...this.state.list_refunds];
    if (type == "INCREASE") {
      for (var element of list_refunds) {
        if (element.line_item_id == id) {
          if (element.quantity + 1 > max) {
            return;
          }
          element.quantity = element.quantity + 1;
        }
      }
    } else {
      for (var element of list_refunds) {
        if (element.line_item_id == id) {
          if (element.quantity - 1 <= 0) {
            return;
          }
          element.quantity = element.quantity - 1;
        }
      }
    }
    this.setState({ list_refunds: [...list_refunds] });
    this.postTotalRefund(list_refunds);
  };

  post = () => {
    var list_refunds = [...this.state.list_refunds];
    var newArray = [];
    list_refunds.forEach((element) => {
      if (element.check == true) {
        var item = element;
        delete item.check;
        newArray.push(element);
      }
    });
    var { bill } = this.props;
    var order_code = bill.order_code;
    var data = {
      order_code: order_code,
      refund_line_items: newArray,
    };
    var { store_code } = this.props;

    if (newArray.length > 0) {
      this.props.postRefund(data, store_code);
    }
  };

  getPriceForBill = (id) => {
    var list_items = filter_arr(this.props.bill.line_items);

    for (const item of list_items) {
      if (item.id == id) {
        return item.after_discount || item.price;
      }
    }
  };

  checkExsitProduct = (id) => {
    var list_items = filter_arr(this.props.bill.line_items);

    for (const item of list_items) {
      if (item.product.id == id) {
        return true;
      }
    }
    return false;
  };

  getTotalRefund = () => {
    var { list_refunds } = this.state;
    var total = 0;
    list_refunds.forEach((element) => {
      if (element.check == true) {
        total =
          total + this.getPriceForBill(element.line_item_id) * element.quantity;
      }
    });
    return total;
  };

  shoListProduct = (
    products,
    product_discount_amount,
    list_items,
    total_final
  ) => {
    console.log(
      "🚀 ~ file: InfoProductPos.js:312 ~ InfoProductPos ~ products:",
      products
    );
    var result = null;
    var { check } = this.props;
    if (products.length > 0) {
      result = products.map((product, index) => {
        var product_img =
          product.image_url == null ? Env.IMG_NOT_FOUND : product.image_url;
        var showTagDelPrice = product_discount_amount > 0 ? 0 : 1;
        var line_list_product =
          index < Number(products.length - 1) ? "line-list-product" : null;
        var store_code = this.props.store_code;
        return (
          <React.Fragment>
            {
              // this.checkExsitProduct(product.id) == true &&
              <li
                className={`${line_list_product} row`}
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <li className="cart_item cart_item_change col-lg-3 col-md-12 col-sm-12 ">
                  <div className="panel panel-default mb0">
                    <div className="panel-body pd0" style={{ display: "flex" }}>
                      <Link to={`/product/edit/${store_code}/${product.id}`}>
                        <img
                          data-toggle="tooltip"
                          title={product.name}
                          className="cart_item_img"
                          style={{ width: "120px", maxHeight: "120px" }}
                          src={product_img}
                        />
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="cart_item cart_item_change col-lg-9 col-md-12 col-sm-12">
                  <div class="col-xs-12 pl0" id="user_cart_info">
                    <div
                      class="box box-warning cart_wrapper mb0"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div class="box-body  pt0" style={{ flex: "2" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            class="bold_name sale_user_label"
                            style={{ fontWeight: "500" }}
                          >
                            Tên sản phẩm:
                            <Link
                              to={`/product/edit/${store_code}/${product.id}`}
                            >
                              <span>&nbsp;{product.name}</span>
                            </Link>
                          </p>
                          {product.is_bonus === true && (
                            <div>
                              <i
                                class="fa fa-gift"
                                style={{
                                  "font-size": "40px",
                                  color: "darkorange",
                                  marginLeft: "4px",
                                }}
                              ></i>
                            </div>
                          )}
                        </div>
                        {product.note ? (
                          <div>
                            <p class=" bold sale_user_label">
                              Ghi chú:
                              <span id="total_selected">{product.note}</span>
                            </p>
                          </div>
                        ) : null}
                        {/* <div >
                                              <p class=" bold sale_user_label">
                                                  Tổng số lượng:

                                                  <span id="total_selected">x{product.quantity}</span>

                                              </p>


                                          </div> */}

                        {this.getRefund(product.id, list_items) > 0 && (
                          <div>
                            <p
                              class=" bold sale_user_label"
                              style={{ color: "red" }}
                            >
                              Đã hoàn tiền số lượng:
                              <span id="total_selected">x{this.refund}</span>
                            </p>
                          </div>
                        )}

                        {check == true &&
                        this.getNumQuantity(product.id, list_items) > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p class=" bold sale_user_label">Số lượng hoàn:</p>
                            {
                              <div class="quantity" style={{ display: "flex" }}>
                                <span
                                  class="input-quantity input-number-decrement form-input-number "
                                  onClick={() =>
                                    this.changeQuantity(
                                      "DECREASE",
                                      this.getLineItemId(product.id),
                                      this.getNumQuantity(
                                        product.id,
                                        list_items
                                      )
                                    )
                                  }
                                >
                                  <span>–</span>
                                </span>
                                <input
                                  style={{ height: "28px" }}
                                  class="input-number"
                                  name="txtQuantity"
                                  type="text"
                                  value={this.getCanQuantity(
                                    product.id,
                                    list_items
                                  )}
                                  onChange={(e) =>
                                    this.onChangeInputQuantity(
                                      e,
                                      this.getLineItemId(product.id),
                                      this.getNumQuantity(
                                        product.id,
                                        list_items
                                      )
                                    )
                                  }
                                />
                                <span
                                  class="input-quantity input-number-increment form-input-number"
                                  onClick={() =>
                                    this.changeQuantity(
                                      "INCREASE",
                                      this.getLineItemId(product.id),
                                      this.getNumQuantity(
                                        product.id,
                                        list_items
                                      )
                                    )
                                  }
                                >
                                  <span>+</span>
                                </span>
                              </div>
                            }
                          </div>
                        ) : (
                          <div>
                            <p class=" bold sale_user_label">
                              Tổng số lượng:
                              <span id="total_selected">
                                x{product.quantity}
                              </span>
                            </p>
                          </div>
                        )}

                        <div>
                          <p
                            class=" bold sale_user_label"
                            style={{ paddingTop: "3px" }}
                          >
                            Giá sản phẩm:
                            <span
                              class={`cart_payment_method ${
                                showTagDelPrice != 0 ||
                                product.before_price == product.item_price ||
                                product.before_discount_price ==
                                  product.item_price
                                  ? "show"
                                  : "hide"
                              }`}
                            >
                              {format(
                                product.before_price || product.item_price
                              )}
                            </span>
                            <del
                              class={`cart_payment_method ${
                                showTagDelPrice == 0 &&
                                ((product.before_price !=
                                  product.after_discount &&
                                  typeof product.before_price != "undefined") ||
                                  (product.before_discount_price !=
                                    product.after_discount &&
                                    typeof product.before_discount_price !=
                                      "undefined"))
                                  ? "show"
                                  : "hide"
                              }`}
                            >
                              {format(
                                product.before_price ||
                                  product.before_discount_price
                              )}
                            </del>
                          </p>
                        </div>
                        <div
                          className={`${
                            showTagDelPrice == 0 &&
                            ((product.before_price != product.after_discount &&
                              typeof product.before_price != "undefined") ||
                              (product.before_discount_price !=
                                product.after_discount &&
                                typeof product.before_discount_price !=
                                  "undefined"))
                              ? "show"
                              : "hide"
                          }`}
                        >
                          <p class="bold sale_user_label">
                            Giá sau khuyển mại:
                            <span class={`cart_payment_method `}>
                              {format(product.after_discount)}
                            </span>
                          </p>
                        </div>
                        {this.showListDistribute(product.distributes_selected)}
                      </div>
                      {check == true &&
                        product.is_bonus === false &&
                        this.getNumQuantity(product.id, list_items) > 0 && (
                          <div
                            class="checkbox"
                            style={{
                              marginRight: "10px",
                              marginRight: "10px",
                              marginLeft: "20px",
                              alignSelf: "center",
                            }}
                          >
                            <label>
                              <input
                                style={{ width: "16px", height: "16px" }}
                                type="checkbox"
                                checked={this.checkItem(product.id)}
                                onChange={(e) =>
                                  this.check(e, this.getLineItemId(product.id))
                                }
                              />
                            </label>
                          </div>
                        )}
                      {check == false ||
                        (this.getNumQuantity(product.id, list_items) <= 0 && (
                          <div
                            class="checkbox"
                            style={{
                              marginRight: "10px",
                              marginRight: "10px",
                              marginLeft: "20px",
                              alignSelf: "center",
                            }}
                          >
                            <label>
                              <input
                                title="Đã hoàn hết sản phẩm này"
                                disabled
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  cursor: "not-allowed",
                                }}
                                type="checkbox"
                              />
                            </label>
                          </div>
                        ))}
                    </div>

                    {/* {check == true && this.getNumQuantity(product.id, list_items) > 0 && (
                                                <div class="checkbox" style={{
                                                    marginRight: "10px", marginRight: "10px",
                                                    alignSelf: "center"
                                                }}>
                                                    <label>
                                                        <input style={{ width: "16px", height: "16px" }} type="checkbox" onChange={(e) => this.check(e, this.getLineItemId(product.id))} />

                                                    </label>
                                                </div>
                                            )}
                                            {check == false || this.getNumQuantity(product.id, list_items) <= 0 && (
                                                <div class="checkbox" style={{
                                                    marginRight: "10px", marginRight: "10px",
                                                    alignSelf: "center"
                                                }}>
                                                    <label>
                                                        <input title="Đã hoàn hết sản phẩm này" disabled style={{ width: "16px", height: "16px", cursor: "not-allowed" }} type="checkbox" />

                                                    </label>
                                                </div>
                                            )} */}
                  </div>
                </li>
              </li>
            }

            {/* {index == products.length - 1 && (
                            <li className={`${line_list_product} row`} style={{ display: "flex", marginBottom: "10px" }}>

                                <li className="cart_item cart_item_change col-lg-3 col-md-12 col-sm-12 ">
                                </li>

                                <li className="cart_item cart_item_change col-lg-8 col-md-12 col-sm-12">
                                    <React.Fragment>
                                        <div style={{ marginTop: "10px" }} className="">
                                            <p class="bold sale_user_label" style={{ color: "green" }}>
                                                Tổng tiền:
                                                <span class={`cart_payment_method `}>
                                                    {format(total_final)}
                                                </span>
                                            </p>
                                        </div>

                                    </React.Fragment>
                                </li>
                            </li>


                        )} */}
            {index == products.length - 1 && check == true && (
              <li
                className={`${line_list_product} row`}
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <li className="cart_item cart_item_change col-lg-3 col-md-12 col-sm-12 "></li>

                <li className="cart_item cart_item_change col-lg-8 col-md-12 col-sm-12">
                  <React.Fragment>
                    <div className="">
                      <p class="bold sale_user_label" style={{ color: "red" }}>
                        Tổng tiền hoàn:{" "}
                        {this.props.calculate.total_refund_current_in_time
                          ? format(
                              this.props.calculate.total_refund_current_in_time
                            )
                          : "0đ"}
                        <span class={`cart_payment_method `}></span>
                      </p>
                    </div>
                  </React.Fragment>
                  {index == products.length - 1 &&
                    check == true &&
                    this.props.calculate.total_refund_current_in_time > 0 && (
                      <React.Fragment>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <button
                            onClick={this.post}
                            type="button"
                            class="btn btn-success"
                          >
                            Hoàn tiền
                          </button>
                        </div>
                      </React.Fragment>
                    )}
                </li>
              </li>
            )}
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  countItem = (list) => {
    var result = "";
    var length = 0;
    if (list.length > 0) {
      result = list.map((data, index) => {
        length = data.quantity + length;
      });
    }
    return length;
  };

  render() {
    var { bill, bills, calculate, store_code } = this.props;
    var order_code = bill.order_code;
    var total_product =
      Array.isArray(bill.line_items_at_time) == true
        ? bill.line_items_at_time.length
        : 0;
    var listProduct = filter_arr(bill.line_items_at_time);
    var list_items = filter_arr(bill.line_items);

    var { product_discount_amount } = bill;
    var total_final = bill.total_final;
    return (
      <div className="card box box-warning cart_wrapper mb0">
        <div className="box-header">
          <span className="box-title ">
            Mã đơn: #<span id="cart_code">{bill.order_code}</span>
            <span id="count">
              &nbsp; | &nbsp;{bill?.line_items_at_time?.length ?? 0} sản phẩm
            </span>
          </span>
          {bill.order_code_refund != null && (
            <span style={{ color: "red", display: "block" }}>
              Đã hoàn tiền từ đơn:{" "}
              <span id="cart_code">
                <a
                  href={`/order/detail/${store_code}/${bill.order_code_refund}`}
                >
                  #{bill.order_code_refund}
                </a>{" "}
              </span>
            </span>
          )}
        </div>
        <br></br>
        <ul
          id="sale_cart_container"
          className="box-body  no-padding cart_items"
          style={{ margin: "0 20px" }}
        >
          {this.shoListProduct(
            listProduct,
            product_discount_amount,
            list_items,
            total_final
          )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    calculate: state.billReducers.bill.calculate,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    postRefund: (data, store_code) => {
      dispatch(billAction.postRefund(data, store_code));
    },
    getCalculate: (store_code, data) => {
      dispatch(billAction.getCalculate(store_code, data));
    },
    resetCalculate: (data) => {
      dispatch(data);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoProductPos);
