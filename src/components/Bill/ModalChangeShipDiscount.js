import React, { Component } from "react";
import { connect } from "react-redux";
import * as billAction from "../../actions/bill";
import {
  filter_var,
  formatNumber,
  format,
  formatVND,
  formatNoD,
} from "../../ultis/helpers";
import themeData from "../../ultis/theme_data";

class ModalPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_shipping_fee: 0,
    };
  }

  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { total_shipping_fee } = this.state;
    this.props.updateShip(total_shipping_fee);
  };
  componentDidMount() {
    this.setState({ total_shipping_fee: this.props.total_shipping_fee });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.total_shipping_fee !== this.props.total_shipping_fee) {
      this.setState({ total_shipping_fee: nextProps.total_shipping_fee });
    }
  }

  onChange = (e) => {
    var value = formatNumber(e.target.value);

    this.setState({ total_shipping_fee: value });
  };

  render() {
    var { total_shipping_fee } = this.state;

    console.log(total_shipping_fee);
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalShipAmount"
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
                <h4 style={{ color: "white" }}>Thay đổi phí vận chuyển</h4>
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
                    <label for="product_name">Phí vận chuyển</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      value={formatNoD(total_shipping_fee)}
                      name="txtName"
                      placeholder="Số tiền KH cần thanh toán"
                      autoComplete="off"
                      onChange={this.onChange}
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
                  <button
                    onClick={this.onSave}
                    type="submit"
                    style={{ backgroundColor: themeData().backgroundColor }}
                    class="btn btn-warning"
                  >
                    Lưu
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
    updateStatusPayment: (data, store_code, billId, order_code) => {
      dispatch(
        billAction.updateStatusPayment(data, store_code, billId, order_code)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalPayment);
