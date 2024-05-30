import React, { Component } from "react";
import * as CollaboratorAction from "../../../actions/agency";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";

import { formatNumber } from "../../../ultis/helpers";

class ModalUpdateImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtBonus: "",
      id: "",
      txtLimit: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var step = nextProps.modal;
      this.setState({
        txtLimit:
          step.limit == null
            ? null
            : new Intl.NumberFormat().format(step.limit.toString()),
        id: step.id,
        txtBonus:
          step.bonus == null
            ? null
            : new Intl.NumberFormat().format(step.bonus.toString()),
      });
    }
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
    var { id, txtLimit, txtBonus } = this.state;
    window.$(".modal").modal("hide");

    this.props.updateStep(this.props.store_code, id, {
      bonus: txtBonus == null ? txtBonus : formatNumber(txtBonus),
      limit: txtLimit == null ? txtLimit : formatNumber(txtLimit),
    });
  };

  render() {
    var { txtBonus, txtLimit } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalImport"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Chỉnh sửa bậc thang</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={() => this.props.setModalUpdateImport({})}
              >
                &times;
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
                  <label for="product_name">Mức</label>
                  <input
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
                  onClick={() => this.props.setModalUpdateImport({})}
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
    updateStep: (store_code, id, data) => {
      dispatch(CollaboratorAction.updateStepImport(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalUpdateImport);
