import React, { Component } from "react";
import * as helper from "../../../ultis/helpers";
import ModalUploadDis from "./Distribute/ModalUpload";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import Alert from "../../Partials/Alert";
import * as productAction from "../../../actions/product";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import arrayMove from "array-move";

class Distribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_distribute: [],
      listImgDistribute: [],
      ImgDistribute: {},
    };
  }

  onChange = (e, type, obj) => {
    var value = e.target.value;
    var value_data = value;

    var list_distribute = [...this.state.list_distribute];

    list_distribute[0].element_distributes =
      list_distribute[0].element_distributes.map((ele) => {
        if (
          ele.sub_element_distributes != null &&
          ele.sub_element_distributes.length > 0
        ) {
          ele.sub_element_distributes = ele.sub_element_distributes.map(
            (sub) => {
              if (sub.id != null) {
                sub.is_edit = true;
              }

              if (sub.id != null && sub.before_name == null) {
                sub.before_name = sub.name;
                sub.is_edit = true;
              }

              if (sub.id == null) {
                sub.is_edit = false;
              }

              return sub;
            }
          );
        }

        if (ele.id != null && ele.before_name == null) {
          ele.before_name = ele.name;
          ele.is_edit = true;
        }

        if (ele.id == null) {
          ele.is_edit = false;
        }

        return ele;
      });

    if (type == "PARENT") {
      if (obj.name == "name") {
        list_distribute[0].name = value;
      } else if (obj.name == "barcode") {
        list_distribute[0].element_distributes[obj.index][obj.name] = value;
      } else if (obj.name == "sku") {
        list_distribute[0].element_distributes[obj.index][obj.name] = value;
      } else if (obj.name == "value") {
        list_distribute[0].element_distributes[obj.index].name = value;
      } else {
        try {
          const _value = formatNumber(value);
          if (obj.name == "barcode") {
            list_distribute[0].element_distributes[obj.index][obj.name] = data;
          } else {
            if (!isNaN(Number(_value))) {
              var data = new Intl.NumberFormat().format(_value);
              if (obj.name == "quantity_in_stock") {
                if (value_data == "") {
                  data = "";
                } else {
                  data = data;
                }
              }
              list_distribute[0].element_distributes[obj.index][obj.name] =
                data;
            }
          }
        } catch (error) {
          list_distribute[0].element_distributes[obj.index][obj.name] = value;
        }
      }

      this.setState({ list_distribute: [...list_distribute] });
    }
    if (type == "SUP") {
      if (obj.name == "name") {
        list_distribute[0].sub_element_distribute_name = value;
      } else if (obj.name == "barcode") {
        list_distribute[0].element_distributes[
          obj._index
        ].sub_element_distributes[obj.index][obj.name] = value;
      } else if (obj.name == "sku") {
        list_distribute[0].element_distributes[
          obj._index
        ].sub_element_distributes[obj.index][obj.name] = value;
      } else if (obj.name == "value") {
        list_distribute[0].element_distributes.forEach((element) => {
          element.sub_element_distributes[obj.index].name = value;
        });
      } else {
        console.log(type, obj, this.state.list_distribute);
        try {
          const _value = formatNumber(value);
          if (!isNaN(Number(_value))) {
            var data = new Intl.NumberFormat().format(_value);
            if (obj.name == "quantity_in_stock") {
              if (value_data == "") {
                data = "";
              } else {
                data = data;
              }
            }
            list_distribute[0].element_distributes[
              obj._index
            ].sub_element_distributes[obj.index][obj.name] = data;
          }
        } catch (error) {
          // list_distribute[0].element_distributes[obj._index].sub_element_distributes.push({ name: obj.title })

          const _value = formatNumber(value);
          if (!isNaN(Number(_value))) {
            var data = new Intl.NumberFormat().format(_value);
            if (obj.name == "quantity_in_stock") {
              if (value_data == "") {
                data = "";
              } else {
                data = data;
              }
            }
            list_distribute[0].element_distributes[
              obj._index
            ].sub_element_distributes[obj.index][obj.name] = data;
          }
        }
      }
      console.log(list_distribute);
      this.setState({ list_distribute: [...list_distribute] });
    }
  };

  removeListFromImg = (e, index) => {
    var list_distribute = [...this.state.list_distribute];

    if (list_distribute[0].element_distributes.length > 0) {
      if (list_distribute.length > 0) {
        list_distribute[0].element_distributes[index].image_url = null;
        this.setState({ list_distribute: [...list_distribute] });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(
        nextProps.product.distributes,
        this.props.product.distributes
      )
    ) {
      var distributes = [...nextProps.product.distributes];
      if (distributes && distributes.length > 0) {
        distributes[0].element_distributes.forEach((element, key) => {
          if (element.sub_element_distributes.length > 0) {
            element.sub_element_distributes.forEach((_element, _key) => {
              if (_element.name == null || _element.name == "") {
                var count = distributes[0].element_distributes.length;
                var value = "";
                for (let index = 0; index < count; index++) {
                  if (
                    distributes[0].element_distributes[index]
                      .sub_element_distributes[_key].name != "" &&
                    distributes[0].element_distributes[index]
                      .sub_element_distributes[_key].name
                  )
                    value =
                      distributes[0].element_distributes[index]
                        .sub_element_distributes[_key].name;
                }
                element.sub_element_distributes[_key].name = value;
              }
            });
          }
        });
      }
      console.log(distributes);
      this.props.handleDataFromDistribute(distributes);

      this.setState({ list_distribute: distributes });
    }
    if (
      !shallowEqual(nextProps.listImgDistribute, this.props.listImgDistribute)
    ) {
      var listImg = [...nextProps.listImgDistribute];
      var list_distribute = [...this.state.list_distribute];
      console.log(listImg);
      if (listImg.length > 0) {
        listImg.forEach((img) => {
          list_distribute[0].element_distributes[img.index].image_url =
            img.data;
        });
        this.setState({ list_distribute: [...list_distribute] });
      }
    }
  }

  addRow = () => {
    var list_distribute = [...this.state.list_distribute];
    console.log(list_distribute);
    if (list_distribute.length == 0) {
      console.log("aaaa");
      list_distribute = [{ element_distributes: [] }];
      list_distribute[0].name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
        position: 0,
      };
      list_distribute[0].element_distributes.push(newObject);
    } else if (typeof list_distribute[0].name == "undefined") {
      console.log("bbbbb");

      list_distribute[0].name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
        position: 0,
      };
      list_distribute[0].element_distributes.push(newObject);
    } else if (
      typeof list_distribute[0].sub_element_distribute_name == "undefined" ||
      (typeof list_distribute[0].name !== "undefined" &&
        list_distribute[0].element_distributes[0].sub_element_distributes
          .length == 0 &&
        typeof list_distribute[0].element_distributes[0]
          .sub_element_distributes != "undefined")
    ) {
      list_distribute[0].sub_element_distribute_name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        import_price: null,
        position: 0,
      };
      list_distribute[0].element_distributes.forEach((element) => {
        typeof element == "object" &&
          element.sub_element_distributes.push({ ...newObject });
      });
    } else {
      console.log("nott");
    }

    this.setState({ list_distribute: [...list_distribute] });
  };

  addRowChildSup = () => {
    var list_distribute = [...this.state.list_distribute];

    var newObject = {
      name: null,
      image_url: null,
      price: null,
      quantity_in_stock: null,
      import_price: null,
    };
    list_distribute[0].element_distributes.forEach((element) => {
      typeof element == "object" &&
        element.sub_element_distributes.push({
          ...newObject,
          position: element.sub_element_distributes.length,
        });
    });
    // list_distribute[0].element_distributes[0].sub_element_distributes.push(newObject)
    this.setState({ list_distribute: [...list_distribute] });
  };

  removeRow = () => {
    var list_distribute = [...this.state.list_distribute];
    console.log(list_distribute);
    if (
      typeof list_distribute[0].sub_element_distribute_name !== "undefined" &&
      list_distribute[0].element_distributes[0].sub_element_distributes.length >
        0
    ) {
      list_distribute[0].name = list_distribute[0].sub_element_distribute_name;

      list_distribute[0].element_distributes = [
        ...list_distribute[0].element_distributes[0].sub_element_distributes,
      ];
      delete list_distribute[0].sub_element_distribute_name;
    } else {
      console.log("asdas");
      delete list_distribute[0].name;
      list_distribute[0].element_distributes = [];
    }
    this.setState({ list_distribute: [...list_distribute] });
  };

  removeRowChild = (key) => {
    var list_distribute = [...this.state.list_distribute];
    list_distribute[0].element_distributes.splice(key, 1);

    if (
      list_distribute[0].element_distributes &&
      list_distribute[0].element_distributes.length == 0
    ) {
      this.setState({ list_distribute: [] });
      return;
    }
    list_distribute[0].element_distributes =
      list_distribute[0].element_distributes.map((item, index) => ({
        ...item,
        position: index,
      }));

    this.setState({ list_distribute: [...list_distribute] });
  };

  removeRowChildSup = (key) => {
    console.log(key);
    var list_distribute = [...this.state.list_distribute];
    list_distribute[0].element_distributes.forEach((element, _key) => {
      if (element.sub_element_distributes.length > 0) {
        element.sub_element_distributes.forEach((item, index) => {
          if (key == index) {
            element.sub_element_distributes.splice(index, 1);
          }
        });
      }
    });

    list_distribute[0].element_distributes.forEach((element, _key) => {
      if (element.sub_element_distributes.length > 0) {
        element.sub_element_distributes.forEach((item, index) => {
          item.position = index;
        });
      }
    });

    this.setState({ list_distribute: [...list_distribute] });
  };
  getIdImg = (e, image) => {
    this.setState({ ImgDistribute: image });
  };
  addRowChild = () => {
    console.log("child 2");
    var list_distribute = [...this.state.list_distribute];
    var sub_element_distributes = [];
    if (list_distribute.length > 0) {
      sub_element_distributes =
        list_distribute[0].element_distributes.length > 0
          ? list_distribute[0].element_distributes[0].sub_element_distributes
          : [];
    }
    var newItem = [];
    sub_element_distributes.forEach((element) => {
      newItem.push({ ...element });
    });

    var newObject = {
      name: null,
      image_url: null,
      price: null,
      quantity_in_stock: null,
      position: list_distribute[0].element_distributes.length,
      sub_element_distributes: [...newItem],
    };

    list_distribute[0].element_distributes.push({ ...newObject });
    this.setState({ list_distribute: [...list_distribute] });
  };
  showRows = (list_distribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }

    if (
      list_distribute.length > 0 &&
      list_distribute[0].element_distributes?.length > 0
    ) {
      return (
        <tr>
          <td
            style={{
              verticalAlign: "top",
            }}
          >
            <input
              type="text"
              id="input"
              class={`form-control`}
              value={list_distribute[0].name}
              required="required"
              onChange={(e) =>
                this.onChange(e, "PARENT", { name: "name", index: 0 })
              }
            />
          </td>
          <td colSpan={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <SortableList
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
                onSortEnd={this.onSortEnd}
              >
                {list_distribute.map((_data) => {
                  if (_data.element_distributes.length > 0) {
                    return _data.element_distributes.map((data, index) => {
                      var disable = index == 0 ? "" : "hide";
                      var disable_addButton =
                        index == _data.element_distributes.length - 1
                          ? ""
                          : "hide";

                      var method =
                        index == 0 && _data.element_distributes.length == 1
                          ? "removeRowChild"
                          : "removeRowChild";

                      var visible = index == 0 ? null : "visibled";
                      var border = index == 0 ? null : "hide-border";
                      var img = data.image_url;
                      var status_btn =
                        img == "" || img == null || typeof img == "undefined"
                          ? "show"
                          : "hide";
                      var status_img =
                        img == "" || img == null || typeof img == "undefined"
                          ? "hide"
                          : "show";
                      return (
                        <SortableItem key={data.id}>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <div
                              style={{
                                border: "none",
                                flexWrap: "nowrap",
                                alignItems: "start",
                              }}
                              className="col-6 row"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  alignItems: "center",
                                  width: "100%",
                                  columnGap: "5px",
                                }}
                              >
                                <span
                                  style={{
                                    flexShrink: 1,
                                  }}
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
                                </span>
                                <input
                                  type="text"
                                  id="input"
                                  class="form-control"
                                  value={data.name}
                                  onChange={(e) =>
                                    this.onChange(e, "PARENT", {
                                      name: "value",
                                      index,
                                    })
                                  }
                                  required="required"
                                />
                              </div>
                            </div>
                            <div
                              className="btn-img col-4"
                              style={{
                                paddingLeft: "50px",
                              }}
                            >
                              <button
                                class={`btn btn-primary btn-sm ${status_btn}`}
                                data-toggle="modal"
                                data-target="#uploadModalDis"
                                onClick={(e) => {
                                  this.getIdImg(e, { index });
                                }}
                              >
                                <i class="fa fa-plus"></i> Upload ảnh
                              </button>

                              <div className={`box ${status_img}`}>
                                <div
                                  className={`box-icon`}
                                  style={{ width: "100px" }}
                                  onClick={(e) =>
                                    this.removeListFromImg(e, index)
                                  }
                                >
                                  <i class="fas cursor fa-times-circle"></i>
                                </div>
                                <img
                                  src={img}
                                  width="100"
                                  height="100"
                                  class="img-responsive"
                                  alt="Image"
                                />
                              </div>
                            </div>
                            <div
                              className="btn-action col-2"
                              style={{
                                border: "none",
                                paddingLeft: "35px",
                                verticalAlign: "top",
                              }}
                            >
                              <button
                                class="btn btn-danger btn-sm"
                                onClick={() => {
                                  this[method](index);
                                }}
                              >
                                <i class="fa fa-trash"></i> Xóa
                              </button>
                            </div>
                          </div>
                        </SortableItem>
                      );
                    });
                  }
                })}
              </SortableList>
              <div>
                <button
                  onClick={this.addRowChild}
                  class={`btn btn-success btn-sm`}
                >
                  <i class="fa fa-plus"></i>
                  Thêm thuộc tính
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return result;
  };

  showRowsSuper = (list_distribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }
    if (
      list_distribute.length > 0 &&
      list_distribute[0].element_distributes?.length > 0 &&
      list_distribute[0].element_distributes[0]?.sub_element_distributes
        ?.length > 0
    ) {
      return (
        <>
          <h6>Tên phân loại phụ </h6>
          <tr>
            <td
              style={{
                verticalAlign: "top",
              }}
            >
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  this.onChange(e, "SUP", {
                    name: "name",
                    index: 0,
                    _index: 0,
                  })
                }
                id="input"
                class={`form-control`}
                value={list_distribute[0].sub_element_distribute_name}
                required="required"
              />
            </td>
            <td colSpan={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <SortableList
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                  onSortEnd={this.onSortEndSub}
                >
                  {list_distribute.map((_data, _index) => {
                    if (_data.element_distributes.length > 0) {
                      if (
                        typeof _data.element_distributes[0]
                          .sub_element_distributes == "undefined"
                      ) {
                        return [];
                      } else {
                        if (
                          _data.element_distributes[0].sub_element_distributes
                            .length > 0
                        ) {
                          return _data.element_distributes[0].sub_element_distributes.map(
                            (data, index) => {
                              var disable = index == 0 ? "" : "hide";
                              var method =
                                index == 0
                                  ? "removeRowChildSup"
                                  : "removeRowChildSup";
                              var disable_addButton =
                                index ==
                                _data.element_distributes[0]
                                  .sub_element_distributes.length -
                                  1
                                  ? ""
                                  : "hide";
                              var visible = index == 0 ? null : "visibled";
                              var border = index == 0 ? null : "hide-border";
                              var img = data.image_url;
                              var status_btn =
                                img == "" ||
                                img == null ||
                                typeof img == "undefined"
                                  ? "show"
                                  : "hide";
                              var status_img =
                                img == "" ||
                                img == null ||
                                typeof img == "undefined"
                                  ? "hide"
                                  : "show";
                              return (
                                <SortableItem key={data.id}>
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <div
                                      style={{
                                        border: "none",
                                        flexWrap: "nowrap",
                                        alignItems: "start",
                                      }}
                                      className="col-6 row"
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "nowrap",
                                          alignItems: "center",
                                          width: "100%",
                                          columnGap: "5px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            flexShrink: 1,
                                          }}
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
                                        </span>
                                        <input
                                          onChange={(e) =>
                                            this.onChange(e, "SUP", {
                                              name: "value",
                                              index,
                                              _index: 0,
                                            })
                                          }
                                          type="text"
                                          name="name_property"
                                          id="input"
                                          class="form-control"
                                          value={data.name}
                                          required="required"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="btn-img col-4"
                                      style={{
                                        paddingLeft: "50px",
                                      }}
                                    ></div>
                                    <div
                                      className="btn-action  col-2"
                                      style={{
                                        border: "none",
                                        paddingLeft: "35px",
                                        verticalAlign: "top",
                                      }}
                                    >
                                      <button
                                        class="btn btn-danger btn-sm"
                                        onClick={() => {
                                          this[method](index);
                                        }}
                                      >
                                        <i class="fa fa-trash"></i> Xóa
                                      </button>
                                    </div>
                                  </div>
                                </SortableItem>
                              );
                            }
                          );
                        }
                      }
                    }
                  })}
                </SortableList>
                <div>
                  <button
                    onClick={this.addRowChildSup}
                    class={`btn btn-success btn-sm`}
                  >
                    <i class="fa fa-plus"></i>
                    Thêm thuộc tính
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    }
    return result;
  };

  shouldComponentUpdate(nextProps, nextState) {
    this.props.handleDataFromDistribute(nextState.list_distribute);

    var list_distribute = [...nextState.list_distribute];
    var total = null;
    try {
      if (typeof list_distribute[0].element_distributes != "undefined") {
        if (list_distribute[0].element_distributes.length > 0) {
          list_distribute[0].element_distributes.forEach((element, index) => {
            if (typeof element.sub_element_distributes != "undefined") {
              if (element.sub_element_distributes.length > 0) {
                element.sub_element_distributes.forEach((_element, index) => {
                  const _value =
                    _element.quantity_in_stock != null &&
                    !isEmpty(_element.quantity_in_stock)
                      ? formatNumber(_element.quantity_in_stock)
                      : 0;
                  total =
                    _element.quantity_in_stock !== null
                      ? Number(total) + Number(_value)
                      : 0;
                });
              } else {
                const _value =
                  element.quantity_in_stock != null &&
                  !isEmpty(element.quantity_in_stock)
                    ? formatNumber(element.quantity_in_stock)
                    : 0;
                total =
                  element.quantity_in_stock !== null
                    ? Number(total) + Number(_value)
                    : 0;
              }
            }
          });
          console.log(total);
          this.props.onChangeQuantityStock(total);
        }
      }
    } catch (error) {}
    return true;
  }

  showDetail = (list_distribute) => {
    var result = [];
    if (typeof list_distribute == "undefined" || list_distribute.length == 0) {
      return result;
    }
    if (list_distribute[0].element_distributes.length > 0) {
      list_distribute[0].element_distributes.forEach((element, _index) => {
        if (typeof element.sub_element_distributes != "undefined") {
          if (
            list_distribute[0].element_distributes[0].sub_element_distributes
              .length > 0
          ) {
            list_distribute[0].element_distributes[0].sub_element_distributes.forEach(
              (_element, index) => {
                console.log(element.sub_element_distributes);
                try {
                  var value_price =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].price;
                  var value_quantity_in_stock =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].quantity_in_stock;
                  var barcode =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].barcode;
                  var sku =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].sku;

                  var value_import_price =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].import_price;

                  const _value =
                    value_price != null ? formatNumber(value_price) : "";
                  var price =
                    _value == "" ? "" : new Intl.NumberFormat().format(_value);

                  const _valueI =
                    value_import_price != null
                      ? formatNumber(value_import_price)
                      : "";
                  var import_price =
                    _valueI == ""
                      ? ""
                      : new Intl.NumberFormat().format(_valueI);

                  const _value_S =
                    value_quantity_in_stock !== null &&
                    value_quantity_in_stock !== ""
                      ? formatNumber(value_quantity_in_stock)
                      : "";
                  var quantity_in_stock =
                    _value_S == ""
                      ? ""
                      : new Intl.NumberFormat().format(_value_S);
                } catch (error) {
                  // var price =  _element.price
                  // var quantity_in_stock = _element.quantity_in_stock
                }
                if (
                  element.name != null &&
                  element.name != "" &&
                  typeof element.name != "undefined"
                ) {
                  if (
                    _element.name != null &&
                    _element.name != "" &&
                    typeof _element.name != "undefined"
                  ) {
                    result.push(
                      <tr>
                        <td>
                          {element.name},{_element.name}
                        </td>
                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "price",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            value={price}
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "import_price",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            value={import_price}
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            value={sku}
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "sku",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            name=""
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>
                        {/* <td>
                        <input
                          value={barcode}
                          onChange={(e) => this.onChange(e, "SUP", { name: "barcode", index, _index, title: _element.name })}

                          name="" id="input" class="form-control" required="required" title="" />

                      </td> */}

                        {/* <td>
                    <input
                      onChange={(e) =>
                        this.onChange(e, "SUP", {
                          name: "quantity_in_stock",
                          index: _index,
                        })
                      }
                      value={quantity_in_stock}
                      id="input"
                      class="form-control"
                      required="required"
                      title=""
                    />
                  </td> */}
                      </tr>
                    );
                  } else {
                    result.push(
                      <tr>
                        <td>{element.name}</td>
                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "price",
                                index: _index,
                              })
                            }
                            name=""
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                            value={price}
                          />
                        </td>

                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "import_price",
                                index: _index,
                              })
                            }
                            name=""
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                            value={import_price}
                          />
                        </td>
                        <td>
                          <input
                            value={sku}
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "sku",
                                index,
                                _index,
                              })
                            }
                            name=""
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>
                        {/* <td>
                        <input
                          value={barcode}
                          onChange={(e) => this.onChange(e, "PARENT", { name: "barcode", index, _index })}

                          name="" id="input" class="form-control" required="required" title="" />

                      </td> */}

                        {/* <td>
                    <input
                      onChange={(e) =>
                        this.onChange(e, "PARNET", {
                          name: "quantity_in_stock",
                          index: _index,
                        })
                      }
                      value={quantity_in_stock}
                      id="input"
                      class="form-control"
                      required="required"
                      title=""
                    />
                  </td> */}
                      </tr>
                    );
                  }
                }
              }
            );
          } else {

            try {
              var { sku } = element;
              var barcode = element.barcode;

              const _value =
                element.price != null ? formatNumber(element.price) : "";
              var price =
                _value == "" ? "" : new Intl.NumberFormat().format(_value);

              const _valueI =
                element.price != null ? formatNumber(element.import_price) : "";
              var import_price =
                _valueI == "" ? "" : new Intl.NumberFormat().format(_valueI);

              const _value_S =
                element.quantity_in_stock !== null &&
                element.quantity_in_stock !== ""
                  ? formatNumber(element.quantity_in_stock)
                  : "";
              var quantity_in_stock =
                _value_S == "" ? "" : new Intl.NumberFormat().format(_value_S);
            } catch (error) {
              var barcode = element.barcode;
              // var sku = element.sku;
              var price = element.price;
              var quantity_in_stock = element.quantity_in_stock;
            }
            if (element.name != null && element.name != "")
              result.push(
                <tr>
                  <td>{element.name}</td>
                  <td>
                    <input
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "price",
                          index: _index,
                        })
                      }
                      name=""
                      id="input"
                      class="form-control"
                      required="required"
                      title=""
                      value={price}
                    />
                  </td>

                  <td>
                    <input
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "import_price",
                          index: _index,
                        })
                      }
                      name=""
                      id="input"
                      class="form-control"
                      required="required"
                      title=""
                      value={import_price}
                    />
                  </td>
                  <td>
                    <input
                      value={sku}
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "sku",
                          index: _index,
                        })
                      }
                      name=""
                      id="input"
                      class="form-control"
                      required="required"
                      title=""
                    />
                  </td>
                  {/* <td>
                    <input
                      value={barcode}
                      onChange={(e) => this.onChange(e, "PARENT", { name: "barcode", index: _index })}

                      name="" id="input" class="form-control" required="required" title="" />

                  </td> */}

                  {/* <td>
                    <input
                      value={quantity_in_stock}
                      onChange={(e) => this.onChange(e, "PARENT", { name: "quantity_in_stock", index: _index })}

                      name="" id="input" class="form-control" required="required" title="" />

                  </td> */}
                </tr>
              );
          }
        } else {
          console.log("element", element);
        }
      });
    }
    return result;
  };

  onSortEnd = (oldIndex, newIndex) => {
    const { list_distribute } = this.state;
    const new_list_distribute = JSON.parse(JSON.stringify(list_distribute));
    new_list_distribute[0].element_distributes = arrayMove(
      list_distribute?.[0]?.element_distributes,
      oldIndex,
      newIndex
    );

    new_list_distribute[0].element_distributes =
      new_list_distribute[0].element_distributes.map((item, index) => ({
        ...item,
        position: index,
      }));

    this.setState({
      list_distribute: new_list_distribute,
    });
  };

  onSortEndSub = (oldIndex, newIndex) => {
    const { list_distribute } = this.state;
    const new_list_distribute = JSON.parse(JSON.stringify(list_distribute));

    const new_element_distributes =
      new_list_distribute?.[0]?.element_distributes.map((item) => {
        let new_sub_element_distributes = arrayMove(
          item?.sub_element_distributes,
          oldIndex,
          newIndex
        );

        new_sub_element_distributes = new_sub_element_distributes.map(
          (item, index) => ({
            ...item,
            position: index,
          })
        );
        return {
          ...item,
          sub_element_distributes: new_sub_element_distributes,
        };
      });

    new_list_distribute[0].element_distributes = new_element_distributes;

    this.setState({
      list_distribute: new_list_distribute,
    });
  };

  render() {
    if (this.props.isHide == true) return <></>;

    var { list_distribute } = this.state;
    console.log(
      "🚀 ~ file: Distribute.js:1198 ~ Distribute ~ render ~ list_distribute:",
      list_distribute
    );
    // var openDistribute = disableDistribute == true && disableInventory == true ? "" : "hide";

    var disable = "";
    try {
      disable =
        list_distribute[0].element_distributes[0].sub_element_distributes
          .length > 0
          ? "hide"
          : "show";
    } catch (error) {}
    return (
      <div class="table-responsive">
        <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
        {this.props.isSpeedEdit != true && (
          <div>
            <table class="table table-border">
              <thead>
                <tr>
                  <th width="25%">Tên phân loại chính</th>
                  <th>Giá trị</th>
                  <th>Hình ảnh (tùy chọn)</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {this.showRows(list_distribute)}
                {this.showRowsSuper(list_distribute)}
              </tbody>
            </table>

            <button
              id="addRow"
              onClick={this.addRow}
              type="button"
              class={`btn btn-info btn-sm ${disable}`}
            >
              <i class="fa fa-plus"></i>
              Thêm phân loại
            </button>
            <br />
            <h4
              style={{ fontSize: "15px", marginTop: "10px", fontWeight: "500" }}
              class="label"
            >
              Danh sách thuộc tính sản phẩm
            </h4>
          </div>
        )}
        <table
          class="table table-hover table-border"
          style={{ maxWidth: "900px" }}
        >
          <thead>
            <tr>
              <th>Tên thuộc tính</th>
              <th>Giá bán lẻ</th>
              <th>Giá nhập</th>
              <th>Mã sku</th>
              {/* <th>Barcode</th> */}
              {/* <th>Tồn kho ban đầu</th> */}
            </tr>
          </thead>
          <tbody>{this.showDetail(list_distribute)}</tbody>
        </table>

        <ModalUploadDis
          listImgDistribute={this.props.listImgDistribute}
          ImgDistribute={this.state.ImgDistribute}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    removeItemImgDis: (data) => {
      dispatch(productAction.removeItemImgDis(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    listImgDistribute: state.UploadReducers.productImg.listImgDistribute,

    alert: state.UploadReducers.alert.alert_uploadDis,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Distribute);
