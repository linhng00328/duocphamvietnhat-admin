import React, { Component } from "react";
import { formatNoD } from "../../../../ultis/helpers";
import ModalRevenue from "../../../../components/RevenueExpenditures/ModalRevenue";
import ModalExpenditures from "../../../../components/RevenueExpenditures/ModalExpenditures";
import * as themeAction from "../../../../actions/theme";
import * as revenueExpendituresAction from "../../../../actions/revenue_expenditures";
import * as staffAction from "../../../../actions/staff";
import * as customerAction from "../../../../actions/customer";
import * as dashboardAction from "../../../../actions/dashboard";
import { connect } from "react-redux";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as billAction from "../../../../actions/bill";
import { getBranchId } from "../../../../ultis/branchUtils";
import * as Env from "../../../../ultis/default";
import ModalDetail from "../../../RevenueExpenditures/ModalDetail";
import * as helper from "../../../../ultis/helpers";
import Pagination from "../../../../components/RevenueExpenditures/Pagination";
import { filter_arr, format } from "../../../../ultis/helpers";
import { Link } from "react-router-dom";
import * as Types from "../../../../constants/ActionType";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadRevenueExpenditures: false,
    };
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
    var { store_code } = this.props.match.params;
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
    var { store_code } = this.props.match.params;
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
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.add_revenue != "undefined"
    ) {
      var permissions = nextProps.permission;
      var add_revenue = permissions.add_revenue;
      var add_expenditure = permissions.add_expenditure;
      this.setState({ isLoading: true, add_revenue, add_expenditure });
    }
    if (this.props.reportExpenditure !== nextProps.reportExpenditure) {
      const { datePrime } = this.state;

      this.setState({ total: nextProps.reportExpenditure.reserve });
    }

    if (nextProps.status_revenue == true) {
      this.setState({ isLoadRevenueExpenditures: true });
      this.props.resetStatusRevenueExpenditures({
        type: Types.RESET_STATUS_LOADING,
        data: false,
      });
    }
  }

  componentDidMount() {
    var { customer, store_code } = this.props;
    this.props.fetchAllRevenueExpenditures(
      store_code,
      getBranchId(),
      1,
      `&recipient_group=0&recipient_references_id=${customer.id}`
    );
    this.props.fetchAllStaff(store_code);
    this.props.fetchAllCustomer(store_code);
    this.props.fetchAllSupplier(store_code);
  }

  componentWillUnmount() {
    if (this.status_revenue === true) {
      this.props.resetStatusRevenueExpenditures({
        type: Types.RESET_STATUS_LOADING,
        data: false,
      });
    }
  }

  destroyBanner = (e, id, title) => {
    this.setState({ modalremove: { title: "banner", id: id, _title: title } });
  };
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

  updateBanner = (e, id, title, img) => {
    this.setState({
      modalupdate: { title: "banner", id: id, _title: title, image_url: img },
    });
  };
  showRevenues = (listBills, per_page, current_page) => {
    var result = null;
    var { store_code } = this.props;

    if (typeof listBills == "undefined") {
      return result;
    }
    if (listBills.length > 0) {
      result = listBills.map((data, index) => {
        return (
          <tr
            style={{ cursor: "pointer" }}
            data-toggle="modal"
            data-target="#modalDetail"
            onClick={() =>
              this.setState({
                idModalShow: data.id,
              })
            }
          >
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td>{data.code}</td>
            <td style={{ verticalAlign: "middle" }}>
              {data.is_revenue ? (
                <p style={{ color: "rgb(54, 185, 204)", margin: 0 }}>
                  Phiếu thu
                </p>
              ) : (
                <p style={{ color: "rgb(231, 74, 59)", margin: 0 }}>
                  Phiếu chi
                </p>
              )}
            </td>
            <td>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data?.change_money)}
            </td>
            <td>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data?.current_money)}
            </td>

            <td>{data.created_at}</td>

            <td>{data?.type_action_name}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, revenueExpenditures, searchValue, numPage, customer } =
      this.props;
    var branch_id = getBranchId();

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
    var {
      // revenueExpenditures,
      revenueExpenditures,
      staff,
      supplier,
      customers,
      reportExpenditure,
    } = this.props;
    var per_page = revenueExpenditures.per_page;
    var current_page = revenueExpenditures.current_page;
    return (
      <div className="support">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h4 className="h4 title_content mb-0 text-gray-800"></h4>{" "}
          <div>
            <a
              data-toggle="modal"
              data-target="#modalRevenue"
              class={`btn btn-info btn-icon-split btn-sm ${
                add_revenue == true ? "show" : "hide"
              }`}
              style={{ marginRight: "1rem" }}
            >
              <span class="icon text-white-50" style={{ marginRight: 0 }}>
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
              <span class="icon text-white-50" style={{ marginRight: 0 }}>
                <i class="fas fa-plus"></i>
              </span>
              <span style={{ color: "white" }} class={`text `}>
                Thêm phiếu chi
              </span>
            </a>
          </div>
        </div>
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>

            <div className="form-group">
              <label htmlFor="name">
                Nợ hiện tại:&nbsp;{format(customer.debt || 0)}
              </label>

              <div class="table-responsive">
                <table class="table table-hover table-border">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Mã</th>
                      <th>Loại phiếu</th>
                      <th>Số tiền thay đổi</th>

                      <th>Số nợ hiện tại</th>
                      <th>Ngày tạo</th>

                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.isLoadRevenueExpenditures == true &&
                      this.showRevenues(
                        revenueExpenditures.data,
                        per_page,
                        current_page
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
        <Pagination
          limit={20}
          store_code={store_code}
          revenueExpenditures={revenueExpenditures}
          branch_id={branch_id}
          recipient_group={0}
          recipient_references_id={customer.id}
        />
        <ModalDetail
          store_code={store_code}
          branch_id={branch_id}
          revenue_expenditure_id={this.state.idModalShow}
          staff={staff}
          supplier={supplier}
          customers={customers}
        />
        {supplier.data !== undefined &&
          customers.data !== undefined &&
          staff.length !== 0 && (
            <ModalRevenue
              getFor="CUSTOMER"
              notDate={true}
              store_code={store_code}
              branch_id={branch_id}
              revenueExpenditures={reportExpenditure}
              staff={staff}
              customer={customer}
              // supplier={supplier.data}
              // customers={customers.data}
              is_revenue={true}
              limit={numPage}
              searchValue={searchValue}
              datePrime={datePrime}
            />
          )}
        {supplier.data !== undefined &&
          customers.data !== undefined &&
          staff.length !== 0 && (
            <ModalExpenditures
              getFor="CUSTOMER"
              customer={customer}
              notDate={true}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,
    supplier: state.storeReducers.store.supplier,
    customers: state.customerReducers.customer.allCustomer,
    revenueExpenditures:
      state.revenueExpendituresReducers.revenueExpenditures
        .allRevenueExpenditures,
    status_revenue:
      state.revenueExpendituresReducers.revenueExpenditures.status,
    customer: state.customerReducers.customer.customerID,
    bills: state.billReducers.bill.allBill,
    permission: state.authReducers.permission.data,

    theme: state.themeReducers.theme,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllSupplier: (store_code) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code));
    },
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchAllStaff: (id) => {
      dispatch(staffAction.fetchAllStaff(id));
    },

    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
    fetchTheme: (store_code) => {
      dispatch(themeAction.fetchTheme(store_code));
    },
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
    fetchAllRevenueExpenditures: (id, branch_id, page, params) => {
      dispatch(
        revenueExpendituresAction.fetchAllRevenueExpenditures(
          id,
          branch_id,
          page,
          params
        )
      );
    },
    resetStatusRevenueExpenditures: (status) => {
      dispatch(status);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
