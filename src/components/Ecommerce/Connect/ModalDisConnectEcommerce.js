import React, { Component } from "react";
import * as ecommerceAction from "../../../actions/ecommerce";
import { connect } from "react-redux";

class ModalDisConnectEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSave = (e) => {
    e.preventDefault();
    const { disconnectEcommerce, onClose, store_code, ecommerceSelected } =
      this.props;

    disconnectEcommerce(store_code, ecommerceSelected?.shop_id, () => {
      onClose();
      window.$(".modal").modal("hide");
    });
  };
  render() {
    var { ecommerceSelected, onClose } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalDisConnectEcommerce"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <h4
                class="modal-title"
                style={{
                  color: "#414141",
                }}
              >
                Gỡ kết nối {ecommerceSelected?.platform}
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={() => onClose(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                Bạn có muốn gỡ kết nối cửa hàng{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {ecommerceSelected?.shop_name} ?
                </span>
              </div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-success">
                  Lưu
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => onClose(false)}
                >
                  Đóng
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
    disconnectEcommerce: (store_code, shop_id, funcModal) => {
      dispatch(
        ecommerceAction.disconnectEcommerce(store_code, shop_id, funcModal)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalDisConnectEcommerce);
