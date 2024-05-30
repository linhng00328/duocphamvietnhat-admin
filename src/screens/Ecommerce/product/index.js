import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { Link, Redirect } from "react-router-dom";
import Table from "../../../components/Ecommerce/Product/Table";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import NotAccess from "../../../components/Partials/NotAccess";
import { connect, shallowEqual } from "react-redux";
import Loading from "../../Loading";
import * as ecommerceAction from "../../../actions/ecommerce";
import { getQueryParams } from "../../../ultis/helpers";
import styled from "styled-components";
import ModalSyncProduct from "../../../components/Ecommerce/Product/ModalSyncProduct";

const ProductEcommerceStyles = styled.div`
  .card-header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

class ProductEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: getQueryParams("search") || "",
      page: getQueryParams("page") || 1,
      numPage: getQueryParams("limit") || 20,
      listStore: [],
      shop_ids: getQueryParams("shop_ids") || "",
    };
  }

  componentDidMount() {
    const { store_code } = this.props.match.params;
    this.props.fetchListConnectEcommerce(store_code);
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
  onChangeStore = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const { fetchListProductEcommerce } = this.props;
    var { store_code } = this.props.match.params;
    this.setState({
      [name]: value,
      searchValue: "",
    });

    const params = this.getParams(value, "");
    fetchListProductEcommerce(store_code, params);
  };

  getParams = (store_id, searchValue) => {
    var params = "";
    if (store_id !== "" || store_id !== null) {
      params += `shop_ids=${store_id}`;
    }
    if (searchValue !== "" || searchValue !== null) {
      params += `&search=${searchValue?.trim()}`;
    }

    return params;
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
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    const { searchValue, shop_ids } = this.state;
    const { store_code } = this.props.match.params;

    const params = this.getParams(shop_ids, searchValue);
    this.props.fetchListProductEcommerce(store_code, params);
  };

  render() {
    if (this.props.auth) {
      var { listProducts, fetchListProductEcommerce } = this.props;
      var { store_code } = this.props.match.params;
      var { isShow, numPage, listStore, shop_ids, searchValue } = this.state;

      return (
        <ProductEcommerceStyles id="wrapper">
          <Sidebar store_code={store_code} listStore={listStore} />
          <ModalSyncProduct
            store_code={store_code}
            listStore={listStore}
            isCheckedEcommerce={this.isCheckedEcommerce}
          />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
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
                        Sản phẩm{" "}
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

                    <div class="card shadow ">
                      <div className="card-header">
                        <div
                          class="row"
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                            marginRight: "15px",
                            marginLeft: "15px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              columnGap: "20px",
                            }}
                          >
                            <select
                              style={{
                                width: "auto",
                              }}
                              onChange={this.onChangeStore}
                              value={shop_ids}
                              name="shop_ids"
                              class="form-control"
                            >
                              <option value="" disabled>
                                Chọn cửa hàng
                              </option>
                              {listStore.length > 0 &&
                                listStore.map((store) => (
                                  <option value={store.value} key={store.value}>
                                    {store.label}
                                  </option>
                                ))}
                            </select>
                            <form onSubmit={this.searchData}>
                              <div class="input-group mb-6">
                                <input
                                  style={{
                                    maxWidth: "400px",
                                    minWidth: "200px",
                                  }}
                                  type="search"
                                  name="txtSearch"
                                  value={searchValue}
                                  onChange={this.onChangeSearch}
                                  class="form-control"
                                  placeholder="Tìm kiếm sản phẩm"
                                />
                                <div class="input-group-append">
                                  <button class="btn btn-primary" type="submit">
                                    <i class="fa fa-search"></i>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div>
                            <button
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target="#modalSyncProduct"
                            >
                              <i className="fa fa-download"></i> Đồng bộ
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        class="card-body"
                        style={
                          {
                            // overflow: "auto",
                          }
                        }
                      >
                        <Table
                          store_code={store_code}
                          products={listProducts}
                          shop_ids={shop_ids}
                          fetchListProductEcommerce={() =>
                            fetchListProductEcommerce(
                              store_code,
                              this.getParams(shop_ids, searchValue)
                            )
                          }
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          {/* <div style={{ display: "flex" }}>
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
                              <option value="10">10</option>
                              <option value="20" selected>
                                20
                              </option>
                              <option value="50">50</option>
                            </select>
                          </div> */}

                          {/* <Pagination
                            limit={numPage}
                            searchValue={searchValue}
                            passNumPage={this.passNumPage}
                            store_code={store_code}
                            products={products}
                            pageProduct={true}
                            getParams={this.getParams}
                            categorySelected={this.state.categorySelected}
                          /> */}
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
        </ProductEcommerceStyles>
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
    listProducts: state.ecommerceReducers.product.listProducts,
    listConnectEcommerce: state.ecommerceReducers.connect.listConnectEcommerce,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListConnectEcommerce: (store_code, params) => {
      dispatch(ecommerceAction.fetchListConnectEcommerce(store_code, params));
    },
    fetchListProductEcommerce: (store_code, params) => {
      dispatch(ecommerceAction.fetchListProductEcommerce(store_code, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEcommerce);
