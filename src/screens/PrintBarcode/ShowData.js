import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, formatNumber } from "../../ultis/helpers";
import * as inventoryAction from "../../actions/inventory";
import { connect } from "react-redux";
import getChannel, { IKITECH } from "../../ultis/channel";
import * as Env from "../../ultis/default";
import { shallowEqual } from "../../ultis/shallowEqual";
class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuantity: 1,
    };
  }

  addQuantity = (productId) => {
    var newQuantity = parseInt(this.state.currentQuantity + 1);

    this.props.onChangeQuantity(productId, newQuantity);
    this.setState({
      currentQuantity: newQuantity,
    });
  };
  subQuantity = (productId) => {
    var newQuantity = parseInt(this.state.currentQuantity - 1);
    this.props.onChangeQuantity(productId, newQuantity);

    this.setState({
      currentQuantity: newQuantity,
    });
  };
  handleOnChange = (e) => {
    const { data } = this.props;

    if (e.target.value == "") {
      e.target.value = 0;
    }

    var newQuantity = parseInt(e.target.value) ?? 1;
    this.props.onChangeQuantity(data.id, newQuantity);
    this.setState({
      currentQuantity: newQuantity,
    });
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    const {
      product_discount,
      min_price,
      max_price,
      data,
      store_code,
      page,
      distributes,
    } = this.props;
    const listDistribute =
      data.inventory?.distributes !== null &&
      data.inventory?.distributes.length > 0
        ? data.inventory?.distributes[0]
        : [];

    let discount_percent = null;

    if (product_discount) {
      discount_percent = product_discount.value;
    }

    console.log(listDistribute, distributes);

    return (
      <tr className="hover-product">
        <td>{listDistribute.id ? "" : data.barcode}</td>

        <td>
          <Link to={`/product/edit/${store_code}/${data.id}?page=${page}`}>
            {data.name}
          </Link>
        </td>

        <td>
          <div>
            {min_price === max_price ? (
              format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                )
              )
            ) : distributes && distributes.length == 0 ? (
              format(
                Number(
                  discount_percent == null
                    ? min_price
                    : min_price - min_price * discount_percent * 0.01
                )
              )
            ) : (
              <div>
                {format(
                  Number(
                    discount_percent == null
                      ? min_price
                      : min_price - min_price * discount_percent * 0.01
                  )
                )}
                {" - "}
                {format(
                  Number(
                    discount_percent == null
                      ? max_price
                      : max_price - max_price * discount_percent * 0.01
                  )
                )}
              </div>
            )}
          </div>

          {product_discount && (
            <div
              style={{
                float: "left",
              }}
            >
              {min_price === max_price ? (
                format(Number(min_price))
              ) : (
                <div className="row">
                  <div
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    {format(Number(min_price))}
                    {" - "}
                    {format(Number(max_price))}
                  </div>

                  <div className="discount">&emsp; -{discount_percent}%</div>
                </div>
              )}
            </div>
          )}
        </td>

        <td>
          <div className="quantity" style={{ paddingLeft: "0" }}>
            <div
              className=""
              style={{
                float: "left",
                border: "1px solid #9c9898ba",
                borderRadius: "2px",
                display: "flex"
              }}
            >
              <button
                disabled={this.state.currentQuantity == 1}
                className="btn-sub"
                onClick={() => this.subQuantity(data.id)}
                style={{ width: "20px", border: "none" }}
              >
                -
              </button>
              <input
                className="input-quantity"
                onChange={this.handleOnChange}
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontWeight: "400",
                }}
                value={this.state.currentQuantity ?? 0}
              ></input>
              <button
                className="btn-add"
                onClick={() => this.addQuantity(data.id)}
                style={{ width: "20px", border: "none" }}
              >
                +
              </button>
            </div>
          </div>
        </td>

        <td>
          <button
            onClick={(e) => this.props.removeProduct(data.id)}
            data-toggle="modal"
            data-target="#removeModal"
            class={`btn btn-danger btn-sm show"
              }`}
          >
            <i class="fa fa-trash"></i> Xóa
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    historyInventory:
      state.inventoryReducers.inventory_reducer.historyInventory,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    historyInventorys: (store_code, branch_id, data) => {
      dispatch(inventoryAction.historyInventorys(store_code, branch_id, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
