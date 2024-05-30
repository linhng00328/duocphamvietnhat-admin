import React, { Component } from "react";
import { connect } from "react-redux";
import * as dashboardAction from "../../actions/dashboard";
import themeData from "../../ultis/theme_data";
class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var id = this.props.id_supplier;
    var { store_code, paginate, searchValue } = this.props;
    const params = searchValue ? `search=${searchValue}` : "";
    this.props.deleteSupplier(store_code, id, paginate, params);
  };
  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              className="model-header-modal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: themeData().backgroundColor,
              }}
            >
              <h4 style={{ color: "white", margin: "10px" }}>Thông báo</h4>{" "}
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
                Bạn có muốn xóa nhà cung cấp này không?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-yes-pos">
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
    deleteSupplier: (store_code, id, page, params) => {
      dispatch(dashboardAction.deleteSupplier(store_code, id, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
