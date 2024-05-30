import React, { Component } from "react";
import { connect } from "react-redux";
import * as trainAction from "../../../../actions/train";
import themeData from "../../../../ultis/theme_data";

class Modal extends Component {
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var { id } = this.props.modal;
    var { store_code, quizId, courseId, quiz } = this.props;
    this.props.destroyQuestion(store_code, id, courseId, quizId, () => {
      if (quiz?.count_answer_right_complete === quiz?.questions?.length) {
        this.props.updateQuiz(
          quizId,
          {
            count_answer_right_complete: quiz?.count_answer_right_complete - 1,
          },
          store_code,
          null,
          null,
          courseId
        );
      }
    });
  };

  render() {
    var { modal } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="removeQuestionModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Thông báo</h4>{" "}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>
                Bạn có muốn xóa {modal.table} này không?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.trainReducers.train.quizID,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    destroyQuestion: (store_code, id, courseId, quizId, onSuccess) => {
      dispatch(
        trainAction.destroyQuestion(store_code, id, courseId, quizId, onSuccess)
      );
    },
    updateQuiz: (id, data, store_code, _this, resetModal, courseId) => {
      dispatch(
        trainAction.updateQuiz(
          id,
          data,
          store_code,
          _this,
          resetModal,
          courseId
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
