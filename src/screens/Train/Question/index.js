import React, { Component } from "react";

import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Form from "../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../actions/train";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";
import Item from "./Item";
import Alert from "../../../components/Partials/Alert";
import ModalCreate from "../../../components/Train/Question/Create/Form";
import ModalDelete from "../../../components/Train/Question/Delete/Modal";
import ModalUpdate from "../../../components/Train/Question/Edit/Form";

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {},
      modalupdate: {},
      count_answer_right_complete: 0,
    };
  }

  componentDidMount() {
    var { store_code, courseId, quizId } = this.props.match.params;

    this.props.fetchQuizId(store_code, courseId, quizId);
  }

  shouldComponentUpdate(nextProps) {
    if (!shallowEqual(nextProps.quiz, this.props.quiz)) {
      var { quiz } = { ...nextProps };

      this.setState({
        count_answer_right_complete: quiz.count_answer_right_complete,
      });
    }

    return true;
  }
  handleUpdateCallBack = (modal) => {
    console.log(modal);
    this.setState({ modalupdate: modal });
  };

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  onSave = (e) => {
    e.preventDefault();
    var { courseId, store_code, quizId } = this.props.match.params;
    const { updateQuiz, fetchQuizId } = this.props;
    const { count_answer_right_complete } = this.state;

    updateQuiz(
      quizId,
      {
        count_answer_right_complete: count_answer_right_complete,
      },
      store_code,
      null,
      () => {
        fetchQuizId(store_code, courseId, quizId);
      },
      courseId
    );
  };
  onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    var { quiz } = this.props;

    if (Number(value) > quiz.questions?.length) {
      value = quiz.questions?.length;
    }

    this.setState({ [name]: value });
  };

  render() {
    var { courseId, store_code, quizId } = this.props.match.params;
    var { course, history, quiz } = this.props;
    const { count_answer_right_complete } = this.state;

    var questions = quiz.questions ?? [];
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              <div class="container-fluid">
                <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Câu hỏi trắc nghiệm
                  </h4>
                  <button
                    data-toggle="modal"
                    data-target="#createQuestionModal"
                    class={`btn btn-info btn-icon-split btn-sm`}
                  >
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">Thêm câu hỏi</span>
                  </button>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <div>
                      <form
                        style={{
                          marginBottom: "15px",
                          display: "flex",
                          gap: "20px",
                        }}
                        onSubmit={this.onSave}
                      >
                        <div className="form-group">
                          <label
                            for="count_answer_right_complete"
                            style={{ marginBottom: 0 }}
                          >
                            Số câu hoàn thành
                          </label>
                          <small
                            style={{
                              color: "red",
                              display: "block",
                            }}
                          >
                            Số câu hoàn thành phải nhỏ hơn tổng số câu hỏi
                          </small>
                        </div>
                        <div>
                          <div class="input-group">
                            <input
                              type="number"
                              id="count_answer_right_complete"
                              name="count_answer_right_complete"
                              class="form-control"
                              placeholder="0"
                              min={0}
                              value={count_answer_right_complete}
                              style={{
                                maxWidth: "100px",
                              }}
                              max={quiz.questions?.length}
                              onChange={this.onChange}
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                Lưu
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div>
                      {questions.map((item, key) => (
                        <Item
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                          data={item}
                        ></Item>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
          <ModalCreate
            quizId={quizId}
            store_code={store_code}
            courseId={courseId}
          />
          <ModalDelete
            quizId={quizId}
            store_code={store_code}
            courseId={courseId}
            modal={this.state.modal}
          />
        </div>
        <ModalUpdate
          quizId={quizId}
          modal={this.state.modalupdate}
          store_code={store_code}
          courseId={courseId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.trainReducers.train.quizID,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchQuizId: (store_code, courseId, quizId) => {
      dispatch(trainAction.fetchQuizId(store_code, courseId, quizId));
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
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
