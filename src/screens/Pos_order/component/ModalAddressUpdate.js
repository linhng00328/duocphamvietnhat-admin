import React, { Component } from "react";
import themeData from "../../../ultis/theme_data";
import { connect } from "react-redux";
import * as StoreAAction from "../../../actions/store_address";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as placeAction from "../../../actions/place";
import { isEmail, isEmpty, isPhone } from "../../../ultis/helpers";

import * as Types from "../../../constants/ActionType";

class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone: "",
      CtxtName: "",
      CtxtPhone: "",
      txtAddress_detail: "",
      txtCountry: 1,
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      CtxtAddress_detail: "",

      CtxtProvince: "",
      CtxtDistrict: "",
      CtxtWards: "",

      txtEmail: "",
      txtPickup: "",
      txtReturn: "",
      isLoaded: false,
      listWards: [],
      listDistrict: [],
      type: "UPDATE",
    };
  }
  componentWillReceiveProps(nextProps) {
    var { store_address } = this.props;
    if (
      (!shallowEqual(nextProps.store_address, store_address) ||
        nextProps.resetId != this.props.resetId) &&
      nextProps.store_address
    ) {
      var store = nextProps.store_address;
      this.props.fetchPlaceWards(store.district);
      this.props.fetchPlaceDistrict(store.province);
      var ckeckPickup = store.is_default_pickup == true ? "1" : "0";
      var ckeckReturn = store.is_default_return == true ? "1" : "0";
      this.setState({
        txtName: store.name,
        txtAddress_detail: store.address_detail,
        txtCountry: store.country,
        txtProvince: store.province,
        txtDistrict: store.district,
        txtWards: store.wards,
        txtEmail: store.email,
        txtPhone: store.phone,
        txtPickup: ckeckPickup,
        txtReturn: ckeckReturn,
        type: "UPDATE",
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
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  onChangeProvince = (e) => {
    var { type } = this.state;
    this.setState({ txtProvince: e.target.value, isLoaded: true });

    this.props.fetchPlaceDistrict_Wards(e.target.value);
  };
  onChangeDistrict = (e) => {
    var { type } = this.state;
    this.setState({ txtDistrict: e.target.value });

    this.props.fetchPlaceWards(e.target.value);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  onChangeCheck = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (!e.target.checked) this.setState({ [name]: "0" });
    else this.setState({ [name]: "1" });
  };
  onSave = (e) => {
    e.preventDefault();

    var { store_address, store_code } = this.props;
    var is_default_pickup =
      this.state.txtPickup == "0" || this.state.txtPickup == "" ? false : true;
    var is_default_return =
      this.state.txtReturn == "0" || this.state.txtPickup == "" ? false : true;
    if (
      this.state.txtName == null ||
      !isEmpty(this.state.txtName) ||
      !isEmpty(this.state.txtAddress_detail)
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng nhập đầy đủ thông tin",
        },
      });
      return;
    }

    if (!isPhone(this.state.txtPhone)) {
      {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "SDT không hợp lệ",
          },
        });
        return;
      }
    }
    this.props.updateStoreA(
      store_address.id,
      {
        name: this.state.txtName,
        address_detail: this.state.txtAddress_detail,
        country: this.state.txtCountry,
        province: this.state.txtProvince,
        district: this.state.txtDistrict,
        wards: this.state.txtWards,
        email: this.state.txtEmail,
        phone: this.state.txtPhone,
        is_default_pickup: is_default_pickup,
        is_default_return: is_default_return,
      },
      store_code,
      function () {
        window.$(".modal").modal("hide");
      }
    );
  };

  render() {
    var {
      txtName,
      CtxtName,
      type,
      txtAddress_detail,
      txtProvince,
      txtDistrict,
      txtWards,
      CtxtAddress_detail,
      CtxtProvince,
      CtxtDistrict,
      CtxtWards,
      txtEmail,
      txtPickup,
      txtReturn,
      listDistrict,
      listWards,
      txtPhone,
      CtxtPhone,
    } = this.state;
    var { province } = this.props;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalAddressUpdate"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ background: themeData().backgroundColor }}
            >
              <h4
                style={{
                  color: "white",
                }}
              >
                {type == "UPDATE" ? "Chỉnh sửa" : "Thêm mới"} địa chỉ lấy hàng{" "}
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form role="form" action="#" method="post" id="removeForm">
              <div class="modal-body" style={{ padding: " 0 10px" }}>
                <div class="form-group">
                  <label for="product_name">Họ tên</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập họ tên"
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtPhone"
                    placeholder="Nhập số điện thoại"
                    autoComplete="off"
                    value={txtPhone}
                    onChange={this.onChange}
                    name="txtPhone"
                  />
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
                {/* <div class="form-group">
              <label for="product_name">Quốc gia</label>

              <select
                id="input"
                class="form-control"
                value={txtCountry}
                onChange={this.onChange}
                name="txtCountry"
              >
                <option value="">-- Chọn quốc gia --</option>
                <option value="1">Việt Nam</option>
              </select>
            </div> */}
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
                    <option value="">-- Chọn Quận/huyện --</option>
                    {this.showDistrict(listDistrict)}
                  </select>
                </div>
                <div class="form-group">
                  <label for="product_name">Phường/xã</label>

                  <select
                    id="input"
                    class="form-control"
                    value={txtWards || ""}
                    onChange={this.onChange}
                    name="txtWards"
                  >
                    <option value="">-- Chọn phường xã --</option>
                    {this.showWards(listWards)}
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                {/* <button type="button" onClick={this.changeModal} class="btn btn-primary">
                  Thêm mới

                </button> */}
                <button
                  type="button"
                  onClick={this.onSave}
                  class="btn btn-yes-pos"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateStoreA: (storeAId, form, store_code, funcModal) => {
      dispatch(
        StoreAAction.updateStoreA(storeAId, form, store_code, funcModal)
      );
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
    createStoreA: (store_code, form, funcModal) => {
      dispatch(StoreAAction.createStoreA(store_code, form, funcModal));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
