import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as helpers from "../../../../ultis/helpers";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // monthNowFrom_prime: "",

      beforeMonth_prime: "",
      afterMonth_prime: "",
      datePrime: "",
    };
  }

  initialState = () => {
    // var date = new Date();
    // var monthNow = {

    //   from: new Date(date.getFullYear(), date.getMonth(), 1),
    //   to: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    // };
    // var now = moment().format("DD-MM-YYYY");

    // var monthNowFrom_prime = {
    //   from: moment(monthNow.from, "YYYY-MM-DD").format("DD-MM-YYYY"),
    //   to: moment(monthNow.to, "YYYY-MM-DD").format("DD-MM-YYYY"),
    // };

    // var monthOf_beforeMonth_prime = moment(monthNow.from, "YYYY-MM-DD")
    //   .subtract(1, "months")
    //   .format("DD-MM-YYYY");
    // var beforeMonth_prime = {
    //   from: monthOf_beforeMonth_prime,
    //   to: moment(monthOf_beforeMonth_prime, "DD-MM-YYYY")
    //     .endOf("month")
    //     .format("DD-MM-YYYY"),
    // };
    // var monthOf_afterMonth_prime = moment(monthNow.from, "YYYY-MM-DD")
    //   .add(1, "months")
    //   .format("DD-MM-YYYY");
    // var afterMonth_prime = {
    //   from: monthOf_afterMonth_prime,
    //   to: moment(monthOf_afterMonth_prime, "DD-MM-YYYY")
    //     .endOf("month")
    //     .format("DD-MM-YYYY"),
    // };
    // var datePrime = monthNowFrom_prime;

    this.setState({
      // monthNowFrom_prime,

      // beforeMonth_prime,
      // afterMonth_prime,

      datePrime: {
        from: moment().startOf("month").format("DD-MM-YY"),
        to: moment().endOf("month").format("DD-MM-YY"),
      },
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
  // var monthNowFrom_prime = {
  //   from: moment(monthNow.from, "YYYY-MM-DD").format("DD-MM-YYYY"),
  //   to: moment(monthNow.to, "YYYY-MM-DD").format("DD-MM-YYYY"),
  // };

  // var monthOf_beforeMonth_prime = moment(monthNow.from, "YYYY-MM-DD")
  //   .subtract(1, "months")
  //   .format("DD-MM-YYYY");
  // var beforeMonth_prime = {
  //   from: monthOf_beforeMonth_prime,
  //   to: moment(monthOf_beforeMonth_prime, "DD-MM-YYYY")
  //     .endOf("month")
  //     .format("DD-MM-YYYY"),
  // };
  // var monthOf_afterMonth_prime = moment(monthNow.from, "YYYY-MM-DD")
  //   .add(1, "months")
  //   .format("DD-MM-YYYY");
  // var afterMonth_prime = {
  //   from: monthOf_afterMonth_prime,
  //   to: moment(monthOf_afterMonth_prime, "DD-MM-YYYY")
  //     .endOf("month")
  //     .format("DD-MM-YYYY"),
  // };
  goToBack = () => {
    let { datePrime } = this.state;

    var beforeMonth_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .subtract(1, "months")
        .startOf("month")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .subtract(1, "months")
        .endOf("month")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: beforeMonth_prime,
    });
  };
  goToNext = () => {
    let { datePrime } = this.state;

    var afterWeek_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .add(1, "months")
        .startOf("month")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .add(1, "months")
        .endOf("month")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: afterWeek_prime,
    });
  };
  render() {
    var { isMonth } = this.props;
    var {
      monthNowFrom_prime,

      beforeMonth_prime,
      afterMonth_prime,
      datePrime,
    } = this.state;
    console.log(this.state);
    return (
      <div className={isMonth}>
        {/* <div class="form-group">
                <label for="">label</label>
                <input type="text" class="form-control" id="" placeholder="Input field"/>
            </div> */}
        {/* <div class="form-group">
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
              Tháng trước : {beforeMonth_prime.from} đến {beforeMonth_prime.to}
            </label>
          </div>
        </div> */}
        <div className="prime">
          {/* <div class="form-group">
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
          </div> */}
          <div className="navigation-buttons">
            <button className="btn btn-back" onClick={this.goToBack}>
              {"<"}
            </button>

            <label className="label-date">
              Từ {datePrime.from} đến {datePrime.to}
            </label>
            <button className="btn btn-next" onClick={this.goToNext}>
              {">"}
            </button>
          </div>
          {/* <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, afterMonth_prime)}
                name="dayPrime_month"
                value={JSON.stringify(afterMonth_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tháng này : {afterMonth_prime.from} đến {afterMonth_prime.to}
              </label>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Form;
