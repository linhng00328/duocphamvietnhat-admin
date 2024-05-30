import React, { Component } from "react";
import { connect } from "react-redux";
import * as configSmsAction from "../../actions/config_sms";
import { formatNumber } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
class ConfigSms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_use: true,
      is_use_from_units: false,
      is_use_from_default: false,
    };
  }
  handChangeCheckbox2 = (e) => {
    this.setState({ checked_switch2: !this.state.checked_switch2 });
  };
  handChangeCheckbox3 = (e) => {
    this.setState({ checked_switch3: !this.state.checked_switch3 });
  };
  onChange = (e) => {
    var { name } = e.target;
    var { value } = e.target;
    if (name === "fee_default_description") {
      this.setState({ fee_default_description: value });
    } else {
      const _value = formatNumber(value);

      if (!isNaN(Number(_value))) {
        this.setState({ [name]: _value });
      }
    }
  };
  onChangeChecked = (e) => {
    var { name } = e.target;
    this.setState({ [name]: !this.state[name] });
  };

  handleUpdate = () => {
    const { store_code, smsConfig } = this.props;
    var { is_use, is_use_from_units, is_use_from_default } = this.state;

    const formData = {
      is_use,
      is_use_from_units,
      is_use_from_default,
    };
    this.props.updateSmsConfig(store_code, formData, smsConfig.id);
  };

  componentWillReceiveProps = (nextProps) => {
    if (!shallowEqual(nextProps.smsConfig, this.props.smsConfig)) {
      var { smsConfig } = nextProps;

      this.setState({
        is_use: smsConfig.is_use,
        is_use_from_units: smsConfig.is_use_from_units,
        is_use_from_default: smsConfig.is_use_from_default,
      });
    }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ proviceOptions: selectValue });
  };

  componentDidMount() {
    const { store_code } = this.props;
    this.props.fetchSmsConfig(store_code);
  }

  render() {
    const { store_code } = this.props;
    var { smsConfig } = this.props;
    var { is_use, is_use_from_units, is_use_from_default } = this.state;
    return (
      <div className="card-body" style={{ padding: "2px" }}>
        <div className="wrap-card">
          <div
            className="wrap-setting"
            style={{
              maxWidth: "430px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Cho phép cài đặt mã OTP</div>

            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="switch2"
                name="is_use"
                checked={is_use}
                onChange={this.onChangeChecked}
              />
              <label class="custom-control-label" for="switch2"></label>
            </div>
          </div>
          {/* {is_use && (
            <div
              className="wrap-setting"
              style={{
                maxWidth: "430px",
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0px",
              }}
            >
              <div>Cài đặt gửi OTP mặc định</div>
              <form>
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="switch4"
                    name="is_use_from_default"
                    checked={is_use_from_default}
                    onChange={this.onChangeChecked}
                  />
                  <label class="custom-control-label" for="switch4"></label>
                </div>
              </form>
            </div>
          )} */}
          {is_use && (
            <div
              className="wrap-setting"
              style={{
                maxWidth: "430px",
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0px",
              }}
            >
              <div>Cài đặt gửi OTP từ các đơn vị khác</div>
              <form action="/action_page.php">
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="switch3"
                    name="is_use_from_units"
                    checked={is_use_from_units}
                    onChange={this.onChangeChecked}
                  />
                  <label class="custom-control-label" for="switch3"></label>
                </div>
              </form>
            </div>
          )}
        </div>
        <button class="btn btn-primary btn-sm" onClick={this.handleUpdate}>
          <i class="fa fa-save"></i> Lưu
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
    smsConfig: state.configSmsReducers.configSms.smsConfig,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateSmsConfig: (store_code, data, id) => {
      dispatch(configSmsAction.updateSmsConfig(store_code, data, id));
    },
    fetchSmsConfig: (store_code) => {
      dispatch(configSmsAction.fetchSmsConfig(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigSms);
