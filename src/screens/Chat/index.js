import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import Loading from "../Loading";
import * as chatAction from "../../actions/chat";
import * as Env from "../../ultis/default";
import ChatBox from "../../components/Chat/ChatBox";
import NotAccess from "../../components/Partials/NotAccess";
import * as helpers from "../../ultis/helpers";
import io from "socket.io-client";
import { getBranchId } from "../../ultis/branchUtils";
import * as notificationAction from "../../actions/notification";
import * as Types from "../../constants/ActionType";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
      isLoadFirstCustomer: false,
    };
    this.socket = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.listChat, this.props.listChat)) {
      if (
        typeof nextProps.listChat.data !== "undefined" &&
        nextProps.listChat.data.length > 0 &&
        this.state.isLoadFirstCustomer == false
      ) {
        var { store_code } = this.props.match.params;
        // var customerId = nextProps.listChat.data[0].customer_id
        var customer_id = this.props.match.params?.id;
        var customerId = customer_id || nextProps.listChat.data[0].customer_id;

        this.setState({
          isActive: customerId || customer_id,
          isLoadFirstCustomer: true,
        });

        this.props.fetchChatId(store_code, customerId);
      }
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.chat_list;
      this.setState({ isLoading: true, isShow });
    }
    if (
      !shallowEqual(this.props.user, nextProps.user) &&
      typeof nextProps.user.id !== "undefined"
    ) {
      var { store_code } = this.props.match.params;
      var branchId = getBranchId();
      this.socket = io(helpers.callUrlSocket(), {
        transports: ["websocket"],
      });
      this.socket.on(`badges:badges_user:${nextProps.user.id}`, (res) => {
        console.log(res);
        // this.props.fetchBadges({
        //   type: Types.FETCH_ALL_BADGE,
        //   data: res
        // });

        this.props.fetchAllChat(store_code, 1);
      });
    }
  }

  handleFetchChatId = (id) => {
    var { store_code } = this.props.match.params;
    this.setState({ isActive: id });
    this.props.fetchChatId(store_code, id);
  };

  handleFetchAllChat = (page) => {
    this.props.fetchAllChat(this.props.match.params.store_code, page);
  };

  componentDidMount() {
    this.props.fetchAllChat(this.props.match.params.store_code, 1);
    console.log(this.props.user);
  }

  getImg = (customerId) => {
    var { listChat } = this.props;
    var filter =
      (listChat.data ?? []).filter((v, i) => {
        return v.customer_id == customerId;
      })?.[0] ?? null;

    return filter;
  };

  render() {
    var { listChat, chat } = this.props;
    var { isActive, isShow } = this.state;
    var getCustomerImg = this.getImg(isActive);
    var customerImg =
      getCustomerImg == null
        ? Env.IMG_NOT_FOUND
        : getCustomerImg.customer?.avatar_image;
    var customerId =
      typeof listChat.data !== "undefined" && listChat.data.length > 0
        ? listChat.data[0].customer_id
        : null;
    var { store_code } = this.props.match.params;
    var customerParam = this.props.match.params.id || null;

    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div
            id="content-wrapper"
            className="d-flex flex-column"
            style={{ background: "#ebeced" }}
          >
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Chat với khách hàng
                    </h4>{" "}
                  </div>
                  <br></br>
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <ChatBox
                        isShow={isShow}
                        customerParam={customerParam}
                        handleFetchAllChat={this.handleFetchAllChat}
                        handleFetchChatId={this.handleFetchChatId}
                        isActive={isActive}
                        customerImg={customerImg}
                        customerId={customerId}
                        chat={chat}
                        store_code={store_code}
                        listChat={listChat}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    listChat: state.chatReducers.chat.allChat,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    user: state.userReducers.user.userID,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomer: (id) => {
      dispatch(chatAction.fetchAllCustomer(id));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(chatAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, customerId) => {
      dispatch(chatAction.fetchChatId(store_code, customerId));
    },
    fetchAllChat: (store_code, page) => {
      dispatch(chatAction.fetchAllChat(store_code, page));
    },
    fetchAllBadge: (store_code, branch_id) => {
      dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
    },
    fetchBadges: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
