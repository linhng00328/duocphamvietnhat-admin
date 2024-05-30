import React, { Component } from "react";
import { formatNumber, formatNoD } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import themeData from "../../ultis/theme_data";

class EditListStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost_of_capital: "",
      quantity_in_stock: "",
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
    const { editListItemSelected, listItemSelected } = this.props;
    const { cost_of_capital, quantity_in_stock } = this.state;
    const newListItemSelected = listItemSelected.map((item) => ({
      ...item,
      cost_of_capital: cost_of_capital ? Number(cost_of_capital) : 0,
      stock: quantity_in_stock ? Number(quantity_in_stock) : 0,
    }));

    const data = {
      products_inventory: newListItemSelected,
    };

    editListItemSelected(data, () => {
      this.handleReset();
      window.$(".modal").modal("hide");
    });
  };
  handleReset = () => {
    this.setState({
      cost_of_capital: "",
      quantity_in_stock: "",
    });
  };

  render() {
    const { cost_of_capital, quantity_in_stock } = this.state;

    return (
      <div class="modal" id="listStockModal">
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
                onClick={this.handleReset}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="cost_of_capital">Giá vốn</label>
                <input
                  type="text"
                  class="form-control"
                  id="cost_of_capital"
                  autoComplete="off"
                  onChange={this.onChange}
                  value={formatNoD(cost_of_capital)}
                  name="cost_of_capital"
                />
              </div>
              <div class="form-group">
                <label for="quantity_in_stock">Tồn kho</label>
                <input
                  type="text"
                  class="form-control"
                  id="quantity_in_stock"
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
                onClick={this.handleEditStock}
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

export default EditListStock;
