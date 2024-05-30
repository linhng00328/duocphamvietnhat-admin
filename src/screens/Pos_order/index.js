import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  format,
  formatNoD,
  formatNumber,
  removeSignNumber,
  stringToInit,
  randomString,
  getQueryParams,
} from "../../ultis/helpers";
import * as productAction from "../../actions/product";
import { connect } from "react-redux";
import CardProduct from "../../components/Pos_Order/CardProduct";
import * as posAction from "../../actions/post_order";
import * as billAction from "../../actions/bill";
import ModalDetail from "../../components/Pos_Order/ModalDetail";
import ModalUpdateDetail from "../../components/Pos_Order/UpdateModal";

import { shallowEqual } from "../../ultis/shallowEqual";
import Topbar from "../../components/Pos_Order/Topbar";
import ListItemInCart from "../../components/Pos_Order/ListItemInCart";
import PertionInfo from "../../components/Pos_Order/PertionInfo";
import * as OrderAction from "../../actions/add_order";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import Alert from "./Alert";
import * as Types from "../../constants/ActionType";
import Pagination from "../../components/Pos_Order/Pagination";
import ModalUser from "../../components/Pos_Order/ModalUser";
import KeyboardEventHandler from "react-keyboard-event-handler";
import ModalVoucher from "../../components/Pos_Order/ModalVoucher";
import { debounce } from "lodash";
import { Popover } from "react-tiny-popover";
import { getBranchId } from "../../ultis/branchUtils";
import * as notificationAction from "../../actions/notification";
import * as CategoryPAction from "../../actions/category_product";

import { AsyncPaginate } from "react-select-async-paginate";
import * as customerApi from "../../data/remote/customer";
import PanelBottom from "./PanelBottom";
import Shipper from "./Shipper";

import history from "../../history";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";

import NotAccess from "../../components/Partials/NotAccess";
import Loading from "../../components/Partials/Loading";

import * as OrderFrom from "../../ultis/order_from";
import styled from "styled-components";
import ModalRetailSteps from "../../components/Pos_Order/ModalRetailSteps";

const PosModalStyles = styled.div`
  .loading-spin {
    width: 40px;
    height: 40px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 100rem;
    animation: spin 1.3s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    0% {
      transform: rotate(360deg);
    }
  }
`;

class PostOrder extends Component {
  constructor(props) {
    super(props);

    this.hasFocus = false;
    this.state = {
      chooseTab: 2,
      isPopoverOpen: false,
      onSave: false,
      isShowPanelBottom: true,

      oneCart: {},
      modalUpdateCart: {
        name: "",
        phone_number: "",
        debt: 0,
        is_use_points: 0,
      },
      modalCreateUser: "",
      listSuggestion: [],
      txtDiscount: 0,
      code_voucher: "",
      note: "",
      page: 1,
      numPage: 6,
      namePos: "",
      listPosItem: [],
      idCart: "",
      checked: false,
      is_use_points: false,
      selectPrice: -1,
      exchange: 0,
      payment_method_id: 0,
      priceCustomer: 0,
      customerNote: "",
      totalAfterDiscount: 0,
      totalFinal: 0,
      typeDiscount: 0,
      beforeDiscount: 0,
      haveCheck: false,
      percentDiscount: 0,
      randomFocus: null,
      infoProduct: {
        inventoryProduct: "",
        idProduct: "",
        nameProduct: "",
        imageProduct: "",
        priceProduct: "",
        distributeProduct: "",
        minPriceProduct: "",
        maxPriceProduct: "",
        discountProduct: "",
        quantityProduct: "",
        quantityProductWithDistribute: "",
      },
      openShipment: false,
      updateInfoProduct: {
        inventoryProduct: "",
        idProduct: "",
        nameProduct: "",
        imageProduct: "",
        priceProduct: "",
        distributeProduct: "",
        minPriceProduct: "",
        maxPriceProduct: "",
        discountProduct: "",
        quantityProduct: "",
        quantityProductWithDistribute: "",
      },
      weight: "",
      length: "",
      width: "",
      height: "",
    };
    this.onSave = false;
    this.changeSearch = debounce(this.handleSearch, 1000);
    this.changeDiscount = debounce(this.handleDiscount, 1000);
    this.changePaymentMethod = debounce(this.handlePaymentMethod, 0);
    this.changeNewState = debounce(this.handleNewState, 300);
    this.loadFirst = true;
    this.loadFirstNote = true;
  }

  handleNewState = (newState) => {
    console.log(newState);
    var customer = {};
    var customer_name = {};
    var customer_phone = {};
    var province = {};
    var district = {};
    var address_detail = {};
    var wards = {};
    var total_shipping_fee = {};
    var customer_note = {};

    if (
      this.props.oneCart?.id == newState.cartId ||
      this.props.oneCart?.id == newState.idCart
    ) {
      if (typeof newState.select_customer != "undefined") {
        customer = { customer_id: newState?.select_customer?.value ?? null };
      } else {
        customer = {};
      }

      if (typeof newState.txtName != "undefined") {
        customer_name = { customer_name: newState?.txtName ?? null };
      } else {
        customer_name = {};
      }
      if (typeof newState.txtPhoneNumber != "undefined") {
        customer_phone = { customer_phone: newState?.txtPhoneNumber ?? null };
      } else {
        customer_phone = {};
      }
      if (typeof newState.txtProvince != "undefined") {
        province = { province: newState?.txtProvince ?? null };
      } else {
        province = {};
      }
      if (typeof newState.txtDistrict != "undefined") {
        district = { district: newState?.txtDistrict ?? null };
      } else {
        district = {};
      }
      if (typeof newState.txtWards != "undefined") {
        wards = { wards: newState?.txtWards ?? null };
      } else {
        wards = {};
      }
      if (typeof newState.txtAddressDetail != "undefined") {
        address_detail = { address_detail: newState?.txtAddressDetail ?? null };
      } else {
        address_detail = {};
      }
      if (typeof newState.fee != "undefined") {
        total_shipping_fee = {
          total_shipping_fee:
            newState.fee === 0 ? 0 : newState.fee > 0 ? newState.fee : null,
        };
      } else {
        total_shipping_fee = {};
      }

      if (typeof newState.customerNote != "undefined") {
        customer_note = {
          customer_note: newState.customerNote,
        };
      } else {
        customer_note = {};
      }
      console.log(newState.customerNote, customer_name);

      this.setState({
        modalUpdateCart: {
          cartId: newState.cartId ?? newState.idCart,
          ...customer_name,
          ...customer_phone,
          customer_email: newState.txtEmail,
          customer_sex: newState.txtSex,
          customer_date_of_birth: newState.selectedDate,
          ...address_detail,
          ...province,
          ...district,
          ...wards,
          shipper_type: newState.ship_type,
          ...total_shipping_fee,
          partner_shipper_id: newState.partner_id,
          ...customer,
          discount: newState.discount,
          ...customer_note,
        },
        weight: newState.weight,
        length: newState.length,
        width: newState.width,
        height: newState.height,
      });
    }
  };

  // handleChangeCustomer = (newState) =>{
  //     this.setState({
  //         customer_id : newState?.select_customer?.value ?? null,
  //     })
  // }

  handleChange = (e) => {
    const val = e.target.value;

    this.setState({
      customerNote: val,
    });
    this.changeNewState({
      ...this.state,
      customerNote: val,
    });
    // this.setState({ value: val }, () => {
    //   // this.changeSearch(val);
    //   this.changeNewState({
    //     ...this.state,
    //     customerNote: val,
    //   });
    // });
  };

  handleSearch = (e) => {
    this.setState({
      note: this.state.customerNote,
    });
  };
  handleDiscount = (e) => {
    this.setState({
      ...this.state,
      txtDiscount: formatNumber(this.state.discount),
      modalUpdateCart: {
        ...this.state.modalUpdateCart,
        discount: formatNumber(this.state.discount),
      },
    });
  };
  handlePaymentMethod = (e) => {
    console.log({
      ...this.state,
      payment_method_id: e,
      modalUpdateCart: {
        ...this.state.modalUpdateCart,
        payment_method_id: e,
      },
    });
    this.setState({
      ...this.state,
      payment_method_id: e,
      modalUpdateCart: {
        ...this.state.modalUpdateCart,
        payment_method_id: e,
      },
    });
  };

  onGetSuggestion = (totalFinal) => {
    var list = [];

    var totalFinal = totalFinal.toString().replace(/\./g, ",");

    if (totalFinal != null && totalFinal != "" && totalFinal.length > 0) {
      const lengthNum = totalFinal.length;
      const firstNum = parseInt(totalFinal[0]);

      //num0
      list.push(totalFinal);

      //num1
      if (firstNum > 5 && lengthNum > 1) {
        list.push(Math.pow(10, lengthNum));
      }

      //num2
      if (firstNum < 9 && lengthNum > 1) {
        var firstNewNum = firstNum + 1;
        list.push(firstNewNum * Math.pow(10, lengthNum - 1));
      }
      // //num3
      // if (firstNum < 5 && lengthNum > 1) {
      //     var firstNewNum = firstNum + 1;
      //     var su = 5 * Math.pow(10, lengthNum - 1);
      //     if (!list.includes(su)) {
      //         list.push(5 * Math.pow(10, lengthNum - 1))
      //     }

      // }
      //num4
      // if (lengthNum > 2) {
      //     const secondNum = parseInt(totalFinal[1]);
      //     if (secondNum < 5) {
      //         list.push((firstNum * 10 + 5) * Math.pow(10, lengthNum - 2))
      //     }
      // }

      //num5
      if (lengthNum > 1) {
        const secondNum = parseInt(totalFinal[1]);
        if (secondNum < 9) {
          list.push(
            (firstNum * 10 + (secondNum + 1)) * Math.pow(10, lengthNum - 2)
          );
        }
      }

      // //num6
      // if (lengthNum > 3) {
      //     const secondNum = parseInt(totalFinal[1]);
      //     const thirtNum = parseInt(totalFinal[2]);
      //     if (thirtNum < 9) {
      //         list.push(((firstNum * 100) + (secondNum * 10) + (thirtNum + 1)) * Math.pow(10, lengthNum - 3))
      //     }
      // }
    }

    var list = list.filter(this.onlyUnique);

    this.setState({
      listSuggestion: list,
    });
  };

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  componentDidUpdate() {
    if (this.state.isPopoverOpen == true && this.hasFocus == false) {
      var refDiscountInput = ReactDOM.findDOMNode(this.refs.refDiscountInput);
      if (refDiscountInput != null) {
        refDiscountInput.select();
        refDiscountInput.focus();
        this.hasFocus = true;
      }
    }
  }

  componentDidMount() {
    const branch_id = getBranchId();
    const { order_code, store_code } = this.props.match.params;
    const paidOrder = getQueryParams("paid");
    const orderFrom = getQueryParams("from");

    const isCheckedOrder =
      orderFrom == OrderFrom.ORDER_FROM_APP ||
      orderFrom == OrderFrom.ORDER_FROM_POS_DELIVERY ||
      orderFrom == OrderFrom.ORDER_FROM_POS_SHIPPER ||
      orderFrom == OrderFrom.ORDER_FROM_WEB;

    this.props.fetchAllPertion(this.props.match.params.store_code);
    // this.props.fetchAllVoucher(this.props.match.params.store_code);
    this.props.fetchAllBadge(this.props.match.params.store_code, branch_id);
    this.props.fetchAllCategoryP(this.props.match.params.store_code);

    if (order_code != null && order_code != "") {
      this.props.createCartEditOrder(store_code, order_code);
    }
    if (isCheckedOrder) {
      this.handleOpenShipment();
    }

    if (order_code && paidOrder) {
      this.setState({
        priceCustomer: formatNoD(paidOrder),
      });
    }
    // if (order_code && isCheckedOrder) {
    //   this.setState({
    //     priceCustomer: formatNoD(paidOrder),
    //   });
    // }
  }

  refreshProductList = () => {
    const branch_id = getBranchId();
    const limit = this.state.numPage;
    const params = `&limit=${limit}`;
    this.props.fetchAllProductV2(
      this.props.match.params.store_code,
      branch_id,
      params
    );
  };

  handleCallbackProduct = (modal) => {
    console.log("hehe", modal);
    this.setState({
      infoProduct: modal,
      isScan: randomString(10),
    });
  };

  handleUpdateCallbackProduct = (modal) => {
    this.setState({
      updateInfoProduct: modal,
    });
  };

  setIsPopoverOpen = () => {
    const nextIsPopoverOpen = !this.state.isPopoverOpen;

    if (nextIsPopoverOpen == true) {
      this.hasFocus = false;
    } else {
      this.hasFocus = true;
    }
    this.setState({
      isPopoverOpen: nextIsPopoverOpen,
    });
  };

  onChanges = (e) => {
    this.setState({ note: e.target.value });
  };

  handleCallbackPushProduct = (modal) => {
    console.log("haha", modal);
    this.setState({ listPosItem: modal, isScan: randomString(10) });
  };

  handleCallbackTab = (modal) => {
    this.setState({
      idCart: modal,
    });
  };

  handleCallbackUser = (modal) => {
    this.setState({ modalCreateUser: modal });
  };

  handleClearVoucher = () => {
    const branch_id = getBranchId();
    const id = this.state.idCart;
    const data = {
      code_voucher: "",
    };
    this.props.fetchVoucher(
      this.props.match.params.store_code,
      branch_id,
      id,
      data
    );
    this.setState({
      code_voucher: "",
    });
  };

  handleCallbackVoucherInput = (code_voucher) => {
    const branch_id = getBranchId();
    const id = this.state.idCart;
    const data = {
      code_voucher: code_voucher,
    };
    this.props.fetchVoucher(
      this.props.match.params.store_code,
      branch_id,
      id,
      data
    );
    this.setState({
      code_voucher: code_voucher,
    });
  };

  handChange = (e) => {
    var name = e.target.name;
    var value_text = e.target.value;
    var value = value_text;

    if (value && value?.length > 15) return;
    const _value = formatNumber(value);
    var totalPrice = this.props.oneCart.info_cart?.total_before_discount;
    var num1 = (totalPrice * value) / 100;
    if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      value = value.toString().replace(/\./g, ",");

      var num = 0;
      if (value_text == "") {
        num = 0;
      } else {
        num = value;
      }

      if (name == "discount") {
        if (this.state.typeDiscount == 1) {
          if (value.length < 3 || value == 100) {
            var discount = stringToInit(
              this.state.totalAfterDiscount * (stringToInit(value) / 100)
            ).toFixed(0);

            this.setState(
              {
                percentDiscount: value,
                discount: discount,
                totalFinal:
                  this.state.totalAfterDiscount - stringToInit(discount),
                // priceCustomer:
                //   this.state.totalAfterDiscount - stringToInit(discount),
              },
              () => {
                this.changeDiscount(discount);
              }
            );
          }
        } else {
          var num = removeSignNumber(num);
          this.setState(
            {
              discount: num,
              totalFinal: this.state.totalAfterDiscount - stringToInit(num),
              // priceCustomer: this.state.totalAfterDiscount - stringToInit(num),
            },
            () => {
              this.changeDiscount(num);
            }
          );
        }
      } else {
        this.setState({ priceCustomer: num });
      }
    }
  };

  handlePayment = () => {
    const branch_id = getBranchId();
    const { store_code } = this.props.match.params;
    var data = null;
    var { oneCart } = this.props;
    var { allowAutoPrint } = this.props;
    const { weight, length, width, height } = this.state;
    if (getChannel() == IKITECH) {
      if (
        this.state.oneCart?.total_shipping_fee > 0 ||
        this.state.openShipment == true
      ) {
        if (
          (oneCart.payment_method_id == null ||
            oneCart.payment_method_id == "") &&
          (this.state.payment_method_id == "" ||
            this.state.payment_method_id == null)
        ) {
          this.props.showError({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: "Vui lòng chọn phương thức thanh toán",
            },
          });
          return;
        }

        data = {
          payment_method_id: this.state.payment_method_id,
          amount_money: formatNumber(this.state.priceCustomer),
          allowAutoPrint: allowAutoPrint,
          order_from:
            (oneCart?.total_shipping_fee > 0 ||
              this.state.openShipment == true) &&
            getChannel() == IKITECH
              ? OrderFrom.ORDER_FROM_POS_DELIVERY
              : OrderFrom.ORDER_FROM_POS_IN_STORE,
        };
      } else {
        data = {
          payment_method_id: this.state.payment_method_id,
          amount_money: formatNumber(this.state.priceCustomer),
          allowAutoPrint: allowAutoPrint,
          order_from:
            (oneCart?.total_shipping_fee > 0 ||
              this.state.openShipment == true) &&
            getChannel() == IKITECH
              ? OrderFrom.ORDER_FROM_POS_DELIVERY
              : OrderFrom.ORDER_FROM_POS_IN_STORE,
        };
      }
    } else {
      data = {
        payment_method_id: this.state.payment_method_id,
        amount_money: formatNumber(this.state.priceCustomer),
        allowAutoPrint: allowAutoPrint,
        order_from:
          (oneCart?.total_shipping_fee > 0 ||
            this.state.openShipment == true) &&
          getChannel() == IKITECH
            ? OrderFrom.ORDER_FROM_POS_DELIVERY
            : OrderFrom.ORDER_FROM_POS_IN_STORE,
      };
    }

    this.props.paymentOrderPos(
      store_code,
      branch_id,
      this.state.idCart,
      data,
      this,
      (order_code) => {
        this.setState({ customerNote: "" });
        if (weight !== "" || length !== "" || width !== "" || height !== "") {
          this.props.updateShippingPackage(store_code, order_code, {
            package_weight: Number(weight),
            package_length: Number(length),
            package_width: Number(width),
            package_height: Number(height),
          });
        }
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    const { order_code } = this.props.match.params;
    if (
      !shallowEqual(nextProps.oneCart, this.props.oneCart) &&
      nextProps.oneCart !== undefined
    ) {
      this.setState({
        oneCart: nextProps.oneCart,
        // idCart: nextProps.oneCart.id,
      });
    }

    if (
      typeof nextProps.oneCart != "undefined" &&
      typeof nextProps.oneCart.info_cart != "undefined" &&
      (!shallowEqual(nextProps.oneCart, this.props.oneCart) ||
        // && this.props.loadingHandleChangeQuantity == false
        !shallowEqual(
          this.props.loadingHandleChangePriceItem,
          nextProps.loadingHandleChangePriceItem
        ) ||
        (!shallowEqual(
          this.props.loadingHandleUseVoucher,
          nextProps.loadingHandleUseVoucher
        ) &&
          nextProps.loadingHandleUseVoucher != null))
    ) {
      var discount = {};
      if (nextProps.oneCart?.id != this.props.oneCart?.id && !order_code) {
        discount = { discount: nextProps.oneCart.discount };
        // this.setState({
        //   priceCustomer: nextProps.oneCart.info_cart.total_final,
        // });
      }
      var customerNote = {};
      if (this.loadFirstNote == true) {
        customerNote = {
          customerNote: nextProps.oneCart.customer_note ?? "",
        };
        this.loadFirstNote = false;
      }

      this.setState({
        code_voucher: nextProps.oneCart.code_voucher,
        oneCart: nextProps.oneCart,
        totalFinal: nextProps.oneCart?.info_cart?.total_final ?? 0,
        totalAfterDiscount: nextProps.oneCart.info_cart.total_after_discount,
        selectPrice: -1,

        namePos: nextProps.oneCart.name,
        fee: nextProps.oneCart.total_shipping_fee,
        // customerNote: nextProps.oneCart.customer_note ?? "",
        ...customerNote,
        payment_method_id:
          nextProps.oneCart.payment_method_id ??
          (nextProps.total_shipping_fee > 0 || this.state.openShipment == true
            ? 2
            : 0),
        ...discount,
        // discount: nextProps.oneCart.discount,
        is_use_points:
          nextProps.oneCart.info_cart.is_use_points !== null
            ? nextProps.oneCart.info_cart.is_use_points
            : false,
      });
    }
    if (!shallowEqual(nextProps.inforCustomer, this.props.inforCustomer)) {
      this.setState({
        modalUpdateCart: {
          name: nextProps.inforCustomer.name,
          phone_number: nextProps.inforCustomer.phone_number,
          debt: nextProps.inforCustomer.debt,
          id: nextProps.inforCustomer.id,
        },
      });
    }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.branch_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.create_order_pos;
      var isChangeDiscountPos = permissions.change_discount_pos;
      this.setState({ isLoading: true, isShow, isChangeDiscountPos });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    window.$("link[rel=stylesheet]").prop("disabled", false);
    if (this.state.isPopoverOpen == true) {
      console.log(document.getElementById("input-discount-pos"));
      if (document.getElementById("input-discount-pos")) {
        document.getElementById("input-discount-pos").focus();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    window.$("link[rel=stylesheet]").prop("disabled", false);
    const { order_code } = this.props.match.params;
    if (
      !shallowEqual(nextProps.fromEditOrder, this.props.fromEditOrder) &&
      order_code &&
      Object.entries(nextProps.orderAfterPayment).length > 0
    ) {
      const link = `/order/detail/${this.props.match.params.store_code}/${nextProps.orderAfterPayment.order_code}`;
      if (nextProps.fromEditOrder) {
        history.push(link);
      }
    }
    if (
      nextProps.oneCart &&
      !shallowEqual(nextProps.oneCart, this.props.oneCart) &&
      order_code
    ) {
      this.setState({ idCart: nextProps.oneCart.id });
    }
    if (
      (!shallowEqual(nextState.listPosItem, this.state.listPosItem) &&
        nextState.listPosItem.product_id != null) ||
      (nextState.listPosItem.product_id != null &&
        this.state.isScan != nextState.isScan)
    ) {
      const formData = {
        product_id: nextState.listPosItem.product_id,
        quantity: nextState.listPosItem.stock ?? 1,
        distribute_name: nextState.listPosItem.nameDistribute,
        element_distribute_name: nextState.listPosItem.nameElement,
        sub_element_distribute_name: nextState.listPosItem.nameSubDistribute,
      };
      var { store_code } = this.props.match.params;
      const branch_id = getBranchId();
      const id = nextState.idCart;
      this.props.addProductInCart(store_code, branch_id, id, formData);
    }
    if (!shallowEqual(nextState.priceCustomer, this.state.priceCustomer)) {
      this.setState({
        exchange:
          removeSignNumber(nextState.priceCustomer) -
          removeSignNumber(nextState.totalFinal),
      });
    }

    if (this.props.loadingOrder == false && nextProps.loadingOrder == false) {
      if (
        nextProps.allowAutoPrint == true &&
        this.printed != true &&
        this.onSave == true
      ) {
        this.props.disablePrint();
        var { store_code } = this.props.match.params;
        history.replace(
          "/order/print/" +
            store_code +
            "/" +
            this.props.orderAfterPayment.order_code +
            "?defaultHrefBack=" +
            btoa(window.location.pathname)
        );
        this.onSave = false;
      }
    }

    if (!shallowEqual(nextState.idCart, this.state.idCart)) {
      const branch_id = getBranchId();
      const id = nextState.idCart;
      this.props.fetchInfoOneCart(
        this.props.match.params.store_code,
        branch_id,
        id
      );
      this.setState({
        // priceCustomer: 0,
        exchange: 0,
        totalFinal: 0,
      });
      this.refreshProductList();
    }

    if (
      !shallowEqual(nextState.totalFinal, this.state.totalFinal) &&
      !order_code
    ) {
      this.onGetSuggestion(nextState.totalFinal);
      // this.setState({ priceCustomer: nextState.totalFinal });
    }

    if (
      !shallowEqual(nextState.modalUpdateCart, this.state.modalUpdateCart) &&
      nextState.modalUpdateCart?.cartId == this.state.modalUpdateCart.cartId &&
      nextState.modalUpdateCart?.cartId == nextProps.oneCart?.id
    ) {
      const branch_id = getBranchId();
      const { store_code } = this.props.match.params;
      const formData = {
        ...this.state.modalUpdateCart,
        ...nextState.modalUpdateCart,
        noUpdateUI: true,
      };

      this.props.updateInfoCarts(
        store_code,
        branch_id,
        nextState.idCart,
        formData
      );
    }

    return true;
  }

  handleOptionChange = (changeEvent) => {
    var payment_method_id = parseInt(changeEvent.target.value);
    this.changePaymentMethod(payment_method_id);
  };

  handleKeyboard = (key, event) => {
    console.log(key, event);
    switch (key) {
      case "f3":
      case "F3":
        event.preventDefault();

        this.setState({ randomFocus: randomString(10) });
        break;

      case "f9":
      case "F9":
        event.preventDefault();
        this.handlePayment();
        break;
      case "f4":
      case "F4":
        event.preventDefault();

        if (document.getElementById("phone_number_customer") != null) {
          document.getElementById("phone_number_customer").select();
          document.getElementById("phone_number_customer").focus();
        }
        break;
      case "f8":
      case "F8":
        event.preventDefault();

        if (document.getElementById("phone_number_customer")) {
          document.getElementById("import_prices").select();
          document.getElementById("import_prices").focus();
        }

        break;
      case "f6":
      case "F6":
        if (this.state.isPopoverOpen == false) {
          this.setIsPopoverOpen(!this.state.isPopoverOpen);
        }

        break;
      default:
        return;
    }
  };
  roundPrice = (rnum, rlength) => {
    var newnumber =
      Math.ceil(rnum * Math.pow(10, rlength - 1)) / Math.pow(10, rlength - 1);
    var toTenths = newnumber.toFixed(rlength);
    return toTenths;
  };

  handleActive = (price) => {
    this.setState({ priceCustomer: price });
  };

  handChangeCheckbox = (e) => {
    this.setState({
      ...this.state,
      is_use_points: !this.state.is_use_points,
      modalUpdateCart: {
        ...this.state.modalUpdateCart,
        is_use_points: !this.state.is_use_points,
      },
    });
  };
  handleOpenShipment = () => {
    var chooseTab = this.state.openShipment == false ? 1 : 2;
    this.setState({
      openShipment: !this.state.openShipment,
      chooseTab,
      fee: chooseTab == 2 ? 0 : null,
      payment_method_id: this.state.openShipment ? 0 : 2,
    });
    console.log("vao ne");
    var total_shipping_fee = {};
    if (this.state.openShipment === true) {
      total_shipping_fee = { total_shipping_fee: 0 };
    }
    this.onNewChange({ fee: chooseTab == 2 ? 0 : null });
  };

  ChangeTypeDiscount = (type) => {
    if (type != this.state.typeDiscount) {
      this.hasFocus = false;
    }

    this.setState({ typeDiscount: type, discount: "" });
  };

  handleDelete = () => {
    this.setState({
      listPosItem: [],
    });
  };

  onChangeIsShowPanelBottom = () => {
    this.setState({
      isShowPanelBottom: !this.state.isShowPanelBottom,
    });
  };

  loadCustomers = async (search, loadedOptions, { page }) => {
    var { store_code } = this.props.match.params;
    const params = `&search=${search}`;
    const res = await customerApi.fetchAllCustomer(store_code, page, params);

    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    return {
      options: res.data.data.data.map((i) => {
        return {
          value: i.id,
          label: `${i.name}  (${i.phone_number})`,
          customer: i,
        };
      }),

      hasMore: res.data.data.data.length == 20,
      additional: {
        page: page + 1,
      },
    };
  };

  onNewChange = (state) => {
    this.changeNewState({
      ...this.state,
      ...state,
    });
  };

  addComboInCart = (data) => {
    var { store_code } = this.props.match.params;
    var { idCart } = this.state;
    if (data)
      this.props.addComboInCart(store_code, getBranchId(), idCart, data);
  };

  _recordInput = (name, event) => {
    this.handleKeyboard(event.key, event);
  };

  render() {
    var { store_code, order_code } = this.props.match.params;
    var { listPertion, products, listVoucher, badges } = this.props;
    var { allow_semi_negative } = badges;
    var {
      numPage,
      exchange,
      priceCustomer,
      oneCart,
      totalFinal,
      listSuggestion,
      totalAfterDiscount,
      select_customer_id,
      isShow,
      idCart,
      isChangeDiscountPos,
    } = this.state;

    const length = oneCart.info_cart?.line_items.length || 0;
    const ship_discount_amount = oneCart.info_cart?.ship_discount_amount;
    var handleKeyPress = {
      onKeyUp: (event) => {
        // event.preventDefault()

        this._recordInput("onKeyUp", event);
      },
      onKeyDown: (event) => {
        // event.preventDefault()

        this._recordInput("onKeyUp", event);
      },
    };
    var colListPos =
      this.state.openShipment == true && getChannel() == IKITECH
        ? { width: "calc(100% - 732px)" }
        : null;
    var rowPayman =
      this.state.openShipment == true && getChannel() == IKITECH
        ? { display: "flex", height: "calc(100vh - 50px)" }
        : { "flex-flow": "column" };
    var wrapPrice =
      this.state.openShipment == false && getChannel() == IKITECH
        ? { height: "calc(100% - 90px)" }
        : { height: "calc(100% - 150px)" };
    var colPayman =
      this.state.openShipment == true && getChannel() == IKITECH
        ? {
            width: "55%",
            padding: "0 5px",
          }
        : null;
    var total_shipping_fee = oneCart?.total_shipping_fee;
    const moneyCustomerNeedPaid =
      removeSignNumber(priceCustomer) - removeSignNumber(totalFinal);
    return (
      <React.Fragment>
        {typeof isShow == "undefined" ? (
          <div></div>
        ) : isShow == true ? (
          <PosModalStyles className="pos-modal">
            <KeyboardEventHandler
              handleKeys={["f9", "f4", "f3", "f6", "f8"]}
              onKeyEvent={(key, e) => this.handleKeyboard(key, e)}
            />
            <Topbar
              handleOpenShipment={this.handleOpenShipment}
              openShipment={this.state.openShipment}
              randomFocus={this.state.randomFocus}
              passKeyPress={this.handleKeyboard}
              store_code={store_code}
              handleCallbackTab={this.handleCallbackTab}
              handleCallbackProduct={this.handleCallbackProduct}
              handleCallbackPushProduct={this.handleCallbackPushProduct}
              order_code={order_code}
            />
            <div className="overview-cart">
              <div className="row-post">
                <div className="col-list-pos" style={colListPos}>
                  <div className="panel-container-vertical">
                    <div
                      className="panel-top"
                      style={{
                        height: this.state.isShowPanelBottom
                          ? "calc(100% - 264px)"
                          : "calc(100% - 0px)",
                      }}
                    >
                      {oneCart?.info_cart?.line_items.length > 0 && (
                        <div className="col-list-order">
                          <div className="" style={{ padding: "8px" }}>
                            <ListItemInCart
                              handleUpdateCallbackProduct={
                                this.handleUpdateCallbackProduct
                              }
                              store_code={store_code}
                              products={products?.data || []}
                              listItemPos={oneCart}
                              idCart={this.state.idCart}
                              handleDelete={this.handleDelete}
                            />
                          </div>
                        </div>
                      )}

                      {oneCart?.info_cart?.line_items.length == 0 && (
                        <div className="col-list-order">
                          <div
                            className=""
                            style={{
                              width: "100%;",
                              height: "100%",
                              alignContent: "center",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="product-pos"
                              style={{
                                textAlign: "center",
                                color: "gray",
                                fontSize: "20px",
                                marginTop: "70px",
                              }}
                            >
                              <img
                                style={{
                                  width: "50%",
                                }}
                                src="../../images/empty_cart.png"
                                alt=""
                              ></img>
                              <div
                                className="title-list-pos "
                                style={{
                                  color: "black",
                                  marginTop: "10px",
                                  fontSize: "16px",
                                }}
                              >
                                Đơn hàng của bạn chưa có sản phẩm nào!
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="splitter-horizontal"
                      style={{
                        top: !this.state.isShowPanelBottom ? -20 : 0,
                      }}
                    >
                      <div
                        class="button-show-hide-control"
                        style={{ zIndex: "999" }}
                        onClick={this.onChangeIsShowPanelBottom}
                      >
                        <svg
                          className="button-show-hide-control-circle"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          style={{
                            transform: this.state.isShowPanelBottom
                              ? "rotate(90deg)"
                              : "rotate(269deg)",
                          }}
                        >
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                      </div>
                    </div>
                    <PanelBottom
                      chooseTab={this.state.chooseTab}
                      openShipment={this.state.openShipment}
                      addComboInCart={this.addComboInCart}
                      passKeyPress={this.handleKeyboard}
                      limit={numPage}
                      passNumPage={this.passNumPage}
                      store_code={store_code}
                      products={products}
                      handleCallbackProduct={this.handleCallbackProduct}
                      onSeletedCustomer={this.onSeletedCustomer}
                      onNewChange={this.onNewChange}
                      handleCallbackPushProduct={this.handleCallbackPushProduct}
                    />
                  </div>
                </div>

                <div
                  className="row-payman"
                  style={{
                    ...rowPayman,
                    fontSize: "13px",
                  }}
                >
                  {/* {this.state.openShipment && getChannel() == IKITECH && ( */}
                  <div
                    className={
                      this.state.openShipment && getChannel() == IKITECH
                        ? ""
                        : "hide"
                    }
                    style={{
                      "overflow-y": "scroll",
                      "overflow-x": "hidden",
                      width: "45%",
                      padding: "0 5px",
                      "border-right": "1px solid #b8b0b0",
                    }}
                  >
                    <Shipper
                      openShipment={this.state.openShipment}
                      total_shipping_fee={total_shipping_fee}
                      totalFinal={totalFinal}
                      passKeyPress={this.handleKeyboard}
                      limit={numPage}
                      passNumPage={this.passNumPage}
                      store_code={store_code}
                      products={products}
                      onNewChange={this.onNewChange}
                    />
                  </div>
                  {/* )} */}
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      ...colPayman,
                    }}
                  >
                    <div className="wrap-price" style={wrapPrice}>
                      <div className="" style={{ padding: "0" }}></div>
                      <div className="wrap-detail">
                        <div
                          className="price-info"
                          style={{
                            margin: "10px 0px",
                            fontSize: "13px",
                            marginLeft: "5px",
                          }}
                        >
                          <div className="row item-info">
                            <div className="title-price col-6">{`Tổng tiền: (${length} sản phẩm)`}</div>
                            <span
                              className="col-6"
                              style={{ textAlign: "end" }}
                            >
                              {format(
                                Number(oneCart.info_cart?.total_before_discount)
                              )}
                            </span>
                          </div>
                          <div
                            className="row"
                            style={{
                              padding: "3px 0",
                              justifyContent: "space-between",
                              marginRight: "13px",
                            }}
                          >
                            {this.props.oneCart?.customer?.name ? (
                              <>
                                <div
                                  className="title-price"
                                  style={{
                                    paddingLeft: 16,
                                  }}
                                >{`Dùng ${
                                  oneCart.info_cart?.total_points_can_use
                                } xu [${format(
                                  Number(
                                    oneCart.info_cart
                                      ?.bonus_points_amount_can_use
                                  )
                                )}]`}</div>
                                <form action="/action_page.php">
                                  <div class="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="switch1"
                                      name="example"
                                      checked={this.state.is_use_points}
                                      onChange={this.handChangeCheckbox}
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="switch1"
                                    ></label>
                                  </div>
                                </form>
                              </>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="row item-info">
                            <div className="title-price col-6">Voucher</div>
                            <div className="col-6" style={{ textAlign: "end" }}>
                              <a
                                className="modal-choose "
                                style={{ color: "rgb(232 117 26)" }}
                                data-toggle="modal"
                                data-target="#modalVoucher"
                              >
                                <span className="" style={{ fontSize: "13px" }}>
                                  {oneCart.code_voucher
                                    ? oneCart.code_voucher
                                    : "Chọn hoặc nhập mã"}
                                </span>
                              </a>
                              {oneCart.code_voucher ? (
                                <i
                                  class="fa fa-times-circle"
                                  style={{ marginLeft: "10px", color: "red" }}
                                  onClick={this.handleClearVoucher}
                                ></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          {oneCart?.info_cart?.product_discount_amount != 0 && (
                            <>
                              {oneCart?.info_cart?.product_discount_amount <
                              0 ? (
                                <div className="row item-info">
                                  <div className="item-discount-name col-6">
                                    Phụ phí
                                  </div>
                                  <span
                                    className="col-6"
                                    style={{ textAlign: "end" }}
                                  >
                                    +
                                    {formatNoD(
                                      Math.abs(
                                        oneCart?.info_cart
                                          ?.product_discount_amount
                                      )
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <div className="row item-info">
                                  <div className="item-discount-name col-6">
                                    Giảm giá sản phẩm
                                  </div>
                                  <span
                                    className="col-6"
                                    style={{ textAlign: "end" }}
                                  >
                                    -
                                    {formatNoD(
                                      oneCart?.info_cart
                                        ?.product_discount_amount
                                    )}
                                  </span>
                                </div>
                              )}
                            </>
                          )}

                          {oneCart?.info_cart?.voucher_discount_amount > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm voucher
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                -
                                {formatNoD(
                                  oneCart?.info_cart?.voucher_discount_amount
                                )}
                              </span>
                            </div>
                          )}

                          {oneCart?.info_cart?.combo_discount_amount > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm combo
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                -
                                {formatNoD(
                                  oneCart?.info_cart?.combo_discount_amount
                                )}
                              </span>
                            </div>
                          )}

                          {oneCart.info_cart?.points_total_used_edit_order >
                            0 &&
                            oneCart.info_cart?.points_amount_used_edit_order >
                              0 && (
                              <div className="row item-info">
                                <div className="item-discount-name col-6">
                                  Xu đã sử dụng khi đặt [
                                  {
                                    oneCart.info_cart
                                      ?.points_total_used_edit_order
                                  }
                                  xu]
                                </div>
                                <span
                                  className="col-6"
                                  style={{ textAlign: "end" }}
                                >
                                  -
                                  {formatNoD(
                                    oneCart.info_cart
                                      ?.points_amount_used_edit_order
                                  )}
                                </span>
                              </div>
                            )}

                          {oneCart?.info_cart?.bonus_points_amount_used > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm khi dùng xu [
                                {oneCart?.info_cart?.total_points_used}xu]
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                -
                                {formatNoD(
                                  oneCart?.info_cart?.bonus_points_amount_used
                                )}
                              </span>
                            </div>
                          )}
                          {/* {ship_discount_amount > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm phí vận chuyển
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                - {formatNoD(ship_discount_amount)}
                              </span>
                            </div>
                          )} */}

                          {oneCart?.info_cart?.total_shipping_fee >= 0 && (
                            <div
                              className="row item-info"
                              style={{
                                justifyContent: "space-between",
                                padding: "0 15px",
                              }}
                            >
                              <div className="item-discount-name">
                                Phí vận chuyển
                                {ship_discount_amount > 0 ? (
                                  <span style={{ textAlign: "end" }}>
                                    (- {formatNoD(ship_discount_amount)})
                                  </span>
                                ) : null}
                              </div>
                              <span style={{ textAlign: "end" }}>
                                +
                                {formatNoD(
                                  oneCart?.info_cart?.total_shipping_fee
                                )}
                              </span>
                            </div>
                          )}

                          <hr style={{ width: "100%" }} />

                          <Popover
                            positions={["top"]}
                            onClickOutside={() => this.setIsPopoverOpen(false)}
                            isOpen={this.state.isPopoverOpen}
                            content={
                              <div className="model-discount">
                                <div className="row">
                                  <div className="txt-discount">Chiết khấu</div>

                                  <input
                                    {...handleKeyPress}
                                    autofocus={true}
                                    ref="refDiscountInput"
                                    onChange={this.handChange}
                                    type="text"
                                    name="discount"
                                    id="input-discount-pos"
                                    class=" col-4 input-discount"
                                    value={
                                      this.state.typeDiscount == 0
                                        ? formatNoD(this.state.discount)
                                        : formatNoD(this.state.percentDiscount)
                                    }
                                  />

                                  <div
                                    className={
                                      this.state.typeDiscount == 0
                                        ? "type-discount-price activesss"
                                        : "type-discount-price"
                                    }
                                    onClick={() => this.ChangeTypeDiscount(0)}
                                  >
                                    VND
                                  </div>
                                  <div
                                    className={
                                      this.state.typeDiscount == 1
                                        ? "type-discount-price activesss"
                                        : "type-discount-price"
                                    }
                                    onClick={() => this.ChangeTypeDiscount(1)}
                                  >
                                    %
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <div className="row item-info">
                              <div
                                onClick={() =>
                                  isChangeDiscountPos &&
                                  this.setIsPopoverOpen(
                                    !this.state.isPopoverOpen
                                  )
                                }
                                className="title-price col-8 trigger-discount"
                              >
                                Chiết khấu (F6)
                              </div>

                              <button
                                className="trigger-discount"
                                onClick={() =>
                                  isChangeDiscountPos &&
                                  this.setIsPopoverOpen(
                                    !this.state.isPopoverOpen
                                  )
                                }
                                type="text"
                                name=""
                                id="discount"
                                class="col-4 button-discount-pos"
                                value={
                                  this.state.typeDiscount == 0
                                    ? this.state.discount
                                    : this.state.beforeDiscount
                                }
                                // data-toggle="modal" data-target="#modalDiscount"
                              >
                                {formatNoD(
                                  this.state.typeDiscount == 0
                                    ? this.state.discount
                                    : this.state.percentDiscount
                                )}
                              </button>
                            </div>
                          </Popover>
                          {oneCart?.info_cart?.vat > 0 ? (
                            <div
                              className="row item-info"
                              style={{
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="col-6">VAT</div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                {formatNoD(oneCart.info_cart?.vat)}
                              </span>
                            </div>
                          ) : null}
                          {oneCart?.balance_collaborator_used_before > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm giá ví CTV
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                -{" "}
                                {formatNoD(
                                  oneCart?.balance_collaborator_used_before
                                )}
                              </span>
                            </div>
                          )}
                          {oneCart?.balance_agency_used_before > 0 && (
                            <div className="row item-info">
                              <div className="item-discount-name col-6">
                                Giảm giá ví Đại lý
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end" }}
                              >
                                -{" "}
                                {formatNoD(oneCart?.balance_agency_used_before)}
                              </span>
                            </div>
                          )}
                          <div className="row item-info">
                            <div
                              className="title-price col-6"
                              style={{ color: "black", fontWeight: "500" }}
                            >
                              KHÁCH PHẢI TRẢ
                            </div>
                            <span
                              className="col-6"
                              style={{
                                textAlign: "end",
                                color: "red",
                                fontSize: "20px",
                              }}
                            >
                              {formatNoD(totalFinal)}
                            </span>
                          </div>

                          {
                            <React.Fragment>
                              <div className="row" style={{ padding: "4px 0" }}>
                                <div
                                  className="title-price col-6"
                                  style={{
                                    color: "black",
                                    fontWeight: "500",
                                  }}
                                >
                                  Tiền khách đưa (F8)
                                </div>
                                <input
                                  type="text"
                                  name="import_price"
                                  id="import_prices"
                                  {...handleKeyPress}
                                  class="col-6 text-input-pos"
                                  style={{
                                    fontSize: "24px",
                                  }}
                                  value={formatNoD(
                                    removeSignNumber(this.state.priceCustomer)
                                  )}
                                  onChange={this.handChange}
                                ></input>
                              </div>
                              <div
                                className="row"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  margin: "10px 0",
                                }}
                              >
                                {listSuggestion.map((suggesionPrice) => (
                                  <div>
                                    <div
                                      style={{
                                        margin: 3,
                                      }}
                                      className={
                                        this.state.priceCustomer ===
                                        suggesionPrice
                                          ? "activesss item-recomment"
                                          : "item-recomment"
                                      }
                                      onClick={() =>
                                        this.handleActive(suggesionPrice)
                                      }
                                    >
                                      {formatNoD(suggesionPrice)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </React.Fragment>
                          }

                          {this.state.openShipment == false && (
                            <div
                              className="row"
                              style={{
                                borderTop: "1px solid #80808045",
                                padding: "10px 0",
                              }}
                            >
                              {/* <div
                                className="title-price col-6"
                                style={{
                                  color: exchange < 0 ? "red" : "black",
                                  fontWeight: "500",
                                }}
                              >
                                {exchange < 0
                                  ? "Khách còn thiếu"
                                  : "Tiền thừa trả khách"}
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end", fontSize: "22px" }}
                              >
                                {formatNoD(Math.abs(exchange))}
                              </span>
                            </div> */}
                              <div
                                className="title-price col-6"
                                style={{
                                  color:
                                    moneyCustomerNeedPaid < 0 ? "red" : "black",
                                  fontWeight: "500",
                                }}
                              >
                                {moneyCustomerNeedPaid < 0
                                  ? "Khách còn thiếu"
                                  : "Tiền thừa trả khách"}
                              </div>
                              <span
                                className="col-6"
                                style={{ textAlign: "end", fontSize: "22px" }}
                              >
                                {formatNoD(Math.abs(moneyCustomerNeedPaid))}
                              </span>
                            </div>
                          )}

                          <div
                            class="form-group"
                            style={{ position: "relative" }}
                          >
                            <i
                              class="fas fa-pencil-alt"
                              style={{
                                position: "absolute",
                                top: "11px",
                                left: "6px",
                              }}
                            ></i>
                            <input
                              class="form-control"
                              rows="5"
                              id="comment"
                              placeholder="Thêm ghi chú"
                              style={{
                                paddingLeft: "30px",
                                border: 0,
                                borderRadius: 0,
                                borderBottom: "2px solid gray",
                                fontSize: "13px",
                              }}
                              value={this.state.customerNote}
                              onChange={this.handleChange}
                            ></input>
                          </div>
                          <div
                            className="row"
                            style={{
                              padding: "3px 0",
                              justifyContent: "space-between",
                              marginRight: "13px",
                            }}
                          >
                            <>
                              <div
                                className="title-price"
                                style={{
                                  paddingLeft: 16,
                                }}
                              >
                                {" "}
                                In hóa đơn
                              </div>
                              <form>
                                <div class="custom-control custom-switch">
                                  <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="switch2"
                                    // name="example"
                                    checked={this.props.allowAutoPrint}
                                    onChange={(e) =>
                                      this.props.setStatusPrint(
                                        !this.props.allowAutoPrint
                                      )
                                    }
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="switch2"
                                  ></label>
                                </div>
                              </form>
                            </>
                          </div>
                          {/* <div class="form-check">
                                                        <input
                                                            class="form-check-input " style = {{marginTop: "7px"}}
                                                            onChange={(e)=>this.setState({allowAutoPrint : !this.state.allowAutoPrint})}
                                                            type="checkbox"
                                                            id="flexRadioDefault1"
                                                        />
                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                            In hóa đơn
                                                        </label>
                                                    </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="btn-submit-pos">
                      <div className="row justify-content-around">
                        {getChannel() == IKITECH &&
                          (this.state.openShipment == true ||
                            total_shipping_fee > 0) && (
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                onChange={this.handleOptionChange}
                                type="radio"
                                value={2}
                                id="flexRadioDefault1"
                                checked={this.state.payment_method_id == 2}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Thanh toán khi nhận hàng
                              </label>
                            </div>
                          )}
                        {(typeof total_shipping_fee == "undefined" ||
                          total_shipping_fee == null ||
                          total_shipping_fee == 0) &&
                          this.state.openShipment == false && (
                            <React.Fragment>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  onChange={this.handleOptionChange}
                                  type="radio"
                                  value={0}
                                  id="flexRadioDefault1"
                                  checked={this.state.payment_method_id == 0}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  Tiền mặt
                                </label>
                              </div>

                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  onChange={this.handleOptionChange}
                                  type="radio"
                                  value={1}
                                  id="flexRadioDefault2"
                                  checked={this.state.payment_method_id == 1}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Thẻ
                                </label>
                              </div>
                            </React.Fragment>
                          )}
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            onChange={this.handleOptionChange}
                            type="radio"
                            value={3}
                            id="flexRadioDefault3"
                            checked={this.state.payment_method_id == 3}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault3"
                          >
                            Chuyển khoản
                          </label>
                        </div>
                      </div>

                      <div
                        className="wrap-buttom"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "10px 0",
                          marginTop: "15px",
                        }}
                      >
                        {this.props.match.params.order_code ? (
                          <>
                            {this.props.loadingOrder ? (
                              <button
                                className="btn btn-pay-update"
                                style={{
                                  width: "100%",
                                  padding: "0 25px",
                                  height: "95.5px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <span className="loading-spin"></span>
                              </button>
                            ) : (
                              <button
                                className="btn btn-pay-update"
                                style={{
                                  width: "100%",
                                  padding: "25px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={this.handlePayment}
                              >
                                Cập nhật
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {this.props.loadingOrder ? (
                              <button
                                className="btn btn-pay"
                                style={{
                                  width: "100%",
                                  padding: "0 25px",
                                  height: "95.5px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <span className="loading-spin"></span>
                              </button>
                            ) : (
                              <button
                                className="btn btn-pay"
                                style={{
                                  width: "100%",
                                  padding: "25px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={this.handlePayment}
                              >
                                {this.state.openShipment == true ||
                                (total_shipping_fee > 0 &&
                                  getChannel() == IKITECH)
                                  ? "Lên đơn (F9)"
                                  : "Thanh toán (F9)"}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalDetail
                allow_semi_negative={allow_semi_negative}
                modal={this.state.infoProduct}
                handleCallbackPushProduct={this.handleCallbackPushProduct}
              />
              <ModalUpdateDetail
                allow_semi_negative={allow_semi_negative}
                modal={this.state.updateInfoProduct}
                handleCallbackPushProduct={this.handleCallbackPushProduct}
              />
              {/* <PertionInfo store_code={store_code} listPertion={listPertion} handleCallbackPertion={this.handleCallbackPertion} /> */}
              <ModalUser handleCallbackUser={this.handleCallbackUser} />
              <ModalVoucher
                listVoucher={listVoucher}
                handleCallbackVoucherInput={this.handleCallbackVoucherInput}
              />
              <ModalRetailSteps></ModalRetailSteps>
            </div>
            <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
          </PosModalStyles>
        ) : (
          <NotAccess />
        )}
        <Loading />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducers.product.allProduct,
    oneCart: state.posReducers.pos_reducer.oneCart,
    fromEditOrder: state.posReducers.pos_reducer.fromEditOrder,
    orderAfterPayment: state.posReducers.pos_reducer.orderAfterPayment,
    loadingOrder: state.posReducers.pos_reducer.loadingOrder,
    allowAutoPrint: state.posReducers.pos_reducer.allowAutoPrint,
    loadingHandleChangeQuantity:
      state.posReducers.pos_reducer.loadingHandleChangeQuantity,
    loadingHandleChangePriceItem:
      state.posReducers.pos_reducer.loadingHandleChangePriceItem,
    listPertion: state.orderReducers.order_product.listPertion,
    listVoucher: state.orderReducers.order_product.listVoucher,
    inforCustomer: state.posReducers.pos_reducer.inforCustomer,
    badges: state.badgeReducers.allBadge,
    customers: state.customerReducers.customer.allCustomer,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
    addProductInCart: (store_code, branch_id, id_cart, data) => {
      dispatch(
        posAction.addProductInCart(store_code, branch_id, id_cart, data)
      );
    },
    addComboInCart: (store_code, branch_id, id_cart, data) => {
      dispatch(posAction.addComboInCart(store_code, branch_id, id_cart, data));
    },

    fetchInfoOneCart: (store_code, branch_id, id) => {
      dispatch(posAction.fetchInfoOneCart(store_code, branch_id, id));
    },
    fetchAllPertion: (store_code) => {
      dispatch(OrderAction.fetchAllPertion(store_code));
    },
    disablePrint: () => {
      dispatch({
        type: Types.POS_ORDER_PAYMENT_FAILD,
      });
    },

    setStatusPrint: (data) => {
      dispatch({
        type: Types.CHANGE_STATUS_ALLOW_PRINT,
        data: data,
      });
    },

    updateInfoCart: (store_code, branch_id, id_cart, data) => {
      dispatch(posAction.updateInfoCart(store_code, branch_id, id_cart, data));
    },
    updateInfoCarts: (store_code, branch_id, id_cart, data) => {
      dispatch(posAction.updateInfoCarts(store_code, branch_id, id_cart, data));
    },
    paymentOrderPos: (
      store_code,
      branch_id,
      id_cart,
      data,
      _this,
      onSuccess
    ) => {
      dispatch(
        posAction.paymentOrderPos(
          store_code,
          branch_id,
          id_cart,
          data,
          _this,
          onSuccess
        )
      );
    },
    updateShippingPackage: (store_code, order_code, data, funcModal) => {
      dispatch(
        billAction.updateShippingPackage(
          store_code,
          order_code,
          data,
          funcModal
        )
      );
    },
    fetchVoucher: (store_code, branch_id, id_cart, data) => {
      dispatch(posAction.fetchVoucher(store_code, branch_id, id_cart, data));
    },
    fetchAllVoucher: (store_code, params) => {
      dispatch(OrderAction.fetchAllVoucher(store_code, params));
    },
    fetchAllBadge: (store_code, branch_id) => {
      dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
    },
    createCartEditOrder: (store_code, order_code) => {
      dispatch(posAction.createCartEditOrder(store_code, order_code));
    },
    showLoading: (data) => {
      dispatch(data);
    },
    showError: (data) => {
      dispatch(data);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostOrder);
