import { Component } from "react";
import styled from "styled-components";
import themeData from "../../ultis/theme_data";
import { connect } from "react-redux";
import * as customerAction from "../../actions/customer";
import PaginationListCustomer from "./PaginationListCustomer";

const ModalListCustomersStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  .model-header-modal {
    button {
      margin-right: 10px;
    }
  }
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }

  .modal-body {
    padding-top: 0 !important;
    table {
      tr {
        th {
          position: sticky;
          top: 0;
          background-color: #ffffff;
        }
      }
    }
  }

  .modal-footer {
    border-top-color: transparent;
    .btn-info {
      border: 1px solid transparent;
      transition: all 0.3s;
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

class ModalListCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCustomer: false,
      listCustomersSelected: [],
      page: 1,
      searchValue: "",
      limit: 20,
    };
  }

  componentDidMount() {
    const { store_code, fetchAllCustomer, listCustomers } = this.props;
    if (listCustomers?.length > 0) {
      this.setState({ listCustomersSelected: listCustomers });
    }
    fetchAllCustomer(store_code, 1, "");
  }

  getParams = (searchValue, limit = 20) => {
    var params = "";

    if (limit) {
      params += `&limit=${limit}`;
    }

    if (searchValue) {
      params += `&search=${searchValue}`;
    }

    return params;
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    const { store_code, fetchAllCustomer } = this.props;
    const { searchValue, limit } = this.state;

    this.setState({
      paginate: 1,
    });
    const params = this.getParams(searchValue, limit);
    fetchAllCustomer(store_code, 1, params);
  };
  checkItemSelected = (id) => {
    const { listCustomersSelected } = this.state;
    if (listCustomersSelected?.length > 0) {
      return listCustomersSelected.some((customer) => customer.id === id);
    }
    return false;
  };
  onChangeSelected = (e, data) => {
    const { listCustomersSelected } = this.state;
    const isChecked = this.checkItemSelected(data.id);

    var newListCustomersSelected = JSON.parse(
      JSON.stringify(listCustomersSelected)
    );

    if (isChecked) {
      newListCustomersSelected = listCustomersSelected.filter(
        (customer) => customer.id !== data.id
      );
    } else {
      newListCustomersSelected.push(data);
    }

    this.setState({ listCustomersSelected: newListCustomersSelected });
  };

  onClose = () => {
    const { setOpenModal } = this.props;
    setOpenModal(false);
  };
  getPaginate = (page) => {
    this.setState({ page });
  };
  handleAddCustomer = () => {
    const { listCustomersSelected } = this.state;
    const { setListCustomers, setOpenModal } = this.props;
    setListCustomers(listCustomersSelected);
    setOpenModal(false);
  };
  showData = (customers) => {
    var result = null;
    if (customers.length > 0) {
      result = customers.map((data, index) => {
        return (
          <tr key={data.id}>
            <td>
              <input
                type="checkbox"
                name="input__check"
                className="input__check"
                value={this.checkItemSelected(data.id)}
                checked={this.checkItemSelected(data.id)}
                onChange={(e) => this.onChangeSelected(e, data)}
              />
            </td>
            <td>{(this.props.customers.current_page - 1) * 20 + index + 1}</td>
            <td className="primary">{data.name}</td>{" "}
            <td>{data.phone_number}</td>
            <td>
              {data.points ? new Intl.NumberFormat().format(data.points) : 0}
            </td>
            <td>
              {data.total_final_without_refund
                ? new Intl.NumberFormat().format(
                    data.total_final_without_refund
                  )
                : 0}
            </td>
            <td
              className={`${
                data.is_collaborator === true
                  ? "warning"
                  : data.is_agency === true
                  ? "danger"
                  : "primary"
              } select-role`}
            >
              {data.is_collaborator === true
                ? "Cộng tác viên"
                : data.is_agency === true
                ? `Đại lý${
                    data.agency_type ? `(${data.agency_type?.name})` : ""
                  }`
                : "Khách hàng"}
            </td>
          </tr>
        );
      });
    }

    return result;
  };

  render() {
    var customers;
    customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;
    const { page, searchValue, limit } = this.state;
    const { store_code } = this.props;
    return (
      <ModalListCustomersStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div
              className="model-header-modal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: themeData().backgroundColor,
              }}
            >
              <h4 style={{ color: "white", margin: "10px" }}>
                Danh sách khách hàng
              </h4>
              <button type="button" className="close" onClick={this.onClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  padding: "0 10px",
                }}
              >
                <div>
                  <form>
                    <div class="input-group mb-6" style={{ marginTop: "10px" }}>
                      <input
                        style={{ maxWidth: "250px" }}
                        type="search"
                        name="txtSearch"
                        value={searchValue}
                        onChange={this.onChangeSearch}
                        class="form-control"
                        placeholder="Tìm khách hàng"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-primary"
                          type="submit"
                          style={{
                            borderTopRightRadius: "0.375rem",
                            borderBottomRightRadius: "0.375rem",
                          }}
                          onClick={this.searchData}
                        >
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  overflow: "auto",
                  maxHeight: "68vh",
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
                      <th>
                        {/* <input
                        type="checkbox"
                        name="input__checkAll"
                        className="input__checkAll"
                        checked={
                          customers.length > 0 &&
                          listItemSelected.length === customers.length
                        }
                        onChange={this.onChangeSelected}
                      ></input> */}
                      </th>
                      <th>STT</th>
                      <th>Họ tên</th>
                      <th>Số điện thoại</th>
                      <th>Xu</th>
                      <th>Tổng mua</th>
                      <th>Vai trò</th>
                    </tr>
                  </thead>
                  <tbody>{this.showData(customers)}</tbody>
                </table>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "10px",
              }}
            >
              <PaginationListCustomer
                getPaginate={this.getPaginate}
                store_code={store_code}
                searchValue={searchValue}
                limit={limit}
                customers={this.props.customers}
                getParams={this.getParams}
                fetchAllCustomer={this.props.fetchAllCustomer}
              />
            </div>
            <div
              className="modal-footer"
              style={{
                paddingTop: 0,
              }}
            >
              <button
                type="button"
                className="btn btn-default"
                onClick={this.onClose}
              >
                Đóng
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: themeData().backgroundColor,
                  width: "100px",
                }}
                onClick={this.handleAddCustomer}
                className="btn btn-info"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </ModalListCustomersStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducers.customer.allCustomer,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalListCustomers);
