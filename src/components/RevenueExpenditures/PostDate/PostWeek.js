import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as helpers from "../../../ultis/helpers";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNowFrom_prime: "",
      sevenDayBefore_prime: "",
      beforeWeek_prime: "",

      datePrime: "",
    };
  }

  componentDidMount() {
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isWeek == "show") {
      this.initialState();
    }
  }
  initialState = () => {
    var weekNow = helpers.getDateForChartWeek();
    console.log(weekNow);
    var now = moment().format("DD-MM-YYYY");
    var weekNowFrom_prime = {
      from: moment(weekNow.from, "YYYY-MM-DD").format("DD-MM-YYYY"),
      to: moment(weekNow.to, "YYYY-MM-DD").format("DD-MM-YYYY"),
    };
    var sevenDayBefore_prime = {
      from: moment(now, "DD-MM-YYYY").subtract(7, "days").format("DD-MM-YYYY"),
      to: now,
    };
    var beforeWeek_from_prime = moment(weekNow.from, "YYYY-MM-DD")
      .subtract(7, "days")
      .format("DD-MM-YYYY");
    var beforeWeek_prime = {
      from: beforeWeek_from_prime,
      to: moment(beforeWeek_from_prime, "DD-MM-YYYY")
        .add(6, "days")
        .format("DD-MM-YYYY"),
    };

    var datePrime = weekNowFrom_prime;

    this.setState({
      weekNowFrom_prime,
      sevenDayBefore_prime,
      beforeWeek_prime,

      datePrime,
    });
  };
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
    var { isWeek } = this.props;
    var {
      weekNowFrom_prime,
      sevenDayBefore_prime,
      beforeWeek_prime,

      datePrime,
    } = this.state;
    console.log(this.state);
    return (
      <div className={isWeek}>
        {/* <div class="form-group">
                <label for="">label</label>
                <input type="text" class="form-control" id="" placeholder="Input field"/>
            </div> */}

        <div className="prime">
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                checked={shallowEqual(datePrime, weekNowFrom_prime)}
                type="radio"
                name="dayPrime_week"
                value={JSON.stringify(weekNowFrom_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tuần này : {weekNowFrom_prime.from} đến {weekNowFrom_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, sevenDayBefore_prime)}
                name="dayPrime_week"
                value={JSON.stringify(sevenDayBefore_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                7 ngày qua : {sevenDayBefore_prime.from} đến{" "}
                {sevenDayBefore_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, beforeWeek_prime)}
                name="dayPrime_week"
                value={JSON.stringify(beforeWeek_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tuần trước : {beforeWeek_prime.from} đến {beforeWeek_prime.to}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
