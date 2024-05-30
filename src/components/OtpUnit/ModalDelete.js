import React, { Component } from "react";
import * as otpUnitActions from "../../actions/otp_unit";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import Upload from "../Upload";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      sender: "",
      title: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var otpUnit = nextProps.modal;
      this.setState({
        id: otpUnit.id,
        sender: otpUnit.sender,
        title: otpUnit.title,
      });
    }
  }

  onSave = (e) => {
    e.preventDefault();

    var otpUnit = this.state;
    this.props.destroyOtpUnit(
      this.props.store_code,
      {
        otp_unit_ids: [otpUnit.id],
      },
      () => {
        window.$(".modal").modal("hide");
      }
    );
  };
  render() {
    var { sender, title } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="deleteOtpUnitModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{title}</h4>

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
                <p>Bạn có chắc chắn muốn xóa đơn vị {sender} không ?</p>
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
    destroyOtpUnit: (store_code, data, onSuccess) => {
      dispatch(otpUnitActions.destroyOtpUnit(store_code, data, onSuccess));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
