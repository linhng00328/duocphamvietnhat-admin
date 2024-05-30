import React, { Component } from "react";
import * as saleAction from "../../../actions/sale";
import { connect, shallowEqual } from "react-redux";
import themeData from "../../../ultis/theme_data";
import * as Types from "../../../constants/ActionType";

class ModalRemove extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { removedSuccessfully, resetStatusDeleteStep } = this.props;

    if (
      !shallowEqual(removedSuccessfully, nextProps.removedSuccessfully) &&
      nextProps.removedSuccessfully
    ) {
      this.setState({ txtLimit: "", txtBonus: "" });
      window.$(".modal").modal("hide");
      resetStatusDeleteStep();
    }

    return true;
  }
  onSave = (e) => {
    e.preventDefault();

    const { store_code, modal, removeStep } = this.props;
    removeStep(store_code, modal.id);
  };

  render() {
    var { modal } = this.props;
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
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Bạn có chắc chắn muốn xóa mức thưởng này không?
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

const mapStateToProps = (state) => {
  return {
    removedSuccessfully: state.saleReducers.sale.removedSuccessfully,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    removeStep: (store_code, id) => {
      dispatch(saleAction.removeStep(store_code, id));
    },
    resetStatusDeleteStep: () => {
      dispatch({ type: Types.REMOVE_SALE_STEP, data: false });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalRemove);
