import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as customerAction from "../../actions/customer_sales";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { debounce } from "lodash";
import { getDDMMYYYHis, getDDMMYYY } from "../../ultis/date";
import ReactDOM from "react-dom";
import styled from "styled-components";
import history from "../../history";

const DataItemStyles = styled.tr`
  .has_accountCustomer {
    &:hover {
      text-decoration: underline;
    }
  }
`;
class DataItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      showDrop: false,
    };

    this.onCallApi = debounce(this.props.editCustomerSale, 1000);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    // this.color = ["red"]
    this.list_status = [
      { index: "", title: "--Trạng thái--", color: null },

      { index: 0, title: "Cần tư vấn", color: "#ecb704" },
      { index: 1, title: "Đang tư vấn", color: "#4182f2" },
      { index: 2, title: "Thành công", color: "#4aa44c" },
      { index: 3, title: "Thất bại", color: "#e64131" },
    ];
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      console.log("outside");
      if (this.state.showDrop === true) {
        this.setState({ showDrop: false });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    var { store_code } = this.props;
    if (
      !shallowEqual(nextState.data, this.state.data) &&
      nextState.updateApi == true
    ) {
      this.onCallApi(store_code, nextState.data.id, nextState.data);
    }
    return true;
  }

  editCustomerSale = (store_code, id, data) => {
    this.props.editCustomerSale(store_code, id, data);
  };

  componentWillReceiveProps(nextProps, nextState) {
    var { store_code } = this.props;
    if (!shallowEqual(nextProps.data, this.props.data)) {
      this.setState({ updateApi: false, data: nextProps.data });
    }
    if (
      !shallowEqual(nextProps.customer, this.props.customer) &&
      this.state.data.id == nextProps.customer.id
    ) {
      // this.state = {
      //     updateApi: false,
      //     data: nextProps.customer
      // }
      this.setState({ updateApi: false, data: nextProps.customer });
    }
  }

  onChangeStatus = (event) => {
    this.setState({
      updateApi: true,
      data: {
        ...this.state.data,
        status: event,
      },
      showDrop: false,
    });
  };

  onChangeStaff = (event) => {
    this.setState({
      updateApi: true,
      data: {
        ...this.state.data,
        staff_id: event.target.value,
      },
    });
  };

  onChangeText = (event) => {
    this.setState({
      updateApi: true,
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  buildOptionStaff = () => {
    var { staff } = this.props;

    return (staff ?? []).map((ele) => (
      <option value={ele.id}>{ele.name}</option>
    ));
  };

  passDataModal = (event, store_code, name) => {
    this.props.handleDelCallBack({
      table: "Nhân viên",
      id: store_code,
      name: name,
    });
    event.preventDefault();
  };
  handleGoToCustomerPage = (idCustomer) => {
    const { store_code } = this.props;
    history.push(`/customer/detail/${store_code}/${idCustomer}?pag=1`);
  };

  render() {
    var { data, showDrop } = this.state;
    var {
      store_code,
      index,
      paginate,
      numPage,
      checked,
      is_user,
      remove,
      edit,
      assignment,
    } = this.props;
    var arrStatus = this.list_status.filter((v) => v.index === data.status);
    var colorStatus = null;
    var status = {};
    console.log(arrStatus);
    if (arrStatus.length > 0) {
      status = arrStatus[0].title;
      colorStatus = arrStatus[0].color;
    } else {
      status = this.list_status[0].title;
    }
    console.log(colorStatus);
    return (
      <DataItemStyles className="hover-product" ref={this.wrapperRef}>
        {remove === true && assignment === true && (
          <td style={{ verticalAlign: "middle" }}>
            {" "}
            <input
              style={{
                height: "initial",
              }}
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                this.props.onChangeSelected(e, JSON.stringify(data))
              }
            />
          </td>
        )}

        <td style={{ minWidth: "145px" }}>
          <div
            style={{
              color: "#363535",
              "font-weight": "600",
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              fontSize: "11.5px",
            }}
          >
            {data.phone_number}
          </div>
          {data.has_customer ? (
            <div
              onClick={() => this.handleGoToCustomerPage(data.customer_id)}
              className="primary has_accountCustomer"
              style={{
                fontSize: "11.5px",
              }}
            >
              Đã có tài khoản
            </div>
          ) : null}
          <div
            style={{
              fontSize: "11.5px",
            }}
          >
            {" "}
            Ngày thêm: {getDDMMYYY(data.created_at)}
          </div>

          <div className="" style={{ marginTop: "6px" }}>
            {edit ? (
              <div
                id="color-picker"
                onClick={() => {
                  this.setState({ showDrop: !showDrop });
                }}
              >
                <div className="wrapper-dropdown">
                  <span
                    style={{
                      backgroundColor: colorStatus,
                      fontWeight: "500",
                      fontSize: "13px",
                    }}
                  >
                    {status}
                  </span>
                  <ul className={`dropdown ${showDrop === true ? "" : "hide"}`}>
                    <li>
                      {this.list_status.map((v, i) => {
                        return (
                          <div
                            className="hover-product"
                            style={{ display: "flex" }}
                          >
                            <div
                              className="dot"
                              style={{
                                background: v.color,
                                margin: "auto 0px",
                              }}
                            ></div>
                            <span
                              onClick={() => this.onChangeStatus(v.index)}
                              style={{ display: "block", marginLeft: "6px" }}
                            >
                              {v.title}
                            </span>
                          </div>
                        );
                      })}
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}

            {edit ? (
              <button
                className="btn btn-primary btn-sm"
                type="button"
                style={{
                  padding: "0.1rem 0.4rem",
                  "font-size": ".850em",
                }}
                class="btn btn-secondary-no-background btn-sm"
                data-toggle="modal"
                data-target="#modalEditCustomer"
                onClick={() => {
                  this.props.handleSetInfor(data);
                }}
              >
                <i class="fa fa-pencil"></i> Sửa
              </button>
            ) : null}
            {remove ? (
              <button
                type="button"
                style={{
                  marginLeft: "5px",
                  padding: "0.1rem 0.4rem",
                  "font-size": ".850em",
                }}
                class="btn btn-primary-no-background btn-sm"
                onClick={(e) => this.passDataModal(e, data.id, data.name)}
                data-toggle="modal"
                data-target="#removeModal"
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            ) : null}
          </div>
        </td>
        {/* <td>
                    <select name="" value={data?.status} id="input" class="form-control" onChange={this.onChangeStatus}>
                        <option disabled={true}>Trạng thái</option>
                        <option value="0">Cần tư vấn</option>
                        <option value="1">Đang tư vấn</option>
                        <option value="2">Thành công</option>
                        <option value="3">Thất bại</option>
                    </select>
                </td> */}
        <td className="content-onsale">
          <textarea
            className=""
            value={data.consultation_1}
            onChange={this.onChangeText}
            name="consultation_1"
            rows={6}
          ></textarea>
          {data.time_update_consultation_1 !== null && (
            <span className="time">
              {data.time_update_consultation_1 == null
                ? ""
                : getDDMMYYYHis(data.time_update_consultation_1)}
            </span>
          )}
        </td>
        <td className="content-onsale">
          <textarea
            className=""
            value={data.consultation_2}
            onChange={this.onChangeText}
            name="consultation_2"
            rows={6}
          ></textarea>
          {data.time_update_consultation_2 !== null && (
            <span className="time">
              {data.time_update_consultation_2 == null
                ? ""
                : getDDMMYYYHis(data.time_update_consultation_2)}
            </span>
          )}
        </td>
        <td className="content-onsale">
          <textarea
            className=""
            value={data.consultation_3}
            onChange={this.onChangeText}
            name="consultation_3"
            rows={6}
          ></textarea>
          {data.time_update_consultation_3 !== null && (
            <span className="time">
              {data.time_update_consultation_3 == null
                ? ""
                : getDDMMYYYHis(data.time_update_consultation_3)}
            </span>
          )}
        </td>
        {edit === true && assignment === true && (
          <td>
            <select
              style={{
                marginTop: "12px",
                width: "140px",
                fontSize: "0.8rem",
                padding: "0.2rem",
              }}
              name=""
              value={data?.staff_id}
              id="input"
              class="form-control "
              onChange={this.onChangeStaff}
            >
              <option value={null}>Chưa phân công</option>
              {this.buildOptionStaff()}
            </select>
          </td>
        )}

        {/*            
                <td className="three-btn-group" >
                    <button
                        data-toggle="modal"
                        data-target="#modalEditCustomer"
                        onClick={() => {
                            this.props.handleSetInfor(data)
                        }}
                        // style={{ marginLeft: "10px", marginTop: 15 }}
                        class={`btn btn-warning btn-sm`}
                    >
                        <i class="fa fa-edit"></i> Sửa
                    </button>
                    <button
                        onClick={(e) => this.passDataModal(e, data.id, data.name)}
                        data-toggle="modal"
                        data-target="#removeModal"
                        class={`btn btn-danger btn-sm ${remove === true && assignment === true ? "" : "hide"}`}
                    >
                        <i class="fa fa-trash"></i> Xóa
                    </button>
                </td> */}
      </DataItemStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customerSaleReducers.customer_sales.customerID,
    chat: state.chatReducers.chat.chatID,
    permission: state.authReducers.permission.data,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },
    fetchCustomerSaleId: (store_code, customerId) => {
      dispatch(customerAction.fetchCustomerSaleId(store_code, customerId));
    },
    editCustomerSale: (store_code, customerId, data) => {
      dispatch(customerAction.editCustomerSale(store_code, customerId, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataItem);
