import React, { Component } from "react";
import { filter_arr, format } from "../../ultis/helpers";
import * as Env from "../../ultis/default"
import { Link } from "react-router-dom";


class InfoProduct extends Component {
    constructor(props) {
        super(props);
    }


    showListDistribute = (distributes) => {
        var result = null;
        if (distributes == null) {
            return result
        }
        if (distributes.length > 0) {
            result = distributes.map((distribute, index) => {
                return (
                    <div>
                        <p class=" bold sale_user_label">
                            {distribute.name}:
                            <span class="cart_payment_method">
                                {distribute.value}
                            </span>

                        </p>
                    </div>
                )
            })
        }
        return result
    }


    shoListProduct = (products , product_discount_amount) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                var product_img =
                    product.image_url == null
                        ? Env.IMG_NOT_FOUND
                        : product.image_url;
                var showTagDelPrice = product_discount_amount > 0 ? 0 : 1
                console.log(product.product_discount_amount)
                console.log(showTagDelPrice)
                var line_list_product = index < Number(products.length - 1) ? "line-list-product" : null
                var store_code = this.props.store_code
                return (
                    <li className={`${line_list_product} row`} style={{ display: "flex", marginBottom: "10px" }}>
                        <li className="cart_item cart_item_change col-lg-3 col-md-12 col-sm-12 ">
                            <div className="panel panel-default mb0" style={{}}>
                                <div className="panel-body pd0">
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

                        <li className="cart_item cart_item_change col-lg-8 col-md-12 col-sm-12">
                            <div class="col-xs-12 pl0" id="user_cart_info">
                                <div class="box box-warning cart_wrapper mb0">
                                    <div class="box-body  pt0">
                                        <div>

                                            <p class="bold_name sale_user_label" style={{ fontWeight: "500" }}>
                                                Tên sản phẩm:
                                                <Link to={`/product/edit/${store_code}/${product.id}`}>

                                                    <span>&nbsp;{product.name}</span>
                                                </Link>
                                            </p>
                                        </div>

                                        <div>
                                            <p class=" bold sale_user_label">
                                                Số lượng:
                                                <span id="total_selected">x{product.quantity}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p class=" bold sale_user_label">
                                                Giá sản phẩm:
                                                <span class={`cart_payment_method ${showTagDelPrice != 0 ||  (product.before_price == product.after_discount || product.before_discount_price == product.after_discount) ? "show" : "hide"}`}>
                                                {format(product.before_price || product.before_discount_price)}
                                                </span>
                                                <del class={`cart_payment_method ${showTagDelPrice == 0 && ((product.before_price != product.after_discount && typeof product.before_price != "undefined" ) || (product.before_discount_price != product.after_discount && typeof product.before_discount_price != "undefined")) ? "show" : "hide"}`}>
                                                {format(product.before_price || product.before_discount_price)}
                                                </del>
                                            </p>
                                        </div>
                                        <div className={ `${showTagDelPrice == 0 && ((product.before_price != product.after_discount && typeof product.before_price != "undefined" ) || (product.before_discount_price != product.after_discount && typeof product.before_discount_price != "undefined")) ? "show" : "hide"}`}>
                                            <p class="bold sale_user_label">
                                                Giá sau khuyển mại:
                                                <span class={`cart_payment_method `}>
                                                    {format(product.after_discount)}
                                                </span>
                                            </p>
                                        </div>
                                        {this.showListDistribute(product.distributes_selected)}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </li>
                );
            });
        } else {
            return result;
        }
        return result;
    };

    countItem = (list) => {

        var result = ""
        var length = 0
        if (list.length > 0) {
          result = list.map((data, index) => {
            length = data.quantity + length
          })
        }
        return length
      }

    render() {
        var { bill } = this.props;
        var order_code = bill.order_code;
        var total_product =
            Array.isArray(bill.line_items_at_time) == true
                ? bill.line_items_at_time.length
                : 0;
        var listProduct = filter_arr(bill.line_items_at_time);
        var {product_discount_amount} = bill

        return (
            <div className="card box box-warning cart_wrapper mb0">
                <div className="box-header">
                    <span className="box-title ">
                        Mã đơn: <span id="cart_code">{order_code}</span> |
                        <span id="count">&nbsp; {this.countItem(bill?.line_items_at_time ?? [])} sản phẩm</span>
                    </span>
                </div>
                <br></br>
                <ul
                    id="sale_cart_container"
                    className="box-body  no-padding cart_items"
                >
                    {this.shoListProduct(listProduct , product_discount_amount)}
                </ul>
            </div>
        );
    }
}

export default InfoProduct;
