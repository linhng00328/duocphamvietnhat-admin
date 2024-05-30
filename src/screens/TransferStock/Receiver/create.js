import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import * as productAction from "../../../actions/product";
import * as dashboardAction from "../../../actions/dashboard";

import * as storeAction from "../../../data/remote/store";

import * as ImportAction from "../../../actions/import_stock";
import CardProduct from "../../../components/Import_stock/CardProduct";
import ModalDetail from "../../../components/Import_stock/ModalDetail";
import ModalSupplier from "../../../components/Import_stock/ModalSupplier";
import ListImportStock from "../../../components/Import_stock/ListImportStock";
import { format } from "../../../ultis/helpers";
import { formatNumber } from "../../../ultis/helpers";
import Paginations from "../../../components/Import_stock/Paginations";
import { AsyncPaginate } from "react-select-async-paginate";

class CreateImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      listImportStock: [],
      reality_exist_total: 0,
      existing_branch: 0,
      price_total: 0,
      note: "",
      infoSupplier: "",
      cost: "",
      txtDiscoutType: 0,
      txtValueDiscount: "",
      modalUpdateCart: null,
      select_supplier: null,
      select_supplier_id: null,
      infoProduct: {
        inventoryProduct: "",
        idProduct: "",
        nameProduct: "",
        imageProduct: "",
        priceProduct: "",
        distributeProduct: "",
        minPriceProduct: "",
        maxPriceProduct: "",
        discountProduct: "",
        quantityProduct: "",
        quantityProductWithDistribute: "",
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var reality_total = 0;
    var total_price = 0;
    if (nextState.change !== this.state.change) {
      console.log("thay doi change");
      nextState.listImportStock.forEach((item) => {
        reality_total = parseInt(reality_total) + parseInt(item.reality_exist);
        total_price =
          parseInt(total_price) +
          parseInt(item.import_price) * parseInt(item.reality_exist);
      });
      this.setState({
        reality_exist_total: reality_total,
        price_total: total_price,
      });
    }
    return true;
  }

  handleCallbackProduct = (modal, product) => {
    this.setState({
      infoProduct: modal,
      product: product,
    });
  };
  // onChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value })
  // }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (name == "txtValueDiscount") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        if (name == "txtValueDiscount" && this.state.txtDiscoutType == "1") {
          if (value.length < 3) {
            if (value == 0) {
              this.setState({ [name]: "" });
            } else {
              this.setState({ [name]: value });
            }
          }
        } else {
          if (value == 0) {
            this.setState({ [name]: "" });
          } else {
            this.setState({ [name]: value });
          }
        }
      }
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeType = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value, txtValueDiscount: "" });
  };
  handleCallbackPushProduct = (modal) => {
    this.setState({ change: !this.state.change });
    const index_element = this.state.listImportStock
      .map((e) => e.element_id)
      .indexOf(modal.element_id);
    if (index_element < 0) {
      this.setState({
        listImportStock: [...this.state.listImportStock, modal],
      });
    }
  };
  handleCallbackSupplier = (modal) => {
    this.setState({ infoSupplier: modal });
  };
  handleCallbackQuantity = (modal) => {
    var reality_total = 0;
    const newInventory = this.state.listImportStock;
    const index = newInventory
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    if (newInventory[index] != null) {
      newInventory[index].reality_exist = modal.currentQuantity;
      newInventory.forEach((item) => {
        reality_total = parseInt(reality_total) + parseInt(item.reality_exist);
      });
      this.setState({
        listImportStock: newInventory,
        reality_exist_total: reality_total,
      });
    }
    this.setState({ change: !this.state.change });
  };
  handleCallbackPrice = (modal) => {
    this.setState({ change: !this.state.change });
    const newInventory = this.state.listImportStock;
    const index = newInventory
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    newInventory[index].import_price = modal.import_price;
    this.setState({ listImportStock: newInventory });
  };

  handleDelete = (modal) => {
    this.setState({ change: !this.state.change });
    const newInventory = this.state.listImportStock;
    const index = this.state.listImportStock
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    newInventory.splice(index, 1);
    this.setState({ listImportStock: newInventory });
  };

  createImportStock = () => {
    const { store_code } = this.props.match.params;
    const { select_supplier } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var affterDiscount = "";
    if (this.state.txtDiscoutType == 0) {
      affterDiscount = formatNumber(this.state.txtValueDiscount);
    } else {
      affterDiscount =
        (this.state.txtValueDiscount / 100) * this.state.price_total;
    }
    const formData = {
      note: this.state.note,
      status: 0,
      supplier_id: select_supplier ? select_supplier.value : null,
      cost: this.state.cost,
      discount: affterDiscount,
      import_stock_items: this.state.listImportStock.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.reality_exist,
          distribute_name: item.nameDistribute,
          element_distribute_name: item.nameElement,
          sub_element_distribute_name: item.nameSubDistribute,
          import_price: item.import_price,
        };
      }),
    };
    this.props.createImportStocks(store_code, branch_id, formData);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onChanges = (e) => {
    this.setState({ note: e.target.value });
  };
  handleOnChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({ [name]: value });
  };
  getAllProduct = () => {
    this.setState({ searchValue: "" });
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id);
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}&check_inventory=true`;
    this.setState({ numPage: 20 });
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  passNumPage = (page) => {
    this.setState({ page: page });
  };
  handleCallbackPertion = (modal) => {
    this.setState({ modalUpdateCart: modal });
  };
  onChangeSelect4 = (selectValue) => {
    console.log(selectValue);

    var supplier = selectValue?.supplier;
    if (selectValue != null && supplier != null) {
      this.setState({ select_supplier: selectValue });
    }
  };

  loadSuppliers = async (search, loadedOptions, { page }) => {
    console.log("vaooooooooooooooooooo");
    var { store_code } = this.props.match.params;
    const params = `&search=${search}`;
    const res = await storeAction.fetchAllSupplier(store_code, page, params);
    console.log(res);
    if (res.status != 200) {
      return {
        options: [],
        hasMore: false,
      };
    }

    return {
      options: res.data.data.data.map((i) => {
        return { value: i.id, label: `${i.name}  (${i.phone})`, supplier: i };
      }),

      hasMore: res.data.data.data.length == 20,
      additional: {
        page: page + 1,
      },
    };
  };

  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const bonusParam = "&check_inventory=true";
    this.props.fetchAllProductV2(store_code, branch_id, 1, bonusParam);
    // this.props.fetchAllSupplier(store_code);
  }

  render() {
    var { supplier, products } = this.props;
    var {
      txtDiscoutType,
      txtValueDiscount,
      select_supplier_id,
      select_supplier,
    } = this.state;
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      listImportStock,
      infoSupplier,
      price_total,
      reality_exist_total,
    } = this.state;
    var type_discount_default = txtDiscoutType == "0" ? "show" : "hide";
    var type_discount_percent = txtDiscoutType == "1" ? "show" : "hide";
    const bonusParam = "&check_inventory=true";

    console.log(select_supplier_id);
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
                    <div
                      className="card shadow mb-4"
                      style={{ height: "100%" }}
                    >
                      <div
                        className="card-header py-3"
                        style={{ padding: "0", display: "flex" }}
                      >
                        <div
                          className="import-stock"
                          style={{
                            display: "flex",

                            width: "100%",
                          }}
                        >
                          <i
                            class="fa fa-user-o"
                            data-toggle="modal"
                            data-target="#modalPertion"
                            style={{
                              fontSize: "20px",
                              left: "3px",
                              bottom: "10px",
                              cursor: "pointer",
                              margin: 10,
                            }}
                          ></i>

                          <AsyncPaginate
                            placeholder="Tìm nhà cung cấp"
                            value={select_supplier}
                            loadOptions={this.loadSuppliers}
                            name="recipientReferences1"
                            onChange={this.onChangeSelect4}
                            additional={{
                              page: 1,
                            }}
                            debounceTimeout={500}
                            isClearable
                            isSearchable
                          />
                        </div>

                        {/* <button class="btn btn-warning" type="submit" data-toggle="modal" data-target="#supplier"><i class="fas fa-user"></i></button> */}
                        {/* <div class="card" style={{ marginLeft: "10px", width: "80%" }}>
                                                    <div class="card-body" style={{ padding: '0px' }}>{infoSupplier ? `${infoSupplier.name}` : 'Chọn nhà cung cấp'}</div>
                                                </div> */}
                      </div>

                      <div
                        className="card-bodys"
                        style={{
                          width: "0 10px",
                          height: "380px",
                          overflowY: "auto",
                        }}
                      >
                        <ListImportStock
                          store_code={store_code}
                          listImportStock={listImportStock}
                          handleCallbackQuantity={this.handleCallbackQuantity}
                          handleDelete={this.handleDelete}
                          handleCallbackPrice={this.handleCallbackPrice}
                        />
                      </div>
                      <div
                        className="voucher-input"
                        style={{ margin: "10px 0px" }}
                      ></div>
                      <div>
                        <div
                          class="card-body"
                          style={{
                            borderBottom: "1px solid #80808038",
                            borderTop: "1px solid #80808038",
                            padding: "10px 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tổng số lượng:</div>
                            <div>{reality_exist_total}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tổng tiền hàng:</div>
                            <div>{format(Number(price_total))}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>Chiết khấu:</div>
                            <div
                              className="wrap-discount"
                              style={{ display: "flex" }}
                            >
                              <select
                                name="txtDiscoutType"
                                className="form-control"
                                value={txtDiscoutType}
                                id="input"
                                onChange={this.onChangeType}
                                style={{
                                  height: "28px",
                                  width: "67px",
                                  padding: 0,
                                  textAlign: "center",
                                  marginRight: "6px",
                                }}
                              >
                                <option value="0">Giá trị</option>
                                <option value="1">%</option>
                              </select>
                              <div
                                class={`form-group ${type_discount_default}`}
                              >
                                <input
                                  type="text"
                                  name="txtValueDiscount"
                                  id="txtValueDiscount"
                                  value={txtValueDiscount}
                                  placeholder="Nhập giá trị"
                                  autoComplete="off"
                                  style={{
                                    height: "28px",
                                    width: "114px",
                                    textAlign: "right",
                                    borderRadius: 0,
                                    borderBottom:
                                      "1px solid rgb(128 128 128 / 71%)",
                                  }}
                                  onChange={this.onChange}
                                ></input>
                              </div>
                              <div className={`${type_discount_percent}`}>
                                <input
                                  type="text"
                                  name="txtValueDiscount"
                                  id="txtValueDiscount"
                                  value={txtValueDiscount}
                                  placeholder="Nhập %"
                                  autoComplete="off"
                                  style={{
                                    height: "28px",
                                    width: "114px",
                                    textAlign: "right",
                                    border: 0,
                                    borderRadius: 0,
                                    borderBottom:
                                      "1px solid rgb(128 128 128 / 71%)",
                                  }}
                                  onChange={this.onChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <div>Chi phí nhập hàng:</div>
                            <input
                              type="text"
                              name="cost"
                              id="usr"
                              class=" col-4"
                              value={this.state.priceCustomer}
                              style={{
                                height: "28px",
                                width: "100px",
                                textAlign: "right",
                                border: 0,
                                borderRadius: 0,
                                borderBottom:
                                  "1px solid rgb(128 128 128 / 71%)",
                              }}
                              onChange={this.onChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="comment">Thêm ghi chú:</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          id="comment"
                          style={{ height: "50px" }}
                          onChange={this.onChanges}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-warning"
                        style={{ marginTop: "20px" }}
                        onClick={() => this.createImportStock()}
                      >
                        Tạo đơn nhập
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-8 col-xl-8 col-md-12 col-sm-12">
                    <div
                      className="card shadow mb-4"
                      style={{ height: "100%" }}
                    >
                      <div
                        className="card-header py-3"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <form onSubmit={this.searchData}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{
                                maxWidth: "400px",
                                position: "relative",
                              }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm sản phẩm"
                            />

                            <div
                              class="input-group-append"
                              style={{ position: "relative" }}
                            >
                              <button
                                class="btn btn-warning"
                                type="submit"
                                style={{ borderRadius: "3px" }}
                              >
                                <i class="fa fa-search"></i>
                              </button>
                              {searchValue ? (
                                <i
                                  class="fas fa-close close-status "
                                  style={{
                                    position: "absolute",
                                    left: "-14px",
                                    top: "11px",
                                  }}
                                  onClick={this.getAllProduct}
                                ></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </form>

                        <div className="wrap-pagination">
                          <Paginations
                            limit={numPage}
                            bonusParam={bonusParam}
                            passNumPage={this.passNumPage}
                            store_code={store_code}
                            products={products}
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        {products.data?.length > 0 ? (
                          <CardProduct
                            store_code={store_code}
                            handleCallbackProduct={this.handleCallbackProduct}
                          />
                        ) : (
                          <div>Không tồn tại sản phẩm</div>
                        )}
                      </div>
                      <ModalDetail
                        product={this.state.product}
                        modal={this.state.infoProduct}
                        handleCallbackPushProduct={
                          this.handleCallbackPushProduct
                        }
                      />
                      <ModalSupplier
                        supplier={supplier}
                        store_code={store_code}
                        handleCallbackSupplier={this.handleCallbackSupplier}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducers.product.allProduct,
    sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
    supplier: state.storeReducers.store.supplier,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    createImportStocks: (store_code, branch_id, data) => {
      dispatch(ImportAction.createImportStocks(store_code, branch_id, data));
    },
    fetchAllSupplier: (store_code) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateImportStock);
