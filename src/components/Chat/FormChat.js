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

class FormChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chat: { data: [] },
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
    var pag = this.state.pag + 1;
    var { store_code, customerId } = this.props;

    this.setState({ loading: true, pag: pag });
    this.props.fetchChatId(store_code, customerId, pag);
  };
  showMessages = (messages, customerImg, userImg) => {
    var result = null;

    if (typeof messages.data == "undefined" || messages == null) {
      return result;
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
        var unRead = this.props.unRead == true ? "Đã xem" : "Đã gửi";
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
              <a
                onClick={this.loadData}
                style={{
                  fontSize: "16px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "blue",
                }}
              >
                Xem thêm
              </a>
            </div>
            <div
              style={{ textAlign: "center", marginBottom: "10px" }}
              className={showDateTime}
            >
              <span
                style={{
                  fontSize: "14px",
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
                style={{ maxWidth: "35%" }}
              >
                <div class={` ${isImg}`}>{this.showListImg(listimg)}</div>
                <div class={`msg-text ${isContent}`}>{mes.content}</div>
                <div class="msg-info">
                  <div class="msg-info-time">{time}</div>
                  {isUser == "right-msg" && (
                    <div class="msg-info-time" style={{ marginLeft: "10px" }}>
                      {unRead}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });
    } else {
      result = (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <p>Chưa có tin nhắn nào!</p>
        </div>
      );
    }

    return result;
  };

  componentDidMount() {
    var c = $(".msger-chatbox");
    c.scrollTop(c.prop("scrollHeight"), 1000);
    console.log(this.props);
    if (this.props.chat?.data?.length > 0) {
      var chat = { ...this.state.chat };
      var arrChat = [...(this.props.chat.data ?? [])];
      var newArr = chat.data.concat(arrChat);
      chat.data = newArr;
      this.setState({ chat: chat, loading: false });
    }
    if (this.props.customerId != "" && this.props.customerId != null) {
      this.socket = io(helpers.callUrlSocket(), {
        transports: ["websocket"],
      });
      this.socket.on(
        `chat:message_from_customer:${this.props.customerId}`,
        (res) => {
          console.log(res);
          this.changeMess(res);
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customerId != this.props.customerId) {
      this.socket = io(helpers.callUrlSocket(), {
        transports: ["websocket"],
      });
      this.socket.on(
        `chat:message_from_customer:${nextProps.customerId}`,
        (res) => {
          console.log(res);
          this.changeMess(res);
        }
      );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.chat, this.props.chat)) {
      console.log("chat ne", nextProps.chat);

      if (nextState.pag !== 1) {
        var chat = { ...nextState.chat };
        console.log(chat);
        var arrChat = [...nextProps.chat.data];
        var newArr = chat.data.concat(arrChat);
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
      console.log("chat ne", nextProps.message);

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
      var c = $(".msger-chatbox");
      c.scrollTop("1000000"); //scroll to max
      var scrollHeight = c.prop("scrollHeight");
      var diff = (scrollHeight - c.scrollTop()) / this.state.pag;
      var middle = scrollHeight / this.state.pag - diff;
      c.scrollTop(middle);
    } else {
      var c = $(".msger-chatbox");
      c.scrollTop(c.prop("scrollHeight"), 1000);
    }

    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var chat_allow = permissions.chat_allow;

      this.setState({ isLoading: true, chat_allow });
    }
  }

  changeMess = (data) => {
    this.setState({ newMessage: data });
  };

  sendMessage = (e) => {
    e.preventDefault();
    var { message } = this.state;
    var { store_code, customerId, isActive } = this.props;

    this.props.sendMessage(store_code, isActive, message);
    this.setState({ message: "" });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      const textArea = e.target;
      const startPos = textArea.selectionStart;
      const endPos = textArea.selectionEnd;
      const oldValue = textArea.value;

      const newValue =
        oldValue.substring(0, startPos) + "\n" + oldValue.substring(endPos);

      this.setState({
        message: newValue,
      });

      textArea.selectionStart = textArea.selectionEnd = startPos + 1;

      e.preventDefault();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage(e);
    }
  };

  render() {
    var { chat, img, message, chat_allow } = this.state;
    var { customerImg, user, customerId, store_code, listChat } = this.props;
    var customerImg =
      typeof customerImg == "undefined" || customerImg == null
        ? Env.IMG_NOT_FOUND
        : customerImg;
    var userImg =
      typeof user.avatar_image == "undefined" || user.avatar_image == null
        ? Env.IMG_NOT_FOUND
        : user.avatar_image;

    var showInputChat = listChat.length == 0 ? "hide" : "show";

    return (
      <React.Fragment>
        <div
          className="chat-panel msger-chatbox"
          style={{ height: "505px", overflow: "auto", padding: "15px" }}
        >
          {this.showMessages(chat, customerImg, userImg)}
        </div>

        <div className="row">
          <div className="col-12">
            <form onSubmit={this.sendMessage}>
              <div
                className={`chat-box-tray ${showInputChat}  ${
                  chat_allow == true ? "show" : "hide"
                }`}
              >
                {/* <input
                  value={message}
                  style={{ width: "90%" }}
                  name="message"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  required
                  autoComplete="off"
                /> */}
                <textarea
                  value={message}
                  name="message"
                  onKeyDown={this.handleKeyDown}
                  onChange={this.onChange}
                  style={{
                    resize: "none",
                    boxSizing: "border-box",
                    height: "auto",
                    minHeight: "41px",
                    maxHeight: "97px",
                    width: "90%",
                    border: "1px solid #e4e7ec",
                    borderRadius: "10px",
                    backgroundColor: "#f9fafb",
                    outline: "none",
                    padding: "12px 24px 0 24px",
                    overflow: "hidden",
                  }}
                >
                  fdsfds
                </textarea>

                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#modalSendingImg"
                >
                  <i class="fa fa-camera" aria-hidden="true"></i>
                </button>
                <button type="submit" style={{ marginLeft: "20px" }}>
                  <i
                    style={{ color: "green" }}
                    class="fa fa-paper-plane"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </form>
          </div>
          <ModalImg img={img}></ModalImg>
          <ModalSendImg
            customerId={customerId}
            store_code={store_code}
          ></ModalSendImg>
        </div>
      </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(FormChat);
