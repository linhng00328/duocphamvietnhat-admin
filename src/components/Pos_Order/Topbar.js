import React, { Component } from "react";
import { connect } from "react-redux";
import * as productAction from "../../actions/product";
import * as profileAction from "../../actions/profile";
import * as posAction from "../../actions/post_order";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as dashboardAction from "../../actions/dashboard";
import * as branchAction from "../../actions/branch";
import { removeSignNumber } from "../../ultis/helpers";
import { getBranchId, setBranchId } from "../../ultis/branchUtils";
import * as productApi from "../../data/remote/product";
import ModalBranch from "./ModalBranch";
import ModalKeyboard from "./ModalKeyboard";
import ModalDelete from "./ModalDelete";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { AsyncPaginate } from "react-select-async-paginate";
import CardProduct from "./CardProduct";
import history from "../../history";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";
import { randomString } from "../../ultis/helpers";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      selectTap: -1,
      fullScreen: false,
      idCart: "",
      branchId: "",
      order_from: 2,
      selectValue: {},
      isScan: randomString(10),
      isShowScanner: false,
      numOfScanner: 1,
      startAsync: false,
      isChangeValue: "",
      idEditCart: null,
      txtEditCart: "",
    };

    this.refSearchProduct = React.createRef();

    this.afterEnter = false;
    this.search = "";
  }

  componentDidMount() {
    const { store_code, order_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchBranchStore(this.props.store_code);
    this.props.fetchUserId();
    if (order_code !== undefined) return;
    this.props.listPosOrder(store_code, branch_id);
  }
  componentWillReceiveProps(nextProps) {
    var { startAsync } = this.state;
    var { products } = nextProps;
    if (
      (!shallowEqual(products, this.props.products) ||
        products.data?.length > 0) &&
      startAsync == false
    ) {
      this.setState({ startAsync: true });
    }
    if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {
      if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {
        var branch_id = getBranchId();

        if (branch_id != null) {
          this.setState({ branchId: branch_id });
        } else {
          branch_id = nextProps.branchStore[0]?.id;
          setBranchId(branch_id);

          this.setState({ branchId: branch_id });
        }
        const selectedBranch = this.props.branchStore.find(
          (branch) => branch.id == branch_id
        );
        this.props.changeBranch(selectedBranch);
      }
    }
    if (
      this.props.randomFocus != nextProps.randomFocus &&
      nextProps.randomFocus != null
    ) {
      if (this.refSearchProduct != null) {
        this.refSearchProduct.focus();
      }
    }

    if (!shallowEqual(this.props.listPos, nextProps.listPos)) {
      if (
        !shallowEqual(
          this.props.updatedNamePosOrder,
          nextProps.updatedNamePosOrder
        )
      ) {
        let indexSelecTap = -1;
        if (nextProps.listPos?.length > 0) {
          nextProps.listPos.forEach((element, index) => {
            if (element.id === nextProps.updatedNamePosOrder?.id) {
              indexSelecTap = index - 1;
            }
          });
        }

        this.setState({ selectTap: indexSelecTap });
      } else {
        if (nextProps.listPos?.length > 0) {
          this.props.handleCallbackTab(nextProps.listPos[0]?.id);
        } else {
          if (nextProps.listPos?.length == 0) {
            this.handleCreateTab();
          }
        }
        this.setState({ selectTap: -1 });
      }
    }

    if (this.props.loadingCart == true && nextProps.loadingCart == false) {
      if (nextProps.listPos?.length == 0) {
        this.handleCreateTab();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { order_code } = this.props;
    if (
      !shallowEqual(nextState.selectValue, this.state.selectValue) ||
      this.state.isScan !== nextState.isScan ||
      nextState.isChangeValue !== this.state.isChangeValue
    ) {
      var { selectValue } = nextState;
      if (selectValue != null && selectValue.product != null) {
        var data = selectValue?.product;
        var { numOfScanner } = nextState;
        var compareIsScan =
          this.state.isScan !== nextState.isScan &&
          nextState.isShowScanner === true;

        this.handleInfoProduct(
          data.inventory,
          data.id,
          data.name,
          data.images,
          data.price,
          data.distributes,
          data.max_price,
          data.min_price,
          data.product_discount,
          compareIsScan == true ? numOfScanner : 1,
          compareIsScan == true ? numOfScanner : 1,
          data,
          nextState.isChangeValue !== this.state.isChangeValue &&
            shallowEqual(nextState.selectValue, this.state.selectValue)
        );
      }
    }

    if (!shallowEqual(nextState.branchId, this.state.branchId)) {
      const { store_code } = this.props;
      const branch_id = localStorage.getItem("branch_id");
      this.props.fetchBranchStore(this.props.store_code);
      this.props.fetchUserId();
      if (order_code) return;
      this.props.listPosOrder(store_code, branch_id);
    }
    return true;
  }

  setIdEditCart = (idEditCart) => {
    this.setState({ idEditCart });
  };

  setTxtEditCart = (txtEditCart) => {
    this.setState({ txtEditCart });
  };

  handleDelete = (idCart) => {
    this.setState({ idCart: idCart });
  };
  handleCreateTab = () => {
    const branch_id = localStorage.getItem("branch_id");
    const { store_code } = this.props;
    this.props.createOneTab(store_code, branch_id, null);
  };
  handleChooseTab = (e, oneCart, index, type) => {
    if (e.target.closest(".btn__remove-input")) return;
    if (this.state.selectTap === index) {
      if (e.target.closest(".btn__remove-name")) return;
      this.handleUpdateCart(oneCart, type);
    } else {
      const { idEditCart } = this.state;
      if (
        !e.target.closest(".btn__update-name") &&
        idEditCart &&
        idEditCart !== oneCart.id
      ) {
        this.setState({ idEditCart: null, txtEditCart: "" });
      }

      this.setState({ selectTap: index });
      this.props.handleCallbackTab(oneCart.id);
    }
  };
  handleChooseTab1 = (e, oneCart, type) => {
    if (e.target.closest(".btn__remove-input")) return;
    if (this.state.selectTap === -1) {
      if (e.target.closest(".btn__remove-name")) return;
      this.handleUpdateCart(oneCart, type);
    } else {
      const { idEditCart } = this.state;
      if (
        !e.target.closest(".btn__update-name") &&
        idEditCart &&
        idEditCart !== oneCart.id
      ) {
        this.setState({ idEditCart: null, txtEditCart: "" });
      }
      this.setState({ selectTap: -1 });
      this.props.handleCallbackTab(oneCart.id);
    }
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const limit = 12;
    var params = `&search=${searchValue}&limit=${limit}`;
    this.setState({ numPage: 5 });
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  goBackHome = () => {
    var { store_code } = this.props;
    history.push(`/dashboard/${store_code}`);
    // window.location.href = "/";
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.setState({ fullScreen: true });
    } else {
      document.exitFullscreen();
      this.setState({ fullScreen: false });
    }
  };

  handleCallbackBrach = (branchId) => {
    this.setState({ branchId: branchId });

    const selectedBranch = this.props.branchStore.find(
      (branch) => branch.id == branchId
    );

    this.props.changeBranch(selectedBranch);

    window.location.reload();
  };

  loadProducts = async (search, loadedOptions, { page }) => {
    var { startAsync } = this.state;
    var { products } = this.props;

    this.search = search;

    if (startAsync === true) {
      this.setState({ startAsync: false });
      return {
        options: products.data.map((i) => {
          return {
            value: i.id,
            label: `${i.name}`,
            product: i,
          };
        }),

        hasMore: products.data.length == 6,
        additional: {
          page: page + 1,
        },
      };
    }

    var { store_code } = this.props;
    var branch_id = getBranchId();

    const params = `&search=${search}&limit=6`;
    const res = await productApi.fetchAllProductV2(
      store_code,
      branch_id,
      page,
      params
    );

    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    const listShowChoose = res.data.data.data.map((i) => {
      return {
        value: i.id,
        label: `${i.name}`,
        product: i,
      };
    });

    if (this.refSearchProduct != null) {
      if (
        listShowChoose.length == 1 &&
        !isNaN(this.search) &&
        this.search.length > 8
      ) {
        this.setState({ selectValue: listShowChoose[0] });
        //  isNaN('123')
        this.sleep(100).then(() => {
          if (this.refSearchProduct != null) {
            this.refSearchProduct.setValue("");
          }
        });

        this.afterEnter = false;
        return {
          options: listShowChoose,

          hasMore: res.data.data.data.length == 6,
          additional: {
            page: page + 1,
          },
        };
      }
    }

    return {
      options: listShowChoose,

      hasMore: res.data.data.data.length == 6,
      additional: {
        page: page + 1,
      },
    };
  };

  handleInfoProduct = (
    inventory,
    id,
    name,
    image,
    price,
    distributes,
    maxPrice,
    minPrice,
    priceDiscount,
    quayntity,
    quantityDistribute,
    product,
    isChangeValue
  ) => {
    if (distributes.length > 0) {
      window.$("#modalDetail").modal("show");

      this.setState({ isToggle: true });
      if (isChangeValue == false)
        this.props.handleCallbackProduct({
          inventoryProduct: inventory,
          idProduct: id,
          nameProduct: name,
          imageProduct: image,
          priceProduct: price,
          distributeProduct: distributes,
          minPriceProduct: minPrice,
          maxPriceProduct: maxPrice,
          discountProduct: priceDiscount,
          quantityProduct: quayntity,
          quantityProductWithDistribute: quantityDistribute,
          product: product,
        });
    } else {
      this.setState({ isToggle: false });
      this.props.handleCallbackPushProduct({
        nameProduct: name,
        element_id: "",
        product_id: id,
        reality_exist: 0,
        nameDistribute: "",
        nameElement: "",
        nameSubDistribute: "",
        priceProduct: price,
        stock: quayntity,
        product: product,
      });
    }
  };
  _recordInput = (name, event) => {
    if (event.keyCode == 13) {
      this.setState({ isScan: randomString(10) });
    }
    this.props.passKeyPress(event.key, event);
  };
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  onChangeProduct = (selectValue) => {
    this.setState({ selectValue, isChangeValue: randomString(10) });
    // , isChangeValue : randomString(10)
    this.sleep(100).then(() => {
      if (this.refSearchProduct != null) {
        this.refSearchProduct.focus();
      }
    });

    // if (selectValue != null && selectValue.product != null) {
    //     var data = selectValue?.product
    //     this.handleInfoProduct(
    //         data.inventory,
    //         data.id,
    //         data.name,
    //         data.images,
    //         data.price, data.distributes,
    //         data.max_price, data.min_price,
    //         data.product_discount,
    //         data.quantity_in_stock,
    //         data.quantity_in_stock_with_distribute,
    //         data
    //     )
    // }
  };

  handleKeyboard = (key, event) => {
    if (key == "ctrl+v" || key == "meta+v") {
      this.isCtrl = true;
      event.preventDefault();

      if (this.refSearchProduct != null) {
        this.refSearchProduct.focus();
      }
    }

    if (key == "enter") {
      this.afterEnter = true;
    }

    console.log(key, this.isCtrl, this.afterEnter);

    switch (key) {
      case "f3":
      case "F3":
        event.preventDefault();

        if (this.refSearchProduct != null) {
          this.refSearchProduct.focus();
        }

        break;
      default:
        return;
    }
  };

  handleUpdateCart = (cartOne, type) => {
    this.setState({
      idEditCart: type === "hide" ? null : cartOne.id,
      txtEditCart: type === "hide" ? "" : cartOne.name,
    });
  };
  handleChangeEditCart = (e) => {
    const value = e.target.value;
    this.setState({
      txtEditCart: value,
    });
  };
  handleUpdateCartItem = (cartOne) => {
    const { updateNameInCart, store_code } = this.props;
    const { txtEditCart } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    const data = {
      name: txtEditCart,
    };
    updateNameInCart(store_code, branch_id, cartOne.id, data, () => {
      this.setState({
        idEditCart: null,
        txtEditCart: "",
      });
    });
  };

  render() {
    var { listPos, branchStore, user, store_code, currentBranch, selectValue } =
      this.props;
    var { idCart, selected_product_id, selectValue, idEditCart, txtEditCart } =
      this.state;

    const formatOptionLabel = ({ value, label, product }) => {
      return <CardProduct isItemSearch={true} product={product} />;
    };

    const customStyles = {
      menu: (styles) => ({
        ...styles,
        width: "520px",
      }),
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        fontWeight: 200,
        padding: 20,
        color: "black",
      }),
    };
    console.log("listt", listPos);
    return (
      <div className="controller-top">
        <KeyboardEventHandler
          handleKeys={["f3", "ctrl+v", "meta+v", "enter"]}
          onKeyEvent={(key, e) => {
            this.handleKeyboard(key, e);
          }}
        />
        <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">
          <div
            class="navbar-nav"
            style={{
              alignItems: "center",
              width: "100%",
              fontSize: "13px",
            }}
          >
            <div className="group-controller-first">
              {this.props.order_code ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                    fontSize: "18px",
                    color: "white",
                  }}
                >
                  <i
                    className="fa fa-chevron-left"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => history.goBack()}
                  ></i>
                </div>
              ) : null}
              <div className="first-list-top-cart">
                <li class="nav-item" style={{ flex: 1 }}>
                  <div>
                    <AsyncPaginate
                      onKeyUp={(event) => {
                        this._recordInput("onKeyUp", event);
                      }}
                      onKeyDown={(event) => {
                        this._recordInput("onKeyUp", event);
                      }}
                      autoFocus
                      selectRef={(ref) => {
                        this.refSearchProduct = ref;
                      }}
                      noOptionsMessage={() => "Không tìm thấy sản phẩm nào"}
                      loadingMessage={() => "Đang tìm..."} //minor type-O here
                      placeholder="(F3) Tìm kiếm sản phẩm"
                      value={null}
                      loadOptions={this.loadProducts}
                      formatOptionLabel={formatOptionLabel}
                      id="recipientReferences1"
                      onChange={this.onChangeProduct}
                      additional={{
                        page: 1,
                      }}
                      styles={customStyles}
                      debounceTimeout={500}
                      isClearable
                      isSearchable
                    />
                  </div>
                </li>
                <li class="nav-item">
                  {this.state.isShowScanner === true && (
                    <input
                      onChange={(e) => {
                        ((!isNaN(e.target.value) && e.target.value > 0) ||
                          e.target.value == "") &&
                          this.setState({ numOfScanner: e.target.value });
                      }}
                      placeholder="SL"
                      type=""
                      value={this.state.numOfScanner ?? ""}
                      style={{
                        width: "35px",
                        height: "36px",
                        "border-radius": "2px",
                        "margin-left": "5px",
                        textAlign: "center",
                      }}
                    />
                  )}
                  {/* <i
                  onClick={()=>this.setState({isShowScanner : !this.state.isShowScanner})}
                    style={{
                        cursor : "pointer",
                      marginLeft: "5px",
                      "font-size": "28px",
                      color: "white",
                      "vertical-align": "middle",
                    }}
                    class="fa fa-barcode"
                  ></i>{" "} */}
                  <img
                    onClick={() =>
                      this.setState({
                        isShowScanner: !this.state.isShowScanner,
                      })
                    }
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    src="/images/scan-barcode-white.svg"
                  ></img>
                </li>
              </div>
              <div className="cart-list-banner">
                <li class="nav-item">
                  {listPos !== null && listPos.length > 0 ? (
                    <ul class="navbar-nav" style={{ alignItems: "center" }}>
                      <li
                        onClick={(e) =>
                          this.handleChooseTab1(e, listPos[0], "show")
                        }
                        className={
                          this.state.selectTap === -1
                            ? "activess nav-item item-cart-list"
                            : "nav-item item-cart-list"
                        }
                      >
                        {idEditCart === listPos[0].id ? (
                          <div
                            style={{
                              marginTop: "5px",
                              display: "flex",
                              alignItems: "center",
                              columnGap: "5px",
                              borderBottom: "1px solid #dadbdb",
                              paddingBottom: "3px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                              }}
                            >
                              <input
                                style={{
                                  color: "gray",
                                  width: "100%",
                                  minWidth: "90px",
                                }}
                                type="text"
                                value={txtEditCart}
                                onChange={this.handleChangeEditCart}
                                placeholder="Nhập tên đơn hàng..."
                              />
                            </div>

                            <div
                              className="iconInputConfirm"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#2ecc71",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  this.handleUpdateCartItem(listPos[0])
                                }
                              >
                                <i className="fa fa-check"></i>
                              </span>
                              <span
                                style={{
                                  color: "#e74c3c",
                                  cursor: "pointer",
                                }}
                                className="btn__remove-input"
                                onClick={() =>
                                  this.handleUpdateCart(listPos[0], "hide")
                                }
                              >
                                <i className="fa fa-times"></i>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              columnGap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="tab-item"
                              style={{ marginRight: "5px" }}
                            >
                              {listPos[0]?.name
                                ? listPos[0].name
                                : "Hóa đơn mặc định"}
                            </div>
                            <span
                              style={{
                                display: "flex",
                                columnGap: "5px",
                              }}
                            >
                              {/* <i
                                className="fas fa-pencil-alt btn__update-name"
                                style={{
                                  fontSize: "11px",
                                }}
                                onClick={() =>
                                  this.handleUpdateCart(listPos[0], "show")
                                }
                              ></i> */}
                              {listPos.length > 1 && (
                                <i
                                  class="fa fa-window-close btn__remove-name"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    this.handleDelete(listPos[0].id)
                                  }
                                  data-toggle="modal"
                                  data-target="#removeModal"
                                ></i>
                              )}
                            </span>
                          </div>
                        )}
                      </li>
                      {listPos.slice(1, listPos.length).map((item, index) => {
                        return (
                          <li
                            onClick={(e) =>
                              this.handleChooseTab(e, item, index, "show")
                            }
                            key={index}
                            className={
                              index === this.state.selectTap
                                ? "activess nav-item item-cart-list"
                                : "nav-item item-cart-list"
                            }
                          >
                            {idEditCart === item.id ? (
                              <div
                                style={{
                                  marginTop: "5px",
                                  display: "flex",
                                  alignItems: "center",
                                  columnGap: "5px",
                                  borderBottom: "1px solid #dadbdb",
                                  paddingBottom: "3px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <input
                                    style={{
                                      color: "gray",
                                      width: "100%",
                                      minWidth: "90px",
                                    }}
                                    type="text"
                                    value={txtEditCart}
                                    onChange={this.handleChangeEditCart}
                                    placeholder="Nhập tên đơn hàng..."
                                  />
                                </div>

                                <div
                                  className="iconInputConfirm"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "4px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#2ecc71",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.handleUpdateCartItem(item)
                                    }
                                  >
                                    <i className="fa fa-check"></i>
                                  </span>
                                  <span
                                    style={{
                                      color: "#e74c3c",
                                      cursor: "pointer",
                                    }}
                                    className="btn__remove-input"
                                    onClick={() =>
                                      this.handleUpdateCart(item, "hide")
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  columnGap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="tab-item"
                                  style={{ marginRight: "5px" }}
                                >
                                  {item.name}
                                  {item.is_default ? "(Mặc định)" : ""}
                                </div>
                                <span
                                  style={{
                                    display: "flex",
                                    columnGap: "5px",
                                  }}
                                >
                                  {/* <i
                                    className="fas fa-pencil-alt btn__update-name"
                                    style={{
                                      fontSize: "11px",
                                    }}
                                    onClick={() =>
                                      this.handleUpdateCart(item, "show")
                                    }
                                  ></i> */}
                                  {item.is_default ? null : (
                                    <i
                                      class="fa fa-window-close btn__remove-name"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => this.handleDelete(item.id)}
                                      data-toggle="modal"
                                      data-target="#removeModal"
                                    ></i>
                                  )}
                                </span>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </div>
            </div>

            <div className="end-list-top-cart">
              <li
                className="nav-item add-cart"
                style={{
                  marginRight: "30px",
                  display: this.props.order_code ? "none" : "block",
                }}
                onClick={() => {
                  this.handleCreateTab();
                  this.setState({ idEditCart: null, txtEditCart: "" });
                }}
              >
                <div>
                  <i class="fas fa-plus"></i>
                </div>
              </li>
              {this.props.order_code ? (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                    fontSize: "18px",
                    color: "white",
                  }}
                >
                  Hóa đơn: {this.props.order_code}
                </li>
              ) : null}

              <div style={{ margin: "auto 0px" }}>
                <ul
                  className="navbar-nav ml-auto"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <li
                    title="Giao hàng"
                    className={`nav-item add-cart ${
                      getChannel() == IKITECH ? "" : "invisible"
                    }`}
                    onClick={() => this.props.handleOpenShipment(true)}
                  >
                    <i class="fas fa-shipping-fast"></i>
                  </li>

                  <li
                    className="nav-item dropdown no-arrow"
                    style={{ margin: "0 10px", fontSize: "17px" }}
                  >
                    <div
                      className="wrap-info"
                      data-toggle="modal"
                      data-target="#modalBranch"
                      style={{
                        display: "flex",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      <span
                        className="mr-2 small"
                        style={{
                          color: "white",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {currentBranch?.name ?? "Chưa có chi nhánh"}
                      </span>
                    </div>
                    <div
                      className="wrap-info"
                      style={{ display: "flex", color: "white" }}
                    >
                      <i class="fa fa-user-o" aria-hidden="true"></i>
                      <span
                        className="mr-2 small"
                        style={{ color: "white", marginLeft: "5px" }}
                      >
                        {user.name}
                      </span>
                    </div>
                  </li>

                  <li
                    className="nav-item"
                    id="btn-full"
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={this.fullScreen}
                  >
                    {!this.state.fullScreen ? (
                      <i class="fas fa-expand-arrows-alt fa-2x  add-cart"></i>
                    ) : (
                      <i class="fas fa-compress-arrows-alt  add-cart"></i>
                    )}
                  </li>

                  <li
                    className="nav-item"
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={this.goBackHome}
                  >
                    <i class="fas fa-home fa-2x  add-cart"></i>
                  </li>

                  <li className="nav-item" style={{ margin: "0 0px" }}>
                    <button
                      className="btn"
                      style={{
                        color: "white",
                        border: "1px solid",
                        fontSize: "13px",
                      }}
                      data-toggle="modal"
                      data-target="#modalKeyboard"
                    >
                      Phím tắt
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <ModalBranch
          currentBranch={currentBranch}
          branchStore={branchStore}
          handleCallbackBrach={this.handleCallbackBrach}
        />
        <ModalKeyboard />
        <ModalDelete idCart={idCart} store_code={store_code} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listPos: state.posReducers.pos_reducer.listPosOrder,
    updatedNamePosOrder: state.posReducers.pos_reducer.updatedNamePosOrder,
    branchStore: state.storeReducers.store.branchStore,
    user: state.userReducers.user.userID,
    loadingCart: state.posReducers.pos_reducer.loadingCart,
    currentBranch: state.branchReducers.branch.currentBranch,
    products: state.productReducers.product.allProduct,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    listPosOrder: (store_code, branch_id) => {
      dispatch(posAction.listPosOrder(store_code, branch_id));
    },
    updateNameInCart: (store_code, branch_id, id_cart, data, onSuccess) => {
      dispatch(
        posAction.updateNameInCart(
          store_code,
          branch_id,
          id_cart,
          data,
          onSuccess
        )
      );
    },
    createOneTab: (store_code, branch_id, data) => {
      dispatch(posAction.createOneTab(store_code, branch_id, data));
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchBranchStore: (store_code) => {
      dispatch(dashboardAction.fetchBranchStore(store_code));
    },
    fetchUserId: () => {
      dispatch(profileAction.fetchUserId());
    },
    changeBranch: (branchData) => {
      dispatch(branchAction.changeBranch(branchData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
