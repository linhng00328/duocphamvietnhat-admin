import React, { Component } from "react";
import { connect } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import Chat from "../../Chat";
import * as Env from "../../../ultis/default";
import Table from "./Table";
import * as customerAction from "../../../actions/customer";
import Pagination from "./Pagination";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";
import * as helper from "../../../ultis/helpers";
import SDateRangePicker from "../../../components/DatePicker/DateRangePicker";
class ListAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChatBox: "hide",
      date_from: "",
      date_to: "",
      report_type: "order",
      params:"",
      agency_type_id:""
    };
  }

  componentDidMount() {
    var date = helper.getDateForChartMonth();
    var params = `&date_from=${date.from}&date_to=${date.to}&agency_type_id=${this.state.agency_type_id}&report_type=${this.state.report_type}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
      params:params
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
    var params = `&date_from=${from}&date_to=${to}&agency_type_id=${this.state.agency_type_id}&report_type=${this.state.report_type}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: from,
      date_to: to,
      params:params
    });
  };


  onChangeType = (e) =>{
    var {value} = e.target
    var {
        date_from,
        date_to
    } = this.state
    var params = `&date_from=${date_from}&date_to=${date_to}&agency_type_id=${this.state.agency_type_id}&report_type=${value}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
        report_type : value,
        params:params
    });
  }

  onChangeAgencyType = (e) =>{
    var {value} = e.target
    var {
        date_from,
        date_to
    } = this.state
    var params = `&date_from=${date_from}&date_to=${date_to}&agency_type_id=${value}&report_type=${this.state.report_type}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      agency_type_id : value,
        params:params
    });
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
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
    var params = `&date_from=${date.from}&date_to=${date.to}&agency_type_id=${this.state.agency_type_id}&report_type=${this.state.report_type}`;
    this.props.fetchAllTopReport(this.props.store_code, 1, params);
    this.setState({
      date_from: date.from,
      date_to: date.to,
      params:params
    });
  };
  exportTopten = () => {
    var { date_from, date_to } = this.state;
    var params = `&date_from=${date_from}&date_to=${date_to}&agency_type_id=${this.state.agency_type_id}&report_type=${this.state.report_type}&limit=100000`;
    this.props.exportTopten(this.props.store_code, 1, params , this.state.report_type);
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


    var { showChatBox, report_type , agency_type_id,  params} = this.state;
    console.log(this.props.topReport);
    return (
      <div id="wrapper">
        <div className="" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "15px", display: "flex" }}>
                <span
                  style={{
                    "min-width": "80px",
                    "fontWeight" : 600,
                    margin: "auto",
                  }}
                >
                  Thời gian:{" "}
                </span>
                <SDateRangePicker onChangeDate={this.onChangeDateFromComponent} />

              </div>
              <div style={{ marginLeft: "15px", display: "flex" }}>
                <span
                  style={{
                    "min-width": "100px",
                    "fontWeight" : 600,

                    margin: "auto",
                  }}
                >
                  Báo cáo theo:{" "}
                </span>
                <select
                    onChange={this.onChangeType}
                  name="report_type"
                  value={report_type}
                  className="form-control"
                >
                  <option value="order">Đơn hàng</option>
                  <option value="point">Xu</option>
                </select>
              </div>
              <div style={{ marginLeft: "15px", display: "flex" }}>
                <span
                  style={{
           
                    "fontWeight" : 600,

                    margin: "auto",
                  }}
                >
                  Cấp: {" "}
                </span>
                <select
                  onChange={this.onChangeAgencyType}
                  value={agency_type_id}
                  name="agency_type_id"
                  class="form-control"
                >
                  <option value="">Chọn cấp đại lý</option>
                  {types.map((v) => {
                    return <option value={v.id}>{v.name}</option>;
                  })}
                </select>
              </div>
            </div>
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
          <div className="card-body">
            <Table
            report_type = {report_type}
              types={types}
              tabId={tabId}
              showChatBox={showChatBox}
              handleShowChatBox={this.handleShowChatBox}
              store_code={store_code}
              topReport={topReport}
            />

            <Pagination store_code={store_code} topReport={topReport} params={params}/>
          </div>
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
    topReport: state.agencyReducers.agency.topReport,
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
      dispatch(agencyAction.fetchAllTopReport(store_code, page, params));
    },
    fetchCustomerId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerId(store_code, customerId));
    },
    fetchChatId: (store_code, agencyId) => {
      dispatch(agencyAction.fetchChatId(store_code, agencyId));
    },
    exportTopten: (store_code, page, params , report_type) => {
      dispatch(agencyAction.exportTopten(store_code, page, params,report_type));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListAgency);
