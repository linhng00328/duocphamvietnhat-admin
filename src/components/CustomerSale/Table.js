import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS, IKITECH } from "../../ultis/channel";
import history from "../../history";
import {
  filter_arr,
  format,
  isEmail,
  isEmpty,
  isPhone,
} from "../../ultis/helpers";
import Pagination from "../../components/RevenueExpenditures/Pagination";
import * as customerAction from "../../actions/customer_sales";
import { connect } from "react-redux";
import ModalDelete from "../../components/CustomerSale/ModalDelete";
import * as Types from "../../constants/ActionType";

import DataItem from "./DataItem";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_by_status: "",
      modalDelete: {},
      selected: [],
      staff_id: null,
    };
  }

  showChatBox = (customerId, status) => {
    this.props.handleShowChatBox(customerId, status);
  };
  handleSetInfor = (item) => {
    this.props.handleSetInfor(item);
  };
  handleDelCallBack = (modal) => {
    this.setState({ modalDelete: modal });
  };
  changePage = (store_code, customerId, e) => {
    var { paginate } = this.props;
    if (e.target.name == "action") return;
    history.push(
      `/customer/detail/${store_code}/${customerId}?pag=${paginate}`
    );
  };

  checkSelected = (id) => {
    var selected = [...this.state.selected];
    if (selected.length > 0) {
      for (const item of selected) {
        if (item.id == id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  onChangeSelected = (e, _data) => {
    var { checked } = e.target;
    var data = JSON.parse(_data);

    var selected = [...this.state.selected];
    if (checked == true) {
      selected.push(data);
    } else {
      for (const [index, item] of selected.entries()) {
        if (item.id == data.id) {
          selected.splice(index, 1);
        }
      }
    }
    this.setState({ selected });
  };
  showData = (customer, per_page, current_page) => {
    var { store_code, paginate, staff, is_user } = this.props;
    var { remove, assignment, edit } = this.props;
    var result = null;
    if (customer.length > 0) {
      var { chat_allow } = this.props;
      // var is_collaborator  = data.is_collaborator == null ||
      //   data.is_collaborator == "" ||
      //   data.is_collaborator == false
      //   ? "Không"
      //   : "Có"

      //   var is_agency  = data.is_agency == null ||
      //   data.is_agency == "" ||
      //   data.is_agency == false
      //   ? "Không"
      //   : "Có"

      result = customer.map((data, index) => {
        var checked = this.checkSelected(data.id);

        return (
          <DataItem
            handleDelCallBack={this.handleDelCallBack}
            onChangeSelected={this.onChangeSelected}
            checked={checked}
            data={data}
            handleSetInfor={this.props.handleSetInfor}
            store_code={store_code}
            index={index}
            remove={remove}
            edit={edit}
            assignment={assignment}
            paginate={paginate}
            numPage={per_page * (current_page - 1) + (index + 1)}
            key={data.id}
            staff={staff}
          />
        );
      });
    } else {
      return result;
    }
    return result;
  };
  searchStars = (e) => {
    var { getParams, store_code } = this.props;
    var value = e.target.value;
    var params = getParams(value, 1);
    this.props.fetchAllCustomerSale(this.props.store_code, 1, params);
    this.props.passFilterStatus(value);
    this.setState({ filter_by_status: value });
  };

  onChangeSelectAll = (e) => {
    var checked = e.target.checked;
    var { customers } = this.props;
    var _selected = [...this.state.selected];

    var listCustomer = filter_arr(customers.data);

    if (listCustomer.length > 0) {
      if (checked == false) {
        this.setState({ selected: [] });
      } else {
        _selected = [];
        listCustomer.forEach((customer) => {
          _selected.push(customer);
        });
        this.setState({ selected: _selected });
      }
    }
  };

  buildOptionStaff = () => {
    var { staff } = this.props;

    return (staff ?? []).map((ele) => (
      <option value={ele.id}>{ele.name}</option>
    ));
  };

  handleMultiUpdateCallBack = (e, data) => {
    var { store_code } = this.props;
    var { staff_id } = this.state;
    e.preventDefault();

    if (staff_id == null || !isEmpty(staff_id)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Vui lòng chọn nhân viên tư vấn",
        },
      });
      return;
    }
    var newData = [...data];
    if (newData.length > 0)
      data.forEach((data, index) => {
        newData[index].staff_id = staff_id;
        delete newData[index].staff;
        delete newData[index].address;
        delete newData[index].email;
        delete newData[index].name;
        delete newData[index].date_of_birth;
        delete newData[index].phone_number;
        delete newData[index].sex;
      });

    console.log(newData);
    this.props.editMultiCustomerSale(store_code, { list: newData }, this);
  };
  handleMultiAddAccount(e, data) {
    var { store_code, createMultiAccountForCustomerSale } = this.props;
    const listIdCustomersOnSale = data.reduce(
      (customersPrev, customersNext) => {
        return [...customersPrev, customersNext.id];
      },
      []
    );
    createMultiAccountForCustomerSale(store_code, {
      list_ids: listIdCustomersOnSale,
    });
  }

  render() {
    var customers =
      typeof this.props.customers.data == "undefined"
        ? []
        : this.props.customers.data;

    var { store_code, staff } = this.props;

    var { filter_by_status, selected, staff_id } = this.state;

    var per_page = this.props.customers?.per_page;
    var current_page = this.props.customers?.current_page;

    var _selected =
      selected.length > 0 && selected.length == customers.length ? true : false;

    var multiDelete = selected.length > 0 ? "show" : "hide";
    var { is_user, add, edit, remove, add, assignment } = this.props;
    return (
      <div class="">
        <ModalDelete store_code={store_code} modal={this.state.modalDelete} />
        <div className={multiDelete} style={{ display: "flex" }}>
          <select
            style={{ maxWidth: "250px" }}
            name=""
            value={staff_id}
            id="input"
            class="form-control"
            onChange={(e) => this.setState({ staff_id: e.target.value })}
          >
            <option value={null}>--Chọn nhân viên--</option>
            {this.buildOptionStaff()}
          </select>
          <button
            onClick={(e) => this.handleMultiUpdateCallBack(e, selected)}
            style={{ marginLeft: "10px" }}
            class={`btn btn-primary btn-sm ${multiDelete}`}
          >
            <i class="fa fa-edit"></i> Lưu
          </button>
          <button
            onClick={(e) => this.handleMultiAddAccount(e, selected)}
            style={{ marginLeft: "10px" }}
            className={`btn btn-warning btn-sm`}
          >
            <i className="fa fa-plus"></i> Create Account
          </button>
        </div>
        <table
          class="table table-border table-sale"
          id="dataTable"
          width="100%"
          cellspacing="0"
          style={{
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              {remove === true && assignment == true && (
                <th>
                  <input
                    type="checkbox"
                    checked={_selected}
                    onChange={this.onChangeSelectAll}
                  />
                </th>
              )}

              <th>Họ tên/SĐT</th>
              {/* <th className="content-onsale">
                <select
                  value={filter_by_status}
                  style={{ width: "155px" }}
                  name=""
                  id="input"
                  className="form-control status-onsale"
                  onChange={this.searchStars}
                >
                  <option value="">--Trạng thái--</option>
                  <option value="0">Cần tư vấn ({this.props.customers?.total_status_0})</option>
                  <option value="1">Đang tư vấn ({this.props.customers?.total_status_1})</option>
                  <option value="2">Thành công ({this.props.customers?.total_status_2})</option>
                  <option value="3">Thất bại ({this.props.customers?.total_status_3})</option>
                </select>
              </th> */}
              <th className="content-onsale">Nội dung tư vấn lần 1</th>
              <th className="content-onsale">Nội dung tư vấn lần 2</th>
              <th className="content-onsale">Nội dung tư vấn lần 3</th>

              {edit === true && assignment == true && <th>Nhân viên sale</th>}
              {/* <th>Hành động</th> */}
            </tr>
          </thead>

          <tbody>{this.showData(customers, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCustomerSale: (id, page, params) => {
      dispatch(customerAction.fetchAllCustomerSale(id, page, params));
    },
    editMultiCustomerSale: (store_code, data, _this) => {
      dispatch(customerAction.editMultiCustomerSale(store_code, data, _this));
    },
    createMultiAccountForCustomerSale: (store_code, data) => {
      dispatch(
        customerAction.createMultiAccountForCustomerSale(store_code, data)
      );
    },
    showError: (error) => {
      dispatch(error);
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
