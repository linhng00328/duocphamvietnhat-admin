import { Component } from "react";
import { connect } from "react-redux";
import SidebarFilter from "../../Partials/SidebarFilter";
import * as customerAction from "../../../actions/customer";
import Table from "./ModalListReferences/Table";
import Pagination from "./ModalListReferences/Pagination";
import styled from "styled-components";

const SidebarListReferencesStyles = styled.div`
  .totalContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .empty-customers-list {
    text-align: center;
  }
`;

class SidebarListReferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { store_code, customerInfo, fetchAllCustomerByInferralPhone } =
      this.props;
    const { page } = this.state;
    if (
      Object.entries(nextProps.customerInfo).length > 0 &&
      (customerInfo.phone_number !== nextProps.customerInfo.phone_number ||
        page !== nextState.page)
    ) {
      fetchAllCustomerByInferralPhone(
        store_code,
        nextState.page,
        null,
        nextProps.customerInfo.phone_number
      );
    }
    return true;
  }
  setPage = (page) => {
    this.setState({
      page,
    });
  };
  render() {
    const {
      customerInfo,
      customersByInferralPhone,
      store_code,
      setCustomerInfo,
    } = this.props;

    return (
      <SidebarFilter
        title={`Những người giới thiệu bởi ${customerInfo.name}`}
        widthSideBar="70%"
        showSidebar={this.props.showSidebarListReferences}
        setShowSidebar={this.props.setShowSidebarListReferences}
      >
        <SidebarListReferencesStyles>
          {customersByInferralPhone?.data?.length > 0 ? (
            <>
              <Table
                customers={customersByInferralPhone}
                setCustomerInfo={setCustomerInfo}
              />

              <div class="modal-footer">
                <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="totalContent">
                    <div className="totalCustomers">
                      Hiển thị 1{" "}
                      {customersByInferralPhone.data.length > 1
                        ? `đến ${customersByInferralPhone.data.length}`
                        : null}{" "}
                      trong số {customersByInferralPhone.total} khách hàng
                    </div>
                    <Pagination
                      store_code={store_code}
                      customers={customersByInferralPhone}
                      setPage={this.setPage}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-customers-list">
              Chưa có khách hàng giới thiệu!
            </div>
          )}
        </SidebarListReferencesStyles>
      </SidebarFilter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customersByInferralPhone:
      state.customerReducers.customer.allCustomerByInferralPhone,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerByInferralPhone: (
      store_code,
      page,
      params,
      referral_phone_number
    ) => {
      dispatch(
        customerAction.fetchAllCustomerByInferralPhone(
          store_code,
          page,
          params,
          referral_phone_number
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarListReferences);
