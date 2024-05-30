import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import * as agencyAction from "../../actions/agency";
import { formatNumber } from "../../ultis/helpers";
class ModalUpdateCommissionAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent_agency: "",
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
  setPercentAgency = (percent) => {
    this.setState({ percent_agency: percent });
  };
  onSave = () => {
    const { store_code, updateAgencyCommission, agency_type_id } = this.props;
    const { percent_agency } = this.state;
    updateAgencyCommission(
      store_code,
      agency_type_id,
      {
        percent_agency: percent_agency ? percent_agency : 0,
        is_all: true,
      },
      () => {
        this.setPercentAgency("");
      }
    );
  };

  render() {
    const { percent_agency } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateCommissionAll"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa hoa hồng</h4>
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
                <label for="product_name">% hoa hồng</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  placeholder="Nhập %... VD: 50"
                  autoComplete="off"
                  value={percent_agency}
                  onChange={this.onChange}
                  name="percent_agency"
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
    updateAgencyCommission: (store_code, id, form, funcModal) => {
      dispatch(
        agencyAction.updateAgencyCommission(store_code, id, form, funcModal)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateCommissionAll);
