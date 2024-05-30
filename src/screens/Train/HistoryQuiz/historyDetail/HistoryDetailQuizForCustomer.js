import React, { Component } from "react";
import * as Types from "../../../../constants/ActionType";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import Footer from "../../../../components/Partials/Footer";
import ModalDelete from "../../../../components/Train/HistoryQuiz/Delete/Modal";
import Pagination from "../../../../components/Train/HistoryQuiz/HistoryDetail/Pagination";
import Table from "../../../../components/Train/HistoryQuiz/HistoryDetail/Table";
import Alert from "../../../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../../Loading";
import * as trainAction from "../../../../actions/train";
import NotAccess from "../../../../components/Partials/NotAccess";
import Select from "react-select";
import SidebarShowResultSubmitOfCustomer from "../../../../components/Train/HistoryQuiz/HistoryDetail/SidebarShowResultSubmitOfCustomer";

class HistoryDetailQuizForCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        name: "",
      },
      numPage: 20,
      searchValue: "",
      page: 1,
      showSidebar: false,
      courseSelected: [],
      historyInfo: {},
    };
  }

  setShowSidebar = (showSidebar) => {
    this.setState({ showSidebar });
  };

  setHistoryInfo = (historyInfo) => {
    this.setState({ historyInfo });
  };

  onChangeNumPage = (e) => {
    var { store_code, customerId } = this.props.match.params;
    var { searchValue, courseSelected } = this.state;
    var numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    var params = this.getParams(numPage, 1, searchValue, courseSelected);

    this.props.getDetailHistoryQuizzesForCustomer(
      store_code,
      customerId,
      params
    );
  };

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    var { searchValue, page, numPage, courseSelected } = this.state;
    var { store_code, customerId } = this.props.match.params;
    var params = this.getParams(numPage, page, searchValue, courseSelected);

    this.props.fetchAllCourseForFilter(store_code);
    this.props.getDetailHistoryQuizzesForCustomer(
      store_code,
      customerId,
      params
    );
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var isShow = permissions.train_exam_history;

      this.setState({
        isLoading: true,
        isShow,
      });
    }
  }
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code, customerId } = this.props.match.params;
    var { searchValue, numPage, courseSelected } = this.state;
    var params = this.getParams(numPage, 1, searchValue, courseSelected);
    this.setState({ page: 1 });
    this.props.getDetailHistoryQuizzesForCustomer(
      store_code,
      customerId,
      params
    );
  };

  handleChangeTrainCourse = (courseSelected) => {
    const { numPage, searchValue } = this.state;
    var { store_code, customerId } = this.props.match.params;
    const params = this.getParams(numPage, 1, searchValue, courseSelected);

    this.props.getDetailHistoryQuizzesForCustomer(
      store_code,
      customerId,
      params
    );
    this.setState({ courseSelected: courseSelected, page: 1 });
  };

  handleShowSidebarResult = (data) => {
    this.setState({
      showSidebar: true,
      historyInfo: data,
    });
  };

  setPage = (page) => {
    this.setState({ page });
  };

  convertOptions = (opts) => {
    if (opts?.length > 0) {
      const newOptions = opts.reduce(
        (prevOption, currentOption) => [
          ...prevOption,
          {
            value: currentOption.id,
            label: currentOption.title,
          },
        ],
        []
      );
      return newOptions;
    }
    return [];
  };

  getParams = (limit = 20, page = 1, searchValue, train_courses) => {
    let params = `limit=${limit}&page=${page}`;

    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    if (
      train_courses !== "" &&
      train_courses !== null &&
      train_courses?.length > 0
    ) {
      const newCourseIdsSelected = train_courses.reduce(
        (prevCourse, currentCourse, index) => {
          return (
            prevCourse +
            `${
              index === train_courses.length - 1
                ? currentCourse?.value
                : `${currentCourse?.value},`
            }`
          );
        },
        "&train_course_ids="
      );

      params += newCourseIdsSelected;
    }

    return params;
  };

  render() {
    var { store_code, customerId } = this.props.match.params;
    var { detailHistoryCustomerTrainQuiz, allCourseFilter } = this.props;
    var { numPage, searchValue, courseSelected, showSidebar, historyInfo } =
      this.state;
    var { isShow } = this.state;

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Chi tiết lịch sử lịch sử đào tạo
                      </h4>{" "}
                    </div>

                    <br></br>
                    <div className="card shadow ">
                      <div className="card-header">
                        <div
                          class="row"
                          style={{ "justify-content": "space-between" }}
                        >
                          <form onSubmit={this.searchData}>
                            <div
                              class="input-group mb-6"
                              style={{ padding: "0 20px" }}
                            >
                              <input
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                                type="search"
                                name="txtSearch"
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                class="form-control"
                                placeholder="Tìm theo tên bài..."
                              />
                              <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                          <div
                            style={{
                              marginRight: "20px",
                              width: "300px",
                            }}
                          >
                            <Select
                              options={this.convertOptions(allCourseFilter)}
                              placeholder={"Chọn khóa học đào tạo..."}
                              value={courseSelected}
                              onChange={this.handleChangeTrainCourse}
                              isMulti={true}
                              noOptionsMessage={() => "Không tìm thấy kết quả"}
                              style={{
                                width: "100%",
                              }}
                            ></Select>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <Table
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          handleShowSidebarResult={this.handleShowSidebarResult}
                          detailHistoryCustomerTrainQuiz={
                            detailHistoryCustomerTrainQuiz
                          }
                        />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                margin: "20px 10px auto auto",
                              }}
                            >
                              Hiển thị
                            </span>
                            <select
                              style={{
                                margin: "auto",
                                marginTop: "10px",
                                marginRight: "20px",
                                width: "70px",
                              }}
                              onChange={this.onChangeNumPage}
                              value={numPage}
                              name="numPage"
                              class="form-control"
                            >
                              <option value="10">10</option>
                              <option value="20" selected>
                                20
                              </option>
                              <option value="50">50</option>
                            </select>
                          </div>
                          <Pagination
                            limit={numPage}
                            searchValue={searchValue}
                            courseSelected={courseSelected}
                            setPage={this.setPage}
                            getParams={this.getParams}
                            store_code={store_code}
                            customerId={customerId}
                            detailHistoryCustomerTrainQuiz={
                              detailHistoryCustomerTrainQuiz
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <SidebarShowResultSubmitOfCustomer
              store_code={store_code}
              customerId={customerId}
              showSidebar={showSidebar}
              setShowSidebar={this.setShowSidebar}
              historyInfo={historyInfo}
              setHistoryInfo={this.setHistoryInfo}
            ></SidebarShowResultSubmitOfCustomer>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allCourseFilter: state.trainReducers.train.allCourseFilter,
    detailHistoryCustomerTrainQuiz:
      state.trainReducers.train.detailHistoryCustomerTrainQuiz,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getDetailHistoryQuizzesForCustomer: (store_code, customer_id, params) => {
      dispatch(
        trainAction.getDetailHistoryQuizzesForCustomer(
          store_code,
          customer_id,
          params
        )
      );
    },
    fetchAllCourseForFilter: (store_code) => {
      dispatch(trainAction.fetchAllCourseForFilter(store_code));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailQuizForCustomer);
