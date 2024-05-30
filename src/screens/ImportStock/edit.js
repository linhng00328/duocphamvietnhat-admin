import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import Paginations from "../../components/Import_stock/Paginations";
import ModalAddSupplier from "../../components/Import_stock/ModalAddSupplier";
import * as placeAction from "../../actions/place";

import * as productAction from "../../actions/product";
import * as ImportAction from "../../actions/import_stock";
import history from "../../history";
import CardProduct from "../../components/Import_stock/CardProduct";
import ModalDetail from "../../components/Import_stock/ModalDetail";
import ModalSupplier from "../../components/Import_stock/ModalSupplier";
import * as dashboardAction from "../../actions/dashboard";
import ListImportStock from "../../components/Import_stock/ListImportStock";
import { format, formatNumber } from "../../ultis/helpers";
import * as storeAction from "../../data/remote/store";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";

class EditImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      listImportStock: [],
      reality_exist_total: 0,
      existing_branch: 0,
      price_total: 0,
      openModal: false,

      note: "",
      infoSupplier: "",
      tax: "",
      select_supplier: null,
      discount: "",
      cost: "",
      total_payment: "",
      vat: "",
      payment_method_selected: {
        value: 0,
        label: "Tiền mặt",
      },
      listPaymentMethod: [
        {
          value: 0,
          label: "Tiền mặt",
        },
        {
          value: 1,
          label: "Quẹt thẻ",
        },
        {
          value: 2,
          label: "Cod",
        },
        {
          value: 3,
          label: "Chuyển khoản",
        },
      ],
      txtDiscoutType: 0,
      txtValueDiscount: "",
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

  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };

  componentWillReceiveProps(nextProps) {
    var total_price = 0;
    if (!shallowEqual(nextProps.itemImportStock, this.props.itemImportStock)) {
      const {
        discount,
        cost,
        vat,
        total_payment,
        tax,
        note,
        supplier,
        payment_method,
      } = nextProps.itemImportStock;
      const newImportStock = this.state.listImportStock;
      nextProps.itemImportStock.import_stock_items.forEach((item) => {
        total_price = parseInt(total_price) + parseInt(item.import_price);
        newImportStock.push({
          element_id: item.id,
          nameDistribute: item.distribute_name || "",
          nameElement: item.element_distribute_name || "",
          nameProduct: item.product.name,
          nameSubDistribute: item.sub_element_distribute_name || "",
          product_id: item.product.id,
          import_price: item.import_price,
          reality_exist: item.quantity,
        });
      });
      const new_payment_method_selected = this.state.listPaymentMethod.filter(
        (item) => item.value === payment_method
      );
      this.setState({
        listImportStock: newImportStock,
        price_total: total_price,
        txtValueDiscount: discount
          ? new Intl.NumberFormat().format(discount)
          : discount,
        select_supplier: supplier
          ? {
              value: supplier.id,
              label: `${supplier.name} (${supplier.phone})`,
              supplier: supplier,
            }
          : null,
        tax: tax,
        cost: cost ? new Intl.NumberFormat().format(cost) : cost,
        vat: vat ? new Intl.NumberFormat().format(vat) : vat,
        total_payment: total_payment
          ? new Intl.NumberFormat().format(total_payment)
          : total_payment,
        payment_method_selected:
          new_payment_method_selected.length > 0
            ? new_payment_method_selected[0]
            : this.state.payment_method_selected,
        note: note,
      });
    }
  }

  handleCallbackProduct = (modal, product) => {
    this.setState({
      infoProduct: modal,
      product: product,
    });
  };
  // onChange = (e) =>{
  //     this.setState({[e.target.name]:e.target.value})
  // }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (
      name == "txtValueDiscount" ||
      name == "cost" ||
      name == "total_payment" ||
      name == "vat"
    ) {
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
    // const index_element = this.state.listImportStock.map(e => e.element_id).indexOf(modal.element_id)
    const index_element = this.state.listImportStock.filter(
      (e) =>
        e.product_id === modal.product_id &&
        e.nameDistribute == modal.nameDistribute &&
        e.nameElement == modal.nameElement &&
        e.nameSubDistribute == modal.nameSubDistribute
    );

    console.log(modal, this.state.listImportStock, index_element);
    if (index_element?.length === 0) {
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

  updateImportStock = (status) => {
    const { store_code, id } = this.props.match.params;
    const { select_supplier } = this.state;
    const { itemImportStock } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    var affterDiscount = "";

    if (this.state.txtDiscoutType == 0) {
      affterDiscount = formatNumber(this.state.txtValueDiscount);
    } else {
      affterDiscount =
        (formatNumber(this.state.txtValueDiscount) / 100) *
        this.state.price_total;
    }
    const formData = {
      note: this.state.note,
      status: status === "COMPLETED" ? 3 : itemImportStock.status,
      supplier_id: select_supplier ? select_supplier.value : null,
      tax: this.state.tax,
      cost: this.state.cost ? formatNumber(this.state.cost) : 0,
      vat: this.state.vat ? formatNumber(this.state.vat) : 0,
      total_payment: this.state.total_payment
        ? formatNumber(this.state.total_payment)
        : 0,
      discount: affterDiscount,
      payment_method: this.state.payment_method_selected
        ? this.state.payment_method_selected.value
        : 0,
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
    this.props.updateImportStock(store_code, branch_id, id, formData);
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

  componentDidMount() {
    const { store_code, id } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const bonusParam = "&check_inventory=true";
    this.props.fetchAllProductV2(store_code, branch_id, 1, bonusParam);
    this.props.fetchAllSupplier(store_code);
    this.props.fetchDetailImportStock(store_code, branch_id, id);
    this.props.fetchPlaceProvince();
  }
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
  onChangeSelect4 = (selectValue) => {
    this.setState({ select_supplier: selectValue });
    // var supplier = selectValue?.supplier;
    // if (selectValue != null && supplier != null) {
    // }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ payment_method_selected: selectValue });
  };

  displayPaymentNeed = () => {
    const { txtDiscoutType, txtValueDiscount, price_total, vat, cost } =
      this.state;
    const txtValuePercent =
      txtDiscoutType == "1" && txtValueDiscount
        ? formatNumber(price_total) / formatNumber(txtValueDiscount)
        : 0;
    const value_default =
      txtDiscoutType == "1" ? txtValuePercent : formatNumber(txtValueDiscount);

    return format(
      formatNumber(price_total) -
        value_default +
        formatNumber(vat) +
        formatNumber(cost)
    );
  };

  render() {
    var { supplier, products, province, wards, district, itemImportStock } =
      this.props;
    var { txtDiscoutType, txtValueDiscount, openModal } = this.state;
    var type_discount_default = txtDiscoutType == "0" ? "show" : "hide";
    var type_discount_percent = txtDiscoutType == "1" ? "show" : "hide";
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      listImportStock,
      infoSupplier,
      price_total,
      reality_exist_total,
      cost,
      total_payment,
      select_supplier,
      payment_method_selected,
      listPaymentMethod,
    } = this.state;
    const bonusParam = "&check_inventory=true";

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <ModalAddSupplier
          openModal={openModal}
          resetModal={this.resetModal}
          wards={wards}
          district={district}
          store_code={store_code}
          province={province}
        />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              <div className="container-fluid">
                <h4 className="h4 title_content mb-10 text-gray-800">
                  Sửa đơn nhập
                </h4>
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
                          <div
                            style={{
                              width: "100%",
                            }}
                          >
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
                              // isClearable
                              isSearchable
                              isDisabled
                            />
                          </div>
                        </div>
                        <i
                          class="fas fa-plus"
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            margin: "7px 5px 0px 10px",
                          }}
                          data-toggle="modal"
                          data-target="#modalAddress"
                        ></i>
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
                      <div class="card">
                        <div class="card-body" style={{ padding: "0" }}>
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
                            <div>VAT:</div>
                            <input
                              type="text"
                              name="vat"
                              class=" col-4"
                              value={this.state.vat}
                              style={{
                                height: "28px",
                                width: "100px",
                                textAlign: "right",
                                border: 0,
                                borderRadius: 0,
                                borderBottom:
                                  "1px solid rgb(128 128 128 / 71%)",
                                padding: 0,
                              }}
                              onChange={this.onChange}
                            ></input>
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
                              class=" col-4"
                              name="cost"
                              style={{
                                height: "28px",
                                width: "100px",
                                textAlign: "right",
                                padding: 0,
                                border: 0,
                                borderRadius: 0,
                                borderBottom:
                                  "1px solid rgb(128 128 128 / 71%)",
                              }}
                              value={cost}
                              id="usr"
                              onChange={this.onChange}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "15px",
                            }}
                          >
                            <div>Số tiền cần thanh toán:</div>
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              {this.displayPaymentNeed()}
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
                            <div>Thanh toán:</div>
                            <input
                              type="text"
                              name="total_payment"
                              class=" col-4"
                              value={total_payment}
                              id="usr"
                              style={{
                                height: "28px",
                                width: "100px",
                                textAlign: "right",
                                border: 0,
                                borderRadius: 0,
                                borderBottom:
                                  "1px solid rgb(128 128 128 / 71%)",
                                paddingRight: 0,
                              }}
                              onChange={this.onChange}
                            ></input>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "5px",
                            }}
                          >
                            <div>Phương thức thanh toán:</div>
                            <Select
                              isClearable
                              isSearchable
                              isDisabled
                              placeholder="--Chọn hình thức--"
                              value={payment_method_selected}
                              options={listPaymentMethod}
                              name="payment_method"
                              onChange={this.onChangeSelect}
                            />
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
                          value={this.state.note}
                          onChange={this.onChanges}
                        ></textarea>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          columnGap: "15px",
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            alignItems: "center",
                            columnGap: "5px",
                          }}
                          disabled={this.props.loading === "show"}
                          onClick={() => this.updateImportStock()}
                        >
                          <span class="fa fa-floppy-o"></span>
                          Lưu
                        </button>
                        {itemImportStock.status !== 3 ? (
                          <button
                            className="btn btn-warning"
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              alignItems: "center",
                              columnGap: "5px",
                            }}
                            disabled={this.props.loading === "show"}
                            onClick={() => this.updateImportStock("COMPLETED")}
                          >
                            <span class="fa fa-check"></span>
                            Hoàn thành
                          </button>
                        ) : null}
                      </div>
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
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm mã đơn, tên, SĐT"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-warning" type="submit">
                                <i class="fa fa-search"></i>
                              </button>
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
                        <CardProduct
                          store_code={store_code}
                          handleCallbackProduct={this.handleCallbackProduct}
                        />
                      </div>

                      {/* <Pagination limit={numPage}
                                                    searchValue={searchValue}
                                                    passNumPage={this.passNumPage} store_code={store_code} products={products} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalDetail
          modal={this.state.infoProduct}
          product={this.state.product}
          handleCallbackPushProduct={this.handleCallbackPushProduct}
        />
        <ModalSupplier
          supplier={supplier}
          handleCallbackSupplier={this.handleCallbackSupplier}
        />
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
    itemImportStock: state.importStockReducers.import_reducer.detailImportStock,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    loading: state.loadingReducers.disable,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    updateImportStock: (store_code, branch_id, id, data) => {
      dispatch(ImportAction.updateImportStock(store_code, branch_id, id, data));
    },
    fetchAllSupplier: (store_code) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code));
    },
    fetchDetailImportStock: (store_code, branch_id, id) => {
      dispatch(ImportAction.fetchDetailImportStock(store_code, branch_id, id));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditImportStock);
