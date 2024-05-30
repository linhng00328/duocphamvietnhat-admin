import React, { Component } from "react";
import { format, formatNumberV2 } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as OrderAction from "../../actions/add_order";
import { connect } from "react-redux";
import { debounce } from "lodash";
import * as Env from "../../ultis/default";
import * as posAction from "../../actions/post_order";
import * as productAction from "../../actions/product";
import ReactDOM from "react-dom";
import {
  findImportPrice,
  findImportPriceSub,
  findPrice,
  findTotalStock,
  findTotalStockPos,
  stockOfProduct,
} from "../../ultis/productUltis";
import styled from "styled-components";
import * as SettingAction from "../../actions/notification";

const ItemInCartStyles = styled.div`
  .inputCost {
    display: flex;
    column-gap: 15px;
    align-items: center;
    .iconInputCost {
      display: flex;
      align-items: center;
      column-gap: 5px;
      span {
        cursor: pointer;
        &:last-child {
          color: #7f8c8d;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      & > span {
        font-size: 14px;
        color: #2c3e50;
      }
    }
  }
  .input-cost {
    width: 100%;
    display: flex;
    column-gap: 15px;
    border-bottom: 1px solid #bdc3c7;
    input {
      width: 100%;
    }
    .iconInputConfirm {
      display: flex;
      align-items: center;
      column-gap: 10px;
      font-size: 18px;
      span:nth-child(1) {
        color: #2ecc71;
        cursor: pointer;
      }
      span:nth-child(2) {
        color: #e74c3c;
        cursor: pointer;
      }
    }
  }
`;
class ItemInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuantity: 1,
      distribute: "",
      maxQuantityDistribute: "",
      idElement: "",
      distributeName: "",
      distributeValue: "",
      element_distributes: "",
      distributeSelected: -1,
      subElementDistributeSelected: -1,
      elementNameSelected: "",
      subElementNameDistributeSelected: "",
      isOnChangeQuantity: false,

      afterPrice: "",
      priceBeforeDiscount: "",
      afterChoosePrice: "",
      elementObject: "",
      minPriceAfterDiscount: "",
      maxPriceAfterDiscount: "",
      stateDistribute: false,
      messageErr: "",
      quantityInStock: "",
      elementDistributeOj: "",
      totalStocks: 0,
      showEditCost: false,
      txtCostInput: "",
      showEditNote: false,
      txtNoteInput: "",
    };
    this.nameElementDistribute = "";
    this.nameSubElementDistribute = "";
    this.wrapperRef = React.createRef();
    this.changeQuantity = debounce(this.handleChangeQuantity, 400);
  }
  setTxtNoteInput(txtNoteInput) {
    this.setState({ txtNoteInput });
  }

  setShowEditNote(showEditNote) {
    this.setState({ showEditNote });
  }

  handleInputNote = (note) => {
    this.setShowEditNote(true);
    this.setTxtNoteInput(note);
  };

  handleChangeNote = (e) => {
    const value = e.target.value;
    this.setTxtNoteInput(value);
  };

  setTxtCostInput(txtCostInput) {
    this.setState({ txtCostInput });
  }

  setShowEditCost(showEditCost) {
    this.setState({ showEditCost });
  }
  handleInputCost = (price) => {
    console.log("🚀 ~ file: ItemInCart.js:131 ~ ItemInCart ~ price:", price);
    const newValue = formatNumberV2(price);
    this.setShowEditCost(true);
    this.setTxtCostInput(newValue);
  };
  handleChangeCost = (e) => {
    const value = e.target.value;
    const newValue = formatNumberV2(value);
    this.setTxtCostInput(newValue);
  };
  handleUpdateNoteItem = (item) => {
    const { store_code, updateNoteItem, branch_id, listItemPos } = this.props;
    const { txtNoteInput } = this.state;

    const data = {
      note: txtNoteInput,
    };
    updateNoteItem(store_code, branch_id, listItemPos.id, item.id, data);
  };
  handleUpdatePriceItem = (item) => {
    const { store_code, updatePriceItem, branch_id, listItemPos } = this.props;
    const { txtCostInput } = this.state;
    const data = {
      has_edit_item_price: true,
      item_price: txtCostInput.toString().replace(/\./g, ""),
    };
    updatePriceItem(store_code, branch_id, listItemPos.id, item.id, data);
  };

  handleUpdatePriceItemDefault = (item) => {
    const { store_code, updatePriceItem, branch_id, listItemPos } = this.props;
    const data = {
      has_edit_item_price: false,
    };
    updatePriceItem(store_code, branch_id, listItemPos.id, item.id, data);
  };

  handleChangeQuantity = (quantity) => {
    this.props.addQuantity(
      this.props.item.product.id,
      this.props.item.id,
      quantity,
      this.props.item.distributes_selected
    );
  };

  // componentDidMount = () => {

  //     document.addEventListener('mousedown', this.handleClickOutside, true);
  // }

  handleClickOutside = (event) => {
    try {
      if (this.props.chooseId != null) {
        var checkHasContain = false;
        var path = event.path;
        console.log(path);
        for (const element of path) {
          if (element.className == "shopee-arrow-box__content") {
            checkHasContain = true;
          }
        }

        if (checkHasContain == false) {
          this.props.showDetail(null);
        }

        console.log(checkHasContain);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps:: ", nextProps);
    if (!shallowEqual(this.props.updatedPrice, nextProps.updatedPrice)) {
      this.setShowEditCost(false);
    }
    if (!shallowEqual(this.props.updatedNote, nextProps.updatedNote)) {
      this.setShowEditNote(false);
    }
    if (
      !shallowEqual(this.props.item.quantity, nextProps.item.quantity) ||
      (this.props.resetId != nextProps.resetId &&
        nextProps.chooseId == nextProps.item.id)
    ) {
      if (
        this.props.resetId == nextProps.resetId &&
        this.state.isOnChangeQuantity === true
      )
        return;
      this.setState({ currentQuantity: nextProps.item.quantity });
    }

    if (
      !shallowEqual(this.state.currentQuantity, nextProps.item.quantity) ||
      (this.props.resetId != nextProps.resetId &&
        nextProps.chooseId == nextProps.item.id)
    ) {
      if (this.state.isOnChangeQuantity === true) return;
      this.setState({ currentQuantity: nextProps.item.quantity });
    }
    if (
      !shallowEqual(
        nextProps.item?.distributes_selected,
        this.props.item?.distributes_selected
      ) ||
      nextProps.item.product?.id != this.props.item.product?.id ||
      (this.props.resetId != nextProps.resetId &&
        nextProps.chooseId == nextProps.item.id)
    ) {
      const { item } = nextProps;

      var itemParent =
        item.product &&
        item.product?.inventory &&
        item.product?.inventory.distributes !== null &&
        item.product?.inventory.distributes.length > 0
          ? item.product?.inventory.distributes[0]
          : [];

      var subElementNameDistributeSelected = null;

      itemParent.element_distributes &&
        itemParent.element_distributes[0].sub_element_distributes.map(
          (itemChild, index) => {
            this.setState({
              subElementDistributeSelected: index,
              subElementNameDistributeSelected: itemChild.name,
            });

            subElementNameDistributeSelected = itemChild.name;
          }
        );

      itemParent.element_distributes &&
        itemParent.element_distributes.map((itemChild, index) => {
          if (itemChild.id == item.element_distribute_id) {
            this.setState({
              distributeName: itemParent.name,
              distributeSelected: index,
              elementNameSelected: itemChild.name,
            });
            this.handleNewPriceOrStock(
              itemChild.name,
              subElementNameDistributeSelected
            );
          }
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var change_price_pos = permissions.change_price_pos;
      this.setState({
        isLoading: true,
        change_price_pos,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, true);
    const { store_code } = this.props;
    this.props.fetchAllGeneralSetting(store_code);

    this.setState({
      currentQuantity: this.props.item.quantity,
      distribute: this.props.item.product.distributes,
      txtNoteInput: this.props.item.note,
    });
  }

  subQuantity(idCart, id, productId, quantity, distribute) {
    const q =
      (parseInt(quantity) || 1) - 1 < 1 ? 1 : (parseInt(quantity) || 1) - 1;
    this.setState({
      currentQuantity: q,
    });
    this.changeQuantity(q);
  }

  addQuantity(productId, lineItemId, quantity, distribute, quantityInStock) {
    if (
      this.props.item.distributes_selected !== null &&
      this.props.item.distributes_selected.length > 0
    ) {
      const q = (parseInt(quantity) || 0) + 1;
      this.setState({
        currentQuantity: q,
      });
      this.changeQuantity(q);
    } else {
      const q = (parseInt(quantity) || 0) + 1;
      this.setState({
        currentQuantity: q,
      });
      this.changeQuantity(q);
    }
  }
  handleOnChange = (e, product) => {
    const { generalSetting } = this.props;
    let quantity = e.target.value;

    if (product.check_inventory && !generalSetting.allow_semi_negative) {
      const maxQuantityInventory = findTotalStockPos(product);
      if (Number(quantity) > 0) {
        quantity =
          Number(quantity) > maxQuantityInventory
            ? maxQuantityInventory
            : Number(quantity);
      }
    }

    if (isNaN(quantity) || Number(quantity) <= 0) quantity = 1;
    this.changeQuantity(quantity);

    if (
      this.props.item.distributes_selected !== null &&
      this.props.item.distributes_selected.length > 0
    ) {
      const q = quantity;
      this.setState({
        currentQuantity: q,
        isOnChangeQuantity: true,
      });
      return;
    } else {
      const q = quantity;
      this.setState({
        currentQuantity: q,
        isOnChangeQuantity: true,
      });
    }
  };
  handleDelete = (idCart, productId, lineId, distribute) => {
    this.props.handleDelete(idCart, productId, lineId, distribute);
  };

  handleUpdateCallbackProduct = (
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
    product,
    productWithCart,
    currentQuantity,
    distributes_selected
  ) => {
    this.props.handleUpdateCallbackProduct({
      inventoryProduct: inventory,
      idProduct: id,
      nameProduct: name,
      imageProduct: image,
      priceProduct: price,
      distributeProduct: distributes,
      minPriceProduct: minPrice,
      maxPriceProduct: maxPrice,
      discountProduct: priceDiscount,
      quantityProduct: quayntity,
      quantityProductWithDistribute: quantityDistribute,
      product: product,
      productWithCart: productWithCart,
      currentQuantity,
      distributes_selected,
    });
  };

  passData = (id, product, currentQuantity, distributes_selected) => {
    var { products } = this.props;
    console.log(id, products);
    for (const data of products) {
      if (data.id == id && data.distributes?.length > 0) {
        this.handleUpdateCallbackProduct(
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
          data,
          product,
          currentQuantity,
          distributes_selected
        );
        return;
      }
    }
  };

  handleNewPriceOrStock = (elementDistributeName, subElementDistribute) => {
    var product = this.props.item.product;
    var price = findPrice(product, elementDistributeName, subElementDistribute);
    var stock = stockOfProduct(
      product,
      elementDistributeName,
      subElementDistribute
    );

    if (price != null) {
      this.setState({
        afterChoosePrice: price,
        // priceBeforeDiscount: sub_elements.price,
        afterPrice: price,
        priceBeforeDiscount: price,

        quantityInStock: stock,
        // idElement: id,
        messageErr: "",
      });
    }
  };
  handleClick = (nameDistribute, nameObject, index, id, quatity) => {
    this.setState({
      distributeName: nameObject,
      distributeSelected: index,
      elementNameSelected: nameDistribute,
    });

    this.handleNewPriceOrStock(
      nameDistribute,
      this.state.subElementNameDistributeSelected
    );
  };

  handleClickSubElement = (nameElement, price, index, id) => {
    this.setState({
      subElementDistributeSelected: index,
      subElementNameDistributeSelected: nameElement,
    });
    this.handleNewPriceOrStock(this.state.elementNameSelected, nameElement);
  };

  closeModalClickOutSite = (length) => {
    if (length == 0 || !length) {
      if (this.props.chooseId != null) {
        this.props.showDetail(null);
      }
    }
  };

  updateCart = () => {
    const {
      distributeName,
      currentQuantity,
      subElementNameDistributeSelected,
      elementNameSelected,
    } = this.state;
    var { store_code, branch_id, item } = this.props;
    var { list_cart_id } = item;
    var data = {
      line_item_id: item.id,
      product_id: item.product.id,
      quantity: currentQuantity,
      distribute_name: distributeName,
      element_distribute_name: elementNameSelected,
      sub_element_distribute_name: subElementNameDistributeSelected,
    };
    this.props.updateQuantityLineItem(
      store_code,
      branch_id,
      list_cart_id,
      data
    );
    this.props.showDetail(null);
  };

  handleFetchRetailSteps = () => {
    const { getProductRetailSteps, store_code, branch_id, item } = this.props;

    getProductRetailSteps(store_code, branch_id, item.product.id);
  };

  //   nameProduct: item.product.nameProduct,
  //   product_id: item.product.idProduct,
  //   element_id: idElement,
  //   reality_exist: 0,
  //   nameDistribute: distributeName,
  //   nameElement: elementNameSelected,
  //   nameSubDistribute: subElementNameDistributeSelected,
  //   priceProduct: afterChoosePrice,
  //   stock: quantityInStock,

  // product_id: nextState.listPosItem.product_id,
  // quantity: 1,
  // distribute_name: nextState.listPosItem.nameDistribute,
  // element_distribute_name: nextState.listPosItem.nameElement,
  // sub_element_distribute_name: nextState.listPosItem.nameSubDistribute

  // "line_item_id": 3825,
  // "product_id": 26864,
  // "quantity": 0,
  // "distribute_name": "lao",
  // "element_distribute_name": "dsss",
  // "sub_element_distribute_name": "đo111"
  render() {
    const { item, index } = this.props;

    const {
      currentQuantity,
      showEditCost,
      showEditNote,
      txtNoteInput,
      change_price_pos,
    } = this.state;

    const maxQuantity = stockOfProduct(
      item.product,
      item?.distributes_selected != null
        ? item?.distributes_selected[0]?.value
        : null,
      item?.distributes_selected != null
        ? item?.distributes_selected[0]?.sub_element_distributes
        : null
    );

    const allowAdd = true;

    var itemParent =
      item.product &&
      item.product?.inventory &&
      item.product?.inventory.distributes !== null &&
      item.product?.inventory.distributes.length > 0
        ? item.product?.inventory.distributes[0]
        : [];
    var is_bonus = item.is_bonus;
    var allows_choose_distribute = item.allows_choose_distribute;

    return (
      <ItemInCartStyles
        onClick={() => {
          this.closeModalClickOutSite(item.product.distributes?.length);
        }}
        class={`card card-item-pos ${
          is_bonus === true ? "border-item-bonus1" : ""
        }`}
        style={{ marginBottom: "10px", fontSize: "13px" }}
        key={index}
      >
        <div class="card-body" style={{ padding: "0", position: "relative" }}>
          <div
            className="wrap-item"
            style={{
              display: "flex",
              fontSize: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="index">{index + 1}</div>

            <img
              src={
                item.product.images.length > 0
                  ? item.product.images[0].image_url
                  : Env.IMG_NOT_FOUND_2
              }
              className="img-responsive image-product"
              alt="Image"
              width="50px"
              height="50px"
            />

            <div
              className="info-product"
              style={{
                width: "30%",
                fontWeight: "400",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="name-product"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontSize: "13px",
                }}
              >
                {item.product.name}
              </div>
              {item.product.distributes?.length > 0 && (
                <div
                  className="wrap-distributes_selected"
                  style={{ fontSize: "13px", fontStyle: "italic" }}
                >
                  <div class="_34KJXV">
                    {/* <div class="_34KJXV" onClick={() => this.passData(item.product.id, item.product, currentQuantity, item.distributes_selected)} > */}
                    <div class="aUj6f2">
                      <div
                        class="_1XT_GF"
                        role="button"
                        tabindex="0"
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        <div
                          class="Qtk_DO"
                          id={`item_pos_${this.props.key}`}
                          ref={this.ref}
                          onClick={() => {
                            (is_bonus === false ||
                              allows_choose_distribute === true) &&
                              this.props.showDetail(item.id);
                          }}
                        >
                          Phân loại hàng:{" "}
                          {(is_bonus === false ||
                            allows_choose_distribute === true) && (
                            <button class="vZLqsj _2zsvOt"></button>
                          )}
                        </div>
                        {this.props.chooseId == item.id && (
                          <div className="detail" ref={this.ref}>
                            <div class="_3qAzj1 shopee-modal__transition-enter-done">
                              <div class="shopee-arrow-box__container">
                                <div class="shopee-arrow-box__arrow shopee-arrow-box__arrow--center">
                                  <div class="shopee-arrow-box__arrow-outer">
                                    <div class="shopee-arrow-box__arrow-inner"></div>
                                  </div>
                                </div>
                                <div class="shopee-arrow-box__content">
                                  <div class="_32z-AY">
                                    <div class="_39MbPI">
                                      <div
                                        className="info-voucher"
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "space-around",
                                          "border-bottom": "1px solid #cec6c6",
                                          width: "100%",
                                          "margin-bottom": "10px",
                                        }}
                                      >
                                        <div>
                                          <div
                                            className="value"
                                            style={{
                                              fontWeight: "bold",

                                              textOverflow: "ellipsis",
                                            }}
                                          >
                                            {item.product.nameProduct}
                                          </div>

                                          <div
                                            className="code"
                                            style={{ color: "black" }}
                                          >
                                            <span>
                                              Giá sản phẩm: &nbsp;
                                              {this.state.afterChoosePrice ===
                                              ""
                                                ? item.product
                                                    .product_discount === null
                                                  ? item.product.min_price ==
                                                    item.product.max_price
                                                    ? format(
                                                        Number(
                                                          item.product
                                                            .minPriceProduct
                                                        )
                                                      )
                                                    : `${format(
                                                        Number(
                                                          item.product.min_price
                                                        )
                                                      )}-${format(
                                                        Number(
                                                          item.product.max_price
                                                        )
                                                      )}`
                                                  : this.state
                                                      .minPriceAfterDiscount ===
                                                    this.state
                                                      .maxPriceAfterDiscount
                                                  ? `${format(
                                                      Number(
                                                        this.state
                                                          .minPriceAfterDiscount
                                                      )
                                                    )}`
                                                  : `${format(
                                                      Number(
                                                        this.state
                                                          .minPriceAfterDiscount
                                                      )
                                                    )} - ${format(
                                                      Number(
                                                        this.state
                                                          .maxPriceAfterDiscount
                                                      )
                                                    )}`
                                                : format(
                                                    Number(
                                                      this.state
                                                        .afterChoosePrice
                                                    )
                                                  )}
                                            </span>
                                          </div>

                                          {/* <div className='before-discout' style={{ display: "flex" }} >
                                                                                        <span style={{ fontSize: "13px", textDecoration: "line-through" }}>{item.product.product_discount ?
                                                                                            this.state.afterChoosePrice === "" ? item.product.min_price === item.product.max_price ? format(Number(this.state.afterPrice)) : `${format(Number(item.product.min_price))} - ${format(Number(item.product.max_price))}` : format(Number(this.state.priceBeforeDiscount)) : ""}</span>
                                                                                        <div className='persen-discount' style={{ fontSize: "13px", marginLeft: "10px" }}>{item.product.product_discount ? `- ${item.product.product_discount.value}%` : ""}</div>
                                                                                    </div> */}

                                          {item.product?.check_inventory && (
                                            <div
                                              className="quantity-product"
                                              style={{
                                                fontSize: "13px",
                                                color: "grey",
                                              }}
                                            >
                                              Tồn kho hiện tại{" "}
                                              {this.state.quantityInStock} sản
                                              phẩm
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div class="_3gvvQI">
                                        <div
                                          class="_3_Bulc"
                                          style={{
                                            fontSize: "13px",
                                          }}
                                        >
                                          {itemParent.name}
                                        </div>
                                        {itemParent.element_distributes &&
                                          itemParent.element_distributes.map(
                                            (itemChild, index) => {
                                              var elemet =
                                                index ===
                                                this.state
                                                  .distributeSelected ? (
                                                  <button
                                                    onClick={() =>
                                                      this.handleClick(
                                                        itemChild.name,
                                                        itemParent.name,
                                                        index,
                                                        itemChild.id,
                                                        itemChild.stock
                                                      )
                                                    }
                                                    class="product-variation product-variation--selected"
                                                  >
                                                    {itemChild.name}
                                                    <div class="product-variation__tick"></div>
                                                  </button>
                                                ) : (
                                                  <button
                                                    onClick={() =>
                                                      this.handleClick(
                                                        itemChild.name,
                                                        itemParent.name,
                                                        index,
                                                        itemChild.id,
                                                        itemChild.stock
                                                      )
                                                    }
                                                    class="product-variation"
                                                  >
                                                    {itemChild.name}
                                                  </button>
                                                );
                                              return elemet;
                                            }
                                          )}
                                      </div>
                                      <div class="_3gvvQI">
                                        <div class="_3_Bulc">
                                          {
                                            itemParent.sub_element_distribute_name
                                          }
                                        </div>
                                        {itemParent.element_distributes &&
                                          itemParent.element_distributes[0].sub_element_distributes.map(
                                            (itemChild, index) => {
                                              var elemet =
                                                index ===
                                                this.state
                                                  .subElementDistributeSelected ? (
                                                  <button
                                                    onClick={() =>
                                                      this.handleClickSubElement(
                                                        itemChild.name,
                                                        itemChild.price,
                                                        index,
                                                        itemChild.id
                                                      )
                                                    }
                                                    class="product-variation product-variation--selected"
                                                  >
                                                    {itemChild.name}
                                                    <div class="product-variation__tick"></div>
                                                  </button>
                                                ) : (
                                                  <button
                                                    onClick={() =>
                                                      this.handleClickSubElement(
                                                        itemChild.name,
                                                        itemChild.price,
                                                        index,
                                                        itemChild.id
                                                      )
                                                    }
                                                    class="product-variation"
                                                  >
                                                    {itemChild.name}
                                                  </button>
                                                );
                                              return elemet;
                                            }
                                          )}

                                        {/* <button
                                                class="product-variation"
                                                aria-label="Công Danh-Thăng Tiến"
                                                aria-disabled="false"
                                            >
                                                Công Danh-Thăng Tiến
                                            </button>

                                            <button
                                                class="product-variation product-variation--selected"
                                                aria-label="Thần Tài Giữ Của"
                                                aria-disabled="false"
                                            >
                                                Thần Tài Giữ Của
                                                <div class="product-variation__tick">
                                                    <svg
                                                        enable-background="new 0 0 12 12"
                                                        viewBox="0 0 12 12"
                                                        x="0"
                                                        y="0"
                                                        class="shopee-svg-icon icon-tick-bold"
                                                    >
                                                        <g>
                                                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </button> */}
                                      </div>
                                      <div class="_18oYnx">
                                        <button
                                          class="cancel-btn"
                                          onClick={() => {
                                            this.props.showDetail(null);
                                          }}
                                        >
                                          Trở Lại
                                        </button>
                                        <button
                                          class="shopee-button-solid shopee-button-solid--primary"
                                          onClick={this.updateCart}
                                        >
                                          Xác nhận
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div class="_3dqm1i">
                          {(item.distributes_selected ?? []).map((v, i) => (
                            <div>{`${v.name}: ${v.value}`}</div>
                          ))}
                          {item.distributes_selected &&
                          item.distributes_selected.length > 0
                            ? item.distributes_selected[0] &&
                              item.product.distributes[0]
                                .sub_element_distribute_name &&
                              item.distributes_selected[0]
                                .sub_element_distributes && (
                                <div>
                                  {`${item.product.distributes[0].sub_element_distribute_name}: 
                                            ${item.distributes_selected[0].sub_element_distributes}`}
                                </div>
                              )
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.54)",
                }}
              >
                {!showEditNote ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleInputNote(item.note)}
                  >
                    <i
                      style={{
                        fontSize: "10px",
                      }}
                      className="fas fa-pencil-alt"
                    ></i>
                    <span>{txtNoteInput ? txtNoteInput : "Thêm ghi chú"}</span>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      borderBottom: "1px solid #dadbdb",
                      paddingBottom: "3px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        style={{
                          color: "gray",
                          width: "100%",
                        }}
                        type="text"
                        value={this.state.txtNoteInput}
                        onChange={this.handleChangeNote}
                        placeholder="Thêm ghi chú"
                      />
                    </div>

                    <div
                      className="iconInputConfirm"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "4px",
                      }}
                    >
                      <span
                        style={{
                          color: "#2ecc71",
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleUpdateNoteItem(item)}
                      >
                        <i className="fa fa-check"></i>
                      </span>
                      <span
                        style={{
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                        onClick={() => this.setShowEditNote(false)}
                      >
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                width: "100px",
              }}
            >
              {item.product.is_product_retail_step ? (
                <span
                  style={{
                    color: "#005aff",
                    fontSize: "13px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={this.handleFetchRetailSteps}
                  data-toggle="modal"
                  data-target="#modalRetailSteps"
                >
                  Xem khoảng giá
                </span>
              ) : null}
            </div>
            <div className="quantity" style={{ paddingLeft: "0" }}>
              <div
                className=""
                style={{
                  float: "right",
                  border: "1px solid #9c9898ba",
                  borderRadius: "2px",
                }}
              >
                <button
                  className="btn-sub"
                  onClick={() =>
                    is_bonus === false &&
                    this.subQuantity(
                      item.list_cart_id,
                      item.id,
                      item.product.id,
                      currentQuantity,
                      item.distributes_selected
                    )
                  }
                  style={{ width: "20px", border: "none" }}
                >
                  -
                </button>
                <input
                  disabled={is_bonus}
                  className="input-quantity"
                  onChange={(e) =>
                    is_bonus === false && this.handleOnChange(e, item.product)
                  }
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: "13px",
                  }}
                  value={currentQuantity}
                ></input>
                <button
                  disabled={!allowAdd}
                  className="btn-add"
                  onClick={() =>
                    is_bonus === false &&
                    this.addQuantity(
                      item.product.id,
                      item.id,
                      currentQuantity,
                      item.distributes_selected,
                      item.product.quantity_in_stock
                    )
                  }
                  style={{ width: "20px", border: "none" }}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="cost inputCost"
              style={{ width: "15%", fontWeight: "400", fontSize: "13px" }}
            >
              {!showEditCost ? (
                <div>
                  {format(Number(item.item_price))}
                  {item.before_discount_price != item.item_price && (
                    <div className=" past-price-pos">
                      {" "}
                      {format(Number(item.before_discount_price))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="input-cost">
                  <input
                    type="text"
                    value={this.state.txtCostInput}
                    onChange={this.handleChangeCost}
                    placeholder="0₫"
                  />
                  <div className="iconInputConfirm">
                    <span onClick={() => this.handleUpdatePriceItem(item)}>
                      <i className="fa fa-check"></i>
                    </span>
                    <span onClick={() => this.setShowEditCost(false)}>
                      <i className="fa fa-times"></i>
                    </span>
                  </div>
                </div>
              )}
              {change_price_pos ? (
                <>
                  {!showEditCost ? (
                    <div className="iconInputCost">
                      <span
                        onClick={() =>
                          this.handleInputCost(Number(item.item_price))
                        }
                        style={{
                          color: item.has_edit_item_price
                            ? "rgb(220 122 13)"
                            : "#7f8c8d",
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </span>
                      {!item.has_edit_item_price ? null : (
                        <span
                          onClick={() =>
                            this.handleUpdatePriceItemDefault(item)
                          }
                          style={{
                            marginLeft: "5px",
                            color: "#4e73df",
                          }}
                        >
                          <i className="fa fa-sync"></i>
                        </span>
                      )}
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>

            {is_bonus === true ? (
              <div
                className="total-price"
                style={{ width: "13%", fontWeight: "500", fontSize: "13px" }}
              >
                {/* {item.bonus_product_name ?? "Thưởng sản pham"} */}
                Sản phẩm tặng
              </div>
            ) : (
              <div
                className="total-price"
                style={{ width: "13%", fontWeight: "500", fontSize: "13px" }}
              >
                {format(Number(item.item_price * currentQuantity))}
              </div>
            )}
            <div style={{ width: "5%" }}>
              {is_bonus === true ? (
                <i
                  class="fa fa-gift"
                  style={{
                    "font-size": "30px",
                    color: "darkorange",
                    /* float: right; */
                    padding: "12px",
                  }}
                ></i>
              ) : (
                <i
                  className="fa fa-trash icon-trash-pos"
                  onClick={() =>
                    this.handleDelete(
                      item.list_cart_id,
                      item.product.id,
                      item.id,
                      item.distributes_selected
                    )
                  }
                  style={{
                    fontSize: "18px",
                  }}
                ></i>
              )}
            </div>
          </div>
        </div>
      </ItemInCartStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    updatedPrice: state.posReducers.pos_reducer.updatedPrice,
    updatedNote: state.posReducers.pos_reducer.updatedNote,
    permission: state.authReducers.permission.data,
    generalSetting: state.notificationReducers.generalSetting,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showAlertMaxQuantity: () => {
      dispatch(OrderAction.showAlertMaxQuantity());
    },
    updateQuantityLineItem: (store_code, branch_id, idCart, data) => {
      dispatch(
        posAction.updateQuantityLineItem(store_code, branch_id, idCart, data)
      );
    },
    updatePriceItem: (store_code, branch_id, cart_id, idItem, data) => {
      dispatch(
        posAction.updatePriceItem(store_code, branch_id, cart_id, idItem, data)
      );
    },
    updateNoteItem: (store_code, branch_id, cart_id, idItem, data) => {
      dispatch(
        posAction.updateNoteItem(store_code, branch_id, cart_id, idItem, data)
      );
    },
    getProductRetailSteps: (store_code, branch_id, idProduct) => {
      dispatch(
        productAction.getProductRetailSteps(store_code, branch_id, idProduct)
      );
    },
    fetchAllGeneralSetting: (store_code) => {
      dispatch(SettingAction.fetchAllGeneralSetting(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemInCart);
