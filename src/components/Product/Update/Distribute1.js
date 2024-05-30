import React, { Component } from "react";
import * as helper from "../../../ultis/helpers";
import ModalUploadDis from "./Distribute/ModalUpload";
import { connect } from "react-redux";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";
import * as productAction from "../../../actions/product";
import { shallowEqual } from "../../../ultis/shallowEqual";

class Distribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_distribute: {},
      listImgDistribute: [],
      ImgDistribute: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.listImgDistribute, this.props.listImgDistribute)
    ) {
      var listImg = [...nextProps.listImgDistribute];
      var list_distribute  = { ...this.state.list_distribute };
      if (listImg.length > 0) {
        listImg.forEach((img) => {
          list_distribute[img.key].element_distributes[img.keyItem].img =
            img.data;
        });
        this.setState({ list_distribute: list_distribute });
      }
    }
    if (
      !shallowEqual(
        nextProps.product.distributes,
        this.props.product.distributes
      )
    ) {
      var distributes = [...nextProps.product.distributes];
      var list_distribute  = { ...this.state.list_distribute };
      if (distributes.length > 0) {
        distributes.forEach((_distribute, index) => {
          var randomString = new Date().getTime() + helper.randomString(3);
          var element_distributes = {};
          if (_distribute.element_distributes.length > 0) {
            _distribute.element_distributes.forEach((value) => {
              var randomString_child = new Date().getTime() + helper.randomString(3);
              element_distributes[`child_distribute_${randomString_child}`] = {
                  name_property: value.name,
                  img: value.image_url,
              };
            });
          }
          list_distribute[`distribute_${randomString}`] = {
            name: _distribute.name,
            element_distributes: element_distributes,
          };
        });
        this.setState({ list_distribute: list_distribute });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.props.handleDataFromDistribute(nextState.list_distribute);

    return true;
  }

  removeListFromImg = (e, image) => {
    var listImg = [...this.props.listImgDistribute];
    var list_distribute = { ...this.state.list_distribute };

    if (listImg.length > 0) {
      listImg.forEach((img, index) => {
        if (image.key === img.key) {
          list_distribute[img.key].element_distributes[img.keyItem].img = "";
          listImg.splice(index, 1);
        }
      });
      this.setState(
        { list_distribute: list_distribute },
        this.props.removeItemImgDis(listImg)
      );
    }
  };

  getIdImg = (e, image) => {
    this.setState({ ImgDistribute: image });
  };

  onChange = (e, data) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    var list_distribute = { ...this.state.list_distribute };
    try {
      if (name == "name") {
        list_distribute[data.id][name] = value;
        this.setState({ list_distribute: list_distribute });
      } else {
        list_distribute[data.id].element_distributes[data._key][name] = value;
        this.setState({ list_distribute: list_distribute });
      }
    } catch (error) {}
  };

  addRow = () => {
    var randomString = new Date().getTime() + helper.randomString(3);
    var list_distribute= { ...this.state.list_distribute };
    list_distribute[`distribute_${randomString}`] = {
      name: "",
      element_distributes: {
        [`child_distribute_${randomString}`]: {
          name_property: "",
          img: "",
        },
      },
    };

    this.setState({ list_distribute: list_distribute });
  };

  addRowChild = (key_distribute) => {
    var randomString = new Date().getTime() + helper.randomString(3);
    var list_distribute = { ...this.state.list_distribute };
    list_distribute[key_distribute].element_distributes[
      `child_distribute_${randomString}`
    ] = {
      name_property: "",
      img: "",
    };
    this.setState({ list_distribute: list_distribute });
  };

  removeRow = (key_distribute, key = null) => {
    var list_distribute = { ...this.state.list_distribute };
    Object.entries(list_distribute).forEach(([key, distribute], index) => {
      if (key === key_distribute) {
        delete list_distribute[key];
      }
    });
    this.setState({ list_distribute: list_distribute });
  };
  

  removeRowChild = (id_key, id_item) => {
    var list_distribute = { ...this.state.list_distribute };
    try {
      if (
        typeof list_distribute[id_item].element_distributes[id_key] !==
        "undefined"
      ) {
        delete list_distribute[id_item].element_distributes[id_key];
        this.setState({ list_distribute: list_distribute });
      }
    } catch (error) {}
  };

  showRows = (list_distribute) => {
    var result = [];
    Object.entries(list_distribute).forEach(([key, distribute], index) => {
      Object.entries(distribute).forEach(([_key, _distribute], _index) => {
        if (_key == "element_distributes") {
          Object.entries(_distribute).forEach(
            ([__key, __distribute], __index) => {
              var disable = __index == 0 ? "" : "hide";
              var method = __index == 0 ? "removeRow" : "removeRowChild";
              var _id = __index == 0 ? key : __key;
              var visible = __index == 0 ? null : "visibled";
              var border = __index == 0 ? null : "hide-border";
              var img = list_distribute[key].element_distributes[__key].img;
              var status_btn =  img == "" || img == null || typeof img == "undefined" ? "show" : "hide";
              var status_img =  img == "" || img == null || typeof img == "undefined" ? "hide" : "show";
              result.push(
                <tr className={`${border}`}>
                  <td className={`${visible}`}>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) =>
                        this.onChange(e, { id: key, _key: __key })
                      }
                      id="input"
                      class="form-control"
                      value={list_distribute[key].name}
                      required="required"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name_property"
                      onChange={(e) =>
                        this.onChange(e, { id: key, _key: __key })
                      }
                      id="input"
                      class="form-control"
                      value={
                        list_distribute[key].element_distributes[__key]
                          .name_property
                      }
                      required="required"
                    />
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
                        this.getIdImg(e, { key: key, keyItem: __key });
                      }}
                    >
                      <i class="fa fa-plus"></i> Upload ảnh
                    </button>

                    <div className={`box ${status_img}`}>
                      <div
                        className={`box-icon`}
                        style = {{width:"100px"}}
                        onClick={(e) =>
                          this.removeListFromImg(e, {
                            key: key,
                            keyItem: __key,
                          })
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
                  </td>
                  <td className="btn-action">
                    <button
                      class="btn btn-danger btn-sm"
                      onClick={() => {
                        this[method](_id, key);
                      }}
                    >
                      <i class="fa fa-trash"></i> Xóa
                    </button>
                    <button
                      onClick={() => {
                        this.addRowChild(key);
                      }}
                      style={{ marginLeft: "10px" }}
                      class={`btn btn-primary btn-sm ${disable}`}
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </td>
                </tr>
              );
            }
          );
        }
      });
    });
    return result;
  };

  render() {
    var { list_distribute } = this.state ;
    return (
      <div class="table-responsive">
        <Alert
          type={Types.ALERT_UID_STATUS}
          alert={this.props.alert}
        />
        <table class="table table-border">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phân loại</th>
              <th>Giá trị</th>
              <th>Hình ảnh (tùy chọn)</th>

              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{this.showRows(list_distribute)}</tbody>
        </table>
        <button
          id="addRow"
          onClick={this.addRow}
          type="button"
          class="btn btn-info btn-sm"
        >
          <i class="fa fa-plus"></i>
          Thêm thuộc tính
        </button>
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
