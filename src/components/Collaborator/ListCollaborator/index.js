import React, { Component } from "react";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import Chat from "../../Chat";
import * as Env from "../../../ultis/default";
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import { getQueryParams, insertParam } from "../../../ultis/helpers";
import SidebarShowCustomerOfSale from "../../Sale/ListSale/SidebarShowCustomerOfSale.js";
import SiderbarCusReferPhone from "../../Agency/ListAgency/SiderbarCusReferPhone/index.js";

class ListCollaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
      numPage: getQueryParams("limit") || 20,
      showCustomerOfSale: false,
      saleInfo: {},
    };
  }

  handleShowChatBox = (collaboratorId, status) => {
    this.setState({
      showChatBox: status,
      collaboratorId: collaboratorId,
    });
    var { store_code } = this.props;
    this.props.fetchCustomerId(store_code, collaboratorId);

    this.props.fetchChatId(store_code, collaboratorId);
  };

  componentDidMount() {
    const { page, searchValue, numPage } = this.state;
    const params = this.getParams(searchValue, numPage);
    this.props.fetchAllCollaborator(this.props.store_code, page, params);
  }
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  exportListCollaborator = () => {
    var { searchValue, page, numPage } = this.state;
    var params = this.getParams(searchValue, numPage);
    this.props.exportListCollaborator(this.props.store_code, page, params);
  };
  getParams = (searchValue, limit = 20) => {
    var params = ``;

    if (searchValue != "" && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    params += `&limit=${limit}`;

    return params;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  searchData = (e) => {
    e.preventDefault();
    var { searchValue, numPage } = this.state;
    var params = this.getParams(searchValue, numPage);
    this.setPage(1);
    insertParam({ search: searchValue });
    const page = getQueryParams("page");
    if (page) {
      insertParam({ page: 1 });
    }
    this.props.fetchAllCollaborator(this.props.store_code, 1, params);
  };
  onChangeNumPage = (e) => {
    const { store_code, fetchAllCollaborator } = this.props;
    var { searchValue } = this.state;
    const numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    var params = this.getParams(searchValue, numPage);
    insertParam({ page: 1, limit: numPage });
    fetchAllCollaborator(store_code, 1, params);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  setShowCustomerOfSale = (isShowed) => {
    this.setState({
      showCustomerOfSale: isShowed,
    });
  };

  setSaleInfo = (saleInfo) => {
    this.setState({
      saleInfo,
    });
  };

  render() {
    var {
      customer,
      chat,
      collaborators,
      store_code,
      tabId,
      collaborator_add_sub_balance,
    } = this.props;

    var customerImg =
      typeof customer.avatar_image == "undefined" ||
      customer.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId =
      typeof customer.id == "undefined" || customer.id == null
        ? null
        : customer.id;
    var customerName =
      typeof customer.name == "undefined" || customer.name == null
        ? "Trống"
        : customer.name;

    var { showChatBox, searchValue, page, numPage } = this.state;
    
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
                placeholder="Tìm kiếm CTV"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>

          <button
            style={{ margin: "auto 0px" }}
            onClick={this.exportListCollaborator}
            class={`btn btn-danger btn-icon-split btn-sm `}
          >
            <span class="icon text-white-50">
              <i class="fas fa-file-export"></i>
            </span>
            <span style={{ color: "white" }} class="text">
              Export Excel
            </span>
          </button>
        </div>
        <div className="card-body">
          <Table
            collaborator_add_sub_balance={collaborator_add_sub_balance}
            tabId={tabId}
            showChatBox={showChatBox}
            handleShowChatBox={this.handleShowChatBox}
            store_code={store_code}
            collaborators={collaborators}
            getParams={this.getParams}
            page={page}
            searchValue={searchValue}
            numPage={numPage}
            setShowCustomerOfSale={this.setShowCustomerOfSale}
            setSaleInfo={this.setSaleInfo}
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
              searchValue={searchValue}
              numPage={numPage}
              getParams={this.getParams}
              store_code={store_code}
              collaborators={collaborators}
              setPage={this.setPage}
            />
          </div>
        </div>

        <SiderbarCusReferPhone
          store_code={store_code}
          showSidebar={this.state.showCustomerOfSale}
          setShowSidebar={this.setShowCustomerOfSale}
          saleInfo={this.state.saleInfo}
          setSaleInfo={this.setSaleInfo}
        ></SiderbarCusReferPhone>

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
    collaborators: state.collaboratorReducers.collaborator.allCollaborator,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    customer: state.customerReducers.customer.customerID,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCollaborator: (store_code, page, params) => {
      dispatch(
        collaboratorAction.fetchAllCollaborator(store_code, page, params)
      );
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, collaboratorId) => {
      dispatch(collaboratorAction.fetchChatId(store_code, collaboratorId));
    },

    exportListCollaborator: (store_code, page, params) => {
      dispatch(
        collaboratorAction.exportListCollaborator(store_code, page, params)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCollaborator);
