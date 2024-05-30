import React, { Component } from "react";
import { connect } from "react-redux";
import * as StoreAAction from "../../../actions/store_address";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { isEmail, isEmpty, isPhone } from "../../../ultis/helpers";

import * as placeAction from "../../../actions/place";
import * as Types from "../../../constants/ActionType";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone: "",
      txtAddress_detail: "",
      txtCountry: 1,
      txtProvince: "",
      txtDistrict: "",
      txtWards: "",
      txtEmail: "",
      txtPickup: "",
      txtReturn: "",
      isLoaded: false,
      listWards: [],
      listDistrict: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    var { store_address } = this.props;
    if (!shallowEqual(nextProps.store_address, store_address)) {
      nextProps.store_address.forEach((store) => {
        if (store.id == nextProps.storeAId) {
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
          });
        }
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

    this.setState({
      [name]: value,
    });
  };
  onChangeProvince = (e) => {
    console.log(e.target.value);
    this.setState({
      txtProvince: e.target.value,
      isLoaded: true,
      txtDistrict: "",
      txtWards: "",
    });
    this.props.fetchPlaceDistrict_Wards(e.target.value);
  };
  onChangeDistrict = (e) => {
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

    var { storeAId, store_code } = this.props;
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
    if (isEmpty(this.state.txtEmail) && !isEmail(this.state.txtEmail)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Email không hợp lệ",
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
      storeAId,
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
        branch_id: this.props.currentBranch.id,
      },
      store_code
    );
  };

  render() {
    var { province } = this.props;

    var {
      txtName,
      txtAddress_detail,
      txtProvince,
      txtDistrict,
      txtWards,
      txtEmail,
      txtPickup,
      txtReturn,
      listDistrict,
      listWards,
      txtPhone,
    } = this.state;
    var checkPickup = txtPickup == "0" || txtPickup == "" ? false : true;
    var checkReturn = txtReturn == "0" || txtReturn == "" ? false : true;
    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
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
              <label for="product_name">Email</label>
              <input
                type="text"
                class="form-control"
                id="txtEmail"
                placeholder="Nhập Email"
                autoComplete="off"
                value={txtEmail}
                onChange={this.onChange}
                name="txtEmail"
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
                value={txtAddress_detail}
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
                onChange={this.onChange}
                name="txtWards"
              >
                <option value="">-- Chọn phường/xã --</option>

                {this.showWards(listWards)}
              </select>
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                checked={checkPickup}
                id="exampleCheck1"
                name="txtPickup"
                onChange={this.onChangeCheck}
                value={txtPickup}
              />
              <label class="form-check-label" for="exampleCheck1">
                Đặt làm địa chỉ lấy hàng
              </label>
            </div>

            <div class="form-group form-check">
              <input
                checked={checkReturn}
                value={txtReturn}
                onChange={this.onChangeCheck}
                name="txtReturn"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Đặt làm địa chỉ trả hàng
              </label>
            </div>
          </div>

          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Lưu
            </button>
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentBranch: state.branchReducers.branch.currentBranch,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateStoreA: (storeAId, form, store_code) => {
      dispatch(StoreAAction.updateStoreA(storeAId, form, store_code));
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
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
