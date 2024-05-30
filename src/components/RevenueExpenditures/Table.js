import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { format } from "../../ultis/helpers";
import { connect } from "react-redux";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import * as reportAction from "../../actions/report";
import * as revenueExpendituresAction from "../../actions/revenue_expenditures";
import { shallowEqual } from "../../ultis/shallowEqual";

import ModalDetail from "../../components/RevenueExpenditures/ModalDetail";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // statusOrder: "",
      // statusPayment: "",
      isLoading: false,
      // numPage: 20,
      revenueExpendituresValue: "",
      idModalShow: null,
    };
  }

  // onChangeNumPage = (e) => {

  //   // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
  // };
  onChangeRevenueExpendituresValue = (e) => {
    var { store_code, searchValue, numPage, datePrime } = this.props;
    var { revenueExpendituresValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var { value } = e.target;
    this.setState({ revenueExpendituresValue: value });
    // var { statusOrder, searchValue } = this.state;

    // var params = `&search=${searchValue}&order_status_code=${statusOrder}&limit=${numPage}`;
    var params = `&search=${searchValue}&limit=${numPage}&is_revenue=${value}&date_from=${datePrime.from}&date_to=${datePrime.to}`;
    this.props.onChangeRevenueExpendituresValue(value);
    this.props.fetchReportExpenditure(store_code, branch_id, 1, params);
    // this.props.fetchAllRevenueExpenditures(store_code, branch_id, 1, params);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (this.props.revenueExpendituresValue !=
        nextProps.revenueExpendituresValue ||
        nextState.revenueExpendituresValue !=
        nextProps.revenueExpendituresValue ||
        !shallowEqual(
          nextProps.revenueExpenditures,
          this.props.revenueExpenditures
        )) &&
      nextState.isLoading == false
    ) {
      this.setState({
        revenueExpendituresValue: nextProps.revenueExpendituresValue,
        isLoading: true,
      });
    }
    return true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.revenueExpendituresValue !=
        nextProps.revenueExpendituresValue ||
        this.state.revenueExpendituresValue !=
        nextProps.revenueExpendituresValue) &&
      this.state.isLoading == true
    )
      this.setState({
        revenueExpendituresValue: nextProps.revenueExpendituresValue,
      });
  }
  // componentWillReceiveProps(nextProps) {
  //   if (
  //     this.props.isSearch != nextProps.isSearch &&
  //     this.state.isLoading == true
  //   ) {
  //     this.setState({
  //       numPage: 20,
  //     });
  //   }
  // }

  showData = (listRevenueExpenditures, per_page, current_page) => {
    var { store_code, branch_id, revenueExpenditures } = this.props;

    var result = null;
    if (listRevenueExpenditures.length > 0) {
      result = listRevenueExpenditures.map((data, index) => {
        // var action_create = (data.action_create == 9 ||
        //   data.action_create == 5 ||
        //   data.action_create == 6 ||
        //   data.action_create == 7 ||
        //   data.action_create == 8 ||
        //   data.action_create == 10 ||
        //   data.action_create == 11) ? true : false
        return (
          <React.Fragment>
            <tr
              data-toggle="modal"
              data-target="#modalDetail"
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({
                  idModalShow: data.id,
                })
              }
            >
              <td>{per_page * (current_page - 1) + (index + 1)}</td>
              <td>
                {/* <Link to={action_create ? `/order/detail/${store_code}/${data.references_value}` : "#"}>{data.code}</Link> */}
                {data.code}
              </td>
              <td>
                {data.is_revenue ? (
                  <p style={{ color: " rgb(54 185 204)" }}>Phiếu thu</p>
                ) : (
                  <p style={{ color: "rgb(231 74 59)" }}>Phiếu chi</p>
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

              <td>
                {data.staff !== null ? data.staff?.name : data.user?.name}
              </td>

              <td>{data.created_at}</td>


              <td>{data?.type_action_name}</td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, branch_id, revenueExpenditures, searchValue, numPage } =
      this.props;
    var { staff, supplier, customers } = this.props;
    var { revenueExpendituresValue } = this.state;
    // const branch_id = localStorage.getItem("branch_id");
    // var { statusOrder, statusPayment } = this.state;
    var per_page = revenueExpenditures.per_page;
    var current_page = revenueExpenditures.current_page;
    var listRevenueExpenditures =
      typeof revenueExpenditures.data == "undefined"
        ? []
        : revenueExpenditures.data;
    // console.log("asdasd" + this.props.statusPayment, statusPayment);
    return (
      <React.Fragment>
        <div class="table-responsive" style={{ minHeight: 300 }}>
          <table
            class="table table-border table-hover table-striped"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã</th>
                <th>
                  {" "}
                  <div style={{ display: "flex" }}>
                    <select
                      value={revenueExpendituresValue || ""}
                      name="revenueExpenditures"
                      id="input"
                      class="form-control"
                      required="required"
                      onChange={this.onChangeRevenueExpendituresValue}
                    >
                      <option value="">Tất cả</option>
                      <option value="false">Phiếu chi</option>
                      <option value="true">Phiếu thu</option>
                    </select>
                  </div>
                </th>
                <th>Số tiền thay đổi</th>

                <th>Số nợ hiện tại</th>
                <th>Nhân viên</th>
                <th>Ngày tạo</th>

                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {this.showData(listRevenueExpenditures, per_page, current_page)}
            </tbody>
          </table>

          <ModalDetail
            store_code={store_code}
            branch_id={branch_id}
            revenue_expenditure_id={this.state.idModalShow}
            staff={staff}
            supplier={supplier}
            customers={customers}
          />
        </div>
      </React.Fragment>
    );
  }
}

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
    fetchReportExpenditure: (store_code, branch_id, page, params) => {
      dispatch(
        reportAction.fetchReportExpenditure(store_code, branch_id, page, params)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
