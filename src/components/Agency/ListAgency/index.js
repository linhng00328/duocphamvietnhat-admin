import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as agencyAction from '../../../actions/agency';
import Chat from '../../Chat';
import * as Env from '../../../ultis/default';
import Table from './Table';
import * as customerAction from '../../../actions/customer';
import Pagination from './Pagination';
import { getQueryParams, insertParam } from '../../../ultis/helpers';
import ModalAutoSetLevelAgency from './ModalAutoSetLevelAgency';
import ModalAutoSetLevelAgencyAll from './ModalAutoSetLevelAgencyAll';
import SiderbarCusReferPhone from './SiderbarCusReferPhone/index.js';

class ListAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: 'hide',
      page: getQueryParams('page') || 1,
      searchValue: getQueryParams('search') || '',
      numPage: getQueryParams('limit') || 20,
      typeAgency: getQueryParams('agency_type_id') || '',
      listItemSelected: [],
    };
  }

  setListItemSelected = (listItem) => {
    this.setState({ listItemSelected: listItem });
  };
  handleShowChatBox = (agencyId, status) => {
    this.setState({
      showChatBox: status,
      agencyId: agencyId,
    });
    var { store_code } = this.props;
    this.props.fetchCustomerId(store_code, agencyId);

    this.props.fetchChatId(store_code, agencyId);
  };

  componentDidMount() {
    const { page, searchValue, numPage, typeAgency } = this.state;
    const params = this.getParams(searchValue, typeAgency, numPage);
    this.props.fetchAllAgency(this.props.store_code, page, params);
    this.props.fetchAllAgencyType(this.props.store_code);
    this.props.fetchAgencyConf(this.props.store_code);
  }
  setTypeAgency = (type) => {
    this.setState({ typeAgency: type });
  };
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  passType = (data) => {
    var { searchValue, numPage } = this.state;
    this.setState({ typeAgency: data, page: 1 });
    insertParam({ page: 1, agency_type_id: data });
    var params = this.getParams(searchValue, data, numPage);
    this.props.fetchAllAgency(this.props.store_code, 1, params);
  };

  getParams = (searchValue, type, limit = 20) => {
    var params = ``;

    if (searchValue != '' && searchValue != null) {
      params = params + `&search=${searchValue}`;
    }
    if (type != '' && type != null) {
      params = params + `&agency_type_id=${type}`;
    }
    params += `&limit=${limit}`;

    return params;
  };
  setPage = (page) => {
    this.setState({ page });
  };
  searchData = (e) => {
    e.preventDefault();
    var { searchValue, numPage, typeAgency } = this.state;
    var params = this.getParams(searchValue, typeAgency, numPage);
    this.setPage(1);
    insertParam({ search: searchValue });
    const page = getQueryParams('page');
    if (page) {
      insertParam({ page: 1 });
    }
    this.props.fetchAllAgency(this.props.store_code, 1, params);
  };
  exportListAgency = () => {
    var { searchValue, numPage, page, typeAgency } = this.state;
    var params = this.getParams(searchValue, typeAgency, numPage);
    this.props.exportListAgency(this.props.store_code, page, params);
  };
  onChangeNumPage = (e) => {
    const { store_code, fetchAllAgency } = this.props;
    var { searchValue, typeAgency } = this.state;
    const numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    var params = this.getParams(searchValue, typeAgency, numPage);
    insertParam({ page: 1, limit: numPage });
    fetchAllAgency(store_code, 1, params);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  onAutoSetLevelAgencyType = (from, to, funcModal, type) => {
    const { searchValue, numPage, typeAgency, listItemSelected, page } = this.state;
    const { autoSetLevelAgencyType, store_code, fetchAllAgency } = this.props;
    const params = this.getParams(searchValue, typeAgency, numPage);

    autoSetLevelAgencyType(
      store_code,
      {
        is_all: type === 'all' ? true : false,
        agency_ids: type === 'all' ? [] : listItemSelected,
        date_from: from,
        date_to: to,
      },
      () => {
        if (funcModal) funcModal();
        window.$('.modal').modal('hide');
        this.setListItemSelected([]);
        fetchAllAgency(this.props.store_code, page, params);
      },
    );
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
    var { customer, chat, agencys, store_code, tabId, types, config, agency_add_sub_balance, agency_change_level } =
      this.props;

    var customerImg =
      typeof customer.avatar_image == 'undefined' || customer.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : customer.avatar_image;
    var customerId = typeof customer.id == 'undefined' || customer.id == null ? null : customer.id;
    var customerName = typeof customer.name == 'undefined' || customer.name == null ? 'Trống' : customer.name;

    var { showChatBox, searchValue, page, numPage, typeAgency, listItemSelected } = this.state;

    return (
      <div id="">
        <div class="row" style={{ 'justify-content': 'space-between' }}>
          <form onSubmit={this.searchData}>
            <div class="input-group mb-6" style={{ padding: '7px 20px' }}>
              <input
                style={{ maxWidth: '400px', minWidth: '300px' }}
                type="search"
                name="txtSearch"
                value={searchValue}
                onChange={this.onChangeSearch}
                class="form-control"
                placeholder="Tìm kiếm đại lý"
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
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {listItemSelected?.length > 0 && config?.auto_set_level_agency && (
              <button
                style={{ margin: 'auto 0px' }}
                class={`btn btn-primary btn-icon-split btn-sm `}
                data-toggle="modal"
                data-target="#autoSetLevelAgency"
              >
                <span class="icon text-white-50">
                  <i className="fa fa-cog"></i>
                </span>
                <span style={{ color: 'white' }} class="text">
                  Tự động cập nhật cấp theo doanh số đã chọn
                </span>
              </button>
            )}
            {config?.auto_set_level_agency && (
              <button
                style={{ margin: 'auto 0px' }}
                class={`btn btn-success btn-icon-split btn-sm `}
                data-toggle="modal"
                data-target="#autoSetLevelAgencyAll"
              >
                <span class="icon text-white-50">
                  <i className="fa fa-cog"></i>
                </span>
                <span style={{ color: 'white' }} class="text">
                  Tự động cập nhật cấp theo doanh số
                </span>
              </button>
            )}

            <button
              style={{ margin: 'auto 0px' }}
              onClick={this.exportListAgency}
              class={`btn btn-danger btn-icon-split btn-sm `}
            >
              <span class="icon text-white-50">
                <i class="fas fa-file-export"></i>
              </span>
              <span style={{ color: 'white' }} class="text">
                Export Excel
              </span>
            </button>
          </div>
        </div>

        <div className="card-body">
          <Table
            agency_add_sub_balance={agency_add_sub_balance}
            agency_change_level={agency_change_level}
            passType={this.passType}
            page={page}
            searchValue={searchValue}
            numPage={numPage}
            typeAgency={typeAgency}
            setTypeAgency={this.setTypeAgency}
            getParams={this.getParams}
            types={types}
            tabId={tabId}
            showChatBox={showChatBox}
            handleShowChatBox={this.handleShowChatBox}
            store_code={store_code}
            agencys={agencys}
            listItemSelected={listItemSelected}
            setListItemSelected={this.setListItemSelected}
            auto_set_level_agency={config?.auto_set_level_agency}
            setShowCustomerOfSale={this.setShowCustomerOfSale}
            setSaleInfo={this.setSaleInfo}
          />
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  margin: '20px 10px auto auto',
                }}
              >
                Hiển thị
              </span>
              <select
                style={{
                  margin: 'auto',
                  marginTop: '10px',
                  marginRight: '20px',
                  width: '80px',
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
              numPage={numPage}
              searchValue={searchValue}
              getParams={this.getParams}
              store_code={store_code}
              agencys={agencys}
              setPage={this.setPage}
              typeAgency={typeAgency}
            />
          </div>
        </div>
        <ModalAutoSetLevelAgencyAll store_code={store_code} onAutoSetLevelAgencyType={this.onAutoSetLevelAgencyType} />
        <ModalAutoSetLevelAgency store_code={store_code} onAutoSetLevelAgencyType={this.onAutoSetLevelAgencyType} />

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
    agencys: state.agencyReducers.agency.allAgency,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    customer: state.customerReducers.customer.customerID,
    types: state.agencyReducers.agency.allAgencyType,
    config: state.agencyReducers.agency.config,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, agencyId) => {
      dispatch(agencyAction.fetchChatId(store_code, agencyId));
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(agencyAction.fetchAllAgencyType(store_code));
    },
    exportListAgency: (store_code, page, params) => {
      dispatch(agencyAction.exportListAgency(store_code, page, params));
    },
    autoSetLevelAgencyType: (store_code, data, funcModal) => {
      dispatch(agencyAction.autoSetLevelAgencyType(store_code, data, funcModal));
    },
    fetchAgencyConf: (store_code) => {
      dispatch(agencyAction.fetchAgencyConf(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
