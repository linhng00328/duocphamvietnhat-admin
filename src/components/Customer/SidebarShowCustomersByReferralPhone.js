import { Component } from "react";
import styled from "styled-components";
import SidebarFilter from "../Partials/SidebarFilter";

const SidebarShowCustomersByReferralPhoneStyles = styled.div``;

class SidebarShowCustomersByReferralPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      store_code,
      fetchAllCustomerByInferralPhone,
      customerInfo,
      pageReferralPhone,
    } = this.props;

    if (
      Object.entries(nextProps.customerInfo).length > 0 &&
      (customerInfo.phone_number !== nextProps.customerInfo.phone_number ||
        pageReferralPhone !== nextProps.pageReferralPhone)
    ) {
      fetchAllCustomerByInferralPhone(
        store_code,
        nextProps.pageReferralPhone,
        null,
        nextProps.customerInfo.phone_number
      );
    }
    return true;
  }
  render() {
    const { customerInfo, children } = this.props;
    return (
      <SidebarFilter
        title={`Những người giới thiệu bởi ${customerInfo.name}`}
        widthSideBar="70%"
        showSidebar={this.props.showCustomersByReferralPhone}
        setShowSidebar={this.props.setShowCustomersByReferralPhone}
      >
        <SidebarShowCustomersByReferralPhoneStyles>
          {children}
        </SidebarShowCustomersByReferralPhoneStyles>
      </SidebarFilter>
    );
  }
}

export default SidebarShowCustomersByReferralPhone;
