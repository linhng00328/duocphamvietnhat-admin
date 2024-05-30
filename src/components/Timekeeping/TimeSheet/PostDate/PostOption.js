import React, { Component } from "react";
import moment from "moment";
import { shallowEqual } from "../../../../ultis/shallowEqual";
import * as helpers from "../../../../ultis/helpers";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePrime: "",
    };
  }

  initialState = () => {
    var datePrime = {
      from: moment().format("DD-MM-YYYY"),
      to: moment().format("DD-MM-YYYY"),
    };
    this.setState({
      datePrime,
    });
  };
  componentDidMount() {
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.reset != nextProps.reset && nextProps.isOption == "show") {
      this.initialState();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextState, this.state)) {
      console.log(nextState.datePrime);
      this.props.handlePostDate({
        datePrime: nextState.datePrime,
      });
    }

    return true;
  }

  onChangeDatePrime = (e) => {
    try {
      var from = moment(e.value[0], "DD-MM-YYYY").format("DD-MM-YYYY");
      var to = moment(e.value[1], "DD-MM-YYYY").format("DD-MM-YYYY  ");
      this.setState({
        datePrime: {
          from,
          to,
        },
      });
    } catch (error) {
      this.setState({
        datePrime: {
          from: moment().format("DD-MM-YYYY"),
          to: moment().format("DD-MM-YYYY"),
        },
      });
    }
  };
  render() {
    var { isOption } = this.props;
    var { datePrime } = this.state;
    return (
      <div className={isOption}>
        <div className="prime" style={{ marginRight: 30 }}>
          <div class="form-group">
            <label for="">Ngày bắt đầu và kết thúc</label>

            <div class="d-flex">
              <DateRangePickerComponent
                id="daterangepicker"
                placeholder="Chọn từ ngày... đến ngày..."
                format="dd/MM/yyyy"
                width="100%"
                value={datePrime.from + " đến " + datePrime.to}
                onChange={this.onChangeDatePrime}
              />
              <button type="submit" class="btn btn-info  btn-sm ml-5 a ">
                <span class="text">Chọn ngày</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
