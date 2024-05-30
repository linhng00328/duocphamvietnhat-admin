import React, { Component } from "react";
import * as Env from "../../ultis/default";

class ItemDetail extends Component {
  render() {
    const { listItem } = this.props;
    return (
      <div
        className="list-group-item"
        style={{
          marginBottom: "10px",
          borderTopWidth: "1px",
          borderRadius: "7px",
        }}
      >
        <div className="" style={{ display: "flex", padding: "0px" }}>
          <img
            src={
              listItem.product.images.length > 0
                ? listItem.product.images[0].image_url
                : Env.IMG_NOT_FOUND
            }
            alt=""
            width="40px"
            style={{ width: "100px", height: "100px" }}
          ></img>
          <div
            className="wrap-name"
            style={{ marginLeft: "10px", width: "77%" }}
          >
            <div style={{ display: "flex" }}>
              <div
                className="price-order"
                style={{ color: "gray", marginRight: "5px" }}
              >
                Tên:
              </div>
              <div className="name-order">{listItem.product.name}</div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                className="price-order"
                style={{ color: "gray", marginRight: "5px" }}
              >
                Phân loại:
              </div>
              <div className="name-order">
                {listItem.element_distribute_name
                  ? `${listItem.element_distribute_name} `
                  : ""}
                {listItem.sub_element_distribute_name
                  ? `${listItem.sub_element_distribute_name}`
                  : ""}
              </div>
            </div>
            <div
              className="wrap-iventory"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="exist-branch"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span style={{ color: "gray" }}>Tồn chi nhánh:</span>
                <div style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  {listItem.existing_branch}
                </div>
              </div>
              <div
                className="reality-branch"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span style={{ color: "gray" }}>Chênh lệch:</span>
                <div style={{ marginLeft: "5px", color: "red" }}>
                  {listItem.deviant}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ItemDetail;
