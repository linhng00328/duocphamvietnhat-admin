import React, { Component } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import ListComponentToPrint from "../../../screens/Bill/ListComponentPrint";
import getChannel, { IKITECH } from "../../../ultis/channel";
import { getBranchId, getBranchIds } from "../../../ultis/branchUtils";
import * as billAction from "../../../actions/bill";
import * as OrderFrom from "../../../ultis/order_from";
import * as Types from "../../../constants/ActionType";
import { format } from "../../../ultis/helpers";

const TableStyles = styled.div`
  .product_order_code {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const statusCode = {
  WAITING_FOR_PROGRESSING: "WAITING_FOR_PROGRESSING",
  PACKING: "PACKING",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  SHIPPING: "SHIPPING",
  RECEIVED_PRODUCT: "RECEIVED_PRODUCT",
  COMPLETED: "COMPLETED",
  USER_CANCELLED: "USER_CANCELLED",
  CUSTOMER_CANCELLED: "CUSTOMER_CANCELLED",
  DELIVERY_ERROR: "DELIVERY_ERROR",
  CUSTOMER_RETURNING: "CUSTOMER_RETURNING",
  CUSTOMER_HAS_RETURNS: "CUSTOMER_HAS_RETURNS",
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
    };
  }

  componentDidMount() {
    const branchId = getBranchId();
    const branchIds = getBranchIds();
    const branch = branchIds ? branchIds : branchId;
    const { storeCode } = this.props;

    this.setState({
      bills: this.props.bills,
    });
  }

  componentDidUpdate(prevProps, prevState) {
  
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bills !== this.props.bills) {
      this.setState({ bills: nextProps.bills });
    }
  }

  checkLoadingSyncShip = (order_code) => {
    var syncArr = this.syncArr;
    if (syncArr?.length > 0) {
      return syncArr.filter(
        (v) => v.order_code == order_code && v.status == Types.LOADING
      )[0];
    }
    return false;
  };

  checkLoaded = (order_code) => {
    var syncArr = this.syncArr;
    if (syncArr?.length > 0) {
      return syncArr.filter(
        (v) => v.order_code == order_code && v.status == Types.SUCCESS
      )[0];
    }
    return false;
  };

  handleGetPaymentMethodName = (paymentMethodId) => {
    const payment = this.props.payment;
    return payment.find((item) => item.id === paymentMethodId)?.name;
  };

  showData(per_page, current_page) {
    const { bills } = this.state;
    let result = null;

    if (bills.length <= 0) {
      return result;
    }

    result = bills.data.map((bill, index) => {
      return (
        <tr className="hover-product" key={index}>
          <td>{per_page * (current_page - 1) + (index + 1)}</td>  
          <td>
            <span>{bill.order_code}</span>
          </td>
          <td>{bill?.customer_name ? bill?.customer_name : bill?.customer?.name}</td>
          <td>{format(bill.total_final) ?? ""}</td>
          <td>{this.handleGetPaymentMethodName(bill.payment_partner_id)}</td>
          <td>{bill.created_at}</td>
        </tr>
      );
    });

    return result;
  }

  render() {
    return (
      <TableStyles>
        <div class="table-responsive">
          <table
            class="table table-border "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Tên người nhận</th>
                <th>Tổng tiền</th>
                <th>Phương thức thanh toán</th>
                <th>Thời gian tạo đơn</th>
              </tr>
            </thead>

            <tbody>
              {this.showData(
                this.props.bills.per_page,
                this.props.bills.current_page
              )}
            </tbody>
          </table>
        </div>
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // bills: state.billReducers.bill.allBill,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBill: (id, page, branch_id, params, params_agency) => {
      dispatch(
        billAction.fetchAllBill(id, page, branch_id, params, params_agency)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
