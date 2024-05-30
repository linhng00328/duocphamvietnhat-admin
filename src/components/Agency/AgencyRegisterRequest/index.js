import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import Chat from "../../Chat";
import * as Env from "../../../ultis/default";
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import { getQueryParams, insertParam } from "../../../ultis/helpers";

class ListAgencyRegisterRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      numPage: getQueryParams("limit") || 20,
      statusRequest: null,
    };
  }

  componentDidMount() {
    const { page, searchValue, numPage, statusRequest } = this.state;
    const params = this.getParams(searchValue, numPage, statusRequest);
    this.props.fetchAllAgencyRegisterRequests(
      this.props.store_code,
      page,
      params
    );
  }

  exportListCollaboratorRegisterRequest = () => {
    var { searchValue, page, numPage } = this.state;
    var params = this.getParams(searchValue, numPage);
    this.props.exportListCollaboratorRegisterRequest(
      this.props.store_code,
      page,
      params
    );
  };
  getParams = (searchValue, limit = 20, statusRequest = "") => {
    var params = ``;

    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    params += `&limit=${limit}&status=${statusRequest ?? ""}`;

    return params;
  };
  setPage = (page) => {
    this.setState({ page });
  };

  searchData = (e) => {
    e.preventDefault();
    var { searchValue, numPage, statusRequest } = this.state;
    var params = this.getParams(searchValue, numPage, statusRequest);
    this.setPage(1);
    insertParam({ search: searchValue });
    const page = getQueryParams("page");
    if (page) {
      insertParam({ page: 1 });
    }
    this.props.fetchAllAgencyRegisterRequests(
      this.props.store_code,
      1,
      params,
      searchValue
    );
  };
  onChangeNumPage = (e) => {
    const { store_code, fetchAllAgencyRegisterRequests } = this.props;
    var { searchValue, statusRequest } = this.state;
    const numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    var params = this.getParams(searchValue, numPage, statusRequest);
    insertParam({ page: 1, limit: numPage });
    fetchAllAgencyRegisterRequests(store_code, 1, params);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onChangeStatus = (e) => {
    this.setState({ statusRequest: e.target.value });

    var { searchValue, numPage } = this.state;
    var params = this.getParams(searchValue, numPage, e.target.value);

    this.props.fetchAllAgencyRegisterRequests(
      this.props.store_code,
      1,
      params,
      e.target.value
    );
  };
  render() {
    var { customer, chat, agencies, store_code, tabId, store_code } =
      this.props;

    var customerImg =
      typeof customer?.avatar_image == "undefined" ||
      customer?.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId =
      typeof customer?.id == "undefined" || customer?.id == null
        ? null
        : customer.id;
    var customerName =
      typeof customer?.name == "undefined" || customer?.name == null
        ? "Trống"
        : customer.name;

    var { statusRequest, showChatBox, searchValue, page, numPage } = this.state;

    return (
      <div id="">
        <div class="row" style={{ "justify-content": "space-between" }}>
          <div style={{ marginLeft: "15px", display: "flex" }}>
            <span
              style={{
                "min-width": "100px",
                fontWeight: 600,

                margin: "auto",
              }}
            >
              Trạng thái:{" "}
            </span>
            <select
              onChange={this.onChangeStatus}
              name="report_type"
              value={statusRequest}
              className="form-control"
            >
              <option value="">Tất cả</option>
              <option value="0">Chờ duyệt</option>
              <option value="1">Đã hủy</option>
              <option value="2">Đã duyệt</option>
              <option value="3">Yêu cầu duyệt lại</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <Table
            tabId={tabId}
            showChatBox={showChatBox}
            handleShowChatBox={this.handleShowChatBox}
            store_code={store_code}
            agencies={agencies}
            getParams={this.getParams}
            page={page}
            searchValue={searchValue}
            numPage={numPage}
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
                  width: "80px",
                }}
                onChange={this.onChangeNumPage}
                value={numPage}
                name="numPage"
                class="form-control"
              >
                <option value="20" selected>
                  20
                </option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
            <Pagination
              statusRequest={statusRequest}
              searchValue={searchValue}
              numPage={numPage}
              getParams={this.getParams}
              store_code={store_code}
              agencies={agencies}
              setPage={this.setPage}
            />
          </div>
        </div>

        <Chat
          customerName={customerName}
          customerImg={customerImg}
          customerId={customerId}
          chat={chat}
          store_code={store_code}
          closeChatBox={this.closeChatBox}
          showChatBox={showChatBox}
        ></Chat>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agencies: state.agencyReducers.agency.allAgencyRegisterRequest,
    auth: state.authReducers.login.authentication,
    customer: state.customerReducers.customer.customerID,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgencyRegisterRequests: (store_code, page, params) => {
      dispatch(
        agencyAction.fetchAllAgencyRegisterRequests(store_code, page, params)
      );
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListAgencyRegisterRequest);
