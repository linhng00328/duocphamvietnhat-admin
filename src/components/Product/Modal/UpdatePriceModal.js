import React, { Component } from "react";
import * as CollaboratorAction from "../../../actions/collaborator";
import * as productAction from "../../../actions/product";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import themeData from "../../../ultis/theme_data";
import { formatNumber } from "../../../ultis/helpers";
import Distribute from "../Update/Distribute";
import { forEach } from "lodash";

class UpdatePriceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtNewPrice: "",
      id: "",
      product: {},
      distribute: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.modal, this.props.modal)) {
      var product = nextProps.modal;

      this.setState({
        id: product.id,
        product: product,
        distribute:
          product.distributes.length > 0 ? product.distributes[0] : {},
        txtNewPrice:
          product.price == null
            ? null
            : new Intl.NumberFormat().format(product.price.toString()),
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      const price =
        _value != null
          ? _value.toString().replace(/,/g, "").replace(/\./g, "")
          : 0;

      value = new Intl.NumberFormat().format(price);
      this.setState({ [name]: value });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    var { id, txtNewPrice } = this.state;
    window.$(".modal").modal("hide");

    var { store_code } = this.props;
    if (this.state.product?.distributes?.length > 0) {
      var distribute = this.state.distribute;
      var has_sub = false;
      if (
        distribute.element_distributes[0].sub_element_distributes.length > 0
      ) {
        has_sub = true;
      }

      distribute.element_distributes.forEach((ele) => {
        const price =
          ele.price != null
            ? ele.price
                .toString()
                .replace(",", "")
                .replace(/,/g, "")
                .replace(/\./g, "")
            : 0;

        ele.price = Number(price);

        const import_price =
          ele.import_price != null
            ? ele.import_price
                .toString()
                .replace(",", "")
                .replace(/,/g, "")
                .replace(/\./g, "")
            : 0;

        ele.import_price = Number(import_price);

        ele.is_edit = true;
        ele.before_name = ele.name;
        ele.sub_element_distributes.forEach((sub) => {
          const price =
            sub.price != null
              ? sub.price
                  .toString()
                  .replace(",", "")
                  .replace(/,/g, "")
                  .replace(/\./g, "")
              : 0;
          sub.price = price;

          const import_price =
            sub.import_price != null
              ? sub.import_price
                  .toString()
                  .replace(",", "")
                  .replace(/,/g, "")
                  .replace(/\./g, "")
              : 0;

          sub.import_price = Number(import_price);

          sub.before_name = sub.name;
          sub.is_edit = true;
        });
      });

      this.props.updateDistributeWithoutBranch(
        store_code,
        {
          ...distribute,
          distribute_name: distribute.name,
          has_distribute: true,
          has_sub,
        },
        this.state.id
      );
    } else {
      this.props.updatePriceOneProduct(
        this.props.store_code,
        id,
        txtNewPrice == null ? txtNewPrice : formatNumber(txtNewPrice)
      );
    }
  };

  handleDataFromDistribute = (data) => {
    console.log(data);
    this.setState((prevState, props) => {
      return { distribute: data[0] };
    });
  };

  render() {
    var { txtNewPrice, product } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="updateModalNewPrice"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh nhanh giá</h4>

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
                <Distribute
                  isSpeedEdit={true}
                  disableDistribute={true} //disableDistribute
                  disableInventory={true} //disableInventory
                  onChangeQuantityStock={this.onChangeQuantityStock}
                  product={product}
                  handleDataFromDistribute={this.handleDataFromDistribute}
                  isHide={this.state.product?.distributes?.length == 0}
                />
              </div>

              {this.state.product?.distributes?.length == 0 && (
                <div class="modal-body">
                  <div class="form-group">
                    <label for="product_name">Giá mới</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtNewPrice"
                      placeholder="Nhập giá..."
                      autoComplete="off"
                      value={txtNewPrice}
                      onChange={this.onChange}
                      name="txtNewPrice"
                    />
                  </div>
                </div>
              )}

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
    updateStep: (store_code, id, data) => {
      dispatch(CollaboratorAction.updateStep(store_code, id, data));
    },
    updateDistributeWithoutBranch: (store_code, id, data) => {
      dispatch(
        productAction.updateDistributeWithoutBranch(store_code, id, data)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(UpdatePriceModal);
