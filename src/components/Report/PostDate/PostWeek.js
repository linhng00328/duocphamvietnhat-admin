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
      beforeWeek_compare: "",
      weekNowBeforeMonth_compare: "",
      isShowCompare: "hide",
      datePrime: "",
      dateCompare: "",
      chooseCompare : false

    };
  }

  componentDidMount() {
    this.initialState()
  }
  componentWillReceiveProps(nextProps)
  {
      if(this.props.reset != nextProps.reset && nextProps.isWeek == "show")
      {
          this.initialState()

      }
  }
  initialState = () =>{
    var weekNow = helpers.getDateForChartWeek();
    console.log(weekNow)
    var now = moment().format("DD-MM-YYYY");
    var weekNowFrom_prime = { 
      from :  moment(weekNow.from , "YYYY-MM-DD").format("DD-MM-YYYY"),
      to :  moment(weekNow.to , "YYYY-MM-DD").format("DD-MM-YYYY")

     };
    var sevenDayBefore_prime = {
      from:  moment(now, "DD-MM-YYYY").subtract(7, "days").format("DD-MM-YYYY"),
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

    var beforeWeek_compare = {
      from: beforeWeek_from_prime,
      to: moment(beforeWeek_from_prime, "DD-MM-YYYY")
        .add(moment().day()-1, "days")
        .format("DD-MM-YYYY"),
    };
    var weekNowBeforeMonth_from_compare = moment(weekNow.from, "YYYY-MM-DD")
      .subtract(1, "months")
      .format("DD-MM-YYYY");
    var weekNowBeforeMonth_compare = {
      from: weekNowBeforeMonth_from_compare,
      to: moment(weekNowBeforeMonth_from_compare, "DD-MM-YYYY")
        .add(moment().day()-1, "days")
        .format("DD-MM-YYYY"),
    };

    var isShowCompare = "hide";
    var datePrime = weekNowFrom_prime;
    var dateCompare = beforeWeek_compare;

    this.setState({
      weekNowFrom_prime,
      sevenDayBefore_prime,
      beforeWeek_prime,
      beforeWeek_compare,
      weekNowBeforeMonth_compare,
      isShowCompare,
      datePrime,
      dateCompare,
      chooseCompare : false

    });
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
    if (checked) this.setState({ isShowCompare: "show"  ,       chooseCompare : true
  });
    else this.setState({ isShowCompare: "hide"  , chooseCompare : false });
  };
  onChangeDatePrime = (e) => {
    var value = JSON.parse(e.target.value);
    var datePrime = value;

    var dateCompare = {
      from: moment(datePrime.from, "DD-MM-YYYY")
      .subtract(7, "days")
      .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
      .subtract(7, "days")
      .format("DD-MM-YYYY")
    };
    var beforeWeek_compare = dateCompare
    var weekNowBeforeMonth_compare = {
      from: moment(datePrime.from, "DD-MM-YYYY")
      .subtract(1, "months")
      .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .subtract(1, "months")
        .format("DD-MM-YYYY"),
    };

    this.setState({
      beforeWeek_compare,
      weekNowBeforeMonth_compare,
      datePrime,
      dateCompare,
    });
  };
  onChangeDateCompare = (e) => {
    var value = JSON.parse(e.target.value);

    this.setState({
      dateCompare: value,
    });
  };
  render() {
    var { isWeek } = this.props;
    var {
      weekNowFrom_prime,
      sevenDayBefore_prime,
      beforeWeek_prime,
      beforeWeek_compare,
      weekNowBeforeMonth_compare,
      isShowCompare,
      datePrime,
      dateCompare,
      chooseCompare 

    } = this.state;
    console.log(this.state)
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
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="dayCompare_week"
                checked={shallowEqual(dateCompare, beforeWeek_compare)}

                value={JSON.stringify(beforeWeek_compare)}

                onChange={this.onChangeDateCompare}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tuần trước đó : {beforeWeek_compare.from} đến{" "}
                {beforeWeek_compare.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="dayCompare_week"
                checked={shallowEqual(dateCompare, weekNowBeforeMonth_compare)}

                value={JSON.stringify(weekNowBeforeMonth_compare)}

                onChange={this.onChangeDateCompare}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tuần này tháng trước : {weekNowBeforeMonth_compare.from} đến{" "}
                {weekNowBeforeMonth_compare.to}
              </label>
            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

export default Form;
