import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { Redirect } from "react-router-dom";
import Table from "../../../components/Ecommerce/Order/Table";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import NotAccess from "../../../components/Partials/NotAccess";
import { connect, shallowEqual } from "react-redux";
import Loading from "../../Loading";
import * as ecommerceAction from "../../../actions/ecommerce";
import { getQueryParams } from "../../../ultis/helpers";
import styled from "styled-components";
import FilterOrder from "../../../components/Ecommerce/Order/FilterOrder";
import moment from "moment";
import Pagination from "../../../components/Ecommerce/Order/Pagination";
import history from "../../../history";
import ModalSyncOrder from "../../../components/Ecommerce/Order/ModalSyncOrder";
import { ecommerceStatus } from "../../../ultis/ecommerce";
import ReactToPrint from "react-to-print";
import PrintOrderEcommerce from "../../InvoiceTemplate/orderEcommerce";

const OrderEcomerceStyles = styled.div`
  .card-header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .dropdown__product {
    position: relative;
    .dropdown__product__menu {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
      z-index: 100;
      padding: 0.5rem 0;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.1875rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      .dropdown__product__item {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        color: black;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
`;

class OrderEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: getQueryParams("search") || "",
      page: getQueryParams("page") || 1,
      numPage: getQueryParams("limit") || 20,
      listStore: [],
      listStoreSelected: getQueryParams("shop_ids") || [],
      listStatusSelected: getQueryParams("order_statuses") || [],
      created_from_date:
        getQueryParams("created_from_date") || this.handleShowDateBeforeAWeek(),
      created_to_date:
        getQueryParams("created_to_date") ||
        moment(new Date(), "DD-MM-YYYY").format("DD-MM-YYYY"),
      action: false,
      listOrderSelected: [],
    };
  }

  componentDidMount() {
    const { store_code } = this.props.match.params;
    const { created_from_date, created_to_date } = this.state;
    this.props.fetchListConnectEcommerce(store_code, "", (res) => {
      if (res?.length > 0) {
        const listShopsTiki = res.filter(
          (res) => res.platform === this.isCheckedEcommerce()?.toUpperCase()
        );
        const listShops = listShopsTiki.map((shop) => ({
          value: shop.shop_id,
          label: shop.shop_name,
        }));
        this.setState({
          listStoreSelected: listShops,
        });
        const params = this.getParams(
          listShops,
          [],
          created_from_date,
          created_to_date
        );

        this.props.fetchListOrderEcommerce(store_code, params);
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    const { listConnectEcommerce } = this.props;
    if (!shallowEqual(listConnectEcommerce, nextProps.listConnectEcommerce)) {
      const newListConnectEcommerce = nextProps.listConnectEcommerce.filter(
        (ecommerce) =>
          ecommerce.platform === this.isCheckedEcommerce()?.toUpperCase()
      );
      const newListStore = newListConnectEcommerce.reduce(
        (prevEcommerce, currentEcommerce) => {
          return [
            ...prevEcommerce,
            {
              value: currentEcommerce.shop_id,
              label: currentEcommerce.shop_name,
            },
          ];
        },
        []
      );
      this.setState({
        listStore: newListStore,
      });
    }

    return true;
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.product_list;

      this.setState({
        isLoading: true,
        isShow,
      });
    }
  }

  handleShowDateBeforeAWeek = () => {
    const now = new Date();

    return moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
      "DD-MM-YYYY"
    ).format("DD-MM-YYYY");
  };

  onChangeStore = (listStoreSelected) => {
    this.setState({
      listStoreSelected: listStoreSelected,
    });
  };
  onChangeStatus = (listStatusSelected) => {
    this.setState({
      listStatusSelected: listStatusSelected,
    });
  };
  onchangeDateFrom = (date) => {
    var from = "";
    from = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";

    this.setState({ created_from_date: from });
  };
  onchangeDateTo = (date) => {
    var to = "";
    to = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";

    this.setState({ created_to_date: to });
  };
  onChangeSearch = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getParams = (
    listStore,
    listStatus,
    from_date,
    to_date,
    searchValue,
    page,
    numPage
  ) => {
    var params = "";
    if (listStore?.length > 0) {
      params += listStore.reduce((prevList, currentList, index) => {
        return (
          prevList +
          `${
            index === listStore.length - 1
              ? currentList?.value
              : `${currentList?.value},`
          }`
        );
      }, "shop_ids=");
    }
    if (listStatus?.length > 0) {
      params += listStatus.reduce((prevList, currentList, index) => {
        return (
          prevList +
          `${
            index === listStatus.length - 1
              ? currentList?.value
              : `${currentList?.value},`
          }`
        );
      }, "&order_statuses=");
    }
    if (from_date != "" && from_date != null) {
      const fromYYYYMMDD = from_date?.split("-").reverse().join("-");
      params = params + `&created_from_date=${fromYYYYMMDD}`;
    }
    if (to_date != "" && to_date != null) {
      const toYYYYMMDD = to_date?.split("-").reverse().join("-");
      params = params + `&created_to_date=${toYYYYMMDD}`;
    }
    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    if (page != "" && page != null) {
      params = params + `&page=${page}`;
    }
    if (numPage != "" && numPage != null) {
      params = params + `&limit=${numPage}`;
    }

    return params;
  };
  handleFilterOrder = () => {
    const { store_code } = this.props.match.params;
    const {
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      numPage,
    } = this.state;

    const params = this.getParams(
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      1,
      numPage
    );
    this.setState({ page: 1 });
    this.props.fetchListOrderEcommerce(store_code, params);
  };
  isCheckedEcommerce = () => {
    const pathName = window.location.pathname;
    const tiki = "tiki";
    const lazada = "lazada";
    const tiktok = "tiktok";
    const shopee = "shopee";
    return pathName?.includes(tiki)
      ? tiki
      : pathName?.includes(lazada)
      ? lazada
      : pathName?.includes(tiktok)
      ? tiktok
      : pathName?.includes(shopee)
      ? shopee
      : "";
  };
  handleFetchChoose = (page) => {
    const { store_code } = this.props.match.params;
    const {
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      numPage,
    } = this.state;

    const params = this.getParams(
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      page,
      numPage
    );

    this.props.fetchListOrderEcommerce(store_code, params, () => {
      history.push(`?${params}`);
    });
  };
  onChangeNumPage = (e) => {
    const { store_code } = this.props.match.params;
    const {
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
    } = this.state;
    const numPage = e.target.value;

    const params = this.getParams(
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      1,
      numPage
    );

    this.props.fetchListOrderEcommerce(store_code, params, () => {
      history.push(`?${params}`);
    });
  };
  exportListOrder = () => {
    const { store_code } = this.props.match.params;
    const {
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      page,
      numPage,
    } = this.state;

    const params = this.getParams(
      listStoreSelected,
      listStatusSelected,
      created_from_date,
      created_to_date,
      searchValue,
      page,
      numPage
    );
    const platform = this.isCheckedEcommerce()?.toUpperCase();
    this.props.exportListOrder(
      store_code,
      params,
      this.handleShowStatus,
      platform
    );
  };
  handleShowStatus = (status, platform) => {
    const newEcommerceStatus = ecommerceStatus.filter(
      (item) => item.name === platform
    );
    let statusOrder = {
      name: "",
      color: "",
    };
    if (newEcommerceStatus?.length > 0) {
      newEcommerceStatus[0].data?.forEach((item) => {
        if (item.data_children?.length > 0) {
          const statusOrderChildren = item.data_children?.filter(
            (element) => element.status === status
          );
          if (statusOrderChildren?.length > 0) {
            statusOrder = {
              name: statusOrderChildren[0].name,
              color: statusOrderChildren[0]?.color
                ? statusOrderChildren[0]?.color
                : "",
            };
          }
        }
      });
    }

    return statusOrder;
  };
  setListOrderSelected = (listOrder) => {
    this.setState({
      listOrderSelected: listOrder,
    });
  };

  render() {
    if (this.props.auth) {
      var { listOrders, fetchListOrderEcommerce } = this.props;
      var { store_code } = this.props.match.params;
      var {
        isShow,
        numPage,
        listStore,
        listStoreSelected,
        listStatusSelected,
        created_from_date,
        created_to_date,
        searchValue,
        action,
        listOrderSelected,
      } = this.state;

      return (
        <OrderEcomerceStyles id="wrapper">
          <Sidebar store_code={store_code} listStore={listStore} />
          <ModalSyncOrder
            store_code={store_code}
            listStore={listStore}
            isCheckedEcommerce={this.isCheckedEcommerce}
          />
          <div className="col-10 col-10-wrapper">
            <div
              id="content-wrapper"
              className="d-flex flex-column"
              style={{
                overflow: "visible",
              }}
            >
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Đơn hàng{" "}
                        {this.isCheckedEcommerce() === "tiki"
                          ? "Tiki"
                          : this.isCheckedEcommerce() === "lazada"
                          ? "Lazada"
                          : this.isCheckedEcommerce() === "tiktok"
                          ? "Tiktok"
                          : this.isCheckedEcommerce() === "shopee"
                          ? "Shopee"
                          : ""}
                      </h4>
                    </div>
                    <br></br>

                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />

                    <div class="card shadow">
                      <FilterOrder
                        isCheckedEcommerce={this.isCheckedEcommerce}
                        listStore={listStore}
                        listStoreSelected={listStoreSelected}
                        listStatusSelected={listStatusSelected}
                        created_from_date={created_from_date}
                        created_to_date={created_to_date}
                        searchValue={searchValue}
                        onChangeStore={this.onChangeStore}
                        onChangeStatus={this.onChangeStatus}
                        onchangeDateTo={this.onchangeDateTo}
                        onchangeDateFrom={this.onchangeDateFrom}
                        onChangeSearch={this.onChangeSearch}
                        setSearch={(search) =>
                          this.setState({ searchValue: search })
                        }
                        handleFilterOrder={this.handleFilterOrder}
                      ></FilterOrder>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                          marginLeft: "15px",
                          gap: "10px",
                        }}
                      >
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#modalSyncOrder"
                        >
                          <i className="fa fa-download"></i> Tải về
                        </button>
                        <button
                          className="btn btn-primary dropdown__product"
                          onClick={() => this.setState({ action: !action })}
                        >
                          <span>
                            Thao tác <i className="fa fa-angle-down"></i>
                          </span>
                          <div
                            class="dropdown__product__menu"
                            style={{
                              display: action ? "block" : "none",
                              textAlign: "left",
                            }}
                          >
                            <div
                              className="dropdown__product__item"
                              type="button"
                            >
                              <ReactToPrint
                                trigger={() => {
                                  return (
                                    <span>
                                      <span
                                        style={{
                                          marginRight: "10px",
                                          color: "#646161",
                                        }}
                                      >
                                        <i className="fa fa-print"></i>
                                      </span>
                                      <span>In phiếu gửi Khổ A4, A5</span>
                                    </span>
                                  );
                                }}
                                content={() => {
                                  return this.componentRef;
                                }}
                              />
                              <div
                                style={{
                                  display: "none",
                                }}
                              >
                                <PrintOrderEcommerce
                                  type={Types.TYPE_PRINT_ECOMMERCE_A4_A5}
                                  orders={listOrderSelected}
                                  store_code={store_code}
                                  ref={(el) => {
                                    this.componentRef = el;
                                  }}
                                ></PrintOrderEcommerce>
                              </div>
                            </div>
                            <div
                              className="dropdown__product__item"
                              type="button"
                            >
                              <ReactToPrint
                                trigger={() => {
                                  return (
                                    <span>
                                      <span
                                        style={{
                                          marginRight: "10px",
                                          color: "#646161",
                                        }}
                                      >
                                        <i className="fa fa-print"></i>
                                      </span>
                                      <span>In 2 phiếu gửi 1 trang A4</span>
                                    </span>
                                  );
                                }}
                                content={() => {
                                  return this.componentRef2;
                                }}
                              />
                              <div
                                style={{
                                  display: "none",
                                }}
                              >
                                <PrintOrderEcommerce
                                  type={
                                    Types.TYPE_PRINT_ECOMMERCE_TWO_VOLUME_A4
                                  }
                                  orders={listOrderSelected}
                                  store_code={store_code}
                                  ref={(el) => {
                                    this.componentRef2 = el;
                                  }}
                                ></PrintOrderEcommerce>
                              </div>
                            </div>
                            <div
                              className="dropdown__product__item"
                              type="button"
                            >
                              <ReactToPrint
                                trigger={() => {
                                  return (
                                    <span>
                                      <span
                                        style={{
                                          marginRight: "10px",
                                          color: "#646161",
                                        }}
                                      >
                                        <i className="fa fa-print"></i>
                                      </span>
                                      <span>In phiếu gửi Khổ K80</span>
                                    </span>
                                  );
                                }}
                                content={() => {
                                  return this.componentRef2;
                                }}
                              />
                              <div
                                style={{
                                  display: "none",
                                }}
                              >
                                <PrintOrderEcommerce
                                  type={
                                    Types.TYPE_PRINT_ECOMMERCE_TWO_VOLUME_A4
                                  }
                                  orders={listOrderSelected}
                                  store_code={store_code}
                                  ref={(el) => {
                                    this.componentRef2 = el;
                                  }}
                                ></PrintOrderEcommerce>
                              </div>
                            </div>
                            <div
                              className="dropdown__product__item"
                              type="button"
                            >
                              <ReactToPrint
                                trigger={() => {
                                  return (
                                    <span>
                                      <span
                                        style={{
                                          marginRight: "10px",
                                          color: "#646161",
                                        }}
                                      >
                                        <i className="fa fa-print"></i>
                                      </span>
                                      <span>In nhãn</span>
                                    </span>
                                  );
                                }}
                                content={() => {
                                  return this.componentRef2;
                                }}
                              />
                              <div
                                style={{
                                  display: "none",
                                }}
                              >
                                <PrintOrderEcommerce
                                  type={
                                    Types.TYPE_PRINT_ECOMMERCE_TWO_VOLUME_A4
                                  }
                                  orders={listOrderSelected}
                                  store_code={store_code}
                                  ref={(el) => {
                                    this.componentRef2 = el;
                                  }}
                                ></PrintOrderEcommerce>
                              </div>
                            </div>
                            <div
                              className="dropdown__product__item"
                              type="button"
                              onClick={this.exportListOrder}
                              style={{
                                borderTop: "1px solid #cecbcb",
                              }}
                            >
                              <span
                                style={{
                                  marginRight: "10px",
                                  color: "#646161",
                                }}
                              >
                                <i className="fa fa-file-excel mr-2"></i>
                              </span>
                              <span>Xuất Excel</span>
                            </div>
                          </div>
                        </button>
                      </div>
                      <div
                        class="card-body"
                        style={{
                          overflow: "auto",
                        }}
                      >
                        <Table
                          store_code={store_code}
                          products={listOrders}
                          listStoreSelected={listStoreSelected}
                          fetchListOrderEcommerce={() =>
                            fetchListOrderEcommerce(
                              store_code,
                              this.getParams(listStoreSelected)
                            )
                          }
                          handleShowStatus={this.handleShowStatus}
                          listOrderSelected={listOrderSelected}
                          setListOrderSelected={this.setListOrderSelected}
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                margin: "20px 10px auto auto",
                              }}
                            >
                              Hiển thị
                            </span>
                            <select
                              style={{
                                margin: "auto",
                                marginTop: "10px",
                                marginRight: "20px",
                                width: "70px",
                              }}
                              onChange={this.onChangeNumPage}
                              value={numPage}
                              name="numPage"
                              class="form-control"
                            >
                              <option value="20" selected>
                                20
                              </option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                            </select>
                          </div>

                          <Pagination
                            orders={listOrders}
                            handleFetchChoose={(page) =>
                              this.handleFetchChoose(page)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
          </div>
        </OrderEcomerceStyles>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.productReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    listOrders: state.ecommerceReducers.order.listOrders,
    listConnectEcommerce: state.ecommerceReducers.connect.listConnectEcommerce,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListConnectEcommerce: (store_code, params, funcModal) => {
      dispatch(
        ecommerceAction.fetchListConnectEcommerce(store_code, params, funcModal)
      );
    },
    fetchListOrderEcommerce: (store_code, params, funcModal) => {
      dispatch(
        ecommerceAction.fetchListOrderEcommerce(store_code, params, funcModal)
      );
    },
    exportListOrder: (store_code, params, funcModal, platform) => {
      dispatch(
        ecommerceAction.exportListOrder(store_code, params, funcModal, platform)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderEcommerce);
