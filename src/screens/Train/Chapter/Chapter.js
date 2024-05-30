import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import ModalDelete from "../../../components/Train/Chapter/Delete/Modal";
import Pagination from "../../../components/Train/Chapter/Pagination";
import Table from "../../../components/Train/Chapter/Table";
import Alert from "../../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../Loading";
import * as trainAction from "../../../actions/train";
import NotAccess from "../../../components/Partials/NotAccess";
import ModalCreate from "../../../components/Train/Chapter/Create/Form";
import ModalUpdate from "../../../components/Train/Chapter/Edit/Form";

class Lesson extends Component {
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
      modalupdate: {}

    };
  }

  onChangeNumPage = (e) => {
    var { store_code } = this.props;
    // var {searchValue} = this.state
    var numPage = e.target.value
    this.setState({
      numPage
    })
    var params = `&limit=${numPage}`

    this.props.fetchAllLesson(store_code, this.state.courseId, 1, params);
  }


  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleUpdateCallBack = (modal) => {
    console.log(modal)
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    this.props.fetchAllLesson(this.props.store_code, this.state.courseId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
      var permissions = nextProps.permission
      // var insert = permissions.post_add
      // var update = permissions.post_update
      // var _delete = permissions.post_remove_hide
      var isShow = permissions.post_list
      this.setState({ isLoading: true, insert: true, update: true, _delete: true, isShow })
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
    this.props.fetchAllLesson(store_code, this.state.courseId, 1, params);
  };

  render() {
    var { store_code, courseId } = this.props
    var { lessons } = this.props
    var { numPage, searchValue } = this.state
    var { insert, update, _delete, isShow } = this.state
    console.log(lessons)
    return (
      <div className="">


        <Alert
          type={Types.ALERT_UID_STATUS}
          alert={this.props.alert}
        />
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <form onSubmit={this.searchData}>
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
          
          </form>
          <button data-toggle="modal" style = {{marginTop : "auto"}}
            data-target="#createModal"
            class={`btn btn-info btn-icon-split btn-sm ${insert == true ? "show" : "hide"}`}
          >
            <span class="icon text-white-50">
              <i class="fas fa-plus"></i>
            </span>
            <span class="text">Thêm chương học</span>
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
          <Table handleUpdateCallBack={this.handleUpdateCallBack}
            courseId={courseId}
            update={update} _delete={_delete} store_code={store_code} handleDelCallBack={this.handleDelCallBack} lessons={lessons} />


        </div>
      </div>
      <ModalCreate
              store_code={store_code}
              courseId={courseId}
            />
                 <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />
            <ModalDelete store_code={store_code} modal={this.state.modal} />

      </div >

      );

  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.trainReducers.train.allLesson,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllLesson: (id, courseId, page, params) => {
      dispatch(trainAction.fetchAllLesson(id, courseId, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
