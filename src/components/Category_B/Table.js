import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event,store_code,name) => {
    this.props.handleDelCallBack({table : "Danh mục" , id : store_code,name:name });
    event.preventDefault();
}

  showData = (category_blog) => {
    var {store_code} = this.props
    var result = null;
    if (category_blog.length > 0) {
      var {update , _delete} = this.props

      result = category_blog.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ?  Env.IMG_NOT_FOUND : data.image_url
       
      

        return (
          <tr>
            <td>{index + 1}</td>
            <td>
            {data.id}

            </td>

            <td>
              
            <img  src={image_url} className="img-responsive" alt="Image" width = "100px" height = "100px"/>
            </td>
           
            <td>{data.title}</td>


            <td>
              <Link
                to={`/posts/category/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
              onClick = {(e)=>this.passDataModal(e,data.id,data.title)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-warning btn-sm ${_delete == true ? "show" : "hide"}`}
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
        <table class="table  " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>ID</th>

              <th>Hình ảnh</th>
              <th>Tiêu đề</th>

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
