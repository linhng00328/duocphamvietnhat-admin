import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import CardProduct from "../../components/Pos_Order/CardProduct";
import CardCombo from "../../components/Pos_Order/CardCombo";
import Slider from "react-slick";

import Pagination from "../../components/Pos_Order/Pagination";
import Dropdown from "./component/Dropdown";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as dashboardAction from "../../actions/customer";
import { getDDMMYYYDate } from "../../ultis/date";
import * as OrderAction from "../../actions/add_order";
import * as productAction from "../../actions/product";

import { format } from "../../ultis/helpers";
import Autocomplete from "react-autocomplete";
import AutoCompleteText from "./AutoCompleteText";
import * as customerAction from "../../actions/customer";
import Select, { OnChangeValue, StylesConfig } from "react-select";
import { debounce } from "lodash";
import moment from "moment";
import ModalFilter from "./component/Filter";
import { getBranchId } from "../../ultis/branchUtils";
import ShowModalDetailCombo from "../../components/Pos_Order/ShowDetailCombo";

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
      listDistrict: [],
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      txtName: "",
      txtEmail: "",
      isShow: false,
      filterCategory: "all",
      isShowDetailCombo: false,
      modal: { products: [] },
      filter_sort: "new",
      filter_desc: "",
      params: "",
      openIconFilter: false,
      chooseTab: 2,
    };

    this.onChangeNum = debounce(this.handleChangeNum, 0);
    this.onSearchCustomer = debounce(this.handleSearchCustomer, 500);
    this.loadFirst = true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.chooseTab != this.props.chooseTab) {
      this.setState({ chooseTab: nextProps.chooseTab });
    }
    return true;
  }

  componentDidMount() {
    this.props.fetchPlaceProvince();
    this.props.fetchAllCombo(this.props.store_code);
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

      // this.props.fetchPlaceWards(data.id);

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
    if (
      this.loadFirst == false &&
      nextProps.oneCart?.id &&
      nextProps.oneCart !== undefined
    )
      this.props.onNewChange(nextState);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      this.props.openShipment != nextProps.openShipment &&
      nextProps.openShipment == true
    ) {
      this.setState({ chooseTab: 1 });
    }

    if (!shallowEqual(this.props.district, nextProps.district)) {
      this.setState({
        listDistrict: nextProps.district,
      });
    }

    if (!shallowEqual(nextProps.wards, this.props.wards)) {
      this.setState({
        listWards: nextProps.wards,
      });
    }

    if (
      nextProps.oneCart?.id !== this.props.oneCart?.id &&
      nextProps.oneCart !== undefined
    ) {
      this.loadFirst = true;
    }

    if (
      !shallowEqual(nextProps.oneCart, this.props.oneCart) &&
      nextProps.oneCart !== undefined
    ) {
      if (nextProps.oneCart?.province != null) {
        this.props.fetchPlaceDistrict(nextProps.oneCart.province);
      }
      if (nextProps.oneCart?.district != null) {
        this.props.fetchPlaceWards(nextProps.oneCart.district);
      }

      const customer = nextProps.oneCart?.customer;
      const oneCart = nextProps.oneCart;
      console.log("nextProps.oneCart:: ", nextProps.oneCart);
      var { store_code, listVoucher, fetchAllVoucher } = this.props;

      let params = "";
      if (oneCart?.customer?.id) {
        params = `customer_id=${oneCart?.customer?.id}`;
      }

      fetchAllVoucher(store_code, params);

      this.setState({
        ...this.state,
        cartId: oneCart.id,
      });

      // if (oneCart.noUpdateUI != true) {
      var selectedDate = null;
      try {
        selectedDate =
          oneCart == null ||
          oneCart.customer?.date_of_birth == null ||
          oneCart.customer?.date_of_birth == "0000-00-00" ||
          oneCart.customer?.date_of_birth == "0000-00-00 00:00:00"
            ? ""
            : new Date(oneCart.customer?.date_of_birth);
      } catch (error) {
        selectedDate = null;
      }

      if (
        (this.loadFirst == true && oneCart.id) ||
        (nextProps.oneCart?.id > 0 && this.props.openShipment == true)
      ) {
        var isDisabledButtonInput = false;
        if (oneCart == null || oneCart.customer == null) {
          isDisabledButtonInput = false;
        } else if (oneCart.edit_order_code != null) {
          isDisabledButtonInput = false;
        } else {
          isDisabledButtonInput = oneCart.customer.is_passersby;
        }

        this.setState({
          ...this.state,
          cartId: oneCart.id,
          txtProvince: oneCart.province ?? "",
          txtDistrict: oneCart.district ?? "",
          txtWards: oneCart.wards ?? "",
          txtName: oneCart.customer_name ?? "",
          txtEmail: oneCart.customer_email ?? "",
          txtPhoneNumber: oneCart.customer_phone ?? "",
          txtSex: oneCart.customer_sex,
          txtAddressDetail: oneCart.address_detail ?? "",
          selectedDate: selectedDate,

          isDisabledButton: isDisabledButtonInput,

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
        });
        this.loadFirst = false;
      }

      // this.onSelectChangeProvinceById(customer.province)
      // this.onSelectChangeDistrictById(customer.district)
      // this.onSelectChangeWardsById(customer.wards)
    }
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
    this.setState({
      selectedDate: date,
    });
  };

  getListYear = () => {
    var list = [];
    var maxYear = new Date().getFullYear();

    for (var i = 1922; i <= maxYear; i++) {
      list.push(i);
    }
    return list;
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
    var { store_code, badges, user } = this.props;

    var params = `&search=${va}`;
    if (badges.is_sale && badges.is_staff) {
      params += `&sale_staff_id=${user?.id}`;
    }
    this.props.fetchAllCustomer(store_code, 1, params);
  };

  onSeletedCustomer = (cus) => {
    const newDate = isNaN(new Date(cus.date_of_birth))
      ? ""
      : new Date(cus.date_of_birth);
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
      selectedDate: cus == null || cus.date_of_birth == null ? "" : newDate,
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

  _recordInput = (name, event) => {
    console.log(event);
    this.props.passKeyPress(event.key, event);
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

    // const ExampleCustomTimeInput = ({ date, value, onChange }) => (
    //     <input value={value} type="text" placeholder="Ngày sinh" class="tbDatePicker form-control customerInfo px-1" id="customerBirthday"
    //         autocomplete="new-password" />
    // );

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

    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <div class="row">
          <div class="col-md-4 col1  col-lg-4 col-xl-4 col-6">
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
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text px-2" title="Email">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>
              </div>
              <input
                {...handleKeyPress}
                value={txtEmail || ""}
                onChange={this.onChange}
                name="txtEmail"
                disabled={isDisabledButton}
                type="text"
                class="form-control customerInfo"
                id="customerName"
                placeholder="Email"
                autocomplete="new-password"
                style={{
                  fontSize: "13px",
                  height: `calc(2.25rem + 2px)`,
                }}
              />
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col2 col-xl-4 com-sm-4 col-6">
            <Dropdown
              menuPlacement="top"
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
                      zIndex: -1,
                    }}
                    onClick={() => {
                      this.toggleOpenProvince();
                    }}
                    disabled={true}
                    value={""}
                    class="form-control select-has-search-box select2-hidden-accessible"
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
                menuPlacement="top"
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
              menuPlacement="top"
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
                    class="form-control select-has-search-box customerInfo select2-hidden-accessible"
                    style={{
                      background: isDisabledButton ? "#eaecf4" : "white",
                      fontSize: "13px",
                      zIndex: -1,
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
                menuPlacement="top"
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
              menuPlacement="top"
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
                      zIndex: -1,
                    }}
                    onClick={() => {
                      this.toggleOpenWards();
                    }}
                    disabled={true}
                    value={""}
                    onChange={this.onChangeWards2}
                    name="txtWards"
                    class="form-control select-has-search-box customerInfo select2-hidden-accessible"
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
                menuPlacement="top"
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
          </div>

          <div class="col-md-4 col-lg-4 col3 col-xl-4 col-6">
            <div class="input-group mb-2">
              <select
                disabled={isDisabledButton}
                value={txtSex}
                onChange={this.onChangeSex}
                name="txtSex"
                class="form-control customerInfo px-1"
                id="customerGender"
                style={{
                  fontSize: "13px",
                }}
              >
                <option value="" disabled>
                  - Giới tính -
                </option>
                <option value="1">Nam</option>
                <option value="2">Nữ</option>
                <option value="0">Khác</option>
              </select>

              <div className="day-of-birth-pos">
                <DatePicker
                  {...handleKeyPress}
                  popperPlacement="top-end"
                  dateFormat="dd/MM/yyyy"
                  className={
                    "tbDatePicker form-control customerInfo px-1 day-of-birth-pos"
                  }
                  // customInput={<ExampleCustomInput />}
                  placeholderText="Ngày sinh"
                  maxDate={new Date()}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </button>
                      <select
                        value={
                          selectedDate == null || this.state.selectedDate == ""
                            ? new Date().getFullYear()
                            : selectedDate.getFullYear()
                        }
                        onChange={({ target: { value } }) => {
                          changeYear(value);
                          this.changeYear(value);
                        }}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={
                          months[
                            selectedDate == null ||
                            this.state.selectedDate == ""
                              ? new Date().getMonth()
                              : selectedDate.getMonth()
                          ]
                        }
                        onChange={({ target: { value } }) => {
                          changeMonth(months.indexOf(value));
                          this.changeMonth(months.indexOf(value));
                        }}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                  selected={
                    selectedDate == null || this.state.selectedDate == ""
                      ? null
                      : new Date(selectedDate)
                  }
                  onChange={(date) => this.setStartDate(date)}
                />
              </div>
            </div>
            {/* <div class="input-group mb-2">
                        <input type="text" class="form-control customerInfo p-1" title="Email" placeholder="Email" id="customerEmail" autocomplete="new-password" />
                        <input type="text" class="form-control customerInfo p-1" title="Facebook" placeholder="Facebook" id="customerFacebookLink" autocomplete="new-password" />
                    </div> */}

            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text px-2" title="Địa chỉ">
                  <i class="fa fa-home"></i>
                </span>
              </div>
              <textarea
                rows="3"
                {...handleKeyPress}
                disabled={isDisabledButton}
                value={txtAddressDetail || ""}
                onChange={this.onChange}
                name="txtAddressDetail"
                class="form-control txtAutoHeight customerInfo"
                placeholder="Địa chỉ chi tiết"
                id="customerAddress"
                style={{
                  fontSize: "13px",
                }}
              ></textarea>
            </div>
          </div>
          {/* <div class="col-md-2 col-6" style = {{paddingRight : "10px"}}>
                    <button id="btnSaveCustomer"
                        onClick={this.onSaveCustomer}
                        class="btn btn-yes-pos"> <i class="fa fa-user-o" aria-hidden="true"></i> Lưu thông tin</button>
                </div> */}
        </div>
      </div>
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
        <option value={data.id}>{data.name}</option>
      ));
    }
    return result;
  };
  postFilterProduct = (e) => {
    e.preventDefault();
    const branch_id = getBranchId();

    var { filter_sort, filterCategory } = this.state;
    var category_ids = filterCategory;
    var sort_by = filter_sort;
    var params = `&limit=${this.props.limit}`;
    // params = params + `&descending=${descending}`;
    if (category_ids && category_ids != "") {
      if (category_ids == "all") {
      } else params = params + `&category_ids=${category_ids}`;
    }
    if (sort_by && sort_by != "") {
      if (sort_by == "new") {
        params = params;
      } else if (sort_by == "old") {
        params = params + `&sort_by=created_at&descending=false`;
      } else if (sort_by == "sales") {
        params = params + `&sort_by=sales&descending=true`;
      } else if (sort_by == "short") {
        params = params + `&sort_by=sales&descending=false`;
      } else {
        params = params;
      }
    } else {
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
  render() {
    var { limit, passNumPage, store_code, products } = this.props;
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

    var { category_product, listCombo, oneCart } = this.props;
    var settings = {
      infinite: listCombo.length > 2,
      slidesToShow: 2,
      slidesToScroll: 2,
      ltr: true,
    };
    var current_page_product = products?.current_page || 1;
    var last_page_product = products?.last_page || 1;

    return (
      <div
        className="panel-bottom"
        style={{
          "padding-bottom": "25px",
          paddingTop: "8px",
          fontSize: "13px",
        }}
      >
        <div className={`filter-product-pos ${show}`}>
          <div
            className="header"
            style={{
              padding: "12px",
              color: "black",
              "border-bottom": "1px solid #b6a6a6",
            }}
          >
            <h5 className="title">Lọc sản phẩm</h5>
          </div>
          <div className="body" style={{ marginTop: "20px", padding: "15px" }}>
            <div class="form-group">
              <label htmlFor="lname"> Danh mục</label>
              <select
                onChange={this.onChange}
                name="filterCategory"
                value={filterCategory}
                // onChange={this.onChange}
                id="input"
                class="form-control"
                style={{
                  fontSize: "13px",
                }}
              >
                <option disabled value="">
                  --Chọn danh mục--
                </option>
                <option value="all">Tất cả</option>
                {this.showCategory()}
              </select>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  value="new"
                  onChange={this.onChangeFilterSort}
                  checked={filter_sort == "new" ? true : false}
                  type="radio"
                  name="filter_sort"
                />
                <label class="form-check-label" for="gridCheck">
                  Mới nhất
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  value="old"
                  onChange={this.onChangeFilterSort}
                  checked={filter_sort == "old" ? true : false}
                  type="radio"
                  name="filter_sort"
                />
                <label class="form-check-label" for="gridCheck">
                  Cũ nhất
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  value="sales"
                  onChange={this.onChangeFilterSort}
                  checked={filter_sort == "sales" ? true : false}
                  type="radio"
                  name="filter_sort"
                />
                <label class="form-check-label" for="gridCheck">
                  Bán chạy nhất
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  value="short"
                  onChange={this.onChangeFilterSort}
                  checked={filter_sort == "short" ? true : false}
                  type="radio"
                  name="filter_sort"
                />
                <label class="form-check-label" for="gridCheck">
                  Bán ít nhất
                </label>
              </div>
            </div>

            {/* <div class="form-group">

                            <div class="form-check">
                                <input class="form-check-input" onChange={this.onChangeFilterSale} checked={filter_sale} value="sales" type="checkbox" name="" />
                                <label class="form-check-label" for="gridCheck">
                                    Lọc theo sản phẩm bán chạy
                                </label>
                            </div>

                        </div>
                        <div class="form-group">

                            <div class="form-check">
                                <input class="form-check-input" onChange={this.onChangeFilterPrice} checked={filter_price} value="price" type="checkbox" name="" />
                                <label class="form-check-label" for="gridCheck">
                                    Lọc theo giá sản phẩm
                                </label>
                            </div>

                        </div> */}
            {/* <div class="form-group">
                            <label htmlFor="lname">        Lọc theo thứ tự
                            </label>
                            <div class="form-check">

                                <input class="form-check-input" value="ASC" onChange={this.onChangeFilterDesc} checked={filter_desc == "ASC" ? true : false} type="radio" name="filter_desc" />
                                <label class="form-check-label" for="gridCheck">
                                    Tăng dần
                                </label>
                            </div>
                            <div class="form-check">

                                <input class="form-check-input" value="DESC" onChange={this.onChangeFilterDesc} checked={filter_desc == "DESC" ? true : false} type="radio" name="filter_desc" />
                                <label class="form-check-label" for="gridCheck">
                                    Giảm dần
                                </label>
                            </div>
                        </div> */}
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "10px",
              display: "flex",
              right: "10px",
            }}
          >
            <button
              type="button"
              class="btn btn-default"
              onClick={() => {
                this.setState({ isShow: false });
              }}
              style={{
                fontSize: "13px",
              }}
            >
              Đóng
            </button>
            <button
              onClick={this.postFilterProduct}
              type="submit"
              class="btn btn-warning"
              style={{
                fontSize: "13px",
              }}
            >
              Lọc
            </button>
          </div>
        </div>
        <div
          className={`filter-product-pos ${isShowDetailCombo}`}
          style={{ padding: "15px", width: "500px" }}
        >
          <div className="header">
            <h5 className="title">Chi tiết sản phẩm</h5>
          </div>
          <div className="body" style={{ marginTop: "20px" }}>
            <ShowModalDetailCombo modal={modal}></ShowModalDetailCombo>
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => {
                this.setState({ isShowDetailCombo: false });
              }}
            >
              Đóng
            </button>
          </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li
            class={`nav-item ${this.props.openShipment ? "active" : ""}`}
            onClick={() => this.setState({ chooseTab: 1 })}
          >
            <a
              class={`nav-link ${this.props.openShipment ? "active" : ""}`}
              id="tab-javascript"
              data-toggle="tab"
              href="#content-javascript"
              role="tab"
              aria-controls="content-javascript"
              aria-selected="true"
            >
              Danh sách sản phẩm
              {/* ({this.props.products?.data?.length || 0}
                            ) */}
            </a>
          </li>
          <li
            class={`nav-item ${this.props.openShipment ? "hide" : ""}`}
            onClick={() => this.setState({ chooseTab: 2 })}
          >
            <a
              class={`nav-link ${this.props.openShipment ? "" : "active"}`}
              id="tab-css"
              data-toggle="tab"
              href="#content-css"
              role="tab"
              aria-controls="content-css"
              aria-selected="false"
            >
              Khách hàng(
              {oneCart?.customer ? (
                <>
                  {oneCart.customer?.is_agency
                    ? "Đại lý"
                    : oneCart.customer?.is_collaborator
                    ? "CTV"
                    : "Khách lẻ"}
                </>
              ) : (
                "Khách vãng lai"
              )}
              )
            </a>
          </li>
          {listCombo?.length > 0 && (
            <li
              class="nav-item"
              onClick={() => this.setState({ chooseTab: 3 })}
            >
              <a
                class="nav-link "
                id="tab-javascripts"
                data-toggle="tab"
                href="#content-javascripts"
                role="tab"
                aria-controls="content-javascripts"
                aria-selected="true"
              >
                Combo đang diễn ra ({listCombo.length || 0})
              </a>
            </li>
          )}

          {this.state.chooseTab == 1 && (
            <div className="filter-button-pos">
              <span
                style={{
                  margin: "auto 0",
                  "margin-right": "5px",
                  "font-size": "14px",
                }}
              >
                {" "}
                ({current_page_product}/{last_page_product})
              </span>

              <div className="wrap-pagination" style={{ marginRight: "8px" }}>
                <Pagination
                  limit={this.props.limit}
                  params={this.state.params}
                  passNumPage={passNumPage}
                  current_page_product={current_page_product}
                  last_page_product={last_page_product}
                  store_code={store_code}
                  products={this.props.products}
                />
              </div>
              <button
                style={{
                  "margin-top": "5px",
                  "margin-bottom": "2px",
                }}
                onClick={this.showFilter}
                class={`btn btn-warning btn-sm `}
              >
                <i class="fa  fa-filter"></i>
              </button>
            </div>
          )}
          {this.state.chooseTab == 2 && (
            <div className="filter-button-pos">
              <button
                style={{
                  "margin-top": "5px",
                  "margin-bottom": "2px",
                  fontSize: "13px",
                }}
                id="btnSaveCustomer"
                onClick={this.onSaveCustomer}
                class="btn btn-yes-pos"
              >
                {" "}
                <i class="fa fa-user-o" aria-hidden="true"></i> Lưu thông tin
              </button>
            </div>
          )}

          {/* <li class="nav-item">
                        <a class="nav-link " id="tab-bootstrap" data-toggle="tab"
                            href="#content-bootstrap"
                            role="tab" aria-controls="content-bootstrap" aria-selected="false">
                            Combo đang diễn ra
                        </a>
                    </li> */}
        </ul>

        <div
          class="tab-content"
          id="myTabContent"
          style={{
            height: "100%",
          }}
        >
          <div
            class={`tab-pane fade   ${
              this.props.openShipment ? "show active" : ""
            }`}
            id="content-javascript"
            role="tabpanel"
            aria-labelledby="tab-javascript"
          >
            {/* <div style={{ display: "flex", justifyContent: "end" }}>
                            <div >

                                <button
                                    style={{ marginRight: "8px", marginTop: "8px" }}
                                    onClick={this.showFilter}
                                    class={`btn btn-secondary btn-sm `}
                                >
                                    <i class="fa  fa-filter"></i>
                                </button>

                                <span></span>

                            </div>
                        </div> */}

            <div
              className="col-list-product"
              style={{
                borderRadius: "0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="card-pos-body" style={{ overflow: "hidden" }}>
                <CardProduct
                  store_code={store_code}
                  handleCallbackProduct={this.props.handleCallbackProduct}
                  handleCallbackPushProduct={
                    this.props.handleCallbackPushProduct
                  }
                />
              </div>
            </div>
          </div>
          <div
            class={`tab-pane fade   ${
              this.props.openShipment ? "" : "show active"
            }`}
            id="content-css"
            role="tabpanel"
            aria-labelledby="tab-css"
          >
            {this.buildTabCustomer()}
          </div>

          <div
            class="tab-pane fade"
            id="content-javascripts"
            role="tabpanel"
            aria-labelledby="tab-javascripts"
          >
            <div className="combo-page">
              <div className="">
                {listCombo.length > 0 && (
                  <Slider {...settings}>
                    {listCombo.map((v, i) => (
                      <div className="card-wraper">
                        <CardCombo
                          key={i}
                          name={v.name}
                          addComboInCart={this.props.addComboInCart}
                          id={v.id}
                          end={v.end_time}
                          set_limit_amount={v.set_limit_amount}
                          value={v.value_discount}
                          type={v.discount_type}
                          products={v.products_combo}
                          getDetailCombo={this.getDetailCombo}
                        />{" "}
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
          {/* <div class="tab-pane fade" id="content-bootstrap"
                        role="tabpanel" aria-labelledby="tab-bootstrap">
                        {this.buildTabCombo()}
                    </div> */}
        </div>

        <ModalFilter></ModalFilter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducers.customer.allCustomer,
    badges: state.badgeReducers.allBadge,
    user: state.userReducers.user.userID,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    customerCreated: state.customerReducers.customer.customerCreated,
    isFromPosAndSave: state.customerReducers.customer.isFromPosAndSave,
    oneCart: state.posReducers.pos_reducer.oneCart,
    listCombo: state.orderReducers.order_product.listCombo,
    listVoucher: state.orderReducers.order_product.listVoucher,
    category_product: state.categoryPReducers.category_product.allCategoryP,
    products: state.productReducers.product.allProduct,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
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
    fetchAllVoucher: (store_code, params) => {
      dispatch(OrderAction.fetchAllVoucher(store_code, params));
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelBottom);
