import React, { Component } from "react";
import * as shipmentPAction from "../../actions/shipment";
import { connect } from "react-redux";
import { randomString } from "../../ultis/helpers";
import ModalLogin from "./ModalLogin";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalId: null,
      imgViettelPost: null,
    };
  }

  passEditFunc = (e, id, token) => {
    this.props.handleUpdateCallBack({ id: id, token: token });
    e.preventDefault();
  };

  passDeleteFunc = (e, id) => {
    this.props.handleDelCallBack({ title: "Danh mục", id: id });
    e.preventDefault();
  };

  use = (e, id, token) => {
    this.props.updateShipment(this.props.store_code, id, {
      token: token,
      use: true,
    });
  };

  unUse = (e, id, token) => {
    this.props.updateShipment(this.props.store_code, id, {
      token: token,

      use: false,
    });
  };
  onChangeStatus = (e, id, token) => {
    var checked = !this["checked" + id].checked;
    var status = checked;
    this.props.updateShipment(this.props.store_code, id, {
      token: token,

      use: status,
    });
  };

  showData = (shipments) => {
    var result = null;
    if (shipments.length > 0) {
      var { update } = this.props;
      result = shipments.map((data, index) => {
        var use =
          typeof data.shipper_config == "undefined" ||
          data.shipper_config == null
            ? "Trống"
            : data.shipper_config.use == true
            ? "Đang hoạt động"
            : "Đã dừng";
        var status_use =
          typeof data.shipper_config == "undefined" ||
          data.shipper_config == null
            ? "secondary"
            : data.shipper_config.use == true
            ? "success"
            : "danger";
        var disable_unUse =
          typeof data.shipper_config == "undefined" ||
          data.shipper_config == null
            ? "hide"
            : data.shipper_config.use == true
            ? "show"
            : "hide";
        var disable_use =
          typeof data.shipper_config == "undefined" ||
          data.shipper_config == null
            ? "hide"
            : data.shipper_config.use == true
            ? "hide"
            : "show";

        var token =
          typeof data.shipper_config == "undefined" ||
          data.shipper_config == null
            ? "Trống"
            : data.shipper_config.token;

        return (
          <tr>
            <td>
              <img src={data.image_url} style={{ width: "80px" }} />
            </td>
            <td style={{ width: "150px" }}>{data.name}</td>
            <td style={{ maxWidth: "260px" }}>
              {token ? `${token.slice(0, 100)}...` : ""}
            </td>

            <td
              style={{
                display: "flex",
                "justify-content": "center",
              }}
            >
              <div
                className="on-off"
                onClick={(e) => {
                  this.onChangeStatus(
                    e,
                    data.id,
                    data.shipper_config?.token ?? null
                  );
                }}
              >
                <input
                  ref={(ref) => (this["checked" + data.id] = ref)}
                  type="checkbox"
                  class="checkbox"
                  name={`${randomString(10)}`}
                  checked={data.shipper_config?.use ?? false}
                />

                <label for="checkbox" class="switch">
                  <span class="switch__circle">
                    <span
                      style={{
                        backgroundColor:
                          data.shipper_config?.use === true ? "white" : "gray",
                      }}
                      class="switch__circle-inner"
                    ></span>
                  </span>
                  <span class="switch__left"></span>
                  <span class="switch__right"></span>
                </label>
              </div>
            </td>

            <td>
              {(data.id == 2 || data.id == 4 || data.id == 3) && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={(e) =>
                    this.setState({
                      modalId: data.id,
                      imgViettelPost: data.image_url,
                    })
                  }
                  data-toggle="modal"
                  data-target="#modalLogin"
                  class={`btn btn-primary btn-sm`}
                >
                  <i class="fa fa-sign-in"></i>Đăng nhập
                </button>
              )}
              {data.id !== 2 && data.id !== 3 && data.id !== 4 && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => this.passEditFunc(e, data.id, token)}
                  data-toggle="modal"
                  data-target="#updateModal"
                  class={`btn btn-warning btn-sm`}
                >
                  <i class="fa fa-edit"></i>Sửa
                </button>
              )}

              {/* <a
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.unUse(e,data.id , token)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-danger btn-sm ${disable_unUse}`}
              >
                <i class="fa fa-trash"></i> Tạm dừng
              </a>
              <a
                style={{ marginLeft: "10px" }}
                onClick={(e) => this.use(e,data.id , token)}
                data-toggle="modal"
                data-target="#removeModal"
                class={`btn btn-success btn-sm ${disable_use}`}
              >
                <i class="fa fa-trash"></i> Bật
              </a> */}
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    console.log(this.props.shipment);
    return (
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th></th>
              <th>Đơn vị vận chuyển</th>
              <th>Mã Token </th>
              <th style={{ textAlign: "center" }}>Trạng thái hoạt động </th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.shipment)}</tbody>
        </table>
        <ModalLogin
          imgViettelPost={this.state.imgViettelPost}
          store_code={this.props.store_code}
          modalId={this.state.modalId}
        ></ModalLogin>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateShipment: (store_code, id, data) => {
      dispatch(shipmentPAction.updateShipment(store_code, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Table);
