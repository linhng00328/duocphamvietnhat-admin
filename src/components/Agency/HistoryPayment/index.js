import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import { removeAscent } from "../../../ultis/helpers";
import Table from "./Table";

class HistoryPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      historyPayment: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllHistory(this.props.store_code);
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.historyPayment, nextProps.historyPayment)) {
      this.setState({ historyPayment: nextProps.historyPayment });
    }
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
        const itemSearch =
          item.agency?.customer?.name?.toString()?.trim().toLowerCase() || "";
        const itemAccountNumber = item.agency?.account_number
          ?.toString()
          ?.trim()
          .toLowerCase();
        const valueSearch = searchValue?.toString()?.trim().toLowerCase();

        if (
          removeAscent(itemSearch)?.includes(removeAscent(valueSearch)) ||
          removeAscent(itemAccountNumber)?.includes(removeAscent(valueSearch))
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
    historyPayment: state.agencyReducers.agency.allHistoryPayment,
    auth: state.authReducers.login.authentication,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllHistory: (store_code) => {
      dispatch(agencyAction.fetchAllHistory(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryPayment);
