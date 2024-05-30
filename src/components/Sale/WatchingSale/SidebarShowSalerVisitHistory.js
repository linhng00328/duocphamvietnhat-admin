import React, { Component } from 'react';
import * as L from 'leaflet';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as staffAction from '../../../actions/staff';
import DatePicker from '../../DatePicker/DatePickerADay.jsx';
import { connect, shallowEqual } from 'react-redux';

const SidebarShowHistoryStyles = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: white;
  z-index: 10000;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  .history_item {
    display: flex;
  }
`;

const ImageSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const ImageSliderWrapper = styled.div`
  padding-bottom: 8px;
  cursor: pointer;
  width: 400px;
  padding: 20px 0;
`;

const ImageShortList = styled.div`
  cursor: pointer;
  width: 400px;
  display: flex;
  padding: 20px 0;
`;
const ImageShortListImg = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 6px;
  object-fit: cover;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transition: transform 0.1s;
  &:active {
    cursor: grabbing;
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transition: transform 0.1s;

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const ModalImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    margin-top: 6px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #f05d5d 0%, #a7a7cd 100%);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a18787;
  }

  &::-webkit-scrollbar-track {
    background-color: #9b8d8d;
    border-radius: 10px;
  }
`;

const MarkerStyled = styled.div`
  .div_icon_blue {
    background-color: #687eff;
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
  .div_icon_red {
    background-color: #ff6868;
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
  .div_icon_green {
    background-color: #78ff64;
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

const PrevNextButtons = styled.div`
  .slick-prev,
  .slick-next {
    font-size: 0;
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  .slick-prev:before {
    content: '←';
    font-size: 24px;
    color: #000;
  }

  .slick-next:before {
    content: '→';
    font-size: 24px;
    color: #000;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: #ff0000;
  }
`;

class SidebarShowSalerVisitHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedImages: [],
      selectedMarker: 0,
      focusItem: null,
      date_query: this.props.dateQuery,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { store_code } = this.props;
    const { dateQuery } = this.props;
    if(dateQuery){
      this.props.fetchReportSaler(store_code, dateQuery, dateQuery, data);
    } else {
      const date = this.getCurrentDate();
      this.props.fetchReportSaler(store_code, date, date, data);
    }

    if (this.map) {
      this.map.remove();
    }
  }

  createMap(staffArr) {
    const map = L.map('map');
    const hanoiCoordinates = [21.0285, 105.8542];
    if (staffArr.length === 0) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      // Nếu không có dữ liệu staffArr, set view về Hà Nội
      map.setView(hanoiCoordinates, 13);
    } else {
      const bounds = new L.LatLngBounds();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      staffArr.reverse().forEach((record, index) => {
        const { longitude, latitude } = record;
        const isLastPoint = staffArr.length - (index + 1) == 0 ? true : false;

        const popupContent = `
          <div style="text-align: center, margin-bottom: 40px">
            <p style="color: #4e73df">${index + 1} - ${record?.agency?.customer?.name}</p>
          </div>
        `;
        const customIcon = L.divIcon({
          className: isLastPoint == true ? 'div_icon_red' : 'div_icon_blue',
          html: `<div>${index + 1}</div>`,
          iconSize: [30, 30],
        });
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
        marker.openPopup();
        marker.bindPopup(popupContent);
        bounds.extend(marker.getLatLng());
        if (isLastPoint) {
          map.fitBounds(bounds);
          marker.openPopup();
        }
      });
    }

    this.map = map;
  }

  shouldComponentUpdate(nextProps) {
    if (!shallowEqual(nextProps.staff, this.props.staff)) {
      const { staff } = nextProps;
      const staffArr = [...Object.values(staff)];
      if (this.map) {
        this.map.remove();
      }
      this.createMap(staffArr);
    }
    return true;
  }

  // when on clink to icon direction show map and marker on it self
  showSelectedMarker(record, index, numericalOrder) {
    this.setState({ focusItem: index });
    const { latitude, longitude } = record;
    const { selectedMarker } = this.state;
    const map = this.map;
    if (selectedMarker) {
      map.removeLayer(selectedMarker);
    }
    const customIcon = L.divIcon({
      className: index == numericalOrder ? 'div_icon_red' : 'div_icon_green',
      html: `<div>${index}</div>`,
      iconSize: [30, 30],
    });
    const newSelectedMarker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    newSelectedMarker.bindPopup(`${index}- ${record?.agency?.customer?.name}`);
    newSelectedMarker.openPopup();
    this.setState({ selectedMarker: newSelectedMarker });
    map.setView([latitude, longitude], 15);
  }

  onChangeDateFromComponent = (date) => {
    const { data } = this.props;
    const { store_code } = this.props;
    this.setState({
      date_query: date,
    })
    this.props.fetchReportSaler(store_code, date, date, data);
  };

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleCloseSiderBar = (state) => {
    this.props.setOpenHistorySidebar(state);
  };

  openModal = (images, selectedIndex) => {
    this.setState({
      showModal: true,
      selectedImages: images,
      selectedIndex: selectedIndex,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: [],
    });
  };

  prevImage = () => {
    if (this.state.selectedIndex > 0) {
      this.setState((prevState) => ({
        selectedIndex: prevState.selectedIndex - 1,
      }));
    }
  };

  nextImage = () => {
    if (this.state.selectedIndex < this.state.selectedImages.length - 1) {
      this.setState((prevState) => ({
        selectedIndex: prevState.selectedIndex + 1,
      }));
    }
  };

  formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}p ${remainingSeconds}s`;
    return formattedTime;
  }

  render() {
    const { staff } = this.props;
    const { staff_name } = this.props;
    const today = this.getCurrentDate.dateQuery; 
    const date = this.state.date_query;
    return (
      <SidebarShowHistoryStyles>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <i
              class="fas fa-arrow-left"
              style={{ fontSize: '30px', cursor: 'pointer', paddingRight: '20px' }}
              onClick={() => this.handleCloseSiderBar(false)}
            ></i>
            <h4 className="primary name_customers">Lịch sử di chuyển của saler: {staff_name} {' '}-{' '}ngày {date == today ? 'hôm nay' : date || 'hôm nay'}</h4>
          </div>
          <i
            style={{ fontSize: '30px', cursor: 'pointer', paddingRight: '20px' }}
            onClick={() => this.handleCloseSiderBar(false)}
            class="fas fa-times"
          ></i>
        </div>

        {/* Modal */}
        {this.state.showModal && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={this.closeModal}>X</CloseButton>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PrevNextButtons>
                  <div
                    className="slick-prev"
                    onClick={this.prevImage}
                    style={{ opacity: this.state.selectedIndex === 0 ? '0.5' : '1' }}
                  ></div>
                </PrevNextButtons>
                <ModalImage src={this.state.selectedImages[this.state.selectedIndex]} />
                <PrevNextButtons>
                  <div
                    className="slick-next"
                    disabled={this.state.selectedImages.length - 1}
                    onClick={this.nextImage}
                    style={{ opacity: this.state.selectedImages.length - 1 ? '0.5' : '1' }}
                  ></div>
                </PrevNextButtons>
              </div>
            </ModalContent>
          </Modal>
        )}

        <div className="history_item">
          <div style={{ width: '35%', height: '100vh', overflowY: 'scroll', maxWidth: '620px' }}>
            <div style={{ paddingRight: '20px', marginBottom: '70px' }}>
              {/* date picker here */}
              <div style={{ marginBottom: '15px', display: 'flex' }}>
                <DatePicker onChangeDate={(date) => this.onChangeDateFromComponent(date)} />
              </div>

              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderTop: '1px solid #c4c4c4', borderBottom: '1px solid #c4c4c4', lineHeight: '40px' }}>
                    <th style={{ width: '8%', color: '#c4c4c4' }}>STT</th>
                    <th style={{ width: '92%', color: '#c4c4c4' }}>Nhật ký hoạt động</th>
                  </tr>
                </thead>

                {staff?.length ? (
                  staff.map((record, index) => (
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #c4c4c4' }}>
                        <td>
                          <div
                            style={{
                              color: '#000000',
                              borderRadius: '50%',
                              border: 'solid 1px #875252',
                              width: '30px',
                              height: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor:
                                this.state.focusItem === staff.length - index
                                  ? '#58ff58'
                                  : index === 0
                                  ? '#ff6868'
                                  : '#687eff',
                            }}
                          >
                            {staff?.length - index}
                          </div>
                        </td>
                        <td>
                          <div style={{ padding: '4px 0' }}>
                            <div>
                              <span style={{ fontWeight: '600' }}>
                                {record?.agency?.customer?.name || 'Không xác định'}
                              </span>{' '}
                              <br />
                              <span style={{ color: 'grey' }}>Check-in: </span>
                              <span style={{ color: 'rgb(71, 79, 23)' }}>{record?.time_checkin}</span> -{' '}
                              <span style={{ color: 'grey' }}>Check-out: </span>
                              <span style={{ color: '#c12026' }}>
                                {record?.time_checkout || <span color="#22d822">Đang ở tại cửa hàng</span>}
                              </span>
                            </div>
                            <div style={{ wordBreak: 'break-word' }}>
                              <span>
                                <span style={{ color: 'grey' }}>Viếng thăm</span> (
                                {this.formatSeconds(record?.time_visit)} - {record?.images?.length || 0} ảnh)
                              </span>{' '}
                              <br />
                              <span style={{ color: 'grey' }}>Tên thiết bị: {record?.device_name || ''}</span>
                              <br />
                              <span>
                                <span style={{ color: 'grey' }}>Địa chỉ cửa hàng:</span>{' '}
                                {record?.agency?.customer?.address_detail || ''} -{' '}
                                {record?.agency?.customer?.district_name || ''} -{' '}
                                {record?.agency?.customer?.province_name || ''}
                              </span>
                              <br />
                              <span>
                                <span style={{ color: 'grey' }}>Địa chỉ check-in:</span> {record?.address_checkin || ''}
                              </span>
                            </div>

                            <div>
                              <span style={{ color: 'grey' }}>Ghi chú:</span>
                              <span> {record?.note || ''}</span> <br />
                              {record?.images?.length > 0 ? (
                                record?.images?.length > 5 ? (
                                  <div>
                                    <div>
                                      <span style={{ color: 'grey' }}>Ảnh sản phẩm chụp tại cửa hàng :</span> <br />
                                    </div>
                                    <ImageSlider>
                                      <ScrollContainer>
                                        <ImageSliderWrapper>
                                          <Slider
                                            dots={true}
                                            infinite={true}
                                            speed={500}
                                            slidesToShow={5}
                                            slidesToScroll={1}
                                          >
                                            {record?.images.map((img, index) => (
                                              <div key={index}>
                                                <Image
                                                  src={img}
                                                  alt="ảnh chụp tại cửa hàng"
                                                  draggable="true"
                                                  onClick={() => this.openModal(record?.images, index)}
                                                />
                                              </div>
                                            ))}
                                          </Slider>
                                        </ImageSliderWrapper>
                                      </ScrollContainer>
                                    </ImageSlider>
                                  </div>
                                ) : (
                                  <div>
                                    <div>
                                      <span style={{ color: 'grey' }}>Ảnh sản phẩm chụp tại cửa hàng :</span> <br />
                                    </div>
                                    <ImageSlider>
                                      <ScrollContainer>
                                        <ImageShortList>
                                          {record?.images.map((img, index) => (
                                            <div key={index}>
                                              <ImageShortListImg
                                                src={img}
                                                alt="ảnh chụp tại cửa hàng"
                                                draggable="true"
                                                onClick={() => this.openModal(record?.images, index)}
                                              />
                                            </div>
                                          ))}
                                        </ImageShortList>
                                      </ScrollContainer>
                                    </ImageSlider>
                                  </div>
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <i
                              class="fas fa-directions"
                              style={{
                                fontSize: '24px',
                                color: '#e75353',
                                cursor: 'pointer',
                              }}
                              onClick={() => this.showSelectedMarker(record, staff?.length - index, staff?.length)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <tbody>
                    <tr>
                      <td colspan="6" style={{ color: '#c4c4c4', fontSize: '14px', paddingTop: '10px' }}>
                        Không có lịch sử để hiển thị
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>

          {/* Map cpn here */}
          <div style={{ width: '65%' }}>
            <MarkerStyled>
              <div
                id="map"
                style={{
                  height: '90vh',
                  border: '1px solid #c4c4c4',
                  width: '100%',
                  marginRight: '20px',
                }}
              ></div>
            </MarkerStyled>
          </div>
        </div>
      </SidebarShowHistoryStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.reportSalerToDistributor || [],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchReportSaler: (store_code, date_from, date_to, staff_id) => {
      dispatch(staffAction.fetchReportSalerToDistributord(store_code, date_from, date_to, staff_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarShowSalerVisitHistory);
