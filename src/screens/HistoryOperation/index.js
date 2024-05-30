import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect } from "react-router-dom";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import * as historyOperationAction from "../../actions/history_operation";

import NotAccess from "../../components/Partials/NotAccess";

import styled from "styled-components";
import Table from "../../components/HistoryOperation/Table";
import Pagination from "../../components/HistoryOperation/Pagination";

const HistoryOperationStyles = styled.div`
  .filter-search-customer {
    position: relative;
    padding: 0.375rem 0.75rem;
    border-radius: 0.35rem;
    border: 1px solid #d1d3e2;
    border-right-color: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    align-items: center;
    column-gap: 5px;
    font-size: 15px;
    &:hover .filter-search-customer-dropdown {
      opacity: 1;
      visibility: visible;
    }
    span:last-of-type {
      margin-left: 5px;
      i {
        margin-top: -5px;
      }
    }
    .filter-search-customer-count {
      font-size: 14px;
    }
    .filter-search-customer-dropdown {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      top: calc(100% + 10px);
      left: 0;
      width: max-content;
      border-radius: 6px;
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
      color: #2d3436;
      background-color: white;
      padding: 0.375rem 0.75rem;
      font-size: 14px;
      width: 450px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      &::before {
        content: "";
        position: absolute;
        z-index: 20;
        top: -7px;
        left: 10%;
        width: 16px;
        background-color: white;
        transform: rotate(45deg);
        height: 16px;
        border-radius: 2px;
        border: 1px solid transparent;
        border-left-color: rgb(218, 218, 225);
        border-top-color: rgb(218, 218, 225);
      }
      p {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      .filter-search-customer-dropdown-btnFilter {
        margin: 10px 0;
        display: block;
        width: 100%;
        button {
          padding: 0.375rem 0.75rem;
          border-radius: 0.35rem;
        }
      }
      .filter-search-customer-dropdown-item {
        display: inline-block;
        padding: 6px 12px;
        border: 1px solid #d1d3e2;
        overflow: hidden;
        border-radius: 6px;
        .filter-search-customer-dropdown-item-btnDelete {
          cursor: pointer;
        }
      }
    }
  }
  .btn-filter-search {
    color: white;
    margin-left: 20px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.35rem;
    cursor: pointer;
  }
  tr {
    .total_referral {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .totalContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
class HistoryOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        page: 1,
        function_type: "",
        action_type: "",
        staff_id: "",
      },
      searchInput: "",
    };
  }

  setParams = (name, value) => {
    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      },
    });
  };
  handleChangeSearchInput = (e) => {
    const value = e.target.value;
    this.setState({ searchInput: value });
  };
  handleSearchHistoryOperation = (e) => {
    e.preventDefault();

    const { params, searchInput } = this.state;
    const paramsFilter = `page=${params.page}&search=${searchInput}&function_type=${params.function_type}&action_type=${params.action_type}&staff_id=${params.staff_id}`;
    this.handleFetchHistoryOperation(paramsFilter);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var isShow = permissions.history_operation;

      this.setState({ isLoading: true, isShow });
    }
  }

  componentDidMount() {
    const { params, searchInput } = this.state;
    const paramsFilter = `page=${params.page}&search=${searchInput}&function_type=${params.function_type}&action_type=${params.action_type}&staff_id=${params.staff_id}`;
    this.handleFetchHistoryOperation(paramsFilter);
  }
  handleFetchHistoryOperation = (params) => {
    this.props.fetchHistoryOperation(
      this.props.match.params.store_code,
      params
    );
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { params, searchInput } = this.state;
    if (!shallowEqual(params, nextState.params)) {
      const paramsFilter = `page=${nextState.params.page}&search=${searchInput}&function_type=${nextState.params.function_type}&action_type=${nextState.params.action_type}&staff_id=${nextState.params.staff_id}`;
      this.handleFetchHistoryOperation(paramsFilter);
    }
    return true;
  }

  render() {
    const { store_code } = this.props.match.params;
    const { isShow, params, searchInput } = this.state;
    const { historyOperation } = this.props;
    const { data } = historyOperation;

    if (this.props.auth) {
      return (
        <HistoryOperationStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Lịch sử thao tác
                      </h4>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <form onSubmit={this.handleSearchHistoryOperation}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchInput}
                              onChange={this.handleChangeSearchInput}
                              class="form-control"
                              placeholder="Tìm kiếm"
                            />
                            <div class="input-group-append">
                              <button
                                class="btn btn-primary"
                                type="submit"
                                style={{
                                  borderTopRightRadius: "0.375rem",
                                  borderBottomRightRadius: "0.375rem",
                                }}
                              >
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-body">
                        <Table
                          store_code={store_code}
                          histories={data}
                          setParams={this.setParams}
                          params={params}
                          per_page={historyOperation.per_page}
                          current_page={historyOperation.current_page}
                        />

                        <Pagination
                          setParams={this.setParams}
                          store_code={store_code}
                          historyOperation={historyOperation}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
          </div>
        </HistoryOperationStyles>
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
    historyOperation:
      state.historyOperationReducers.history_operation.historyOperation,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHistoryOperation: (store_code, params) => {
      dispatch(
        historyOperationAction.fetchHistoryOperation(store_code, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryOperation);
