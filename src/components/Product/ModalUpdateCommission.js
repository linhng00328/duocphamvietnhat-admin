import React, { Component } from "react";
import { connect } from "react-redux";
import themeData from "../../ultis/theme_data";
import * as agencyAction from "../../actions/agency";
import * as productAction from "../../actions/product";
import { formatNumber } from "../../ultis/helpers";
class ModalUpdateCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent_collaborator: null,
    };
  }
  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  setPercenCollaborator = (percent) => {
    this.setState({ percent_collaborator: percent });
  };
  onSave = () => {
    const { store_code, arrayCheckBox, changePercentCol, resetSelected } =
      this.props;
    const { percent_collaborator } = this.state;

    changePercentCol(
      store_code,
      {
        percent_collaborator: percent_collaborator ? percent_collaborator : 0,
        product_ids: arrayCheckBox,
      },
      () => {
        this.setPercenCollaborator("");
        resetSelected();
        window.$(".modal").modal("hide");
        this.props.handleFetchAllProduct();
      }
    );
  };

  render() {
    const { percent_collaborator } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateCommissionProduct"
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
                  class="form-control"
                  placeholder="Nhập %... VD: 50"
                  autoComplete="off"
                  value={percent_collaborator}
                  onChange={this.onChange}
                  name="percent_collaborator"
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
                disabled={percent_collaborator === ""}
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
    changePercentCol: (store_code, data, onSuccess) => {
      dispatch(productAction.changePercentCol(store_code, data, onSuccess));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateCommission);
