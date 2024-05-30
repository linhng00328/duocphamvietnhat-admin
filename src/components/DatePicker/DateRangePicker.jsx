import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { shallowEqual } from "../../ultis/shallowEqual";
import { format } from "../../ultis/helpers";
import moment from "moment";
import * as helper from "../../ultis/helpers";
import * as reportAction from "../../actions/report";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

class SDateRangePicker extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      nameTypeChart: "THÁNG NÀY",
      showDateTime: "hide",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    this.setState({
      showDateTime: "hide",
    });
  }

  onchangeTypeTop = (value) => {
    this.setState({
      typeTop: value,
    });
  };

  onchangeDate = (e) => {
    var { value } = e.target;

    var date = "";
    switch (value) {
      case "HOM-NAY":
        this.setState({ nameTypeChart: "HÔM NAY" });
        date = helper.getDateForChartHour();
        break;
      case "TUAN-NAY":
        this.setState({ nameTypeChart: "TUẦN NÀY" });

        date = helper.getDateForChartWeek();
        break;
      case "THANG-NAY":
        this.setState({ nameTypeChart: "THÁNG NÀY" });

        date = helper.getDateForChartMonth();
        break;
      case "NAM-NAY":
        this.setState({ nameTypeChart: "NĂM NÀY" });
        date = helper.getDateForChartYear();
        break;
      case "TUY-CHINH":
        this.setState({ nameTypeChart: "", showDateTime: "show" });
        return;
      default:
        break;
    }
    if (this.state.showDateTime == "hide") {
    } else this.setState({ showDateTime: "hide" });

    if (value != "TUY-CHINH")
      this.props.onChangeDate({
        from: date.from,
        to: date.to,
      });
  };
  onchangeDateFromTo = (e) => {
    var from = "";
    var to = "";
    try {
      from = moment(e.value[0], "DD-MM-YYYY").format("YYYY-MM-DD");
      to = moment(e.value[1], "DD-MM-YYYY").format("YYYY-MM-DD");
    } catch (error) {
      var date = helper.getDateForChartMonth();
      var { from, to } = date;
    }

    this.props.onChangeDate({
      from: from,
      to: to,
    });
  };
  render() {
    var { showDateTime } = this.state;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: this.props.row ? "row-reverse" : "column",
          gap: "10px",
        }}
      >
        <div className={showDateTime}>
          <DateRangePickerComponent
            id="daterangepicker"
            placeholder="Chọn từ ngày... đến ngày..."
            format="dd/MM/yyyy"
            onChange={this.onchangeDateFromTo}
          />
        </div>
        <select
          onChange={this.onchangeDate}
          style={{ maxWidth: "170px" }}
          name=""
          id="input"
          class="form-control"
          required="required"
        >
          <option value="THANG-NAY">Tháng này</option>
          <option value="HOM-NAY">Hôm nay</option>
          <option value="TUAN-NAY">Tuần này</option>
          <option value="NAM-NAY">Năm này</option>
          <option value="TUY-CHINH">Tùy chỉnh</option>
        </select>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(SDateRangePicker);
