import React, { Component } from "react";
import { connect } from "react-redux";
import * as productAction from "../../actions/product";
import ListOrder from "../../components/Add_Order/ListOrder";
import Table from "../../components/Add_Order/Table";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as OrderAction from "../../actions/add_order";
import InfoPrice from "../../components/Add_Order/InfoPrice";
import { shallowEqual } from "../../ultis/shallowEqual";
import ModalVoucher from "../../components/Add_Order/ModalVoucher";
import PertionInfo from "../../components/Add_Order/PertionInfo";
import ModalAddress from "../../components/Add_Order/ModalAddress";
import * as placeAction from "../../actions/place";
import ShowVoucher from "../../components/Add_Order/showVoucher";
import * as Types from "../../constants/ActionType";
import Alert from "../../components/Partials/Alert";
import ModalDetail from "../../components/Add_Order/ModalDetail";
import Pagination from "../../components/ProductAgency/Pagination";
import ModalCombo from "../../components/Add_Order/ModalCombo";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      page: 1,
      numPage: 20,
      name: "",
      phone_number: "",
      listProductCombo: [],
      modalDetail: {
        product_id: "",
        name: "",
        value: "",
        sub_element_distributes: "",
      },
      modalVoucher: {
        code_voucher: "",
        limitTotal: "",
      },
      modalAddress: {
        address_detail: "",
        province: "",
        district: "",
        wards: "",
      },
      nameAddress: {
        address_detail: "",
        province: "",
        district: "",
        wards: "",
      },
      infoProduct: {
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

  handleCallbackVoucher = (modal) => {
    this.setState({ modalVoucher: modal });
  };
  handleCallbackAddress = (modal) => {
    this.setState({ modalAddress: modal });
  };
  handleCallbackPertion = (modal) => {
    this.setState({ name: modal.name, phone_number: modal.phone_number });
  };
  handleRemoveVoucher = (modal) => {
    this.setState({ modalVoucher: modal });
  };
  handleCallbackName = (modal) => {
    this.setState({ nameAddress: modal });
  };
  handleCallbackProduct = (modal) => {
    this.setState({ infoProduct: modal });
  };
  handleCallbackPushProduct = (modal) => {
    this.setState({ modalDetail: modal });
  };
  handleCallbackCombo = (modal) => {
    this.setState({ listProductCombo: modal });
  };
  handleOrderBill = () => {
    var { store_code } = this.props.match.params;
    var form = {
      name: this.state.name,
      phone: this.state.phone_number,
      address_detail: this.state.modalAddress.address_detail,
      province: this.state.modalAddress.province,
      district: this.state.modalAddress.district,
      wards: this.state.modalAddress.wards,
      code_voucher: this.state.modalVoucher.code_voucher,
    };
    this.props.createOrderBill(store_code, form);
    var modal = { address_detail: "", province: "", district: "", wards: "" };
    var modals = { address_detail: "", province: "", district: "", wards: "" };
    this.setState({
      nameAddress: modal,
      modalAddress: modals,
      name: "",
      phone_number: "",
      modalVoucher: { code_voucher: "" },
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState.modalDetail, this.state.modalDetail)) {
      var formData = {
        product_id: nextState.modalDetail.product_id,
        quantity: 1,
        distributes: [
          {
            name: nextState.modalDetail.name,
            value: nextState.modalDetail.value,
            sub_element_distributes:
              nextState.modalDetail.sub_element_distributes,
          },
        ],
      };
      var { store_code } = this.props.match.params;
      this.props.createOrder(store_code, formData);
    }
    if (
      !shallowEqual(nextState.listProductCombo, this.state.listProductCombo)
    ) {
      var listProducts = nextState.listProductCombo.productsCombo;
      listProducts.forEach((element) => {
        var formData = {
          product_id: element.product.id,
          quantity: 1,
          distributes: [],
        };
        var { store_code } = this.props.match.params;
        this.props.createOrder(store_code, formData);
      });
    }

    if (!shallowEqual(nextState.modalVoucher, this.state.modalVoucher)) {
      console.log("limitTotal", nextState.modalVoucher.limitTotal);
      console.log(
        "total_after_discount",
        nextProps.listOrder.total_before_discount
      );

      if (
        nextState.modalVoucher.limitTotal <
          nextProps.listOrder.total_before_discount ||
        nextState.modalVoucher.code_voucher === ""
      ) {
        this.props.fetchAllOrder(
          this.props.match.params.store_code,
          nextState.modalVoucher
        );
      } else {
        this.setState({ modalVoucher: { code_voucher: "" } });
        this.props.showAlertErrVoucher();
      }
    }
    if (!shallowEqual(nextProps.pertionAddress, this.props.pertionAddress)) {
      var infor = nextProps.pertionAddress.default_address;
      if (infor) {
        var { address_detail, province_name, district_name, wards_name } =
          infor;
        var modal = {
          address_detail: address_detail,
          province: province_name,
          district: district_name,
          wards: wards_name,
        };
        var modals = {
          address_detail: infor.address_detail,
          province: infor.province,
          district: infor.district,
          wards: infor.wards,
        };
        this.setState({ nameAddress: modal, modalAddress: modals });
      }
    }
    return true;
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  handleOnChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({ [name]: value });
  };
  handleInputVoucher = (modal) => {
    this.setState({ modalVoucher: modal });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.setState({ numPage: 20 });
    this.props.fetchAllProduct(store_code, 1, params);
  };
  passNumPage = (page) => {
    this.setState({ page: page });
  };

  componentDidMount() {
    this.props.fetchAllOrder(
      this.props.match.params.store_code,
      this.state.modalVoucher
    );
    this.props.fetchAllProduct(this.props.match.params.store_code);
    // this.props.fetchAllVoucher(this.props.match.params.store_code)
    this.props.fetchAllPertion(this.props.match.params.store_code);
    this.props.fetchAllCombo(this.props.match.params.store_code);
    this.props.fetchPlaceProvince();
  }
  handleShowAddress = () => {
    var { address_detail, province, district, wards } = this.state.nameAddress;

    return (
      <div
        className="address-detail"
        style={{ fontSize: "15px", padding: "0 5px" }}
      >
        {address_detail ? `${address_detail},` : ""}
        {wards ? `${wards},` : ""} {district ? `${district},` : ""} {province}
      </div>
    );
  };

  render() {
    var { products } = this.props;
    var { listOrder, listVoucher, listPertion, listCombo } = this.props;
    var { store_code } = this.props.match.params;
    var { searchValue, numPage } = this.state;
    var { wards, district, province, history } = this.props;

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
                        <div
                          class="mb-6"
                          style={{ marginTop: "10px", display: "flex" }}
                        >
                          <input
                            style={{ marginRight: "10px" }}
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleOnChange}
                            class="form-control"
                            placeholder="Tên"
                          />
                          <input
                            style={{ marginRight: "10px" }}
                            type="text"
                            name="phone_number"
                            value={this.state.phone_number}
                            onChange={this.handleOnChange}
                            class="form-control"
                            placeholder="Số điện thoại"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-primary"
                              type="submit"
                              data-toggle="modal"
                              data-target="#modalPertion"
                            >
                              <i class="fas fa-user"></i>
                            </button>
                          </div>
                        </div>
                        <div
                          className="row"
                          style={{ padding: "0 5px", marginTop: "10px" }}
                        >
                          <h5
                            className="col-6 voucher-title"
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                          >
                            Địa chỉ
                          </h5>
                          <a
                            className="col-6 show-modal-btn"
                            data-toggle="modal"
                            data-target="#modalAddress"
                            style={{
                              fontSize: "15px",
                              textAlign: "end",
                              color: "#189687",
                            }}
                          >
                            Thêm địa chỉ
                          </a>
                        </div>
                        <div className="show-address">
                          {this.handleShowAddress()}
                        </div>
                      </div>

                      <div
                        className="card-bodys"
                        style={{
                          width: "0 10px",
                          height: "380px",
                          overflowY: "auto",
                        }}
                      >
                        <ListOrder
                          store_code={store_code}
                          listOrder={listOrder}
                        />
                      </div>
                      <div
                        className="voucher-input"
                        style={{ margin: "10px 0px" }}
                      >
                        <ShowVoucher
                          code_voucher={this.state.modalVoucher.code_voucher}
                          handleInputVoucher={this.handleInputVoucher}
                          handleRemoveVoucher={this.handleRemoveVoucher}
                        />
                      </div>
                      <ModalDetail
                        modal={this.state.infoProduct}
                        handleCallbackPushProduct={
                          this.handleCallbackPushProduct
                        }
                      />
                      <PertionInfo
                        store_code={store_code}
                        listPertion={listPertion}
                        handleCallbackPertion={this.handleCallbackPertion}
                      />
                      <ModalVoucher
                        listVoucher={listVoucher}
                        handleCallbackVoucher={this.handleCallbackVoucher}
                      />
                      <InfoPrice listOrder={listOrder} />
                      <ModalAddress
                        wards={wards}
                        district={district}
                        province={province}
                        history={history}
                        store_code={store_code}
                        handleCallbackAddress={this.handleCallbackAddress}
                        handleCallbackName={this.handleCallbackName}
                      />
                      <ModalCombo
                        listCombo={listCombo}
                        handleCallbackCombo={this.handleCallbackCombo}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={this.handleOrderBill}
                      >
                        Đặt Hàng
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
                              placeholder="Tìm mã đơn, tên, SĐT"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "50%",
                          }}
                        >
                          <button
                            className="btn btn-danger"
                            style={{ marginRight: "10px" }}
                            data-toggle="modal"
                            data-target="#modalCombo"
                          >
                            Sử dụng combo
                          </button>
                          <button
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#modalVoucher"
                          >
                            Danh sách voucher
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <Table
                          store_code={store_code}
                          products={products}
                          handleCallbackProduct={this.handleCallbackProduct}
                        />
                      </div>

                      <Pagination
                        limit={numPage}
                        searchValue={searchValue}
                        passNumPage={this.passNumPage}
                        store_code={store_code}
                        products={products}
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
    auth: state.authReducers.login.authentication,
    products: state.productReducers.product.allProduct,
    alert: state.productReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
    listOrder: state.orderReducers.order_product.listOrder,
    listVoucher: state.orderReducers.order_product.listVoucher,
    listPertion: state.orderReducers.order_product.listPertion,
    pertionAddress: state.orderReducers.order_product.inforOnePersion,
    listCombo: state.orderReducers.order_product.listCombo,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    createOrderBill: (store_code, data) => {
      dispatch(OrderAction.createOrderBill(store_code, data));
    },
    fetchAllPertion: (store_code) => {
      dispatch(OrderAction.fetchAllPertion(store_code));
    },
    fetchAllVoucher: (store_code) => {
      dispatch(OrderAction.fetchAllVoucher(store_code));
    },
    createOrder: (store_code, data) => {
      dispatch(OrderAction.createOrder(store_code, data));
    },
    fetchAllOrder: (store_code, data) => {
      dispatch(OrderAction.fetchAllOrder(store_code, data));
    },
    fetchAllProduct: (store_code, page, params) => {
      dispatch(productAction.fetchAllProduct(store_code, page, params));
    },
    fetchAllListProduct: (store_code, searchValue) => {
      dispatch(productAction.fetchAllListProduct(store_code, searchValue));
    },
    fetchAllCombo: (store_code) => {
      dispatch(OrderAction.fetchAllCombo(store_code));
    },
    showAlertErrVoucher: () => {
      dispatch(OrderAction.showAlertErrVoucher());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrder);
