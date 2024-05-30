import React, { Component } from "react";
import * as helper from "../../../ultis/helpers";
import ModalUploadDis from "./Distribute/ModalUpload";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import Alert from "../../Partials/Alert";
import * as productAction from "../../../actions/product";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber, formatNoD } from "../../../ultis/helpers";
import { isEmpty } from "../../../ultis/helpers";

class Distribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_distribute: [],
      list_distribute_default: [],

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
          const valueFormat = formatNumber(value);
          if (!isNaN(Number(valueFormat))) {
            var data = formatNoD(valueFormat);
            if (obj.name == "quantity_in_stock") {
              if (value_data == "") {
                data = "";
              } else {
                data = data;
              }
            }
            list_distribute[0].element_distributes[obj.index][obj.name] = data;
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
          const valueFormat = formatNumber(value);
          if (!isNaN(Number(valueFormat))) {
            var data = formatNoD(valueFormat);
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

          const valueFormat = formatNumber(value);
          if (!isNaN(Number(valueFormat))) {
            var data = formatNoD(valueFormat);
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

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(
        nextProps.product.distributes,
        this.props.product.distributes
      )
    ) {
      var distributes = [];
      var distributes_default = [];
      console.log(
        "🚀 ~ componentWillReceiveProps ~ distributes_default:",
        nextProps.product
      );

      if (nextProps.product.distributes != null) {
        distributes = [...nextProps.product.distributes];
      }
      if (nextProps.product.default_distributes != null) {
        distributes_default = [...nextProps.product.default_distributes];
      }

      this.props.handleDataFromDistribute(distributes);

      this.setState({
        list_distribute: distributes,
        list_distribute_default: distributes_default,
      });
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
      console.log("ccccc");

      list_distribute[0].sub_element_distribute_name = null;
      var newObject = {
        name: null,
        image_url: null,
        price: null,
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
  getIdImg = (e, image) => {
    this.setState({ ImgDistribute: image });
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
  showRows = (list_distribute) => {
    var result = [];
    if (typeof list_distribute === "undefined") {
      return result;
    }
    console.log(list_distribute.length);
    if (list_distribute.length > 0) {
      list_distribute.map((_data) => {
        if (_data.element_distributes.length > 0) {
          result = _data.element_distributes.map((data, index) => {
            var disable = index == 0 ? "" : "hide";
            var disable_addButton =
              index == _data.element_distributes.length - 1 ? "" : "hide";

            var method = index == 0 ? "removeRow" : "removeRowChild";

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
                    id="input"
                    class={`form-control ${disable}`}
                    value={_data.name}
                    disabled
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
                  />
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
                        />
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
                  const valueFormat =
                    _element.quantity_in_stock != null &&
                    isEmpty(_element.quantity_in_stock)
                      ? formatNumber(_element.quantity_in_stock)
                      : 0;
                  total =
                    _element.quantity_in_stock !== null
                      ? Number(total) + Number(valueFormat)
                      : 0;
                });
              } else {
                const valueFormat =
                  element.quantity_in_stock != null &&
                  isEmpty(element.quantity_in_stock)
                    ? formatNumber(element.quantity_in_stock)
                    : 0;
                total =
                  element.quantity_in_stock !== null
                    ? Number(total) + Number(valueFormat)
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

  showDetail = (list_distribute, list_distribute_default) => {
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
                  var value_price_default =
                    list_distribute_default[0].element_distributes[_index]
                      .sub_element_distributes[index].price;

                  var value_quantity_in_stock =
                    list_distribute[0].element_distributes[_index]
                      .sub_element_distributes[index].quantity_in_stock;

                  const valueFormat =
                    value_price != null ? formatNumber(value_price) : "";
                  var price = valueFormat == "" ? "" : formatNoD(valueFormat);
                  const valueFormat_default =
                    value_price_default != null
                      ? formatNumber(value_price_default)
                      : "";
                  var price_default =
                    valueFormat_default == ""
                      ? ""
                      : formatNoD(valueFormat_default);
                  const valueFormat_S =
                    value_quantity_in_stock !== null &&
                    value_quantity_in_stock !== ""
                      ? formatNumber(value_quantity_in_stock)
                      : "";
                  var quantity_in_stock =
                    valueFormat_S == "" ? "" : formatNoD(valueFormat_S);
                  var value_import_price_default =
                    list_distribute_default[0].element_distributes[_index]
                      .sub_element_distributes[index].import_price;
                  const valueFormat_import_default =
                    value_import_price_default != null
                      ? formatNumber(value_import_price_default)
                      : "";
                  var import_price_default =
                    valueFormat_import_default == ""
                      ? ""
                      : formatNoD(valueFormat_import_default);
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
                            title=""
                          />
                        </td>
                        <td>
                          <input
                            value={price_default}
                            id="input"
                            class="form-control"
                            title=""
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            value={import_price_default}
                            id="input"
                            class="form-control"
                            title=""
                            disabled
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
                            title=""
                            value={price}
                          />
                        </td>
                        <td>
                          <input
                            value={price_default}
                            id="input"
                            class="form-control"
                            title=""
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            value={import_price_default}
                            id="input"
                            class="form-control"
                            title=""
                            disabled
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
              const valueFormat =
                element.price != null ? formatNumber(element.price) : "";
              var price = valueFormat == "" ? "" : formatNoD(valueFormat);
              const valueFormat_default =
                list_distribute_default[0].element_distributes[_index].price !=
                null
                  ? formatNumber(
                      list_distribute_default[0].element_distributes[_index]
                        .price
                    )
                  : "";
              var price_default =
                valueFormat_default == "" ? "" : formatNoD(valueFormat_default);

              const valueImportFormat =
                element.import_price != null
                  ? formatNumber(element.import_price)
                  : "";
              var import_price =
                valueImportFormat == "" ? "" : formatNoD(valueImportFormat);

              const valueFormat_import_default =
                list_distribute_default[0].element_distributes[_index]
                  .import_price != null
                  ? formatNumber(
                      list_distribute_default[0].element_distributes[_index]
                        .import_price
                    )
                  : "";
              var import_price_default =
                valueFormat_import_default == ""
                  ? ""
                  : formatNoD(valueFormat_import_default);

              const valueFormat_S =
                element.quantity_in_stock !== null &&
                element.quantity_in_stock !== ""
                  ? formatNumber(element.quantity_in_stock)
                  : "";
              var quantity_in_stock =
                valueFormat_S == "" ? "" : formatNoD(valueFormat_S);
            } catch (error) {
              var price = element.price;
              var price_default =
                list_distribute_default[0].element_distributes[_index].price;
              var import_price = element.import_price;
              var import_price_default =
                list_distribute_default[0].element_distributes[_index]
                  .import_price;
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
                      title=""
                      value={price}
                    />
                  </td>
                  <td>
                    <input
                      value={price_default}
                      id="input"
                      class="form-control"
                      title=""
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      value={import_price_default}
                      id="input"
                      class="form-control"
                      title=""
                      disabled
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
    var { list_distribute, list_distribute_default } = this.state;
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
        {/* <table class="table table-border">
          <thead>
            <tr>
              <th>Tên phân loại</th>
              <th>Tên thuộc tính</th>

            </tr>
          </thead>
          <tbody>
            {this.showRows(list_distribute)}
            {this.showRowsSuper(list_distribute)}
          </tbody>
        </table> */}
        {/* <button
          id="addRow"
          onClick={this.addRow}
          type="button"
          class={`btn btn-info btn-sm ${disable}`}
        >
          <i class="fa fa-plus"></i>
          Thêm thuộc tính
        </button> */}

        {list_distribute.length > 0 && (
          <div>
            <h4
              style={{ fontSize: "15px", marginTop: "10px", fontWeight: "500" }}
              class="label"
            >
              Danh sách giá theo phân loại sản phẩm
            </h4>

            <table
              class="table table-hover table-border"
              style={{ maxWidth: "900px" }}
            >
              <thead>
                <tr>
                  <th>Tên phân loại</th>
                  <th>Giá đại lý</th>
                  <th>Giá bán lẻ</th>
                  <th>Giá nhập</th>
                </tr>
              </thead>
              <tbody>
                {this.showDetail(list_distribute, list_distribute_default)}
              </tbody>
            </table>
          </div>
        )}

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
