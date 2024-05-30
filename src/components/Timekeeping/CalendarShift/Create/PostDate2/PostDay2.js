import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../../../ultis/shallowEqual";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNowFrom_prime: "",
      dayTomorrowFrom_prime: "",
      dayYesterdayFrom_prime: "",
      datePrime: "",
    };
  }

  componentDidMount() {
    // this.initialState();
    var now = {
      from: moment().format("DD-MM-YYYY"),
      to: moment().format("DD-MM-YYYY"),
    };
    this.setState({
      datePrime: now,
      dayNowFrom_prime: now,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isDay == "show") {
      var now = {
        from: moment().format("DD-MM-YYYY"),
        to: moment().format("DD-MM-YYYY"),
      };
      this.setState({
        datePrime: now,
        dayNowFrom_prime: now,
      });
    }
    if (this.props.typeDate != nextProps.typeDate) {
      var now = {
        from: moment().format("DD-MM-YYYY"),
        to: moment().format("DD-MM-YYYY"),
      };
      this.setState({
        datePrime: now,
        dayNowFrom_prime: now,
      });
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
  goToBack = () => {
    let { datePrime } = this.state;

    var dayYesterdayFrom_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .subtract(1, "days")
        .startOf("day")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .subtract(1, "days")
        .endOf("day")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: dayYesterdayFrom_prime,
    });
  };
  goToNext = () => {
    let { datePrime } = this.state;
    var dayTomorrowFrom_prime = {
      from: moment(datePrime.from, "DD-MM-YYYY")
        .add(1, "days")
        .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .add(1, "days")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      datePrime: dayTomorrowFrom_prime,
    });
  };
  render() {
    var { isDay } = this.props;
    var {
      dayNowFrom_prime,
      dayYesterdayFrom_prime,
      dayTomorrowFrom_prime,
      datePrime,
    } = this.state;

    return (
      <div className={isDay}>
        <div className="prime">
          <div className="navigation-buttons">
            {!moment(this.state.dayNowFrom_prime.from, "DD-MM-YYYY").isSame(
              moment(datePrime.from, "DD-MM-YYYY")
            ) && (
              <button
                className="btn btn-back"
                onClick={this.goToBack}
                type="button"
              >
                {"<"}
              </button>
            )}

            <label className="label-date">
              Từ {datePrime.from} đến {datePrime.to}
            </label>
            <button
              className="btn btn-next"
              onClick={this.goToNext}
              type="button"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
