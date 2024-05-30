import React, { Component } from "react";
import { format } from "../../ultis/helpers";
import * as Env from "../../ultis/default";
import { shallowEqual } from "../../ultis/shallowEqual";
import {
  findImportPrice,
  findImportPriceSub,
  findPrice,
  findTotalStock,
  stockOfProduct,
} from "../../ultis/productUltis";
import themeData from "../../ultis/theme_data";

class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idElement: "",
      distributeName: "",
      distributeValue: "",
      element_distributes: "",
      distributeSelected: -1,
      subElementDistributeSelected: -1,
      elementNameSelected: "",
      subElementNameDistributeSelected: "",
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
    };
  }
  componentDidMount() {}

  handleNewPriceOrStock = (elementDistributeName, subElementDistribute) => {
    var product = this.props.modal.product;
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

    // var { sub_element_distributes } = this.state.elementObject
    // var sub_element_distribute = this.state.elementDistributeOj.sub_element_distributes
    // var subImport = findImportPriceSub(sub_element_distribute, nameElement)
    // console.log("subImport", subImport)
    // if (this.props.modal.discountProduct) {
    //     var { value } = this.props.modal.discountProduct
    //     this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
    //     var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
    //     var sub_element = sub_element_distributes[indexDistribute]
    //     this.setState({
    //         afterChoosePrice: sub_element.price - (sub_element.price * value / 100),
    //         priceBeforeDiscount: sub_element.price,
    //         quantityInStock: sub_element.stock, messageErr: "",
    //         idElement: id,
    //     })
    // } else {
    //     if (sub_element_distributes) {
    //         this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
    //         var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
    //         var sub_elements = sub_element_distributes[indexDistributes]
    //         this.setState({
    //             afterChoosePrice: subImport?.price ?? 0,
    //             priceBeforeDiscount: sub_elements.price,
    //             quantityInStock: sub_elements.stock,
    //             idElement: id,
    //             messageErr: ""
    //         })
    //     } else {
    //         this.setState({ afterChoosePrice: subImport.price, subElementDistributeSelected: index, idElement: id, element_distributes: nameElement })
    //     }

    // }
  };
  handleClose = () => {
    this.setState({
      afterChoosePrice: "",
      distributeSelected: -1,
      subElementDistributeSelected: -1,
      messageErr: "",
      quantityInStock: 0,
    });
  };
  handleCallback = () => {
    var info = this.props.modal;
    const {
      distributeName,
      distributeValue,
      element_distributes,
      subElementNameDistributeSelected,
      elementNameSelected,
      quantityInStock,
      idElement,
      afterChoosePrice,
      afterPrice,
    } = this.state;

    console.log( distributeName,
        distributeValue,
        element_distributes,
        subElementNameDistributeSelected,
        elementNameSelected,
        quantityInStock,
        idElement,
        afterChoosePrice,
        afterPrice)
        return;
    if (info.distributeProduct.length === 0) {
      window.$(".modal").modal("hide");

      this.props.handleCallbackPushProduct({
        nameProduct: this.props.modal.nameProduct,
        element_id: this.props.modal.idProduct,
        product_id: this.props.modal.idProduct,
        reality_exist: 0,
        nameDistribute: elementNameSelected,
        nameElement: elementNameSelected,
        nameSubDistribute: subElementNameDistributeSelected,
        priceProduct: afterPrice,
        stock: this.props.modal.inventoryProduct.main_stock,
      });
      return;
    }

    if (this.state.distributeSelected === -1) {
      this.setState({
        messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].name}`,
      });
      return;
    }
    if (
      info.distributeProduct[0].element_distributes[0].sub_element_distributes
        .length === 0
    ) {
      window.$(".modal").modal("hide");
      this.props.handleCallbackPushProduct({
        nameProduct: this.props.modal.nameProduct,
        product_id: this.props.modal.idProduct,
        element_id: idElement,
        reality_exist: 0,
        nameDistribute: distributeName,
        nameElement: elementNameSelected,
        nameSubDistribute: subElementNameDistributeSelected,
        priceProduct: afterChoosePrice,
        stock: quantityInStock,
      });
      this.setState({
        distributeSelected: -1,
        messageErr: "",
        afterChoosePrice: "",
        element_distributes: "",
        distributeValue: "",
      });
      return;
    }
    if (this.state.subElementDistributeSelected === -1) {
      this.setState({
        messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}`,
      });
      return;
    }

    window.$(".modal").modal("hide");

    this.props.handleCallbackPushProduct({
      nameProduct: this.props.modal.nameProduct,
      product_id: this.props.modal.idProduct,
      element_id: idElement,
      reality_exist: 0,
      nameDistribute: distributeName,
      nameElement: elementNameSelected,
      nameSubDistribute: subElementNameDistributeSelected,
      priceProduct: afterChoosePrice,
      stock: quantityInStock,
    });
    this.setState({
      distributeSelected: -1,
      subElementDistributeSelected: -1,
      messageErr: "",
      afterChoosePrice: "",
      element_distributes: "",
      distributeValue: "",
    });
  };
  componentWillReceiveProps(nextProps, nextState) {
    var { inventoryProduct } = nextProps.modal;
    const totalStock = findTotalStock(inventoryProduct);

    this.setState({ quantityInStock: totalStock });
    if (
      !shallowEqual(
        nextProps.modal.inventoryProduct,
        this.props.modal.inventoryProduct
      )
    ) {
      // this.setState({ quantityInStock: nextProps.modal.inventoryProduct.main_stock })
    }

    if (nextProps.modal.minPriceProduct !== this.state.minPriceProduct) {
      this.setState({ afterPrice: nextProps.modal.minPriceProduct });
    }
    var { minPriceProduct, maxPriceProduct, discountProduct } = nextProps.modal;
    if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
      if (discountProduct !== null) {
        var minPrice =
          minPriceProduct - (minPriceProduct * discountProduct.value) / 100;
        var maxPrice =
          maxPriceProduct - (maxPriceProduct * discountProduct.value) / 100;
        this.setState({
          minPriceAfterDiscount: minPrice,
          maxPriceAfterDiscount: maxPrice,
        });
      }
    }
    if(!shallowEqual(
        nextProps.modal?.productWithCart,
        this.props.modal?.productWithCart) || (nextProps.modal.product?.id != this.props.modal.product?.id) )
        {
            console.log(nextProps.modal.productWithCart)
            var productWithCart =nextProps.modal.productWithCart
            // this.setState({
            //     line_item_id: productWithCart.id,
            //     product_id: 26864,
            //     "quantity": 0,
            //     "distribute_name": "lao",
            //     "element_distribute_name": "dsss",
            //     "sub_element_distribute_name": "đo111"



            //     product_id: this.props.modal.idProduct,
            //     element_id: idElement,
            //     reality_exist: 0,
            //     nameDistribute: distributeName,
            //     nameElement: elementNameSelected,
            //     nameSubDistribute: subElementNameDistributeSelected,
            //     priceProduct: afterChoosePrice,
            //     stock: quantityInStock,
            // })
            // this.setState({})
        }
  }

  render() {
    var { allow_semi_negative } = this.props;

    var product = this.props.modal.product;
    var allowBuy =
      product?.check_inventory == false ||
      allow_semi_negative == true ||
      this.state.quantityInStock > 0;

    var inforProduct = this.props.modal;

    var itemParent =
      inforProduct &&
      inforProduct.inventoryProduct &&
      inforProduct.inventoryProduct.distributes !== null &&
      inforProduct.inventoryProduct.distributes.length > 0
        ? inforProduct.inventoryProduct.distributes[0]
        : [];
    console.log( this.props.modal);
    return (
      <div class="modal" id="modalDetailUpdate">
        {/* {item.id !== this.state.chooseId && */}
        <div className="detail">
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
                    <div class="_3gvvQI">
                      <div class="_3_Bulc">{itemParent.name}</div>
                      {itemParent.element_distributes &&
                        itemParent.element_distributes.map(
                          (itemChild, index) => {
                            var elemet =
                              index === this.state.distributeSelected ? (
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
                        {itemParent.sub_element_distribute_name}
                      </div>
                      {itemParent.element_distributes &&
                        itemParent.element_distributes[0].sub_element_distributes.map(
                          (itemChild, index) => {
                            var elemet =
                              index ===
                              this.state.subElementDistributeSelected ? (
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
                      <button class="cancel-btn" data-dismiss="modal">
                        Trở Lại
                      </button>
                      <button  onClick={allowBuy ? this.handleCallback : null} class="shopee-button-solid shopee-button-solid--primary">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* } */}
      </div>
    );
  }
}
export default ModalDetail;
