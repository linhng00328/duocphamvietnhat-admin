import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as trainAction from "../../../actions/train";

import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"
import Item from "./Item"
import ModalCreate from "../../../components/Train/Lesson/Create/Form";
import ModalUpdate from "../../../components/Train/Lesson/Edit/Form";
import ModalPlay from "./ModalPlay";

import ModalDelete from "../../../components/Train/Lesson/Delete/Modal";
import SortableList, { SortableItem } from "react-easy-sort";
import "./style.css";
import arrayMove from "array-move";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterId: null,
      modalupdate: {},
      modal: {},
      id_video: null

    }
  }


  handleUpdateLessonCallBack = (modal) => {
    this.setState({
      modalupdate: modal
    });
  }

  handleDelLessonCallBack = (modal) => {
    this.setState({ modal });
  }


  passChapterId = (chapterId) => {
    this.setState({ chapterId })
  }



  onSortEnd = (oldIndex, newIndex) => {
    var listArr = arrayMove(this.props.lessons, oldIndex, newIndex);
    var listId = [];
    listArr.forEach((element, index) => {
      listId.push({ id: element.id, position: index + 1 });

    });
    var { courseId } = this.props

    this.props.sortChapter(this.props.store_code, { list_sort: listId }, courseId);

  };

  passUrlVideo = (id_video) => {
    this.setState({ id_video })
  }


  showData = (lessons) => {
    var { store_code, courseId } = this.props
    var result = null;
    if (lessons.length > 0) {
      var { update, _delete } = this.props

      result = lessons.map((data, index) => {

        return (
          <Item passUrlVideo  = {this.passUrlVideo } store_code={store_code} courseId={courseId} handleDelLessonCallBack={this.handleDelLessonCallBack} handleUpdateLessonCallBack={this.handleUpdateLessonCallBack} passChapterId={this.passChapterId} index={index + 1} data={data} handleDelCallBack={this.props.handleDelCallBack} handleUpdateCallBack={this.props.handleUpdateCallBack} ></Item>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { lessons, store_code, courseId } = this.props
    var { chapterId, modalupdate , id_video} = this.state


    return (
      <>
        <div id="resp-table">

          <div className="resp-table-body" style = {{background: "#eeeded"}}>
          <div  class="table-body-cell">
            </div>
            <div style={{ fontWeight: "500" }} class="table-body-cell">
              Tên chương
            </div>
            <div style={{ fontWeight: "500" }} class="table-body-cell">
              Mô tả ngắn      </div>

            <div style={{ fontWeight: "500" }} class="table-body-cell">
              Hành động
            </div>
          </div>
          <SortableList
            onSortEnd={this.onSortEnd}
            className="resp-table-body"
            draggedItemClassName="dragged"
          >
            {this.showData(lessons)}
          </SortableList>

        </div>
        <ModalPlay
              id_video = {id_video}
            />
        <ModalCreate
          store_code={store_code}
          chapterId={chapterId}
          courseId={courseId}
        />
        <ModalUpdate
          modal={modalupdate}
          store_code={store_code}
          courseId={courseId}

        />

        <ModalDelete courseId={courseId} store_code={store_code} modal={this.state.modal} />
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