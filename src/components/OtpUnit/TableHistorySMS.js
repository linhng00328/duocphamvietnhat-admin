import React, { Component } from "react";
import { connect } from "react-redux";
import * as otpUnitAction from "../../actions/otp_unit";
import * as configSmsAction from "../../actions/config_sms";
import { randomString } from "../../ultis/helpers";
class TableHistorySMS extends Component {
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

  showData = (allHistorySMS) => {
    const { smsConfig } = this.props;
    var result = null;

    if (allHistorySMS?.data?.length > 0) {
      result = allHistorySMS.data.map((data, index) => {
        let dataDefault = false;
        if (smsConfig) {
        }
        return (
          <tr>
            <td>
              {(this.props.allHistorySMS.current_page - 1) *
                Number(this.props.allHistorySMS.per_page) +
                index +
                1}
            </td>
            <td style={{ width: "150px" }}>{data.partner}</td>
            <td style={{ maxWidth: "260px" }}>{data.phone}</td>
            <td>
              {data.content
                ? `${
                    data.content?.length > 100
                      ? `${data.content?.slice(0, 100)}...`
                      : data.content
                  }`
                : ""}
            </td>
            <td>{data.type == 0 ? "Xác thực người dùng" : "Đơn hàng"}</td>
            <td style={{ maxWidth: "260px" }}>{data.created_at}</td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    console.log("this.props.allHistorySMS:", this.props.allHistorySMS);
    return (
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Đối tác</th>
              <th>Số điện thoại</th>
              <th>Nội dung</th>
              <th>Nguồn sms</th>
              <th>Thời gian gửi</th>
            </tr>
          </thead>

          <tbody>{this.showData(this.props.allHistorySMS)}</tbody>
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
export default connect(mapStateToProps, mapDispatchToProps)(TableHistorySMS);
