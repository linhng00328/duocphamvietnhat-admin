import React, { Component } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';

class DatePickerADay extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: this.getCurrentDate(),
      showDatePicker: false,
    };
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onchangeDate = (e) => {
    const { value } = e.target;

    if (value === 'HOM-QUA') {
      this.setState({ showDatePicker: false });
      const yesterday = this.getYesterdayDate();
      this.props.onChangeDate(yesterday);
    } else if (value === 'TUY-CHINH') {
      this.setState({ showDatePicker: true });
    } else {
      this.setState({ showDatePicker: false });
      const today = this.getCurrentDate();
      this.props.onChangeDate(today);
    }
  };

  handleDateChange = (date) => {
    let selectedDate = '';
    try {
      const inputDate = date.value;
      if (moment(inputDate, 'DD-MM-YYYY').isValid()) {
        selectedDate = moment(inputDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
      } else {
        console.log('Ngày không hợp lệ:', inputDate);
      }
    } catch (error) {
      console.log('errr date', error);
    }

    this.props.onChangeDate(selectedDate);
  };

  render() {
    const { showDatePicker, selectedDate } = this.state;
    const today = new Date();
    return (
      <div>
        <select
          onChange={this.onchangeDate}
          style={{ maxWidth: '170px' }}
          name=""
          id="input"
          className="form-control"
          required="required"
        >
          <option value="" selected disabled hidden>Chọn ngày</option>
          <option value="HOM-NAY">Hôm nay</option>
          <option value="HOM-QUA">Hôm qua</option>
          <option value="TUY-CHINH">Tùy chỉnh</option>
        </select>

        {showDatePicker && (
          <DatePickerComponent
            id="daterangepicker"
            placeholder="Chọn một ngày..."
            format="yyyy-MM-dd"
            maxDate={today}
            onChange={this.handleDateChange}
          />
        )}
      </div>
    );
  }
}

export default DatePickerADay;
