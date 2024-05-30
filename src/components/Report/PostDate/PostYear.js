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

      yearBefore_compare: "",
   
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
      if(this.props.reset != nextProps.reset && nextProps.isYear == "show")
      {
          this.initialState()

      }
  }
  initialState = () =>{
    var now = moment().format("DD-MM-YYYY");
    var firstDateOfyear  =  moment().startOf('year').format('DD-MM-YYYY')

    var yearNowFrom_prime = { 
      from : firstDateOfyear,
      to :  now
     };
     var yearBefore_prime_subtract = moment(firstDateOfyear, "DD-MM-YYYY").subtract(1 , "years").format('DD-MM-YYYY')
    var yearBefore_prime = {
      from:yearBefore_prime_subtract,
      to:moment(yearBefore_prime_subtract , "DD-MM-YYYYY").endOf('year').format('DD-MM-YYYY'),
    };

    var yearBefore_compare = {
      from: moment(firstDateOfyear , "DD-MM-YYYY").subtract(1 , "years").format('DD-MM-YYYY'),
      to:  moment(now , "DD-MM-YYYY").subtract(1 , "years").format('DD-MM-YYYY'),

    };

    var isShowCompare = "hide";
    var datePrime = yearNowFrom_prime;
    var dateCompare = yearBefore_compare;

    this.setState({
        yearNowFrom_prime,
        yearBefore_prime,
        yearBefore_compare,
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
    if (checked) this.setState({ isShowCompare: "show" , chooseCompare : true });
    else this.setState({ isShowCompare: "hide"  , chooseCompare : false });
  };
  onChangeDatePrime = (e) => {
    var value = JSON.parse(e.target.value);
    var datePrime = value;

    var dateCompare = {
      from: moment(datePrime.from, "DD-MM-YYYY")
      .subtract(1, "years")
      .format("DD-MM-YYYY"),
      to: moment(datePrime.to, "DD-MM-YYYY")
      .subtract(1, "years")
      .format("DD-MM-YYYY")
    }

    var yearBefore_compare = dateCompare

    this.setState({
        yearBefore_compare,
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
    var { isYear } = this.props;
    var {
        yearNowFrom_prime,
        yearBefore_prime,
        yearBefore_compare,
        isShowCompare,
        datePrime,
        dateCompare,
        chooseCompare
    } = this.state;
    console.log(this.state)
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
                Năm trước : {yearBefore_prime.from} đến{" "}
                {yearBefore_prime.to}
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
                name="dayCompare_year"
                checked={shallowEqual(dateCompare, yearBefore_compare)}

                value={JSON.stringify(yearBefore_compare)}

                onChange={this.onChangeDateCompare}
                id="gridCheck"
              />
              <label class="form-check-label" for="gridCheck">
                Năm trước đó : {yearBefore_compare.from} đến{" "}
                {yearBefore_compare.to}
              </label>
            </div>
          </div>
      
        </div>
      </div>
    );
  }
}

export default Form;
