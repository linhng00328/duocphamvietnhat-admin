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

  showData = (detailHistoryCustomerTrainQuizData, per_page, current_page) => {
    var { store_code, handleShowSidebarResult } = this.props;
    var result = null;
    if (detailHistoryCustomerTrainQuizData.length > 0) {
      result = detailHistoryCustomerTrainQuizData.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td style={{ maxWidth: "200px" }}>{data.title}</td>
            <td
              className="primary count_submit_quizzes_hover"
              onClick={() => handleShowSidebarResult(data)}
            >
              {data.last_submit_quizzes ? data.last_submit_quizzes?.length : 0}
            </td>
            <td>{data.total_correct_answer_max}</td>
            <td>{data.count_answer_right_complete}</td>
            <td>{data.minute} phút</td>
            <td
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {data.is_completed ? (
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "1px solid green",
                    color: "green",
                  }}
                >
                  Hoàn thành
                </span>
              ) : (
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "1px solid red",
                    color: "red",
                  }}
                >
                  Chưa hoàn thành
                </span>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { detailHistoryCustomerTrainQuiz } = this.props;
    console.log(
      "🚀 ~ file: Table.js:91 ~ Table ~ render ~ detailHistoryCustomerTrainQuiz:",
      detailHistoryCustomerTrainQuiz
    );
    var per_page = detailHistoryCustomerTrainQuiz.per_page;
    var current_page = detailHistoryCustomerTrainQuiz.current_page;
    var detailHistoryCustomerTrainQuizData =
      typeof detailHistoryCustomerTrainQuiz.data == "undefined"
        ? []
        : detailHistoryCustomerTrainQuiz.data;

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
              <th>Tên bài</th>
              <th>Số lần thi</th>
              <th>Số câu đúng nhiều nhất</th>
              <th>Số câu hoàn thành</th>
              <th>Thời gian giới hạn thi</th>
              <th>Trạng thái thi</th>
            </tr>
          </thead>

          <tbody>
            {this.showData(
              detailHistoryCustomerTrainQuizData,
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
