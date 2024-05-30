import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import General from "../../components/Product/General";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import Pagination from "../../components/Product/Pagination";
import ModalDelete from "../../components/Product/Delete/Modal";
import ModalMultiDelete from "../../components/Product/Delete/MultiDelete";
import ImportModal from "../../components/Product/Import/index";
import NotAccess from "../../components/Partials/NotAccess";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as productAction from "../../actions/product";
import * as XLSX from "xlsx";
import { randomString } from "../../ultis/helpers";
import Table from "./Table";
import { shallowEqual } from "../../ultis/shallowEqual";
import { getBranchId, getBranchIds } from "../../ultis/branchUtils";
import { getQueryParams } from "../../ultis/helpers";
import * as dashboardAction from "../../actions/dashboard";

class ProductInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        store_code: "",
        name: "",
      },
      multi: {
        title: "",
        data: [],
        store_code: "",
      },
      searchValue: "",
      importData: [],
      allow_skip_same_name: false,
      page: 1,
      numPage: 20,
      listType: "0",
      listProduct: "",
      is_near_out_of_stock: false,
    };
  }

  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { searchValue, listType, is_near_out_of_stock } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params = `&search=${searchValue ?? ""}&limit=${numPage}`;
    if (is_near_out_of_stock) params = params + `&is_near_out_of_stock=true`;
    if (listType == 1) params = params + `&check_inventory=true`;

    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    console.log(params);
    this.props.fetchAllProductV2(
      this.props.match.params.store_code,
      branchIds,
      1,
      params
    );
  };

  paramNearStock = (status) => {
    this.setState({ is_near_out_of_stock: status });
  };
  onChangeType = (e) => {
    var target = e.target;
    var value = target.value;
    this.setState({ listType: value });
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  componentDidMount() {
    var { page } = this.props.match.params;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var is_near_out_of_stock = getQueryParams("is_near_out_of_stock");
    var status = getQueryParams("status");
    this.setState({ is_near_out_of_stock });
    var params = null;
    if (is_near_out_of_stock) {
      params = params + `&is_near_out_of_stock=true`;
    }
    if (status) {
      params = params + `&status=${status}`;
    }
    if (
      typeof page != "undefined" &&
      page != null &&
      page != "" &&
      !isNaN(Number(page))
    ) {
      this.props.fetchAllProductV2(
        this.props.match.params.store_code,
        branchIds,
        page,
        params
      );
    } else {
      this.props.fetchAllProductV2(
        this.props.match.params.store_code,
        branchIds,
        params
      );
    }
    this.props.fetchDataId(this.props.match.params.store_code);
    this.props.getAmountProductNearlyOutStock(
      this.props.match.params.store_code,
      branch_id
    );
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      // var insert = permissions.product_add;
      // var update = permissions.product_update;
      // var _delete = permissions.product_remove_hide;
      // var _import = permissions.product_import_from_exel;
      // var _export = permissions.product_export_to_exel;
      // var ecommerce = permissions.product_ecommerce;
      var insert = permissions.inventory_list;
      var update = permissions.inventory_list;
      var _delete = permissions.inventory_list;
      var _import = permissions.inventory_list;
      var _export = permissions.inventory_list;
      var ecommerce = permissions.inventory_list;

      var isShow = permissions.inventory_list;

      this.setState({
        isLoading: true,
        insert,
        update,
        _delete,
        _import,
        _export,
        isShow,
        ecommerce,
      });
    }
  }

  getParams = (listType = 1, is_near_out_of_stock, search, limit) => {
    var params = "";
    if (listType == 1) {
      params = params + `&check_inventory=true`;
    } else if (listType == 2) {
      params = params + `&is_near_out_of_stock=true`;
    } else {
    }
    if (is_near_out_of_stock) {
      params = params + `&is_near_out_of_stock=${is_near_out_of_stock}`;
    }
    if (search !== "" || search !== undefined || search !== null) {
      params = params + `&search=${search}`;
    }
    if (limit !== "" || limit !== undefined || limit !== null) {
      params = params + `&limit=${limit}`;
    }

    return params;
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState.listType, this.state.listType)) {
      if (nextState.listType == 1) {
        // const listData = this.props.products.data.filter(item => item.check_inventory == true);
        // this.setState({listProduct:listData}
        const { store_code } = this.props.match.params;
        const branch_id = getBranchId();
        const branch_ids = getBranchIds();
        const branchIds = branch_ids ? branch_ids : branch_id;
        // var params = `&check_inventory=true`;
        var params = this.getParams(
          nextState.listType,
          this.state.is_near_out_of_stock,
          this.state.searchValue,
          this.state.numPage
        );

        this.props.fetchAllProductV2(store_code, branchIds, 1, params);
      } else if (nextState.listType == 2) {
        const { store_code } = this.props.match.params;
        const branch_id = getBranchId();
        const branch_ids = getBranchIds();
        const branchIds = branch_ids ? branch_ids : branch_id;
        var params = this.getParams(
          nextState.listType,
          this.state.is_near_out_of_stock,
          this.state.searchValue,
          this.state.numPage
        );
        this.props.fetchAllProductV2(store_code, branchIds, 1, params);
      } else {
        // this.setState({listProduct:this.props.products.data})
        const { store_code } = this.props.match.params;
        const branch_id = getBranchId();
        const branch_ids = getBranchIds();
        const branchIds = branch_ids ? branch_ids : branch_id;
        var params = this.getParams(
          null,
          this.state.is_near_out_of_stock,
          this.state.searchValue,
          this.state.numPage
        );
        this.props.fetchAllProductV2(store_code, branchIds, 1, params);
      }
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.products, this.props.products)) {
      this.setState({ listProduct: nextProps.products.data });
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.inventory_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.inventory_list;
      this.setState({ isLoading: true, isShow });
    }
  }
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleMultiDelCallBack = (multi) => {
    this.setState({ multi: multi });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    var params = `&search=${searchValue ?? ""}`;
    console.log("params", params);
    this.setState({ numPage: 20 });
    this.props.fetchAllProductV2(store_code, branchIds, 1, params);
  };
  fetchAllData = () => {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchAllProductV2(store_code, branchIds, 1);
  };
  showDialogImportExcel = () => {
    $("#file-excel-import").trigger("click");
  };

  onChangeExcel = (evt) => {
    var f = evt.target.files[0];
    const reader = new FileReader();
    window.$("#importModal").modal("show");
    this.setState({ allow_skip_same_name: randomString(10) });
    var _this = this;
    reader.onload = function (evt) {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        _this.setState({ importData: rowObject });
      });
    };
    document.getElementById("file-excel-import").value = null;
    reader.readAsBinaryString(f);
  };

  onClickImport = () => {
    $("#import_file_excel").trigger("click");
  };

  handleImportFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      //Filter Data

      //Index: 0: "Tên sản phẩm", 1: "Mã BARCODE", 2: "Theo dõi kho (Có/Không)", 3: "Vị trí kệ hàng", 4: "Phân loại(Có/Không)", 5: "Phân loại chính", 6: "Phân loại phụ", 7: "DS phân loại", 8: "Mã SKU", 9: "Hình ảnh", 10: "Giá bán lẻ", 11: "Giá nhập", 12: "Giá vốn", 13: "Tồn kho"

      const dataXlsxEmptyTitle = data.slice(1);
      const newProducts = [];

      let newDistributes = [];
      let isDistributeProduct = false;
      let nameElementDistribute = "";
      let newProductHasDistribute = {};
      let positionDistributeProduct = -1;
      dataXlsxEmptyTitle.forEach((product, index) => {
        const newProduct = {};

        if (product[4]?.toString().toLowerCase().trim() === "không") {
          newProduct["name"] = product[0];
          newProduct["barcode"] = product[1];

          if (product[2]?.toString().toLowerCase().trim() === "có") {
            newProduct["shelf_position"] = product[3];
            newProduct["check_inventory"] = true;
          } else {
            newProduct["shelf_position"] = "";
            newProduct["check_inventory"] = false;
          }

          newProduct["distributes"] = [];
          newProduct["sku"] = product[8] ? product[8] : null;
          newProduct["images"] = !product[9] ? [] : product[9].split(",");
          newProduct["price"] = !product[10] ? 0 : Number(product[10]);
          newProduct["import_price"] = !product[11] ? 0 : Number(product[11]);
          newProduct["cost_of_capital"] = !product[12]
            ? 0
            : Number(product[12]);
          newProduct["stock"] = !product[13] ? 0 : Number(product[13]);
          newProducts.push(newProduct);
        } else if (product[4]?.toString().toLowerCase().trim() === "có") {
          newProductHasDistribute["name"] = product[0];
          newProductHasDistribute["barcode"] = product[1];
          if (product[2]?.toString().toLowerCase().trim() === "có") {
            newProductHasDistribute["shelf_position"] = product[3];
            newProductHasDistribute["check_inventory"] = true;
          } else {
            newProductHasDistribute["shelf_position"] = "";
            newProductHasDistribute["check_inventory"] = false;
          }
          newProductHasDistribute["sku"] = product[8] ? product[8] : null;
          newProductHasDistribute["images"] = !product[9]
            ? []
            : product[9].split(",");

          const dataDistribute = {
            name: product[5],
            sub_element_distribute_name: !product[6] ? "" : product[6],
            element_distributes: [],
          };
          newDistributes.push(dataDistribute);
        } else {
          const nameProductDistributeTemp = product[7]
            ? product[7]?.toString().split(",")[0]
            : "";
          const nameProductSubDistributeTemp = product[7]
            ? product[7]?.toString().split(",")[1]
            : "";
          const imagesProductDistributeTemp = !product[9]
            ? ""
            : product[9]?.split(",");
          isDistributeProduct = true;
          if (nameElementDistribute !== nameProductDistributeTemp) {
            positionDistributeProduct++;
            newDistributes[0]["element_distributes"].push({
              name: nameProductDistributeTemp,
              price: nameProductDistributeTemp
                ? !product[10]
                  ? 0
                  : Number(product[10])
                : 0,
              import_price: nameProductDistributeTemp
                ? !product[11]
                  ? 0
                  : Number(product[11])
                : 0,
              sku: !nameProductSubDistributeTemp
                ? !product[8]
                  ? null
                  : product[8]
                : null,
              image_url: imagesProductDistributeTemp
                ? imagesProductDistributeTemp[0]
                : "",
              cost_of_capital: !nameProductSubDistributeTemp
                ? !product[12]
                  ? null
                  : product[12]
                : null,
              stock: !nameProductSubDistributeTemp
                ? !product[13]
                  ? null
                  : product[13]
                : null,
              sub_element_distributes: [],
            });
            nameElementDistribute = nameProductDistributeTemp;
          }
          if (nameProductSubDistributeTemp) {
            newDistributes[0]["element_distributes"][positionDistributeProduct][
              "sub_element_distributes"
            ].push({
              name: nameProductSubDistributeTemp,
              price: !product[10] ? 0 : Number(product[10]),
              import_price: !product[11] ? 0 : Number(product[11]),
              sku: !product[8] ? null : product[8],
              cost_of_capital: !product[12] ? 0 : Number(product[12]),
              stock: !product[13] ? 0 : Number(product[13]),
            });
          }
        }

        if (
          isDistributeProduct === true &&
          index !== dataXlsxEmptyTitle.length - 1 &&
          dataXlsxEmptyTitle[index + 1][0]
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        } else if (
          isDistributeProduct === true &&
          index === dataXlsxEmptyTitle.length - 1
        ) {
          newProductHasDistribute["distributes"] = newDistributes;
          newProducts.push({ ...newProductHasDistribute });
          newDistributes = [];
          isDistributeProduct = false;
          nameElementDistribute = "";
          positionDistributeProduct = -1;
          newProduct["distributes"] = [];
        }
      });

      //Add products to server
      const { store_code, postMultiProductInventory } = this.props;
      const dataPostProducts = {
        list: newProducts,
      };

      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;

      postMultiProductInventory(
        this.props.match.params.store_code,
        branchIds,
        dataPostProducts,
        () => {
          this.setState({
            searchValue: "",
            page: 1,
            numPage: 20,
          });

          this.props.fetchAllProductV2(
            this.props.match.params.store_code,
            branchIds,
            1,
            ""
          );
        }
      );
    };
    document.getElementById("import_file_excel").value = null;
    reader.readAsBinaryString(file);
  };

  fetchProductInventory = () => {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    const branch_ids = getBranchIds();
    const branchIds = branch_ids ? branch_ids : branch_id;
    this.props.fetchProductInventory(store_code, branchIds, `&is_get_all=true`);
  };

  passNumPage = (page) => {
    this.setState({ page: page });
  };
  passIsNearStock = (status) => {
    this.setState({ is_near_out_of_stock: status });
  };

  render() {
    if (this.props.auth) {
      var { products, badges, store } = this.props;

      var { listProduct, is_near_out_of_stock, listType } = this.state;
      var { store_code } = this.props.match.params;
      var { searchValue, importData, allow_skip_same_name, page, numPage } =
        this.state;
      var { insert, update, _delete, isShow } = this.state;
      const branch_id = getBranchId();
      const branch_ids = getBranchIds();
      const branchIds = branch_ids ? branch_ids : branch_id;

      const bonusParam = "&check_inventory=true";

      var params = this.getParams(
        this.state.listType,
        this.state.is_near_out_of_stock,
        this.state.searchValue,
        this.state.numPage
      );

      return (
        <div id="wrapper">
          <ImportModal
            store_code={store_code}
            importData={importData}
            allow_skip_same_name={allow_skip_same_name}
          />

          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <General
                      passIsNearStock={this.passIsNearStock}
                      store={store}
                      paramNearStock={this.paramNearStock}
                      store_code={store_code}
                      branch_id={branchIds}
                      badges={badges}
                      products={this.props.products}
                      countProductNearlyOutStock={
                        this.props.countProductNearlyOutStock
                      }
                    />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Tồn kho
                      </h4>
                      <div>
                        <button
                          style={{ marginRight: "10px" }}
                          onClick={this.fetchProductInventory}
                          className={`btn btn-success btn-icon-split btn-sm`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Export Excel
                          </span>
                        </button>
                        <button
                          style={{ marginRight: "10px" }}
                          onClick={this.onClickImport}
                          className={`btn btn-primary btn-icon-split btn-sm`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Import Excel
                          </span>
                        </button>
                        <input
                          type="file"
                          id="import_file_excel"
                          hidden
                          onChange={this.handleImportFile}
                        />
                      </div>
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
                          style={{ "justify-content": "space-between" }}
                        >
                          <form onSubmit={this.searchData}>
                            <div
                              class="input-group mb-6"
                              style={{ padding: "0 20px" }}
                            >
                              <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm sản phẩm"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                            <p class="total-item" id="sale_user_name">
                              <span className="num-total_item">
                                {products.total}&nbsp;
                              </span>
                              <span className="text-total_item" id="user_name">
                                sản phẩm
                              </span>
                            </p>
                          </form>
                          <div style={{ display: "flex", padding: "0 20px" }}>
                            <div style={{ display: "flex" }}>
                              <span
                                style={{
                                  margin: "20px 10px auto auto",
                                }}
                              >
                                Lọc sản phẩm
                              </span>
                              <select
                                value={this.state.listType}
                                style={{
                                  margin: "auto",
                                  marginTop: "10px",
                                  marginRight: "20px",
                                  width: "226px",
                                }}
                                name="txtDiscoutType"
                                id="input"
                                class="form-control"
                                onChange={this.onChangeType}
                              >
                                <option value="0">Tất cả sản phẩm</option>
                                <option value="1">
                                  Sản phẩm được theo dõi
                                </option>
                                <option value="2">Sản phẩm sắp hết hàng</option>
                              </select>
                            </div>
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
                                <option value="10">10</option>
                                <option value="20" selected>
                                  20
                                </option>
                                <option value="50">50</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card-body">
                        <Table
                          params={params}
                          getParams={this.getParams}
                          insert={insert}
                          listType={listType}
                          _delete={_delete}
                          update={update}
                          page={page}
                          handleDelCallBack={this.handleDelCallBack}
                          handleMultiDelCallBack={this.handleMultiDelCallBack}
                          store_code={store_code}
                          products={products}
                          listProductSelect={listProduct}
                        />
                        <Pagination
                          params={params}
                          getParams={this.getParams}
                          listType={listType}
                          bonusParam={bonusParam}
                          limit={numPage}
                          is_near_out_of_stock={is_near_out_of_stock}
                          search={searchValue}
                          passNumPage={this.passNumPage}
                          store_code={store_code}
                          products={products}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalDelete modal={this.state.modal} />
            <ModalMultiDelete multi={this.state.multi} />
          </div>
        </div>
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
    products: state.productReducers.product.allProduct,
    alert: state.productReducers.alert.alert_success,
    allProductList: state.productReducers.product.allProductList,
    countProductNearlyOutStock:
      state.productReducers.product.countProductNearlyOutStock,
    permission: state.authReducers.permission.data,
    badges: state.badgeReducers.allBadge,
    store: state.storeReducers.store.storeID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchProductInventory: (store_code, branch_id, params) => {
      dispatch(
        productAction.fetchProductInventory(store_code, branch_id, params)
      );
    },
    getAmountProductNearlyOutStock: (store_code, branch_id) => {
      dispatch(
        productAction.getAmountProductNearlyOutStock(store_code, branch_id)
      );
    },
    fetchDataId: (id) => {
      dispatch(dashboardAction.fetchDataId(id));
    },
    postMultiProductInventory: (store_code, branch_id, data, onSuccess) => {
      dispatch(
        productAction.postMultiProductInventory(
          store_code,
          branch_id,
          data,
          onSuccess
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInventory);
