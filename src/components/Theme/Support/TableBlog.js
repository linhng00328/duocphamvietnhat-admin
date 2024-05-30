import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../../Blog/Pagination";
import * as Env from "../../../ultis/default";
import { format } from "../../../ultis/helpers";
import themeData from "../../../ultis/theme_data";

class ListBlog extends Component {
  constructor(props) {
    super(props);
  }

  handleAddBlog = (id, name, img) => {
    window.$(".modal").modal("hide");

    this.props.handleAddBlog({
      id,
      name,
      img,
    });
  };

  showData = (blogs, per_page, current_page) => {
    var result = null;
    if (typeof blogs === "undefined") {
      return result;
    }
    if (blogs.length > 0) {
      result = blogs.map((data, index) => {
        var image_url =
          data.image_url == null || data.image_url == ""
            ? Env.IMG_NOT_FOUND
            : data.image_url;
        var published =
          data.published == true ? "Đang hiển thị" : "Đang lưu tạm";
        var published_status = data.published == true ? "success" : "secondary";
        return (
          <tr>
            {/* <td>{index + 1}</td> */}
            <td>{per_page * (current_page - 1) + (index + 1)}</td>

            <td style={{ textAlign: "center" }}>
              <img
                src={image_url}
                className="img-responsive"
                alt="Image"
                width="100px"
                height="100px"
              />
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

            <td>
              <button
                type="button"
                onClick={() =>
                  this.handleAddBlog(data.id, data.title, image_url)
                }
                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i> Chọn bài viết
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
    var { blogs, store_code } = this.props;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="showListBlog"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 style={{ color: "white" }}>Danh sách bài viết</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th>STT</th>

                    <th style={{ textAlign: "center" }}>Hình ảnh</th>
                    <th>Tên bài viết</th>
                    <th>Trạng thái</th>
                    <th>Lượt xem</th>
                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {this.showData(
                    blogs.data,
                    this.props.per_page,
                    this.props.current_page
                  )}
                </tbody>
              </table>
            </div>

            <div class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Pagination
                style="float-fix"
                store_code={store_code}
                blogs={blogs}
              />
              <button
                type="button"
                class="btn btn-default pagination-btn"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ListBlog);
