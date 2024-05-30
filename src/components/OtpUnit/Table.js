import React, { Component } from "react";
import { connect } from "react-redux";
import * as otpUnitAction from "../../actions/otp_unit";
import * as configSmsAction from "../../actions/config_sms";
import { randomString } from "../../ultis/helpers";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalId: null,
      imgViettelPost: null,
    };
  }

  passEditFunc = (e, data) => {
    this.props.handleUpdateCallBack({
      id: data.id,
      sender: data.sender,
      token: data.token,
      content: data.content,
      image_url: data.image_url,
      is_order: data.is_order,
      content_order: data.content_order,
    });
    e.preventDefault();
  };

  passDeleteFunc = (e, data) => {
    this.props.handleDelCallBack({
      title: "Xóa đơn vị cài đặt",
      id: data.id,
      sender: data.sender,
    });
    e.preventDefault();
  };

  use = (e, id) => {
    this.props.updateStatusOtpUnit(this.props.store_code, id, {
      is_use: true,
    });
  };

  unUse = (e, id) => {
    this.props.updateStatusOtpUnit(this.props.store_code, id, {
      is_use: false,
    });
  };
  handleShowToken = (token) => {
    const tokenLength = token.length;
    if (tokenLength > 6) {
      return `${token.slice(0, token.length - 7)}*******`;
    }
    return token;
  };
  onChangeStatus = (e, data) => {
    const { store_code, smsConfig, updateStatusOtpUnit, updateSmsConfig } =
      this.props;
    if (data.is_default) {
      const formData = {
        is_use: smsConfig.is_use,
        is_use_from_units: smsConfig.is_use_from_units,
        is_use_from_default: !smsConfig.is_use_from_default,
      };

      updateSmsConfig(store_code, formData, smsConfig.id);
      return;
    }

    var checked = !this["checked" + data.id].checked;
    updateStatusOtpUnit(store_code, data.id, {
      is_use: checked,
    });
  };

  showData = (allOtpUnit) => {
    const { smsConfig } = this.props;
    var result = null;

    if (allOtpUnit.length > 0) {
      result = allOtpUnit.map((data, index) => {
        let dataDefault = false;
        if (smsConfig) {
          dataDefault = smsConfig.is_use_from_default;
        }
        return (
          <tr>
            <td>
              <img
                src={data.image_url ? data.image_url : "/images/no_img.png"}
                style={{ width: "80px" }}
              />
            </td>
            <td style={{ width: "150px" }}>{data.sender}</td>
            <td style={{ maxWidth: "260px" }}>
              {data.token ? this.handleShowToken(data.token) : ""}
            </td>
            <td>
              {data.content
                ? `${
                    data.content?.length > 100
                      ? `${data.content?.slice(0, 100)}...`
                      : data.content
                  }`
                : ""}
            </td>
            <td>
              <div
                className="on-off"
                onClick={(e) => {
                  this.onChangeStatus(e, data);
                }}
              >
                <input
                  ref={(ref) => (this["checked" + data.id] = ref)}
                  type="checkbox"
                  class="checkbox"
                  name={`${randomString(10)}`}
                  checked={data.is_default ? dataDefault : data.is_use}
                />

                <label for="checkbox" class="switch">
                  <span class="switch__circle">
                    <span
                      style={{
                        backgroundColor:
                          data.is_default === true && dataDefault === false
                            ? "gray"
                            : data?.is_use === true
                            ? "white"
                            : "gray",
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
              {data.is_default ? (
                "Mặc định"
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={(e) => this.passEditFunc(e, data)}
                    data-toggle="modal"
                    data-target="#updateOtpUnitModal"
                    class={`btn btn-warning btn-sm`}
                  >
                    <i class="fa fa-edit"></i>Sửa
                  </button>
                  {/* <button
                    onClick={(e) => this.passDeleteFunc(e, data)}
                    data-toggle="modal"
                    data-target="#deleteOtpUnitModal"
                    class={`btn btn-danger btn-sm`}
                  >
                    <i class="fa fa-trash"></i>Xóa
                  </button> */}
                </div>
              )}
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
    console.log(this.props.allOtpUnit);
    return (
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th></th>
              <th>Đơn vị gửi</th>
              <th>Mã Token </th>
              <th>Nội dung</th>
              <th style={{ textAlign: "center" }}>Trạng thái hoạt động </th>

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.allOtpUnit)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    smsConfig: state.configSmsReducers.configSms.smsConfig,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateStatusOtpUnit: (store_code, id, data) => {
      dispatch(otpUnitAction.updateStatusOtpUnit(store_code, id, data));
    },
    updateSmsConfig: (store_code, data, id) => {
      dispatch(configSmsAction.updateSmsConfig(store_code, data, id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
