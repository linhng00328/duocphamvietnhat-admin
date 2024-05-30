import React, { Component } from "react";
import * as SaleAction from "../../../actions/sale";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import themeData from "../../../ultis/theme_data";
import * as Types from "../../../constants/ActionType";
import { formatNumber } from "../../../ultis/helpers";

class ModalUpdate extends Component {
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
  shouldComponentUpdate(nextProps, nextState) {
    const { updatedSuccessfully, resetStatusUpdateStep } = this.props;

    if (
      !shallowEqual(updatedSuccessfully, nextProps.updatedSuccessfully) &&
      nextProps.updatedSuccessfully
    ) {
      window.$(".modal").modal("hide");
      resetStatusUpdateStep();
    }

    return true;
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
    const { id, txtLimit, txtBonus } = this.state;
    const { updateStep, store_code } = this.props;
    updateStep(store_code, id, {
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
        id="updateModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa bậc thang</h4>

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
              id="removeForm"
            >
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Mức doanh số</label>
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
const mapStateToProps = (state) => {
  return {
    updatedSuccessfully: state.saleReducers.sale.updatedSuccessfully,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateStep: (store_code, id, data) => {
      dispatch(SaleAction.updateStep(store_code, id, data));
    },
    resetStatusUpdateStep: () => {
      dispatch({ type: Types.UPDATE_SALE_STEP, data: false });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdate);
