import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import SidebarFilter from "../../../Partials/SidebarFilter.js";
import * as customerAction from "../../../../actions/customer";
import TableCusOfReferPhone from "./TableCusOfReferPhone.js";
import Pagination from "./Pagination";

const SidebarShowCustomerOfSaleStyles = styled.div`
  .totalContent {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class SidebarShowCustomerOfSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchValue: "",
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { saleInfo, fetchAllCustomer, store_code } = this.props;
    if (!shallowEqual(saleInfo, nextProps.saleInfo)) {
      fetchAllCustomer(
        store_code,
        1,
        "",
        nextProps.saleInfo?.customer?.referral_phone_number
      );
    }
    return true;
  }

  setPage = (page) => {
    this.setState({ page });
  };

  handleShowSidebar = (show) => {
    const { setShowSidebar } = this.props;
    setShowSidebar(show);
    this.setPage(1);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  searchData = (e) => {
    e.preventDefault();
    const { saleInfo, fetchAllCustomer, store_code } = this.props;
    const { searchValue } = this.state;
    this.setState({
      page: 1,
    });
    const params = `&search=${searchValue}`;
    fetchAllCustomer(
      store_code,
      1,
      params,
      saleInfo?.customer?.referral_phone_number
    );
  };

  render() {
    const { saleInfo, showSidebar, store_code, customers, fetchAllCustomer } =
      this.props;
    console.log(
      "🚀 ~ file: index.js:65 ~ SidebarShowCustomerOfSale ~ render ~ saleInfo:",
      saleInfo
    );
    const { page } = this.state;
    return (
      <SidebarFilter
        title={`Những khách hàng được giới thiệu bởi ${saleInfo?.customer?.referral_phone_number}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleShowSidebar}
      >
        <form onSubmit={this.searchData} style={{ display: "flex" }}>
          <input
            style={{ maxWidth: "400px" }}
            type="search"
            name="txtSearch"
            value={this.state.searchValue}
            onChange={this.onChangeSearch}
            class="form-control"
            placeholder="Tìm kiếm..."
          />
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              type="submit"
              style={{
                borderTopRightRadius: "0.375rem",
                borderBottomRightRadius: "0.375rem",
              }}
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </form>
        <SidebarShowCustomerOfSaleStyles>
          {customers?.data?.length > 0 && (
            <div className="card-body">
              <TableCusOfReferPhone
                store_code={store_code}
                data={customers.data}
                page={page}
              />
              <div className="totalContent">
                <div className="totalCustomers">
                  Hiển thị {(customers.current_page - 1) * 20 + 1}{" "}
                  {customers.data.length > 1
                    ? `đến ${
                        (customers.current_page - 1) * 20 +
                        customers.data.length
                      }`
                    : ""}{" "}
                  trong số {customers.total} khách hàng
                </div>
                <Pagination
                  setPage={this.setPage}
                  store_code={store_code}
                  customers={customers}
                  fetchAllCustomer={fetchAllCustomer}
                  saleInfo={saleInfo}
                  searchValue={this.state.searchValue}
                />
              </div>
            </div>
          )}
        </SidebarShowCustomerOfSaleStyles>
      </SidebarFilter>
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
    fetchAllCustomer: (id, page, params, referral_phone_number) => {
      dispatch(
        customerAction.fetchAllCustomer(id, page, params, referral_phone_number)
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowCustomerOfSale);
