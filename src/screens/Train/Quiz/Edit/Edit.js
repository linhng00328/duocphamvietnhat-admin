import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../../components/Train/Course/Edit/Form";
import * as trainAction from "../../../../actions/train";
import * as categoryBAction from "../../../../actions/category_blog";
import * as Types from "../../../../constants/ActionType";

import Alert from "../../../../components/Partials/Alert";
class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var {store_code , courseId } = this.props;

    this.props.fetchCourseId(store_code , courseId);

  }


  render() {
    var { courseId, store_code } = this.props;
    var { course, history } = this.props
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
                    Chỉnh sửa bài viết
                  </h4>
                </div>
                <br></br>
                <div class="card shadow mb-4">
                  <div class="card-body">
                    <section class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div id="messages"></div>

                          <div class="box">
                            <Form history={history} courseId={courseId} course={course} store_code={store_code} />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
        

      );
 
  }
}

const mapStateToProps = (state) => {
  return {
    course: state.trainReducers.train.courseID,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCourseId: (store_code , courseId) => {
      dispatch(trainAction.fetchCourseId(store_code , courseId));
    },
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);
