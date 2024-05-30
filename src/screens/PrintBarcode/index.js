import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import Loading from "../Loading";
import * as Env from "../../ultis/default";
import NotAccess from "../../components/Partials/NotAccess";
import ModalCreate from "../../components/Customer/ModalCreate";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import ModalEdit from "../../components/Customer/ModalEdit";
import "./barcode_style.css";
import ReactToPrint from "react-to-print";
import BarcodePagePrint from "./ComponentPrint/BarcodePagePrint";
import { AsyncPaginate } from "react-select-async-paginate";
import CardProduct from "../../components/Pos_Order/CardProduct";
import Table from "./Tablet";
import * as productApi from "../../data/remote/product";
import { getBranchId } from "../../ultis/branchUtils";
import * as profileAction from "../../actions/profile";
import * as dashboardAction from "../../actions/dashboard";
import * as branchAction from "../../actions/branch";
import * as productAction from "../../actions/product";
import { randomString } from "../../ultis/helpers";

class PrintBarcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product_map_list: [],
      showPrice: true,
      showName: true,
      showBarcode: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.barcode_print;
      this.setState({ isLoading: true, isShow });
    }
  }

  componentDidMount() {}

  getComponentRef = (ref) => {
    return <BarcodePagePrint ref={ref} />;
  };

  buildListPrintOption = () => {
    var data = [
      {
        name: (
          <div>
            Mẫu giấy <b>180</b>{" "}
          </div>
        ), //ok
        size: "Khổ A4 - 20x15mm.",
        isA4: true,
        widthPrint: 210,
        heightPrint: 297,
        itemTemHight: "75px",
        heightOnePage: 1420,
        column: 10,
        row: 18,
        image: "https://i.imgur.com/y4nAwHP.png",
        componentRef: this.componentRef1,
      },
      {
        name: "Mẫu giấy 65 nhãn",
        size: "Khổ A4, Tomy 145 - 210x297mm.", //ok
        isA4: true,
        widthBarcode: 1.2,
        widthPrint: 210,
        heightOnePage: 1310,
        heightPrint: 297,
        itemTemHight: "100px",
        column: 5,
        row: 13,
        image: "https://i.imgur.com/6Ynu3zS.png",
        componentRef: this.componentRef2,
      },
      // {
      //   name: "Mẫu giấy 30 nhãn",
      //   size: "Khổ A4, Tomy 144 - 67x28mm.",
      //   isA4: true,
      //   widthPrint: 210,
      //   heightPrint: 297,
      //   heightOnePage:1310,
      //   itemTemHight:"100px",
      //   column: 3,
      //   row: 10,
      //   image: "https://i.imgur.com/QpScjup.png",
      //   componentRef: this.componentRef3,
      // },
      // {
      //   name: "Mẫu giấy cuộn 3 nhãn",
      //   size: "Khổ 105x22mm.",
      //   isA4: false,
      //   widthPrint: 105,
      //   heightPrint: 22,
      //   itemTemHight:"71px",
      //   column: 3,
      //   row: 1,
      //   image: "https://i.imgur.com/oJ0xP6m.png",
      //   componentRef: this.componentRef4,
      // },
      {
        name: "Mẫu giấy cuộn 2 nhãn", //ok
        size: "Khổ 70x22mm.",
        isA4: false,
        widthPrint: 70,
        heightPrint: 22,
        paddingTop: 0,
        heightOnePage: 122,
        itemTemHight: "71px",
        widthTable: 350,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/UlmovmM.png",
        componentRef: this.componentRef5,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn", //ok
        size: "Khổ 77x22mm.",
        isA4: false,
        widthPrint: 77,
        heightPrint: 22,
        heightOnePage: 122,
        itemTemHight: "71px",
        paddingTop: 0,
        widthTable: 350,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/xFMDfuP.png",
        componentRef: this.componentRef6,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn", //ok
        size: "Khổ 50x40mm.",
        isA4: false,
        widthPrint: 50,
        heightPrint: 40,
        paddingTop: 0,
        heightOnePage: 220,
        itemTemHight: "140px",
        widthTable: 250,
        column: 2,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 2 nhãn", //ok
        size: "Khổ 30x20mm.",
        isA4: false,
        widthPrint: 30,
        heightPrint: 20,
        itemTemHight: "71px",
        column: 2,
        heightOnePage: 110,
        itemTemHight: "71px",
        widthTable: 155,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 1 nhãn", //ok
        size: "Khổ 40x25mm.",
        isA4: false,
        widthPrint: 40,
        heightPrint: 25,
        itemTemHight: "71px",
        heightOnePage: 130,
        itemTemHight: "71px",
        widthTable: 200,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      {
        name: "Mẫu giấy cuộn 1 nhãn", //ok
        size: "Khổ 40x30mm.",
        isA4: false,
        widthPrint: 40,
        heightPrint: 30,
        itemTemHight: "71px",
        heightOnePage: 160,
        paddingTop: 0,
        itemTemHight: "71px",
        widthTable: 200,
        column: 1,
        row: 1,
        image: "https://i.imgur.com/gKuOulQ.png",
        componentRef: this.componentRef7,
      },
      // {
      //   name: "Mẫu giấy cuộn 1 nhãn",
      //   size: "Khổ 50x30mm.",
      //   isA4: false,
      //   widthPrint: 50,
      //   heightPrint: 30,
      //   itemTemHight:"71px",
      //   column: 1,
      //   row: 1,
      //   image: "https://i.imgur.com/gKuOulQ.png",
      //   componentRef: this.componentRef7,
      // },
      // {
      //   name: "Mẫu tem trang sức / kính mắt",
      //   size: "Khổ 80x10mm.",
      //   isA4: false,
      //   widthPrint: 80,
      //   heightPrint: 10,
      //   itemTemHight:"71px",
      //   column: 1,
      //   row: 1,
      //   image: "https://i.imgur.com/gKuOulQ.png",
      //   componentRef: this.componentRef7,
      // },
    ];

    return data.map((item) => (
      <div key={randomString(10)} className="col-6">
        <div
          class="card-body"
          style={{
            border: "1px solid rgba(0,0,0,.125)",
            borderRadius: "0.25rem",
            textAlign: "center",
            marginTop: 1,
            marginRight: 1,
            marginBottom: 2,
            padding: "10px 2px 10px 2px",
          }}
        >
          <div
            style={{
              fontSize: 12,
            }}
          >
            {item.name}{" "}
          </div>
          <div
            style={{
              fontStyle: "italic",
              fontSize: 12,
            }}
          >
            - {item.size}
          </div>
          <img height={80} src={item.image} class="image-option-print"></img>
          <ReactToPrint
            trigger={() => {
              return (
                <button
                  style={{
                    marginTop: 8,
                    textAlign: "center",
                  }}
                  type="button"
                  class="btn btn-outline-primary"
                >
                  <i class="fa fa-print" aria-hidden="true"></i> In
                </button>
              );
            }}
            content={() => item.componentRef}
          />

          <div style={{ display: "none" }}>
            {
              <BarcodePagePrint
                key={item.name}
                isA4={item.isA4}
                ref={(el) => (item.componentRef = el)}
                widthBarcode={item.widthBarcode}
                widthPrint={item.widthPrint}
                paddingTop={item.paddingTop}
                heightPrint={item.heightPrint}
                heightOnePage={item.heightOnePage}
                itemTemHight={item.itemTemHight}
                column={item.column}
                row={item.row}
                widthTable={item.widthTable}
                products={this.state.products}
                product_map_list={this.state.product_map_list}
              />
            }
          </div>
        </div>{" "}
      </div>
    ));
  };

  loadProducts = async (search, loadedOptions, { page }) => {
    var { store_code } = this.props.match.params;
    var branch_id = getBranchId();

    const params = `&search=${search}`;
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

    return {
      options: res.data.data.data.map((i) => {
        return {
          value: i.id,
          label: `${i.name}`,
          product: i,
        };
      }),

      hasMore: res.data.data.data.length == 20,
      additional: {
        page: page + 1,
      },
    };
  };

  getDatasProducts = (products) => {
    var arr = [];

    products.forEach((pro) => {
      for (var i = 0; i < pro.quantity; i++) {
        arr.push(pro);
      }
    });

    return arr;
  };

  onChangeProduct = (selectValue) => {
    if (selectValue != null && selectValue.product != null) {
      var data = selectValue?.product;

      var index = this.state.products.findIndex((pro) => pro.id === data?.id);
      if (index == -1) {
        data.quantity = 1;
        this.state.products.push(data);
        this.setState({
          ...this.state,
          products: this.state.products,
          product_map_list: this.getDatasProducts(this.state.products),
        });
      }
    }
  };

  onChangeQuantity = (productId, quantity) => {
    var index = this.state.products.findIndex((pro) => pro.id === productId);
    if (index != -1) {
      this.state.products[index].quantity = quantity;

      this.setState({
        ...this.state,
        products: this.state.products,
      });

      this.setState({
        ...this.state,
        product_map_list: this.getDatasProducts(this.state.products),
      });
    }
  };

  removeProduct = (productId) => {
    var index = this.state.products.findIndex((pro) => pro.id === productId);
    if (index != -1) {
      this.state.products.splice(index, 1);
      this.setState({
        ...this.state,
        products: this.state.products,
        product_map_list: this.getDatasProducts(this.state.products),
      });
    }
  };

  handChangeCheckbox = (e) => {
    var name = e.target.name;
    if (name == "showName") {
      this.setState({
        [e.target.name]: !this.state.showName,
      });
    }

    if (name == "showPrice") {
      this.setState({
        [e.target.name]: !this.state.showPrice,
      });
    }
    {
      this.setState({
        [e.target.name]: !this.state.showBarcode,
      });
    }
  };

  render() {
    var { store_code } = this.props.match.params;

    const customStyles = {
      menu: (styles) => ({
        ...styles,
        width: "600px",
      }),
      option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        fontWeight: 200,
        padding: 20,
        color: "black",
      }),
    };

    const formatOptionLabel = ({ value, label, product }) => {
      return <CardProduct isItemSearch={true} product={product} />;
    };

    const { products, showName, showPrice, isShow, showBarcode } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />

        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      In mã vạch
                    </h4>{" "}
                    {getChannel() == IKIPOS && (
                      <a
                        data-toggle="modal"
                        data-target="#modalCreateCustomer"
                        class="btn btn-info btn-icon-split btn-sm"
                        style={{ height: "fit-content", width: "fit-content" }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          class={`text `}
                        >
                          Thêm khách hàng
                        </span>
                      </a>
                    )}
                  </div>

                  <br></br>

                  <div className="row">
                    <div className="card shadow mb-4 col-lg-8 col-md-12 col-sm-12">
                      <div className="card-header py-3">
                        <h6 className="m-0 title_content font-weight-bold text-primary">
                          Sản phẩm tự chọn
                        </h6>
                      </div>

                      <div
                        style={{
                          padding: 15,
                        }}
                      >
                        <AsyncPaginate
                          autoFocus
                          selectRef={(ref) => {
                            this.refSearchProduct = ref;
                          }}
                          noOptionsMessage={() => "Không tìm thấy sản phẩm nào"}
                          loadingMessage={() => "Đang tìm..."} //minor type-O here
                          placeholder="Tìm kiếm sản phẩm"
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

                      <div class="card-body">
                        <Table
                          // insert={insert}
                          // _delete={_delete}
                          // update={update}
                          // page={page}
                          handleDelCallBack={this.handleDelCallBack}
                          handleMultiDelCallBack={this.handleMultiDelCallBack}
                          store_code={store_code}
                          products={products}
                          onChangeQuantity={this.onChangeQuantity}
                          removeProduct={this.removeProduct}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <div className="card shadow mb-4 ">
                        <div className="card-header py-3">
                          <h6 className="m-0 title_content font-weight-bold text-primary">
                            Cấu hình tem in
                          </h6>
                        </div>

                        <div className="card-body">
                          <div className="print-feature-container">
                            <div
                              class="custom-control custom-switch"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="switch1"
                                name="showBarcode"
                                checked={showBarcode}
                                onChange={this.handChangeCheckbox}
                              />
                              <label
                                class="custom-control-label"
                                for="switch1"
                              ></label>
                            </div>
                            <div className="name">
                              <span>Mã barcode</span>
                            </div>
                          </div>
                          <div className="print-feature-container">
                            <div
                              class="custom-control custom-switch"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="showName"
                                name="showName"
                                checked={this.state.showName}
                                onChange={this.handChangeCheckbox}
                              />
                              <label
                                class="custom-control-label"
                                for="showName"
                              ></label>
                            </div>
                            <div className="name">
                              <span>Tên sản phẩm</span>
                            </div>
                          </div>
                          <div className="print-feature-container">
                            <div
                              class="custom-control custom-switch"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="showPrice"
                                name="showPrice"
                                checked={this.state.showPrice}
                                onChange={this.handChangeCheckbox}
                              />
                              <label
                                class="custom-control-label"
                                for="showPrice"
                              ></label>
                            </div>
                            <div className="name">
                              <span>Giá bán</span>
                            </div>
                          </div>

                          {/* <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="switch1" name="example" checked={this.state.is_use_points} onChange={this.handChangeCheckbox} />
                          <label class="custom-control-label" for="switch1">Khổ rộng</label>
                        </div> */}

                          <div
                            className="barcode-wrap"
                            style={{ marginTop: "10px" }}
                          >
                            {showName && <div>Tên sản phẩm</div>}

                            <Barcode
                              fontSize={0}
                              width={0.7}
                              textMargin={0}
                              height={52}
                              textPosition={"top"}
                              displayValue={false}
                              value="123456789123456"
                            />

                            {showBarcode && <span>IKINO1</span>}

                            {showPrice && <p>1.000.000</p>}
                          </div>
                        </div>
                      </div>

                      {
                        <div className="card shadow mb-4 ">
                          <div className="card-header py-3">
                            <h6 className="m-0 title_content font-weight-bold text-primary">
                              Chọn khổ giấy và in
                            </h6>
                          </div>

                          <div className="row">
                            {this.buildListPrintOption()}
                          </div>
                        </div>
                      }
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listPos: state.posReducers.pos_reducer.listPosOrder,
    branchStore: state.storeReducers.store.branchStore,
    user: state.userReducers.user.userID,
    currentBranch: state.branchReducers.branch.currentBranch,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(PrintBarcode);
