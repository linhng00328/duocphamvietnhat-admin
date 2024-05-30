import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Types from "../../constants/ActionType";
import { shallowEqual } from "../../ultis/shallowEqual";
import Alert from "../../components/Partials/Alert";
import Loading from "../Loading";
import * as dashboardAction from "../../actions/dashboard";
import ModalUpload from "../../components/Store/ModalUpload";
import * as Env from "../../ultis/default";
import { isEmpty } from "../../ultis/helpers";
import history from "../../history";
class StoreEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtId: "",
      txtName: "",
      txtAddress: "",
      txtType: "",
      image: "",
      txtCareer: "",
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.store_code);
    this.props.fetchDataId(this.props.match.params.store_code);
    this.props.fetchAllTypeStore();
  }
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.store, this.props.store) ||
      this.state.txtId == ""
    ) {
      var { store } = nextProps;

      this.setState({
        txtId: store.store_code,
        txtName: store.name ?? "",
        txtAddress: store.address ?? "",
        txtType: store.id_type_of_store ?? "",
        image: store.logo_url ?? "",
        txtCareer: store.career ?? "",
      });
    }

    if (this.props.image !== nextProps.image) {
      this.setState({ image: nextProps.image });
    }
  }

  fetchAllCareer = (typeId) => {
    var { types } = this.props;
    for (const item of types) {
      if (item.id == typeId) {
        var txtCareer = "";
        if (typeof item.childs != "undefined")
          txtCareer = item.childs.length > 0 ? item.childs[12].id : "";
        this.setState({ careers: item.childs, txtCareer: txtCareer });
        return;
      }
    }
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name == "txtType") {
      this.changeCarrea(value);
    }
    this.setState({
      [name]: value,
    });
  };

  changeCarrea = (typeId) => {
    var { types } = this.props;

    for (const item of types) {
      if (item.id == typeId) {
        var txtCareer = "";
        if (typeof item.childs != "undefined")
          txtCareer = item.childs.length > 0 ? item.childs[12].id : "";
        this.setState({ txtCareer: txtCareer });
      }
    }
  };

  onSave = (e) => {
    e.preventDefault();
    if (this.state.txtName == null || !isEmpty(this.state.txtName)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên cửa hàng không được để trống",
        },
      });
      return;
    }
    this.props.updateStore(
      {
        name: this.state.txtName,
        store_code: this.state.txtId,
        address: this.state.txtAddress,
        id_type_of_store: 1,
        logo_url: this.state.image,
        career: this.state.txtCareer,
      },
      this.props.match.params.store_code
    );
  };
  goBack = () => {
    history.goBack();
  };

  showAllTypeStore = (types) => {
    var result = null;
    if (types.length > 0) {
      result = types.map((type, index) => {
        var selected =
          type.id == this.props.store.id_type_of_store ? "selected" : null;
        return (
          <option value={type.id} {...selected}>
            {type.name}
          </option>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  showAllCareer = (types, txtType, txtCareer) => {
    var result = null;
    var _txtCareer = "";
    for (const item of types) {
      if (item.id == txtType) {
        if (typeof item.childs != "undefined") {
          if (txtCareer == null) {
            this.setState({ txtCareer: item.childs[0].id });
          }
          _txtCareer = txtCareer == null ? item.childs[0].id : txtCareer;
        }

        result = item.childs.map((_item, index) => {
          return (
            <option selected={_item.id == Number(_txtCareer)} value={_item.id}>
              {_item.name}
            </option>
          );
        });
      }
    }
    return result;
  };
  render() {
    var { store_code } = this.props.match.params;
    var { txtName, txtId, txtAddress, txtType, image, txtCareer } = this.state;
    var image = image == null || image == "" ? Env.IMG_NOT_FOUND : image;
    var { types } = this.props;
    var disableCareer = txtType == "" ? "hide" : "show";

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar isHome={true} />

              <div class="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4
                    className="h4 title_content mb-0 text-gray-800"
                    style={{
                      paddingLeft: 25,
                    }}
                  >
                    Chỉnh sửa cửa hàng
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div id="messages"></div>

                          <div class="box">
                            <form
                              role="form"
                              onSubmit={this.onSave}
                              method="post"
                            >
                              <div class="box-body">
                                <div class="form-group">
                                  <label>Ảnh: &nbsp; </label>
                                  <img
                                    src={`${image}`}
                                    width="150"
                                    height="150"
                                  />
                                </div>
                                <div class="form-group">
                                  <div class="kv-avatar">
                                    <div>
                                      <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                        data-toggle="modal"
                                        data-target="#uploadModalProfile"
                                      >
                                        <i class="fa fa-plus"></i> Upload ảnh
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label for="product_name">Mã cửa hàng</label>
                                  <div
                                    class="input-group"
                                    style={{
                                      width: 300,
                                    }}
                                  >
                                    <input
                                      disabled
                                      type="text"
                                      class="form-control"
                                      id="txtId"
                                      placeholder="Nhập mã cửa hàng"
                                      autoComplete="off"
                                      value={txtId}
                                      onChange={this.onChange}
                                      name="txtId"
                                    />
                                    <div class="input-group-append">
                                      <span
                                        class="input-group-text"
                                        id="basic-addon2"
                                      >
                                        .myiki.vn
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <strong
                                    style={{
                                      paddingBottom: 8,
                                      color: "blue",
                                      fontWeight: 300,
                                    }}
                                  >
                                    (Mã này là tên miền truy cập trang web bán
                                    hàng)
                                  </strong>
                                </div>
                                <div class="form-group">
                                  <label for="product_name">Tên cửa hàng</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="txtName"
                                    placeholder="Nhập tên cửa hàng"
                                    autoComplete="off"
                                    value={txtName}
                                    onChange={this.onChange}
                                    name="txtName"
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="product_name">Địa chỉ</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="txtAddress"
                                    placeholder="Nhập địa chỉ"
                                    autoComplete="off"
                                    value={txtAddress}
                                    onChange={this.onChange}
                                    name="txtAddress"
                                  />
                                </div>
                                <div class="form-group hide">
                                  <label for="product_name">Lĩnh vực</label>

                                  <select
                                    id="input"
                                    class="form-control"
                                    value={txtType}
                                    onChange={this.onChange}
                                    name="txtType"
                                  >
                                    <option value="">
                                      -- Chọn lĩnh vực --
                                    </option>
                                  </select>
                                </div>
                                <div class={`form-group ${disableCareer}`}>
                                  <label for="product_name">Nhóm ngành</label>

                                  <select
                                    id="input"
                                    class="form-control"
                                    value={txtCareer}
                                    onChange={this.onChange}
                                    name="txtCareer"
                                  >
                                    {this.showAllCareer(types, 1, txtCareer)}
                                  </select>
                                </div>
                              </div>

                              <div class="box-footer">
                                <button
                                  type="submit"
                                  class="btn btn-info  btn-sm"
                                >
                                  <i class="fas fa-save"></i> Lưu thay đổi
                                </button>
                                <button
                                  type="button"
                                  style={{ marginLeft: "10px" }}
                                  onClick={this.goBack}
                                  class="btn btn-warning  btn-sm"
                                >
                                  <i class="fas fa-arrow-left"></i> Trở về
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <ModalUpload image={image}></ModalUpload>
            <Footer />
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.storeReducers.store.type,
    auth: state.authReducers.login.authentication,
    store: state.storeReducers.store.storeID,
    alert: state.storeReducers.alert.alert_uid,
    image: state.UploadReducers.storeImg.store_img,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    updateStore: (form, id) => {
      dispatch(dashboardAction.updateStore(form, id));
    },
    fetchDataId: (id) => {
      dispatch(dashboardAction.fetchDataId(id));
    },
    fetchAllTypeStore: () => {
      dispatch(dashboardAction.fetchAllTypeStore());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreEdit);
