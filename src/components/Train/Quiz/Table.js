import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as trainAction from "../../../actions/train";

import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import Item from "./Item";
import ModalCreate from "../Lesson/Create/Form";
import ModalUpdate from "../Lesson/Edit/Form";
import ModalDelete from "./Delete/Modal";
import SortableList, { SortableItem } from "react-easy-sort";
import "./style.css";
import arrayMove from "array-move";
import history from "../../../history";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterId: null,
      modalupdate: {},
      modal: {},
    };
  }

  handleDelLessonCallBack = (id, title, table, train_course_id) => {
    this.setState({
      modal: {
        id: id,
        title: title,
        table: table,
        train_course_id: train_course_id,
      },
    });
  };

  passEditFunc = (
    e,
    id,
    title,
    short_description,
    auto_change_order_questions,
    auto_change_order_answer,
    minute
  ) => {
    this.props.handleUpdateCallBack({
      id: id,
      title: title,
      short_description: short_description,
      auto_change_order_questions,
      auto_change_order_answer,
      minute,
    });
    e.preventDefault();
  };

  passChapterId = (chapterId) => {
    this.setState({ chapterId });
  };

  changePage = (store_code, id, e) => {
    var { courseId } = this.props;
    if (e.target.name == "action") return;
    history.push(`/train/quiz/question/${store_code}/${courseId}/${id}`);
  };

  showData = (courses) => {
    var { store_code } = this.props;
    var { courseId } = this.props;

    var result = null;
    if (courses.length > 0) {
      var { update, _delete } = this.props;

      result = courses.map((data, index) => {
        var image_url =
          data.image_url == null || data.image_url == ""
            ? Env.IMG_NOT_FOUND
            : data.image_url;
        var show = data.show == true ? "Đang hiển thị" : "Tạm ẩn";
        var showStatus = data.show == true ? "success" : "secondary";
        return (
          <tr
            className="hover-product"
            onClick={(e) => this.changePage(store_code, data.id, e)}
          >
            <td>{index + 1}</td>

            <td style={{ maxWidth: "200px" }}>{data.title}</td>
            <td>{data.minute ?? 0} phút</td>

            <td style={{ maxWidth: "250px" }}>
              {data.short_description?.length > 120
                ? data.short_description?.slice(0, 120) + "..."
                : data.short_description}
            </td>
            <td>
              {" "}
              <h5>
                <span class={`badge badge-${showStatus}`}>{show}</span>
              </h5>
            </td>

            <td className="three-btn-group" style={{ maxWidth: "150px" }}>
              {/* <Link
                to={`/train/chapter/index/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Xem chương - bài học
              </Link> */}
              <button
                name="action"
                onClick={(e) =>
                  this.passEditFunc(
                    e,
                    data.id,
                    data.title,

                    data.short_description,
                    data.auto_change_order_questions,
                    data.auto_change_order_answer,
                    data.minute
                  )
                }
                data-toggle="modal"
                data-target="#updateQuizModal"
                class={`btn btn-warning btn-sm ${
                  update == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-edit"></i> Sửa
              </button>
              <button
                name="action"
                onClick={(e) =>
                  this.handleDelLessonCallBack(
                    data.id,
                    data.title,
                    "bài trắc nghiệm",
                    data.train_course_id
                  )
                }
                data-toggle="modal"
                data-target="#removeModalQuiz"
                class={`btn btn-danger btn-sm ${
                  _delete == true ? "show" : "hide"
                }`}
              >
                <i class="fa fa-trash"></i> Xóa
              </button>

              <Link
                to={`/train/quiz/question/${store_code}/${courseId}/${data.id}`}
                class={`btn btn-success btn-sm`}
              >
                <i class="fa fa-plus"></i> Tạo bài thi
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  // showData = (quizs) => {
  //   var { store_code , courseId } = this.props
  //   var result = null;
  //   if (quizs.length > 0) {
  //     var { update, _delete } = this.props

  //     result = quizs.map((data, index) => {

  //       return (
  //      <Item store_code = {store_code} courseId = {courseId} handleDelLessonCallBack = {this.handleDelLessonCallBack}  handleUpdateLessonCallBack = {this.handleUpdateLessonCallBack} passChapterId = {this.passChapterId} index = {index+1} data = {data} handleDelCallBack = {this.props.handleDelCallBack} handleUpdateCallBack = {this.props.handleUpdateCallBack} ></Item>
  //       );
  //     });
  //   } else {
  //     return result;
  //   }
  //   return result;
  // };

  render() {
    var { quizs, store_code, courseId } = this.props;
    var { chapterId, modalupdate } = this.state;

    return (
      <>
        <div class="table-responsive">
          <table
            class="table table-border "
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Thời gian thi</th>

                <th>Mô tả ngắn</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>{this.showData(quizs)}</tbody>
          </table>
        </div>

        <ModalDelete
          courseId={courseId}
          store_code={store_code}
          modal={this.state.modal}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    sortChapter: (store_code, data, train_course_id) => {
      dispatch(trainAction.sortChapter(store_code, data, train_course_id));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
