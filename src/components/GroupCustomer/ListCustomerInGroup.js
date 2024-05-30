import { Component } from "react";
import styled from "styled-components";
import ModalListCustomers from "./ModalListCustomers";

const ListCustomerInGroupStyles = styled.div`
  table {
    tr {
      th {
        position: sticky;
        top: 0;
        background-color: #ffffff;
      }
    }
  }
  .form-condition-deleteBtn {
    color: #a1a09e;
    transition: 0.3s all;
    cursor: pointer;
    svg {
      width: 18px;
    }
    &:hover {
      color: #7f8c8d;
      transform: scale(1.2);
    }
  }
`;

class ListCustomerInGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCustomer: false,
    };
  }

  showData = (listCustomers) => {
    var result = null;
    if (listCustomers.length > 0) {
      result = listCustomers.map((data, index) => {
        return (
          <tr key={data.id}>
            <td>{index + 1}</td>
            <td className="primary">{data.name}</td>{" "}
            <td>{data.phone_number}</td>
            <td>
              {data.total_final_without_refund
                ? new Intl.NumberFormat().format(
                    data.total_final_without_refund
                  )
                : 0}
            </td>
            <td
              style={{
                textAlign: "center",
              }}
            >
              <span
                className="form-condition-deleteBtn"
                onClick={() => this.handleRemoveCustomerInGroup(data)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </td>
          </tr>
        );
      });
    }

    return result;
  };
  setOpenModalCustomer = (openModalCustomer) => {
    this.setState({ openModalCustomer });
  };
  handleRemoveCustomerInGroup = (data) => {
    const { listCustomers, setListCustomers } = this.props;
    if (listCustomers?.length > 0) {
      const newListCustomers = listCustomers.filter(
        (customer) => customer.id != data.id
      );
      setListCustomers(newListCustomers);
    }
  };

  render() {
    const { openModalCustomer } = this.state;
    const { listCustomers, store_code, setListCustomers } = this.props;
    return (
      <ListCustomerInGroupStyles>
        <div
          style={{
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
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
                <th>Số điện thoại</th>
                <th>Tổng mua</th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>{this.showData(listCustomers)}</tbody>
          </table>
        </div>
        <div
          className="form-group-customer-addCondition"
          onClick={() => this.setOpenModalCustomer(true)}
        >
          <span>
            <i className="fas fa-plus"></i>
          </span>
          <span>Thêm khách hàng</span>
        </div>
        {openModalCustomer ? (
          <ModalListCustomers
            openModal={openModalCustomer}
            setOpenModal={this.setOpenModalCustomer}
            listCustomers={listCustomers}
            setListCustomers={setListCustomers}
            store_code={store_code}
          ></ModalListCustomers>
        ) : null}
      </ListCustomerInGroupStyles>
    );
  }
}

export default ListCustomerInGroup;
