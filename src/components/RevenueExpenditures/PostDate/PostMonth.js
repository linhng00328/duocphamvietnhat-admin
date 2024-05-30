import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as helpers from "../../../ultis/helpers";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthNowFrom_prime: "",
      thirtyDayBefore_prime: "",
      beforeMonth_prime: "",

      datePrime: "",
    };
  }

  initialState = () => {
    var monthNow = {
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    };
    var now = moment().format("DD-MM-YYYY");

    var monthNowFrom_prime = {
      from: moment(monthNow.from, "YYYY-MM-DD").format("DD-MM-YYYY"),
      to: moment(monthNow.to, "YYYY-MM-DD").format("DD-MM-YYYY"),
    };

    var thirtyDayBefore_prime = {
      from: moment(now, "DD-MM-YYYY").subtract(30, "days").format("DD-MM-YYYY"),
      to: now,
    };

    var monthOf_beforeMonth_prime = moment(monthNow.from, "YYYY-MM-DD")
      .subtract(1, "months")
      .format("DD-MM-YYYY");
    var beforeMonth_prime = {
      from: monthOf_beforeMonth_prime,
      to: moment(monthOf_beforeMonth_prime, "DD-MM-YYYY")
        .endOf("month")
        .format("DD-MM-YYYY"),
    };

    var datePrime = monthNowFrom_prime;

    this.setState({
      monthNowFrom_prime,
      thirtyDayBefore_prime,
      beforeMonth_prime,

      datePrime,
    });
  };

  componentDidMount() {
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isMonth == "show") {
      this.initialState();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState, this.state))
      this.props.handlePostDate({
        datePrime: nextState.datePrime,
      });

    return true;
  }

  onChangeDatePrime = (e) => {
    var value = JSON.parse(e.target.value);
    var datePrime = value;

    this.setState({
      datePrime,
    });
  };

  render() {
    var { isMonth } = this.props;
    var {
      monthNowFrom_prime,
      thirtyDayBefore_prime,
      beforeMonth_prime,

      datePrime,
    } = this.state;
    console.log(this.state);
    return (
      <div className={isMonth}>
        {/* <div class="form-group">
                <label for="">label</label>
                <input type="text" class="form-control" id="" placeholder="Input field"/>
            </div> */}

        <div className="prime">
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                checked={shallowEqual(datePrime, monthNowFrom_prime)}
                type="radio"
                name="dayPrime_month"
                value={JSON.stringify(monthNowFrom_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tháng này : {monthNowFrom_prime.from} đến{" "}
                {monthNowFrom_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, thirtyDayBefore_prime)}
                name="dayPrime_month"
                value={JSON.stringify(thirtyDayBefore_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                30 ngày qua : {thirtyDayBefore_prime.from} đến{" "}
                {thirtyDayBefore_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, beforeMonth_prime)}
                name="dayPrime_month"
                value={JSON.stringify(beforeMonth_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tháng trước : {beforeMonth_prime.from} đến{" "}
                {beforeMonth_prime.to}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
