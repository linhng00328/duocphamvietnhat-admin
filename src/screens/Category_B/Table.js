import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default";
import * as CategoryPAction from "../../actions/category_product";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArr: [],
    };
  }

  passEditFunc = (
    e,
    id,
    name,
    image,
    isShowHome,
    meta_robots_index,
    meta_robots_follow,
    canonical_url,
    post_category_url
  ) => {
    this.props.handleUpdateCallBack({
      id: id,
      name: name,
      image_url: image,
      is_show_home: isShowHome,
      meta_robots_index,
      meta_robots_follow,
      canonical_url,
      post_category_url,
    });
    e.preventDefault();
  };

  componentDidMount() {
    this.setState({ listArr: this.props.data });
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.data, nextProps.data)) {
      this.setState({ listArr: nextProps.data });
    }
  }

  passDeleteFunc = (e, id, title) => {
    this.props.handleDelCallBack({ title: "danh mục", id: id, title: title });
    e.preventDefault();
  };
  deleteChild = (e, id, idChild, name) => {
    console.log("infor", name);
    this.props.handleDeleteChild({
      title: "danh mục con",
      id: id,
      idChild: idChild,
      name: name,
    });
    e.preventDefault();
  };
  createChild = (e, id) => {
    this.props.handleCreateChild({ id: id });
    e.preventDefault();
  };
  editChild = (
    e,
    id,
    idChild,
    name,
    image_url,
    meta_robots_index,
    meta_robots_follow,
    canonical_url,
    post_category_children_url
  ) => {
    this.props.handleUpdateChild({
      image: image_url,
      id: id,
      idChild: idChild,
      name: name,
      meta_robots_index,
      meta_robots_follow,
      canonical_url,
      post_category_children_url,
    });
    e.preventDefault();
  };
  onSortEnd = (oldIndex, newIndex) => {
    var listArr = arrayMove(this.state.listArr, oldIndex, newIndex);
    var listId = [];
    var listPosition = [];
    listArr.forEach((element, index) => {
      listId.push(element.id);
      listPosition.push(index + 1);
    });
    this.props.sortCategory(this.props.store_code, {
      ids: listId,
      positions: listPosition,
    });
    this.setState({
      listArr: listArr,
    });
  };

  showData = (categories) => {
    var result = null;
    var { update, _delete } = this.props;
    if (categories.length > 0) {
      result = categories.map((data, index) => {
        var image_url =
          data.image_url == null || data.image_url == ""
            ? Env.IMG_NOT_FOUND
            : data.image_url;

        return (
          <SortableItem key={data.id}>
            <div class="resp-table-row hover-product" style={{ width: "100%" }}>
              <div class="table-body-cell">{index + 1}</div>
              <div class="table-body-cell" style={{ width: "15%" }}>
                <img
                  src={image_url}
                  className="img-responsive"
                  alt="Image"
                  width="100px"
                  height="100px"
                />
              </div>
              <div
                class="table-body-cell table-custom"
                style={{ width: "35%" }}
              >
                <div
                  className="wrap-conten"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    className="name-category"
                    style={{
                      width: "50%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data.title}
                  </div>
                  <div className="group-btn-table">
                    <Link
                      to={`/posts/category/edit/${this.props.store_code}/${data.id}`}
                      class={`btn btn-warning btn-sm ${
                        update == true ? "show" : "hide"
                      }`}
                    >
                      <i class="fa fa-edit"></i> Sửa
                    </Link>

                    <a
                      style={{ marginLeft: "10px", color: "white" }}
                      onClick={(e) =>
                        this.passDeleteFunc(e, data.id, data.title)
                      }
                      data-toggle="modal"
                      data-target="#removeModal"
                      class={`btn btn-danger btn-sm ${
                        _delete == true ? "show" : "hide"
                      }`}
                    >
                      <i class="fa fa-trash"></i> Xóa
                    </a>
                  </div>
                </div>
              </div>

              <div class="table-body-cell" style={{ position: "relative" }}>
                {data.category_children.map((data1, index) => {
                  var image_url_child =
                    data1.image_url == null || data1.image_url == ""
                      ? Env.IMG_NOT_FOUND
                      : data1.image_url;
                  return (
                    <>
                      <div
                        className="wrap-conten-child"
                        style={{
                          display: "flex",
                          padding: "3px",
                          borderBottom: "1px solid #bdbdbd",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          className="wrap-img-child"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={image_url_child}
                            className="img-responsive"
                            alt="Image"
                            width="30px"
                            height="30px"
                            style={{ marginRight: "10px" }}
                          />
                          <div
                            className="name-category"
                            style={{
                              width: "50%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {data1.name}
                          </div>
                        </div>
                        <div
                          class="button-category btn-group"
                          style={{ height: "30px" }}
                        >
                          <a
                            style={{ marginLeft: "10px", color: "white" }}
                            onClick={(e) =>
                              this.editChild(
                                e,
                                data.id,
                                data1.id,
                                data1.name,
                                data1.image_url,
                                data1.meta_robots_index,
                                data1.meta_robots_follow,
                                data1.canonical_url,
                                data1.post_category_children_url
                              )
                            }
                            data-toggle="modal"
                            data-target="#updateModalChild"
                            class={`btn btn-warning btn-sm ${
                              update == true ? "show" : "hide"
                            }`}
                          >
                            <i class="fa fa-edit"></i>Sửa
                          </a>
                          <a
                            style={{ marginLeft: "10px", color: "white" }}
                            onClick={(e) =>
                              this.deleteChild(e, data.id, data1.id, data1.name)
                            }
                            data-toggle="modal"
                            data-target="#removeModalChild"
                            class={`btn btn-danger btn-sm ${
                              _delete == true ? "show" : "hide"
                            }`}
                          >
                            <i class="fa fa-trash"></i> Xóa
                          </a>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div
                  className="create-category-child"
                  style={{ float: "right" }}
                >
                  <a
                    style={{ marginLeft: "10px", width: "28px" }}
                    onClick={(e) => this.createChild(e, data.id)}
                    data-toggle="modal"
                    data-target="#createModalChild"
                    class={`btn btn-info btn-icon-split btn-sm show ${
                      _delete == true ? "show" : "hide"
                    }`}
                  >
                    <i class="fas fa-plus" style={{ padding: "6px" }}></i>
                  </a>
                </div>
              </div>
              <div></div>
            </div>
          </SortableItem>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    console.log("category", this.state.listArr);
    return (
      <div id="resp-table">
        <div className="resp-table-body">
          <div style={{ fontWeight: "500" }} class="table-body-cell">
            STT
          </div>
          <div style={{ fontWeight: "500" }} class="table-body-cell">
            Hình ảnh
          </div>
          <div style={{ fontWeight: "500" }} class="table-body-cell">
            Tên danh mục
          </div>
          <div style={{ fontWeight: "500" }} class="table-body-cell">
            Danh mục con
          </div>
        </div>
        <SortableList
          allowDrag={false}
          onSortEnd={this.onSortEnd}
          className="resp-table-body"
          draggedItemClassName="dragged"
        >
          {this.showData(this.state.listArr)}
        </SortableList>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    sortCategory: (store_code, data) => {
      dispatch(CategoryPAction.sortCategory(store_code, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
