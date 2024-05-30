import React, { Component } from "react";
import * as Env from "../../../ultis/default";
import styled from "styled-components";
import { connect } from "react-redux";
import { formatNumberV2 } from "../../../ultis/helpers";
import ModalCustom from "./ModalCustom";
import * as ecommerceAction from "../../../actions/ecommerce";

const TableProductStyles = styled.div`
  .dropdown__product {
    position: relative;
    .dropdown__product__menu {
      position: absolute;
      top: calc(100% + 2px);
      right: 0;
      z-index: 100;
      padding: 0.5rem 0;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.1875rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      .dropdown__product__item {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }

  .product__name {
    position: relative;
    .product__name__content {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 600;
    }
    .product_noteTooltip {
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      font-weight: 400;
      width: 100%;
      max-width: 300px;
      padding: 10px;
      border-radius: 10px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }
    &:hover {
      .product_noteTooltip {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .copy {
    position: relative;
    .copy_noteTooltip {
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      font-weight: 400;
      width: 90px;
      padding: 10px;
      border-radius: 5px;
      transition: all 0.5s;
    }
  }
  .product_children {
    td {
      border-top: none !important;
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelected: null,
      error: "",
      price: "",
      textEcommerceCopySuccess: "",
      listIdProducts: [],
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }
  setListIdProducts = (id) => {
    this.setState({ listIdProducts: [...this.state.listIdProducts, id] });
  };
  handleSetTimeSkuCopy = (sku) => {
    this.setState({ textEcommerceCopySuccess: sku });
    setTimeout(() => {
      this.setState({ textEcommerceCopySuccess: "" });
    }, 800);
  };

  handleClickOutside = (e) => {
    const isDropdownToggle = e.target.closest(".dropdown__product__toggle");
    if (!isDropdownToggle) {
      this.setState({
        productSelected: null,
      });
    }
  };

  handleShowActions = (data) => {
    this.setState({
      productSelected: data,
      price: data.price ? formatNumberV2(data.price) : "",
    });
  };

  handleOpenModal = () => {
    window.removeEventListener("click", this.handleClickOutside);
  };
  handleCloseModal = () => {
    this.setState({
      productSelected: null,
      error: "",
    });
    window.addEventListener("click", this.handleClickOutside);
  };
  //HandlePrice
  handleSubmitModalPrice = () => {
    const { price, productSelected } = this.state;
    const {
      updatePriceProductEcommerce,
      store_code,
      fetchListProductEcommerce,
    } = this.props;
    if (price === "") {
      this.setState({
        error: "Dữ liệu chưa hợp lệ",
      });
      return;
    }
    const data = {
      price: price?.toString().replace(/\./g, ""),
    };
    updatePriceProductEcommerce(store_code, data, productSelected?.id, () => {
      window.$(".modal").modal("hide");
      this.handleCloseModal();
      fetchListProductEcommerce();
    });
  };

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: formatNumberV2(value),
      error: "",
    });
  };

  handleCopy = (sku) => {
    this.handleSetTimeSkuCopy(sku);
    navigator.clipboard.writeText(sku);
  };
  handleShowStock = (children) => {
    if (children.length > 0) {
      return children.reduce((prevChild, currentChild) => {
        return prevChild + currentChild.quantity_in_stock;
      }, 0);
    }

    return 0;
  };
  handleShowPrice = (children) => {
    if (children.length > 0 && children.length === 1) {
      return children[0]?.price
        ? `${formatNumberV2(children[0]?.price)} đ`
        : "0 đ";
    } else if (children.length > 0 && children.length > 1) {
      let minPrice = children[0].price;
      let maxPrice = children[0].price;
      for (let child of children) {
        if (child.price > maxPrice) {
          maxPrice = child.price;
        } else if (child.price < minPrice) {
          minPrice = child.price;
        }
      }
      return minPrice !== maxPrice
        ? `${formatNumberV2(minPrice)} đ - ${formatNumberV2(maxPrice)} đ`
        : `${formatNumberV2(minPrice)} đ`;
    } else {
      return 0;
    }
  };
  handleShowChildren = (id, show) => {
    if (show) {
      this.setListIdProducts(id);
    } else {
      const { listIdProducts } = this.state;
      const newListIds = listIdProducts.filter((idProduct) => idProduct != id);
      this.setState({ listIdProducts: newListIds });
    }
  };

  showData = (products, per_page, current_page) => {
    var result = null;
    const { productSelected, textEcommerceCopySuccess, listIdProducts } =
      this.state;

    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data) => {
        if (data.children?.length > 0 && data.children?.length === 1) {
          return (
            <tr key={data?.children[0]?.id}>
              <td>
                {" "}
                <div
                  style={{
                    display: "flex",
                    columnGap: "0.875rem",
                  }}
                >
                  <div>
                    <img
                      src={
                        data.children[0]?.images?.length > 0
                          ? data?.children[0]?.images[0]
                          : Env.IMG_NOT_FOUND
                      }
                      className="img-responsive"
                      alt="image_product"
                      style={{
                        width: "80px",
                        height: "90px",
                        background: "#0000000d",
                      }}
                    />
                  </div>
                  <div>
                    <div className="product__name">
                      <div className="product__name__content">{data.name} </div>
                      <div className="product_noteTooltip">{data.name}</div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8c8c8c",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px",
                      }}
                    >
                      SKU: {data.sku_in_ecommerce}{" "}
                      <span className="copy">
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          dataIcon="copy"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          ariaHidden="true"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => this.handleCopy(data.sku_in_ecommerce)}
                        >
                          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                        </svg>
                        <div
                          className="copy_noteTooltip"
                          style={{
                            opacity:
                              textEcommerceCopySuccess === data.sku_in_ecommerce
                                ? 1
                                : 0,
                            visibility:
                              textEcommerceCopySuccess === data.sku_in_ecommerce
                                ? "visible"
                                : "hidden",
                          }}
                        >
                          Đã sao chép
                        </div>
                        {/* {textEcommerceCopySuccess === data.sku_in_ecommerce && (
                        )} */}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ width: "10%" }}>
                {this.handleShowStock(data.children)}
              </td>
              <td style={{ width: "20%" }}>
                {this.handleShowPrice(data.children)}
              </td>
              <td style={{ width: "15%" }}>{data?.children[0]?.updated_at}</td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span class="dropdown__product">
                  <span
                    className="dropdown__product__toggle"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleShowActions(data.children[0])}
                  >
                    <i className="fa fa-bars"></i>
                  </span>
                  <div
                    class="dropdown__product__menu"
                    style={{
                      display:
                        productSelected?.id == data.children[0]?.id
                          ? "block"
                          : "none",
                    }}
                  >
                    <div
                      className="dropdown__product__item"
                      type="button"
                      data-toggle="modal"
                      data-target="#updatePriceProductEcommerce"
                      onClick={this.handleOpenModal}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </span>
                      <span>Sửa giá</span>
                    </div>
                  </div>
                </span>
              </td>
            </tr>
          );
        } else {
          return (
            <>
              <tr key={data?.children[0]?.id}>
                <td>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      columnGap: "0.875rem",
                    }}
                  >
                    <div>
                      <img
                        src={
                          data.children[0]?.images?.length > 0
                            ? data?.children[0]?.images[0]
                            : Env.IMG_NOT_FOUND
                        }
                        className="img-responsive"
                        alt="image_product"
                        style={{
                          width: "80px",
                          height: "90px",
                          background: "#0000000d",
                        }}
                      />
                    </div>
                    <div>
                      <div className="product__name">
                        <div className="product__name__content">
                          {data.name}{" "}
                        </div>
                        <div className="product_noteTooltip">{data.name}</div>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#8c8c8c",
                          display: "flex",
                          alignItems: "center",
                          columnGap: "5px",
                        }}
                      >
                        SKU: {data.parent_sku_in_ecommerce}{" "}
                        <span className="copy">
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            dataIcon="copy"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            ariaHidden="true"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.handleCopy(data.parent_sku_in_ecommerce)
                            }
                          >
                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                          </svg>
                          <div
                            className="copy_noteTooltip"
                            style={{
                              opacity:
                                textEcommerceCopySuccess ===
                                data.parent_sku_in_ecommerce
                                  ? 1
                                  : 0,
                              visibility:
                                textEcommerceCopySuccess ===
                                data.parent_sku_in_ecommerce
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            Đã sao chép
                          </div>
                          {/* {textEcommerceCopySuccess === data.sku_in_ecommerce && (
                        )} */}
                        </span>
                      </div>
                      {listIdProducts.includes(data.children[0]?.id) ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "5px",
                            color: "#1890ff",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.handleShowChildren(data.children[0]?.id, false)
                          }
                        >
                          <span>Thu gọn 2 lựa chọn</span>
                          <span>
                            <i className="fa fa-angle-up"></i>
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "5px",
                            color: "#1890ff",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            this.handleShowChildren(data.children[0]?.id, true)
                          }
                        >
                          <span>Xem thêm 2 lựa chọn</span>
                          <span>
                            <i className="fa fa-angle-down"></i>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ width: "10%" }}>
                  {this.handleShowStock(data.children)}
                </td>
                <td style={{ width: "20%" }}>
                  {this.handleShowPrice(data.children)}
                </td>
                <td style={{ width: "15%" }}>
                  {data?.children[0]?.updated_at}
                </td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {data?.children?.length === 1 && (
                    <span class="dropdown__product">
                      <span
                        className="dropdown__product__toggle"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleShowActions(data.children[0])}
                      >
                        <i className="fa fa-bars"></i>
                      </span>
                      <div
                        class="dropdown__product__menu"
                        style={{
                          display:
                            productSelected?.id == data.children[0]?.id
                              ? "block"
                              : "none",
                        }}
                      >
                        <div
                          className="dropdown__product__item"
                          type="button"
                          data-toggle="modal"
                          data-target="#updatePriceProductEcommerce"
                          onClick={this.handleOpenModal}
                        >
                          <span
                            style={{
                              marginRight: "10px",
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </span>
                          <span>Sửa giá</span>
                        </div>
                      </div>
                    </span>
                  )}
                </td>
              </tr>
              {listIdProducts.includes(data?.children[0].id) && (
                <>
                  {data?.children?.map((child) => (
                    <tr key={child.id} className="product_children">
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "10px",
                            paddingLeft: "20px",
                          }}
                        >
                          <div>
                            <svg
                              width="12"
                              height="19"
                              viewBox="0 0 12 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 17.1621H4C2.34315 17.1621 1 15.819 1 14.1621V0.432373H0V14.1621C0 16.3712 1.79086 18.1621 4 18.1621L12 18.1621V17.1621Z"
                                fill="#d9d9d9"
                              ></path>
                            </svg>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              columnGap: "0.875rem",
                            }}
                          >
                            <div>
                              <img
                                src={
                                  child.images?.length > 0
                                    ? child.images[0]
                                    : Env.IMG_NOT_FOUND
                                }
                                className="img-responsive"
                                alt="image_product"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  background: "#0000000d",
                                }}
                              />
                            </div>
                            <div>
                              <div className="product__name">
                                <div className="product__name__content">
                                  {child.name}{" "}
                                </div>
                                <div className="product_noteTooltip">
                                  {child.name}
                                </div>
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#8c8c8c",
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                SKU: {child.sku_in_ecommerce}{" "}
                                <span className="copy">
                                  <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    dataIcon="copy"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    ariaHidden="true"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.handleCopy(child.sku_in_ecommerce)
                                    }
                                  >
                                    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                  </svg>
                                  <div
                                    className="copy_noteTooltip"
                                    style={{
                                      opacity:
                                        textEcommerceCopySuccess ===
                                        child.sku_in_ecommerce
                                          ? 1
                                          : 0,
                                      visibility:
                                        textEcommerceCopySuccess ===
                                        child.sku_in_ecommerce
                                          ? "visible"
                                          : "hidden",
                                    }}
                                  >
                                    Đã sao chép
                                  </div>
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#8c8c8c",
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                }}
                              >
                                Mã sản phẩm: {child.product_id_in_ecommerce}{" "}
                                <span className="copy">
                                  <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    dataIcon="copy"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    ariaHidden="true"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.handleCopy(
                                        child.product_id_in_ecommerce
                                      )
                                    }
                                  >
                                    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                  </svg>
                                  <div
                                    className="copy_noteTooltip"
                                    style={{
                                      opacity:
                                        textEcommerceCopySuccess ===
                                        child.product_id_in_ecommerce
                                          ? 1
                                          : 0,
                                      visibility:
                                        textEcommerceCopySuccess ===
                                        child.product_id_in_ecommerce
                                          ? "visible"
                                          : "hidden",
                                    }}
                                  >
                                    Đã sao chép
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ width: "10%" }}>
                        {formatNumberV2(child.quantity_in_stock)}
                      </td>
                      <td style={{ width: "20%" }}>
                        {child.price
                          ? `${formatNumberV2(child.price)} đ`
                          : "0 đ"}
                      </td>
                      <td style={{ width: "15%" }}>{child?.updated_at}</td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <span class="dropdown__product">
                          <span
                            className="dropdown__product__toggle"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => this.handleShowActions(child)}
                          >
                            <i className="fa fa-bars"></i>
                          </span>
                          <div
                            class="dropdown__product__menu"
                            style={{
                              display:
                                productSelected?.id == child?.id
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <div
                              className="dropdown__product__item"
                              type="button"
                              data-toggle="modal"
                              data-target="#updatePriceProductEcommerce"
                              onClick={this.handleOpenModal}
                            >
                              <span
                                style={{
                                  marginRight: "10px",
                                }}
                              >
                                <i className="fa fa-edit"></i>
                              </span>
                              <span>Sửa giá</span>
                            </div>
                          </div>
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          );
        }
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    const { products } = this.props;
    const { productSelected, price, error } = this.state;

    return (
      <TableProductStyles>
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th style={{ width: "10%" }}>Tồn kho</th>
              <th style={{ width: "10%" }}>Giá bán lẻ</th>
              <th style={{ width: "15%" }}>Đồng bộ lần cuối</th>
              <th style={{ width: "100px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shop_ids === "" ? (
              <tr>
                <td
                  colspan="7"
                  style={{
                    textAlign: "center",
                    color: "#434040",
                  }}
                >
                  Chọn cửa hàng để xem thông tin sản phẩm!
                </td>
              </tr>
            ) : (
              <>
                {" "}
                {this.showData(
                  products.data,
                  products.per_page,
                  products.current_page
                )}
              </>
            )}
          </tbody>
        </table>
        {productSelected && (
          <ModalCustom
            title="Sửa giá sản phẩm trên hệ thống"
            content="Chỉ sửa lại giá của sản phẩm nếu bạn đã thay đổi thông tin giá này trên sàn, nếu không việc đồng bộ đơn hàng, tồn kho với sản phẩm này có thể bị lỗi."
            id="updatePriceProductEcommerce"
            error={error}
            productName={productSelected?.name}
            onClose={this.handleCloseModal}
            onSubmit={this.handleSubmitModalPrice}
          >
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="Sửa giá"
              value={price}
              onChange={this.onChange}
            />
          </ModalCustom>
        )}
      </TableProductStyles>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePriceProductEcommerce: (store_code, data, id, funcModal) => {
      dispatch(
        ecommerceAction.updatePriceProductEcommerce(
          store_code,
          data,
          id,
          funcModal
        )
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
