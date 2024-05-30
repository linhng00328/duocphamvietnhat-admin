import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNowFrom_prime: "",
      dayTomorrowFrom_prime: "",

      datePrime: "",
    };
  }

  initialState = () => {
    var now = moment().format("DD-MM-YYYY");
    var dayNowFrom_prime = {
      from: now,
      to: now,
    };

    var dayTomorrowFrom_prime = {
      from: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
      to: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
    };

    var datePrime = dayNowFrom_prime;

    this.setState({
      dayNowFrom_prime,
      dayTomorrowFrom_prime,

      datePrime,
    });
  };

  componentDidMount() {
    this.initialState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isDay == "show") {
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
    this.setState({
      datePrime: value,
    });
  };

  render() {
    var { isDay } = this.props;
    var { dayNowFrom_prime, dayTomorrowFrom_prime, datePrime } = this.state;

    return (
      <div className={isDay}>
        <div className="prime">
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                checked={shallowEqual(datePrime, dayNowFrom_prime)}
                type="radio"
                name="dayPrime_day"
                value={JSON.stringify(dayNowFrom_prime)}
                onChange={this.onChangeDatePrime}
              />
              <label class="form-check-label" for="gridCheck">
                Hôm nay : {dayNowFrom_prime.from} đến {dayNowFrom_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, dayTomorrowFrom_prime)}
                name="dayPrime_day"
                value={JSON.stringify(dayTomorrowFrom_prime)}
                onChange={this.onChangeDatePrime}
              />
              <label class="form-check-label" for="gridCheck">
                Hôm qua : {dayTomorrowFrom_prime.from} đến{" "}
                {dayTomorrowFrom_prime.to}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
