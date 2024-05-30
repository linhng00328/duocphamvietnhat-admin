import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../ultis/shallowEqual";
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayNowFrom_prime: "",
            dayTomorrowFrom_prime: "",
            day_afterDay_compare: "",
            day_afterWeek_compare: "",
            day_afterYear_compare: "",
            isShowCompare: "hide",
            datePrime: "",
            dateCompare: "",
            chooseCompare : false
        };
    }

    initialState = () =>{
        var now = moment().format("DD-MM-YYYY");
        var dayNowFrom_prime = {
            from: now,
            to: now,
        };

        var dayTomorrowFrom_prime = {
            from: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
            to: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
        };

        var day_afterDay_compare = {
            from: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
            to: moment(now, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"),
        };
        var day_afterWeek_compare = {
            from: moment(now, "DD-MM-YYYY").subtract(6, "days").format("DD-MM-YYYY"),
            to: moment(now, "DD-MM-YYYY").subtract(6, "days").format("DD-MM-YYYY"),
        };

        var day_afterYear_compare = {
            from: moment(now, "DD-MM-YYYY").subtract(1, "years").format("DD-MM-YYYY"),
            to: moment(now, "DD-MM-YYYY").subtract(1, "years").format("DD-MM-YYYY"),
        };
        var isShowCompare = "hide";
        var datePrime = dayNowFrom_prime;
        var dateCompare = day_afterDay_compare;

        this.setState({
            dayNowFrom_prime,
            dayTomorrowFrom_prime,
            day_afterDay_compare,
            day_afterWeek_compare,
            day_afterYear_compare,
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
        if(this.props.reset != nextProps.reset && nextProps.isDay == "show")
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
        this.setState({
            datePrime: value,
            dateCompare: {
                from: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "days").format("DD-MM-YYYY"),

                to: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "days").format("DD-MM-YYYY"),
            },
            day_afterDay_compare: {
                from: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "days")
                    .format("DD-MM-YYYY"),
                to: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "days")
                    .format("DD-MM-YYYY"),
            },
            day_afterWeek_compare: {
                from: moment(value.from, "DD-MM-YYYY")
                    .subtract(6, "days")
                    .format("DD-MM-YYYY"),
                to: moment(value.from, "DD-MM-YYYY")
                    .subtract(6, "days")
                    .format("DD-MM-YYYY")
            },
            day_afterYear_compare: {
                from: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "years")
                    .format("DD-MM-YYYY"),
                to: moment(value.from, "DD-MM-YYYY")
                    .subtract(1, "years")
                    .format("DD-MM-YYYY")
                
            }
            
        
        });
};
onChangeDateCompare = (e) => {

    var value = JSON.parse(e.target.value);
    this.setState({
        dateCompare: value,
    });
};
render() {
    var { isDay } = this.props;
    var {
        dayNowFrom_prime,
        dayTomorrowFrom_prime,
        day_afterDay_compare,
        day_afterWeek_compare,
        day_afterYear_compare,
        datePrime,
        dateCompare,
        isShowCompare,
        chooseCompare 

    } = this.state;

    console.log(shallowEqual(datePrime, dayTomorrowFrom_prime));

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
                            name="dayCompare_day"
                            checked={shallowEqual(dateCompare, day_afterDay_compare)}
                            value={JSON.stringify(day_afterDay_compare)}
                            onChange={this.onChangeDateCompare}
                        />
                        <label class="form-check-label" for="gridCheck">
                            Ngày trước đó : {day_afterDay_compare.from} đến{" "}
                            {day_afterDay_compare.to}
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="dayCompare_day"
                            checked={shallowEqual(dateCompare, day_afterWeek_compare)}
                            value={JSON.stringify(day_afterWeek_compare)}
                            onChange={this.onChangeDateCompare}
                        />
                        <label class="form-check-label" for="gridCheck">
                            Ngày này tuần trước : {day_afterWeek_compare.from} đến{" "}
                            {day_afterWeek_compare.to}
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="dayCompare_day"
                            checked={shallowEqual(dateCompare, day_afterYear_compare)}
                            value={JSON.stringify(day_afterYear_compare)}
                            onChange={this.onChangeDateCompare}
                        />
                        <label class="form-check-label" for="gridCheck">
                            Ngày này năm trước : {day_afterYear_compare.from} đến{" "}
                            {day_afterYear_compare.to}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default Form;
