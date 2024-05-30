import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { shallowEqual } from "../../../../ultis/shallowEqual";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      txtBlogs: {},
      listBlog: {},
    };
  }

  componentDidMount() {
    var options = [];
    var blogs = [...this.props.blogs];
    if (blogs.length > 0) {
      options = blogs.map((blog, index) => {
        return { value: blog.id, label: blog.title };
      });
      this.setState({ listBlog: options });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.blogs, this.props.blogs)) {
      var options = [];
      var blogs = [...nextProps.blogs];
      if (blogs.length > 0) {
        options = blogs.map((blog, index) => {
          return { value: blog.id, label: blog.title };
        });
        this.setState({ listBlog: options });
      }
    }
    if (!shallowEqual(nextProps.item, this.props.item)) {
      this.setState({
        content: nextProps.item.content,
        txtBlogs: {
          label: nextProps.item.post_name,
          value: nextProps.item.post_id,
        },
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onChangeSelect = (selectValue) => {
    this.setState({ txtBlogs: selectValue });
  };

  onSave = async (e) => {
    var content = this.state.content;
    var post_name = this.state.txtBlogs.label;
    var post_id = this.state.txtBlogs.value;
    window.$(".modal").modal("hide");

    this.props.editPromiton({ content, post_name, post_id }, this.props.index);
  };
  render() {
    var { content, txtBlogs, listBlog } = this.state;
    console.log(this.props.item, this.state);
    return (
      <div
        class="modal modalPromotion fade"
        tabindex="-1"
        role="dialog"
        id="editPromotion"
        data-keyboard="false"
        data-backdrop="static"
        style={{ height: "450px" }}
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm khuyến mại</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form role="form" action="#" method="post" id="createForm">
              <div class="modal-body">
                <div class="form-group">
                  <label for="product_name">Nội dung khuyến mại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="Nhập tên danh mục"
                    autoComplete="off"
                    value={content}
                    onChange={this.onChange}
                    name="content"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Danh mục</label>
                  <Select
                    placeholder="-- Chọn danh mục --"
                    value={txtBlogs}
                    isClearable
                    isSearchable
                    options={listBlog}
                    name="txtCategory"
                    onChange={this.onChangeSelect}
                  />
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button
                  onClick={this.onSave}
                  type="button"
                  class="btn btn-info"
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(null, mapDispatchToProps)(ModalCreate);
