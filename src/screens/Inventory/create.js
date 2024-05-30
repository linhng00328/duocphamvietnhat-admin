import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import * as productAction from "../../actions/product";
import CardProduct from "../../components/Inventory/CardProduct";
import ListInventorySheet from "../../components/Inventory/ListInventory";
import ModalDetail from "../../components/Inventory/ModalDetail";
import * as inventoryAction from "../../actions/inventory";
import history from "../../history";
import Paginations from "../../components/Inventory/Paginations";
class CreateInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      listInventory: [],
      reality_exist_total: 0,
      existing_branch: 0,
      deviant_total: 0,
      note: "",

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
    var exist_branch = 0;
    var reality_total = 0;
    if (nextState.change !== this.state.change) {
      nextState.listInventory.forEach((item) => {
        exist_branch = exist_branch + item.stock;
        reality_total = parseInt(reality_total) + parseInt(item.reality_exist);
      });
      this.setState({
        existing_branch: exist_branch,
        deviant_total: nextState.reality_exist_total - exist_branch,
        reality_exist_total: reality_total,
      });
    }
    if (
      !shallowEqual(this.state.listInventory, nextState.listInventory) ||
      !shallowEqual(
        nextState.reality_exist_total,
        this.state.reality_exist_total
      )
    ) {
      nextState.listInventory.forEach((item) => {
        exist_branch = exist_branch + item.stock;
      });
      console.log("reality_exist_total", nextState.reality_exist_total);
      this.setState({
        existing_branch: exist_branch,
        deviant_total: nextState.reality_exist_total - exist_branch,
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
  handleCallbackPushProduct = (modal) => {
    const index_element = this.state.listInventory
      .map((e) => e.element_id)
      .indexOf(modal.element_id);
    if (index_element < 0) {
      this.setState({ listInventory: [...this.state.listInventory, modal] });
    }
  };
  handleCallbackQuantity = (modal) => {
    var reality_total = 0;
    this.setState({ reality_exist_total: modal.currentQuantity });
    const newInventory = this.state.listInventory;
    const index = newInventory
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    if (newInventory[index] != null) {
      newInventory[index].reality_exist = modal.currentQuantity;
      console.log("newInventory", newInventory);
      newInventory.forEach((item) => {
        reality_total = parseInt(reality_total) + parseInt(item.reality_exist);
      });
      this.setState({
        listInventory: newInventory,
        reality_exist_total: reality_total,
      });
    }
  };

  handleDelete = (modal) => {
    this.setState({ change: !this.state.change });
    const newInventory = this.state.listInventory;
    const index = this.state.listInventory
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    newInventory.splice(index, 1);
    this.setState({ listInventory: newInventory });
  };

  CreateSheetInventory = () => {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const formData = {
      note: this.state.note,
      tally_sheet_items: this.state.listInventory.map((item) => {
        return {
          product_id: item.product_id,
          reality_exist: item.reality_exist,
          distribute_name: item.nameDistribute,
          element_distribute_name: item.nameElement,
          sub_element_distribute_name: item.nameSubDistribute,
        };
      }),
    };
    this.props.createInventorys(store_code, branch_id, formData);
    history.goBack();
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onChange = (e) => {
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
  handleCallbackPrice = (modal) => {
    this.setState({ change: !this.state.change });
    const newInventory = this.state.listInventory;
    const index = newInventory
      .map((e) => e.element_id)
      .indexOf(modal.idElement);
    newInventory[index].import_price = modal.import_price;
    this.setState({ listImportStock: newInventory });
  };
  componentDidMount() {
    const branch_id = localStorage.getItem("branch_id");
    const params = `&check_inventory=true`;
    this.props.fetchAllProductV2(
      this.props.match.params.store_code,
      branch_id,
      1,
      params
    );
  }

  render() {
    var { store_code } = this.props.match.params;
    var {
      searchValue,
      numPage,
      listInventory,
      existing_branch,
      reality_exist_total,
    } = this.state;
    const { products } = this.props;
    const bonusParam = "&check_inventory=true";
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
                        style={{ padding: "0" }}
                      >
                        Phiếu kiểm hàng
                      </div>

                      <div
                        className="card-bodys"
                        style={{
                          width: "0 10px",
                          height: "380px",
                          overflowY: "auto",
                        }}
                      >
                        <ListInventorySheet
                          store_code={store_code}
                          listInventory={listInventory}
                          handleCallbackQuantity={this.handleCallbackQuantity}
                          handleCallbackPrice={this.handleCallbackPrice}
                          handleDelete={this.handleDelete}
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
                            <div>SL tồn thực tế:</div>
                            <div>{reality_exist_total}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>SL tồn chi nhánh:</div>
                            <div>{existing_branch}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>SL chênh lệch:</div>
                            <div>{this.state.deviant_total}</div>
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
                          onChange={this.onChange}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-warning btn-sm"
                        style={{ marginTop: "20px" }}
                        onClick={() => this.CreateSheetInventory()}
                      >
                        Tạo phiếu kiểm
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
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm kiếm sản phẩm"
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
                        <ModalDetail
                          product={this.state.product}
                          modal={this.state.infoProduct}
                          handleCallbackPushProduct={
                            this.handleCallbackPushProduct
                          }
                        />
                      </div>
                      <div className="card-body">
                        {products.data?.length > 0 ? (
                          <CardProduct
                            store_code={store_code}
                            handleCallbackProduct={this.handleCallbackProduct}
                          />
                        ) : (
                          <div>Không tồn tại sản phẩm</div>
                        )}{" "}
                      </div>
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
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    createInventorys: (store_code, branch_id, data) => {
      dispatch(inventoryAction.createInventorys(store_code, branch_id, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateInventory);
