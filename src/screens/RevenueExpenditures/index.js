import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Table from "../../components/RevenueExpenditures/Table";

import ModalRevenue from "../../components/RevenueExpenditures/ModalRevenue";
import ModalExpenditures from "../../components/RevenueExpenditures/ModalExpenditures";

import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import * as staffAction from "../../actions/staff";
import * as customerAction from "../../actions/customer";
import * as dashboardAction from "../../actions/dashboard";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import NotAccess from "../../components/Partials/NotAccess";
import queryString from "query-string";
// import * as customerAction from "../../actions/customer";
import * as reportAction from "../../actions/report";
import * as helper from "../../ultis/helpers";
import moment from "moment";
import ModalPostDate from "../../components/RevenueExpenditures/ModalPostDates";
import { getBranchId } from "../../ultis/branchUtils";
import { filter_var, filter_arr, format } from "../../ultis/helpers";

class RevenueExpenditures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      revenueExpendituresValue: "",
      numPage: 20,
      page: 1,
      typeSelect: "Hôm nay",
      datePrime: "",
      typeDate: "",
      reset: "",
      total: 0,
    };
  }
  componentDidMount() {
    // var { store_code, status_code } = this.props.match.params;
    var { searchValue, numPage, revenueExpendituresValue } = this.state;
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    this.setState({
      datePrime: {
        from: moment().format("DD-MM-YYYY"),
        to: moment().format("DD-MM-YYYY"),
      },
    });
    const time = moment().format("YYYY-MM-DD");
    const params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${time}&date_to=${time}`;
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    this.props.fetchAllStaff(store_code);
    this.props.fetchAllCustomer(store_code);
    this.props.fetchAllSupplier(store_code);
    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1);
  }
  shouldComponentUpdate(nextProps, nextState) {
    var { searchValue, numPage, revenueExpendituresValue } = this.state;
    if (this.state.datePrime !== nextState.datePrime) {
      const param = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${nextState.datePrime.from}&date_to=${nextState.datePrime.to}`;

      var { store_code } = this.props.match.params;
      const branch_id = getBranchId();
      this.props.fetchReportExpenditure(store_code, branch_id, 1, param);
    }
    return true;
  }
  setPage = (page) => {
    this.setState({ page });
  };
  handleGetDatePost = (date, typeSelect) => {
    this.setState({
      datePrime: {
        from: date.datePrime.from,
        to: date.datePrime.to,
      },

      typeSelect: typeSelect,
    });
  };
  onchangeDate = (value) => {
    var resetId = helper.randomString(10);

    this.setState({ typeDate: value, reset: resetId });
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  //   onchangeStatusOrder = (data) => {
  //     this.setState({ statusOrder: data });
  //   };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();

    var { searchValue, numPage, revenueExpendituresValue, datePrime } =
      this.state;

    var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${datePrime.from}&date_to=${datePrime.to}`;
    // this.setState({ statusOrder: "", numPage: 20 });
    this.setState({ page: 1 });
    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
  };
  onChangeNumPage = (e) => {
    var { store_code } = this.props.match.params;
    var { searchValue, revenueExpendituresValue, datePrime } = this.state;
    const branch_id = getBranchId();

    // var { statusOrder, searchValue } = this.state;

    var numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });

    // var params = `&search=${searchValue}&order_status_code=${statusOrder}&limit=${numPage}`;
    var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${datePrime.from}&date_to=${datePrime.to}`;

    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
  };
  onChangeRevenueExpendituresValue = (data) => {
    this.setState({ revenueExpendituresValue: data });
  };
  exportListRevenueExpenditure = () => {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();

    var { searchValue, numPage, revenueExpendituresValue, datePrime, page } =
      this.state;

    var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${datePrime.from}&date_to=${datePrime.to}`;
    // this.setState({ statusOrder: "", numPage: 20 });
    // this.setState({ numPage: 20 });
    this.props.exportRevenueExpenditure(store_code, branch_id, page, params);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.add_revenue != "undefined"
    ) {
      var permissions = nextProps.permission;
      // var add_revenue = permissions.add_revenue;
      // var add_expenditure = permissions.add_expenditure
      // var isShow = add_revenue == false && add_expenditure == false ? false : true
      var add_revenue = permissions.revenue_expenditure;
      var add_expenditure = permissions.revenue_expenditure;
      var isShow =
        add_revenue == false && add_expenditure == false ? false : true;
      this.setState({ isLoading: true, isShow, add_revenue, add_expenditure });
    }
    if (this.props.reportExpenditure !== nextProps.reportExpenditure) {
      const { datePrime } = this.state;

      this.setState({ total: nextProps.reportExpenditure?.reserve });
    }
  }

  render() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();

    var {
      // revenueExpenditures,

      staff,
      supplier,
      customers,
      reportExpenditure,
    } = this.props;
    console.log(reportExpenditure, reportExpenditure?.reserve);
    var {
      //   customerId,
      //   customerImg,
      //   customerName,

      searchValue,

      numPage,
      revenueExpendituresValue,
      isShow,
      typeSelect,
      typeDate,
      reset,
      total,
      datePrime,
      add_revenue,
      add_expenditure,
    } = this.state;

    if (this.props.auth) {
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
                    <ModalPostDate
                      reset={reset}
                      handleGetDatePost={this.handleGetDatePost}
                      store_code={store_code}
                      typeDate={typeDate}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Thu chi
                      </h4>{" "}
                      <div>
                        <button
                          style={{ margin: "auto 20px" }}
                          onClick={this.exportListRevenueExpenditure}
                          class={`btn btn-success btn-icon-split btn-sm `}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Export Excel
                          </span>
                        </button>
                        <a
                          data-toggle="modal"
                          data-target="#modalRevenue"
                          class={`btn btn-info btn-icon-split btn-sm ${
                            add_revenue == true ? "show" : "hide"
                          }`}
                          style={{ marginRight: "1rem" }}
                        >
                          <span
                            class="icon text-white-50"
                            style={{ marginRight: 0 }}
                          >
                            <i class="fas fa-plus"></i>
                          </span>
                          <span style={{ color: "white" }} class={`text `}>
                            Thêm phiếu thu
                          </span>
                        </a>
                        <a
                          data-toggle="modal"
                          data-target="#modalExpenditures"
                          class={`btn btn-danger btn-icon-split btn-sm ${
                            add_expenditure == true ? "show" : "hide"
                          }`}
                        >
                          <span
                            class="icon text-white-50"
                            style={{ marginRight: 0 }}
                          >
                            <i class="fas fa-plus"></i>
                          </span>
                          <span style={{ color: "white" }} class={`text `}>
                            Thêm phiếu chi
                          </span>
                        </a>
                      </div>
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div className="card-header py-3">
                        <div
                          class="row"
                          style={{
                            "justify-content": "space-between",
                            alignItems: "center",
                          }}
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
                                placeholder="Tìm theo mã phiếu"
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </form>

                          <div
                            style={{ maxWidth: "240px" }}
                            className="box-body table-responsive pt0"
                          >
                            <br />
                            <div>
                              <p className="sale_user_label bold">
                                Tổng thu:{" "}
                                <span id="total_selected">
                                  {format(
                                    this.props.reportExpenditure.renvenure
                                  )}
                                </span>
                              </p>
                              <p className="sale_user_label bold">
                                Tổng chi:{" "}
                                <span id="total_selected">
                                  -
                                  {format(
                                    this.props.reportExpenditure.expenditure
                                  )}
                                </span>
                              </p>
                              <p
                                className="sale_user_label bold"
                                style={{ color: "red" }}
                              >
                                Tồn cuối kì:{" "}
                                <span id="total_selected">{format(total)}</span>
                              </p>
                            </div>
                          </div>

                          {/* <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <div>Tổng thu: </div>
                              <div>Tổng chi: </div>
                              <div style={{ color: "chocolate" }}>
                                Tồn cuối kì:{" "}
                              </div>
                            </div>

                            <div>
                              <div style={{ paddingLeft: "20px" }}>
                                {helper.format(
                                  Number(this.props.reportExpenditure.renvenure)
                                )}
                              </div>

                              <div style={{ paddingLeft: "20px" }}>
                                {helper.format(
                                  Number(
                                    this.props.reportExpenditure.expenditure
                                  )
                                )}
                              </div>

                              <div style={{ paddingLeft: "20px" }}>
                                {helper.format(Number(total))}
                              </div>
                            </div>
                          </div> */}

                          <div class="dropdown">
                            <button
                              style={{
                                background: "white",
                                border: "0px",
                                color: "#4141bb",
                              }}
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {typeSelect}
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <p
                                data-toggle="modal"
                                data-target="#postDateModal"
                                onClick={() => this.onchangeDate("DAY")}
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Ngày
                              </p>
                              <p
                                data-toggle="modal"
                                data-target="#postDateModal"
                                onClick={() => this.onchangeDate("WEEK")}
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Tuần{" "}
                              </p>
                              <p
                                data-toggle="modal"
                                data-target="#postDateModal"
                                onClick={() => this.onchangeDate("MONTH")}
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Tháng
                              </p>
                              <p
                                data-toggle="modal"
                                data-target="#postDateModal"
                                onClick={() => this.onchangeDate("YEAR")}
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Năm
                              </p>
                              <p
                                data-toggle="modal"
                                data-target="#postDateModal"
                                onClick={() => this.onchangeDate("OPTION")}
                                class="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Tùy chỉnh
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        {supplier.data !== undefined &&
                          customers.data !== undefined && (
                            <Table
                              // numPage={numPage}

                              store_code={store_code}
                              branch_id={branch_id}
                              revenueExpenditures={reportExpenditure}
                              searchValue={searchValue}
                              onChangeRevenueExpendituresValue={
                                this.onChangeRevenueExpendituresValue
                              }
                              revenueExpendituresValue={
                                revenueExpendituresValue
                              }
                              numPage={numPage}
                              staff={staff}
                              supplier={supplier.data}
                              customers={customers.data}
                              datePrime={datePrime}
                            />
                          )}
                      </div>
                      <div style={{ display: "flex" }}>
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

                        <Pagination
                          searchValue={searchValue}
                          limit={numPage}
                          setPage={this.setPage}
                          store_code={store_code}
                          branch_id={branch_id}
                          revenueExpenditures={reportExpenditure}
                          revenueExpendituresValue={revenueExpendituresValue}
                          datePrime={datePrime}
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

            {supplier.data && customers.data && staff && (
              <ModalRevenue
                store_code={store_code}
                branch_id={branch_id}
                revenueExpenditures={reportExpenditure}
                staff={staff}
                // supplier={supplier.data}
                // customers={customers.data}
                is_revenue={true}
                limit={numPage}
                searchValue={searchValue}
                datePrime={datePrime}
              />
            )}
            {supplier.data && customers.data && staff && (
              <ModalExpenditures
                store_code={store_code}
                branch_id={branch_id}
                revenueExpenditures={reportExpenditure}
                staff={staff}
                supplier={supplier.data}
                customers={customers.data}
                is_revenue={false}
                limit={numPage}
                searchValue={searchValue}
                datePrime={datePrime}
              />
            )}
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
    // revenueExpenditures:
    //   state.revenueExpendituresReducers.revenueExpenditures
    //     .allRevenueExpenditures,
    auth: state.authReducers.login.authentication,

    permission: state.authReducers.permission.data,
    staff: state.staffReducers.staff.allStaff,
    supplier: state.storeReducers.store.supplier,
    customers: state.customerReducers.customer.allCustomer,
    // customer: state.customerReducers.customer.customerID,
    reportExpenditure: state.reportReducers.reportExpenditure,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    // fetchAllRevenueExpenditures: (id, branch_id, page, params) => {
    //   dispatch(
    //     revenueExpendituresAction.fetchAllRevenueExpenditures(
    //       id,
    //       branch_id,
    //       page,
    //       params
    //     )
    //   );
    // },
    fetchAllSupplier: (store_code) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code));
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchAllStaff: (id) => {
      dispatch(staffAction.fetchAllStaff(id));
    },

    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
    exportRevenueExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.exportRevenueExpenditure(
          store_code,
          branch_id,
          page,
          params
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueExpenditures);
