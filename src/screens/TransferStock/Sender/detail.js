import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../components/Partials/Alert";
import Footer from "../../../components/Partials/Footer";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import * as Types from "../../../constants/ActionType";
import * as inventoryAction from "../../../actions/inventory";
import moment from "moment";
import { Link } from "react-router-dom";
import * as TransferStockAction from "../../../actions/transfer_stock";
import "./detail.css";
import ItemDetail from "../../../components/Transfer_stock/ItemDetail";
import ModalPayment from "../../../components/Transfer_stock/ModalPayment";
import ModalDelete from "../../../components/Transfer_stock/ModalDelete";
import ModalEnd from "../../../components/Transfer_stock/ModalEnd";
import { format, randomString } from "../../../ultis/helpers";
import ItemDetailRefund from "../../../components/Transfer_stock/ItemDetailRefund";
import history from "../../../history";
import { getQueryParams } from "../../../ultis/helpers";
import ModalUpdateNote from "./ModalUpdateNote";

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
      tabIndex: getQueryParams("tab-index") ?? null,
    };
  }
  componentDidMount() {
    const { store_code, id } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchDetailTransferStock(store_code, branch_id, id);
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
      var total_prices = 0;
      nextProps.itemImportStock.transfer_stock_items.forEach((item) => {
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
    var { store_code } = this.props.match.params;

    var tabIndex = getQueryParams("tab-index");
    var page = getQueryParams("page");
    var search = getQueryParams("search");
    var params = "";
    if (tabIndex) {
      params =
        params +
        `?tab-index=${tabIndex}${page ? `&page=${page}` : ""}${
          search ? `&search=${search}` : ""
        }`;
      history.replace(`/transfer_stocks/index/${store_code}${params}`);
    } else {
      history.replace(
        `/transfer_stocks/index/${store_code}?tab-index=1${
          page ? `&page=${page}` : ""
        }${search ? `&search=${search}` : ""}`
      );
    }
  };
  render() {
    const { store_code, id } = this.props.match.params;
    const { itemImportStock } = this.props;
    const { statusFinal, check, list_refund, random, isShow } = this.state;
    const transfer_stock_items = this.props.itemImportStock.transfer_stock_items
      ? this.props.itemImportStock.transfer_stock_items
      : [];
    const date = moment(
      itemImportStock.updated_at,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY-MM-DD");
    const total =
      this.state.total_price - itemImportStock.discount + itemImportStock.cost;
    var from = getQueryParams("from");
    console.log(this.state.list_refund);
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <ModalUpdateNote
          note={itemImportStock.note}
          store_code={store_code}
          id={id}
          to_branch_id={itemImportStock.to_branch_id}
          transfer_stock_items={itemImportStock?.transfer_stock_items}
        ></ModalUpdateNote>
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
                  }}
                >
                  <button
                    style={{ marginRight: "10px" }}
                    type="button"
                    onClick={this.goBack}
                    class="btn btn-warning  btn-sm"
                  >
                    <i class="fa fa-arrow-left"></i>&nbsp;Trở về
                  </button>

                  {itemImportStock.status === 0 &&
                  from != 2 &&
                  isShow == true ? (
                    <Link
                      style={{ marginRight: "10px" }}
                      type="button"
                      to={`/transfer_stock/edit/${store_code}/${id}`}
                      class="btn btn-primary  btn-sm"
                    >
                      <i class="fa fa-edit"></i>&nbsp;Sửa phiếu
                    </Link>
                  ) : (
                    ""
                  )}
                </div>

                <br></br>
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div
                        className="card-header py-3"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          Thông tin phiếu chuyển #{itemImportStock.code}
                        </span>
                      </div>
                      <div className="card-body">
                        <div style={{ marginBottom: "10px" }}>
                          {transfer_stock_items.map((item, index) => (
                            <ItemDetail
                              getRefund={this.getRefund}
                              id={id}
                              store_code={store_code}
                              index={index}
                              listItems={transfer_stock_items}
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
                            <div
                              class="card note-stock"
                              data-toggle="modal"
                              data-target="#updateModal"
                            >
                              <div class="right-inner-addon input-container">
                                <i
                                  style={{ fontSize: "16px", padding: "2px" }}
                                  class="fa fa-pencil"
                                ></i>

                                <div class="card-body" style={{ padding: "0" }}>
                                  {itemImportStock.note}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {itemImportStock.status === 0 &&
                          (this.state.tabIndex == 1 ||
                            this.state.tabIndex == null) && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <button
                                type="button"
                                style={{ marginTop: "20px" }}
                                data-toggle="modal"
                                data-target="#removeModal"
                                class="btn btn-danger  btn-sm"
                              >
                                <i class="fa fa-trash"></i>&nbsp;Hủy phiếu
                                chuyển kho
                              </button>
                              {/* <button className="cancel btn btn-danger"  >Hủy phiếu chuyển kho</button> */}
                            </div>
                          )}

                        {itemImportStock.status === 0 &&
                          this.state.tabIndex == 2 && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {/* <button class="btn btn-success" style={{ marginTop: "20px" }} onClick={() => this.handleChangeStatus(2)} >Đã nhận hàng</button> */}
                              <button
                                type="button"
                                style={{ marginTop: "20px" }}
                                class="btn btn-success  btn-sm"
                                onClick={() => this.handleChangeStatus(2)}
                              >
                                <i class="fa fa-check"></i>&nbsp;Đã nhận hàng
                              </button>

                              <button
                                type="button"
                                style={{ marginTop: "20px" }}
                                data-toggle="modal"
                                data-target="#removeModal"
                                class="btn btn-danger  btn-sm"
                              >
                                <i class="fa fa-trash"></i>&nbsp;Hủy phiếu
                                chuyển kho
                              </button>

                              {/* <button className="cancel btn btn-danger"  >Hủy phiếu chuyển kho</button> */}
                            </div>
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
                  <div className="col-6">
                    <div className="card">
                      <div
                        className="card-header py-3"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        Thông tin phiếu chuyển
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
                            <div>Từ chi nhánh:</div>
                            <div>{itemImportStock.from_branch?.name}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Đến chi nhánh:</div>
                            <div>{itemImportStock.to_branch?.name}</div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Trạng thái:</div>

                            <div
                              className={
                                itemImportStock.status == 2
                                  ? "success"
                                  : itemImportStock.status == 0
                                  ? "secondary"
                                  : "danger"
                              }
                            >
                              {" "}
                              {itemImportStock.status == 2
                                ? "Đã nhận hàng"
                                : itemImportStock.status == 0
                                ? "Chờ nhận hàng"
                                : "Đã hủy"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
    itemImportStock:
      state.importStockReducers.import_reducer.detailTransferStock,
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
    fetchDetailTransferStock: (store_code, branch_id, id) => {
      dispatch(
        TransferStockAction.fetchDetailTransferStock(store_code, branch_id, id)
      );
    },
    changeStatus: (store_code, branch_id, id, data) => {
      dispatch(
        TransferStockAction.changeStatus(store_code, branch_id, id, data)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailImportStock);
