import React, { Component } from 'react';
import { connect, shallowEqual } from 'react-redux';
import * as L from 'leaflet';
import styled from 'styled-components';

import Table from './Table';
import * as staffAction from '../../../actions/staff';
import DatePicker from '../../DatePicker/DatePickerADay.jsx';

const MarkerStyled = styled.div`
  .marker_img {
    border-radius: 50% !important;
  }
  .div_icon {
    background-color: #ff4f4f;
    color: #000000;
    border-radius: 50%; 
    border: solid 1px #875252;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

class WatchingSaler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_query: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      // Tạo bản đồ và đặt tùy chọn mặc định là vị trí cuối cùng của staff trong mảng
      if (this.map) {
        this.map.remove();
      }
      const { staff } = nextProps;
      this.createMap(staff);
    }
    return true;
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  componentDidMount() {
    const today = this.getCurrentDate();
    const { store_code } = this.props;
    this.props.fetchHistoryToDistributor(store_code, today, today);
  }

  createMap(staffArr) {
    const map = L.map('map');
    const hanoiCoordinates = [21.0285, 105.8542];
    const staffVisitedArr = staffArr.filter((staff) => staff.total_staff_visit)
    if (staffVisitedArr.length === 0) {
      // Nếu không có dữ liệu staffVisitedArr, set view về Hà Nội
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.setView(hanoiCoordinates, 13);
    } else {
      // Nếu có dữ liệu staffVisitedArr, tạo bản đồ và hiển thị các marker và popup
      const bounds = new L.LatLngBounds(); // Để tính toán giới hạn hiển thị của bản đồ

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      staffVisitedArr.forEach((record, index) => {
        const { longitude, latitude, staff_name, sale_avatar_image } = record;
        const findIndexStaff = (staffArr, recordId) => {
          return staffArr.findIndex(person => person.id === recordId);
        };
        const popupContent = `
          <div style="text-align: center">
            <div style="width: 100%">
              <img src="${
                sale_avatar_image || '/images/people.png'
              }" alt="${staff_name}'s Avatar" style="width: 53px; height: 53px; object-fit: cover; border-radius: 51%;" />
            </div>
            <p style="color: #4e73df">${staff_name}</p>
          </div>
        `;
        const customIcon = L.divIcon({
          className: 'div_icon',
          html: `<div>${findIndexStaff(staffArr, record.id) + 1}</div>`,
          iconSize: [30, 30],
        });
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
        marker.bindPopup(popupContent);
        // Thêm marker vào giới hạn hiển thị của bản đồ
        bounds.extend(marker.getLatLng());
        // Nếu là marker cuối cùng, thì fit bản đồ theo giới hạn
        if (index === staffVisitedArr.length - 1) {
          map.fitBounds(bounds);
        }
      });
    }
    this.map = map;
  }

  updateMapMarkers() {
    const { staff } = this.props;
    const staffArray = [...Object.values(staff)];
    const staffVisitedArr = staffArray.filter((staff) => staff.total_staff_visit)
    if (this.map){
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }

    if (staffVisitedArr.length > 0) {
      staffVisitedArr.forEach((saler, index) => {
        const { latitude, longitude, staff_name, sale_avatar_image } = saler;
        const findIndexStaff = (staffArr, recordId) => {
          return staffArr.findIndex(person => person.id === recordId);
        };
        const popupContent = `
        <div style="text-align: center">
          <div style="width: 100%">
            <img src="${
              sale_avatar_image || '/images/people.png'
            }" alt="${staff_name}'s Avatar" style="width: 85%; height: 53px; object-fit: cover; border-radius: 51%;" />
          </div>
          <p style="color: #4e73df">${staff_name}</p>
        </div>
      `;
        const customIcon = L.divIcon({
          className: 'div_icon',
          html: `<div>${findIndexStaff(staffArray, saler.id) + 1}</div>`,
          iconSize: [30, 30],
        });
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map);
        marker.bindPopup(popupContent);
      });
    }
  }

  onChangeDateFromComponent = (date) => {
    const { store_code } = this.props;
    this.setState({
      date_query: date,
    })
    this.props.fetchHistoryToDistributor(store_code, date, date);
  };

  render() {
    const { staff } = this.props;
    return (
      <div>
        <div style={{ marginBottom: '15px'}}>
          <DatePicker onChangeDate={(date) => this.onChangeDateFromComponent(date)} />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '60%', overflowX: 'scroll' }}>
            <Table
              data={staff}
              setOpenHistorySidebar={this.setOpenHistorySidebar}
              store_code={this.props.store_code}
              createMap={this.createMap}
              date_query={this.state.date_query}
            />
          </div>

          <div style={{ width: '40%', paddingLeft: '15px' }}>
            <MarkerStyled>
              <div id="map" style={{ height: '100%', minHeight: '500px' }}></div>
            </MarkerStyled>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.historySalerToDistributor || [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHistoryToDistributor: (store_code, from_time, to_time) => {
      dispatch(staffAction.fetchHistoryToDistributorByStaffId(store_code, from_time, to_time));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchingSaler);
