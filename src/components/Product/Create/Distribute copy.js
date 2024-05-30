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
    var value = e.target.value;
    var value_data = value;
    console.log(value);
    var list_distribute = [...this.state.list_distribute];
    if (type == "PARENT") {
      if (obj.name == "name") {
        list_distribute[0].name = value;
      } else if (obj.name == "value") {
        list_distribute[0].element_distributes[obj.index].name = value;
      } else {
        try {
          if (obj.name == "barcode") {
            const _value = value.toString();

            list_distribute[0].element_distributes[obj.index][obj.name] =
              _value;
          } else {
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
              list_distribute[0].element_distributes[obj.index][obj.name] =
                data;
            }
          }
        } catch (error) {
          console.log("asdasdasd");
          list_distribute[0].element_distributes[obj.index][obj.name] = value;
        }
      }

      this.setState({ list_distribute: list_distribute });
    }
    if (type == "SUP") {
      if (obj.name == "name") {
        list_distribute[0].sub_element_distribute_name = value;
      } else if (obj.name == "value") {
        list_distribute[0].element_distributes[
          obj._index
        ].sub_element_distributes[obj.index].name = value;
      } else {
        console.log(type, obj, this.state.list_distribute);
        try {
          const _value = value.toString().replace(/,/g, "").replace(/-/g, "");
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
          list_distribute[0].element_distributes[
            obj._index
          ].sub_element_distributes.push({ name: obj.title });

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
      this.setState({ list_distribute: list_distribute });
    }
  };

  removeListFromImg = (e, index) => {
    var list_distribute = [...this.state.list_distribute];

    if (list_distribute[0].element_distributes.length > 0) {
      if (list_distribute.length > 0) {
        list_distribute[0].element_distributes[index].image_url = null;
        this.setState({ list_distribute: list_distribute });
      }
    }
  };
  getIdImg = (e, image) => {
    this.setState({ ImgDistribute: image });
  };
  componentWillReceiveProps(nextProps) {
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
        this.setState({ list_distribute: list_distribute });
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
        import_price: null,
        cost_of_capital: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
      };
      list_distribute[0].element_distributes.push(newObject);
    } else if (typeof list_distribute[0].name == "undefined") {
      console.log("bbbbb");

      list_distribute[0].name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        import_price: null,
        cost_of_capital: null,
        quantity_in_stock: null,
        sub_element_distributes: [],
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
      list_distribute[0].element_distributes[0].sub_element_distributes = [];

      list_distribute[0].sub_element_distribute_name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
        import_price: null,
        cost_of_capital: null,
        quantity_in_stock: null,
      };
      list_distribute[0].element_distributes[0].sub_element_distributes.push(
        newObject
      );
    } else {
      console.log("nott");
    }

    this.setState({ list_distribute: list_distribute });
  };
  addRowChild = () => {
    var list_distribute = [...this.state.list_distribute];

    var newObject = {
      name: null,
      image_url: null,
      price: null,
      quantity_in_stock: null,
      sub_element_distributes: [],
    };
    list_distribute[0].element_distributes.push(newObject);
    this.setState({ list_distribute: list_distribute });
  };
  addRowChildSup = () => {
    var list_distribute = [...this.state.list_distribute];

    var newObject = {
      name: null,
      image_url: null,
      price: null,

      quantity_in_stock: null,
    };
    list_distribute[0].element_distributes[0].sub_element_distributes.push(
      newObject
    );
    this.setState({ list_distribute: list_distribute });
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
    this.setState({ list_distribute: list_distribute });
  };

  // removeRow = () => {
  //   var list_distribute = [...this.state.list_distribute];
  //   console.log(list_distribute);
  //   if (
  //     typeof list_distribute[0].sub_element_distribute_name !== "undefined" &&
  //     list_distribute[0].element_distributes[0].sub_element_distributes.length >
  //       0
  //   ) {
  //     list_distribute[0].name = list_distribute[0].sub_element_distribute_name;

  //     list_distribute[0].element_distributes = [
  //       ...list_distribute[0].element_distributes[0].sub_element_distributes,
  //     ];
  //     delete list_distribute[0].sub_element_distribute_name;
  //   } else {
  //     console.log("asdas");
  //     delete list_distribute[0].name;
  //     list_distribute[0].element_distributes = [];
  //   }
  //   this.setState({ list_distribute: list_distribute });
  // };

  removeRowChild = (key) => {
    var list_distribute = [...this.state.list_distribute];
    list_distribute[0].element_distributes.splice(key, 1);
    this.setState({ list_distribute: list_distribute });
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

    this.setState({ list_distribute: list_distribute });
  };

  showRows = (list_distribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }
    console.log(list_distribute.length);
    if (list_distribute.length > 0) {
      list_distribute.map((_data) => {
        if (_data.element_distributes.length > 0) {
          console.log(_data.element_distributes);
          result = _data.element_distributes.map((data, index) => {
            var disable = index == 0 ? "" : "hide";
            var disable_addButton =
              index == _data.element_distributes.length - 1 ? "" : "hide";

            // var method = index == 0 ? "removeRow" : "removeRowChild";
            var method = index == 0 ? "removeRowChild" : "removeRowChild";

            var visible = index == 0 ? null : "visibled";
            var border = index == 0 ? null : "hide-border";
            var img = data.image_url;
            var status_img =
              img == "" || img == null || typeof img == "undefined"
                ? "hide"
                : "show";
            var status_btn =
              img == "" || img == null || typeof img == "undefined"
                ? "show"
                : "hide";

            return (
              <tr className={`${border}`}>
                <td>
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
                  className="btn-img"
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
                  {console.log("dsfasdfasdfdf", status_img, index, img)}
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
                <td className="btn-action">
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
                    <tr className={`${border}`}>
                      <td>
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
                      <td className="btn-action">
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
    var total = 0;
    try {
      if (typeof list_distribute[0].element_distributes != "undefined") {
        if (list_distribute[0].element_distributes.length > 0) {
          list_distribute[0].element_distributes.forEach((element, index) => {
            if (typeof element.sub_element_distributes != "undefined") {
              if (element.sub_element_distributes.length > 0) {
                element.sub_element_distributes.forEach((_element, index) => {
                  const _value =
                    _element.quantity_in_stock != null &&
                    isEmpty(_element.quantity_in_stock)
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
                  isEmpty(element.quantity_in_stock)
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
    console.log(list_distribute);
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

                  var value_import_price =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].import_price;
                  var value_price_main =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].cost_of_capital;
                  var value_quantity_in_stock =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].quantity_in_stock;
                  var value_barcode =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].barcode;
                  var value_barcode =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].barcode;
                  const _values =
                    value_price_main != null
                      ? formatNumber(value_price_main)
                      : "";
                  const _value =
                    value_price != null ? formatNumber(value_price) : "";
                  const _value2 =
                    value_import_price != null
                      ? formatNumber(value_import_price)
                      : "";
                  var price =
                    _value == "" ? "" : new Intl.NumberFormat().format(_value);
                  var import_price =
                    _value == "" ? "" : new Intl.NumberFormat().format(_value2);
                  var cost_of_capital =
                    _values == ""
                      ? ""
                      : new Intl.NumberFormat().format(_values);
                  const _value_S =
                    value_quantity_in_stock !== null &&
                    value_quantity_in_stock !== ""
                      ? formatNumber(value_quantity_in_stock)
                      : "";
                  var quantity_in_stock =
                    _value_S == ""
                      ? ""
                      : new Intl.NumberFormat().format(_value_S);

                  var barcode = value_barcode;
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
                            type="text"
                            class="form-control input-sm"
                            id="input"
                            placeholder="Nhập barcode"
                            autoComplete="off"
                            required="required"
                            value={barcode}
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "barcode",
                                index,
                                _index,
                                title: _element.name,
                              })
                            }
                            name="txtBarcode"
                          />
                        </td>
                        <td>
                          <input
                            value={quantity_in_stock}
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "quantity_in_stock",
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
                        <td>
                          <input
                            value={cost_of_capital}
                            onChange={(e) =>
                              this.onChange(e, "SUP", {
                                name: "cost_of_capital",
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
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "barcode",
                                index: _index,
                              })
                            }
                            value={barcode}
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
                            class="form-control"
                            required="required"
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            value={value_price_main}
                            onChange={(e) =>
                              this.onChange(e, "PARENT", {
                                name: "cost_of_capital",
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
              const _value_import =
                element.import_price != null
                  ? formatNumber(element.import_price)
                  : "";
              const _values =
                element.cost_of_capital != null
                  ? formatNumber(element.cost_of_capital)
                  : "";
              var price =
                _value == "" ? "" : new Intl.NumberFormat().format(_value);
              var import_price =
                _value_import == ""
                  ? ""
                  : new Intl.NumberFormat().format(_value_import);
              var cost_of_capital =
                _values == "" ? "" : new Intl.NumberFormat().format(_values);
              const _value_S =
                element.quantity_in_stock !== null &&
                element.quantity_in_stock !== ""
                  ? formatNumber(element.quantity_in_stock)
                  : "";
              var quantity_in_stock =
                _value_S == "" ? "" : new Intl.NumberFormat().format(_value_S);
            } catch (error) {
              var price = element.price;
              var cost_of_capital = element.cost_of_capital;
              var quantity_in_stock = element.quantity_in_stock;
              var barcode = element.barcode;
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
                      onChange={(e) =>
                        this.onChange(e, "PARENT", {
                          name: "barcode",
                          index: _index,
                        })
                      }
                      value={barcode}
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
                      class="form-control"
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
                      class="form-control"
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
              <th>Tên phân loại</th>
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

        <table class="table table-hover table-border">
          <thead>
            <tr>
              <th>Tên thuộc tính</th>
              <th>Giá bán lẻ</th>
              <th>Giá nhập</th>
              <th>Barcode</th>
              <th>Tồn kho ban đầu</th>
              <th>Giá vốn</th>
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
