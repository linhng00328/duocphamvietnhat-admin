import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Blog/Edit/Form";
import * as blogAction from "../../../actions/blog";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";

import Alert from "../../../components/Partials/Alert";
class BlogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { store_code, blogId } = this.props;
    this.props.fetchAllCategoryB(this.props.store_code);

    const res = this.props.fetchBlogId(store_code, blogId);
  }

  render() {
    var { blogId, store_code } = this.props;
    var { blog, history, categories } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                    <Form
                      history={history}
                      blogId={blogId}
                      store_code={store_code}
                    />
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
    categories: state.categoryBReducers.categoryBlog.allCategoryB,
    blog: state.blogReducers.blog.blogID,
    auth: state.authReducers.login.authentication,
    alert: state.blogReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBlogId: (store_code, blogId) => {
      dispatch(blogAction.fetchBlogId(store_code, blogId));
    },
    fetchAllCategoryB: (id) => {
      dispatch(categoryBAction.fetchAllCategoryB(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogEdit);
