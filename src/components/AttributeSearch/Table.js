import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowEqual } from "../../ultis/shallowEqual";
import { Link } from "react-router-dom";
import * as Env from "../../ultis/default";
import * as attributeSearch from "../../actions/attribute_search";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArr: [],
    };
  }

  passEditFunc = (e, id, name, image, isShowHome) => {
    this.props.handleUpdateCallBack({
      id: id,
      name: name,
      image_url: image,
      is_show_home: isShowHome,
    });
    e.preventDefault();
  };

  componentDidMount() {
    this.setState({ listArr: this.props.attribute_search });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(this.props.attribute_search, nextProps.attribute_search)
    ) {
      this.setState({ listArr: nextProps.attribute_search });
    }
  }

  passDeleteFunc = (e, id, name) => {
    this.props.handleDelCallBack({
      title: "thuộc tính",
      id: id,
      name: name,
    });
    e.preventDefault();
  };
  deleteChild = (e, id, idChild, name) => {
    console.log("infor", name);
    this.props.handleDeleteChild({
      title: "thuộc tính con",
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
  editChild = (e, id, idChild, name, image_url) => {
    this.props.handleUpdateChild({
      image: image_url,
      id: id,
      idChild: idChild,
      name: name,
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
    this.props.sortAttributeSearch(this.props.store_code, {
      ids: listId,
      positions: listPosition,
    });
    this.setState({
      listArr: listArr,
    });
  };

  showData = (categories) => {
    var result = null;
    var { update, _delete, insert } = this.props;
    if (categories.length > 0) {
      result = categories.map((data, index) => {
        return (
          <SortableItem key={data.id}>
            <div class="resp-table-row" style={{ width: "100%" }}>
              <div class="table-body-cell">{index + 1}</div>
              <div
                class="table-body-cell table-custom"
                style={{ width: "50%" }}
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
                    <a
                      style={{ marginLeft: "10px", color: "white" }}
                      onClick={(e) =>
                        this.passEditFunc(
                          e,
                          data.id,
                          data.name,
                          data.image_url,
                          data.is_show_home
                        )
                      }
                      data-toggle="modal"
                      data-target="#updateModal"
                      class={`btn btn-warning btn-sm ${
                        update == true ? "show" : "hide"
                      }`}
                    >
                      <i class="fa fa-edit"></i>Sửa
                    </a>
                    <a
                      style={{ marginLeft: "10px", color: "white" }}
                      onClick={(e) =>
                        this.passDeleteFunc(e, data.id, data.name)
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
                {data.product_attribute_search_children.map((data1, index) => {
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
                          <div
                            className="name-category"
                            style={{
                              width: "100%",
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
                                data1.image_url
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
                  {insert ? (
                    <a
                      style={{ marginLeft: "10px", width: "28px" }}
                      onClick={(e) => this.createChild(e, data.id)}
                      data-toggle="modal"
                      data-target="#createModalChild"
                      class={`btn btn-info btn-icon-split btn-sm show`}
                    >
                      <i class="fas fa-plus" style={{ padding: "6px" }}></i>
                    </a>
                  ) : null}
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
            Tên thuộc tính
          </div>
          <div style={{ fontWeight: "500" }} class="table-body-cell">
            Thuộc tính con
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
    sortAttributeSearch: (store_code, data) => {
      dispatch(attributeSearch.sortAttributeSearch(store_code, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
