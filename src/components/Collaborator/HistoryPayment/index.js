import React, { Component } from "react";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import Table from "./Table";
import { shallowEqual } from "../../../ultis/shallowEqual";

class RequestPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      historyPayment: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.historyPayment, nextProps.historyPayment)) {
      this.setState({ historyPayment: nextProps.historyPayment });
    }
  }
  componentDidMount() {
    this.props.fetchAllHistory(this.props.store_code);
  }
  getParams = (searchValue) => {
    var params = ``;

    if (searchValue != "" && searchValue != null) {
      params = params + `?search=${searchValue}`;
    }

    return params;
  };
  searchData = (e) => {
    e.preventDefault();
    var { searchValue } = this.state;
    var { historyPayment } = this.props;
    var params = this.getParams(searchValue);
    var newArr = [];
    if (historyPayment?.length > 0) {
      for (const item of historyPayment) {
        console.log(
          item.collaborator.customer.name,
          item.collaborator.customer.name?.includes(searchValue)
        );

        if (
          item.collaborator.customer.name?.includes(searchValue) ||
          item.collaborator.account_number?.includes(searchValue)
        ) {
          newArr.push(item);
        }
      }
    }
    this.setState({ historyPayment: newArr });
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  render() {
    var { store_code, tabId } = this.props;
    var { searchValue, historyPayment } = this.state;
    console.log(historyPayment);
    return (
      <div id="">
        <div class="row" style={{ "justify-content": "space-between" }}>
          <form onSubmit={this.searchData}>
            <div class="input-group mb-6" style={{ padding: "7px 20px" }}>
              <input
                style={{ maxWidth: "400px", minWidth: "300px" }}
                type="search"
                name="txtSearch"
                value={searchValue}
                onChange={this.onChangeSearch}
                class="form-control"
                placeholder="Tìm theo tên hoặc STK"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-body">
          <Table
            tabId={tabId}
            store_code={store_code}
            historyPayment={historyPayment}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyPayment: state.collaboratorReducers.collaborator.allHistoryPayment,
    auth: state.authReducers.login.authentication,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllHistory: (store_code, page, params) => {
      dispatch(collaboratorAction.fetchAllHistory(store_code, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestPayment);
