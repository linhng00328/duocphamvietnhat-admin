import React, { Component } from "react";
import { connect } from "react-redux";
import * as bonusProductAction from "../../../../actions/bonus_product";
import { getBranchId } from "../../../../ultis/branchUtils";
import themeData from "../../../../ultis/theme_data";

class ModalDelete extends Component {
  onSave = (e) => {
    e.preventDefault();
    const {
      groupId,
      bonusProductId,
      store_code,
      setStatusDefault,
      handleFetchDataByRemoveGroup,
    } = this.props;
    const data = { group_product: groupId };
    this.props.destroyBonusProductItem(store_code, bonusProductId, data, () => {
      handleFetchDataByRemoveGroup();
      setStatusDefault();
      window.$(".modal").modal("hide");
    });
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeBonusProductItemModal"
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
                  <input type="hidden" name="remove_id_store" />
                  <div class="alert-remove"></div>
                  Bạn có chắc chắn muốn xóa nhóm tặng thưởng này không?
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    destroyBonusProductItem: (store_code, id, data, onSucess) => {
      dispatch(
        bonusProductAction.destroyBonusProductItem(
          store_code,
          id,
          data,
          onSucess
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalDelete);
