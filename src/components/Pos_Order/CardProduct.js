import React, { Component } from "react";
import { connect } from "react-redux";
import * as OrderAction from "../../actions/add_order";
import * as Env from "../../ultis/default";
import { filter_arr, format } from "../../ultis/helpers";
import { findTotalStockPos } from "../../ultis/productUltis";

class CardProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "",
      isToggle: false,
    };
  }

  handleInfoProduct = (
    inventory,
    id,
    name,
    image,
    price,
    distributes,
    maxPrice,
    minPrice,
    priceDiscount,
    quayntity,
    quantityDistribute,
    product
  ) => {
    if (distributes.length > 0) {
      this.setState({ isToggle: true });
      this.props.handleCallbackProduct({
        inventoryProduct: inventory,
        idProduct: id,
        nameProduct: name,
        imageProduct: image,
        priceProduct: price,
        distributeProduct: distributes,
        minPriceProduct: minPrice,
        maxPriceProduct: maxPrice,
        discountProduct: priceDiscount,
        // quantityProduct: quayntity,
        quantityProduct: 1,

        quantityProductWithDistribute: quantityDistribute,
        product: product,
      });
    } else {
      this.setState({ isToggle: false });
      this.props.handleCallbackPushProduct({
        nameProduct: name,
        element_id: "",
        product_id: id,
        reality_exist: 0,
        nameDistribute: "",
        nameElement: "",
        nameSubDistribute: "",
        priceProduct: price,

        // stock: quayntity,
        stock: 1,

        product: product,
      });
    }
  };

  buildItemProduct = (product) => {
    var data = product;
    var image = (
      <img
        src={
          data.images.length > 0
            ? data.images[0].image_url
            : Env.IMG_NOT_FOUND_2
        }
        className="img-responsive image-product"
        alt="Image"
        width="40px"
        height="40px"
        style={{
          marginRight: 10,
        }}
      />
    );
    var price = (
      <p class="product-price-pos-search-top-bar">
        {data.min_price == data.max_price
          ? format(Number(data.min_price))
          : `${format(Number(data.min_price))}- ${format(
              Number(data.max_price)
            )}`}
      </p>
    );

    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {data?.product_retail_steps?.length > 0 ? (
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              zIndex: 100,
              borderBottomRightRadius: "5px",
              padding: "5px",
              backgroundColor: "#f57224",
              fontSize: "8px",
              color: "#fff",
            }}
          >
            Có khoảng giá
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            height: "auto",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {image}
          <div
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              className="product-name-pos-search-top-bar"
              style={{
                fontSize: "13px",
              }}
            >
              {data.name}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>{price}</div>
              {data.check_inventory && (
                <div className="product-stock-pos-search-top-bar">
                  Kho: {findTotalStockPos(data)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  showProduct = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((data, index) => {
        return (
          <div
            class="col-sm-2"
            style={{
              marginBottom: "10px",
              "padding-right": "8px",
              "padding-left": "8px",
            }}
          >
            <a
              data-toggle={this.state.isToggle ? "modal" : ""}
              data-target="#modalDetail"
              onClick={() =>
                this.handleInfoProduct(
                  data.inventory,
                  data.id,
                  data.name,
                  data.images,
                  data.price,
                  data.distributes,
                  data.max_price,
                  data.min_price,
                  data.product_discount,
                  data.quantity_in_stock,
                  data.quantity_in_stock_with_distribute,
                  data
                )
              }
            >
              <div class="card card-product-pos">
                {data.check_inventory && (
                  <div class="inventory-tag">SL: {findTotalStockPos(data)}</div>
                )}
                {data.product_discount && (
                  <div class="discount-tag">{data.product_discount.value}%</div>
                )}

                <img
                  src={
                    data.images.length > 0
                      ? data.images[0].image_url
                      : Env.IMG_NOT_FOUND_2
                  }
                  className="img-responsive image-product"
                  alt="Image"
                  width="100%"
                  height="100px"
                />

                <div class="card-body" style={{ padding: " 0 5px" }}>
                  <p
                    class="card-title"
                    style={{
                      margin: "0",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      fontSize: "13px",
                    }}
                  >
                    {data.name}
                  </p>
                  <p class="card-text price">
                    {data.min_price == data.max_price
                      ? format(Number(data.min_price))
                      : `${format(Number(data.min_price))}-${format(
                          Number(data.max_price)
                        )}`}
                  </p>
                </div>
              </div>
            </a>
          </div>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  render() {
    var { products, isItemSearch } = this.props;
    var listProducts = filter_arr(products.data);
    console.log("🚀 ~ render ~ listProducts:", listProducts);

    if (isItemSearch) {
      return this.buildItemProduct(this.props.product);
    }

    return (
      <div
        className="show-product-pos"
        style={{ overflow: "hidden", overflowY: "auto" }}
      >
        <div className="row">{this.showProduct(listProducts)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducers.product.allProduct,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    createOrder: (store_code, data) => {
      dispatch(OrderAction.createOrder(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
