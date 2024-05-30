import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event,store_code,name) => {
    this.props.handleDelCallBack({table : "Phân quyền" , id : store_code,name:name });
    event.preventDefault();
}

  showData = (decentralization) => {
    var {store_code} = this.props
    var result = null;
    if (decentralization.length > 0) {
      var {update , _delete} = this.props

      result = decentralization.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>
            {item.name}

            </td>
            <td>
            {item.description}

            </td>

     
           


            <td>
            {/* <Link
                to={`/decentralization/detail/${store_code}/${item.id}`}
                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-eye"></i> Xem
              </Link> */}
              <Link
                              style={{ marginLeft: "10px" }}

                to={`/decentralization/edit/${store_code}/${item.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
              onClick = {(e)=>this.passDataModal(e,item.id,item.name)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${_delete == true ? "show" : "hide"}`}
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
    console.log(this.props.data)

    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>

              <th>Tên nhóm</th>
              <th>Mô tả</th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.data)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
