import React, { Component } from "react";
import * as saleAction from "../../../actions/sale";
import { connect, shallowEqual } from "react-redux";
import { formatNumber } from "../../../ultis/helpers";
import themeData from "../../../ultis/theme_data";
import * as Types from "../../../constants/ActionType";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtLimit: "",
      txtBonus: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { addedSuccessfully, resetStatusAddStep } = this.props;

    if (
      !shallowEqual(addedSuccessfully, nextProps.addedSuccessfully) &&
      nextProps.addedSuccessfully
    ) {
      this.setState({ txtLimit: "", txtBonus: "" });
      window.$(".modal").modal("hide");
      resetStatusAddStep();
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
    const { txtBonus, txtLimit } = this.state;
    const { store_code, addStep } = this.props;
    const form = {
      bonus: txtBonus == null ? txtBonus : formatNumber(txtBonus),
      limit: txtLimit == null ? txtLimit : formatNumber(txtLimit),
    };
    addStep(store_code, form);
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
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thêm bậc thang</h4>

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
                  <label for="product_name">Mức doanh số</label>
                  <input
                    required
                    type="text"
                    class="form-control"
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
const mapStateToProps = (state) => {
  return {
    addedSuccessfully: state.saleReducers.sale.addedSuccessfully,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    addStep: (store_code, form) => {
      dispatch(saleAction.addStep(store_code, form));
    },
    resetStatusAddStep: () => {
      dispatch({ type: Types.ADD_SALE_STEP, data: false });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
