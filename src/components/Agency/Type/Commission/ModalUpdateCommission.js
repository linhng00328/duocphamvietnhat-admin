import React, { Component } from "react";
import * as agencyAction from "../../../../actions/agency";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import { connect } from "react-redux";
import themeData from "../../../../ultis/theme_data";
import { int } from "react-resize-panel";

class ModalUpdateCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      id: "",
      valid: false,
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
  };
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var modalUpdateCommission = nextProps.modal;
      this.setState({
        txtName: modalUpdateCommission.name,
        id: modalUpdateCommission.id,
        commission_percent: modalUpdateCommission.commission_percent,
        valid: false,
      });
    }
  }

  onSave = (e) => {
    window.$(".modal").modal("hide");

    var { txtName, id, commission_percent } = this.state;
    this.props.updateAgencyType(this.props.store_code, id, {
      name: this.props.modal?.name,
      commission_percent: parseFloat(commission_percent),
    });
    this.setState({
      txtName: "",
    });
  };
  render() {
    var { txtName, commission_percent, id, valid } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateCommission"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa chiết khấu</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              {valid == false ? (
                <div class="form-group">
                  <label for="product_name">% Chiếu khấu sản phẩm</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Nhập %... VD: 50"
                    autoComplete="off"
                    value={commission_percent}
                    onChange={this.onChange}
                    name="commission_percent"
                  />
                </div>
              ) : (
                <div class="form-group">
                  <label for="product_name">
                    Bạn có chắc chắn muốn cài đặt{" "}
                    <span style={{ color: "red" }}>{commission_percent}%</span>{" "}
                    hoa hồng cho tất cả sản phẩm không? Tất cả sản phẩm bạn cài
                    đặt trước đó sẽ bị sửa!
                  </label>
                </div>
              )}
            </div>

            <div class="modal-footer">
              <button
                onClick={() => {
                  this.setState({
                    valid: false,
                  });
                  window.$(".modal").modal("hide");
                }}
                class="btn btn-default"
                data-dismiss="modal"
              >
                Đóng
              </button>
              {valid == false ? (
                <button
                  onClick={() => {
                    this.setState({
                      valid: true,
                    });
                  }}
                  class="btn btn-warning"
                >
                  Lưu
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.onSave();
                    this.setState({
                      valid: false,
                    });
                  }}
                  class="btn btn-warning"
                >
                  Đồng ý
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgencyType: (store_code, id, form) => {
      dispatch(agencyAction.updateAgencyType(store_code, id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateCommission);
