import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString, insertParam } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import styled from "styled-components";
import ModalHistoryBalance from "./ModalHistoryBalance";
import ModalChangeBalance from "./ModalChangeBalance";
import ModalListReferences from "../../Collaborator/ListCollaborator/ModalListReferences";
import SidebarListReferences from "../../Collaborator/ListCollaborator/SidebarListReferences";

const TableStyles = styled.div`
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
  .btn-exploder {
    span {
      margin: 3px 0;
      &:hover {
        color: white;
      }
    }
  }
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    margin-bottom: 0;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFrist: false,
      agencySelected: {},
      agencySelectedForChangeBalance: {},
    };
  }

  showChatBox = (agencyId, status) => {
    this.props.handleShowChatBox(agencyId, status);
  };

  componentDidMount() {
    this.setState({ loadFrist: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (!shallowEqual(prevProps.agencys, this.props.agencys) &&
        prevProps.agencys.length == 0) ||
      prevProps.tabId != 1 ||
      prevState.loadFrist != this.state.loadFrist
    ) {
      helper.loadExpandTable();
    }
  }
  handleShowSidebarListReferences = (cusInfo) => {
    this.setState({ customerInfo: cusInfo });
    this.setShowSidebarListReferences(true);
  };
  setShowSidebarListReferences = (showSidebarListReferences) => {
    this.setState({ showSidebarListReferences });
  };
  setCustomerInfo = (cusInfo) => {
    this.setState({ customerInfo: cusInfo });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.props.agencys, nextProps.agencys)) {
      this.setAgencySelectedForChangeBalance({});
      this.props.setListItemSelected([]);
    }

    return true;
  }
  setAgencySelected = (agency) => {
    this.setState({
      agencySelected: agency,
    });
  };
  setAgencySelectedForChangeBalance = (agency) => {
    this.setState({
      agencySelectedForChangeBalance: agency,
    });
  };
  handleOpenModalChangeBalance = (agency, isSub) => {
    this.setState({
      agencySelectedForChangeBalance: agency,
      isSub,
    });
  };

  onChangeStatus = (e, id) => {
    const { page, getParams, numPage, searchValue, typeAgency } = this.props;
    var checked = this["checked" + id].checked;
    var status = checked == true ? 1 : 0;
    this.props.updateAgency(
      this.props.store_code,
      id,
      {
        status: status,
      },
      page,
      getParams(searchValue, typeAgency, numPage)
    );
  };

  changeAgencyType = (e, id) => {
    const { page, getParams, numPage, searchValue, typeAgency } = this.props;
    var value = e.target.value;
    if (value == 0) return;
    this.props.updateAgency(
      this.props.store_code,
      id,
      {
        agency_type_id: value,
      },
      page,
      getParams(searchValue, typeAgency, numPage)
    );
  };

  onChangeSelected = (e, idAgency) => {
    const name = e.target.name;
    const { agencys, listItemSelected, setListItemSelected } = this.props;
    var data = agencys.data;
    if (name === "input__checkAll") {
      if (listItemSelected.length === data.length) {
        setListItemSelected([]);
      } else {
        const listId = data.reduce((prevData, nextData) => {
          return [...prevData, nextData.id];
        }, []);
        setListItemSelected(listId);
      }
    } else {
      if (listItemSelected.includes(idAgency)) {
        const newListItemSelected = listItemSelected.filter(
          (item) => item !== idAgency
        );
        setListItemSelected(newListItemSelected);
      } else {
        setListItemSelected([...listItemSelected, idAgency]);
      }
    }
  };

  handleShowSidebar = (data) => {
    const { setSaleInfo, setShowCustomerOfSale } = this.props;
    setSaleInfo(data);
    setShowCustomerOfSale(true);
  };

  showData = (agencys) => {
    var { store_code, listItemSelected, auto_set_level_agency } = this.props;

    const permissionChangeBalance = this.props.agency_add_sub_balance;
    const permissionChangeLevel = this.props.agency_change_level;
    var result = null;
    if (agencys.length > 0) {
      result = agencys.map((data, index) => {
        var avatar =
          data.customer.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data.customer.avatar_image;
        var img_front =
          data.front_card == null ? Env.IMG_NOT_FOUND : data.front_card;
        var img_back =
          data.back_card == null ? Env.IMG_NOT_FOUND : data.back_card;

        var address_default = "";

        if (data.customer != null && typeof data.customer != "undefined") {
          if (
            typeof data.customer.default_address === "object" &&
            data.customer.default_address !== null
          ) {
            if (
              data.customer.default_address.address_detail !== null &&
              data.customer.default_address.address_detail !== ""
            ) {
              address_default =
                address_default +
                data.customer.default_address.address_detail +
                ", ";
            }
            if (
              data.customer.default_address.wards_name !== null &&
              data.customer.default_address.wards_name !== ""
            ) {
              address_default =
                address_default +
                data.customer.default_address.wards_name +
                ", ";
            }
            if (
              data.customer.default_address.district_name !== null &&
              data.customer.default_address.district_name !== ""
            ) {
              address_default =
                address_default +
                data.customer.default_address.district_name +
                ", ";
            }
            if (
              data.customer.default_address.province_name !== null &&
              data.customer.default_address.province_name !== ""
            ) {
              address_default =
                address_default + data.customer.default_address.province_name;
            }
          }
        }
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              {auto_set_level_agency ? (
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
              ) : null}
              <td>
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className=" btn-outline-success exploder"
                >
                  <span className="fa fa-plus"></span>
                </button>
              </td>
              <td>
                {(this.props.agencys.current_page - 1) *
                  Number(this.props.agencys.per_page) +
                  index +
                  1}
              </td>{" "}
              <td style={{ textAlign: "center" }}>
                <img
                  src={avatar}
                  class="img-responsive"
                  width="80px"
                  height="80px"
                  alt="Image"
                />
              </td>
              <td>{data.customer.name}</td>
              <td>{data.customer.phone_number}</td>
              <td>
                <span className="primary">
                  <div
                    className="agency_balance"
                    onClick={() => this.setAgencySelected(data)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                    }}
                  >
                    <span>{format(Number(data.balance))}</span>
                    <span>
                      <i className="fa fa-history"></i>
                    </span>
                  </div>
                </span>
              </td>
              <td>
                <span
                  className="total_customers primary"
                  onClick={() => this.handleShowSidebar(data)}
                >
                  {data?.customer?.referral_phone_number || null}
                </span>
              </td>
              <td>
                <select
                  style={{ width: "100%" }}
                  name="agency_type_id"
                  id="input"
                  value={
                    data.agency_type_id === null ? "0" : data.agency_type_id
                  }
                  required="required"
                  onChange={(e) => this.changeAgencyType(e, data.id)}
                  className="form-control"
                  disabled={permissionChangeLevel ? false : true}
                >
                  {<option value="0">--Chưa chọn--</option>}
                  {this.props.types.map((data, index) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </td>
              <td
                style={{
                  display: "flex",
                  "flex-direction": "column",
                }}
              >
                <Link
                  style={{ margin: "2px 0" }}
                  to={`/order/${this.props.store_code}?agency_by_customer_id=${data.customer_id}&tab-index=1&page=${this.props.page}&search=${this.props.searchValue}`}
                  class="btn btn-outline-danger btn-sm"
                >
                  <i class="fa fa-history"></i> Lịch sử đơn hàng
                </Link>

                <Link
                  style={{ margin: "2px 0" }}
                  to={`/agency/${this.props.store_code}/report/${data.customer_id}?tab-index=1`}
                  class="btn btn-outline-info btn-sm"
                >
                  <i class="fa fa-bar-chart"></i> Báo cáo
                </Link>
              </td>
            </tr>
            <tr class="explode hide">
              <td colSpan={9}>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="info_user">
                      <p class="sale_user_label">
                        Số tài khoản:{" "}
                        <span id="user_tel">
                          {data.account_number} - {data.bank}
                        </span>
                      </p>
                      <p class="sale_user_label">
                        Tên chủ tài khoản:{" "}
                        <span id="user_tel">{data.account_name}</span>
                      </p>
                      <p
                        class="sale_user_label"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Số dư hoa hồng:{" "}
                        <span
                          id="user_tel"
                          style={{
                            color: "#2980b9",
                            marginLeft: "2px",
                          }}
                        >
                          {format(Number(data.balance))}
                        </span>
                        {permissionChangeBalance ? (
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
                                this.handleOpenModalChangeBalance(data, false)
                              }
                            >
                              <span className="fa fa-plus"></span>
                            </button>
                            <button
                              type="button"
                              style={{
                                width: "25px",
                                pointerEvents:
                                  !data.balance || Number(data.balance) <= 0
                                    ? "none"
                                    : "initial",
                                opacity:
                                  !data.balance || Number(data.balance) <= 0
                                    ? 0.7
                                    : 1,
                              }}
                              className=" btn-outline-danger btn-exploder"
                              onClick={() =>
                                this.handleOpenModalChangeBalance(data, true)
                              }
                            >
                              <span className="fa fa-minus"></span>
                            </button>
                          </div>
                        ) : null}
                      </p>
                      <p class="sale_user_label">
                        Tên CMND: <span id="user_tel">{data.cmnd}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <button
                    onClick={() => this.showChatBox(data.customer.id, "show")}
                    class="btn btn-outline-success btn-sm"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <i class="fa fa-comment-alt"></i> Chat
                  </button>
                  <a
                    href={`tel:${data.customer.phone_number}`}
                    class="btn btn-outline-primary btn-sm"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <i class="fa fa-phone"></i> Gọi ngay
                  </a>
                  <button
                    class="btn btn-outline-info btn-sm"
                    style={{
                      width: "fit-content",
                    }}
                    onClick={() =>
                      this.handleShowSidebarListReferences(data.customer)
                    }
                  >
                    <i class="fa fa-users"></i>
                    Danh sách giới thiệu ({data.customer.total_referrals})
                  </button>
                </div>
              </td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  optionsType = () => {
    var result = null;
    var { types } = this.props;
    if (types.length > 0) {
      result = types.map((data) => {
        return <option value={data.id}>{data.name}</option>;
      });
    }
    return result;
  };
  onChangeType = (e) => {
    var { value } = e.target;
    this.setState({ txtType: value });
    const { setTypeAgency } = this.props;
    setTypeAgency(value);
    this.props.passType(value);
  };
  render() {
    var agencys =
      typeof this.props.agencys.data == "undefined"
        ? []
        : this.props.agencys.data;
    var { txtType, agencySelected, agencySelectedForChangeBalance, isSub } =
      this.state;
    const { typeAgency, listItemSelected, auto_set_level_agency } = this.props;

    return (
      <TableStyles class="" style={{ overflow: "auto" }}>
        <table class="table table-border">
          <thead>
            <tr>
              {auto_set_level_agency ? (
                <th>
                  <input
                    type="checkbox"
                    name="input__checkAll"
                    className="input__checkAll"
                    checked={
                      agencys.length > 0 &&
                      listItemSelected.length === agencys.length
                    }
                    onChange={this.onChangeSelected}
                  ></input>
                </th>
              ) : null}

              <th></th>
              <th>STT</th>
              <th style={{ textAlign: "center" }}>Ảnh</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Số dư hoa hồng</th>
              <th>Mã giới thiệu</th>

              <th>
                <select
                  name="txtType"
                  value={typeAgency}
                  id="input"
                  className="form-control"
                  onChange={this.onChangeType}
                >
                  <option disabled>-- Cấp đại lý --</option>
                  <option value="">Tất cả</option>

                  {this.optionsType()}
                </select>
              </th>

              {/* <th>Trạng thái hoạt động</th> */}

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(agencys)}</tbody>
        </table>

        <ModalListReferences
          store_code={this.props.store_code}
          referral_phone_number={this.state.referral_phone_number}
        />
        <SidebarListReferences
          store_code={this.props.store_code}
          customerInfo={this.state.customerInfo ?? {}}
          setCustomerInfo={this.setCustomerInfo}
          showSidebarListReferences={this.state.showSidebarListReferences}
          setShowSidebarListReferences={this.setShowSidebarListReferences}
        ></SidebarListReferences>

        {Object.entries(agencySelected).length > 0 ? (
          <ModalHistoryBalance
            store_code={this.props.store_code}
            agencySelected={agencySelected}
            setAgencySelected={this.setAgencySelected}
          />
        ) : null}
        {Object.entries(agencySelectedForChangeBalance).length > 0 ? (
          <ModalChangeBalance
            store_code={this.props.store_code}
            isSub={isSub}
            agencySelectedForChangeBalance={agencySelectedForChangeBalance}
            setAgencySelectedForChangeBalance={
              this.setAgencySelectedForChangeBalance
            }
          />
        ) : null}
      </TableStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateAgency: (store_code, id, data, page, params) => {
      dispatch(agencyAction.updateAgency(store_code, id, data, page, params));
    },
    fetchAllAgency: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllAgency(store_code, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
