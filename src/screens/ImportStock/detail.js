import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import * as inventoryAction from "../../actions/inventory";
import moment from "moment";
import { Link } from "react-router-dom";
import * as ImportAction from "../../actions/import_stock";
import "./detail.css";
import ItemDetail from "../../components/Import_stock/ItemDetail";
import ModalPayment from "../../components/Import_stock/ModalPayment";
import ModalDelete from "../../components/Import_stock/ModalDelete";
import ModalEnd from "../../components/Import_stock/ModalEnd";
import { callUrl, format, randomString } from "../../ultis/helpers";
import ItemDetailRefund from "../../components/Import_stock/ItemDetailRefund";
import history from "../../history";
import { getQueryParams } from "../../ultis/helpers";

class DetailImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive1: false,
      isActive2: false,
      isActive3: false,
      statusFinal: "",
      total_price: 0,
      check: false,
      list_refund: [],
      random: "",
    };
  }
  componentDidMount() {
    const { store_code, id } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchDetailImportStock(store_code, branch_id, id);
  }
  handleBalance = (id) => {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.handleBalanceInventory(store_code, branch_id, id);
  };
  handleChangeStatus = (number) => {
    const { store_code, id } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    const data = { status: number };
    this.props.changeStatus(store_code, branch_id, id, data);
  };
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.itemImportStock !== this.props.itemImportStock) {
      const { status } = nextProps.itemImportStock;
      this.setState({ isActive1: true });
      if (status === 2) {
        this.setState({ isActive2: true });
      }
      if (status === 3) {
        this.setState({ isActive3: true, statusFinal: 3 });
      }
      if (status === 4) {
        this.setState({ isActive: true, statusFinal: 4 });
      }
      if (status === 5) {
        this.setState({ isActive3: true, statusFinal: 5 });
      }
      if (status === 6) {
        this.setState({ isActive3: true, statusFinal: 6 });
      }
      if (status === 7) {
        this.setState({ isActive3: true, statusFinal: 7 });
      }

      var total_prices = 0;
      nextProps.itemImportStock.import_stock_items.forEach((item) => {
        total_prices = total_prices + item.quantity * item.import_price;
      });
      this.setState({ total_price: total_prices });
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.add_revenue != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.inventory_import;
      this.setState({ isLoading: true, isShow });
    }
  }
  changeStatus = (status) => {
    this.setState({ check: status });
  };
  getRefund = (list_refund) => {
    this.setState({ list_refund, random: randomString(10) });
  };
  checked = (list) => {
    var count = 0;
    list.forEach((element) => {
      if (element.check == true) count = count + 1;
    });
    return count;
  };
  goBack = () => {
    const { store_code } = this.props.match.params;
    var from = getQueryParams("from");
    var to = getQueryParams("to");
    var page = getQueryParams("page");
    var params = "";
    if (from && to) {
      params = params + `?from=${from}&to=${to}`;
      if (page) {
        params += `&page=${page}`;
      }
      history.push(`/inventory_histories/${store_code}${params}`);
    } else {
      history.goBack();
    }
  };
  handlePrintImportStock = () => {
    const { store_code, id } = this.props.match.params;
    const { printImportStock } = this.props;
    const branch_id = localStorage.getItem("branch_id");

    printImportStock(store_code, branch_id, id);
  };

  render() {
    const { store_code, id } = this.props.match.params;
    const { itemImportStock } = this.props;
    const { statusFinal, check, list_refund, random, isShow } = this.state;
    const import_stock_items = this.props.itemImportStock.import_stock_items
      ? this.props.itemImportStock.import_stock_items
      : [];
    const date = moment(
      itemImportStock.updated_at,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY-MM-DD");
    const total =
      this.state.total_price - itemImportStock.discount + itemImportStock.cost;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "10px",
                    columnGap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={this.goBack}
                    class="btn btn-warning  btn-sm"
                  >
                    <i class="fa fa-arrow-left"></i>&nbsp;Trở về
                  </button>
                  <button
                    type="button"
                    class="btn btn-success  btn-sm"
                    onClick={this.handlePrintImportStock}
                  >
                    <i class="fas fa-print"></i>&nbsp;In hóa đơn
                  </button>
                  {(itemImportStock.status === 0 ||
                    itemImportStock.status === 1 ||
                    itemImportStock.status === 2 ||
                    itemImportStock.status === 3) &&
                  isShow == true ? (
                    <Link
                      style={{ marginRight: "10px" }}
                      type="button"
                      to={`/import_stock/edit/${store_code}/${id}`}
                      class="btn btn-primary  btn-sm"
                    >
                      <i class="fa fa-edit"></i>&nbsp;Sửa đơn nhập
                    </Link>
                  ) : (
                    ""
                  )}
                </div>

                <div class="card card-import">
                  <div class="row d-flex justify-content-center">
                    <div class="col-12">
                      <ul
                        id="progressbar"
                        class="text-center"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <li class="active step0"></li>
                        {/* <li
                          class={
                            this.state.isActive1 ? "active step0" : "step0"
                          }
                        ></li>
                        <li
                          class={
                            this.state.isActive2 ? "active step0" : "step0"
                          }
                        ></li> */}
                        <li
                          class={
                            statusFinal === 4 ||
                            statusFinal === 5 ||
                            statusFinal === 6 ||
                            statusFinal === 7
                              ? "step0 activeDelete"
                              : this.state.isActive3
                              ? "active step0"
                              : "step0"
                          }
                        ></li>
                      </ul>
                    </div>
                  </div>
                  {isShow == true && (
                    <div class="row justify-content-center top">
                      <div
                        class="row d-flex icon-content justify-content-center"
                        style={{
                          width: "25%",
                          marginLeft: "50px",
                        }}
                      >
                        {" "}
                        <img
                          style={{ width: "45px", height: "45px" }}
                          class="icon"
                          src="https://i.imgur.com/9nnc9Et.png"
                        />
                        <div class="d-flex flex-column">
                          <p class="font-weight-bold" style={{ margin: "0" }}>
                            Đặt hàng
                          </p>
                          <div className="time-history">
                            {itemImportStock?.change_status_history?.length > 0
                              ? itemImportStock.change_status_history[0]
                                  .time_handle
                              : ""}
                          </div>
                        </div>
                      </div>
                      {/* {this.state.isActive1 ? (
                        <div class="row d-flex icon-content">
                          {" "}
                          <img
                            style={{ width: "45px", height: "45px" }}
                            class="icon"
                            src="https://i.imgur.com/u1AzR7w.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Duyệt
                            </p>
                            <div className="time-history">
                              {
                                itemImportStock.change_status_history[1]
                                  .time_handle
                              }
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div class="row d-flex icon-content">
                          {" "}
                          <img
                            style={{ width: "45px", height: "45px" }}
                            class="icon"
                            src="https://i.imgur.com/u1AzR7w.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Duyệt
                            </p>
                          </div>
                        </div>
                      )} */}
                      {/* {this.state.isActive2 ? (
                        <div class="row d-flex icon-content">
                          {" "}
                          <img
                            style={{ width: "42px", height: "42px" }}
                            class="icon"
                            src="https://manmo3h.com/app/webroot/upload/admin/images/icon/icon7.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Nhập kho
                            </p>
                            <div className="time-history">
                              {
                                itemImportStock.change_status_history[2]
                                  .time_handle
                              }
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div class="row d-flex icon-content">
                          {" "}
                          <img
                            style={{ width: "43px", height: "43px" }}
                            class="icon"
                            src="https://manmo3h.com/app/webroot/upload/admin/images/icon/icon7.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Nhập kho
                            </p>
                          </div>
                        </div>
                      )} */}

                      {statusFinal === 4 ? (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            style={{ width: "45px", height: "45px" }}
                            class="icon"
                            src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-cancel-cart-product-icon-png-image_1736147.jpg"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Đã hủy
                            </p>
                            <div className="time-history">
                              {
                                itemImportStock.change_status_history[
                                  itemImportStock?.change_status_history
                                    ?.length - 1
                                ].time_handle
                              }
                            </div>
                          </div>
                        </div>
                      ) : statusFinal === 5 ? (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            class="icon"
                            style={{ width: "45px", height: "45px" }}
                            src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-cancel-cart-product-icon-png-image_1736147.jpg"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Kết thúc
                            </p>
                            <div className="time-history">
                              {
                                itemImportStock.change_status_history[
                                  itemImportStock?.change_status_history
                                    ?.length - 1
                                ].time_handle
                              }
                            </div>
                          </div>
                        </div>
                      ) : statusFinal === 6 ? (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            class="icon"
                            style={{ width: "45px", height: "45px" }}
                            src="https://i.imgur.com/TkPm63y.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Trả hàng
                            </p>
                            {/* <div className="time-history">
                              {
                                itemImportStock.change_status_history[
                                  itemImportStock?.change_status_history
                                    ?.length - 1
                                ].time_handle
                              }
                            </div> */}
                          </div>
                        </div>
                      ) : statusFinal === 7 ? (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            class="icon"
                            style={{ width: "45px", height: "45px" }}
                            src="https://i.imgur.com/TkPm63y.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Đã hoàn hết
                            </p>
                            {/* <div className="time-history">
                              {
                                itemImportStock.change_status_history[
                                  itemImportStock?.change_status_history
                                    ?.length - 1
                                ].time_handle
                              }
                            </div> */}
                          </div>
                        </div>
                      ) : this.state.isActive3 ? (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            class="icon"
                            style={{ width: "45px", height: "45px" }}
                            src="https://i.imgur.com/TkPm63y.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Hoàn thành
                            </p>
                            <div className="time-history">
                              {
                                itemImportStock.change_status_history[
                                  itemImportStock?.change_status_history
                                    ?.length - 1
                                ].time_handle
                              }
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          class="row d-flex icon-content justify-content-center"
                          style={{
                            width: "35%",
                            marginLeft: "80px",
                          }}
                        >
                          {" "}
                          <img
                            class="icon"
                            style={{ width: "45px", height: "45px" }}
                            src="https://i.imgur.com/TkPm63y.png"
                          />
                          <div class="d-flex flex-column">
                            <p class="font-weight-bold" style={{ margin: "0" }}>
                              Hoàn thành
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <br></br>
                <div className="row">
                  <div className="col-7">
                    <div className="card">
                      <div
                        className="card-header py-3"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>Thông tin đơn hàng #{itemImportStock.code}</span>
                        {itemImportStock.import_stock_code_refund != null && (
                          <span style={{ color: "red", display: "block" }}>
                            Đã hoàn tiền từ đơn:{" "}
                            <span id="cart_code">
                              <a
                                href={`/import_stocks/detail/${store_code}/${itemImportStock.import_stock_id_refund}`}
                              >
                                #{itemImportStock.import_stock_code_refund}
                              </a>
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="card-body">
                        <div style={{ marginBottom: "10px" }}>
                          {import_stock_items.map((item, index) => (
                            <ItemDetail
                              getRefund={this.getRefund}
                              id={id}
                              store_code={store_code}
                              index={index}
                              listItems={import_stock_items}
                              status={itemImportStock.status}
                              check={check}
                              listItem={item}
                            />
                          ))}
                        </div>
                        {/* <div class="">
                                                    <div class="card-body" style={{ padding: "0" }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Tiền hàng</div>
                                                            <div>{format(Number(this.state.total_price))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Chiết khấu</div>
                                                            <div>{format(Number(itemImportStock.discount))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Chi phí nhập hàng</div>
                                                            <div>{format(Number(itemImportStock.cost))}</div>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div>Tổng tiền</div>
                                                            <div>{format(Number(itemImportStock.total_final))}</div>
                                                        </div>
                                                    </div>
                                                </div> */}
                        {itemImportStock.note ? (
                          <div>
                            <label
                              style={{ fontWeight: "bold", marginTop: "5px" }}
                            >
                              Ghi chú
                            </label>
                            <div class="card">
                              <div class="card-body" style={{ padding: "0" }}>
                                {itemImportStock.note}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {itemImportStock.status === 0 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              class="btn btn-danger"
                              style={{ marginTop: "20px" }}
                              onClick={() => this.handleChangeStatus(3)}
                            >
                              Hoàn thành
                            </button>
                            {/* <button
                              className="cancel btn btn-secondary"
                              style={{ marginTop: "20px" }}
                              data-toggle="modal"
                              data-target="#removeModal"
                            >
                              Hủy đơn nhập
                            </button> */}
                          </div>
                        ) : itemImportStock.status === 3 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {/* <button
                              class="btn btn-danger"
                              style={{ marginTop: "20px" }}
                              onClick={() => this.handleChangeStatus(2)}
                            >
                              Nhập kho
                            </button> */}
                            <button
                              className="cancel btn btn-secondary"
                              style={{ marginTop: "20px" }}
                              data-toggle="modal"
                              data-target="#removeModal"
                            >
                              Hủy đơn nhập
                            </button>
                          </div>
                        ) : (
                          // : itemImportStock.status === 2 ? (
                          //   <div
                          //     style={{
                          //       display: "flex",
                          //       columnGap: "10px",
                          //       alignItems: "center",
                          //       flexWrap: "wrap",
                          //     }}
                          //   >
                          //     <button
                          //       class="btn btn-danger"
                          //       style={{ marginTop: "20px" }}
                          //       data-toggle="modal"
                          //       data-target="#payment"
                          //     >
                          //       Hoàn thành
                          //     </button>
                          //     <button
                          //       className="cancel btn btn-success"
                          //       style={{ marginTop: "20px" }}
                          //       onClick={() => {
                          //         this.changeStatus(true);
                          //       }}
                          //     >
                          //       Hoàn trả nhà cung cấp
                          //     </button>
                          //     <button
                          //       className="cancel btn btn-secondary"
                          //       style={{ marginTop: "20px" }}
                          //       data-toggle="modal"
                          //       data-target="#endModal"
                          //     >
                          //       Kết thúc đơn nhập
                          //     </button>
                          //   </div>
                          // )
                          ""
                        )}
                        <ModalDelete store_code={store_code} id={id} />
                        <ModalEnd store_code={store_code} id={id} />
                        <ModalPayment
                          store_code={store_code}
                          id={id}
                          price={itemImportStock.total_final}
                          remaining_amount={itemImportStock.remaining_amount}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="card">
                      <div
                        className="card-header py-3"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        Thông tin phiếu kiểm
                      </div>
                      <div className="card-body">
                        <div class="">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tạo ngày:</div>
                            <div>{date}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tạo bởi:</div>
                            <div>{itemImportStock.user?.name}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Chi nhánh:</div>
                            <div>{itemImportStock.branch?.name}</div>
                          </div>

                          {/* <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Trạng thái:</div>

                            {itemImportStock.import_stock_code_refund ==
                            null ? (
                              itemImportStock.payment_status === 0 ? (
                                <div style={{ color: "red" }}>
                                  Chưa thanh toán
                                </div>
                              ) : (
                                <div style={{ color: "green" }}>
                                  Đã thanh toán
                                </div>
                              )
                            ) : (
                              <div style={{ color: "green" }}>Đã hoàn trả</div>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div class="card" style={{ marginTop: "10px" }}>
                      <div class="">
                        <div class="card-body">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tiền hàng</div>
                            <div>
                              {format(
                                Number(this.props.itemImportStock.total_amount)
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Chiết khấu</div>
                            <div>
                              -{format(Number(itemImportStock.discount))}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Chi phí nhập hàng</div>
                            <div>{format(Number(itemImportStock.cost))}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>VAT</div>
                            <div>{format(Number(itemImportStock.vat))}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Tổng tiền</div>
                            <div>
                              {format(Number(itemImportStock.total_final))}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Thanh toán</div>
                            <div>
                              {format(Number(itemImportStock.total_payment))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {check == true &&
                      this.checked(this.state.list_refund) > 0 && (
                        <ItemDetailRefund
                          random={random}
                          id={id}
                          store_code={store_code}
                          listItems={import_stock_items}
                          itemImportStock={itemImportStock}
                          list_refund={this.state.list_refund}
                          discount={itemImportStock.discount}
                        ></ItemDetailRefund>
                      )}
                  </div>
                </div>
              </div>
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
    itemImportStock: state.importStockReducers.import_reducer.detailImportStock,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    handleBalanceInventory: (store_code, branch_id, id) => {
      dispatch(
        inventoryAction.handleBalanceInventory(store_code, branch_id, id)
      );
    },
    fetchDetailImportStock: (store_code, branch_id, id) => {
      dispatch(ImportAction.fetchDetailImportStock(store_code, branch_id, id));
    },
    printImportStock: (store_code, branch_id, id) => {
      dispatch(ImportAction.printImportStock(store_code, branch_id, id));
    },
    changeStatus: (store_code, branch_id, id, data) => {
      dispatch(ImportAction.changeStatus(store_code, branch_id, id, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailImportStock);
