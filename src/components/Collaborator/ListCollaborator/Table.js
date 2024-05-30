import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import ModalListReferences from "./ModalListReferences";
import ModalImg from "../ModalImg";
import moment from "moment";
import SidebarListReferences from "./SidebarListReferences";
import styled from "styled-components";
import ModalHistoryBalance from "./ModalHistoryBalance";
import ModalChangeBalance from "./ModalChangeBalance";
import ModalChangeBankInfo from "./ModalChangeBankInfo";

const ListCollaboratorStyles = styled.div`
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
      referral_phone_number: "",
      modalImg: "",
      showSidebarListReferences: false,
      customerInfo: {},
      collaboratorSelected: {},
      collaboratorSelectedForChangeBalance: {},
      bankInfo: {},
      isModalBankInfo: false,
      isSub: true,
    };
  }

  setBankInfo = (bankInfo) => {
    this.setState({
      bankInfo,
    });
  };

  setIsSub = (isSub) => {
    this.setState({ isSub });
  };
  setCollaboratorSelected = (collab) => {
    this.setState({
      collaboratorSelected: collab,
    });
  };
  setCollaboratorSelectedForChangeBalance = (collab) => {
    this.setState({
      collaboratorSelectedForChangeBalance: collab,
    });
  };

  handleOpenModalBankInfo = (bankInfo) => {
    this.setState({
      bankInfo,
      isModalBankInfo: !this.isModalBankInfo,
    });
  };

  handleOpenModalChangeBalance = (collab, isSub) => {
    this.setState({
      collaboratorSelectedForChangeBalance: collab,
      isSub,
    });
  };
  showChatBox = (collaboratorId, status) => {
    this.props.handleShowChatBox(collaboratorId, status);
  };

  showReferences = (referral_phone_number) => {
    this.setState({
      referral_phone_number: referral_phone_number,
    });
  };

  componentDidMount() {
    this.setState({ loadFrist: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (!shallowEqual(prevProps.collaborators, this.props.collaborators) &&
        prevProps.collaborators.length == 0) ||
      prevProps.tabId != 1 ||
      prevState.loadFrist != this.state.loadFrist
    ) {
      helper.loadExpandTable();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(this.props.collaborators, nextProps.collaborators)) {
      this.setCollaboratorSelectedForChangeBalance({});
    }
    return true;
  }

  onChangeStatus = (e, id) => {
    const { page, getParams, numPage, searchValue } = this.props;
    var checked = this["checked" + id].checked;
    var status = checked == true ? 1 : 0;
    this.props.updateCollaborator(
      this.props.store_code,
      id,
      {
        status: status,
      },
      page,
      getParams(searchValue, numPage)
    );
  };

  showModalImg = (url) => {
    this.setState({ modalImg: url });
  };

  handleShowSidebar = (data) => {
    const { setSaleInfo, setShowCustomerOfSale } = this.props;
    setSaleInfo(data);
    setShowCustomerOfSale(true);
  };

  showData = (collaborators) => {
    var { store_code, collaborator_add_sub_balance } = this.props;
    const permissionChangeBalance = collaborator_add_sub_balance;
    var result = null;
    if (collaborators.length > 0) {
      result = collaborators.map((data, index) => {
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
            data.customer.address_detail !== null &&
            data.customer.address_detail !== ""
          ) {
            address_default =
              address_default + data.customer.address_detail + ", ";
          }
          if (
            data.customer.wards_name !== null &&
            data.customer.wards_name !== ""
          ) {
            address_default = address_default + data.customer.wards_name + ", ";
          }
          if (
            data.customer.district_name !== null &&
            data.customer.district_name !== ""
          ) {
            address_default =
              address_default + data.customer.district_name + ", ";
          }
          if (
            data.customer.province_name !== null &&
            data.customer.province_name !== ""
          ) {
            address_default = address_default + data.customer.province_name;
          }
        }
        return (
          <React.Fragment>
            <tr class="sub-container hover-product" colSpan={8}>
              <td>
                <button
                  type="button"
                  style={{ width: "25px" }}
                  className=" btn-outline-success exploder"
                >
                  <span class="fa fa-plus"></span>
                </button>
              </td>{" "}
              <td>
                {(this.props.collaborators.current_page - 1) *
                  Number(this.props.collaborators.per_page) +
                  index +
                  1}
              </td>{" "}
              <td style={{ textAlign: "center" }}>
                <img
                  src={avatar}
                  class="img-responsive"
                  width="70px"
                  height="70px"
                  alt="Image"
                />
              </td>
              <td>{data.customer.name}</td>
              <td>{data.customer.phone_number}</td>
              <td>
                <div
                  className="collaborators_balance"
                  onClick={() => this.setCollaboratorSelected(data)}
                >
                  <span>{format(Number(data.balance))}</span>
                  <span>
                    <i className="fa fa-history"></i>
                  </span>
                </div>
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
                <Link
                  style={{ margin: "2px 0" }}
                  to={`/order/${this.props.store_code}?collaborator_by_customer_id=${data.customer_id}&tab-index=1&page=${this.props.page}&search=${this.props.searchValue}`}
                  class="btn btn-outline-danger btn-sm"
                >
                  <i class="fa fa-history"></i> Lịch sử đơn hàng
                </Link>
                &nbsp;
                <Link
                  style={{ margin: "2px 0" }}
                  to={`/collaborator/${this.props.store_code}/report/${data.customer.id}`}
                  class="btn btn-outline-info btn-sm"
                >
                  <i class="fa fa-bar-chart"></i> Báo cáo
                </Link>
                &nbsp;
              </td>
            </tr>
            <tr class="explode hide">
              <td colSpan={7}>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-6">
                    <div class="info_user">
                      <p class="sale_user_label">
                        Thông tin ngân hàng: Số tài khoản:{" "}
                        <span id="user_tel">
                          {data.account_number} - {data.bank} -{" "}
                          {data.account_name}
                        </span>
                        <button
                          type="button"
                          style={{ width: "25px", marginLeft: "4px" }}
                          className=" btn-outline-success btn-exploder"
                          onClick={() => {
                            this.setBankInfo({
                              collaboratorId: data.id,
                              bankNumber: data.account_number,
                              bankName: data.bank,
                              bankOwner: data.account_name,
                            });
                          }}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                      </p>

                      <p
                        class="sale_user_label"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Số dư:{" "}
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
                        Tên CMND:{" "}
                        <span id="user_tel">{data.first_and_last_name}</span>
                      </p>

                      <p class="sale_user_label" id="sale_user_name">
                        CMND: <span id="user_name"> {data.cmnd} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Nơi đăng kí:{" "}
                        <span id="user_name"> {data.issued_by} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Ngày đăng ký CTV:{" "}
                        <span id="user_name">
                          {moment(data.created_at).format("DD-MM-YYYY")}{" "}
                        </span>
                      </p>
                      {address_default !== "" && (
                        <p class="sale_user_label" id="sale_user_name">
                          Địa chỉ:{" "}
                          <span id="user_name"> {address_default} </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-6">
                    <div class="info_user">
                      <div class="row">
                        <div
                          data-toggle="modal"
                          data-target="#modalImg"
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={() => this.showModalImg(img_front)}
                        >
                          <img
                            width="120"
                            height="125px"
                            src={img_front}
                            class="img-responsive"
                            alt="Image"
                          />
                          <p class="sale_user_label" id="sale_user_name">
                            Mặt trước:
                          </p>
                        </div>

                        <div
                          data-toggle="modal"
                          data-target="#modalImg"
                          style={{ textAlign: "center", cursor: "pointer" }}
                          onClick={() => this.showModalImg(img_back)}
                        >
                          <img
                            width="120px"
                            height="125px"
                            style={{ marginLeft: "10px" }}
                            src={img_back}
                            class="img-responsive"
                            alt="Image"
                          />
                          <p class="sale_user_label" id="sale_user_name">
                            Mặt sau:
                          </p>
                        </div>
                      </div>
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
                  {/* <a
                    href={`tel:${data.customer.phone_number}`}
                    class="btn btn-outline-primary btn-sm"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <i class="fa fa-phone"></i> Gọi ngay
                  </a> */}
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
  setShowSidebarListReferences = (showSidebarListReferences) => {
    this.setState({ showSidebarListReferences });
  };
  handleShowSidebarListReferences = (cusInfo) => {
    this.setState({ customerInfo: cusInfo });
    this.setShowSidebarListReferences(true);
  };
  setCustomerInfo = (cusInfo) => {
    this.setState({ customerInfo: cusInfo });
  };
  render() {
    var collaborators =
      typeof this.props.collaborators.data == "undefined"
        ? []
        : this.props.collaborators.data;
    const {
      collaboratorSelected,
      collaboratorSelectedForChangeBalance,
      bankInfo,
    } = this.state;
    return (
      <ListCollaboratorStyles class="" style={{ overflow: "auto" }}>
        <ModalImg img={this.state.modalImg}></ModalImg>
        <table class="table table-border">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>

              <th style={{ textAlign: "center" }}>Ảnh</th>

              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Số dư</th>

              <th>Mã giới thiệu</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(collaborators)}</tbody>
        </table>
        <ModalListReferences
          store_code={this.props.store_code}
          referral_phone_number={this.state.referral_phone_number}
        />
        <SidebarListReferences
          store_code={this.props.store_code}
          customerInfo={this.state.customerInfo}
          setCustomerInfo={this.setCustomerInfo}
          showSidebarListReferences={this.state.showSidebarListReferences}
          setShowSidebarListReferences={this.setShowSidebarListReferences}
        ></SidebarListReferences>
        {Object.entries(collaboratorSelected).length > 0 ? (
          <ModalHistoryBalance
            store_code={this.props.store_code}
            collaboratorSelected={collaboratorSelected}
            setCollaboratorSelected={this.setCollaboratorSelected}
          />
        ) : null}
        {Object.entries(collaboratorSelectedForChangeBalance).length > 0 ? (
          <ModalChangeBalance
            store_code={this.props.store_code}
            isSub={this.state.isSub}
            collaboratorSelectedForChangeBalance={
              collaboratorSelectedForChangeBalance
            }
            setCollaboratorSelectedForChangeBalance={
              this.setCollaboratorSelectedForChangeBalance
            }
          />
        ) : null}
        {Object.entries(bankInfo).length > 0 ? (
          <ModalChangeBankInfo
            storeCode={this.props.store_code}
            bankInfo={bankInfo}
            setBankInfo={this.setBankInfo}
            page={this.props.page}
            getParams={this.props.getParams}
            numPage={this.props.numPage}
            searchValue={this.props.searchValue}
          />
        ) : null}
      </ListCollaboratorStyles>
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
    updateCollaborator: (store_code, id, data, page, params) => {
      dispatch(
        collaboratorAction.updateCollaborator(
          store_code,
          id,
          data,
          page,
          params
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
