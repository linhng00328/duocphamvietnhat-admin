import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import * as productAction from "../../actions/product";
import * as dashboardAction from "../../actions/dashboard";
import * as placeAction from "../../actions/place";
import * as CategoryPAction from "../../actions/category_product";
import * as storeAction from "../../data/remote/store";

import * as ImportAction from "../../actions/import_stock";
import CardProduct from "../../components/Import_stock/CardProduct";
import ModalDetail from "../../components/Import_stock/ModalDetail";
import ModalSupplier from "../../components/Import_stock/ModalSupplier";
import ListImportStock from "../../components/Import_stock/ListImportStock";
import ModalAddSupplier from "../../components/Import_stock/ModalAddSupplier";

import { format, getQueryParams } from "../../ultis/helpers";
import { formatNumber } from "../../ultis/helpers";
import Paginations from "../../components/Import_stock/Paginations";
import { AsyncPaginate } from "react-select-async-paginate";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import history from "../../history";
import Select from "react-select";
import styled from "styled-components";

const ImportCreateStyles = styled.div`
  .import_stock_vat {
    display: flex;
    align-items: center;
    column-gap: 5px;
    .import_stock_content {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .import_stock_vat_percent {
        padding: 0px 8px;
        border-radius: 3px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        &:nth-child(1) {
          background-color: #0072bc;
        }
        &:nth-child(2) {
          background-color: #9c27b0;
        }
      }
    }
  }
`;

class CreateImportStock extends Component {
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
      searchValue: getQueryParams("search") || "",
      numPage: getQueryParams("limit") || 20,
      page: getQueryParams("page") || 1,
      categorySelected: getQueryParams("category_ids")?.split(",") || [],
      categoryChildSelected:
        getQueryParams("category_children_ids")?.split(",") || [],
      listCategory: [],
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
    if (
      !shallowEqual(this.props.category_product, nextProps.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return {
            id: category.id,
            label: category.name,
            categories_child: category.category_children?.map(
              (categoryChild) => ({
                id: categoryChild.id,
                label: categoryChild.name,
              })
            ),
          };
        });
        const categoryIds = getQueryParams("category_ids")?.split(",") || [];
        const categoryChildIds =
          getQueryParams("category_children_ids")?.split(",") || [];
        var categorySelected = [];
        if (categoryIds?.length > 0) {
          categorySelected = option.filter((item) =>
            categoryIds.includes(item?.id?.toString())
          );
          this.setState({
            categorySelected: categorySelected,
          });
        }
        const newCategoryChildSelected = [];
        if (categoryChildIds?.length > 0) {
          option.forEach((category) => {
            if (category.categories_child?.length > 0) {
              category.categories_child.forEach((item) => {
                if (categoryChildIds.includes(item?.id?.toString())) {
                  newCategoryChildSelected.push(item);
                }
              });
            }
          });
          this.setState({
            categoryChildSelected: newCategoryChildSelected,
          });
        }

        this.setState({
          listCategory: option,
        });

        const branch_id = getBranchId();
        const branch_ids = getBranchIds();
        const branchIds = branch_ids ? branch_ids : branch_id;
        const { store_code } = this.props.match.params;

        var is_near_out_of_stock = getQueryParams("is_near_out_of_stock");
        var params = this.getParams(
          this.state.searchValue,
          this.state.numPage,
          categorySelected,
          newCategoryChildSelected
        );
        if (is_near_out_of_stock) {
          params = params + `&is_near_out_of_stock=true`;
        }

        this.props.fetchAllProductV2(
          store_code,
          branchIds,
          this.state.page,
          params
        );
      }
    }

    return true;
  }

  handleCallbackProduct = (modal, product) => {
    console.log("vào", product, modal);
    this.setState({
      infoProduct: modal,
      product: product,
    });
  };
  // onChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value })
  // }
  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);

    const { txtDiscoutType, txtValueDiscount, price_total, vat, cost } =
      this.state;
    const txtValuePercent =
      txtDiscoutType == "1" && txtValueDiscount
        ? formatNumber(price_total) / formatNumber(txtValueDiscount)
        : 0;
    const value_default =
      txtDiscoutType == "1" ? txtValuePercent : formatNumber(txtValueDiscount);

    let paymentNeed = parseFloat(price_total - value_default + vat + cost);
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
        if (name == "total_payment") {
          const a = parseFloat(e.target.value) || 0;
          if (a == 0) {
            this.setState({ [name]: "" });
          } else {
            if (a > paymentNeed) {
              this.setState({ [name]: paymentNeed });
            } else {
              this.setState({ [name]: a });
            }
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

  createImportStock = (status) => {
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
      status: status === "COMPLETED" ? 3 : 0,
      supplier_id: select_supplier ? select_supplier.value : null,
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
    const { numPage, categorySelected, categoryChildSelected } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = this.getParams(
      "",
      numPage,
      categorySelected,
      categoryChildSelected
    );

    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue, numPage, categorySelected, categoryChildSelected } =
      this.state;

    var params = this.getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
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
    this.setState({ select_supplier: selectValue });
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

  getParams = (
    search,
    limit = 20,
    categories,
    categories_child,
    check_inventory = true
  ) => {
    var params = ``;
    if (search != "" && search != null) {
      params = params + `&search=${search}`;
    }
    if (limit != "" && limit != null) {
      params = params + `&limit=${limit}`;
    }
    if (check_inventory) {
      params = params + `&check_inventory=true`;
    }
    if (categories !== "" && categories !== null && categories?.length > 0) {
      const newCategorySelected = categories.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categories.length - 1
                ? currentCategory?.id
                : `${currentCategory?.id},`
            }`
          );
        },
        "&category_ids="
      );

      params += newCategorySelected;
    }
    if (
      categories_child !== "" &&
      categories_child !== null &&
      categories_child?.length > 0
    ) {
      const newCategoryChildSelected = categories_child.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categories_child.length - 1
                ? currentCategory?.id
                : `${currentCategory?.id},`
            }`
          );
        },
        "&category_children_ids="
      );

      params += newCategoryChildSelected;
    }

    return params;
  };

  getNameSelected() {
    const { categorySelected, categoryChildSelected } = this.state;
    var name = "";
    if (categorySelected.length > 0 || categoryChildSelected.length > 0) {
      const newCategoryCombine = [
        ...categorySelected,
        ...categoryChildSelected,
      ];
      name += newCategoryCombine.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === newCategoryCombine.length - 1
                ? currentCategory?.label
                : `${currentCategory?.label}, `
            }`
          );
        },
        ""
      );
    }

    return name;
  }
  handleCheckedCategory = (idCategory) => {
    const { categorySelected } = this.state;
    if (categorySelected?.length > 0) {
      const checked = categorySelected
        .map((category) => category?.id)
        .includes(idCategory);
      return checked;
    }
    return false;
  };

  handleChangeCategory = (category) => {
    const { categorySelected, numPage, categoryChildSelected } = this.state;
    const { store_code } = this.props.match.params;
    var newCategorySelected = [];
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    const isExisted = categorySelected.map((c) => c?.id).includes(category?.id);
    if (isExisted) {
      newCategorySelected = categorySelected.filter(
        (c) => c?.id !== category.id
      );
    } else {
      newCategorySelected = [...categorySelected, category];
    }

    this.setState({
      categorySelected: newCategorySelected,
      page: 1,
      searchValue: "",
    });
    const params = this.getParams(
      "",
      numPage,
      newCategorySelected,
      categoryChildSelected
    );
    history.push(`/import_stock/create/${store_code}?page=1${params}`);
    this.props.fetchAllProductV2(store_code, branchIds, 1, params);
  };

  handleCheckedCategoryChild = (idCategory) => {
    const { categoryChildSelected } = this.state;
    if (categoryChildSelected?.length > 0) {
      const checked = categoryChildSelected
        .map((category) => category?.id)
        .includes(idCategory);
      return checked;
    }
    return false;
  };

  handleChangeCategoryChild = (category) => {
    const { categoryChildSelected, numPage, categorySelected } = this.state;
    const { store_code } = this.props.match.params;
    var newCategoryChildSelected = [];
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    const isExisted = categoryChildSelected
      .map((c) => c?.id)
      .includes(category?.id);
    if (isExisted) {
      newCategoryChildSelected = categoryChildSelected.filter(
        (c) => c?.id !== category.id
      );
    } else {
      newCategoryChildSelected = [...categoryChildSelected, category];
    }

    this.setState({
      categoryChildSelected: newCategoryChildSelected,
      page: 1,
      searchValue: "",
    });
    const params = this.getParams(
      "",
      numPage,
      categorySelected,
      newCategoryChildSelected
    );
    history.push(`/import_stock/create/${store_code}?page=1${params}`);
    this.props.fetchAllProductV2(store_code, branchIds, 1, params);
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

  handleSelectPercentVAT = (value) => {
    const { price_total } = this.state;
    const newVAT = new Intl.NumberFormat().format(Number(price_total) / 10);

    this.setState({ vat: value > 0 ? newVAT : 0 });
  };

  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const { searchValue, numPage, categorySelected, categoryChildSelected } =
      this.state;
    const params = this.getParams(
      searchValue,
      numPage,
      categorySelected,
      categoryChildSelected
    );
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
    this.props.fetchPlaceProvince();
    this.props.fetchAllCategoryP(store_code);

    // this.props.fetchAllSupplier(store_code);
  }

  render() {
    var { supplier, products, province, wards, district } = this.props;
    var {
      txtDiscoutType,
      txtValueDiscount,
      select_supplier_id,
      select_supplier,
      openModal,
    } = this.state;
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      listImportStock,
      infoSupplier,
      price_total,
      reality_exist_total,
      listCategory,
      categorySelected,
      categoryChildSelected,
      payment_method_selected,
      listPaymentMethod,
    } = this.state;
    var type_discount_default = txtDiscoutType == "0" ? "show" : "hide";
    var type_discount_percent = txtDiscoutType == "1" ? "show" : "hide";
    const bonusParam = "&check_inventory=true";

    console.log("this.props.loading::: ", this.props.loading);
    return (
      <ImportCreateStyles id="wrapper">
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
                            <div>
                              {price_total ? format(Number(price_total)) : 0}
                            </div>
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
                            <div className="import_stock_vat">
                              <div>VAT:</div>
                              <div className="import_stock_content">
                                <div
                                  className="import_stock_vat_percent"
                                  onClick={() => this.handleSelectPercentVAT(0)}
                                >
                                  0
                                </div>
                                <div
                                  className="import_stock_vat_percent"
                                  onClick={() =>
                                    this.handleSelectPercentVAT(10)
                                  }
                                >
                                  10%
                                </div>
                              </div>
                            </div>
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
                              name="cost"
                              class=" col-4"
                              value={this.state.cost}
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
                              value={this.state.total_payment}
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
                            <div>Phương thức thanh toán:</div>
                            <Select
                              isClearable
                              isSearchable
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
                          onClick={() => this.createImportStock()}
                        >
                          <span class="fa fa-floppy-o"></span>
                          Lưu
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            alignItems: "center",
                            columnGap: "5px",
                          }}
                          disabled={this.props.loading === "show"}
                          onClick={() => this.createImportStock("COMPLETED")}
                        >
                          <span class="fa fa-check"></span>
                          Hoàn thành
                        </button>
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
                        <div className="categories__content">
                          <div
                            id="accordion"
                            style={{
                              width: "300px",
                              position: "relative",
                            }}
                          >
                            <div
                              className="wrap_category input-group"
                              style={{ display: "flex" }}
                              data-toggle="collapse"
                              data-target="#collapseCategory"
                              aria-expanded="false"
                              aria-controls="collapseCategory"
                            >
                              <input
                                readOnly
                                type="text"
                                class="form-control"
                                placeholder="--Chọn danh mục--"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  paddingRight: "55px",
                                  position: "relative",
                                  backgroundColor: "transparent",
                                }}
                                value={this.getNameSelected()}
                              ></input>
                              <button
                                class="btn  btn-accordion-collapse collapsed input-group-text"
                                id="headingOne"
                                style={{
                                  borderTopLeftRadius: "0",
                                  borderBottomLeftRadius: "0",
                                }}
                              >
                                <i
                                  className={
                                    this.state.icon
                                      ? "fa fa-caret-down"
                                      : "fa fa-caret-down"
                                  }
                                ></i>
                              </button>
                            </div>
                            <div
                              id="collapseCategory"
                              className="collapse"
                              ariaLabelledby="headingOne"
                              dataParent="#accordion"
                              style={{
                                position: "absolute",
                                width: "100%",
                                left: "0",
                                top: "100%",
                                zIndex: "10",
                                background: "#fff",
                                boxShadow: "1px 2px 6px rgba(0,0,0,0.1)",
                              }}
                            >
                              <ul
                                style={{
                                  listStyle: "none",
                                  margin: "5px 0",
                                  height: "235px",
                                  overflowY: "auto",
                                }}
                                class="list-group"
                              >
                                {listCategory?.length > 0 ? (
                                  listCategory.map((category, index) => (
                                    <li class="">
                                      <div
                                        style={{
                                          cursor: "pointer",
                                          paddingTop: "5px",
                                          paddingLeft: "5px",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="checkbox"
                                          id={category.label}
                                          style={{
                                            marginRight: "10px",
                                            width: "30px",
                                            height: "15px",
                                            flexShrink: "0",
                                          }}
                                          checked={this.handleCheckedCategory(
                                            category.id
                                          )}
                                          onChange={() =>
                                            this.handleChangeCategory(category)
                                          }
                                        />
                                        <label
                                          htmlFor={category.label}
                                          style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            marginBottom: "0",
                                          }}
                                          title={category.label}
                                        >
                                          {category.label}
                                        </label>
                                      </div>
                                      {category.categories_child?.length >
                                        0 && (
                                        <ul
                                          className="list-group-child"
                                          style={{
                                            marginLeft: "20px",
                                          }}
                                        >
                                          {category.categories_child.map(
                                            (categoryChild) => (
                                              <div
                                                style={{
                                                  cursor: "pointer",
                                                  paddingTop: "5px",
                                                  paddingLeft: "5px",
                                                  display: "flex",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  id={categoryChild.label}
                                                  style={{
                                                    marginRight: "10px",
                                                    width: "30px",
                                                    height: "15px",
                                                    flexShrink: "0",
                                                  }}
                                                  checked={this.handleCheckedCategoryChild(
                                                    categoryChild.id
                                                  )}
                                                  onChange={() =>
                                                    this.handleChangeCategoryChild(
                                                      categoryChild
                                                    )
                                                  }
                                                />
                                                <label
                                                  htmlFor={categoryChild.label}
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    marginBottom: "0",
                                                  }}
                                                  title={categoryChild.label}
                                                >
                                                  {categoryChild.label}
                                                </label>
                                              </div>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </li>
                                  ))
                                ) : (
                                  <div
                                    style={{
                                      marginTop: "20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    Không có kết quả !
                                  </div>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="wrap-pagination">
                          <Paginations
                            numPage={numPage}
                            searchValue={searchValue}
                            categorySelected={categorySelected}
                            categoryChildSelected={categoryChildSelected}
                            getParams={this.getParams}
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
      </ImportCreateStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducers.product.allProduct,
    sheetsInventory: state.inventoryReducers.inventory_reducer.sheetsInventory,
    supplier: state.storeReducers.store.supplier,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    category_product: state.categoryPReducers.category_product.allCategoryP,
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
    createImportStocks: (store_code, branch_id, data) => {
      dispatch(ImportAction.createImportStocks(store_code, branch_id, data));
    },
    changeStatus: (store_code, branch_id, id, data, onSuccess) => {
      dispatch(
        ImportAction.changeStatus(store_code, branch_id, id, data, onSuccess)
      );
    },
    fetchAllSupplier: (store_code) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateImportStock);
