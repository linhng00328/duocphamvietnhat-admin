import React, { Component } from "react";
import { Link } from "react-router-dom";

class StoreTable extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event,store_code,address_detail) => {
    this.props.handleDelCallBack({table : "Cửa hàng" , id : store_code ,address_detail });
    event.preventDefault();
}

  showData = (store_address) => {
    var {store_code} = this.props
    var result = null;
    if (store_address.length > 0) {
      var {update} = this.props

      result = store_address.map((data, index) => {
       var is_default_pickup = data.is_default_pickup == true ? "check" : "close"
       var is_default_return = data.is_default_return == true ? "check" : "close"

        return (
          <tr>
            <td>{index + 1}</td>
            <td>
            {data.name}

            </td>

            <td>
              
                {data.address_detail}
            </td>

            <td>{data.province_name}</td>
            <td>{data.district_name}</td>
            <td>{data.wards_name}</td>
            <td className = "status_check"><i class={`fas fa-${is_default_pickup} ${is_default_pickup + "-status"} `}></i></td>
            <td className = "status_check"><i class={`fas fa-${is_default_return} ${is_default_return + "-status"} `}></i></td>


            <td className="group-btn-table">
              <Link
                to={`/store_address/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
              onClick = {(e)=>this.passDataModal(e,data.id , data.address_detail   )}
                data-toggle="modal"
                data-target="#removeModal"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    
    return (
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>

              <th>Địa chỉ chi tiết</th>
              <th>Tỉnh/thành phố </th>
              <th>Quận/huyện</th>
              <th>Phường/xã</th>
              <th>Lấy hàng</th>
              <th>Trả hàng</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

export default StoreTable;
