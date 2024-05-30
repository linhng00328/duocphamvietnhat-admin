import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as helpers from "../../../../ultis/helpers";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // weekNowFrom_prime: "",

      beforeWeek_prime: "",

      afterWeek_prime: "",
      datePrime: "",
    };
  }

  componentDidMount() {
    if(this.props.isWeek == "show"){

    this.initialState();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isWeek == "show") {
      this.initialState();
    }
  }
  initialState = () => {
    // var now = moment().format("DD-MM-YYYY");

    // var weekNowFrom_prime = {
    //   from: moment().startOf("isoWeek").format("DD-MM-YY"),
    //   to: moment().endOf("isoWeek").format("DD-MM-YY"),
    // };

    // var beforeWeek_prime = {
    //   from: moment().subtract(1, "weeks").startOf("isoWeek").format("DD-MM-YY"),
    //   to: moment(
    //     moment().subtract(1, "weeks").startOf("isoWeek").format("DD-MM-YY"),
    //     "DD-MM-YYYY"
    //   )
    //     .add(6, "days")
    //     .format("DD-MM-YYYY"),
    // };
    // var afterWeek_prime = {
    //   from: moment().add(1, "weeks").startOf("isoWeek").format("DD-MM-YY"),
    //   to: moment(
    //     moment().add(1, "weeks").startOf("isoWeek").format("DD-MM-YY"),
    //     "DD-MM-YYYY"
    //   )
    //     .add(6, "days")
    //     .format("DD-MM-YYYY"),
    // };

    // var datePrime = weekNowFrom_prime;
    // console.log(
    //   weekNowFrom_prime,

    //   beforeWeek_prime,
    //   afterWeek_prime,
    //   datePrime
    // );
    this.setState({
      // weekNowFrom_prime,

      // beforeWeek_prime,
      // afterWeek_prime,
      // datePrime,
      datePrime: {
        from: moment().startOf("isoWeek").format("DD-MM-YYYY"),
        to: moment().endOf("isoWeek").format("DD-MM-YYYY"),
      },
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

  goToBack = () => {
    let { datePrime } = this.state;

    var beforeWeek_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .subtract(1, "weeks")
        .startOf("isoWeek")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .subtract(1, "weeks")
        .endOf("isoWeek")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: beforeWeek_prime,
    });
  };
  goToNext = () => {
    let { datePrime } = this.state;

    var afterWeek_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .add(1, "weeks")
        .startOf("isoWeek")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .add(1, "weeks")
        .endOf("isoWeek")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: afterWeek_prime,
    });
  };

  render() {
    var { isWeek } = this.props;
    var {
      weekNowFrom_prime,

      beforeWeek_prime,
      afterWeek_prime,
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
          {/* <div class="form-group">
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
          </div> */}
          {/* <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                checked={shallowEqual(datePrime, weekNowFrom_prime)}
                type="radio"
                name="dayPrime_week"
                value={JSON.stringify(weekNowFrom_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              /> */}
          {/* <label class="form-check-label" for="gridCheck">
                Tuần này : {weekNowFrom_prime.from} đến {weekNowFrom_prime.to}
              </label> */}
          <div className="navigation-buttons">
            <button type="button" className="btn btn-back" onClick={this.goToBack}>
              {"<"}
            </button>

            <label className="label-date">
              Từ {datePrime.from} đến {datePrime.to}
            </label>
            <button type="button" className="btn btn-next" onClick={this.goToNext}>
              {">"}
            </button>
          </div>
          {/* </div>
          </div> */}

          {/* <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, afterWeek_prime)}
                name="dayPrime_week"
                value={JSON.stringify(afterWeek_prime)}
                onChange={this.onChangeDatePrime}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tuần sau : {afterWeek_prime.from} đến {afterWeek_prime.to}
              </label>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Form;
