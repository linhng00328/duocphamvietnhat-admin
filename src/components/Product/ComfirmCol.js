import React, { Component } from "react";
import { connect } from "react-redux";
import * as productAction from "../../actions/product";
import themeData from "../../ultis/theme_data";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent_collaborator: null,
    };
  }
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    this.props.onSaveChangePercent();
    // var { id, store_code } = this.props.modal;
    // this.props.destroyProduct(store_code, id);
  };

  render() {
    var { modal } = this.props;
    var { percent_commission_for_products } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="comfirmColModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-content">
              <div
                class="modal-header"
                style={{ backgroundColor: themeData().backgroundColor }}
              >
                <h4 style={{ color: "white" }}>Thông báo</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form
                onSubmit={this.onSave}
                role="form"
                action="#"
                method="post"
                id="removeForm"
              >
                <div class="modal-body">
                  <div class="form-group">
                    <label class="form-check-label" for="gridCheck">
                      Bạn chắc chắn muốn cài đặt {this.props.percent_col}% hoa
                      đồng cho tất cả sản phẩm không? Tất cả sản phẩm bạn cài
                      đặt trước đó sẽ bị sửa!
                    </label>
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
                  <button type="submit" class="btn btn-warning">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>

            {/* <div class="modal-header" style={{ background: "#47d3b0" }}>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Bạn có muốn xóa {modal.table}: {modal.name}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
                  Xóa
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    destroyProduct: (store_code, id) => {
      dispatch(productAction.destroyProduct(store_code, id));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
