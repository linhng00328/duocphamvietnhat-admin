import React, { Component } from "react";

import Form from "../../../../components/Promotion/Voucher/Edit/Form";
import * as Types from "../../../../constants/ActionType";

import Alert from "../../../../components/Partials/Alert";

import { connect, shallowEqual } from "react-redux";
import * as voucherAction from "../../../../actions/voucher";
import * as productAction from "../../../../actions/product";
import * as CategoryPAction from "../../../../actions/category_product";
import TableVoucher from "../../../../components/Promotion/Voucher/Edit/TableVoucher.js";
import _ from "lodash";
import Pagination from "./Pagination.js";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      selectValue: "",
      page: 1,
      perpage: 10,
      per_page_products_table: 20,
      page_table: 1,
    };
  }

  componentDidMount() {
    const { store_code, voucherId } = this.props;
    this.props.fetchVoucherId(store_code, voucherId, () => {
      this.props.fetchListProductsById(store_code, voucherId, 1, 20);
    });
    this.props.fetchAllProduct(store_code);
    this.props.fetchAllVoucher(store_code);
    this.props.fetchAllCategoryP(store_code);
    this.props.fetchVoucherCodes(
      store_code,
      voucherId,
      "",
      "",
      "",
      this.state.perpage
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !shallowEqual(this.state.selectValue, prevState.selectValue) ||
      !shallowEqual(this.state.perpage, prevState.perpage)
    ) {
      const { store_code, voucherId } = this.props;
      const { searchValue, selectValue, perpage } = this.state;
      this.setState({ page: 1 });
      this.props.fetchVoucherCodes(
        store_code,
        voucherId,
        1,
        searchValue,
        selectValue,
        perpage
      );
    } else if (!shallowEqual(this.state.page, prevState.page)) {
      const { store_code, voucherId } = this.props;
      const { searchValue, selectValue, page, perpage } = this.state;
      this.props.fetchVoucherCodes(
        store_code,
        voucherId,
        page,
        searchValue,
        selectValue,
        perpage
      );
    }
  }

  setPageProductsTable = (page) => {
    this.setState({ page_table: page });
  };

  onSearch = (e) => {
    e.preventDefault();
    const { store_code, voucherId } = this.props;
    const { searchValue, selectValue, perpage } = this.state;
    this.setState({ page: 1 });
    this.props.fetchVoucherCodes(
      store_code,
      voucherId,
      1,
      searchValue,
      selectValue,
      perpage
    );
  };

  onSelectChange = (e) => {
    this.setState({
      selectValue: e.target.value,
    });
  };

  onPerpageChange = (e) => {
    this.setState({
      perpage: e.target.value,
    });
  };

  handleExportVoucherCodes = () => {
    const { store_code, voucherId } = this.props;
    this.props.fetchExportCodes(store_code, voucherId);
  };

  render() {
    var { voucher, products, history, vouchers, listVoucherCodes, listProductsByVoucherId } = this.props;
    var { store_code, voucherId } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa chương trình
          </h4>
        </div>
        <br></br>
        <div class="card shadow mb-4">
          <div class="card-body">
            <section class="content">
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <div id="messages"></div>

                  <div class="box">
                    <Form
                      setPage={this.setPageProductsTable} 
                      per_page_products_table={this.state.per_page_products_table}
                      page_table={this.state.page_table}
                      fetchListProductsById={this.props.fetchListProductsById}
                      listProductsByVoucherId={listProductsByVoucherId}
                      store_code={store_code}
                      history={history}
                      voucherId={voucherId}
                      products={products}
                      voucher={voucher}
                      vouchers={vouchers}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {voucher?.is_use_once_code_multiple_time === false ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className="h4 title_content mb-0 text-gray-800">
                Danh sách voucher được phát hành từ chương trình{" "}
                <span style={{ fontWeight: "600" }}>{voucher.name}</span>
              </h4>
            </div>
            <br></br>
            <div class="card shadow mb-4">
              <div class="card-body">
                <section class="content">
                  <div class="row">
                    <div class="col-md-12 col-xs-12">
                      <div id="messages"></div>

                      <div className="box">
                        <div
                          class="form-group"
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <form
                            class="input-group mb-3"
                            style={{ maxWidth: "350px" }}
                          >
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Tìm kiếm mã voucher"
                              value={this.state.searchValue}
                              onChange={(e) =>
                                this.setState({ searchValue: e.target.value })
                              }
                            />
                            <div class="input-group-append">
                              <button
                                class="btn-primary btn"
                                type="submit"
                                onClick={this.onSearch}
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </form>
                          <div>
                            <div
                              class="col-sm-3"
                              style={{
                                width: "100%",
                                marginLeft: "20px",
                              }}
                            >
                              <select
                                name="is_end"
                                id="input"
                                class="form-control"
                                style={{ width: "180px" }}
                                required="required"
                                value={this.state.selectValue}
                                onChange={this.onSelectChange}
                              >
                                <option value="" selected disabled hidden>
                                  Trạng thái
                                </option>
                                <option value="">Tất cả</option>
                                <option value="0">Đã phát hành</option>
                                <option value="1">Đã sử dụng</option>
                                <option value="2">Đã kết thúc</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <TableVoucher
                          VoucherCodes={listVoucherCodes}
                          store_code={store_code}
                          vourcher_id={voucherId}
                          fetChangeStatusVourcherCodes={
                            this.props.fetchChangeStatusCodes
                          }
                          fetchAllVoucherCodes={this.props.fetchVoucherCodes}
                          page={this.state.page}
                          searchValue={this.state.searchValue}
                          selectValue={this.state.selectValue}
                          perpage={this.state.perpage}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    margin: "30px auto",
                  }}
                >
                  <div style={{ width: "60%" }}>
                    <Pagination
                      store_code={store_code}
                      listVoucherCodes={this.props.listVoucherCodes}
                      vourcher_id={voucherId}
                      setPage={(page) => this.setState({ page: page })}
                    />
                  </div>
                  <div
                    style={{
                      width: "45%",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <span>Số lượng bản ghi mỗi trang: </span>
                    </div>
                    <div
                      class="col-sm-3"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <select
                        name="is_end"
                        id="input"
                        class="form-control"
                        style={{ width: "70px" }}
                        required="required"
                        value={this.state.perpage}
                        onChange={this.onPerpageChange}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      </select>
                    </div>

                    <div
                      style={{
                        background: "grey",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={this.handleExportVoucherCodes}
                    >
                      <i class="fas fa-file-export"></i>
                      <span style={{ paddingLeft: "4px" }}>Xuất File</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    voucher: state.voucherReducers.voucher.voucherId,
    products: state.productReducers.product.allProduct,
    vouchers: state.voucherReducers.voucher.allVoucher,
    listVoucherCodes: state.voucherReducers.voucher.listVoucherCodes,
    linkExportFile: state.voucherReducers.voucher.linkExport,
    alert: state.voucherReducers.alert.alert_uid,
    listProductsByVoucherId: state.voucherReducers.voucher.listProductsByVoucherId,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchVoucherId: (store_code, voucherId, onSuccess) => {
      dispatch(voucherAction.fetchVoucherId(store_code, voucherId, onSuccess));
    },
    fetchAllProduct: (store_code) => {
      dispatch(productAction.fetchAllProduct(store_code));
    },
    fetchAllVoucher: (store_code) => {
      dispatch(voucherAction.fetchAllVoucher(store_code));
    },
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },

    fetchVoucherCodes: (
      store_code,
      vourcher_id,
      page,
      search_value,
      status,
      perpage
    ) => {
      dispatch(
        voucherAction.fetchAllVoucherCodes(
          store_code,
          vourcher_id,
          page,
          search_value,
          status,
          perpage
        )
      );
    },
    fetchExportCodes: (store_code, vourcher_id) => {
      dispatch(voucherAction.fetchExportVoucherCodes(store_code, vourcher_id));
    },
    fetchChangeStatusCodes: (store_code, vourcher_id, data, onSuccess) => {
      dispatch(
        voucherAction.changeStatuVourcherCodes(
          store_code,
          vourcher_id,
          data,
          onSuccess
        )
      );
    },
    fetchListProductsById: (store_code, vourcher_id, page, perpage, onSuccess) => {
      dispatch(voucherAction.fetchAllListProductsByVoucherId(store_code, vourcher_id, page, perpage, onSuccess));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
