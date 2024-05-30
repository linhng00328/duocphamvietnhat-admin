import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"
class StoreTable extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event,store_code) => {
    this.props.handleDelCallBack({table : "Cửa hàng" , id : store_code });
    event.preventDefault();
}

  showData = (stores) => {
    var result = null;
    if (stores.length > 0) {
      result = stores.map((data, index) => {
        var name_type = data.name_type == null ? "Trống" : data.name_type;
        var logo_url = data.logo_url == null ? Env.IMG_NOT_FOUND : data.logo_url;
        
       
        return (
          <tr>
            <td>{index + 1}</td>
            <td>
              <Link to={`/dashboard/${data.store_code}`}>
              
              <img src={`${logo_url}`} width ="120px" height = "120px" class="img-responsive" alt="Image"/>
              
              </Link>
            </td>

            <td>
              <Link to={`/dashboard/${data.store_code}`}>
                {data.store_code}
              </Link>
            </td>
            <td>{data.name}</td>
            <td>
              <a target="_blank" href = {"https://"+data.store_code+".myiki.vn" }>{"https://"+data.store_code+".myiki.vn" }</a>
            </td>

            <td>{data.address}</td>
            <td>{name_type}</td>

            <td>
              <Link
                to={`/store/edit/${data.store_code}`}
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
              onClick = {(e)=>this.passDataModal(e,data.store_code)}
                style={{ marginLeft: "10px" }}
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
              <th>Logo</th>

              <th>Mã cửa hàng</th>
              <th>Tên cửa hàng</th>
              <th>Website</th>

              <th>Địa chỉ</th>
              <th>Lĩnh vực</th>
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
