import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../../components/Partials/Alert";
import Footer from "../../../components/Partials/Footer";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import * as Types from "../../../constants/ActionType";
import * as TransferStockAction from "../../../actions/transfer_stock";
import { Link } from "react-router-dom";
import moment from "moment";
import { format, getQueryParams } from "../../../ultis/helpers";
import Pagination from "../../../components/Transfer_stock/Pagination";
import NotAccess from "../../../components/Partials/NotAccess";

import history from "../../../history";

class TransferStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
    };
  }
  componentDidMount() {
    const { store_code } = this.props;
    const { searchValue, page } = this.state;
    const branch_id = localStorage.getItem("branch_id");

    const params = `&search=${searchValue}`;
    this.props.fetchAllTransferStock(store_code, branch_id, page, params);
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  componentWillReceiveProps(nextProps, nextState) {
    // if (this.state.paramDate != this.getParamDate() && this.state.paramDate.from != null) {
    //   this.setState({
    //     paramDate: this.getParamDate()
    //   })

    //   var { store_code } = this.props;
    //   const branch_id = getBranchId()
    //   var params_agency =
    //   this.state.agency_by_customer_id != null
    //     ? `&agency_by_customer_id=${this.state.agency_by_customer_id}`
    //     : null;
    //   this.props.fetchAllBill(store_code, 1, branch_id, this.getParamDate(), params_agency);
    // }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.inventory_import != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.inventory_import;

      this.setState({ isLoading: true, isShow });
    }
  }
  setPage = (page) => {
    this.setState({ page });
  };
  searchData = (e) => {
    e.preventDefault();
    const { store_code } = this.props;
    this.setState({
      page: 1,
    });
    const branch_id = localStorage.getItem("branch_id");
    const value = this.state.searchValue;
    const params = `&search=${value}`;
    history.push(`/transfer_stocks/index/${store_code}?page=1&search=${value}`);
    this.props.fetchAllTransferStock(store_code, branch_id, 1, params);
  };
  changePage = (store_code, order_code) => {
    const { page, searchValue } = this.state;
    history.push(
      `/transfer_stocks/detail/${store_code}/${order_code}?tab-index=1&page=${page}&search=${searchValue}`
    );
  };

  showData = (listTransferStock, store_code) => {
    const { listTransferStock: dataListTransferStock } = this.props;
    var result = null;

    if (listTransferStock) {
      result = listTransferStock.map((item, index) => {
        var datetime = moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "DD-MM-YYYY HH:mm"
        );

        return (
          <tr
            className="hover-product"
            onClick={() => this.changePage(store_code, item.id)}
          >
            <td>{(dataListTransferStock.current_page - 1) * 20 + index + 1}</td>
            <td>{item.code}</td>
            <td>{item.from_branch?.name}</td>
            <td>{item.to_branch?.name}</td>
            <td
              className={
                item.status == 2
                  ? "success"
                  : item.status == 0
                  ? "secondary"
                  : "danger"
              }
            >
              {item.status == 2
                ? "Đã nhận hàng"
                : item.status == 0
                ? "Chờ nhận hàng"
                : "Đã hủy"}
            </td>
            <td>{datetime}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  render() {
    const { store_code } = this.props;
    const { listTransferStock } = this.props;
    const { searchValue, isShow } = this.state;
    return (
      <div className="">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <form onSubmit={this.searchData}>
              <div class="input-group mb-6">
                <input
                  style={{ maxWidth: "400px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Nhập mã đơn"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Link to={`/transfer_stock/create/${store_code}`}>
            <div class="btn btn-info btn-icon-split btn-sm show">
              <span class="icon text-white-50">
                <i class="fas fa-plus"></i>
              </span>
              <span class="text ">Tạo phiếu chuyển</span>
            </div>
          </Link>
        </div>

        <br></br>
        <div className="card">
          <div className="card-body">
            <div class="table-responsive">
              <table
                class="table  "
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã phiếu</th>
                    <th>Từ chi nhánh</th>
                    <th>Đến chi nhánh</th>
                    <th>Trạng thái</th>
                    <th>Thời gian đặt hàng</th>
                  </tr>
                </thead>

                <tbody>
                  {this.showData(listTransferStock?.data, store_code)}
                </tbody>
              </table>
            </div>
            <Pagination
              setPage={this.setPage}
              searchValue={searchValue}
              store_code={store_code}
              listTransferStock={listTransferStock}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listTransferStock:
      state.importStockReducers.import_reducer.listTransferStock,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTransferStock: (store_code, branch_id, page, params) => {
      dispatch(
        TransferStockAction.fetchAllTransferStock(
          store_code,
          branch_id,
          page,
          params
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransferStock);
