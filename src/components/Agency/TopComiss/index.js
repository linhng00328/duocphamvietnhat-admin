import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import Chat from "../../Chat";
import * as Env from "../../../ultis/default";
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import moment from "moment";
import * as helper from "../../../ultis/helpers";
import SDateRangePicker from "../../DatePicker/DateRangePicker";
class TopCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      date_from: "",
      date_to: "",
    };
  }

  componentDidMount() {
    var date = helper.getDateForChartMonth();
    var params = `&date_from=${date.from}&date_to=${date.to}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
    });
  }
  closeChatBox = (status) => {
    this.setState({
      showChatBox: status,
    });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      from = null;
      to = null;
    }
    var params = `&date_from=${from}&date_to=${to}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: from,
      date_to: to,
    });
  };
  onChangeDateFromComponent = (date) => {
    // var from = "";
    // var to = "";
    // try {
    //   from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
    //   to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
    // } catch (error) {
    //     from = null
    //     to = null
    // }
    var params = `&date_from=${date.from}&date_to=${date.to}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
    });
  };

  exportTopten = () => {
    var { date_from, date_to } = this.state;
    var params = `&date_from=${date_from}&date_to=${date_to}`;
    this.props.exportTopten(this.props.store_code, 1, params);
  };
  render() {
    var { customer, chat, topReport, store_code, tabId, store_code, types } =
      this.props;

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

    var { showChatBox } = this.state;
    console.log(this.props.topReport);
    return (
      <div id="wrapper">
        <div className="" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SDateRangePicker onChangeDate={this.onChangeDateFromComponent} />

            <button
              style={{ margin: "auto 0px" }}
              onClick={this.exportTopten}
              class={`btn btn-danger btn-icon-split btn-sm `}
            >
              <span class="icon text-white-50">
                <i class="fas fa-file-export"></i>
              </span>
              <span style={{ color: "white" }} class="text">
                Export Excel
              </span>
            </button>
          </div>

          <Table
            types={types}
            tabId={tabId}
            showChatBox={showChatBox}
            handleShowChatBox={this.handleShowChatBox}
            store_code={store_code}
            topReport={topReport}
          />

          <Pagination store_code={store_code} topReport={topReport} />
        </div>

        <Chat
          customerName={customerName}
          customerImg={customerImg}
          customerId={customerId}
          chat={chat}
          store_code={store_code}
          closeChatBox={this.closeChatBox}
          showChatBox={showChatBox}
        ></Chat>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topReport: state.agencyReducers.agency.topCommission,
    auth: state.authReducers.login.authentication,
    chat: state.chatReducers.chat.chatID,
    customer: state.customerReducers.customer.customerID,
    types: state.agencyReducers.agency.allAgencyType,

    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllTopReport: (store_code, page, params) => {
      dispatch(agencyAction.fetchAllTopCommission(store_code, page, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, agencyId) => {
      dispatch(agencyAction.fetchChatId(store_code, agencyId));
    },
    exportTopten: (store_code, page, params) => {
      dispatch(agencyAction.exportTopten(store_code, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopCommission);
