import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Env from "../../../ultis/default"
import history from "../../../history";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  passDataModal = (event, store_code, name) => {
    this.props.handleDelCallBack({ table: "khóa học", id: store_code, name: name });
    event.preventDefault();
  }

  changePage = (store_code, id, e) => {
 
    if (e.target.name == "action" || e.target.tagName == "I")
      return;
    history.push(`/train/chapter/index/${store_code}/${id}`)
  }

  showData = (courses, per_page, current_page) => {
    var { store_code } = this.props
    var result = null;
    if (courses.length > 0) {
      var { update, _delete } = this.props

      result = courses.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url

        return (
          <tr className="hover-product" onClick={(e) => this.changePage(store_code, data.id, e)}>
            <td>{(per_page * (current_page - 1)) + (index + 1)}</td>
            <td>
              <img
                src={image_url}
                className="img-responsive"
                alt="Image"
                width="100px"
                height="100px"
              />
            </td>



            <td style={{ maxWidth: "200px" }}>
              <div>
                <span> {data.title}</span>
                <div style={{
                  color: "blue",
                  "text-decoration": "underline"
                }}>Xem</div>
              </div></td>


            <td
              style={{ maxWidth: "240px" }}
            >{data.short_description?.length > 120 ? data.short_description?.slice(0, 120) + "..." : data.short_description}</td>



            <td style={{ maxWidth: "150px", display: "flex" }}>
              {/* <Link
                to={`/train/chapter/index/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit"></i> Xem chương - bài học
              </Link> */}
              <Link
                name="action"
                to={`/train/course/edit/${store_code}/${data.id}`}
                class={`btn btn-warning btn-sm ${update == true ? "show" : "hide"}`}
              >
                <i class="fa fa-edit" name="action"
                ></i> Sửa
              </Link>
              <button
                name="action"
                onClick={(e) => this.passDataModal(e, data.id, data.title)}
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
    var { courses } = this.props
    var per_page = courses.per_page
    var current_page = courses.current_page
    var courses = typeof courses.data == "undefined" ? [] : courses.data

    return (
      <div class="table-responsive">
        <table class="table table-border " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>

              <th>Tên khóa học</th>
              <th>Mô tả ngắn</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(courses, per_page, current_page)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
