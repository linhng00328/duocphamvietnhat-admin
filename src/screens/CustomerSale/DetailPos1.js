import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as customerAction from "../../actions/customer";
import Chat from "../../components/Chat";
import * as Env from "../../ultis/default";
import moment from "moment";
import NotAccess from "../../components/Partials/NotAccess";
import {getQueryParams} from "../../ultis/helpers"

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtUserName: "",
      txtAreaCode: "",
      txtPhone: "",
      txtEmail: "",
      txtName: "",
      txtDateOfBirth: "",
      txtAvarta: "",
      txtPoints: "",
      txtSex: "",
      txtIsCollaborator: "",
      txtDefault_address: "",
      showChatBox: "hide",
      openModal : false
    };
  }






  componentDidMount() {
    var { store_code, customerId } = this.props.match.params;
    this.props.fetchCustomerId(store_code, customerId);
    this.props.fetchChatId(store_code, customerId);
  }

  componentWillReceiveProps(nextProps) {
    var { customer } = nextProps;
    console.log(customer.date_of_birth);
    this.setState({
      id: customer.id,
      txtUserName: customer.username,
      txtAreaCode: customer.area_code,
      txtPhone: customer.phone_number,
      txtEmail: customer.email,
      txtName: customer.name,
      txtDateOfBirth:
        customer.date_of_birth != null && customer.date_of_birth != ""
          ? moment(customer.date_of_birth, "YYYY-MM-DD HH:mm:ss").format(
              "DD-MM-YYYY"
            )
          : null,
      txtAvarta: customer.avatar_image,
      txtPoints: customer.points,
      txtSex: customer.sex,
      txtIsCollaborator: customer.is_collaborator,
      txtDefault_address: customer.default_address,
    });
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var chat_allow = permissions.chat_allow;

      var isShow = permissions.customer_list;
      this.setState({ isLoading: true, isShow, chat_allow });
    }
  }

  goBack = () => {
    var { history } = this.props;
    var { store_code } = this.props.match.params;

 
    history.replace(`/customer/${store_code}/?pag=${getQueryParams("pag")}`);
  };

  closeChatBox = () => {
    this.setState({
      showChatBox: "show",
    });
  };
  render() {
    var { store_code } = this.props.match.params;
    var { showChatBox, isShow, chat_allow } = this.state;
    var { chat } = this.props;

    var {
      id,
      txtPhone,
      txtEmail,
      txtName,
      txtDateOfBirth,
      txtAvarta,
      txtPoints,
      txtSex,
      txtIsCollaborator,
      txtDefault_address,
    } = this.state;
    var txtAvarta =
      txtAvarta == null || txtAvarta == "" ? Env.IMG_NOT_FOUND : txtAvarta;

    var txtDateOfBirth =
      txtDateOfBirth == null || txtDateOfBirth == ""
        ? "Chưa cập nhật"
        : txtDateOfBirth;
    var txtSex = txtSex == null || txtSex == "" ? "Trống" : txtSex;

    var txtIsCollaborator =
      txtIsCollaborator == null || txtIsCollaborator == "" ? "Không" : "Có";
    var txtSex = txtSex == 1 ? "Nam" : txtSex == 2 ? "Nữ" : "Khác";
    var address_default = "";
    if (typeof txtDefault_address === "object" && txtDefault_address !== null) {
      if (
        txtDefault_address.address_detail !== null &&
        txtDefault_address.address_detail !== ""
      ) {
        address_default =
          address_default + txtDefault_address.address_detail + ", ";
      }
      if (
        txtDefault_address.wards_name !== null &&
        txtDefault_address.wards_name !== ""
      ) {
        address_default =
          address_default + txtDefault_address.wards_name + ", ";
      }
      if (
        txtDefault_address.district_name !== null &&
        txtDefault_address.district_name !== ""
      ) {
        address_default =
          address_default + txtDefault_address.district_name + ", ";
      }
      if (
        txtDefault_address.province_name !== null &&
        txtDefault_address.province_name !== ""
      ) {
        address_default = address_default + txtDefault_address.province_name;
      }
    }
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
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
                        Khách hàng
                      </h4>{" "}
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 title_content font-weight-bold text-primary">
                          Thông tin khách hàng
                        </h6>
                      </div>
                      <div className="card-body">
                        <table class="table table-bordered table-condensed table-hovered">
                          <tbody>
                            <tr>
                              <th>Ảnh đại diện</th>
                              <td>
                                <img
                                  src={`${txtAvarta}`}
                                  width="100px"
                                  height="100px"
                                  class="img-responsive"
                                  alt="Image"
                                />
                              </td>
                            </tr>

                            <tr>
                              <th>Tên người dùng</th>
                              <td>{txtName}</td>
                            </tr>

                            <tr>
                              <th>Số điện thoại</th>
                              <td>{txtPhone}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{txtEmail}</td>
                            </tr>
                         
                          
                            <tr>
                              <th>Địa chỉ</th>
                              <td>{address_default}</td>
                            </tr>
                            <tr>
                              <th>Điểm</th>
                              <td>{txtPoints || 0}</td>
                            </tr>
                         
                         
                          </tbody>
                        </table>

                        <div class="box-footer">
                          <button
                          style = {{marginTop : "10px"}}
                            onClick={this.goBack}
                            type="button"
                            class="btn btn-primary btn-sm"
                          >
                            <i class="fa fa-arrow-left"></i>
                            Trở về
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <Chat
              customerName={txtName}
              customerImg={txtAvarta}
              customerId={id}
              chat={chat}
              store_code={store_code}
              closeChatBox={this.closeChatBox}
              showChatBox={showChatBox}
            ></Chat>
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
    customer: state.customerReducers.customer.customerID,
    auth: state.authReducers.login.authentication,
    state,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(customerAction.fetchChatId(store_code, customerId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
