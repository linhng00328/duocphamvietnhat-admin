import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import SidebarFilter from "../Partials/SidebarFilter";
import * as groupCustomerAction from "../../actions/group_customer";
import TableCustomerByGroup from "./TableCustomerByGroup";
import Pagination from "./PaginationCustomerByGroup";

const SidebarShowCustomerByGroupStyles = styled.div`
  .totalContent {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class SidebarShowCustomerByGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { groupInfo, fetchListCustomerByGroup, store_code } = this.props;
    if (
      !shallowEqual(groupInfo, nextProps.groupInfo) &&
      nextProps.groupInfo?.id
    ) {
      fetchListCustomerByGroup(store_code, nextProps.groupInfo.id, "page=1");
    }

    return true;
  }
  setPage = (page) => {
    this.setState({ page });
  };
  handleShowSidebar = (show) => {
    const { setShowSidebar, setGroupInfo } = this.props;
    setShowSidebar(show);
    setGroupInfo({});
    this.setPage(1);
  };
  render() {
    const {
      groupInfo,
      showSidebar,
      store_code,
      customers,
      fetchListCustomerByGroup,
    } = this.props;

    const { page } = this.state;
    return (
      <SidebarFilter
        title={`Những khách hàng của nhóm ${groupInfo?.name}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleShowSidebar}
      >
        <SidebarShowCustomerByGroupStyles>
          {customers?.data?.length > 0 ? (
            <div className="card-body">
              <TableCustomerByGroup
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
                  fetchListCustomerByGroup={fetchListCustomerByGroup}
                  groupInfo={groupInfo}
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
        </SidebarShowCustomerByGroupStyles>
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
    fetchListCustomerByGroup: (store_code, idGroupCustomer, params) => {
      dispatch(
        groupCustomerAction.fetchListCustomerByGroup(
          store_code,
          idGroupCustomer,
          params
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowCustomerByGroup);
