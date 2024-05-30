import React, { Component } from "react";
import { connect } from "react-redux";
import * as productAction from "../../../actions/product";
import themeData from "../../../ultis/theme_data";

class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { data, store_code } = this.props.multi;
    const { page, limit, searchValue } = this.props;
    var params = `${
      searchValue ? `&search=${searchValue}` : ""
    }&limit=${limit}`;

    this.props.destroyMultiProduct(store_code, data, page, params);
  };

  render() {
    var { multi } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeMultiModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thông báo</h4>{" "}
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
                Bạn có muốn xóa{" "}
                {multi.data.length === 1
                  ? "sản phẩm"
                  : `${multi.data.length} sản phẩm`}{" "}
                này không?
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
                  Xóa
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
    destroyMultiProduct: (store_code, data, page, params) => {
      dispatch(
        productAction.destroyMultiProduct(store_code, data, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
