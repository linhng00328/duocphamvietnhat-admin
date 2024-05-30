import React, { Component } from "react";
import * as otpUnitActions from "../../actions/otp_unit";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import Upload from "../Upload";
import * as Types from "../../constants/ActionType";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      token: "",
      sender: "",
      content: "",
      image_url: "",
      is_order: false,
      content_order: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var otpUnit = nextProps.modal;
      this.setState({
        id: otpUnit.id,
        token: otpUnit.token,
        sender: otpUnit.sender,
        content: otpUnit.content,
        image_url: otpUnit.image_url,
        is_order: otpUnit.is_order,
        content_order: otpUnit.content_order,
      });
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

  onChangeSelect = (e) => {
    var target = e.target;
    var name = target.name;
    var checked = target.checked;

    this.setState({
      [name]: checked,
    });
  };
  setImage = (image) => {
    this.setState({ image_url: image });
  };

  onSave = (e) => {
    e.preventDefault();

    var otpUnit = this.state;
    if (!otpUnit.content?.includes("{") || !otpUnit.content?.includes("{")) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "{otp} là bắt buộc trong nội dung",
        },
      });
      return;
    }
    this.props.updateOtpUnit(
      this.props.store_code,
      otpUnit.id,
      {
        token: otpUnit.token,
        sender: otpUnit.sender,
        content: otpUnit.content,
        is_order: otpUnit.is_order,
        image_url: otpUnit.image_url,
        content_order: otpUnit.content_order,
      },
      () => {
        window.$(".modal").modal("hide");
      }
    );
  };
  render() {
    var { token, sender, content, image_url, is_order, content_order } =
      this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateOtpUnitModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chỉnh sửa đơn vị cài đặt</h4>

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
                {/* <div className="form-group">
                  <label
                    for="txtName"
                    style={{
                      fontWeight: "750",
                    }}
                  >
                    Hình ảnh
                  </label>
                  <div className="gameGuessNumber__imageContent">
                    <Upload
                      setFile={this.setImage}
                      file={image_url}
                      image={image_url}
                    />
                  </div>
                </div> */}
                <div class="form-group">
                  <label for="product_name">BranchName </label>
                  <input
                    type="text"
                    class="form-control"
                    id="sender"
                    placeholder="Nhập BranchName"
                    autoComplete="off"
                    value={sender}
                    onChange={this.onChange}
                    name="sender"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Mã token </label>
                  <input
                    type="text"
                    class="form-control"
                    id="token"
                    placeholder="Nhập mã Token nhà vận chuyển"
                    autoComplete="off"
                    value={token}
                    onChange={this.onChange}
                    name="token"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">
                    Nội dung ( {`{otp}`} là bắt buộc trong nội dung )
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="VD: Mã xác nhận của bạn là {otp}"
                    autoComplete="off"
                    value={content}
                    onChange={this.onChange}
                    name="content"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Bật gửi OTP đơn hàng</label>
                  <label className="status-product">
                    <input
                      type="checkbox"
                      hidden
                      name="is_order"
                      value={is_order}
                      checked={is_order}
                      onChange={this.onChangeSelect}
                    />
                    <div></div>
                  </label>
                </div>
                {is_order ? (
                  <div class="form-group">
                    <label for="product_name">Nội dung đơn hàng</label>
                    <p
                      style={{
                        fontStyle: "italic",
                        color: "#787878",
                      }}
                    >{`{name} là tên khách hàng, {order_code} là mã đơn hàng, {total} là tổng tiền hàng`}</p>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content_order"
                      placeholder="VD: Cam on {name} da mua don hang {order_code} voi tong tien la: {total}"
                      autoComplete="off"
                      value={content_order}
                      onChange={this.onChange}
                      name="content_order"
                    />
                  </div>
                ) : null}
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
    updateOtpUnit: (store_code, id, data, onSuccess) => {
      dispatch(otpUnitActions.updateOtpUnit(store_code, id, data, onSuccess));
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
