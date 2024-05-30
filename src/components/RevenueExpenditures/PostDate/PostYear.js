import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as helpers from "../../../ultis/helpers";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearNowFrom_prime: "",

      yearBefore_prime: "",

      datePrime: "",
    };
  }

  componentDidMount() {
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isYear == "show") {
      this.initialState();
    }
  }
  initialState = () => {
    var now = moment().format("DD-MM-YYYY");
    var firstDateOfyear = moment().startOf("year").format("DD-MM-YYYY");

    var yearNowFrom_prime = {
      from: firstDateOfyear,
      to: now,
    };
    var yearBefore_prime_subtract = moment(firstDateOfyear, "DD-MM-YYYY")
      .subtract(1, "years")
      .format("DD-MM-YYYY");
    var yearBefore_prime = {
      from: yearBefore_prime_subtract,
      to: moment(yearBefore_prime_subtract, "DD-MM-YYYYY")
        .endOf("year")
        .format("DD-MM-YYYY"),
    };

    var datePrime = yearNowFrom_prime;

    this.setState({
      yearNowFrom_prime,
      yearBefore_prime,

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
    var { isYear } = this.props;
    var {
      yearNowFrom_prime,
      yearBefore_prime,

      datePrime,
    } = this.state;
    console.log(this.state);
    return (
      <div className={isYear}>
        <div className="prime">
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                checked={shallowEqual(datePrime, yearNowFrom_prime)}
                type="radio"
                name="dayPrime_year"
                value={JSON.stringify(yearNowFrom_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Năm này : {yearNowFrom_prime.from} đến {yearNowFrom_prime.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, yearBefore_prime)}
                name="dayPrime_year"
                value={JSON.stringify(yearBefore_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Năm trước : {yearBefore_prime.from} đến {yearBefore_prime.to}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
