import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as notificationAction from "../../actions/notification";
import moment from "moment";
import { shallowEqual } from "../../ultis/shallowEqual";
import { Link } from "react-router-dom";
import history from "../../history";
import { getBranchId } from "../../ultis/branchUtils";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import * as Types from "../../constants/ActionType";
import * as helpers from "../../ultis/helpers";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      notifications: {},
      notification_unread: 0,
      type: {
        NEW_PERIODIC_SETTLEMENT: `/collaborator/${this.props.store_code}?tab-index=3&from=1`,
        NEW_POST: `/posts/edit/${this.props.store_code}`,
        ORDER_STATUS: `/order/detail/${this.props.store_code}`,
        NEW_MESSAGE: `/chat/${this.props.store_code}`,
        CUSTOMER_CANCELLED_ORDER: `/order/detail/${this.props.store_code}`,
        CUSTOMER_PAID: `/order/detail/${this.props.store_code}`,
        NEW_ORDER: `/order/detail/${this.props.store_code}`,
        REFUND_ORDER: `/order/detail/${this.props.store_code}`,
        GET_AGENCY: `/agency/${this.props.store_code}?tab-index=2`,
        GET_CTV: `/collaborator/${this.props.store_code}?tab-index=2`,
        REQUEST_PAY_AGENCY: `/agency/${this.props.store_code}?tab-index=6`,
        REQUEST_PAY_CTV: `/collaborator/${this.props.store_code}?tab-index=4`,
      },
    };
    this.socket = null;
  }

  componentDidMount = () => {
    var { badges } = this.props;
    this.setState({
      notification_unread: badges.notification_unread,
    });
    document.addEventListener("mousedown", this.handleClickOutside, true);
  };

  handleClickOutside = (event) => {
    try {
      if (window.$(".dropdown .menu-notification").hasClass("show")) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
          {
            window.$(".dropdown .menu-notification").removeClass("show");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.notification_to_stote != "undefined"
    ) {
      var permissions = this.props.permission;
      var allow_notification = permissions.notification_to_stote;

      this.setState({ isLoading: true, allow_notification });
    }
  }

  fetchNotification = (e) => {
    window.$(".notification-toggle").dropdown("toggle");
    this.props.fetchAllNotification(this.props.store_code);
  };
  closeDialog = (e) => {
    window.$(".dropdown .menu-notification").removeClass("show");
  };
  onchangeRouter = (back, value, to, type) => {
    const location = window.location.pathname;

    if (
      type == "GET_CTV" ||
      type == "GET_AGENCY" ||
      type == "REQUEST_PAY_AGENCY" ||
      type == "REQUEST_PAY_CTV"
    ) {
      history.push(to);
      return;
    }
    if (
      type == "GOOD_NIGHT_USER" ||
      type == "COUNT_ORDER_END_DAY" ||
      typeof this.state.type[type] === "undefined"
    ) {
      return;
    }
    if (location == back) {
    } else if (location.includes(to)) {
      history.push("/");

      setTimeout(() => {
        history.replace(back);
      });
    } else {
      history.push(back);
    }
  };
  showData = (listNotification) => {
    var { store_code } = this.props;
    if (typeof listNotification == "undefined") {
      return <Loading />;
    }
    var result = null;
    if (listNotification.data.length > 0) {
      result = listNotification.data.map((data, index) => {
        var active = data.unread == true ? "font-weight-bold" : "";
        var active_plus = data.unread == true ? "show" : "hide";
        var created_at = data.created_at;

        var datetime = moment(created_at, "YYYY-MM-DD HH:mm:ss").format(
          "DD-MM-YYYY HH:mm"
        );
        var dateNow = moment().format("DD-MM-YYYY HH:mm");
        var time =
          moment(created_at, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY") ==
          moment().format("DD-MM-YYYY")
            ? moment(created_at, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
            : moment(created_at, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY") ==
              moment().subtract(1, "days").format("DD-MM-YYYY")
            ? "Hôm qua " +
              moment(created_at, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
            : datetime;
        var type = this.state.type;
        var to = type[data.type] || "/";
        console.log(listNotification);
        return (
          <a
            onClick={() =>
              this.onchangeRouter(
                `${to}${
                  data.references_value ? `/${data.references_value}` : ""
                }`,
                data.references_value,
                to,
                data.type
              )
            }
            key={index}
            class="dropdown-item d-flex align-items-center "
          >
            {/* // <Link key={index} class="dropdown-item d-flex align-items-center " to={`${to}/${data.references_value}`}> */}

            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-weight-bold">{data.title}</span>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                  class={`status-indicator bg-danger ${active_plus}`}
                ></div>
              </div>
              <div class={active}>
                <div class="truncate">{data.content}.</div>
              </div>

              <div class="small text-gray-500">{time}</div>
            </div>
          </a>
        );
      });
    } else {
      return (
        <a class="dropdown-item text-center small text-gray-500" href="#">
          Không có thông báo !
        </a>
      );
    }
    return result;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoadNotification !== this.props.isLoadNotification) {
      const branch_id = getBranchId();
      this.props.fetchAllBadge(this.props.store_code, branch_id);
    }

    if (nextProps.isLoadNotification != this.props.isLoadNotification) {
      window.$(".dropdown>.dropdown-menu").removeClass("show");
    }

    if (nextProps.branchId != this.props.branchId) {
      const branch_id = nextProps.branchId;
      this.props.fetchAllBadge(this.props.store_code, branch_id);
    }

    if (
      !shallowEqual(this.props.user, nextProps.user) &&
      typeof nextProps.user.id !== "undefined" &&
      this.socket == null
    ) {
      this.socket = io(helpers.callUrlSocket(), {
        transports: ["websocket"],
      });
      this.socket.on(`badges:badges_user:${nextProps.user.id}`, (res) => {
        console.log(res);
        this.props.fetchBadges({
          type: Types.FETCH_ALL_BADGE,
          data: res,
        });
      });
    }
  }

  loadNotification = () => {
    var last_page = this.props.notifications.list_notification.last_page;
    var { page } = this.state;
    if (page < last_page) {
      this.setState({
        page: page + 1,
      });
      this.props.fetchAllNotification(this.props.store_code, page + 1);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.notifications, this.props.notifications) &&
      nextState.page == 1
    ) {
      this.setState({
        notifications: nextProps.notifications,
      });
    }
    if (
      nextState.page != 1 &&
      !shallowEqual(nextProps.notifications, this.props.notifications)
    ) {
      console.log(nextState.page);
      var notificationsState = [
        ...nextState.notifications.list_notification.data,
      ];
      var notificationsProps = [
        ...nextProps.notifications.list_notification.data,
      ];

      var newNotificationsState = notificationsState.concat(notificationsProps);

      var notifications = { ...nextState.notifications };
      notifications.list_notification.data = newNotificationsState;
      this.setState({
        notifications,
      });
    }
    return true;
  }
  render() {
    var { disable, badges } = this.props;
    var { notifications, allow_notification } = this.state;
    var { total_unread, list_notification } = notifications;
    var { notification_unread } = this.state;
    if (typeof list_notification != "undefined")
      var disableLoad = list_notification.last_page == 1 ? false : true;
    return (
      <li
        class={`nav-item dropdown no-arrow mx-1 ${disable} ${
          allow_notification == true ? "show" : "hide"
        }`}
      >
        <a
          key={Math.random()}
          onClick={this.fetchNotification}
          style={{ fontSize: "18px" }}
          class="nav-link notification-toggle dropdown-toggle"
          aria-haspopup="false"
          aria-expanded="true"
        >
          <i style={{ color: "#8f8787" }} class="fa fa-bell"></i>
          <span
            class={`badge badge-danger badge-counter ${
              badges?.notification_unread == 0 ? "hide" : "show"
            }`}
          >
            {badges?.notification_unread || 0}
          </span>
        </a>
        <div
          style={{
            maxHeight: "600px",
            overflow: "auto",
          }}
          class="dropdown-list dropdown-menu menu-notification dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="messagesDropdown"
        >
          <div>
            <h5 style={{ fontSize: "13px" }} class="dropdown-header">
              Thông báo
              <i
                onClick={this.closeDialog}
                style={{ cursor: "pointer", fontSize: "16px", float: "right" }}
                class="fa fa-times"
              ></i>
            </h5>
          </div>

          <div
            style={{
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            {this.showData(list_notification)}
          </div>

          <a
            onClick={this.loadNotification}
            class={`dropdown-item text-center small text-gray-500 ${
              disableLoad == false ? "hide" : "show"
            }`}
          >
            Xem thêm thông báo
          </a>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    permission: state.authReducers.permission.data,
    user: state.userReducers.user.userID,

    notifications: state.notificationReducers.allNotificaiton,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllNotification: (store_code, page) => {
      dispatch(notificationAction.fetchAllNotification(store_code, page));
    },
    fetchAllBadge: (store_code, branch_id) => {
      dispatch(notificationAction.fetchAllBadge(store_code, branch_id));
    },
    fetchBadges: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
