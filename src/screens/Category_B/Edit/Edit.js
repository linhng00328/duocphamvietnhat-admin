import React, { Component } from "react";

import { connect } from "react-redux";
import Form from "../../../components/Category_B/Edit/Form";
import * as categoryBAction from "../../../actions/category_blog";
import * as Types from "../../../constants/ActionType";

import Alert from "../../../components/Partials/Alert";
class CategoryBEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAllCategoryB(store_code);
  }

  render() {
    var { categoryBId, store_code } = this.props;
    var { category_blog, history } = this.props;

    return (
      <div class="container-fluid">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa danh mục
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
                      categoryBId={categoryBId}
                      category_blog={category_blog}
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
    category_blog: state.categoryBReducers.categoryBlog.allCategoryB,
    auth: state.authReducers.login.authentication,
    alert: state.categoryBReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategoryB: (store_code) => {
      dispatch(categoryBAction.fetchAllCategoryB(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryBEdit);
