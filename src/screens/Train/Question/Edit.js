import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../../actions/train";
import * as categoryBAction from "../../../../actions/category_blog";
import * as Types from "../../../../constants/ActionType";
import Item from "./Item"
import Alert from "../../../../components/Partials/Alert";
class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var {store_code , courseId , quizId } = this.props;

    this.props.fetchQuizId(store_code , courseId , quizId);

  }


  render() {
    var { courseId, store_code , quiz } = this.props;
    var { course, history } = this.props
    var questions = quiz.questions ?? []
      return (
      

              <div class="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className="h4 title_content mb-0 text-gray-800">
                    Trắc nghiệm
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                      {
                        questions.map((item,key)=>(
                          <Item data = {item}></Item>
                        ))
                      }
                  </div>
                </div>
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
    fetchQuizId: (store_code , courseId , quizId) => {
      dispatch(trainAction.fetchQuizId(store_code , courseId,quizId));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
