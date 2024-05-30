import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, store_code , name) => {
    this.props.handleDelCallBack({ table: "bài viết", id: store_code , name:name });
    event.preventDefault();
  }

  showData = (blog , per_page , current_page) => {
    var { store_code } = this.props
    var result = null;
    if (blog.length > 0) {
      var {update , _delete} = this.props

      result = blog.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
        var published = data.published == true ? "Đang hiển thị" : "Đang lưu tạm"
        var published_status = data.published == true ? "success" : "secondary"

        return (
          <tr>
            <td>{(per_page * (current_page -1)) + (index + 1)}</td>
            {/* <td>
              {data.id}

            </td> */}

            <td>

              <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />
            </td>

            <td>{data.title}</td>

            <td>
              {" "}
              <h5>
                <span class={`badge badge-${published_status}`}>
                  {published}
                </span>
              </h5>
            </td>
            <td>{data.count_view}</td>

            <td style = {{display : "flex"}}>
              <Link
                to={`/posts/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link>
              <button
                onClick={(e) => this.passDataModal(e, data.id ,data.title)}
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
    var {blogs} = this.props
    var per_page = blogs.per_page
    var current_page = blogs.current_page
    var blogs = typeof blogs.data == "undefined" ? [] : blogs.data
 
    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              {/* <th>ID</th> */}

              <th>Hình ảnh</th>
              <th>Tên bài viết</th>
              <th>Trạng thái</th>
              <th>Lượt xem</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(blogs, per_page , current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
