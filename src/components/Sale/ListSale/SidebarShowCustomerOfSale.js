import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import SidebarFilter from "../../Partials/SidebarFilter";
import * as customerAction from "../../../actions/customer";
import TableCustomerOfSale from "./TableCustomerOfSale";
import Pagination from "./Pagination";
import moment from "moment";
import DateRangePickerCustom from "../../DatePicker/DateRangePickerCustom";

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
      date_from: "",
      date_to: "",
      page: 1,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { saleInfo, fetchAllCustomer, store_code } = this.props;
    const { page, date_from, date_to } = this.state;
    if (!shallowEqual(saleInfo, nextProps.saleInfo)) {
      const params = `&sale_staff_id=${nextProps.saleInfo.id}`;
      fetchAllCustomer(store_code, nextState.page, params);
    }
    return true;
  }

  onChangeDateFromComponent = (date) => {
    const { saleInfo, fetchAllCustomer, store_code } = this.props;

    const params = `&sale_staff_id=${saleInfo.id}&date_from=${date.from}&date_to=${date.to}`;
    fetchAllCustomer(store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
      page: 1,
    });
  };

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
          {customers?.data?.length > 0 && (
            <div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <DateRangePickerCustom
                  row={true}
                  onChangeDate={this.onChangeDateFromComponent}
                />
              </div>
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
    fetchAllCustomer: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomer(id, page, params));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowCustomerOfSale);
