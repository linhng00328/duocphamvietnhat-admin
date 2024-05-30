import React, { Component } from "react";
import * as shipmentPAction from "../../actions/shipment";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtToken: "",
      id: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var shipment = nextProps.modal;
      this.setState({
        txtToken: shipment.token,
        id: shipment.id,
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

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");

    var shipment = this.state;
    this.props.updateShipment(this.props.store_code, shipment.id, {
      token: shipment.txtToken,
      use: true,
    });
  };
  render() {
    var { txtToken } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chỉnh sửa</h4>

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
                <div class="form-group">
                  <label for="product_name">Mã token </label>
                  <input
                    type="text"
                    class="form-control"
                    id="txtToken"
                    placeholder="Nhập mã Token nhà vận chuyển"
                    autoComplete="off"
                    value={txtToken}
                    onChange={this.onChange}
                    name="txtToken"
                  />
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
    updateShipment: (store_code, id, data) => {
      dispatch(shipmentPAction.updateShipment(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdate);
