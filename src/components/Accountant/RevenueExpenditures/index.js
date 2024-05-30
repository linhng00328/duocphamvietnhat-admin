import React, { Component } from "react";

import Table from "../../../components/RevenueExpenditures/Table";

import ModalRevenue from "../../../components/RevenueExpenditures/ModalRevenue";
import ModalExpenditures from "../../../components/RevenueExpenditures/ModalExpenditures";

import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./../../../screens/Loading";
import * as revenueExpendituresAction from "../../../actions/revenue_expenditures";
import * as staffAction from "../../../actions/staff";
import * as customerAction from "../../../actions/customer";
import * as dashboardAction from "../../../actions/dashboard";
import Pagination from "../../../components/RevenueExpenditures/Pagination";
import NotAccess from "../../../components/Partials/NotAccess";
import queryString from "query-string";
// import * as customerAction from "../../../actions/customer";
import * as reportAction from "../../../actions/report";
import * as helper from "../../../ultis/helpers";
import moment from "moment";
import ModalPostDate from "../../../components/RevenueExpenditures/ModalPostDates";
import { getBranchId } from "../../../ultis/branchUtils";
import { filter_var, filter_arr, format } from "../../../ultis/helpers";

class RevenueExpenditures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            revenueExpendituresValue: "",
            numPage: 20,
            typeSelect: "Hôm nay",
            datePrime: "",
            typeDate: "",
            reset: "",
            total: 0,
        };
    }
    componentDidMount() {
        // var { store_code, status_code } = this.props;
        var { searchValue, numPage, revenueExpendituresValue } = this.state;
        var { store_code } = this.props;
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

            var { store_code } = this.props;
            const branch_id = getBranchId();
            this.props.fetchReportExpenditure(store_code, branch_id, 1, param);
        }
        return true;
    }
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
        var { store_code } = this.props;
        const branch_id = getBranchId();

        var { searchValue, numPage, revenueExpendituresValue, datePrime } =
            this.state;

        var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${datePrime.from}&date_to=${datePrime.to}`;
        // this.setState({ statusOrder: "", numPage: 20 });
        // this.setState({ numPage: 20 });
        // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
        this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    };
    onChangeNumPage = (e) => {
        var { store_code } = this.props;
        var { searchValue, revenueExpendituresValue, datePrime } = this.state;
        const branch_id = getBranchId();

        // var { statusOrder, searchValue } = this.state;

        var numPage = e.target.value;
        this.setState({
            numPage,
        });

        // var params = `&search=${searchValue}&order_status_code=${statusOrder}&limit=${numPage}`;
        var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${revenueExpendituresValue}&date_from=${datePrime.from}&date_to=${datePrime.to}`;

        // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
        this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    };
    onChangeRevenueExpendituresValue = (data) => {
        this.setState({ revenueExpendituresValue: data });
    };
    // fetchAllData = () => {
    //   var { store_code } = this.props;
    //   const branch_id = getBranchId();

    //   this.props.fetchAllStaff(store_code);
    //   this.props.fetchAllCustomer(store_code);
    //   this.props.fetchAllSupplier(store_code);

    //   this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1);
    //   this.setState({ total: this.props.reportExpenditure.reserve });
    // };

    componentWillReceiveProps(nextProps) {
        if (
            this.state.isLoading != true &&
            typeof nextProps.permission.revenue_expenditure != "undefined"
        ) {
            var permissions = nextProps.permission;
            console.log(permissions);
            var isShow = permissions.revenue_expenditure;

            this.setState({ isLoading: true, isShow });
        }
        if (this.props.reportExpenditure !== nextProps.reportExpenditure) {
            const { datePrime } = this.state;

            this.setState({ total: nextProps.reportExpenditure.reserve });
        }
    }

    render() {
        var { store_code } = this.props;
        const branch_id = getBranchId();

        var {
            // revenueExpenditures,

            staff,
            supplier,
            customers,
            reportExpenditure,
        } = this.props;
        console.log(reportExpenditure, reportExpenditure.reserve);
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
        } = this.state;

return(
    <React.Fragment>
            <ModalPostDate
                reset={reset}
                handleGetDatePost={this.handleGetDatePost}
                store_code={store_code}
                typeDate={typeDate}
            />


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
                                    <span id="total_selected">{format(this.props.reportExpenditure.renvenure)}</span>
                                </p>
                                <p className="sale_user_label bold">
                                    Tổng chi:{" "}
                                    <span id="total_selected">-{format(this.props.reportExpenditure.expenditure)}</span>
                                </p>
                                <p className="sale_user_label bold" style={{ color: "red" }}>
                                    Tồn cuối kì:{" "}
                                    <span id="total_selected">{format(total)}</span>
                                </p>
                            </div>



                        </div>



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
                        customers.data !== undefined &&
                        staff.length !== 0 && (
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
                        store_code={store_code}
                        branch_id={branch_id}
                        revenueExpenditures={reportExpenditure}
                        revenueExpendituresValue={revenueExpendituresValue}
                        datePrime={datePrime}
                    />
                </div>
            </div>
            </React.Fragment>
)


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
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueExpenditures);
