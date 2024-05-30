import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "../Blog/Pagination"
import * as Env from "../../ultis/default"
import { format } from "../../ultis/helpers"
import * as blogAction from "../../actions/blog";

class ListBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue : ""
    }
  }

  handleAddBlog = (id, name, img) => {
    window.$('.modal').modal('hide');

    this.props.handleAddBlog({
      id,
      name,
      img,
    })
  }

  showData = (blogs) => {
    var result = null;
    if (typeof blogs === "undefined") {
      return result;
    }
    if (blogs.length > 0) {
      result = blogs.map((data, index) => {
        var image_url = data.image_url == null || data.image_url == "" ? Env.IMG_NOT_FOUND : data.image_url
        var published = data.published == true ? "Đang hiển thị" : "Đang lưu tạm"
        var published_status = data.published == true ? "success" : "secondary"
        return (
          <tr >


            <td>{index + 1}</td>
          

            <td>

              <img src={image_url} className="img-responsive" alt="Image" width="100px" height="100px" />
            </td>

            <td>{data.title}</td>

            <td>
              {" "}
                <span class={`${published_status}`}>
                  {published}
                </span>
            </td>
            <td>{data.count_view}</td>


            <td >
              <button
                type="button"
                onClick={() => this.handleAddBlog(data.id, data.title, image_url)}

                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i>Chọn
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

  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    var params = `&search=${searchValue}`;
    this.props.fetchAllBlog(store_code, 1, params);
  };

  render() {
    var { blogs  , store_code} = this.props
    var {searchValue} = this.state

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
            <div class="modal-header" style={{ background: "white" }}>
            <h4 style={{ color: "black", display: "block" }}>Chọn bài viết</h4>

              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            <form style={{marginTop : "10px"}} onSubmit={this.searchData}>
              <div
                class="input-group mb-6"
                style={{ padding: "0 20px" }}
              >
                <input
                  style={{ maxWidth: "280px", minWidth: "150px" }}
                  type="search"
                  name="txtSearch"
                  value={searchValue}
                  onChange={this.onChangeSearch}
                  class="form-control"
                  placeholder="Tìm kiếm bài viết"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
        
            </form>

            <div class="table-responsive">
              <table class="table  table-hover table-border" style={{ color: "black" }}>
                <thead>
                <tr>
              <th>STT</th>

              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th>Hiển thị</th>
              <th>Lượt xem</th>
              <th>Hành động</th>
            </tr>
                </thead>

                <tbody>{this.showData(blogs.data)}</tbody>
              </table>
            </div>

            <div  class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12">

<Pagination style = "float-fix" store_code={store_code} blogs={blogs} />
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
  return {
    fetchAllBlog: (id, page, params) => {
      dispatch(blogAction.fetchAllBlog(id, page, params));
    },
  };
};
export default connect(null, mapDispatchToProps)(ListBlog);
