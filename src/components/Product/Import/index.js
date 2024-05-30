import React, { Component } from "react";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import * as productAction from "../../../actions/product";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: {},
      allow_skip_same_name: false,
    };
  }

  onChangeType = (e, index) => {
    var value = e.target.value;
    var type = { ...this.state.type };
    type["type" + index] = value;
    this.setState({
      type: type,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.allow_skip_same_name != this.props.allow_skip_same_name) {
      this.setState({ allow_skip_same_name: false });
    }
  }

  showListUrl = (images) => {
    var result = null;
    if (typeof images == "undefined") {
      return result;
    }
    var listImg = images.split(",");
    if (listImg.length > 0) {
      return (
        <img
          src={listImg[0]}
          class="img-responsive"
          alt="Image"
          style={{
            width: "120px",
            objectFit: "cover",
            height: "100px",
            margin: "7px",
          }}
        />
      );
    } else {
      return result;
    }
    return result;
  };

  showItemObject = (item) => {
    {
      var object = [];
      var data = "";
      Object.entries(item).forEach(([key, value], index) => {
        if (typeof value == "string" && value != null && value != "") {
          if (value.includes("https://") || value.includes("http://")) {
            object.push(
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "140px",
                    overflow: "auto",
                  }}
                >
                  {this.showListUrl(value)}
                </div>
              </td>
            );
          } else {
            var name = "";
            if (key != null) {
              if (key.includes("tên") || key.includes("Tên")) {
                name = "class-name-product";
              }
            }
            object.push(
              <td className={name}>
                <div
                  style={{
                    maxHeight: "140px",
                    overflow: "auto",
                    maxWidth: "250px",
                  }}
                >
                  {value}
                </div>
              </td>
            );
          }
        } else {
          object.push(<td>{value}</td>);
        }
      });
      return object;
    }
  };

  showHeaderData = (data) => {
    var result = [];
    if (typeof data == "undefined") {
      return result;
    }
    if (data.length > 0) {
      Object.entries(data[0]).forEach(([key, value], index) => {
        result.push(
          <th>
            <select
              name=""
              id="input"
              class="form-control"
              required="required"
              onChange={(e) => {
                this.onChangeType(e, index);
              }}
            >
              <option value=""></option>
              <option value="name">Tên sản phẩm</option>
              <option value="sku">SKU</option>
              <option value="price">Giá</option>
              <option value="quantity_in_stock">Tồn kho</option>
              <option value="category_name">Danh mục</option>
              <option value="percent_collaborator">Hoa hồng CTV</option>

              <option value="description">Mô tả</option>
              <option value="images">Hình ảnh</option>
            </select>
          </th>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  showData = (data) => {
    var result = null;
    if (typeof data == "undefined") {
      return result;
    }
    if (data.length > 0) {
      result = data.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            {this.showItemObject(item)}
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  checkExsit = (type) => {
    for (let [key, value] of Object.entries(type)) {
      var count = 0;
      for (let [_key, _value] of Object.entries(type)) {
        if (value == _value) {
          count = count + 1;
        }
      }
      if (count == 2) {
        return false;
      }
    }

    return true;
  };

  onSave = () => {
    var { importData } = this.props;
    var { type } = this.state;
    var newArray = [];

    if (importData.length > 0) {
      if (Object.keys(type).length > 0) {
        if (this.checkExsit(type) == true) {
          for (const item of importData) {
            var newItem = {};
            Object.entries(item).forEach(([key, value], index) => {
              if (
                type["type" + index] !== "" &&
                typeof type["type" + index] !== "undefined"
              ) {
                console.log(type["type" + index]);
                if (typeof value == "string" && value != null && value != "") {
                  if (value.includes("https://") || value.includes("http://")) {
                    var listImg = value.split(",");
                    newItem[type["type" + index]] = listImg;
                  } else {
                    if (type["type" + index] == "category_name") {
                      var listCategories = value.split(",");
                      newItem[type["type" + index]] = listCategories[0];
                    }
                    if (type["type" + index] == "quantity_in_stock") {
                      var quantity_in_stock = "";
                      if (
                        value != null &&
                        value != "" &&
                        typeof value != "undefined"
                      ) {
                        quantity_in_stock =
                          value.toString().toUpperCase() == "HẾT HÀNG"
                            ? 0
                            : value.toString().toUpperCase() == "VÔ HẠN"
                            ? -1
                            : value;
                        console.log(quantity_in_stock, value);
                      } else {
                        quantity_in_stock = 0;
                      }
                      newItem[type["type" + index]] = quantity_in_stock;
                    } else {
                      newItem[type["type" + index]] = value;
                    }
                  }
                } else {
                  newItem[type["type" + index]] = value;
                }
              }
            });
            newItem.index_image_avatar = 0;
            newItem.status = 0;
            newItem.list_distribute = [];
            newItem.categories = [];
            newArray.push(newItem);
          }

          window.$("#importModal").modal("hide");

          this.props.postMultiProduct(this.props.store_code, {
            allow_skip_same_name: this.props.allow_skip_same_name,
            list: newArray,
          });
        } else {
          this.props.showError({
            type: Types.ALERT_UID_STATUS,
            alert: {
              type: "danger",
              title: "Lỗi",
              disable: "show",
              content: "Không được chọn trường dữ liệu giống nhau",
            },
          });
          return;
        }
      } else {
        this.props.showError({
          type: Types.ALERT_UID_STATUS,
          alert: {
            type: "danger",
            title: "Lỗi",
            disable: "show",
            content: "Chọn ít nhất 1 trường dữ liệu",
          },
        });
      }
    }
  };

  onChange = (e) => {
    var checked = e.target.checked;
    this.setState({ allow_skip_same_name: checked });
  };

  render() {
    var { importData } = this.props;
    var { allow_skip_same_name } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="importModal"
        data-keyboard="false"
        data-backdrop="static"
        style={{
          height: "100%",
          overflow: "visible",
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "white" }}>
              <div class="form-group">
                <div class="form-check" style={{ paddingLeft: "0px" }}>
                  Vui lòng chọn dữ liệu từ các trường sản phẩm
                </div>
              </div>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="removeForm"
            >
              <div class="modal-body">
                <input type="hidden" name="remove_id_store" />
                <div class="alert-remove"></div>

                <table
                  class="table table-responsive table-border"
                  style={{ fontSize: "13px" }}
                >
                  <thead>
                    <tr>
                      <th>STT</th>
                      {this.showHeaderData(importData)}
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      display: "inline-block",
                      height: "65vh",
                    }}
                  >
                    {this.showData(importData)}
                  </tbody>
                </table>
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
                  type="button"
                  onClick={this.onSave}
                  class="btn btn-info"
                >
                  Thực hiện Import
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
  return {
    showError: (error) => {
      dispatch(error);
    },
    postMultiProduct: (store_code, data) => {
      dispatch(productAction.postMultiProduct(store_code, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
