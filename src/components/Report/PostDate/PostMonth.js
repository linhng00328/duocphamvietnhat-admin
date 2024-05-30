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

      beforeMonth_compare: "",
      monthNowBeforeYear_compare: "",
      isShowCompare: "hide",
      datePrime: "",
      dateCompare: "",
      chooseCompare : false

    };
  }


  initialState = () =>{
    var monthNow = {
      from : moment().startOf('month').format('YYYY-MM-DD'),
      to : moment().format('YYYY-MM-DD')

  }
  var now = moment().format("DD-MM-YYYY");

  var monthNowFrom_prime = { 
    from :  moment(monthNow.from , "YYYY-MM-DD").format("DD-MM-YYYY"),
    to :  moment(monthNow.to , "YYYY-MM-DD").format("DD-MM-YYYY")

   };

  var thirtyDayBefore_prime = {
    from:  moment(now, "DD-MM-YYYY").subtract(30, "days").format("DD-MM-YYYY"),
    to: now,
  };

  var monthOf_beforeMonth_prime= moment(monthNow.from , "YYYY-MM-DD").subtract(1 , "months").format("DD-MM-YYYY")
  var beforeMonth_prime = {
    from: monthOf_beforeMonth_prime,
    to: moment(monthOf_beforeMonth_prime , "DD-MM-YYYY").endOf('month').format('DD-MM-YYYY')
  };



  var beforeMonth_compare = {
    from: moment(monthNow.from , "YYYY-MM-DD").subtract(1 , "months").format("DD-MM-YYYY"),
    to: moment(monthNow.to , "YYYY-MM-DD").subtract(1 , "months").format("DD-MM-YYYY"),
  };

  var monthNowBeforeYear_compare = {
      from: moment(monthNow.from , "YYYY-MM-DD").subtract(1 , "years").format("DD-MM-YYYY"),
      to: moment(monthNow.to , "YYYY-MM-DD").subtract(1 , "years").format("DD-MM-YYYY"),
    
  };

  var isShowCompare = "hide";
  var datePrime = monthNowFrom_prime;
  var dateCompare = beforeMonth_compare;

  this.setState({
      monthNowFrom_prime,
      thirtyDayBefore_prime,
      beforeMonth_prime,
      beforeMonth_compare,
      monthNowBeforeYear_compare,
      isShowCompare,
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
      if(this.props.reset != nextProps.reset && nextProps.isMonth == "show")
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
    if (checked) this.setState({ isShowCompare: "show"  , chooseCompare : true});
    else this.setState({ isShowCompare: "hide" , chooseCompare : false });
};
  onChangeDatePrime = (e) => {
    var value = JSON.parse(e.target.value);
    var datePrime = value;

    var dateCompare = {
      from: moment(datePrime.from, "DD-MM-YYYY")
      .subtract(1, "months")
      .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
      .subtract(1, "months")
      .format("DD-MM-YYYY")
    };
    var beforeMonth_compare = dateCompare

    var monthNowBeforeYear_compare = {
      from: moment(datePrime.from, "DD-MM-YYYY")
      .subtract(1, "years")
      .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
        .subtract(1, "years")
        .format("DD-MM-YYYY"),
    };

    this.setState({
        beforeMonth_compare,
        monthNowBeforeYear_compare,
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
    var { isMonth } = this.props;
    var {
        monthNowFrom_prime,
        thirtyDayBefore_prime,
        beforeMonth_prime,
        beforeMonth_compare,
        monthNowBeforeYear_compare,
        isShowCompare,
        datePrime,
        dateCompare,
        chooseCompare 

    } = this.state;
    console.log(this.state)
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
                Tháng này : {monthNowFrom_prime.from} đến {monthNowFrom_prime.to}
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
                Tháng trước : {beforeMonth_prime.from} đến {beforeMonth_prime.to}
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
                name="dayCompare_month"
                checked={shallowEqual(dateCompare, beforeMonth_compare)}

                value={JSON.stringify(beforeMonth_compare)}

                onChange={this.onChangeDateCompare}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tháng trước đó : {beforeMonth_compare.from} đến{" "}
                {beforeMonth_compare.to}
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="dayCompare_month"
                checked={shallowEqual(dateCompare, monthNowBeforeYear_compare)}

                value={JSON.stringify(monthNowBeforeYear_compare)}

                onChange={this.onChangeDateCompare}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Tháng này năm trước : {monthNowBeforeYear_compare.from} đến{" "}
                {monthNowBeforeYear_compare.to}
              </label>
            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

export default Form;
