import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../../ultis/shallowEqual";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dayNowFrom_prime: "",
      dayTomorrowFrom_prime: "",
      dayYesterdayFrom_prime: "",
      datePrime: "",
    };
  }

  componentDidMount() {
    // this.initialState();
    this.setState({
      datePrime: {
        from: moment().format("DD-MM-YYYY"),
        to: moment().format("DD-MM-YYYY"),
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isDay == "show") {
      this.setState({
        datePrime: {
          from: moment().format("DD-MM-YYYY"),
          to: moment().format("DD-MM-YYYY"),
        },
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

    // const param = `date_from=${this.state.datePrime.from}&date_to=${this.state.datePrime.to}`;

    // var { store_code } = this.props;
    // const branch_id = localStorage.getItem("branch_id");
    // this.props.fetchAllCalendarShift(store_code, branch_id, param);

    // var params = `&date_from=${moment(newStartDate).format(
    //   "YYYY-MM-DD"
    // )}&date_to=${moment(newEndDate).format("YYYY-MM-DD")}`;
    // this.props.fetchAllCalendarShift(store_code, branch_id, params);
    // this.setState({
    //   date: newDate,
    // });
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
    console.log("2a", dayTomorrowFrom_prime, this.state.datePrime);
    this.setState({
      datePrime: dayTomorrowFrom_prime,
    });

    // const param = `date_from=${this.state.datePrime.from}&date_to=${this.state.datePrime.to}`;

    // var { store_code } = this.props;
    // const branch_id = localStorage.getItem("branch_id");
    // this.props.fetchAllCalendarShift(store_code, branch_id, param);
    // let mDate = this.state.currentDate;
    // let newStartDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    // let newEndDate = new Date(mDate.getFullYear(), mDate.getMonth() + 2, 0);
    // this.setState({
    //   currentDate: new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1),
    // });

    // toolbar.onNavigate("next", newStartDate, newEndDate);
    // var { store_code } = this.props.match.params;
    // const branch_id = localStorage.getItem("branch_id");
    // var params = `&date_from=${moment(newStartDate).format(
    //   "YYYY-MM-DD"
    // )}&date_to=${moment(newEndDate).format("YYYY-MM-DD")}`;
    // this.props.fetchAllCalendarShift(store_code, branch_id, params);
    // this.setState({
    //   date: newDate,
    // });
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
          {/* <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked={shallowEqual(datePrime, dayYesterdayFrom_prime)}
                name="dayPrime_day"
                value={JSON.stringify(dayYesterdayFrom_prime)}
                onChange={this.onChangeDatePrime}
              />
              <label class="form-check-label" for="gridCheck">
                Hôm qua : {dayYesterdayFrom_prime.from} đến{" "}
                {dayYesterdayFrom_prime.to}
              </label>
            </div>
          </div> */}
          {/* <div class="form-group">
            <div class="form-check"> */}
          {/* <input
                class="form-check-input"
                checked={shallowEqual(datePrime, dayNowFrom_prime)}
                type="radio"
                name="dayPrime_day"
                value={JSON.stringify(dayNowFrom_prime)}
                onChange={this.onChangeDatePrime}
              /> */}

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
          {/* </div>
          </div> */}
          {/* <div class="form-group">
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
                Ngày mai : {dayTomorrowFrom_prime.from} đến{" "}
                {dayTomorrowFrom_prime.to}
              </label>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Form;
