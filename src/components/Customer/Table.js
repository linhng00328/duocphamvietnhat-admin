import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import { getDDMMYYYHis } from "../../ultis/date";
import styled from "styled-components";
import ModalChangeRoleCustomer from "./ModalChangeRoleCustomer";
import { connect, shallowEqual } from "react-redux";
import * as saleAction from "../../actions/sale";
import * as staffAction from "../../actions/staff";
import * as agencyAction from "../../actions/agency";
import * as helper from "../../ultis/helpers";
import ModalChangePoint from "./ModalChangePoint";
import Select from "react-select";
import { getBranchId } from "../../ultis/branchUtils";
import * as Types from "../../constants/ActionType";
import * as customerAction from "../../actions/customer";

const typeRoleCustomer = [
  {
    id: 1,
    sale_type: 0,
    name: "Khách hàng",
  },
  {
    id: 2,
    sale_type: 1,
    name: "Cộng tác viên",
  },
  {
    id: 3,
    sale_type: 2,
    name: "Đại lý",
  },
];

const TableStyles = styled.div`
  .select-role {
    &:hover {
      text-decoration: underline;
    }
  }
  .select-role-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
    & > div {
      & > div {
        padding: 8px 18px;
        color: black;
        white-space: nowrap;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        &:not(:last-child) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .list-agencies {
    position: absolute;
    top: 0;
    right: 100%;
    z-index: 10;
    background-color: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
    & > div {
      padding: 8px 18px;
      color: black;
      white-space: nowrap;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  .exploder {
    border: 1px solid;
    border-radius: 3px;
    span {
      margin: 3px 0;
      &:hover {
        color: white;
      }
    }
  }
  .collaborators_balance {
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: #2980b9;
    &:hover {
      color: #3498db;
    }
  }
  .btn-exploder {
    span {
      margin: 3px 0;
      &:hover {
        color: white;
      }
    }
  }
  .explode__info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 10px;
    .explode__item {
      display: flex;
      align-items: center;
      & > span {
        &:first-child {
          width: 150px;
          display: inline-block;
        }
      }
      .explode__point {
        display: flex;
      }
    }
  }
  .input__check,
  .input__checkAll {
    margin-bottom: 0;
  }
  .name_customer_hover {
    &:hover {
      text-decoration: underline;
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerSelected: null,
      openModalChangeRole: false,
      typeSaleCustomer: null,
      showListAgencies: false,
      typeAgency: null,
      nameCustomer: "",
      customerSelectedPoint: {},
      isSub: true,
      listItemSelected: [],
      currentStaff: null,
      roleCustomerChange: null,
      typeAgencyChange: null,
    };
  }

  componentDidMount() {
    const { fetchAllAgencyType, fetchAllStaff, store_code } = this.props;
    var params = `branch_id=${getBranchId()}`;

    fetchAllStaff(store_code, null, params, null);
    fetchAllAgencyType(store_code);
    helper.loadExpandTable();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      customers,
      customersSale,
      addCustomerToSaleSuccessfully,
      addedPointSuccessfully,
      updatedRoleSuccessfully,
      resetCustomerToSaleMessage,
      resetAddPointMessage,
      resetUpdateRoleMessage,
      fetchListCustomerOfSale,
      fetchAllCustomer,
      isSale,
      currentParams,
      paginate,
      store_code,
    } = this.props;
    const { customers: customersNext, customersSale: customersSaleNext } =
      nextProps;

    if (
      !shallowEqual(customers, customersNext) ||
      !shallowEqual(customersSale, customersSaleNext)
    ) {
      this.setState({ listItemSelected: [], currentStaff: null });
    }
    if (
      !shallowEqual(
        addCustomerToSaleSuccessfully,
        nextProps.addCustomerToSaleSuccessfully
      ) &&
      nextProps.addCustomerToSaleSuccessfully
    ) {
      if (isSale()) {
        fetchListCustomerOfSale(store_code, paginate, currentParams);
      } else {
        fetchAllCustomer(store_code, paginate, currentParams);
      }
      this.setState({ listItemSelected: [], currentStaff: null });
      resetCustomerToSaleMessage();
    }
    if (
      !shallowEqual(addedPointSuccessfully, nextProps.addedPointSuccessfully) &&
      nextProps.addedPointSuccessfully
    ) {
      if (isSale()) {
        fetchListCustomerOfSale(store_code, paginate, currentParams);
      } else {
        fetchAllCustomer(store_code, paginate, currentParams);
      }
      this.setCustomerSelectedPoint({});
      resetAddPointMessage();
    }
    if (
      !shallowEqual(
        updatedRoleSuccessfully,
        nextProps.updatedRoleSuccessfully
      ) &&
      nextProps.updatedRoleSuccessfully
    ) {
      if (isSale()) {
        fetchListCustomerOfSale(store_code, paginate, currentParams);
      } else {
        fetchAllCustomer(store_code, paginate, currentParams);
      }
      this.setOpenShowModalChangeRole(false);
      this.setCustomerSelected(null);
      this.setTypeSaleCustomer(null);
      this.setTypeAgency(null);
      this.setShowListAgencies(false);
      this.setRoleCustomerChange(null);
      this.setTypeAgencyChange(null);
      resetUpdateRoleMessage();
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!shallowEqual(prevProps.customers, this.props.customers)) {
      helper.loadExpandTable();
    }
  }
  setRoleCustomerChange = (customer) => {
    this.setState({
      roleCustomerChange: customer,
    });
  };
  setTypeAgencyChange = (typeAgency) => {
    this.setState({
      typeAgencyChange: typeAgency,
    });
  };
  setCurrentStaff = (staff) => {
    this.setState({
      currentStaff: staff,
    });
  };
  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };
  handleSetInfor = (item) => {
    this.props.handleSetInfor(item);
  };
  changePage = (store_code, customerId, e) => {
    const { searchValue, isSale } = this.props;
    if (
      e.target.className !== "total_referral" &&
      !e.target.closest(".select-role") &&
      !e.target.closest(".exploder") &&
      !e.target.closest(".input__check")
    ) {
      var { paginate } = this.props;
      if (e.target.name == "action") return;
      if (isSale()) {
        history.push(
          `/customer/customerSale/detail/${store_code}/${customerId}?page=${paginate}&search=${searchValue}`
        );
      } else {
        history.push(
          `/customer/detail/${store_code}/${customerId}?page=${paginate}&search=${searchValue}`
        );
      }
    }
  };
  handleShowCustomersByReferralPhone = (customerInfo) => {
    const { setCustomerInfo, setShowCustomersByReferralPhone } = this.props;
    setCustomerInfo(customerInfo);
    setShowCustomersByReferralPhone(true);
  };

  handleChangeSaleType = (typeSale, typeAgency) => {
    this.setTypeSaleCustomer(typeSale);
    this.setOpenShowModalChangeRole(true);
    if (typeAgency === undefined) return;
    this.setTypeAgency(typeAgency);
  };

  handlleCustomerSelected = (e, customer) => {
    if (e.target.closest(".select-role-dropdown")) return;
    this.setState({
      customerSelected:
        customer.id === this.state.customerSelected?.id ? null : customer,
    });
  };
  setCustomerSelected = (customer) => {
    this.setState({
      customerSelected: customer,
    });
  };

  setOpenShowModalChangeRole = (showModal) => {
    this.setState({
      openModalChangeRole: showModal,
    });
  };

  setTypeSaleCustomer = (typeSale) => {
    this.setState({
      typeSaleCustomer: typeSale,
    });
  };
  setShowListAgencies = (isShowedListAgencies) => {
    this.setState({
      showListAgencies: isShowedListAgencies,
    });
  };
  setTypeAgency = (typeAgency) => {
    this.setState({
      typeAgency,
    });
  };

  handleShowListAgencies = (e) => {
    const { showListAgencies } = this.state;
    if (e.target.closest(".list-agencies")) return;
    this.setShowListAgencies(!showListAgencies);
  };
  setIsSub = (isSub) => {
    this.setState({ isSub });
  };
  setCustomerSelectedPoint = (customer) => {
    this.setState({
      customerSelectedPoint: customer,
    });
  };
  handleOpenModalChangePoint = (customer, isSub) => {
    this.setState({
      customerSelectedPoint: customer,
      isSub,
    });
  };
  onChangeSelected = (e, idCustomer) => {
    const name = e.target.name;
    const { listItemSelected } = this.state;
    const { customers, customersSale, isSale } = this.props;
    var data = isSale() ? customersSale.data : customers.data;
    if (name === "input__checkAll") {
      if (listItemSelected.length === data.length) {
        this.setState({ listItemSelected: [] });
      } else {
        const listId = data.reduce((prevData, nextData) => {
          return [...prevData, nextData.id];
        }, []);
        this.setState({ listItemSelected: listId });
      }
    } else {
      if (listItemSelected.includes(idCustomer)) {
        const newListItemSelected = listItemSelected.filter(
          (item) => item !== idCustomer
        );
        this.setState({ listItemSelected: newListItemSelected });
      } else {
        this.setState({ listItemSelected: [...listItemSelected, idCustomer] });
      }
    }
  };

  handleAddCustomerToSale = () => {
    const { listItemSelected, currentStaff } = this.state;
    const { store_code, addCustomerToSale } = this.props;
    const data = {
      list_customer_id: listItemSelected,
      staff_id: currentStaff.value,
    };

    addCustomerToSale(store_code, data);
  };

  handleChangeManyRoleCustomer = () => {
    const { listItemSelected, roleCustomerChange, typeAgencyChange } =
      this.state;
    console.log("typeAgencyChange", typeAgencyChange);
    const { store_code, changeTypeManyRoleCustomer } = this.props;
    const data = {
      customer_ids: listItemSelected,
      sale_type: roleCustomerChange?.value,
      agency_type_id: typeAgencyChange?.value ? typeAgencyChange.value : null,
    };

    changeTypeManyRoleCustomer(store_code, data);
  };

  handleChangeStaffSelect = (staffs) => {
    const newStaffs = staffs.filter((staff) => staff.is_sale === true);
    const options = newStaffs.reduce((prevData, currentData) => {
      return [
        ...prevData,
        {
          value: currentData.id,
          label: currentData.name,
        },
      ];
    }, []);
    return [...options];
  };
  handleChangeStaff = (event) => {
    this.setCurrentStaff(event);
  };
  handleChangeRoleCustomer = (role) => {
    console.log("111", this.props.types);
    if (role?.value != 2) {
      this.setState({ typeAgencyChange: null });
    }
    this.setState({ roleCustomerChange: role });
  };
  handleChangeTypeCustomer = (role) => {
    this.setState({ typeAgencyChange: role });
  };
  optionLevelAgencies = (types) => {
    console.log("types", types);
    if (types?.length > 0) {
      return types.map((type) => ({
        value: type.id,
        label: type.name,
      }));
    }

    return [];
  };

  optionTypeRoles = (types) => {
    return types.map((type) => ({
      value: type.sale_type,
      label: type.name,
    }));
  };

  showData = (customer) => {
    var { store_code, paginate, types, customer_change_point } = this.props;
    const { customerSelected, listItemSelected } = this.state;
    var result = null;
    if (customer.length > 0) {
      result = customer.map((data, index) => {
        return (
          <>
            <tr className="hover-product">
              <td>
                <input
                  type="checkbox"
                  name="input__check"
                  className="input__check"
                  value={listItemSelected.includes(data.id)}
                  checked={listItemSelected.includes(data.id)}
                  onChange={(e) => this.onChangeSelected(e, data.id)}
                />
              </td>
              <td className="btn-exploder">
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className="btn-outline-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>{" "}
              <td>
                {(this.props.customers.current_page - 1) * 20 + index + 1}
              </td>
              <td
                onClick={(e) => this.changePage(store_code, data.id, e)}
                className="primary name_customer_hover"
              >
                {data.name}
              </td>
              <td>{data.phone_number}</td>
              <td>{data.referral_phone_number}</td>
              <td>
                {data.sale_staff ? (
                  <div className="explode__item">
                    {`${data.sale_staff.name} `}
                  </div>
                ) : (
                  ""
                )}
              </td>
              <td
                className="total_referral"
                onClick={() => this.handleShowCustomersByReferralPhone(data)}
              >
                {data.total_referrals}
              </td>
              <td>
                {data.points ? new Intl.NumberFormat().format(data.points) : 0}
              </td>
              <td>
                {data.total_final_without_refund
                  ? new Intl.NumberFormat().format(
                      data.total_final_without_refund
                    )
                  : 0}
              </td>
              {getChannel() == IKITECH && (
                <td
                  className={`${
                    data.is_collaborator === true
                      ? "warning"
                      : data.is_agency === true
                      ? "danger"
                      : "primary"
                  } select-role`}
                  style={{
                    position: "relative",
                  }}
                  onClick={(e) => {
                    var permissions = this.props.permission;
                    var customerRoleRdit = permissions.customer_role_edit;
                    if (customerRoleRdit) {
                      this.handlleCustomerSelected(e, data);
                    }
                  }}
                >
                  {data.is_collaborator === true
                    ? "Cộng tác viên"
                    : data.is_agency === true
                    ? `Đại lý${
                        data.agency_type ? `(${data.agency_type?.name})` : ""
                      }`
                    : "Khách hàng"}
                  {customerSelected?.id !== data.id ? null : (
                    <div class="select-role-dropdown">
                      {typeRoleCustomer.map((customer) => (
                        <div key={customer.id}>
                          {customer.sale_type !== 2 ? (
                            <div
                              onClick={() =>
                                this.handleChangeSaleType(customer.sale_type)
                              }
                            >
                              {customer.name}
                            </div>
                          ) : (
                            <>
                              {types.length === 0 ? (
                                <div
                                  onClick={() =>
                                    this.handleChangeSaleType(
                                      customer.sale_type
                                    )
                                  }
                                >
                                  {customer.name}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    position: "relative",
                                  }}
                                  onClick={this.handleShowListAgencies}
                                >
                                  {customer.name}
                                  {this.state.showListAgencies ? (
                                    <div className="list-agencies">
                                      {types.map((type) => (
                                        <div
                                          key={type.id}
                                          onClick={() =>
                                            this.handleChangeSaleType(
                                              customer.sale_type,
                                              type.id
                                            )
                                          }
                                        >
                                          {type.name}
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              )}
              {getChannel() == IKIPOS && (
                <td className="">
                  {getChannel() == IKIPOS && (
                    <Link
                      to={`/customer/detail/${store_code}/${data.id}?pag=${paginate}`}
                      style={{ marginLeft: "10px" }}
                      class={`btn btn-warning btn-sm`}
                    >
                      <i class="fa fa-edit"></i> Sửa
                    </Link>
                  )}
                </td>
              )}
            </tr>
            <tr class="explode hide">
              <td colSpan={11}>
                <div
                  style={{
                    display: "flex",
                    columnGap: "20px",
                  }}
                >
                  <div
                    className="explode__info"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div className="explode__item">
                      <span>Họ tên:</span>
                      <span>{data.name}</span>
                    </div>
                    <div className="explode__item">
                      <span>Giới tính:</span>
                      <span>
                        {data.sex == 1
                          ? "Nam"
                          : data.sex == 2
                          ? "Nữ"
                          : data.sex == 0
                          ? "Khác"
                          : ""}
                      </span>
                    </div>
                    <div className="explode__item">
                      <span>Email:</span>
                      <span>{data.email}</span>
                    </div>
                    <div className="explode__item">
                      <span>Số điện thoại:</span>
                      <span>{data.phone_number}</span>
                    </div>
                    <div className="explode__item">
                      <span>Ngày sinh:</span>
                      <span>{data.date_of_birth}</span>
                    </div>
                    <div className="explode__item">
                      <span>SĐT người giới thiệu:</span>
                      <span>{data.referral_phone_number}</span>
                    </div>

                    <div className="explode__item">
                      <span>Tỉnh/Thành phố:</span>
                      {data.province_name == null
                        ? "Chưa cập nhật"
                        : data.province_name}
                    </div>
                    <div className="explode__item">
                      <span>Tình trạng:</span>
                      <span>
                        {data.official ? "Đã đăng ký" : "Chưa đăng ký"}
                      </span>
                    </div>
                    <div className="explode__item">
                      <span>Ngày thêm/đăng ký:</span>
                      <span>{data.created_at}</span>
                    </div>
                    <div className="explode__item">
                      <span>Số xu:</span>
                      <div className="explode__point">
                        <span
                          style={{
                            color: "#2980b9",
                          }}
                        >
                          {data.points}
                        </span>
                        {customer_change_point ? (
                          <div
                            style={{
                              marginLeft: "15px",
                              display: "flex",
                              alignItems: "center",
                              columnGap: "5px",
                            }}
                          >
                            <button
                              type="button"
                              style={{ width: "25px" }}
                              className=" btn-outline-success btn-exploder"
                              onClick={() =>
                                this.handleOpenModalChangePoint(data, false)
                              }
                            >
                              <span className="fa fa-plus"></span>
                            </button>
                            <button
                              type="button"
                              style={{ width: "25px" }}
                              className=" btn-outline-danger btn-exploder"
                              onClick={() =>
                                this.handleOpenModalChangePoint(data, true)
                              }
                            >
                              <span className="fa fa-minus"></span>
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="explode__item">
                      <span>Số nợ hiện tại:</span>
                      {data.debt
                        ? new Intl.NumberFormat().format(data.debt)
                        : 0}
                    </div>
                    <div className="explode__item">
                      <span>Tỉnh/Thành phố:</span>
                      {data.province_name == null
                        ? "Chưa cập nhật"
                        : data.province_name}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.showChatBox(data.id, "show")}
                      class="btn btn-outline-success btn-sm"
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <i class="fa fa-comment-alt"></i> Chat
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { store_code, staff } = this.props;
    var customers;
    customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;

    const {
      openModalChangeRole,
      customerSelected,
      typeSaleCustomer,
      typeAgency,
      customerSelectedPoint,
      listItemSelected,
      currentStaff,
      roleCustomerChange,
      typeAgencyChange,
    } = this.state;

    return (
      <TableStyles class="table-responsive">
        {listItemSelected.length > 0 && (
          <div
            style={{
              display: "flex",
              columnGap: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                columnGap: "10px",
              }}
            >
              <div
                style={{
                  width: "200px",
                }}
              >
                <Select
                  options={this.handleChangeStaffSelect(staff)}
                  placeholder="Nhân viên"
                  className="select-staff"
                  onChange={this.handleChangeStaff}
                  value={currentStaff}
                  noOptionsMessage={() => "Không tìm thấy kết quả"}
                ></Select>
              </div>
              <button
                className={`btn  mb-2 ${
                  !currentStaff ? "btn-secondary disabled" : "btn-success "
                }`}
                onClick={this.handleAddCustomerToSale}
                disabled={!currentStaff}
              >
                Phân công Sale ({listItemSelected.length})
              </button>
            </div>
            <div
              style={{
                display: "flex",
                columnGap: "10px",
              }}
            >
              <div
                style={{
                  width: "190px",
                }}
              >
                <Select
                  options={this.optionTypeRoles(typeRoleCustomer)}
                  placeholder="Vai trò"
                  className="select-role-customer"
                  onChange={this.handleChangeRoleCustomer}
                  value={roleCustomerChange}
                  noOptionsMessage={() => "Không tìm thấy kết quả"}
                  isClearable
                ></Select>
              </div>
              {roleCustomerChange?.value == 2 &&
              this.props.types?.length > 0 ? (
                <div
                  style={{
                    width: "190px",
                  }}
                >
                  <Select
                    options={this.optionLevelAgencies(this.props.types)}
                    placeholder="Cấp đại lý"
                    className="select-role-customer"
                    onChange={this.handleChangeTypeCustomer}
                    value={typeAgencyChange}
                    noOptionsMessage={() => "Không tìm thấy kết quả"}
                    isClearable
                  ></Select>
                </div>
              ) : null}

              <button
                className={`btn  mb-2 ${
                  roleCustomerChange ||
                  (roleCustomerChange?.value == 2 &&
                    !typeAgencyChange &&
                    this.props.types.length > 0)
                    ? "btn-success "
                    : "btn-secondary disabled"
                }`}
                onClick={this.handleChangeManyRoleCustomer}
                disabled={
                  !roleCustomerChange ||
                  (roleCustomerChange?.value == 2 && !typeAgencyChange && this.props.types.length > 0)
                }
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        <table
          class="table table-border "
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="input__checkAll"
                  className="input__checkAll"
                  checked={
                    customers.length > 0 &&
                    listItemSelected.length === customers.length
                  }
                  onChange={this.onChangeSelected}
                ></input>
              </th>
              <th></th>
              <th>STT</th>
              <th>Họ tên</th>

              <th>Số điện thoại</th>
              <th>SĐT người giới thiệu</th>
              <th>Sale</th>
              <th>Giới thiệu</th>
              <th>Xu</th>
              <th>Tổng mua</th>

              {getChannel() == IKITECH && <th>Vai trò</th>}

              {/* {getChannel() == IKIPOS &&   <th>Hành động</th>} */}
            </tr>
          </thead>
          <tbody>{this.showData(customers)}</tbody>
        </table>
        {openModalChangeRole ? (
          <ModalChangeRoleCustomer
            setOpenShowModalChangeRole={this.setOpenShowModalChangeRole}
            setCustomerSelected={this.setCustomerSelected}
            setTypeSaleCustomer={this.setTypeSaleCustomer}
            setShowListAgencies={this.setShowListAgencies}
            setTypeAgency={this.setTypeAgency}
            customerSelected={customerSelected}
            typeSaleCustomer={typeSaleCustomer}
            typeAgency={typeAgency}
            store_code={store_code}
          ></ModalChangeRoleCustomer>
        ) : null}
        {Object.entries(customerSelectedPoint).length > 0 ? (
          <ModalChangePoint
            store_code={store_code}
            isSub={this.state.isSub}
            customerSelectedPoint={customerSelectedPoint}
            setCustomerSelectedPoint={this.setCustomerSelectedPoint}
          />
        ) : null}
      </TableStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,
    addedPointSuccessfully:
      state.customerReducers.customer.addedPointSuccessfully,
    updatedRoleSuccessfully:
      state.customerReducers.customer.updatedRoleSuccessfully,
    types: state.agencyReducers.agency.allAgencyType,
    addCustomerToSaleSuccessfully:
      state.saleReducers.sale.addCustomerToSaleSuccessfully,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(agencyAction.fetchAllAgencyType(store_code));
    },
    addCustomerToSale: (store_code, data) => {
      dispatch(saleAction.addCustomerToSale(store_code, data));
    },
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
    changeTypeManyRoleCustomer: (store_code, data, onSuccess) => {
      dispatch(
        customerAction.changeTypeManyRoleCustomer(store_code, data, onSuccess)
      );
    },
    resetCustomerToSaleMessage: () => {
      dispatch({ type: Types.ADD_CUSTOMER_TO_SALE, data: false });
    },
    resetAddPointMessage: () => {
      dispatch({ type: Types.ADD_SUB_POINT_CUSTOMER, data: false });
    },
    resetUpdateRoleMessage: () => {
      dispatch({ type: Types.UPDATE_ROLE_CUSTOMER_FOR_INTERFACE, data: false });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
