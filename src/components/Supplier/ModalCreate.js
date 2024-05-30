import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmail, isEmpty, isPhone } from "../../ultis/helpers";
import Validator from "../../ultis/validator";
import themeData from "../../ultis/theme_data";

class ModalCreate extends Component {
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
      listWards: [],
      listDistrict: [],
      txtName_branch: "",
      txtPhone_branch: "",
      txtCode_branch: "",
      txtPost_branch: "",
      txtEmail_branch: "",
      error_email: { status: false, text: "" },
      error_phone: { status: false, text: "" },
      errors: {},
    };
    const rules = [
      {
        field: "txtName_branch",
        method: "isEmpty",
        validWhen: false,
        message: "Tên không được để trống.",
      },

      {
        field: "txtPhone_branch",
        method: "isLength",
        args: [{ min: 10, max: 12 }],
        validWhen: true,
        message: "Số điện thoại không hợp lệ.",
      },
    ];
    this.validator = new Validator(rules);
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
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
  goBack = () => {
    var { history } = this.props;
    history.goBack();
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
    if (nextProps.openModal == true) {
      this.setState({
        provinceName: "",
        districtName: "",
        wardsName: "",
        txtAddress_detail: "",
        txtCountry: 1,
        txtProvince: "",
        txtDistrict: "",
        txtWards: "",
        isLoaded: false,
        listWards: [],
        listDistrict: [],
        txtName_branch: "",
        txtPhone_branch: "",
        txtEmail_branch: "",
      });
      this.props.resetModal();
    }
  }
  handleOnClick = () => {
    const errors = this.validator.validate(this.state);

    var {
      txtAddress_detail,
      txtDistrict,
      txtProvince,
      txtWards,
      txtName_branch,
      txtPhone_branch,
      txtCode_branch,
      txtPost_branch,
      txtEmail_branch,
    } = this.state;
    const { store_code } = this.props;
    var error = false;
    this.setState({
      errors: errors,
    });
    if (Object.keys(errors).length > 0) {
      error = true;
    }
    if (!isEmail(txtEmail_branch) && isEmpty(txtEmail_branch)) {
      error = true;
      this.setState({
        error_email: { text: "Email không đúng định dạng", status: true },
      });
    } else {
      this.setState({ error_email: { text: "", status: false } });
    }
    if (!isPhone(txtPhone_branch)) {
      error = true;
      this.setState({
        error_phone: { text: "SDT không đúng định dạng", status: true },
      });
    } else {
      this.setState({ error_phone: { text: "", status: false } });
    }
    if (error == true) return;
    const Formdata = {
      name: txtName_branch,
      phone: txtPhone_branch,
      email: txtEmail_branch,
      branch_code: txtCode_branch,
      province: txtProvince,
      district: txtDistrict,
      wards: txtWards,
      address_detail: txtAddress_detail,
      postcode: txtPost_branch,
      is_default: true,
    };
    this.props.createSupplier(store_code, Formdata, function () {
      window.$(".modal").modal("hide");
    });
    // this.setState({
    //     provinceName: "",
    //     districtName: "",
    //     wardsName: "",
    //     txtAddress_detail: "",
    //     txtCountry: 1,
    //     txtProvince: "",
    //     txtDistrict: "",
    //     txtWards: "",
    //     isLoaded: false,
    //     listWards: [],
    //     listDistrict: [],
    //     txtName_branch:"",
    //     txtPhone_branch:"",
    //     txtEmail_branch:""
    // })
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
      error_email,
      error_phone,
      errors,
    } = this.state;
    var { txtName_branch, txtPhone_branch, txtEmail_branch } = this.state;
    return (
      <>
        {this.state.status && (
          <div
            class="alert alert-danger alert-dismissible"
            style={{ position: "fixed", top: "10px" }}
          >
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Chưa nhập đủ thông tin địa chỉ</strong>
          </div>
        )}

        <div class="modal" id="modalAddress">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: themeData().backgroundColor,
                }}
              >
                <h4 style={{ color: "white", margin: "10px" }}>
                  Tạo nhà cung cấp
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <React.Fragment>
                  <form role="form">
                    <div className="row">
                      <div className="col-6 box-body-left">
                        <div class="form-group">
                          <label for="product_name">Tên nhà cung cấp</label>
                          <input
                            type="text"
                            class="form-control"
                            id="txtName_branch"
                            placeholder="Nhập tên nhà cung cấp"
                            autoComplete="off"
                            value={txtName_branch || ""}
                            onChange={this.onChange}
                            name="txtName_branch"
                          />
                          {errors.txtName_branch && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {errors.txtName_branch}
                            </div>
                          )}
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
                          {error_phone.status && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {error_phone.text}
                            </div>
                          )}
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
                          {error_email.status && (
                            <div
                              className="validation"
                              style={{ display: "block" }}
                            >
                              {error_email.text}
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-6 box-body-right">
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
                      </div>
                    </div>
                  </form>
                </React.Fragment>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  onClick={this.handleOnClick}
                  class="btn btn-warning"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    createSupplier: (id, form, funcModal) => {
      dispatch(dashboardAction.createSupplier(id, form, funcModal));
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
  };
};

export default connect(null, mapDispatchToProps)(ModalCreate);
