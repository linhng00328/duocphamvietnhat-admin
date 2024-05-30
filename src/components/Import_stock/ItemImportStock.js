import React, { Component } from "react";
import {
  format,
  formatNumber,
  formatNoD,
  formatVND,
} from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";

class ItemImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuantity: 1,
      distribute: "",
      item: "",
      import_price: 0,
    };
    this.nameElementDistribute = "";
    this.nameSubElementDistribute = "";
  }
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(this.props.item.quantity, nextProps.item.quantity) ||
      !shallowEqual(this.props.item.import_price, nextProps.item.import_price)
    ) {
      this.setState({
        currentQuantity: nextProps.item.quantity,
        import_price: nextProps.item.import_price,
        item: nextProps.item,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const elementId = nextProps.item.element_id;
    if (!shallowEqual(this.state.currentQuantity, nextState.currentQuantity)) {
      this.props.handleCallbackQuantity({
        currentQuantity: nextState.currentQuantity,
        idElement: elementId,
      });
    }
    if (!shallowEqual(this.state.import_price, nextState.import_price)) {
      this.props.handleCallbackPrice({
        import_price: nextState.import_price,
        idElement: elementId,
      });
    }

    if (!shallowEqual(this.state.item, nextState.item)) {
      this.setState({ currentQuantity: nextState.item.reality_exist });
    }
    if (
      !shallowEqual(this.state.currentQuantity, nextProps.item.reality_exist)
    ) {
      this.setState({ currentQuantity: nextProps.item.reality_exist });
    }
    if (!shallowEqual(this.state.import_price, nextProps.item.import_price)) {
      this.setState({ import_price: nextProps.item.import_price });
    }
    return true;
  }
  componentDidMount = () => {
    this.setState({ item: this.props.item });
  };
  onChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      if (e.target.value === "") {
        this.setState({ [name]: "" });
      } else {
        this.setState({ [name]: _value });
      }
    }
    // this.setState({ import_price: e.target.value })
  };

  subQuantity() {
    const q =
      this.state.currentQuantity - 1 < 0 ? 0 : this.state.currentQuantity - 1;
    this.setState({
      currentQuantity: q,
    });
  }

  addQuantity() {
    const q = this.state.currentQuantity + 1;
    this.setState({ currentQuantity: q });
  }
  handleDelete(id) {
    this.props.handleDelete({ idElement: id });
  }
  handleOnChange = (e) => {
    this.setState({ currentQuantity: e.target.value });
  };

  render() {
    const { currentQuantity, import_price } = this.state;

    const { item, index } = this.props;
    var value_import = "";
    try {
      value_import = format(import_price).slice(0, -2);
    } catch (error) {
      value_import = formatNoD(import_price);
    }
    return (
      <div
        className="list-group-item"
        key={index}
        style={{
          marginBottom: "10px",
          borderTopWidth: "1px",
          borderRadius: "7px",
        }}
      >
        <div
          className="row"
          style={{ position: "relative", width: "100%", margin: "0" }}
        >
          <div className="col-8" style={{ padding: "0px" }}>
            <div className="wrap-name">
              <div style={{ display: "flex" }}>
                <div
                  className="price-order"
                  style={{ color: "gray", marginRight: "5px" }}
                >
                  Tên:
                </div>
                <div className="name-order">{item.nameProduct}</div>
              </div>
              {item.nameElement || item.nameSubDistribute ? (
                <div style={{ display: "flex" }}>
                  <div
                    className="price-order"
                    style={{ color: "gray", marginRight: "5px" }}
                  >
                    Phân loại:
                  </div>
                  <div className="name-order">
                    {item.nameElement ? `${item.nameElement} ` : ""}
                    {item.nameSubDistribute ? item.nameSubDistribute : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-4" style={{ paddingLeft: "0" }}>
            <div
              className=""
              style={{
                float: "right",
                border: "1px solid #9c9898ba",
                borderRadius: "2px",
              }}
            >
              <button
                className="btn-sub"
                onClick={() => this.subQuantity()}
                style={{ width: "20px", border: "none" }}
              >
                -
              </button>
              <input
                className="input-quantity"
                onChange={this.handleOnChange}
                style={{ width: "40px", textAlign: "center" }}
                value={currentQuantity}
              ></input>
              <button
                className="btn-add"
                onClick={() => this.addQuantity()}
                style={{ width: "20px", border: "none" }}
              >
                +
              </button>
            </div>
          </div>
          <a
            style={{
              position: "absolute",
              right: "-10px",
              top: "-10px",
              color: "red",
            }}
            onClick={() => this.handleDelete(item.element_id)}
          >
            <i class="fas fa-close close-status "></i>
          </a>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div
            className="price-order"
            style={{ color: "gray", marginRight: "5px", width: "75%" }}
          >
            Giá nhập:
          </div>
          <input
            type="text"
            name="import_price"
            class="form-importStock"
            id="usr"
            style={{
              height: "28px",
              width: "100px",
              textAlign: "right",
              borderRadius: 0,
              borderBottom: "1px solid rgb(128 128 128 / 71%)",
            }}
            value={value_import}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default ItemImportStock;
