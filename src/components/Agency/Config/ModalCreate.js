import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { formatNumber } from "../../../ultis/helpers";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtLimit: "",
      txtBonus: "",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      this.setState({ [name]: value });
    }
  };
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { txtBonus, txtLimit } = this.state;
    this.props.createStep(this.props.store_code, {
      bonus: txtBonus == null ? txtBonus : formatNumber(txtBonus),
      limit: txtLimit == null ? txtLimit : formatNumber(txtLimit),
    });
    this.setState({
      txtLimit: "",
      txtBonus: "",
    });
  };
  render() {
    var { txtBonus, txtLimit } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm bậc thang</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Mức</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={txtLimit}
                    onChange={this.onChange}
                    name="txtLimit"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Thưởng</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={txtBonus}
                    onChange={this.onChange}
                    name="txtBonus"
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
                  Tạo
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
    createStep: (id, form) => {
      dispatch(agencyAction.createStep(id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
