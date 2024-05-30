import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";

import Table from "../../../components/Train/Quiz/Table";
import Alert from "../../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../Loading";
import * as trainAction from "../../../actions/train";
import ModalCreate from "../../../components/Train/Quiz/Create/Form";
import ModalUpdate from "../../../components/Train/Quiz/Edit/Form";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        name: "",
      },
      numPage: 20,
      courseId: this.props?.courseId ?? null,
      modalupdate: {},
    };
  }

  onChangeNumPage = (e) => {
    var { store_code } = this.props;
    // var {searchValue} = this.state
    var numPage = e.target.value;
    this.setState({
      numPage,
    });
    var params = `&limit=${numPage}`;

    this.props.fetchAllQuiz(store_code, this.state.courseId, 1, params);
  };

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleUpdateCallBack = (modal) => {
    console.log(modal);
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    this.props.fetchAllQuiz(this.props.store_code, this.state.courseId);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.train_exam_list;
      var train_exam_add = permissions.train_exam_add;
      var train_exam_update = permissions.train_exam_update;
      var train_exam_delete = permissions.train_exam_delete;
      this.setState({
        isLoading: true,
        insert: train_exam_add,
        update: train_exam_update,
        _delete: train_exam_delete,
        isShow,
      });
    }
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.setState({ numPage: 20 });
    this.props.fetchAllQuiz(store_code, this.state.courseId, 1, params);
  };

  render() {
    var { store_code, courseId } = this.props;
    var { quizs } = this.props;
    var { numPage, searchValue } = this.state;
    var { insert, update, _delete, isShow } = this.state;
    console.log(quizs);
    return (
      <div className="">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <form onSubmit={this.searchData}>
            <div class="input-group mb-6">
              <input
                style={{ maxWidth: "400px", minWidth: "300px" }}
                type="search"
                name="txtSearch"
                value={searchValue}
                onChange={this.onChangeSearch}
                class="form-control"
                placeholder="Tìm kiếm..."
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          <button
            data-toggle="modal"
            data-target="#createQuizModal"
            style={{ marginTop: "auto" }}
            class={`btn btn-info btn-icon-split btn-sm ${
              insert == true ? "show" : "hide"
            }`}
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus"></i>
            </span>
            <span class="text">Thêm bài trắc nghiệm</span>
          </button>
        </div>

        <div className=" ">
          <div className="card-header">
            <div class="row" style={{ "justify-content": "space-between" }}>
              {/* <form onSubmit={this.searchData}>
                <div
                  class="input-group mb-6"
                >
                  <input
                    style={{ maxWidth: "400px", minWidth: "300px" }}
                    type="search"
                    name="txtSearch"
                    value={searchValue}
                    onChange={this.onChangeSearch}
                    class="form-control"
                    placeholder="Tìm theo chương học"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary"
                      type="submit"

                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>

                </div>
                {/* <p class="total-item" id="sale_user_name">
                  <span className="num-total_item" >{products.total}&nbsp;</span><span className="text-total_item" id="user_name">sản phẩm</span>
                </p> */}
              {/* </form> */}
            </div>
          </div>

          <div className="">
            <Table
              handleUpdateCallBack={this.handleUpdateCallBack}
              courseId={courseId}
              update={update}
              _delete={_delete}
              store_code={store_code}
              handleDelCallBack={this.handleDelCallBack}
              quizs={quizs}
            />
          </div>
        </div>
        <ModalCreate store_code={store_code} courseId={courseId} />
        <ModalUpdate
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
    quizs: state.trainReducers.train.allQuiz,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllQuiz: (id, courseId, page, params) => {
      dispatch(trainAction.fetchAllQuiz(id, courseId, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
