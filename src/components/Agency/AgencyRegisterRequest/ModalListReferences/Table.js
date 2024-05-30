import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TableStyles = styled.div`
  .total-referral_phone_number {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };

  showData = (customer) => {
    var { store_code } = this.props;
    var result = null;
    if (customer.length > 0) {
      var { chat_allow } = this.props;

      result = customer.map((data, index) => {
        return (
          <tr>
            <td>{index + 1}</td>

            <td>{data.name}</td>

            <td>
              {data.is_collaborator == null ||
              data.is_collaborator == "" ||
              data.is_collaborator == false ? (
                <i
                  class="fas fa-close close-status "
                  style={{ color: "red" }}
                ></i>
              ) : (
                <i
                  class="fas fa-check check-status "
                  style={{ color: "green" }}
                ></i>
              )}
            </td>
            <td
              className="total-referral_phone_number"
              onClick={() => this.handleChageCustomersByReferralPhone(data)}
            >
              {data.total_referrals}
            </td>
            <td>{data.phone_number}</td>

            <td>{data.email == null ? "Chưa cập nhật" : data.email}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  handleChageCustomersByReferralPhone = (cusInfo) => {
    this.props.setCustomerInfo(cusInfo);
  };
  render() {
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;
    return (
      <TableStyles class="table-responsive">
        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>

              <th>Cộng tác viên</th>
              <th>Giới thiệu</th>
              <th>Số điện thoại</th>
              <th>Gmail</th>
            </tr>
          </thead>

          <tbody>{this.showData(customers)}</tbody>
        </table>
      </TableStyles>
    );
  }
}

export default Table;
