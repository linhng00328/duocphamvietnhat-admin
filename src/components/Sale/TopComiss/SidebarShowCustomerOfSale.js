import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import SidebarFilter from "../../Partials/SidebarFilter";
import * as customerAction from "../../../actions/customer";
import * as saleAction from "../../../actions/sale";
import TableCustomerOfSale from "./TableCustomerOfSale";
import Pagination from "./PaginationCustomerOfSale";

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
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      saleInfo,
      fetchAllCustomer,
      store_code,
      fetchListIdsFromSale,
      params,
      paramsTime,
      listIdsCustomerFromSale,
    } = this.props;
    if (!shallowEqual(saleInfo, nextProps.saleInfo)) {
      const paramsListIds = params + `&staff_id=${nextProps.saleInfo?.id}`;
      fetchListIdsFromSale(store_code, paramsListIds);
    }
    if (
      !shallowEqual(listIdsCustomerFromSale, nextProps.listIdsCustomerFromSale)
    ) {
      if (nextProps.listIdsCustomerFromSale?.length > 0) {
        const paramsCustomer =
          paramsTime +
          nextProps.listIdsCustomerFromSale?.reduce(
            (prevListIds, currentListIds, index) => {
              return (
                prevListIds +
                `${
                  index === nextProps.listIdsCustomerFromSale.length - 1
                    ? currentListIds
                    : `${currentListIds}, `
                }`
              );
            },
            `&sale_staff_id=${nextProps.saleInfo?.id}&customer_ids=`
          );
        fetchAllCustomer(store_code, nextState.page, paramsCustomer);
      }
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
  render() {
    const { saleInfo, showSidebar, store_code, customers, fetchAllCustomer } =
      this.props;
    const { page } = this.state;
    return (
      <SidebarFilter
        title={`Những khách hàng của ${saleInfo?.name}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleShowSidebar}
      >
        <SidebarShowCustomerOfSaleStyles>
          {customers?.data?.length > 0 ? (
            <div className="card-body">
              <TableCustomerOfSale
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
                    : null}{" "}
                  trong số {customers.total} khách hàng
                </div>
                <Pagination
                  setPage={this.setPage}
                  store_code={store_code}
                  customers={customers}
                  fetchAllCustomer={fetchAllCustomer}
                  saleInfo={saleInfo}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
              }}
            >
              Không tìm thấy khách hàng !
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
    listIdsCustomerFromSale: state.saleReducers.sale.listIdsCustomerFromSale,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
    fetchListIdsFromSale: (store_code, params) => {
      dispatch(saleAction.fetchListIdsFromSale(store_code, params));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowCustomerOfSale);
