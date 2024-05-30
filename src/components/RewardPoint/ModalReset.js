import React, { Component } from "react";
import * as rewardPointAtion from "../../actions/reward_point";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";

class ModalReset extends Component {
  constructor(props) {
    super(props);
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    this.props.resetRewardPoint(this.props.store_code);
  };

  render() {
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="resetModal"
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
                Các cài đặt điểm thưởng sẽ trở lại mặc định. Bạn có muốn tiếp
                tục?
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
                  Đồng ý
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
    resetRewardPoint: (store_code, form) => {
      dispatch(rewardPointAtion.resetRewardPoint(store_code, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalReset);
