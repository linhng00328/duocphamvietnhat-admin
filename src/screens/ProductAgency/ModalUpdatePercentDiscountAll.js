import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import * as agencyAction from "../../actions/agency";
import { formatNumber } from "../../ultis/helpers";

class ModalUpdatePercentDiscountAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commission_percent: "",
    };
  }

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    if (value <= 100) {
      if (value == "") {
        this.setState({ [name]: "" });
      } else {
        this.setState({ [name]: value });
      }
    } else {
      this.setState({ [name]: 100 });
    }
  };
  setCommissionPercent = (percent) => {
    this.setState({ commission_percent: percent });
  };
  onSave = () => {
    const { store_code, updateAgencyPercentDiscount, agency_type_id } =
      this.props;
    const { commission_percent } = this.state;
    updateAgencyPercentDiscount(
      store_code,
      agency_type_id,
      {
        commission_percent: commission_percent ? Number(commission_percent) : 0,
        is_all: true,
      },
      () => {
        this.setCommissionPercent("");
      }
    );
  };

  render() {
    const { commission_percent } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updatePercentDiscountAll"
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
            <div className="modal-body">
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
                type="button"
                class="btn btn-warning"
                onClick={this.onSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgencyPercentDiscount: (store_code, id, form, funcModal) => {
      dispatch(
        agencyAction.updateAgencyPercentDiscount(
          store_code,
          id,
          form,
          funcModal
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdatePercentDiscountAll);
