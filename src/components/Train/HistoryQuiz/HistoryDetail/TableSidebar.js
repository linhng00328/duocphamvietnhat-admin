import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../../ultis/default";
import history from "../../../../history";
import styled from "styled-components";
const TableStyles = styled.div`
  .count_submit_quizzes_hover {
    &:hover {
      text-decoration: underline;
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, store_code, name) => {
    this.props.handleDelCallBack({
      table: "khóa học",
      id: store_code,
      name: name,
    });
    event.preventDefault();
  };

  changePage = (store_code, id, e) => {
    if (e.target.name == "action" || e.target.tagName == "I") return;
    history.push(`/train/chapter/index/${store_code}/${id}`);
  };

  parseTime = (workTime) => {
    if (workTime > 0) {
      const hours = Math.floor(workTime / 3600);
      const minutes = Math.floor((workTime % 3600) / 60);
      const seconds = workTime % 60;

      return `${hours} giờ ${minutes} phút ${seconds} giây`;
    }

    return "0 giây";
  };

  showData = (allHistoryCustomerTryTrainQuizData, per_page, current_page) => {
    var { store_code } = this.props;
    var result = null;
    if (allHistoryCustomerTryTrainQuizData.length > 0) {
      result = allHistoryCustomerTryTrainQuizData.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td>{data.total_correct_answer}</td>
            <td>{data.total_questions}</td>
            <td>{this.parseTime(data.work_time)}</td>
            <td>{data.created_at}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { allHistoryCustomerTryTrainQuiz } = this.props;
    var per_page = allHistoryCustomerTryTrainQuiz.per_page;
    var current_page = allHistoryCustomerTryTrainQuiz.current_page;
    var allHistoryCustomerTryTrainQuizData =
      typeof allHistoryCustomerTryTrainQuiz.data == "undefined"
        ? []
        : allHistoryCustomerTryTrainQuiz.data;

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
              <th>Số câu trả lời đúng</th>
              <th>Số câu hỏi</th>
              <th>Thời gian làm</th>
              <th>Thời gian nộp</th>
            </tr>
          </thead>

          <tbody>
            {this.showData(
              allHistoryCustomerTryTrainQuizData,
              per_page,
              current_page
            )}
          </tbody>
        </table>
      </TableStyles>
    );
  }
}

export default Table;
