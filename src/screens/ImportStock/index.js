import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "../../components/Partials/Alert";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as Types from "../../constants/ActionType";
import * as ImportAction from "../../actions/import_stock";
import { Link } from "react-router-dom";
import moment from "moment";
import { format } from "../../ultis/helpers";
import Pagination from "../../components/Import_stock/Pagination";
import NotAccess from "../../components/Partials/NotAccess";
import { getQueryParams } from "../../ultis/helpers";

import history from "../../history";

class ImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      filterStatus: getQueryParams("status_list") || null,
    };
  }
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const branch_id = localStorage.getItem("branch_id");
    var { filterStatus, page, searchValue } = this.state;
    var params = "";
    if (filterStatus) params = params + `&status_list=${filterStatus}`;

    params = params + `&search=${searchValue}`;
    this.props.fetchAllImportStock(store_code, branch_id, page, params);
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  componentWillReceiveProps(nextProps, nextState) {
    // if (this.state.paramDate != this.getParamDate() && this.state.paramDate.from != null) {
    //   this.setState({
    //     paramDate: this.getParamDate()
    //   })

    //   var { store_code } = this.props.match.params;
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
    const { store_code } = this.props.match.params;
    this.setState({
      page: 1,
    });
    const branch_id = localStorage.getItem("branch_id");
    const value = this.state.searchValue;
    const params = `&search=${value}`;
    history.push(`/import_stocks/index/${store_code}?page=1&search=${value}`);
    this.props.fetchAllImportStock(store_code, branch_id, 1, params);
  };
  changePage = (store_code, order_code) => {
    const { page, searchValue } = this.state;
    history.push(
      `/import_stocks/detail/${store_code}/${order_code}?page=${page}&search=${searchValue}`
    );
  };

  showData = (listImportStock, store_code) => {
    const { listImportStock: dataListImportStock } = this.props;
    var result = null;
    if (listImportStock) {
      result = listImportStock.map((item, index) => {
        var datetime = moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "DD-MM-YYYY HH:mm"
        );
        return (
          <tr
            className="hover-product"
            onClick={() => this.changePage(store_code, item.id)}
          >
            <td>{(dataListImportStock.current_page - 1) * 20 + index + 1}</td>
            <td>{item.code}</td>
            <td>{format(Number(item.total_final))}</td>
            <td>{format(Number(item.total_payment))}</td>
            <td>{item.supplier?.name}</td>
            <td>
              {item.status === 0
                ? "Đặt hàng"
                : item.status === 1
                ? "Duyệt"
                : item.status === 2
                ? "Nhập kho"
                : item.status === 3
                ? "Hoàn thành"
                : item.status === 4
                ? "Đã hủy"
                : item.status === 5
                ? "Kết thúc"
                : item.status === 6
                ? "Trả hàng"
                : item.status === 7
                ? "Đã hoàn hết"
                : ""}
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
    const { store_code } = this.props.match.params;
    const { listImportStock } = this.props;
    const { searchValue, isShow, filterStatus } = this.state;
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
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Nhập hàng
                    </h4>

                    <Link to={`/import_stock/create/${store_code}`}>
                      <div class="btn btn-info btn-icon-split btn-sm show">
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span class="text ">Tạo đơn nhập hàng</span>
                      </div>
                    </Link>
                  </div>

                  <br></br>
                  <div className="card">
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
                              <th>Tổng tiền</th>
                              <th>Tổng thanh toán</th>
                              <th>Nhà cung cấp</th>
                              <th>Trạng thái</th>
                              <th>Thời gian đặt hàng</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.showData(listImportStock?.data, store_code)}
                          </tbody>
                        </table>
                      </div>
                      <Pagination
                        setPage={this.setPage}
                        searchValue={searchValue}
                        filterStatus={filterStatus}
                        store_code={store_code}
                        listImportStock={listImportStock}
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listImportStock: state.importStockReducers.import_reducer.listImportStock,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllImportStock: (store_code, branch_id, page, params) => {
      dispatch(
        ImportAction.fetchAllImportStock(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportStock);
