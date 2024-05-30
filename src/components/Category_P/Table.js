import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default";
import * as CategoryPAction from "../../actions/category_product";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
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
    banner_ads,
    description,
    meta_robots_index,
    meta_robots_follow,
    canonical_url,
    product_category_url
  ) => {
    this.props.handleUpdateCallBack({
      id: id,
      name: name,
      image_url: image,
      is_show_home: isShowHome,
      banner_ads: banner_ads,
      description,
      meta_robots_index,
      meta_robots_follow,
      canonical_url,
      product_category_url,
    });
    e.preventDefault();
  };

  componentDidMount() {
    this.setState({ listArr: this.props.category_product });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(this.props.category_product, nextProps.category_product)
    ) {
      this.setState({ listArr: nextProps.category_product });
    }
  }

  passDeleteFunc = (e, id, name) => {
    this.props.handleDelCallBack({ title: "danh mục", id: id, name: name });
    e.preventDefault();
  };
  deleteChild = (e, id, idChild, name) => {
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
    description,
    meta_robots_index,
    meta_robots_follow,
    canonical_url,
    category_children_url
  ) => {
    this.props.handleUpdateChild({
      image: image_url,
      id: id,
      idChild: idChild,
      name: name,
      description,
      meta_robots_index,
      meta_robots_follow,
      canonical_url,
      category_children_url,
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

  onSortChildren = (oldIndex, newIndex, indexParent) => {
    var arrChildren = this.state.listArr[indexParent].category_children;

    arrChildren = arrayMove(arrChildren, oldIndex, newIndex);
    var listId = [];
    var listPosition = [];
    arrChildren.forEach((element, index) => {
      listId.push(element.id);
      listPosition.push(index + 1);
    });
    var listArrNew = this.state.listArr;
    listArrNew[indexParent].category_children = arrChildren;
    this.props.sortCategoryChildren(this.props.store_code, {
      ids: listId,
      positions: listPosition,
    });
    this.setState({
      listArr: listArrNew,
    });
  };

  showData = (categories) => {
    var result = null;
    var { update, _delete, insert } = this.props;
    if (categories.length > 0) {
      result = categories.map((data, index) => {
        console.log("data", data);
        var image_url =
          data.image_url == null || data.image_url == ""
            ? Env.IMG_NOT_FOUND
            : data.image_url;

        return (
          <SortableItem key={data.id}>
            <div
              class="resp-table-row"
              style={{
                width: "100%",
                cursor: "auto",
                background: index % 2 == 0 ? "#F6F7F7C2" : null,
              }}
            >
              <div class="table-body-cell" style={{ width: "65px" }}>
                <SortableKnob>
                  <span style={{ cursor: "move" }}>
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 10.75H5.99998C5.85218 10.751 5.70747 10.7077 5.58449 10.6257C5.46151 10.5437 5.3659 10.4268 5.30998 10.29C5.25231 10.1528 5.23673 10.0016 5.26523 9.85561C5.29372 9.70959 5.36499 9.57535 5.46998 9.46995L11.47 3.46995C11.6106 3.3295 11.8012 3.25061 12 3.25061C12.1987 3.25061 12.3894 3.3295 12.53 3.46995L18.53 9.46995C18.635 9.57535 18.7062 9.70959 18.7347 9.85561C18.7632 10.0016 18.7476 10.1528 18.69 10.29C18.6341 10.4268 18.5384 10.5437 18.4155 10.6257C18.2925 10.7077 18.1478 10.751 18 10.75ZM7.80998 9.24995H16.19L12 5.05995L7.80998 9.24995Z"
                        fill="#a6a4a4"
                      />
                      <path
                        d="M12 20.7499C11.9014 20.7504 11.8038 20.7311 11.7128 20.6934C11.6218 20.6556 11.5392 20.6 11.47 20.5299L5.46998 14.5299C5.36499 14.4245 5.29372 14.2903 5.26523 14.1442C5.23673 13.9982 5.25231 13.847 5.30998 13.7099C5.3659 13.5731 5.46151 13.4561 5.58449 13.3742C5.70747 13.2922 5.85218 13.2489 5.99998 13.2499H18C18.1478 13.2489 18.2925 13.2922 18.4155 13.3742C18.5384 13.4561 18.6341 13.5731 18.69 13.7099C18.7476 13.847 18.7632 13.9982 18.7347 14.1442C18.7062 14.2903 18.635 14.4245 18.53 14.5299L12.53 20.5299C12.4607 20.6 12.3782 20.6556 12.2872 20.6934C12.1962 20.7311 12.0985 20.7504 12 20.7499ZM7.80998 14.7499L12 18.9399L16.19 14.7499H7.80998Z"
                        fill="#a6a4a4"
                      />
                    </svg>
                  </span>
                </SortableKnob>

                {index + 1}
              </div>
              <div class="table-body-cell" style={{ width: "65px" }}>
                <img
                  src={image_url}
                  className="img-responsive"
                  alt="Image"
                  width="59px"
                  height="59px"
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
                    {data.name}
                  </div>
                  <div className="group-btn-table">
                    {update ? (
                      <a
                        style={{
                          marginLeft: "10px",
                          color: "#d69a2b",
                          fontSize: 18,
                        }}
                        onClick={(e) =>
                          this.passEditFunc(
                            e,
                            data.id,
                            data.name,
                            data.image_url,
                            data.is_show_home,
                            data.banner_ads,
                            data.description,
                            data.meta_robots_index,
                            data.meta_robots_follow,
                            data.canonical_url,
                            data.category_url
                          )
                        }
                        data-toggle="modal"
                        data-target="#updateModal"
                      >
                        <i class="fa fa-edit"></i>
                      </a>
                    ) : null}
                    {_delete ? (
                      <a
                        style={{
                          marginLeft: "10px",
                          color: "#ff6767",
                          fontSize: 18,
                        }}
                        onClick={(e) =>
                          this.passDeleteFunc(e, data.id, data.name)
                        }
                        data-toggle="modal"
                        data-target="#removeModal"
                      >
                        <i class="fa fa-trash"></i>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <SortableList
                class="table-body-cell"
                onSortEnd={(old, newI) => {
                  this.onSortChildren(old, newI, index);
                }}
                style={{ position: "relative" }}
              >
                {data.category_children.map((data1, index) => {
                  var image_url_child =
                    data1.image_url == null || data1.image_url == ""
                      ? Env.IMG_NOT_FOUND
                      : data1.image_url;
                  return (
                    <SortableItem key={data1.id}>
                      <div
                        className="wrap-conten-child"
                        style={{
                          display: "flex",
                          padding: "3px",
                          borderBottom: "1px solid rgb(246 233 233)",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          className="wrap-img-child"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <SortableKnob>
                            <span style={{ cursor: "move" }}>
                              <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18 10.75H5.99998C5.85218 10.751 5.70747 10.7077 5.58449 10.6257C5.46151 10.5437 5.3659 10.4268 5.30998 10.29C5.25231 10.1528 5.23673 10.0016 5.26523 9.85561C5.29372 9.70959 5.36499 9.57535 5.46998 9.46995L11.47 3.46995C11.6106 3.3295 11.8012 3.25061 12 3.25061C12.1987 3.25061 12.3894 3.3295 12.53 3.46995L18.53 9.46995C18.635 9.57535 18.7062 9.70959 18.7347 9.85561C18.7632 10.0016 18.7476 10.1528 18.69 10.29C18.6341 10.4268 18.5384 10.5437 18.4155 10.6257C18.2925 10.7077 18.1478 10.751 18 10.75ZM7.80998 9.24995H16.19L12 5.05995L7.80998 9.24995Z"
                                  fill="#a6a4a4"
                                />
                                <path
                                  d="M12 20.7499C11.9014 20.7504 11.8038 20.7311 11.7128 20.6934C11.6218 20.6556 11.5392 20.6 11.47 20.5299L5.46998 14.5299C5.36499 14.4245 5.29372 14.2903 5.26523 14.1442C5.23673 13.9982 5.25231 13.847 5.30998 13.7099C5.3659 13.5731 5.46151 13.4561 5.58449 13.3742C5.70747 13.2922 5.85218 13.2489 5.99998 13.2499H18C18.1478 13.2489 18.2925 13.2922 18.4155 13.3742C18.5384 13.4561 18.6341 13.5731 18.69 13.7099C18.7476 13.847 18.7632 13.9982 18.7347 14.1442C18.7062 14.2903 18.635 14.4245 18.53 14.5299L12.53 20.5299C12.4607 20.6 12.3782 20.6556 12.2872 20.6934C12.1962 20.7311 12.0985 20.7504 12 20.7499ZM7.80998 14.7499L12 18.9399L16.19 14.7499H7.80998Z"
                                  fill="#a6a4a4"
                                />
                              </svg>
                            </span>
                          </SortableKnob>
                          <img
                            src={image_url_child}
                            className="img-responsive"
                            alt="Image"
                            width="45px"
                            height="45px"
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
                          {update ? (
                            <a
                              style={{
                                marginLeft: "10px",
                                color: "#d69a2b",
                                fontSize: 18,
                              }}
                              onClick={(e) =>
                                this.editChild(
                                  e,
                                  data.id,
                                  data1.id,
                                  data1.name,
                                  data1.image_url,
                                  data1.description,
                                  data1.meta_robots_index,
                                  data1.meta_robots_follow,
                                  data1.canonical_url,
                                  data1.category_children_url
                                )
                              }
                              data-toggle="modal"
                              data-target="#updateModalChild"
                            >
                              <i class="fa fa-edit"></i>
                            </a>
                          ) : null}
                          {_delete ? (
                            <a
                              style={{
                                marginLeft: "10px",
                                color: "#ff6767",
                                fontSize: 18,
                              }}
                              onClick={(e) =>
                                this.deleteChild(
                                  e,
                                  data.id,
                                  data1.id,
                                  data1.name
                                )
                              }
                              data-toggle="modal"
                              data-target="#removeModalChild"
                            >
                              <i class="fa fa-trash"></i>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </SortableItem>
                  );
                })}
                <div
                  className="create-category-child"
                  style={{ float: "right" }}
                >
                  {insert ? (
                    <a
                      style={{
                        marginLeft: "10px",
                        width: "28px",
                        color: "white",
                        fontSize: 14,
                      }}
                      onClick={(e) => this.createChild(e, data.id)}
                      data-toggle="modal"
                      data-target="#createModalChild"
                      class={`btn btn-info btn-icon-split btn-sm show`}
                    >
                      <i class="fas fa-plus" style={{ padding: "6px" }}></i>
                    </a>
                  ) : null}
                </div>
              </SortableList>
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
    sortCategoryChildren: (store_code, data) => {
      dispatch(CategoryPAction.sortCategoryChildren(store_code, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
