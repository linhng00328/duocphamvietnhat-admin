import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Pagination from "../../components/CustomerSale/Pagination";
import Table from "../../components/CustomerSale/Table";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";

import * as customerAction from "../../actions/customer_sales";
import Chat from "../../components/Chat";
import * as Env from "../../ultis/default";
import NotAccess from "../../components/Partials/NotAccess";
import { getQueryParams } from "../../ultis/helpers";
import ModalCreate from "../../components/CustomerSale/ModalCreate";
import * as staffAction from "../../actions/staff";
import { getBranchId } from "../../ultis/branchUtils";

import * as placeAction from "../../actions/place";
import $ from "jquery";
import ModalEdit from "../../components/CustomerSale/ModalEdit";
import * as XLSX from "xlsx";
import { randomString } from "../../ultis/helpers";
import ImportModal from "../../components/CustomerSale/ImportModal";
class CustomerSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      searchValue: "",
      paginate: 1,
      openModal: false,
      openModalEdit: false,

      id_customer: "",
      modal: {},
      modalDelete: {},
      filter_by_status: "",
    };

    this.currentStatus = "";
  }

  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };
  resetModalEdit = () => {
    this.setState({ openModalEdit: false });
  };

  handleShowChatBox = (customerId, status) => {
    this.setState({
      showChatBox: status,
      customerId: customerId,
    });
    var { store_code } = this.props.match.params;
    this.props.fetchCustomerSaleId(store_code, customerId);
    this.props.fetchChatId(store_code, customerId);
  };

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    var params = `&search=${searchValue}`;
    this.props.fetchAllCustomerSale(store_code, 1, params);
  };
  componentWillReceiveProps(nextProps) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var status = urlParams.get("status");
    var { store_code } = this.props.match.params;

    if (status !== this.currentStatus) {
      this.currentStatus = status;
      var params = this.getParams(status);
      this.props.fetchAllCustomerSale(store_code, 1, params);
    }

    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.onsale_list;
      var add = permissions.onsale_add;
      var edit = permissions.onsale_edit;
      var remove = permissions.onsale_remove;
      var assignment = permissions.onsale_assignment;
      this.setState({
        isLoading: true,
        isShow,
        chat_allow: true,
        edit,
        add,
        remove,
        assignment,
      });
    }
  }

  componentDidMount() {
    var pag = getQueryParams("pag") || 1;

    this.props.fetchAllCustomerSale(this.props.match.params.store_code, pag);
    this.props.fetchPlaceProvince();
    var params = `branch_id=${getBranchId()}`;
    this.props.fetchAllStaff(
      this.props.match.params.store_code,
      null,
      params,
      null
    );
  }

  saveAllListCustomer = () => {
    var { store_code } = this.props.match.params;
    this.props.saveAllListCustomer(store_code);
  };

  handleSetIdCustomer = (id) => {
    this.setState({
      id_supplier: id,
    });
  };

  handleSetInfor = (item) => {
    this.setState({ modal: item });
  };

  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  getPaginate = (num) => {
    this.setState({ paginate: num });
  };
  showDialogImportExcel = () => {
    $("#file-excel-import").trigger("click");
  };
  onChangeExcel = (evt) => {
    var f = evt.target.files[0];
    const reader = new FileReader();
    window.$("#importModal").modal("show");
    this.setState({ allow_skip_same_name: randomString(10) });
    var _this = this;
    reader.onload = function (evt) {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet],
          {
            defval: "",
          }
        );
        console.log(rowObject);
        _this.setState({ importData: rowObject });
      });
    };
    document.getElementById("file-excel-import").value = null;
    reader.readAsBinaryString(f);
  };
  getParams = (status, page) => {
    var params = ``;
    if (status != "" && status != null) {
      params = params + `&status=${status}`;
    }
    if (page != "" && page != null) {
      params = params + `&page=${page}`;
    }

    return params;
  };
  passFilterStatus = (filter_by_status) => {
    this.setState({
      filter_by_status,
    });
  };

  render() {
    var { customer, chat, customers, staff } = this.props;
    console.log(customer, customers);
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

    var { store_code } = this.props.match.params;
    var {
      showChatBox,
      isShow,
      chat_allow,
      searchValue,
      paginate,
      openModal,
      modal,
      openModalEdit,
      filter_by_status,
      edit,
      add,
      remove,
      assignment,
    } = this.state;
    var { wards, district, province } = this.props;
    var importData = this.state.importData;

    console.log(isShow);
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} currentParams={this.currentStatus} />
          <ModalCreate
            resetModal={this.resetModal}
            openModal={openModal}
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
          />
          <ModalEdit
            openModalEdit={openModalEdit}
            resetModal={this.resetModalEdit}
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
            modal={modal}
          />

          <ImportModal
            store_code={store_code}
            importData={importData}
            allow_skip_same_name={true}
          />

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
                        Khách hàng tiềm năng
                      </h4>{" "}
                      <div>
                        <a
                          style={{ marginRight: "10px" }}
                          onClick={this.showDialogImportExcel}
                          class={`btn btn-primary btn-icon-split btn-sm  ${
                            add == true && assignment == true ? "" : "hide"
                          }
                            `}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-import"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Import Excel
                          </span>
                        </a>
                        <input
                          id="file-excel-import"
                          type="file"
                          name="name"
                          style={{ display: "none" }}
                          onChange={this.onChangeExcel}
                        />

                        <a
                          style={{ marginRight: "10px" }}
                          onClick={this.saveAllListCustomer}
                          class={`btn btn-danger btn-icon-split btn-sm show"
                            }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-file-export"></i>
                          </span>
                          <span style={{ color: "white" }} class="text">
                            Export Excel
                          </span>
                        </a>
                        {add ? (
                          <a
                            data-toggle="modal"
                            data-target="#modalCreateCustomer"
                            class="btn btn-info btn-icon-split btn-sm"
                            style={{
                              height: "fit-content",
                              width: "fit-content",
                            }}
                          >
                            <span class="icon text-white-50">
                              <i class="fas fa-plus"></i>
                            </span>
                            <span
                              style={{
                                color: "white",
                              }}
                              class={`text `}
                            >
                              Thêm khách hàng
                            </span>
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <form onSubmit={this.searchData}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm khách hàng"
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
                          edit={edit}
                          add={add}
                          remove={remove}
                          assignment={assignment}
                          is_user={
                            this.props.badges.is_staff === false ? true : false
                          }
                          passFilterStatus={this.passFilterStatus}
                          handleSetInfor={this.handleSetInfor}
                          paginate={paginate}
                          chat_allow={chat_allow}
                          showChatBox={showChatBox}
                          handleShowChatBox={this.handleShowChatBox}
                          handleEdit={this.handleEdit}
                          store_code={store_code}
                          customers={customers}
                          staff={staff}
                          getParams={this.getParams}
                        />

                        <Pagination
                          getPaginate={this.getPaginate}
                          getParams={this.getParams}
                          filter_by_status={filter_by_status}
                          store_code={store_code}
                          customers={customers}
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
            {/* <Chat customerImg = {customerImg} customerId = {customerId} chat = {chat} store_code = {store_code}/> */}
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
    customers: state.customerSaleReducers.customer_sales.allCustomer,
    auth: state.authReducers.login.authentication,
    customer: state.customerReducers.customer.customerID,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    staff: state.staffReducers.staff.allStaff,
    badges: state.badgeReducers.allBadge,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },
    saveAllListCustomer: (id, page, params) => {
      dispatch(customerAction.saveAllListCustomer(id, page, params));
    },

    fetchCustomerSaleId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerSaleId(store_code, customerId));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerSale);
