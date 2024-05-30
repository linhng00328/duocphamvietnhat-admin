import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import CardProduct from "../../components/Pos_Order/CardProduct";
import CardCombo from "../../components/Pos_Order/CardCombo";
import * as shipmentAction from "../../actions/shipment";
import * as customerApi from "../../data/remote/customer";
import * as customerAction from "../../actions/customer";

import { Link } from "react-router-dom";
import * as StoreAAction from "../../data/remote/store_address";
import * as StoreAction from "../../actions/store_address";

import * as Types from "../../constants/ActionType";
import Slider from "react-slick";
import ModalAddressCreate from "./component/ModalAddressCreate";
import ModalAddressUpdate from "./component/ModalAddressUpdate";

import {
  format,
  formatNoD,
  formatNumber,
  removeSignNumber,
  stringToInit,
  randomString,
  formatNumberV2,
} from "../../ultis/helpers";
import Pagination from "../../components/Pos_Order/Pagination";
import Dropdown from "./component/Dropdown";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as dashboardAction from "../../actions/customer";
import { getDDMMYYYDate } from "../../ultis/date";
import * as OrderAction from "../../actions/add_order";
import * as productAction from "../../actions/product";
import { AsyncPaginate } from "react-select-async-paginate";

import Autocomplete from "react-autocomplete";
import AutoCompleteText from "./AutoCompleteText";
import Select, { OnChangeValue, StylesConfig } from "react-select";
import { debounce } from "lodash";
import moment from "moment";
import ModalFilter from "./component/Filter";
import { getBranchId } from "../../ultis/branchUtils";
import ShowModalDetailCombo from "../../components/Pos_Order/ShowDetailCombo";
import styled from "styled-components";

const ShipperStyles = styled.div`
  .delivery-method,
  .delivery-input {
    border: none;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px !important;
    .box-delivery-cart {
      padding: 1.25rem 1.5625rem;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
      text-transform: uppercase;
      h5 {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .content-delivery-cart-parent {
      font-size: 13px;
      padding: 5px 15px;
      .content-delivery-cart {
        padding: 0.5rem 1.5625rem !important;
        margin: 0;
        input {
          border-radius: 5px;
        }
        span {
          font-weight: 500;
        }
      }
    }
    .content-delivery-cart-child {
      .content-delivery-cart {
        display: flex;
        justify-content: space-between;
        .content-delivery-cart-description {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding-left: 5px;
          label {
            flex-grow: 1;
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .custom-checkbox {
    width: 10px;
    height: 10px;
    border-radius: 100rem;
  }
`;

class PanelBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabledButton: false,
      isOpenProvince: false,
      isOpenDistrict: false,
      startDate: new Date(),
      selectedDate: null,
      listWards: [],
      select_customer: null,
      select_storeAddress: null,
      select_customer_id: null,
      listDistrict: [],
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      txtName: "",
      txtEmail: "",
      isShow: false,
      filterCategory: [],
      isShowDetailCombo: false,
      modal: { products: [] },
      filter_sort: "",
      filter_desc: "",
      params: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      type_ship: 0,
      load_total_shipping_fee: true,
      cod: "",
      address_store: "",
      sent_delivery: false,
      isError: false,
      modalAddress: {},
      shipmentInfo: {
        description: "",
        ship_speed_code: "",
        partner_id: "",
        fee: 0,
      },
      listShipment: [],
    };

    this.onChangeNum = debounce(this.handleChangeNum, 0);
    this.onSearchCustomer = debounce(this.handleSearchCustomer, 500);
    this.changeNewShipment = debounce(this.props.calculateShipment, 2000);
    this.changeListShipmentFee = debounce(this.postListShipperFee, 2000);
    this.loadFirst = true;
  }

  componentDidMount() {
    this.props.fetchAllShipment(this.props.store_code);
  }

  setShipmentInfo(shipmentInfo) {
    this.setState({ shipmentInfo });
  }

  setListShipment(listShipment) {
    this.setState({ listShipment });
  }

  showProvince = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };

  optionsProvince = (places) => {
    var list = [];
    if (places.length > 0) {
      list = places.map((data, index) => {
        return { value: data, label: data.name };
      });
    }
    return list;
  };

  optionsWards = (places) => {
    var list = [];
    if (places.length > 0) {
      list = places.map((data, index) => {
        return { value: data, label: data.name };
      });
    }
    return list;
  };

  optionsDistrict = (places) => {
    var list = [];
    if (places.length > 0) {
      list = places.map((data, index) => {
        return { value: data, label: data.name };
      });
    }
    return list;
  };

  showWards = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };

  showDistrict = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };

  onChangeWards = (e) => {
    this.setState({ txtWards: e.target.value, isLoaded: true });
    var indexWards = this.props.wards
      .map((e) => e.id)
      .indexOf(parseInt(e.target.value));
    if (indexWards !== -1) {
      var nameWards = this.props.wards[indexWards].name;
      this.setState({ wardsName: nameWards });
    }
  };

  onChangeSex = (e) => {
    this.setState({ txtSex: e.target.value });
  };

  onChangeProvince = (e) => {
    if (this.state.txtProvince != e.target.value) {
      this.setState({ txtProvince: e.target.value, isLoaded: true });
      this.props.fetchPlaceDistrict(e.target.value);
      var indexProvince = this.props.province
        .map((e) => e.id)
        .indexOf(parseInt(e.target.value));
      if (indexProvince !== -1) {
        var nameProvince = this.props.province[indexProvince].name;
        this.setState({
          provinceName: nameProvince,
          listWards: [],
          txtDistrict: "",
        });
      }
    }
  };
  onChangeProvince2 = (selectValue) => {
    this.toggleOpenProvince();

    if (selectValue != null && selectValue.value != null) {
      var data = selectValue.value;
      this.setState({ txtProvince: data.id, isLoaded: true });
      this.onSelectChangeProvinceById(data.id);

      this.props.fetchPlaceDistrict(data.id);

      this.toggleOpenDistrict();
    }
  };
  onChangeDistrict2 = (selectValue) => {
    this.toggleOpenDistrict();

    if (selectValue != null && selectValue.value != null) {
      var data = selectValue.value;
      this.setState({ txtWards: data.id, isLoaded: true });
      this.onSelectChangeDistrictById(data.id);

      this.props.fetchPlaceWards(data.id);

      this.toggleOpenWards();
    }
  };
  onChangeWards2 = (selectValue) => {
    this.toggleOpenWards();

    if (selectValue != null && selectValue.value != null) {
      var data = selectValue.value;

      this.setState({ txtWards: data.id, isLoaded: true });
      this.onSelectChangeWardsById(data.id);
    }
  };
  onChangeDistrict = (e) => {
    this.setState({ txtDistrict: e.target.value });
    this.props.fetchPlaceWards(e.target.value);
    var indexDistrict = this.props.district
      .map((e) => e.id)
      .indexOf(parseInt(e.target.value));
    if (indexDistrict !== -1) {
      var nameDistrict = this.props.district[indexDistrict].name;
      this.setState({ districtName: nameDistrict });
    }
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.props.openShipment === false) {
      return;
    }
    this.props.onNewChange(nextState);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(this.props.district, nextProps.district)) {
      this.setState({
        listDistrict: nextProps.district,
      });
    }

    if (
      typeof nextProps.total_shipping_fee != "undefined" &&
      nextState.load_total_shipping_fee == true
    ) {
      console.log("vaoooo");
      this.setState({
        type_ship: nextProps.total_shipping_fee > 0 ? 2 : 0,
        load_total_shipping_fee: false,
      });
    }

    if (!shallowEqual(nextProps.wards, this.props.wards)) {
      this.setState({
        listWards: nextProps.wards,
      });
    }

    if (
      !shallowEqual(nextProps.oneCart, this.props.oneCart) &&
      nextProps.oneCart !== undefined
    ) {
      console.log(nextProps.oneCart);

      if (nextProps.oneCart.province != null) {
        this.props.fetchPlaceDistrict(nextProps.oneCart.province);
      }
      if (nextProps.oneCart.district != null) {
        this.props.fetchPlaceWards(nextProps.oneCart.district);
      }

      const customer = nextProps.oneCart?.customer;
      const oneCart = nextProps.oneCart;

      this.setState({
        ...this.state,
        cartId: oneCart.id,
      });

      // if (oneCart.noUpdateUI != true) {
      var selectedDate = null;
      try {
        console.log(oneCart.customer_date_of_birth);
        selectedDate =
          oneCart == null ||
          oneCart.customer_date_of_birth == null ||
          oneCart.customer_date_of_birth == "0000-00-00" ||
          oneCart.customer_date_of_birth == "0000-00-00 00:00:00"
            ? ""
            : new Date(oneCart.customer_date_of_birth);
      } catch (error) {
        selectedDate = null;
      }
      console.log(selectedDate);
      // if()
      var type = {};
      var txtPhoneNumber = {};
      if (
        nextProps.oneCart?.id !== this.props.oneCart?.id &&
        nextProps.oneCart !== undefined
      ) {
        console.log("cart khac");
        this.loadFirst = true;
        type = {
          type_ship: oneCart.total_shipping_fee > 0 ? 2 : 0,

          fee: nextProps.total_shipping_fee,
          // txtPhoneNumber: oneCart.customer_phone ?? "",
        };
      }
      if (
        (oneCart.id && this.loadFirst == true) ||
        this.props.openShipment == false
      ) {
        this.setState({
          ...this.state,
          cartId: oneCart.id,
          txtProvince: oneCart.province ?? "",
          txtDistrict: oneCart.district ?? "",
          txtWards: oneCart.wards ?? "",
          txtName: oneCart.customer_name ?? "",
          txtEmail: oneCart.customer_email ?? "",
          txtPhoneNumber: oneCart.customer_phone ?? "",
          txtSex: oneCart.customer_sex ?? "",
          txtAddressDetail: oneCart.address_detail ?? "",
          selectedDate: selectedDate,
          // cod: oneCart.info_cart.total_final,
          isDisabledButton:
            oneCart == null || oneCart.customer == null
              ? false
              : oneCart.customer.is_passersby,

          districtName: oneCart.district_name,
          wardsName: oneCart.wards_name,
          provinceName: oneCart.province_name,
          valueProvince: {
            label: oneCart.province_name,
            value: oneCart.province,
          },

          valueDistrict: {
            label: oneCart.district_name,
            value: oneCart.district,
          },

          valueWards: {
            label: oneCart.wards_name,
            value: oneCart.wards,
          },

          ...type,
          select_customer: oneCart.customer
            ? {
                value: oneCart.customer.id,
                label: `${oneCart.customer.name}  (${oneCart.customer.phone_number})`,
                customer: oneCart.customer,
              }
            : null,
        });

        this.loadFirst = false;
      }

      // this.onSelectChangeProvinceById(customer.province)
      // this.onSelectChangeDistrictById(customer.district)
      // this.onSelectChangeWardsById(customer.wards)
    }

    // if (this.props.badges != nextProps.badges) {
    //     var badges = nextProps.badges
    //     var address_store = `${badges.address_pickup?.address_detail} - ${badges.address_pickup?.wards_name} - ${badges.address_pickup?.district_name} - ${badges.address_pickup?.province_name}`
    //     console.log(address_store)
    //     this.setState({ address_store })
    // }
  }

  resetShipment = (shipments) => {
    var newShipments = [...shipments];
    for (const item of newShipments) {
      item.isLoading = false;
    }
    // this.props.resetShipment({
    //     type : Types.RESET_ALL_SHIPMENT,
    //     data : newShipments
    // })
  };

  postListShipperFee = (data) => {
    const { fetchListShipmentV2, store_code } = this.props;
    fetchListShipmentV2(store_code, data, (list) => {
      this.setListShipment(list);
    });
  };

  handleShipmentFeeSelect = (info, partner_id) => {
    this.setShipmentInfo({ ...info, partner_id });
    this.getShipment(partner_id, info.ship_speed_code, info.fee);
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Đã vô:::", nextState.weight);
    if (
      nextState.weight != this.state.weight ||
      nextState.length != this.state.length ||
      nextState.width != this.state.width ||
      nextState.height != this.state.height ||
      !shallowEqual(this.props.badges, nextProps.badges) ||
      !shallowEqual(this.state.valueProvince, nextState.valueProvince) ||
      !shallowEqual(this.state.valueDistrict, nextState.valueDistrict) ||
      !shallowEqual(this.state.valueWards, nextState.valueWards)
    ) {
      var {
        weight,
        length,
        width,
        height,
        txtAddressDetail,
        txtProvince,
        txtDistrict,
        txtWards,
        valueDistrict,
        valueProvince,
        valueWards,
      } = nextState;
      var { badges, totalFinal, shipment, store_code } = nextProps;

      console.log(badges);

      var data = {
        money_collection: totalFinal,
        sender_province_id: badges.address_pickup?.province,
        sender_district_id: badges.address_pickup?.district,
        sender_wards_id: badges.address_pickup?.wards,
        sender_address: badges.address_pickup?.address_detail,
        receiver_province_id: valueProvince?.value,
        receiver_district_id: valueDistrict?.value,
        receiver_wards_id: valueWards?.value,
        receiver_address: txtAddressDetail,
        weight: weight,
        length: length,
        width: width,
        height: height,
      };

      this.resetShipment(shipment);
      if (
        data.receiver_province_id == "" ||
        data.receiver_province_id == null ||
        data.receiver_district_id == "" ||
        data.receiver_district_id == null ||
        data.receiver_wards_id == "" ||
        data.receiver_wards_id == null ||
        this.state.weight == ""
      ) {
        this.setState({ isError: true });
        return;
      }
      this.setState({ isError: false });

      // this.changeNewShipment(store_code, shipment, data);
      const isHasProvince =
        valueProvince?.value || this.state.valueProvince?.value ? true : false;
      const isHasDistrict =
        valueDistrict?.value || this.state.valueDistrict?.value ? true : false;
      const isHasWards =
        valueWards?.value || this.state.valueWards?.value ? true : false;
      const isHasFullField = isHasProvince && isHasDistrict && isHasWards;
      if (isHasFullField) {
        this.changeListShipmentFee(data);
      }
      // console.log(address_store)
      // this.props.calculateShipment(store_code , shipment , data);
    }
    return true;
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleChangeNum = (p) => {
    this.setState({
      txtPhoneNumber: p,
    });
  };

  onSaveCustomer = () => {
    var {
      provinceName,
      isOpenProvince,
      txtAddressDetail,
      isDisabledButton,
      selectedDate,
      txtSex,
      txtProvince,
      txtDistrict,
      txtWards,
      listDistrict,
      listWards,
      txtEmail,
      txtEmail,
      txtPhoneNumber,
      txtName,
    } = this.state;

    var { store_code } = this.props;
    this.props.createCustomer(store_code, {
      name: txtName,
      phone_number: txtPhoneNumber,
      email: txtEmail,
      address_detail: txtAddressDetail,
      province: txtProvince,
      district: txtDistrict,
      wards: txtWards,
      sex: txtSex,
      isFromPosAndSave: true,
      is_update: true,
      date_of_birth: selectedDate,
    });
  };

  setStartDate = (date) => {
    console.log(date);
    this.setState({
      selectedDate: date,
    });
  };

  getListYear = () => {
    var list = [];
    var maxYear = new Date().getFullYear();

    for (var i = 1922; i < maxYear; i++) {
      list.push(i);
    }
    return list;
  };

  passDataAddressCreate = (data) => {
    this.setState({
      modalAddress: data,
      resetId: randomString(10),
      type: "CREATE",
    });
  };
  passDataAddressUpdate = (data) => {
    this.setState({
      modalAddress: data,
      resetId: randomString(10),
      type: "UPDATE",
    });
  };

  changeYear = (year) => {
    var date = null;
    if (this.state.selectedDate == null || this.state.selectedDate == "") {
      var date = new Date();
      date.setFullYear(year);
    } else {
      var date = this.state.selectedDate;
      date.setFullYear(year);
    }

    this.setState({
      selectedDate: date,
    });
  };

  changeMonth = (month) => {
    var date = null;
    if (this.state.selectedDate == null || this.state.selectedDate == "") {
      var date = new Date();
      date.setMonth(month);
    } else {
      var date = this.state.selectedDate;
      date.setMonth(month);
    }

    this.setState({
      selectedDate: date,
    });
  };

  handleSearchCustomer = (va) => {
    var { store_code } = this.props;
    var params = `&search=${va}`;
    this.props.fetchAllCustomer(store_code, 1, params);
  };

  onSeletedCustomer = (cus) => {
    this.setState({
      ...this.state,
      txtProvince: cus.province ?? "",
      txtDistrict: cus.district ?? "",
      txtWards: cus.wards ?? "",
      txtName: cus.name ?? "",
      txtEmail: cus.email ?? "",
      txtPhoneNumber: cus.phone_number ?? "",

      txtSex: cus.sex ?? "",
      txtAddressDetail: cus.address_detail ?? "",
      selectedDate:
        cus == null || cus.customer_date_of_birth == null
          ? ""
          : new Date(cus.customer_date_of_birth),
      isDisabledButton: cus == null ? false : cus.is_passersby,

      districtName: cus.district_name,
      wardsName: cus.wards_name,
      provinceName: cus.province_name,
      valueProvince: {
        label: cus.province_name,
        value: cus.province,
      },

      valueDistrict: {
        label: cus.district_name,
        value: cus.district,
      },

      valueWards: {
        label: cus.wards_name,
        value: cus.wards,
      },
    });
  };

  toggleOpenProvince = () => {
    this.setState((state) => ({ isOpenProvince: !state.isOpenProvince }));
  };
  toggleOpenDistrict = () => {
    this.setState((state) => ({ isOpenDistrict: !state.isOpenDistrict }));
  };
  toggleOpenWards = () => {
    this.setState((state) => ({ isOpenWards: !state.isOpenWards }));
  };

  onSelectChangeProvinceById = (idProvince, list = null) => {
    var pro = (list ?? this.props.province).find((ele) => ele.id == idProvince);

    if (pro != null) {
      this.setState({
        valueProvince: {
          label: pro.name,
          value: pro,
        },
        provinceName: pro.name,
        txtProvince: pro.id,
        listWards: [],
        listDistrict: [],
        txtDistrict: "",
        txtWards: "",
        districtName: "",
        wardsName: "",
      });
    }
  };

  onSelectChangeDistrictById = (idDistrict, list = null) => {
    var pro = (list ?? this.props.district).find((ele) => ele.id == idDistrict);

    if (pro != null) {
      this.setState({
        valueDistrict: {
          label: pro.name,
          value: pro,
        },
        districtName: pro.name,
        txtDistrict: pro.id,
        listWards: [],
        wardsName: "",
        txtWards: "",
      });
    }
  };

  onSelectChangeWardsById = (idWards, list = null) => {
    var pro = (list ?? this.props.wards).find((ele) => ele.id == idWards);

    if (pro != null) {
      this.setState({
        valueWards: {
          label: pro.name,
          value: pro,
        },
        wardsName: pro.name,
        txtWards: pro.id,
      });
    }
  };
  getShipment = (partner_id, ship_type, fee) => {
    this.setState({ partner_id, ship_type, fee });
  };

  _recordInput = (name, event) => {
    this.props.passKeyPress(event.key, event);
  };

  onChangeTypeShip = (e) => {
    if (e.target.value == 0) {
      this.setState({
        type_ship: e.target.value,
        partner_id: null,
        ship_type: null,
        fee: null,
      });
    } else {
      this.setState({ type_ship: e.target.value });
    }
  };
  onChangeFee = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      console.log(_value);
      this.setState({ fee: _value });
    }
  };

  onChangeCheckBox = (e) => {
    var { value, name, checked } = e.target;
    this.setState({
      [name]: checked,
    });
  };
  onChangeSelect4 = (selectValue) => {
    var customer = {
      txtName: selectValue?.customer.name ?? null,
      txtPhoneNumber: selectValue?.customer.phone_number ?? null,
      txtEmail: selectValue?.customer.email ?? null,
      txtSex: selectValue?.customer.sex ?? null,
      selectedDate: selectValue?.customer.date_of_birth ?? null,
      txtAddressDetail: selectValue?.customer.address_detail ?? null,
      txtProvince: selectValue?.customer.province ?? null,
      txtDistrict: selectValue?.customer.district ?? null,
      txtWards: selectValue?.customer.wards ?? null,
    };

    this.setState({ select_customer: selectValue, ...customer });
    this.loadFirst = true;
  };
  onChangeSelect4Addr = (selectValue) => {
    if (selectValue?.address_pickup) {
      var { address_pickup } = selectValue;
      this.props.updateStoreA(
        address_pickup.id,
        {
          name: address_pickup.name,
          address_detail: address_pickup.address_detail,
          country: address_pickup.country,
          province: address_pickup.province,
          district: address_pickup.district,
          wards: address_pickup.wards,
          email: address_pickup.email,
          phone: address_pickup.phone,
          is_default_pickup: true,
          is_default_return: false,
        },
        this.props.store_code,
        this
      );
      this.loadFirst = true;
    }

    // this.setState({ select_storeAddress: selectValue, ...store_address });
  };
  loadCustomers = async (search, loadedOptions, { page }) => {
    console.log("vaooooooooooooooooooo");
    var { store_code } = this.props;
    const params = `&search=${search}`;
    const res = await customerApi.fetchAllCustomer(store_code, page, params);
    console.log(res);
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

  loadAddress = async (search, loadedOptions, { page }) => {
    var { store_code } = this.props;
    const params = `&search=${search}`;
    const res = await StoreAAction.fetchAllData(store_code);
    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    return {
      options: res.data.data.map((i) => {
        return {
          value: i.id,
          label: `${i.address_detail} - ${i.wards_name} - ${i.district_name} - ${i.province_name}`,
          address_pickup: i,
        };
      }),
    };
  };
  itemAddress = (i) => {
    return <div>{i}</div>;
  };
  formatOptionLabel = ({ value, label, address }) => {
    return this.itemAddress(label);
  };

  buildTabCustomer = () => {
    var { province } = this.props;

    var {
      valueProvince,
      valueDistrict,
      valueWards,
      isOpenProvince,
      isOpenDistrict,
      isOpenWards,
      isDisabledButton,
      provinceName,
      districtName,
      wardsName,
      selectedDate,
      txtAddressDetail,
      txtSex,
      txtProvince,
      txtDistrict,
      txtWards,
      listDistrict,
      listWards,
      txtEmail,
      txtEmail,
      txtPhoneNumber,
      txtName,
    } = this.state;

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => {
      if (this.state.selectedDate == null || this.state.selectedDate == "") {
        value = "Ngày sinh";
      } else {
        value = getDDMMYYYDate(this.state.selectedDate);
      }
      return (
        <button
          disabled={isDisabledButton}
          className="tbDatePicker form-control customerInfo px-1 day-of-birth-pos"
          style={{
            width: "50px !important",
          }}
          onClick={onClick}
          ref={ref}
        >
          {value}
        </button>
      );
    });

    const years = this.getListYear();
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

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

    const customStylesProvince = {
      control: (provided) => ({
        ...provided,
        minWidth:
          document.getElementById("customerProvinceId") == null
            ? 150
            : document.getElementById("customerProvinceId").offsetWidth,
        zIndex: 4,
        top: -9,
      }),
      // menu: (provided) => ({
      //     ...provided,
      //     top:-88
      //  }),
    };

    var {
      weight,
      length,
      width,
      height,
      cod,
      select_customer,
      shipmentInfo,
      listShipment,
    } = this.state;

    var { total_shipping_fee, badges, store_code } = this.props;

    var { select_customer_id, select_customer, address_store, sent_delivery } =
      this.state;
    var { loadShipper } = this.props;
    var check =
      txtProvince != "" &&
      txtDistrict != "" &&
      txtWards != "" &&
      (weight != "" || length != "" || width != "" || height != "")
        ? true
        : false;

    var addressPickup = badges.address_pickup
      ? {
          value: badges.address_pickup?.id,
          label: `${badges.address_pickup?.address_detail} - ${badges.address_pickup?.wards_name} - ${badges.address_pickup?.district_name} - ${badges.address_pickup?.province_name}`,
          address_pickup: badges.address_pickup,
        }
      : null;

    return (
      <ShipperStyles
        style={{
          padding: 5,
        }}
      >
        <div class="" style={{ marginTop: "8px" }}>
          <div>
            <div
              className="select-async"
              style={{ marginBottom: "8px", fontSize: "13px" }}
            >
              <AsyncPaginate
                placeholder="Tìm khách hàng"
                value={select_customer}
                loadOptions={this.loadCustomers}
                name="recipientReferences1"
                onChange={this.onChangeSelect4}
                additional={{
                  page: 1,
                }}
                debounceTimeout={500}
                isClearable
                isSearchable
              />
            </div>
            <div class="form-group wrap-address-pickup">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label style={{ fontWeight: "500" }} for="product_name">
                  Địa chỉ lấy hàng
                </label>
                <div style={{ display: "flex" }}>
                  <i
                    className="fa fa-plus"
                    onClick={() =>
                      this.passDataAddressCreate(badges.address_pickup)
                    }
                    data-toggle="modal"
                    data-target="#modalAddressCreate"
                    style={{
                      marginLeft: "4px",
                      cursor: "pointer",
                      "font-size": "19px",
                      color: "green",
                    }}
                  ></i>
                </div>
              </div>
              {/* {badges.address_pickup ? (
                <div>
                  {`${badges.address_pickup?.address_detail} - ${badges.address_pickup?.wards_name} - ${badges.address_pickup?.district_name} - ${badges.address_pickup?.province_name}`}
                  <a
                    onClick={() =>
                      this.passDataAddressCreate(badges.address_pickup)
                    }
                    data-toggle="modal"
                    data-target="#modalAddressCreate"
                    style={{
                      textDecoration: "underline",
                      "font-size": "13px",
                      color: "blue",
                      "margin-left": "4px",
                    }}
                  >
                    Thêm
                  </a>
                </div>
              ) : (
                <div
                  style={{ padding: "5px", color: "red", textAlign: "center" }}
                >
                  Chưa có địa chỉ lấy hàng
                  <Link
                    style={{
                      color: "red",
                      display: "block",
                      "text-decoration": "underline",
                    }}
                    to={`/store_address/${store_code}`}
                  >
                    Nhấp để cài đặt
                  </Link>
                </div>
              )}
              {badges.address_pickup ? (
                <div>
                  {`${badges.address_pickup?.address_detail} - ${badges.address_pickup?.wards_name} - ${badges.address_pickup?.district_name} - ${badges.address_pickup?.province_name}`}
                  <a
                    onClick={() =>
                      this.passDataAddressUpdate(badges.address_pickup)
                    }
                    data-toggle="modal"
                    data-target="#modalAddressUpdate"
                    style={{
                      textDecoration: "underline",
                      "font-size": "13px",
                      color: "blue",
                      "margin-left": "4px",
                    }}
                  >
                    Thay đổi
                  </a>
                </div>
              ) : (
                <div
                  style={{ padding: "5px", color: "red", textAlign: "center" }}
                >
                  Chưa có địa chỉ lấy hàng
                  <Link
                    style={{
                      color: "red",
                      display: "block",
                      "text-decoration": "underline",
                    }}
                    to={`/store_address/${store_code}`}
                  >
                    Nhấp để cài đặt
                  </Link>
                </div>
              )} */}
              <div
                className="select-async"
                style={{ marginBottom: "8px", display: "flex" }}
              >
                <AsyncPaginate
                  placeholder="Tìm địa chỉ lấy hàng"
                  value={addressPickup}
                  loadOptions={this.loadAddress}
                  name="recipientReferences1"
                  formatOptionLabel={this.formatOptionLabel}
                  onChange={this.onChangeSelect4Addr}
                  additional={{
                    page: 1,
                  }}
                  key={addressPickup?.value}
                  cacheOptions
                  defaultOptions
                  debounceTimeout={500}
                  // isClearable
                  isSearchable
                  cache={false}
                />
                {badges.address_pickup && (
                  <i
                    className="fa fa-pencil"
                    onClick={() =>
                      this.passDataAddressUpdate(badges.address_pickup)
                    }
                    data-toggle="modal"
                    data-target="#modalAddressUpdate"
                    style={{
                      marginLeft: "6px",
                      cursor: "pointer",
                      "font-size": "19px",
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div style={{ marginBottom: "4px", fontWeight: "500" }}>
              Địa chỉ nhận hàng
            </div>

            <AutoCompleteText
              type="text"
              class="form-control customerInfo"
              _recordInput={this._recordInput}
              placeholder="Điện thoại (F4)"
              data-startsuggest="6"
              id="customerMobile"
              value={txtPhoneNumber || ""}
              onChange={this.onChangeNum}
              name="txtPhoneNumber"
              onSearch={this.onSearchCustomer}
              icon="fa fa-solid fa-phone"
              items={this.props.customers?.data ?? []}
              onSelected={this.onSeletedCustomer}
              disabled={isDisabledButton}
              autocomplete="new-password"
            />

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text px-2" title="Họ tên">
                  <i class="fa fa-user-o" aria-hidden="true"></i>
                </span>
              </div>
              <input
                {...handleKeyPress}
                value={txtName || ""}
                onChange={this.onChange}
                name="txtName"
                disabled={isDisabledButton}
                type="text"
                class="form-control customerInfo"
                id="customerName"
                placeholder="Tên khách"
                autocomplete="new-password"
                style={{
                  fontSize: "13px",
                  height: `calc(2.25rem + 2px)`,
                }}
              />
            </div>
          </div>
          <div>
            <Dropdown
              menuPlacement="bottom"
              isOpen={isOpenProvince}
              onClose={this.toggleOpenProvince}
              target={
                <div
                  class="input-group mb-2"
                  id="customerProvinceId"
                  onClick={() => {
                    this.toggleOpenProvince();
                  }}
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text px-2" title="Thành phố">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                  </div>

                  <select
                    style={{
                      background: isDisabledButton ? "#eaecf4" : "white",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      this.toggleOpenProvince();
                    }}
                    disabled={true}
                    value={""}
                    class="form-control select-has-search-box select2-hidden-accessible selectb-overlay"
                    onChange={this.onChangeProvince2}
                    name="txtProvince"
                    tabindex="-1"
                    aria-hidden="true"
                    data-select2-id="customerCityLocationId"
                  >
                    <option value="" data-select2-id="71">
                      {provinceName == "" || provinceName == null
                        ? "- Tỉnh Thành phố -"
                        : provinceName}
                    </option>
                    {/* {this.showProvince(province)} */}
                  </select>
                </div>
              }
            >
              <Select
                ref={(ref) => {
                  this.refSearchProvince = ref;
                }}
                autoFocus
                menuPlacement="bottom"
                backspaceRemovesValue={false}
                //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                controlShouldRenderValue={false}
                hideSelectedOptions={false}
                isClearable={false}
                menuIsOpen
                onChange={this.onChangeProvince2}
                options={this.optionsProvince(province)}
                placeholder="Tìm kiếm..."
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={customStylesProvince}
                tabSelectsValue={false}
                value={valueProvince}
              />
            </Dropdown>

            <Dropdown
              menuPlacement="bottom"
              isOpen={isOpenDistrict}
              onClose={this.toggleOpenDistrict}
              target={
                <div
                  class="input-group mb-2"
                  onClick={() => {
                    this.toggleOpenDistrict();
                  }}
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text px-2" title="Quận huyện">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                  </div>
                  <select
                    class="form-control select-has-search-box customerInfo select2-hidden-accessible  selectb-overlay"
                    style={{
                      background: isDisabledButton ? "#eaecf4" : "white",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      this.toggleOpenDistrict();
                    }}
                    disabled={true}
                    value={""}
                    onChange={this.onChangeDistrict2}
                    name="txtDistrict"
                    id="customerDistrictLocationId"
                    tabindex="-1"
                    aria-hidden="true"
                    data-select2-id="customerDistrictLocationId"
                  >
                    <option value="">
                      {" "}
                      {districtName == null || districtName == ""
                        ? "- Quận huyện -"
                        : districtName}
                    </option>
                    {/* {this.showDistrict(listDistrict)} */}
                  </select>
                </div>
              }
            >
              <Select
                ref={(ref) => {
                  this.refSearchDistrict = ref;
                }}
                autoFocus
                menuPlacement="bottom"
                backspaceRemovesValue={false}
                //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                controlShouldRenderValue={false}
                hideSelectedOptions={false}
                isClearable={false}
                menuIsOpen
                onChange={this.onChangeDistrict2}
                options={this.optionsDistrict(listDistrict)}
                placeholder="Tìm kiếm..."
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={customStylesProvince}
                tabSelectsValue={false}
                value={valueDistrict}
              />
            </Dropdown>

            <Dropdown
              menuPlacement="bottom"
              isOpen={isOpenWards}
              onClose={this.toggleOpenWards}
              target={
                <div
                  class="input-group mb-2"
                  onClick={() => {
                    this.toggleOpenWards();
                  }}
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text px-2" title="Phường xã">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                  </div>
                  <select
                    style={{
                      background: isDisabledButton ? "#eaecf4" : "white",
                      fontSize: "13px",
                    }}
                    onClick={() => {
                      this.toggleOpenWards();
                    }}
                    disabled={true}
                    value={""}
                    onChange={this.onChangeWards2}
                    name="txtWards"
                    class="form-control select-has-search-box customerInfo select2-hidden-accessible  selectb-overlay"
                    id="customerWardLocationId"
                    tabindex="-1"
                    aria-hidden="true"
                    data-select2-id="customerWardLocationId"
                  >
                    <option value="">
                      {wardsName == null || wardsName == ""
                        ? "- Phường xã -"
                        : wardsName}
                    </option>
                    {/* {this.showWards(listWards)} */}
                  </select>
                </div>
              }
            >
              <Select
                ref={(ref) => {
                  this.refSearchWards = ref;
                }}
                autoFocus
                menuPlacement="bottom"
                backspaceRemovesValue={false}
                //    components={{ DropdownIndicator, IndicatorSeparator: null }}
                controlShouldRenderValue={false}
                hideSelectedOptions={false}
                isClearable={false}
                menuIsOpen
                onChange={this.onChangeWards2}
                options={this.optionsWards(listWards)}
                placeholder="Tìm kiếm..."
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={customStylesProvince}
                tabSelectsValue={false}
                value={valueWards}
              />
            </Dropdown>
            <div class="input-group mb-2">
              <div class="input-group-prepend" style={{ height: "70px" }}>
                <span class="input-group-text px-2" title="Địa chỉ">
                  <i class="fa fa-home"></i>
                </span>
              </div>
              <textarea
                rows="3"
                style={{ height: "70px", fontSize: "13px" }}
                {...handleKeyPress}
                disabled={isDisabledButton}
                value={txtAddressDetail || ""}
                onChange={this.onChange}
                name="txtAddressDetail"
                class="form-control txtAutoHeight customerInfo"
                placeholder="Địa chỉ chi tiết"
                id="customerAddress"
              ></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="product_name">Phí giao hàng</label>

            <select
              // value={txtPublished}
              onChange={this.onChangeTypeShip}
              id="input"
              class="form-control"
              name="type_ship"
              value={this.state.type_ship}
              style={{
                fontSize: "13px",
              }}
            >
              <option value="0">Miễn phí giao hàng</option>
              <option value="1">Phí dự kiến của đối tác vận chuyển</option>

              <option value="2">
                Khác
                {total_shipping_fee && total_shipping_fee > 0
                  ? `(${formatNoD(total_shipping_fee)})`
                  : null}
              </option>
            </select>
          </div>

          {this.state.type_ship == 1 && (
            <React.Fragment>
              {" "}
              {/* <div
                className="row"
                style={{ padding: "5px 10px", marginBottom: "2px" }}
              >
                <div
                  className="title-price"
                  style={{
                    color: "black",
                  }}
                >
                  Thu hộ COD
                </div>
                <input
                  style={{ fontSize: "18px", "margin-left": "70px" }}
                  type="text"
                  name="cod"
                  id="import_prices"
                  {...handleKeyPress}
                  class="text-input-pos"
                  value={formatNoD(removeSignNumber(this.state.cod))}
                  onChange={this.onChange}
                  // value = {cod}
                ></input>
              </div> */}
              <div
                className="row"
                style={{ padding: "5px 10px", marginBottom: "2px" }}
              >
                <div
                  className="title-price"
                  style={{
                    color: "black",
                  }}
                >
                  Khối lượng
                </div>
                <input
                  style={{ fontSize: "18px", "margin-left": "70px" }}
                  type="text"
                  name="weight"
                  id="import_prices"
                  {...handleKeyPress}
                  class="text-input-pos"
                  placeholder="Khối lượng(g)"
                  value={weight}
                  onChange={this.onChange}
                ></input>
              </div>
              <div
                className="row"
                style={{
                  padding: "5px 10px",
                  marginBottom: "20px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="title-price"
                  style={{
                    color: "black",
                  }}
                >
                  Kích thước
                </div>
                <input
                  style={{ fontSize: "18px", maxWidth: "64px" }}
                  type="text"
                  name="length"
                  id="import_prices"
                  placeholder="Dài(cm)"
                  {...handleKeyPress}
                  class="text-input-pos"
                  value={length}
                  onChange={this.onChange}
                ></input>
                <input
                  style={{ fontSize: "18px", maxWidth: "64px" }}
                  type="text"
                  name="width"
                  placeholder="Rộng(cm)"
                  id="import_prices"
                  {...handleKeyPress}
                  class="text-input-pos"
                  value={width}
                  onChange={this.onChange}
                ></input>
                <input
                  style={{ fontSize: "18px", maxWidth: "64px" }}
                  type="text"
                  name="height"
                  placeholder="Cao(cm)"
                  id="import_prices"
                  {...handleKeyPress}
                  class="text-input-pos"
                  value={height}
                  onChange={this.onChange}
                ></input>
              </div>
              {loadShipper == "show" ? (
                <div className="list-payment" style={{ padding: "0 5px" }}>
                  <div style={{ textAlign: "center", padding: "10px" }}>
                    ...Đang tải
                  </div>
                </div>
              ) : listShipment?.length === 0 &&
                !weight &&
                !length &&
                !width &&
                !height ? (
                <div className="list-payment" style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      color: "red",
                    }}
                  >
                    Vui lòng chọn khối lượng và địa chỉ giao hàng để xem báo giá
                    của nhà vận chuyển
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          )}
          {this.state.type_ship == 2 && (
            <div
              className="row"
              style={{ padding: "5px 10px", marginBottom: "2px" }}
            >
              <div
                className="title-price"
                style={{
                  color: "black",
                }}
              >
                Phí vận chuyển
              </div>
              <input
                style={{
                  fontSize: "18px",
                  "margin-left": "70px",
                  width: "120px",
                }}
                type="text"
                name="import_price"
                id="import_prices"
                {...handleKeyPress}
                class="text-input-pos"
                value={formatNoD(this.state.fee)}
                onChange={this.onChangeFee}
              ></input>
            </div>
          )}
          <div class="form-group">
            {/* <div class="form-check">
                  <input class="form-check-input" checked={sent_delivery} name="sent_delivery" onChange={this.onChangeCheckBox} type="checkbox" id="gridCheck" />
                  <label class="form-check-label" for="gridCheck">
                    Xác nhận cho phép giao hàng
                  </label>
                </div> */}
          </div>
          {listShipment?.length > 0 ? (
            <div className="delivery-method">
              {listShipment.map((v, i) => (
                <div key={i} className="delivery-cart">
                  <div className="row content-delivery-cart-parent">
                    {v.name}
                  </div>
                  <div className="content-delivery-cart-child">
                    {v.fee_with_type_ship?.length > 0 &&
                      v.fee_with_type_ship?.map((service) => (
                        <div className="content-delivery-cart">
                          <div className="content-delivery-cart-description">
                            <input
                              type="checkbox"
                              name="delivery"
                              id={service.description}
                              checked={
                                shipmentInfo.ship_speed_code ===
                                service.ship_speed_code
                              }
                              onChange={() =>
                                this.handleShipmentFeeSelect(
                                  service,
                                  v.partner_id
                                )
                              }
                              style={{ display: "none" }}
                            />
                            <span
                              className="custom-checkbox"
                              onClick={() =>
                                this.handleShipmentFeeSelect(
                                  service,
                                  v.partner_id
                                )
                              }
                              style={{
                                cursor: "pointer",
                                marginRight: "8px",
                                backgroundColor:
                                  shipmentInfo.ship_speed_code ===
                                  service.ship_speed_code
                                    ? "#c62025"
                                    : "white",
                                boxShadow: `${
                                  shipmentInfo.ship_speed_code ===
                                  service.ship_speed_code
                                    ? `0 0 0 2px white, 0 0 0 3px #c62025`
                                    : "0 0 0 2px white, 0 0 0 3px #dadada"
                                }`,
                              }}
                            ></span>
                            <label
                              htmlFor={service.description}
                              style={{ cursor: "pointer" }}
                            >
                              {service.description}
                            </label>
                          </div>
                          <span>
                            {service.fee
                              ? `${formatNumberV2(service.fee)}đ`
                              : "0đ"}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </ShipperStyles>
    );
  };

  buildTabCombo = () => {
    var { listCombo } = this.props;

    return (
      <div
        style={{
          overflowX: "scroll",
        }}
      >
        {(listCombo ?? []).map((item, index) => (
          <>
            <div
              className="row"
              key={index}
              style={{
                borderRadios: "0.25em",
                border: "dashed 2px red",
                margin: "5px",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: "#cc3c4c",
                    color: "white",
                    justifyContent: "center",
                    height: "100%",
                    borderRadius: "0.25em",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                </div>
                <div
                  className="value"
                  style={{ fontWeight: "bold" }}
                >{`Giảm ${item.value_discount}%`}</div>
                <div className="code">
                  <span>{`Tên combo: ${item.name}`}</span>
                </div>
                <div className="date-voucher">{`HSD: ${item.end_time}`}</div>
                <div className="apply">
                  <span>{`Áp dụng khi mua combo sản phẩm bên dưới`}</span>
                </div>
              </div>

              {this.showProductCombo(item)}
            </div>
          </>
        ))}
      </div>
    );
  };

  showProductCombo = (items) => {
    return (
      <div className="wrap-combo" style={{ display: "flex", flexWrap: "wrap" }}>
        {items.products_combo.map((item, index) => (
          <div
            class="col-combo"
            key={index}
            style={{ marginBottom: "10px", marginLeft: "10px" }}
          >
            <div class="card" style={{ width: "127px" }}>
              <img
                src={
                  item.product.images.length > 0
                    ? item.product.images[0].image_url
                    : ""
                }
                className="img-responsive"
                alt="Image"
                width="100px"
                height="100px"
              />
              <div class="card-body" style={{ padding: "0" }}>
                <p
                  class="card-title"
                  style={{
                    margin: "0",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.product.name}
                </p>
                <p class="card-text" style={{ color: "red" }}>
                  {format(Number(item.product.price))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  showFilter = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  showCategory = () => {
    var result = null;
    var { category_product } = this.props;
    if (category_product?.length > 0) {
      result = category_product.map((data, index) => (
        <option value={data.value}>{data.name}</option>
      ));
    }
    return result;
  };
  postFilterProduct = (e) => {
    e.preventDefault();
    const branch_id = getBranchId();

    var { filter_desc, filter_sort, filterCategory } = this.state;
    var descending = filter_desc == "DESC" ? true : false;
    var category_ids = filterCategory;
    var sort_by = filter_sort;
    var params = `&limit=${this.props.limit}`;
    if (filter_desc == "") {
    } else params = params + `&descending=${descending}`;
    if (category_ids && category_ids != "") {
      if (category_ids == "all") {
      } else params = params + `&category_ids=${category_ids}`;
    }
    if (sort_by && sort_by != "") params = params + `&sort_by=${sort_by}`;
    else {
      // params = params + `&sort_by=price`;
    }
    this.props.fetchAllProductV2(this.props.store_code, branch_id, 1, params);
    this.setState({ isShow: !this.state.isShow, params: params });
  };
  onChangeFilterSort = (e) => {
    this.setState({ filter_sort: e.target.value });
  };
  onChangeFilterDesc = (e) => {
    this.setState({ filter_desc: e.target.value });
  };
  // onChangeFilter = (e) => {
  //     this.setState({ filter_price: e.target.checked })
  // }

  // onChangeFilterSale = (e) => {
  //     this.setState({ filter_sale: e.target.checked })
  // }
  getDetailCombo = (data) => {
    if (this.state.isShowDetailCombo == false)
      this.setState({
        modal: data,
        isShowDetailCombo: !this.state.isShowDetailCombo,
      });
    else this.setState({ isShowDetailCombo: !this.state.isShowDetailCombo });
  };
  resetModal = () => {
    this.setState({ resetId: randomString(10) });
  };
  render() {
    var {
      limit,
      passNumPage,
      store_code,
      products,
      shipment,
      wards,
      province,
      district,
    } = this.props;
    var {
      isShow,
      filter_desc,
      filter_sort,
      filterCategory,
      isShowDetailCombo,
      modal,
    } = this.state;
    var show = isShow == true ? "show" : "hide";
    var isShowDetailCombo = isShowDetailCombo == true ? "show" : "hide";

    var { category_product, listCombo } = this.props;
    var settings = {
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    var current_page_product = products.current_page || 1;
    var last_page_product = products.last_page || 1;

    console.log(shipment);
    return (
      <div>
        {this.buildTabCustomer()}
        {/* <Form wards = {wards} district = {district} province = {province} history={history} storeAId={storeAId} store_address={store_address} store_code={store_code} /> */}
        <ModalAddressCreate
          type={this.state.type}
          resetId={this.state.resetId}
          resetModal={this.resetModal}
          wards={wards}
          district={district}
          province={province}
          store_code={store_code}
          store_address={this.state.modalAddress}
        ></ModalAddressCreate>
        <ModalAddressUpdate
          typeModal={this.state.typeModal}
          type={this.state.type}
          resetId={this.state.resetId}
          resetModal={this.resetModal}
          wards={wards}
          district={district}
          province={province}
          store_code={store_code}
          store_address={this.state.modalAddress}
        ></ModalAddressUpdate>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducers.customer.allCustomer,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    customerCreated: state.customerReducers.customer.customerCreated,
    isFromPosAndSave: state.customerReducers.customer.isFromPosAndSave,
    oneCart: state.posReducers.pos_reducer.oneCart,
    listCombo: state.orderReducers.order_product.listCombo,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    products: state.productReducers.product.allProduct,
    shipment: state.shipmentReducers.shipment.allShipment,
    calculate: state.shipmentReducers.shipment.calculate,
    loadShipper: state.loadingReducers.disable_shipper,

    badges: state.badgeReducers.allBadge,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    calculateShipment: (store_code, shipment, data) => {
      dispatch(shipmentAction.calculateShipment(store_code, shipment, data));
    },
    fetchPlaceDistrict: (id) => {
      dispatch(placeAction.fetchPlaceDistrict(id));
    },
    fetchPlaceWards: (id) => {
      dispatch(placeAction.fetchPlaceWards(id));
    },
    fetchPlaceDistrict_Wards: (id) => {
      dispatch(placeAction.fetchPlaceDistrict_Wards(id));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    createCustomer: (store_code, form, funcModal) => {
      dispatch(dashboardAction.createCustomer(store_code, form, funcModal));
    },
    fetchAllCombo: (store_code) => {
      dispatch(OrderAction.fetchAllCombo(store_code));
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllShipment: (store_code) => {
      dispatch(shipmentAction.fetchAllShipment(store_code));
    },
    fetchListShipmentV2: (store_code, data, onSuccess) => {
      dispatch(shipmentAction.fetchListShipmentV2(store_code, data, onSuccess));
    },

    updateStoreA: (storeAId, form, store_code, $this) => {
      dispatch(StoreAction.updateStoreAPos(storeAId, form, store_code, $this));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelBottom);
