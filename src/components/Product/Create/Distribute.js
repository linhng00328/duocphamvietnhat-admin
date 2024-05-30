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
    console.log(type, obj, [...this.state.list_distribute]);

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
      return;
    }
    if (type == "SUP") {
      console.log(type, obj, list_distribute);

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
        // list_distribute[0].element_distributes[obj._index].sub_element_distributes[obj.index].name = value
      } else {
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
            console.log(data, obj._index, obj.index, obj.name);
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
      console.log(obj._index);
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
      !shallowEqual(nextProps.listImgDistribute, this.props.listImgDistribute)
    ) {
      var listImg = [...nextProps.listImgDistribute];
      var list_distribute = [...this.state.list_distribute];
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
    console.log("main nha");
    var list_distribute = [...this.state.list_distribute];
    if (list_distribute.length == 0) {
      list_distribute = [{ element_distributes: [] }];
      list_distribute[0].name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
      };
      list_distribute[0].element_distributes.push({ ...newObject });
    } else if (typeof list_distribute[0].name == "undefined") {
      list_distribute[0].name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
      };
      list_distribute[0].element_distributes.push({ ...newObject });
    } else if (
      typeof list_distribute[0].sub_element_distribute_name == "undefined" ||
      (typeof list_distribute[0].name !== "undefined" &&
        list_distribute[0].element_distributes[0].sub_element_distributes
          .length == 0 &&
        typeof list_distribute[0].element_distributes[0]
          .sub_element_distributes != "undefined")
    ) {
      // list_distribute[0].element_distributes[0].sub_element_distributes = []
      list_distribute[0].sub_element_distribute_name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        quantity_in_stock: null,
        import_price: null,
      };
      list_distribute[0].element_distributes.forEach((element) => {
        typeof element == "object" &&
          element.sub_element_distributes.push({ ...newObject });
      });
      // li
      // list_distribute[0].element_distributes[0].sub_element_distributes.push({...newObject})
    } else {
    }

    this.setState({ list_distribute: [...list_distribute] });
  };

  addRowChildSup = () => {
    console.log("child sup");

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
        element.sub_element_distributes.push({ ...newObject });
    });
    // list_distribute[0].element_distributes[0].sub_element_distributes.push(newObject)
    this.setState({ list_distribute: [...list_distribute] });
  };

  removeRow = () => {
    var list_distribute = [...this.state.list_distribute];
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

    this.setState({ list_distribute: [...list_distribute] });
  };

  removeRowChildSup = (key) => {
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
      sub_element_distributes: [...newItem],
    };

    list_distribute[0].element_distributes.push({ ...newObject });
    this.setState({ list_distribute: [...list_distribute] });
  };
  showRows = (list_distribute, openDistribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }

    if (list_distribute.length > 0) {
      list_distribute.map((_data) => {
        if (_data.element_distributes.length > 0) {
          result = _data.element_distributes.map((data, index) => {
            var disable = index == 0 ? "" : "hide";
            var disable_addButton =
              index == _data.element_distributes.length - 1 ? "" : "hide";

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
              <tr className={`${border}`}>
                <td
                  style={{
                    verticalAlign: "top",
                  }}
                >
                  <input
                    type="text"
                    id="input"
                    class={`form-control ${disable}`}
                    value={_data.name}
                    required="required"
                    onChange={(e) =>
                      this.onChange(e, "PARENT", { name: "name", index })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="input"
                    class="form-control"
                    value={data.name}
                    onChange={(e) =>
                      this.onChange(e, "PARENT", { name: "value", index })
                    }
                    required="required"
                  />
                  <button
                    onClick={this.addRowChild}
                    class={`btn btn-success btn-sm ${disable_addButton}`}
                  >
                    <i class="fa fa-plus"></i>
                    Thêm thuộc tính
                  </button>
                </td>
                <td
                  className="btn-img i"
                  style={{
                    display: "flex",
                    flexDirection: "column",
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
                      onClick={(e) => this.removeListFromImg(e, index)}
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
                </td>
                <td
                  className="btn-action"
                  style={{
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
                </td>
              </tr>
            );
          });
        }
      });
    }
    return result;
  };

  showRowsSuper = (list_distribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }
    if (list_distribute.length > 0) {
      list_distribute.map((_data, _index) => {
        if (_data.element_distributes.length > 0) {
          if (
            typeof _data.element_distributes[0].sub_element_distributes ==
            "undefined"
          ) {
          } else {
            if (
              _data.element_distributes[0].sub_element_distributes.length > 0
            ) {
              result = _data.element_distributes[0].sub_element_distributes.map(
                (data, index) => {
                  var disable = index == 0 ? "" : "hide";
                  var method =
                    index == 0 ? "removeRowChildSup" : "removeRowChildSup";
                  var disable_addButton =
                    index ==
                    _data.element_distributes[0].sub_element_distributes
                      .length -
                      1
                      ? ""
                      : "hide";

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
                    <React.Fragment>
                      {index == 0 && <h6>Tên phân loại phụ </h6>}
                      <tr className={`${border}`}>
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
                                index,
                                _index: 0,
                              })
                            }
                            id="input"
                            class={`form-control ${disable}`}
                            value={_data.sub_element_distribute_name}
                            required="required"
                          />
                        </td>
                        <td>
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
                          <button
                            onClick={this.addRowChildSup}
                            class={`btn btn-success btn-sm ${disable_addButton}`}
                          >
                            <i class="fa fa-plus"></i>
                            Thêm thuộc tính
                          </button>
                        </td>
                        <td
                          className="btn-img"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        ></td>
                        <td
                          className="btn-action"
                          style={{
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
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                }
              );
            }
          }
        }
      });
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
          this.props.onChangeQuantityStock(total);
        }
      }
    } catch (error) {}
    return true;
  }

  showDetail = (list_distribute, openDistribute) => {
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
                  var value_price_main =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].cost_of_capital;

                  const __values =
                    value_price_main != null
                      ? formatNumber(value_price_main)
                      : "";
                  value_price_main =
                    __values != null ? formatNumber(__values) : "";

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
                  var quantity_in_stock = _element.quantity_in_stock;
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
                            name="sku"
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
                                name: "quantity_in_stock",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            value={quantity_in_stock}
                            id="input"
                            class={`form-control ${openDistribute}`}
                            required="required"
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "cost_of_capital",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            value={value_price_main}
                            id="input"
                            class={`form-control ${openDistribute}`}
                            required="required"
                            title=""
                          />
                        </td>
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
                            name="sku"
                            id="input"
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>

                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "quantity_in_stock",
                                index: _index,
                              })
                            }
                            value={quantity_in_stock}
                            id="input"
                            class={`form-control ${openDistribute}`}
                            required="required"
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "cost_of_capital",
                                index: _index,
                              })
                            }
                            value={value_price_main}
                            id="input"
                            class={`form-control ${openDistribute}`}
                            required="required"
                            title=""
                          />
                        </td>
                      </tr>
                    );
                  }
                }
              }
            );
          } else {
            try {
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
              const _values_cost =
                element.cost_of_capital != null
                  ? formatNumber(element.cost_of_capital)
                  : "";
              var cost_of_capital =
                _values_cost == ""
                  ? ""
                  : new Intl.NumberFormat().format(_values_cost);
            } catch (error) {
              var barcode = element.barcode;
              var sku = element.sku;
              var price = element.price;
              var quantity_in_stock = element.quantity_in_stock;
              var cost_of_capital = element.cost_of_capital;
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

                  <td>
                    <input
                      value={quantity_in_stock}
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "quantity_in_stock",
                          index: _index,
                        })
                      }
                      name=""
                      id="input"
                      class={`form-control ${openDistribute}`}
                      required="required"
                      title=""
                    />
                  </td>
                  <td>
                    <input
                      value={cost_of_capital}
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "cost_of_capital",
                          index: _index,
                        })
                      }
                      name=""
                      id="input"
                      class={`form-control ${openDistribute}`}
                      required="required"
                      title=""
                    />
                  </td>
                </tr>
              );
          }
        }
      });
    }
    return result;
  };

  render() {
    var { list_distribute } = this.state;
    var { disableDistribute, disableInventory } = this.props;
    var openDistribute =
      disableDistribute == true && disableInventory == true ? "" : "hide";
    console.log(list_distribute);
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
        <table class="table table-border">
          <thead>
            <tr>
              <th>Tên phân loại chính</th>
              <th>Giá trị</th>
              <th>Hình ảnh (tùy chọn)</th>

              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {this.showRows(list_distribute, openDistribute)}
            {this.showRowsSuper(list_distribute, openDistribute)}
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
              <th className={openDistribute}>Tồn kho ban đầu</th>
              <th className={openDistribute}>Giá vốn</th>
            </tr>
          </thead>
          <tbody>{this.showDetail(list_distribute, openDistribute)}</tbody>
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
