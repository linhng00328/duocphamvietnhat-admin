import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../../../screens/Loading";
import * as dashboardAction from "../../../../actions/dashboard";
import * as Env from "../../../../ultis/default";
import moment from "moment";
import { getQueryParams } from "../../../../ultis/helpers";
import * as placeAction from "../../../../actions/place";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import history from "../../../../history";
import MomentInput from "react-moment-input";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceName: "",
      districtName: "",
      wardsName: "",
      txtAddress_detail: "",
      txtCountry: 1,
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      isLoaded: false,
      goFirst: true,
      listWards: [],
      listDistrict: [],
      txtName_branch: "",
      txtPhone_branch: "",
      txtEmail_branch: "",
      idSupplier: "",
    };
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillMount() {
    if (typeof this.props.supplier.id != "undefined") {
      this.setState({
        txtName_branch: this.props.supplier.name,
        txtPhone_branch: this.props.supplier.phone,
        txtEmail_branch: this.props.supplier.email,
        txtProvince: this.props.supplier.province,
        txtDistrict: this.props.supplier.district,
        txtWards: this.props.supplier.wards,
        txtAddress_detail: this.props.supplier.address_detail,
        idSupplier: this.props.supplier.id,
        goFirst: false,
      });
    }

    if (this.state.isLoaded === true) {
      this.setState({
        listWards: this.props.wards,
        listDistrict: this.props.district,
        isLoaded: false,
      });
    }

    if (this.props.wards) {
      this.setState({
        listWards: this.props.wards,
        listDistrict: this.props.district,
      });
    }
  }

  componentDidMount() {
    var { store_code, supplierId } = this.props;
    this.props.fetchSupplierId(store_code, supplierId);
    this.props.fetchPlaceProvince();
  }

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

  goBack = () => {
    var { store_code } = this.props;
    var page = getQueryParams("page");
    var search = getQueryParams("search");
    var redirect_report = getQueryParams("redirect_report");

    if (redirect_report) history.replace(`/supplier_debt/${store_code}}`);
    else if (page) {
      history.replace(
        `/supplier/${store_code}?page=${page}${
          search ? `&search=${search}` : ""
        }`
      );
    } else {
      history.replace(
        `/supplier/${store_code}${search ? `?search=${search}` : ""}`
      );
    }
  };
  onChangeProvince = (e) => {
    this.setState({ txtProvince: e.target.value, isLoaded: true });
    this.props.fetchPlaceDistrict(e.target.value);
    var indexProvince = this.props.province
      .map((e) => e.id)
      .indexOf(parseInt(e.target.value));
    if (indexProvince !== -1) {
      var nameProvince = this.props.province[indexProvince].name;
      this.setState({ provinceName: nameProvince });
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

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.supplier, this.props.supplier)) {
      this.props.fetchPlaceDistrict(nextProps.supplier.province);
      this.props.fetchPlaceWards(nextProps.supplier.district);
      this.setState({
        txtName_branch: nextProps.supplier.name,
        txtPhone_branch: nextProps.supplier.phone,
        txtEmail_branch: nextProps.supplier.email,
        txtProvince: nextProps.supplier.province,
        txtDistrict: nextProps.supplier.district,
        txtWards: nextProps.supplier.wards,
        txtAddress_detail: nextProps.supplier.address_detail,
        idSupplier: nextProps.supplier.id,
        goFirst: false,
      });
    }

    if (nextState.isLoaded === true) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district,
        isLoaded: false,
      });
    }

    if (
      !shallowEqual(nextProps.wards, this.props.wards) ||
      !shallowEqual(this.props.district, nextProps.district)
    ) {
      this.setState({
        listWards: nextProps.wards,
        listDistrict: nextProps.district,
      });
    }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.supplier;
      this.setState({ isLoading: true, isShow });
    }
  }
  handleOnClick = (e) => {
    e.preventDefault();
    var {
      txtAddress_detail,
      txtDistrict,
      txtProvince,
      txtWards,
      txtName_branch,
      txtPhone_branch,
      txtEmail_branch,
      idSupplier,
    } = this.state;
    const { store_code } = this.props;
    const Formdata = {
      name: txtName_branch,
      phone: txtPhone_branch,
      email: txtEmail_branch,
      province: txtProvince,
      district: txtDistrict,
      wards: txtWards,
      address_detail: txtAddress_detail,
    };
    console.log("Formdata", Formdata);
    this.props.editSupplier(store_code, idSupplier, Formdata);
  };
  showProvince = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
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

  // goBack = () => {
  //   var { store_code } = this.props;

  //   history.replace(`/supplier/${store_code}/?pag=${getQueryParams("pag")}`);
  // };

  showDistrict = (places) => {
    var result = null;
    if (places.length > 0) {
      result = places.map((data, index) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };
  render() {
    var { province } = this.props;
    var {
      txtAddress_detail,
      txtProvince,
      txtDistrict,
      txtWards,
      listDistrict,
      listWards,
      isShow,
    } = this.state;
    var {
      txtName_branch,
      txtPhone_branch,
      txtCode_branch,
      txtPost_branch,
      txtEmail_branch,
    } = this.state;

    console.log(this.props.supplier);
    return (
      <form role="form" method="post">
        <div class="box-body">
          <div class="form-group">
            <label for="product_name">Tên Nhà cung cấp</label>
            <input
              type="text"
              class="form-control"
              id="txtName_branch"
              placeholder="Nhập tên Nhà cung cấp"
              autoComplete="off"
              value={txtName_branch || ""}
              onChange={this.onChange}
              name="txtName_branch"
            />
          </div>

          <div class="form-group">
            <label for="product_name">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="txtPhone_branch"
              placeholder="Nhập số điện thoại"
              autoComplete="off"
              value={txtPhone_branch || ""}
              onChange={this.onChange}
              name="txtPhone_branch"
            />
          </div>
          <div class="form-group">
            <label for="product_name">Email</label>
            <input
              type="text"
              class="form-control"
              id="txtEmail_branch"
              placeholder="Nhập email"
              autoComplete="off"
              value={txtEmail_branch || ""}
              onChange={this.onChange}
              name="txtEmail_branch"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="product_name">Địa chỉ chi tiết</label>
          <input
            type="text"
            class="form-control"
            id="txtAddress_detail"
            placeholder="Nhập chi tiết địa chỉ"
            autoComplete="off"
            value={txtAddress_detail || ""}
            onChange={this.onChange}
            name="txtAddress_detail"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Tỉnh/thành phố </label>

          <select
            id="input"
            class="form-control"
            value={txtProvince || ""}
            onChange={this.onChangeProvince}
            name="txtProvince"
          >
            <option value="">-- Chọn tỉnh/thành phố --</option>
            {this.showProvince(province)}
          </select>
        </div>
        <div class="form-group">
          <label for="product_name">Quận/huyện</label>

          <select
            id="input"
            class="form-control"
            value={txtDistrict || ""}
            onChange={this.onChangeDistrict}
            name="txtDistrict"
          >
            <option value="">-- Chọn quận/huyện --</option>
            {this.showDistrict(listDistrict)}
          </select>
        </div>
        <div class="form-group">
          <label for="product_name">Phường/xã</label>

          <select
            id="input"
            class="form-control"
            value={txtWards || ""}
            onChange={this.onChangeWards}
            name="txtWards"
          >
            <option value="">-- Chọn phường/xã --</option>
            {this.showWards(listWards)}
          </select>
        </div>

        <div class="box-footer">
          <button
            class={`btn btn-primary btn-sm ${isShow == true ? "show" : "hide"}`}
            onClick={this.handleOnClick}
          >
            <i class="fa fa-save"></i> Lưu
          </button>
          <a
            style={{ marginLeft: "10px" }}
            onClick={this.goBack}
            class={`btn btn-warning btn-sm color-white `}
          >
            <i class="fa fa-arrow-left"></i> Trở về
          </a>

          {/* <button onClick={this.handleOnClick} class="btn btn-info btn-icon-split btn-sm">
            <span class="icon text-white-50">
              <i class="fas fa-save"></i>
            </span>
            <span class="text">Lưu</span>
          </button>
          <a
            style={{ marginLeft: "10px" }}
            onClick={this.goBack}
            class="btn btn-warning btn-icon-split  btn-sm"
          >
            <span class="icon text-white-50">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span class="text"> Trở về</span>
          </a> */}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supplier: state.storeReducers.store.supplierID,
    auth: state.authReducers.login.authentication,
    state,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSupplierId: (store_code, supplierId) => {
      dispatch(dashboardAction.fetchSupplierId(store_code, supplierId));
    },
    editSupplier: (store_code, id, form, funcModal) => {
      dispatch(dashboardAction.editSupplier(store_code, id, form, funcModal));
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
