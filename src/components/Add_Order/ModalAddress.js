import React, { Component } from "react";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as StoreAAction from "../../actions/store_address";
import * as placeAction from "../../actions/place";
import { connect } from "react-redux";

class ModalAddress extends Component {
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
  }
  handleOnClick = () => {
    var { txtAddress_detail, txtDistrict, txtProvince, txtWards } = this.state;
    this.props.handleCallbackAddress({
      address_detail: txtAddress_detail,
      province: txtProvince,
      district: txtDistrict,
      wards: txtWards,
    });

    this.props.handleCallbackName({
      address_detail: this.state.txtAddress_detail,
      province: this.state.provinceName,
      district: this.state.districtName,
      wards: this.state.wardsName,
    });

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
    });
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
    } = this.state;

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
          <div class="modal-dialog">
            <div class="modal-content">
              <div
                className="model-header-modal"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 15px",
                }}
              >
                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>
                  Chọn địa chỉ khách hàng
                </p>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <React.Fragment>
                  <form role="form">
                    <div class="box-body">
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

                    <div class="box-footer">
                      <a
                        class="btn btn-info btn-icon-split btn-sm"
                        onClick={this.handleOnClick}
                        data-dismiss="modal"
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-save"></i>
                        </span>
                        <span class="text">Chọn</span>
                      </a>
                    </div>
                  </form>
                </React.Fragment>
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
    createStoreA: (id, form) => {
      dispatch(StoreAAction.createStoreA(id, form));
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
export default connect(null, mapDispatchToProps)(ModalAddress);
