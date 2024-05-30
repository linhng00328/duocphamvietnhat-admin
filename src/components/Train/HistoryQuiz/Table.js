import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import history from "../../../history";
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

  showData = (allHistoryCustomerTrainQuizData, per_page, current_page) => {
    var { store_code, handleShowSidebarResult } = this.props;
    var result = null;
    if (allHistoryCustomerTrainQuizData.length > 0) {
      result = allHistoryCustomerTrainQuizData.map((data, index) => {
        return (
          <tr className="hover-product">
            <td>{per_page * (current_page - 1) + (index + 1)}</td>
            <td style={{ maxWidth: "200px" }}>{data.name}</td>
            <td>{data.phone_number}</td>
            <td>{data.count_quizzes_submit}</td>
            <td>{data.count_quizzes_submit_completed}</td>
            <td>{data.count_quizzes}</td>
            <td>
              <a
                className="btn btn-outline-info btn-sm"
                href={`/train/history/${store_code}/${data.id}`}
              >
                <i className="fa fa-bar-chart"></i> Xem Chi tiết
              </a>
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
    var { allHistoryCustomerTrainQuiz } = this.props;
    var per_page = allHistoryCustomerTrainQuiz.per_page;
    var current_page = allHistoryCustomerTrainQuiz.current_page;
    var allHistoryCustomerTrainQuizData =
      typeof allHistoryCustomerTrainQuiz.data == "undefined"
        ? []
        : allHistoryCustomerTrainQuiz.data;

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
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Số bài đã làm</th>
              <th>Số bài đã hoàn thành</th>
              <th>Số bài thi</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {this.showData(
              allHistoryCustomerTrainQuizData,
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
