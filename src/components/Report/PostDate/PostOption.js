import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as helpers from "../../../ultis/helpers";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCompare: "hide",
      datePrime: "",
      dateCompare: "",
      chooseCompare : false

    };
  }

  initialState = () =>{
    var dateCompare = {
      from: moment().format("DD-MM-YYYY"),
      to: moment().format("DD-MM-YYYY"),
    };
    var datePrime = {
      from: moment().format("DD-MM-YYYY"),
      to: moment().format("DD-MM-YYYY"),
    };
    this.setState({
      isShowCompare: "hide",
      datePrime,
      dateCompare,
      chooseCompare : false

    });
  }
  componentDidMount() {
    this.initialState()
  }
  componentWillReceiveProps(nextProps)
  {
      if(this.props.reset != nextProps.reset && nextProps.isOption == "show")
      {
          this.initialState()

      }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState, this.state))
      this.props.handlePostDate({
        datePrime: nextState.datePrime,
        dateCompare: nextState.dateCompare,
        isShowCompare : nextState.isShowCompare
      });

    return true;
  }
  chooseCompare = (e) => {
    var { checked } = e.target;
    var {datePrime} = this.state
    if (checked) this.setState({ isShowCompare: "show" , dateCompare : datePrime  , chooseCompare : true});
    else this.setState({ isShowCompare: "hide"  , chooseCompare : false});

  };
  onChangeDateCompare = (e) => {
    try {
      var from = moment(e.value[0], "DD-MM-YYYY").format("DD-MM-YYYY");
      var to = moment(e.value[1], "DD-MM-YYYY").format("DD-MM-YYYY  ");
      this.setState({
        dateCompare: {
          from,
          to,
        },
      });
    } catch (error) {
      this.setState({
        dateCompare: {
          from: moment().format("DD-MM-YYYY"),
          to: moment().format("DD-MM-YYYY"),
        },
      });
    }
  };

  onChangeDatePrime = (e) => {
    try {
      var from = moment(e.value[0], "DD-MM-YYYY").format("DD-MM-YYYY");
      var to = moment(e.value[1], "DD-MM-YYYY").format("DD-MM-YYYY  ");
      this.setState({
        datePrime: {
          from,
          to,
        },
      });
    } catch (error) {
      this.setState({
        datePrime: {
          from: moment().format("DD-MM-YYYY"),
          to: moment().format("DD-MM-YYYY"),
        },
      });
    }
  };
  render() {
    var { isOption } = this.props;
    var { dateCompare, datePrime, isShowCompare,  chooseCompare
    } = this.state;
    return (
      <div className={isOption}>
        <div className="prime">
          <div class="form-group">
            <label for="">Ngày bắt đầu và kết thúc</label>

            <div>
              <DateRangePickerComponent
                id="daterangepicker"
                placeholder="Chọn từ ngày... đến ngày..."
                format="dd/MM/yyyy"
                width="100%"
                value={datePrime.from + " đến " + datePrime.to}
                onChange={this.onChangeDatePrime}
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
            checked = {chooseCompare}
              class="form-check-input"
              type="checkbox"
              name="allow_payment_request"
              onChange={this.chooseCompare}
              id="gridCheck"
            />
            <label
              class="form-check-label"
              for="gridCheck"
              style={{ fontSize: "15px", fontWeight: "500" }}
            >
              So sánh với
            </label>
          </div>
        </div>
        <div className={`compare ${isShowCompare}`}>
          <div class="form-group">
            <label for="">Ngày bắt đầu và kết thúc</label>

            <div>
              <DateRangePickerComponent
                id="daterangepicker"
                placeholder="Chọn từ ngày... đến ngày..."
                format="dd/MM/yyyy"
                width="100%"
                value={dateCompare.from + " đến " + dateCompare.to}
                onChange={this.onChangeDateCompare}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
