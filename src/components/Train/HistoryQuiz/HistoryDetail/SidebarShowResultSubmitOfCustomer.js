import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import SidebarFilter from "../../../Partials/SidebarFilter";
import * as trainAction from "../../../../actions/train";
import Table from "./TableSidebar";
import Pagination from "./PaginationSidebar";
import moment from "moment";
import DateRangePickerCustom from "../../../DatePicker/DateRangePickerCustom";

const SidebarShowResultSubmitOfCustomerStyles = styled.div`
  .totalContent {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class SidebarShowResultSubmitOfCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_from: "",
      date_to: "",
      page: 1,
      limit: 10,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      historyInfo,
      getDetailQuizHistoryForCustomer,
      store_code,
      customerId,
    } = this.props;

    const { limit } = this.state;

    if (
      !shallowEqual(historyInfo, nextProps.historyInfo) &&
      nextProps.historyInfo?.id
    ) {
      const params = `page=${nextState.page}&limit=${limit}`;
      getDetailQuizHistoryForCustomer(
        store_code,
        customerId,
        nextProps?.historyInfo?.id,
        params
      );
    }

    return true;
  }

  setPage = (page) => {
    this.setState({ page });
  };
  handleShowSidebar = (show) => {
    const { setShowSidebar, setHistoryInfo } = this.props;
    setShowSidebar(show);
    setHistoryInfo({});
    this.setPage(1);
  };
  render() {
    const {
      historyInfo,
      showSidebar,
      store_code,
      allHistoryCustomerTryTrainQuiz,
      getDetailQuizHistoryForCustomer,
      customerId,
    } = this.props;
    console.log(
      "🚀 ~ allHistoryCustomerTryTrainQuiz:",
      allHistoryCustomerTryTrainQuiz
    );
    const { page, limit } = this.state;
    return (
      <SidebarFilter
        title={`Bài thi: ${historyInfo?.title}`}
        widthSideBar="70%"
        showSidebar={showSidebar}
        setShowSidebar={this.handleShowSidebar}
      >
        <SidebarShowResultSubmitOfCustomerStyles>
          {allHistoryCustomerTryTrainQuiz?.data?.length > 0 && (
            <div
              style={{
                fontSize: "14px",
              }}
            >
              <Table
                store_code={store_code}
                allHistoryCustomerTryTrainQuiz={allHistoryCustomerTryTrainQuiz}
                page={page}
              />
              <div className="totalContent">
                <div className="totalCustomers">
                  Hiển thị{" "}
                  {(allHistoryCustomerTryTrainQuiz.current_page - 1) * 20 + 1}{" "}
                  {allHistoryCustomerTryTrainQuiz.data.length > 1
                    ? `đến ${
                        (allHistoryCustomerTryTrainQuiz.current_page - 1) * 20 +
                        allHistoryCustomerTryTrainQuiz.data.length
                      }`
                    : null}{" "}
                  trong số {allHistoryCustomerTryTrainQuiz.total} lần thi
                </div>
                <Pagination
                  setPage={this.setPage}
                  store_code={store_code}
                  customerId={customerId}
                  limit={limit}
                  allHistoryCustomerTryTrainQuiz={
                    allHistoryCustomerTryTrainQuiz
                  }
                  historyInfo={historyInfo}
                  getDetailQuizHistoryForCustomer={
                    getDetailQuizHistoryForCustomer
                  }
                />
              </div>
            </div>
          )}
        </SidebarShowResultSubmitOfCustomerStyles>
      </SidebarFilter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allHistoryCustomerTryTrainQuiz:
      state.trainReducers.train.allHistoryCustomerTryTrainQuiz,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getDetailQuizHistoryForCustomer: (
      store_code,
      customer_id,
      quiz_id,
      params
    ) => {
      dispatch(
        trainAction.getDetailQuizHistoryForCustomer(
          store_code,
          customer_id,
          quiz_id,
          params
        )
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarShowResultSubmitOfCustomer);
