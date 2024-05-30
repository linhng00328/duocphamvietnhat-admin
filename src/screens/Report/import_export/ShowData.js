import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format, formatNumber } from "../../../ultis/helpers";
import * as inventoryAction from "../../../actions/inventory";
import { connect } from "react-redux";
import * as Env from "../../../ultis/default";
import themeData from "../../../ultis/theme_data";
import { getBranchId } from "../../../ultis/branchUtils";
class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_item: true,
    };
  }

  handleEditStockElement = (element, distribute) => {
    this.props.handleCallBackElement({
      element: element,
      idProduct: this.props.data.id,
      NameDistribute: distribute,
      time: Date(),
    });
  };
  handleEditSubElement = (subElement, element, distribute) => {
    this.props.handleCallBackSubElement({
      sub: subElement,
      SubElement: subElement.name,
      NameElement: element,
      idProduct: this.props.data.id,
      NameDistribute: distribute,
      time: Date(),
    });
  };
  handleEditStockProduct = (data) => {
    this.props.handleCallBackProduct({ data, time: Date() });
  };
  historyInventorys = (subElement, element, nameDistribute) => {
    const branch_id = getBranchId();
    const { store_code } = this.props;
    const formData = {
      product_id: this.props.data.id,
      distribute_name: nameDistribute,
      element_distribute_name: element,
      sub_element_distribute_name: subElement.name,
    };
    this.props.historyInventorys(store_code, branch_id, formData);
  };
  historyInventory = (element, nameDistribute) => {
    const branch_id = getBranchId();
    const { store_code } = this.props;
    const formData = {
      product_id: this.props.data.id,
      distribute_name: nameDistribute,
      element_distribute_name: element.name,
      sub_element_distribute_name: "",
    };
    this.props.historyInventorys(store_code, branch_id, formData);
  };
  historyInventoryss = () => {
    const branch_id = getBranchId();
    const { store_code } = this.props;
    const formData = {
      product_id: this.props.data.id,
      distribute_name: "",
      element_distribute_name: "",
      sub_element_distribute_name: "",
    };
    this.props.historyInventorys(store_code, branch_id, formData);
  };

  showDistribute = (listDistribute, data) => {
    var result = [];
    if (typeof listDistribute == "undefined" || listDistribute.length === 0) {
      return result;
    }
    if (listDistribute.element_distributes) {
      listDistribute.element_distributes.map((element, _index) => {
        if (typeof element.sub_element_distributes != "undefined") {
          if (
            listDistribute.element_distributes[0].sub_element_distributes
              .length > 0
          ) {
            listDistribute.element_distributes[0].sub_element_distributes.map(
              (sub_element, index) => {
                const cost_of_capital =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.cost_of_capital;
                const stock =
                  listDistribute.element_distributes[_index]
                    .sub_element_distributes[index]?.stock;
                result.push(
                  <tr className="wrap-item hover-product">
                    <td></td>
                    <td className="item">
                      <img
                        src={
                          element.image_url != null
                            ? element.image_url
                            : Env.IMG_NOT_FOUND
                        }
                        alt=""
                        width="60px"
                        height="60px"
                      ></img>
                    </td>
                    <td className="item" style={{ display: "flex" }}>
                      <label style={{ color: "#ff8100" }}>
                        &nbsp;Phân loại:{" "}
                      </label>
                      <div className="name-distribute">
                        {element.name},{sub_element.name}
                      </div>
                    </td>
                    <td className="item">{format(Number(cost_of_capital))}</td>
                    <td className="item">{stock}</td>
                  </tr>
                );
              }
            );
          } else {
            result.push(
              <tr className="wrap-item hover-product">
                <td></td>

                <td className="item">
                  <img
                    src={
                      element.image_url != null
                        ? element.image_url
                        : Env.IMG_NOT_FOUND
                    }
                    alt=""
                    width="60px"
                    height="60px"
                  ></img>
                </td>
                <td className="item" style={{ display: "flex" }}>
                  <label style={{ color: "#ff8100" }}>&nbsp;Phân loại: </label>
                  <div className="name-distribute">{element.name}</div>
                </td>
                <td className="item">
                  <div className="price-distribute">
                    {format(Number(element.cost_of_capital))}
                  </div>
                </td>
                <td className="item">
                  <div className="quantity-distribute">{element.stock}</div>
                </td>
              </tr>
            );
          }
        }
      });
    }
    return result;
  };

  render() {
    const {
      product_discount,
      data,
      per_page,
      current_page,
      index,
      store_code,
      page,
      historyInventory,
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

    return (
      <>
        <tr className="hover-product" style={{ background: "#e3e6f04d" }}>
          <td>{per_page * (current_page - 1) + (index + 1)}</td>
          <td>
            <img
              src={
                data.images.length > 0
                  ? data.images[0].image_url
                  : Env.IMG_NOT_FOUND
              }
              alt=""
              width="60px"
              height="60px"
            ></img>
          </td>
          <td>
            {/* <Link to={`/product/edit/${store_code}/${data.id}/${page}`}> */}
            <div style={{}}>{data.name}</div>
            {/* </Link> */}
          </td>
          {data.inventory.distributes.length === 1 ? (
            <>
              <td></td>
              <td></td>
              <td></td>
            </>
          ) : (
            <>
              <td>{format(Number(data.inventory.main_cost_of_capital))}</td>

              <td>{data.inventory.main_stock}</td>
            </>
          )}
        </tr>

        {this.showDistribute(listDistribute, data)}
      </>
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
