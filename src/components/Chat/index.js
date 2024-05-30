import React, { Component } from "react";
import moment from "moment";
import io from "socket.io-client";
import { connect } from "react-redux";
import $ from "jquery";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as chatAction from "../../actions/chat";
import ModalImg from "./ModalImg";
import * as Types from "../../constants/ActionType";
import ModalSendImg from "./ModalSendImg";
import Alert from "../../components/Partials/Alert";
import LoadMess from "../Loading/Chatbox/LoadMess";
import * as Env from "../../ultis/default";
import * as helpers from "../../ultis/helpers";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      showIcon: "show",
      showChat: "hide",
      showChatBox: "show",
      chat: {},
      newMessage: "",
      pag: 1,
      loading: false,
      img: "",
    };
    this.socket = null;
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  closeChat = () => {
    this.setState({ showIcon: "show", showChat: "hide" });
    if (typeof this.props.closeChatBox != "undefined")
      this.props.closeChatBox("hide");
  };

  closeIcon = () => {
    this.setState({ showIcon: "hide", showChat: "show" });
  };

  showListImg = (imgs) => {
    var result = <LoadMess />;
    if (typeof imgs == "undefined" || imgs == null) {
      return null;
    }
    if (imgs.length > 0) {
      console.log(imgs);
      var img = "";
      result = imgs.map((item, index) => {
        try {
          if (typeof item.link_images == "undefined") img = Env.IMG_NOT_FOUND;
          else img = item.link_images;

          return (
            <img
              style={{ cursor: "pointer", objectFit: "cover" }}
              data-toggle="modal"
              data-target="#ImgModal"
              onClick={() => this.showImg(img)}
              width="120px"
              height="135px"
              href={img}
              src={img}
              class="img-responsive img-chat"
              alt="Image"
            />
          );
        } catch (error) {
          return (
            <img
              style={{ cursor: "pointer", objectFit: "cover" }}
              width="120px"
              height="135px"
              src={Env.IMG_NOT_FOUND}
              class="img-responsive img-chat"
              alt="Image"
            />
          );
        }
      });
    }
    return result;
  };

  showImg = (img) => {
    this.setState({ img: img });
  };

  loadData = () => {
    var { chat } = this.state;
    var pag = this.state.pag + 1;

    var { store_code, customerId } = this.props;

    this.setState({ loading: true, pag: pag });
    this.props.fetchChatId(store_code, customerId, pag);
  };
  showMessages = (messages, customerImg, userImg) => {
    var result = null;

    if (typeof messages.data == "undefined") {
      return <LoadMess />;
    }
    var dateTimeOld = "";
    if (messages.data.length > 0) {
      var numPages = messages.last_page;
      console.log(numPages);
      var listMes = [...messages.data].reverse();
      result = listMes.map((mes, index) => {
        var isUser = mes.is_user == true ? "right-msg" : "left-msg";
        var isContent = mes.content == null ? "hide" : "show";
        var isImg = mes.link_images == null ? "hide" : "show";
        var backGroundImg = isImg == "show" ? "img-chat" : null;
        var showIconLoading = this.state.loading == true ? "show" : "hide";

        var listimg = "";
        try {
          listimg = mes.link_images == null ? [] : JSON.parse(mes.link_images);
        } catch (error) {
          listimg = [];
        }
        var time = moment(mes.created_at, "YYYY-MM-DD HH:mm:ss").format(
          "HH:mm"
        );
        var img = mes.is_user == true ? userImg : customerImg;
        var showLoading = index == 0 && numPages > 1 ? "show" : "hide";
        var date =
          moment(mes.created_at, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD") ==
          moment().format("YYYY-MM-DD")
            ? "Hôm nay"
            : moment(mes.created_at, "YYYY-MM-DD HH:mm:ss").format(
                "DD-MM-YYYY"
              );

        var showDateTime = date == dateTimeOld ? "hide" : "show";
        dateTimeOld = date;
        return (
          <React.Fragment>
            <div
              style={{ textAlign: "center", marginBottom: "10px" }}
              className={showLoading}
            >
              <img
                class={`img-profile rounded-circle ${showIconLoading}`}
                width="28px"
                src="https://icon-library.com/images/facebook-loading-icon/facebook-loading-icon-8.jpg"
              ></img>
              {numPages > this.state.pag ? (
                <a
                  onClick={this.loadData}
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "blue",
                  }}
                >
                  Xem thêm
                </a>
              ) : null}
            </div>
            <div
              style={{ textAlign: "center", marginBottom: "10px" }}
              className={showDateTime}
            >
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                {date}
              </span>
            </div>

            <div class={`msg ${isUser}`}>
              <div
                onClick={() => this.showListImg(img)}
                class="msg-img"
                style={{ backgroundImage: `url(${img})`, cursor: "pointer" }}
              ></div>

              <div
                class={`msg-bubble ${backGroundImg}`}
                style={{ maxWidth: "70%" }}
              >
                <div class={` ${isImg}`}>{this.showListImg(listimg)}</div>
                <div class={`msg-text ${isContent}`}>{mes.content}</div>
                <div class="msg-info">
                  <div class="msg-info-time">{time}</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });
    }
    return result;
  };

  componentDidMount() {
    this.setState({
      showChatBox: this.props.showChatBox,
    });
    var c = $(".msger-chat");
    c.scrollTop(c.prop("scrollHeight"), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;
      var chat_allow = permissions.chat_allow;

      this.setState({ isLoading: true, chat_allow });
    }

    if (
      typeof nextProps.showChatBox != "undefined" &&
      nextProps.showChatBox != this.props.showChatBox
    ) {
      if (nextProps.showChatBox == "show") {
        this.setState({
          showIcon: "hide",
          showChat: "show",
          showChatBox: "show",
        });
      }
    }
    if (nextProps.customerId != this.props.customerId) {
      this.socket = io(helpers.callUrlSocket(), {
        transports: ["websocket"],
      });
      this.socket.on(
        `chat:message_from_customer:${nextProps.customerId}`,
        (res) => this.changeMess(res)
      );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.chat, this.props.chat)) {
      console.log("3");

      if (nextState.pag !== 1) {
        var chat = { ...nextState.chat };

        var arrChat = [...nextProps.chat.data];
        var newArr = chat.data.concat(arrChat);
        console.log(nextState.pag, arrChat, newArr);

        chat.data = newArr;
        this.setState({ chat: chat, loading: false });
      } else {
        this.setState({ chat: nextProps.chat, loading: false });
      }
    }

    if (
      !shallowEqual(nextState.newMessage, this.state.newMessage) &&
      nextState.newMessage != ""
    ) {
      console.log("2");

      var messengers = { ...nextState.chat };
      var mess = { ...nextState.newMessage };
      var arr_mess = [...messengers.data];
      arr_mess.unshift(mess);

      messengers.data = arr_mess.slice(0, 20);

      this.setState({ chat: messengers });
    }

    if (
      !shallowEqual(nextProps.message, this.props.message) &&
      nextProps.message != {}
    ) {
      var messengers = { ...this.state.chat };
      var mess = { ...nextProps.message };
      var arr_mess = [...messengers.data];

      arr_mess.unshift(mess);
      messengers.data = arr_mess.slice(0, 20);

      this.setState({ chat: messengers });
    }

    return true;
  }
  componentDidUpdate(preveProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      var c = $(".msger-chat");
      c.scrollTop("1000000"); //scroll to max
      var scrollHeight = c.prop("scrollHeight");
      var diff = (scrollHeight - c.scrollTop()) / this.state.pag;
      var middle = scrollHeight / this.state.pag - diff;
      c.scrollTop(middle);
    } else {
      var c = $(".msger-chat");
      c.scrollTop(c.prop("scrollHeight"), 1000);
    }
  }

  changeMess = (data) => {
    this.setState({ newMessage: data });
  };

  sendMessage = (e) => {
    e.preventDefault();
    var { message } = this.state;
    var { store_code, customerId } = this.props;

    this.props.sendMessage(store_code, customerId, message);
    this.setState({ message: "" });
  };

  render() {
    var { showIcon, showChat, chat, img, message, showChatBox, chat_allow } =
      this.state;
    var { customerImg, user, customerId, store_code, customerName } =
      this.props;
    var customerImg =
      typeof customerImg == "undefined" || customerImg == null
        ? Env.IMG_NOT_FOUND
        : customerImg;
    var userImg =
      typeof user.avatar_image == "undefined" || user.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : user.avatar_image;

    return (
      <div className={`${showChatBox}`}>
        <section class={`msger msger_chat scrollChat ${showChat}`}>
          <header class="msger-header">
            <div class="msger-header-title">
              <i class="fas fa-comment-alt"></i> {customerName}
            </div>
            <div class="msger-header-options">
              <span onClick={this.closeChat} style={{ cursor: "pointer" }}>
                <i class="fas fa-times"></i>
              </span>
            </div>
          </header>

          <main class="msger-chat">
            {this.showMessages(chat, customerImg, userImg)}
          </main>

          <form onSubmit={this.sendMessage} class="msger-inputarea">
            <input
              value={message}
              name="message"
              onChange={this.onChange}
              type="text"
              class="msger-input"
              placeholder="Nhập tin nhắn..."
              required
              autoComplete="off"
            />
            <button
              type="button"
              data-toggle="modal"
              data-target="#modalSendingImg"
            >
              <i class="fa fa-camera" aria-hidden="true"></i>
            </button>
            <button type="submit" class="msger-send-btn">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </form>
        </section>
        <img
          title="Liên hệ khách hàng"
          onClick={this.closeIcon}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            cursor: "pointer",
          }}
          src="https://e7.pngegg.com/pngimages/397/178/png-clipart-computer-icons-message-chat-icon-miscellaneous-text-thumbnail.png"
          width="55px"
          height="55px"
          class={`img-responsive ${showIcon} ${
            chat_allow == true ? "show" : "hide"
          }`}
          alt="Image"
        />
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        <ModalImg img={img}></ModalImg>
        <ModalSendImg
          customerId={customerId}
          store_code={store_code}
        ></ModalSendImg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user.userID,
    message: state.chatReducers.chat.message,
    alert: state.chatReducers.alert.alert_send,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchChatId: (store_code, customerId, pag) => {
      dispatch(chatAction.fetchChatId(store_code, customerId, pag));
    },
    sendMessage: (store_code, customerId, message) => {
      dispatch(chatAction.sendMessage(store_code, customerId, message));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
