import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default";
import * as helper from "../../../ultis/helpers";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { format, randomString, formatNumberV2 } from "../../../ultis/helpers";
import { connect } from "react-redux";
import * as collaboratorAction from "../../../actions/collaborator";
import ModalImg from "../ModalImg";
import moment from "moment";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";

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
      isSub: true,
    };
  }
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

  handleCollaboratorRegisterRequest = (id, status) => {
    this.props.handleCollaboratorRegisterRequest(
      this.props.store_code,
      id,
      status
    );
  };

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

  showData = (collaboratorRegisterRequests) => {
    var { store_code } = this.props;
    const permissionChangeBalance =
      this.props?.permission?.collaborator_add_sub_balance || false;
    var result = null;
    if (collaboratorRegisterRequests.length > 0) {
      result = collaboratorRegisterRequests.map((data2, index) => {
        var data = data2?.collaborator;
        var avatar =
          data?.customer?.avatar_image == null
            ? Env.IMG_NOT_FOUND
            : data?.customer?.avatar_image;
        var img_front =
          data?.front_card == null ? Env.IMG_NOT_FOUND : data?.front_card;
        var img_back =
          data?.back_card == null ? Env.IMG_NOT_FOUND : data?.back_card;

        var address_default = "";

        if (data?.customer != null && typeof data?.customer != "undefined") {
          if (
            data?.customer?.address_detail !== null &&
            data?.customer?.address_detail !== ""
          ) {
            address_default =
              address_default + data.customer.address_detail + ", ";
          }
          if (
            data?.customer?.wards_name !== null &&
            data?.customer?.wards_name !== ""
          ) {
            address_default =
              address_default + data?.customer?.wards_name + ", ";
          }
          if (
            data?.customer?.district_name !== null &&
            data?.customer?.district_name !== ""
          ) {
            address_default =
              address_default + data?.customer?.district_name + ", ";
          }
          if (
            data?.customer?.province_name !== null &&
            data?.customer?.province_name !== ""
          ) {
            address_default = address_default + data?.customer?.province_name;
          }
        }
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
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
              <td>{data?.customer?.name}</td>
              <td>{data?.account_name}</td>
              <td>{data?.customer?.phone_number}</td>
              <td>
                {data?.customer?.total_after_discount_no_bonus
                  ? `${formatNumberV2(
                      data?.customer?.total_after_discount_no_bonus
                    )}đ`
                  : ""}
              </td>
              <td>
                {data2.status == 0 ? (
                  <span style={{ color: "#e2950f" }}>Chờ duyệt</span>
                ) : data2.status == 1 ? (
                  <span style={{ color: "#E6430C" }}>Đã hủy</span>
                ) : data2.status == 3 ? (
                  <span style={{ color: "#E6430C" }}>Yêu cầu duyệt lại</span>
                ) : data2.status == 2 ? (
                  <span style={{ color: "#1A9F10" }}>Đã duyệt</span>
                ) : (
                  ""
                )}
              </td>
              <td>
                {data2.status == 0 || data2.status == 3 ? (
                  <div>
                    <button
                      style={{ margin: "2px 0" }}
                      onClick={() => {
                        this.handleCollaboratorRegisterRequest(data2.id, 1);
                      }}
                      class="btn btn-outline-danger btn-sm"
                    >
                      <i class="fa fa-remove"></i> Hủy
                    </button>
                    &nbsp;
                    <button
                      style={{ margin: "2px 0" }}
                      onClick={() => {
                        this.handleCollaboratorRegisterRequest(data2.id, 2);
                      }}
                      class="btn btn-outline-info btn-sm"
                    >
                      <i class="fa fa-check"></i> Duyệt
                    </button>
                    &nbsp;
                  </div>
                ) : (
                  ""
                )}
              </td>
              <td>{getDDMMYYYHis(data2.created_at)}</td>
            </tr>

            <tr class="explode hide">
              <td colSpan={8}>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="info_user">
                      <p class="sale_user_label">
                        Số tài khoản:{" "}
                        <span id="user_tel">
                          {data?.account_number} - {data?.bank}{" "}
                        </span>
                      </p>
                      <p class="sale_user_label">
                        Tên chủ tài khoản:{" "}
                        <span id="user_tel">{data?.account_name}</span>
                      </p>

                      <p class="sale_user_label">
                        Tên CMND:{" "}
                        <span id="user_tel">{data?.first_and_last_name}</span>
                      </p>

                      <p class="sale_user_label" id="sale_user_name">
                        CMND: <span id="user_name"> {data?.cmnd} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Nơi đăng kí:{" "}
                        <span id="user_name"> {data?.issued_by} </span>
                      </p>
                      <p class="sale_user_label" id="sale_user_name">
                        Ngày đăng ký CTV:{" "}
                        <span id="user_name">
                          {moment(data?.created_at).format("DD-MM-YYYY")}{" "}
                        </span>
                      </p>
                      {/* {address_default !== "" && (
                        <p class="sale_user_label" id="sale_user_name">
                          Địa chỉ:{" "}
                          <span id="user_name"> {address_default} </span>
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
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
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  setCustomerInfo = (cusInfo) => {
    this.setState({ customerInfo: cusInfo });
  };
  render() {
    var collaborators =
      typeof this.props.collaborators.data == "undefined"
        ? []
        : this.props.collaborators.data;
    const { collaboratorSelected, collaboratorSelectedForChangeBalance } =
      this.state;
    return (
      <ListCollaboratorStyles class="" style={{ overflow: "auto" }}>
        <ModalImg img={this.state.modalImg}></ModalImg>
        <table class="table table-border">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Tên profile</th>
              <th>Tên tài khoản</th>
              <th>Số điện thoại</th>
              <th>Doanh số</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
              <th>Thời gian yêu cầu</th>
            </tr>
          </thead>

          <tbody>{this.showData(collaborators)}</tbody>
        </table>
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
    handleCollaboratorRegisterRequest: (store_code, id, status) => {
      dispatch(
        collaboratorAction.handleCollaboratorRegisterRequest(
          store_code,
          id,
          status
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
