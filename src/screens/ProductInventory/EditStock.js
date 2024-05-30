import React, { Component } from "react";
import { formatNumber, formatNoD } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";

class EditStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost_of_capital: "",
      quantity_in_stock: "",
      nameElement: "",
      nameSubElement: "",
      idProduct: "",
      NameDistribute: "",
      productInven: "",
    };
  }
  onChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    const _value = formatNumber(value);
    console.log(_value);
    if (!isNaN(Number(_value))) {
      if (e.target.value === "") {
        this.setState({ [name]: "" });
      } else {
        this.setState({ [name]: _value });
      }
    }
  };

  handleEditStock = () => {
    const formdata = {
      product_id: this.state.idProduct,
      stock: this.state.quantity_in_stock,
      cost_of_capital: this.state.cost_of_capital,
      distribute_name: this.state.NameDistribute,
      element_distribute_name: this.state.nameElement,
      sub_element_distribute_name: this.state.nameSubElement,
    };
    this.props.editStockCallBack(formdata);
  };
  handleReset = () => {
    this.setState({
      cost_of_capital: "",
      quantity_in_stock: "",
      nameElement: "",
      nameSubElement: "",
      idProduct: "",
      NameDistribute: "",
      productInven: "",
    });
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (!shallowEqual(nextProps.modalSub, this.props.modalSub)) {
      console.log("aaaaaaaaa", nextProps.modalSub);
      var cost_of_capital = nextProps.modalSub.sub.cost_of_capital;

      this.setState({
        cost_of_capital:
          typeof cost_of_capital !== "undefined" && cost_of_capital !== 0
            ? Math.ceil(cost_of_capital)
            : 0,

        quantity_in_stock: nextProps.modalSub.sub.stock,
        nameElement: nextProps.modalSub.NameElement,
        nameSubElement: nextProps.modalSub.SubElement,
        NameDistribute: nextProps.modalSub.NameDistribute,
        idProduct: nextProps.modalSub.idProduct,
      });
    }
    if (!shallowEqual(nextProps.modalElement, this.props.modalElement)) {
      console.log("bbbbbbbbbbbb", nextProps.modalElement);
      var cost_of_capital = nextProps.modalElement.element.cost_of_capital;

      this.setState({
        cost_of_capital:
          typeof cost_of_capital !== "undefined" && cost_of_capital !== 0
            ? Math.ceil(cost_of_capital)
            : 0,

        quantity_in_stock: nextProps.modalElement.element.stock,
        NameDistribute: nextProps.modalElement.NameDistribute,
        idProduct: nextProps.modalElement.idProduct,
        nameSubElement: "",
        nameElement: nextProps.modalElement.element.name,
      });
    }
    if (!shallowEqual(nextProps.modalProduct, this.props.modalProduct)) {
      var cost_of_capital =
        nextProps.modalProduct.data.inventory?.main_cost_of_capital;
      console.log("ccccccccccccc", nextProps.modalProduct);
      this.setState({
        cost_of_capital:
          typeof cost_of_capital !== "undefined" && cost_of_capital !== 0
            ? Math.ceil(cost_of_capital)
            : 0,

        quantity_in_stock: nextProps.modalProduct.data.inventory?.main_stock,
        idProduct: nextProps.modalProduct.data.id,
        nameSubElement: "",
        nameElement: "",
        NameDistribute: "",
      });
    }
  }

  render() {
    const { cost_of_capital, quantity_in_stock } = this.state;
    console.log(formatNoD(cost_of_capital), cost_of_capital);

    return (
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Chỉnh sửa kho hoặc giá vốn</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="product_name">Giá vốn</label>
                <input
                  type="text"
                  class="form-control"
                  id="customer_copyright"
                  autoComplete="off"
                  onChange={this.onChange}
                  value={formatNoD(cost_of_capital)}
                  name="cost_of_capital"
                />
              </div>
              <div class="form-group">
                <label for="product_name">Tồn kho</label>
                <input
                  type="text"
                  class="form-control"
                  id="customer_copyright"
                  autoComplete="off"
                  onChange={this.onChange}
                  value={formatNoD(quantity_in_stock)}
                  name="quantity_in_stock"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={this.handleReset}
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-warning"
                onClick={() => this.handleEditStock()}
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#ModalAlert"
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

export default EditStock;
