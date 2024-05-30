import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import * as inventoryAction from "../../actions/inventory";
import ItemDetail from "../../components/Inventory/ItemDetail";
import moment from "moment";
import ModalDelete from "../../components/Inventory/ModalDelete";
import { Link } from "react-router-dom";
import history from "../../history";

class DetailInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { store_code, id } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchDetailInventory(store_code, branch_id, id);
  }
  handleBalance = (id) => {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    this.props.handleBalanceInventory(store_code, branch_id, id);
  };
  render() {
    const { store_code } = this.props.match.params;
    const { itemInventory } = this.props;
    const tally_sheet_items = this.props.itemInventory.tally_sheet_items
      ? this.props.itemInventory.tally_sheet_items
      : [];
    const date = moment(itemInventory.updated_at, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY-MM-DD HH:mm"
    );
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />

              <div className="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    style={{ marginRight: "10px" }}
                    type="button"
                    onClick={() => {
                      history.goBack();
                    }}
                    class="btn btn-warning  btn-sm"
                  >
                    <i class="fa fa-arrow-left"></i>&nbsp;Trở về
                  </button>

                  {itemInventory.status === 0 ? (
                    <Link
                      style={{ marginRight: "10px" }}
                      type="button"
                      to={`/inventory/edit/${store_code}/${itemInventory.id}`}
                      class="btn btn-primary  btn-sm"
                    >
                      <i class="fa fa-edit"></i>&nbsp;Sửa phiếu kiểm hàng
                    </Link>
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    class="btn btn-danger  btn-sm"
                    data-toggle="modal"
                    data-target="#removeModal"
                  >
                    <i class="fa fa-trash"></i>&nbsp;Xóa phiếu kiểm hàng
                  </button>
                </div>
                <br></br>
                <div className="row">
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
                        Phiếu kiểm hàng:&nbsp;#{itemInventory.code}
                      </div>
                      <div className="card-body">
                        <div
                          style={{
                            overflowY: "auto",
                            maxHeight: "600px",
                          }}
                        >
                          {tally_sheet_items.map((item) => (
                            <ItemDetail listItem={item} />
                          ))}
                        </div>

                        {itemInventory.note ? (
                          <div>
                            <label
                              style={{ fontWeight: "bold", marginTop: "5px" }}
                            >
                              Ghi chú
                            </label>
                            <div class="card">
                              <div class="card-body" style={{ padding: "0" }}>
                                {itemInventory.note}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {itemInventory.status === 0 ? (
                          <button
                            class="btn btn-danger"
                            style={{ marginTop: "20px" }}
                            onClick={() => this.handleBalance(itemInventory.id)}
                          >
                            Cân bằng kho
                          </button>
                        ) : (
                          ""
                        )}
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
                            <div>
                              {itemInventory?.user
                                ? itemInventory.user?.name
                                : itemInventory?.staff
                                ? itemInventory.staff?.name
                                : null}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Chi nhánh:</div>
                            <div>{itemInventory.branch?.name}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Trạng thái:</div>
                            <div>
                              {itemInventory.status === 0
                                ? "Đã kiểm kho"
                                : "Đã cân bằng"}
                            </div>
                          </div>
                          {itemInventory.status !== 0 && (
                            <React.Fragment>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>Cân bằng kho ngày:</div>
                                <div>{date}</div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>Số lượng cân bằng:</div>
                                <div>{itemInventory.deviant}</div>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                      <ModalDelete
                        id={itemInventory.id}
                        store_code={store_code}
                      />
                    </div>
                    <div class="card" style={{ marginTop: "10px" }}>
                      <div class="card-body">
                        <div class="">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>SL tồn thực tế:</div>
                            <div>{itemInventory.reality_exist}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>SL tồn chi nhánh:</div>
                            <div>{itemInventory.existing_branch}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>SL chênh lệch:</div>
                            <div>{itemInventory.deviant}</div>
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
    itemInventory: state.inventoryReducers.inventory_reducer.itemInventory,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    handleBalanceInventory: (store_code, branch_id, id) => {
      dispatch(
        inventoryAction.handleBalanceInventory(store_code, branch_id, id)
      );
    },
    fetchDetailInventory: (store_code, branch_id, id) => {
      dispatch(inventoryAction.fetchDetailInventory(store_code, branch_id, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailInventory);
