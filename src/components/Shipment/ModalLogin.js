import React, { Component } from "react";
import * as shipmentPAction from "../../actions/shipment";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import { isEmpty } from "../../ultis/helpers";
class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USERNAME: "",
      PASSWORD: "",
      CUSTOMERCODE: "",
      CONTRACTCODE: "",
      toggle: false,
      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
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

  onSave = (e) => {
    e.preventDefault();
    var { USERNAME, PASSWORD, CUSTOMERCODE, CONTRACTCODE } = this.state;
    if (!isEmpty(USERNAME) || !isEmpty(PASSWORD)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Điền đầy đủ thông tin và mật khẩu",
        },
      });
      return;
    }

    if (this.props.modalId == 2) {
      this.props.loginShipment(this.props.store_code, this.props.modalId, {
        USERNAME: USERNAME,
        PASSWORD: PASSWORD,
      });
    }

    if (this.props.modalId == 3) {
      this.props.loginShipmentVietNamPost(
        this.props.store_code,
        this.props.modalId,
        {
          USERNAME: USERNAME,
          PASSWORD: PASSWORD,
          CUSTOMERCODE: CUSTOMERCODE,
          CONTRACTCODE: CONTRACTCODE,
        }
      );
    }

    if (this.props.modalId == 4) {
      this.props.loginShipmentNhatTin(
        this.props.store_code,
        this.props.modalId,
        {
          USERNAME: USERNAME,
          PASSWORD: PASSWORD,
          CUSTOMERCODE: CUSTOMERCODE,
        }
      );
    }

    window.$(".modal").modal("hide");
  };

  togglePASSWORD = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  buildGuide = (id) => {
    if (id == 2) {
      return (
        <span>
          Bạn cần đăng ký Viettel Post tại đây{" "}
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            target="_blank"
            href="https://viettelpost.vn/"
          >
            https://viettelpost.vn{" "}
          </a>
          &nbsp;và cung cấp tài khoản của bạn ở đây để thực hiện kết nối và lấy
          token
        </span>
      );
    }

    if (id == 3) {
      return (
        <span>
          Bạn cần đăng ký VietNam Post tại đây{" "}
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            target="_blank"
            href="https://my.vnpost.vn/"
          >
            https://my.vnpost.vn/{" "}
          </a>
          &nbsp;và cung cấp tài khoản của bạn ở đây để thực hiện kết nối và lấy
          token
        </span>
      );
    }

    if (id == 4) {
      return (
        <span>
          Bạn cần đăng ký Nhất Tín tại đây{" "}
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            target="_blank"
            href="https://ntlogistics.vn/"
          >
            https://ntlogistics.vn/{" "}
          </a>
          &nbsp;và cung cấp tài khoản của bạn ở đây để thực hiện kết nối và lấy
          token
        </span>
      );
    }
  };

  render() {
    var {
      PASSWORD,
      USERNAME,
      CUSTOMERCODE,
      CONTRACTCODE,
      toggle,
      iconHide,
      iconShow,
    } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalLogin"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Đăng nhập</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="updateForm"
            >
              <div class="modal-body">
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img src={this.props.imgViettelPost} height={150} />
                </div>
                <div style={{ marginTop: "7px", marginBottom: "35px" }}></div>
                {this.buildGuide(this.props.modalId)}
                <div class="form-group" style={{ marginTop: "15px" }}>
                  <label for="product_name">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtToken"
                    placeholder="Nhập số điện thoại đăng nhập Viettel Post"
                    autoComplete="off"
                    value={USERNAME}
                    onChange={this.onChange}
                    name="USERNAME"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Mật khẩu</label>
                  <input
                    type={toggle == true ? "text" : "PASSWORD"}
                    class="form-control"
                    id="txtToken"
                    placeholder="Nhập mật khẩu"
                    autoComplete="off"
                    value={PASSWORD}
                    onChange={this.onChange}
                    name="PASSWORD"
                  />
                  <span
                    onClick={this.togglePASSWORD}
                    toggle="#PASSWORD-field"
                    class={toggle ? iconShow : iconHide}
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "-25px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  ></span>
                </div>
                {this.props.modalId == 3 || this.props.modalId == 4 ? (
                  <div class="form-group">
                    <label for="product_name">Mã khách hàng</label>
                    <input
                      type={toggle == true ? "text" : "CUSTOMERCODE"}
                      class="form-control"
                      id="txtToken"
                      placeholder="Nhập mã khách hàng"
                      autoComplete="off"
                      value={CUSTOMERCODE}
                      onChange={this.onChange}
                      name="CUSTOMERCODE"
                    />
                  </div>
                ) : null}
                {this.props.modalId == 3 && (
                  <div class="form-group">
                    <label for="product_name">Mã hợp đồng</label>
                    <input
                      type={toggle == true ? "text" : "CONTRACTCODE"}
                      class="form-control"
                      id="txtToken"
                      placeholder="Nhập mã hợp đồng"
                      autoComplete="off"
                      value={CONTRACTCODE}
                      onChange={this.onChange}
                      name="CONTRACTCODE"
                    />
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
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
    loginShipment: (store_code, id, data) => {
      dispatch(shipmentPAction.loginShipment(store_code, id, data));
    },
    loginShipmentVietNamPost: (store_code, id, data) => {
      dispatch(shipmentPAction.loginShipmentVietNamPost(store_code, id, data));
    },
    loginShipmentNhatTin: (store_code, id, data) => {
      dispatch(shipmentPAction.loginShipmentNhatTin(store_code, id, data));
    },

    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
