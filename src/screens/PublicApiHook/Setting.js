import React, { Component } from 'react';
import { connect, shallowEqual } from 'react-redux';

import * as SettingAction from '../../actions/notification';
import styled from 'styled-components';

const SettingStyles = styled.div`
  .setting__percentVar {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(130%, -50%);
  }
`;

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webhook_url: '',
      errMsgWebHookUrl: false,
      checked_switch1: false,
      checked_switch2: false,
    };
  }

  componentDidMount() {
    const { store_code } = this.props;
    this.props.fetchPublicApiConfig(store_code);
  }

  shouldComponentUpdate(nextProps) {
    if(!shallowEqual(nextProps.publicApiConfig, this.props.publicApiConfig)){
      this.setState({webhook_url: nextProps.publicApiConfig?.webhook_url})
      this.setState({checked_switch1: nextProps.publicApiConfig?.enable})
      this.setState({checked_switch2: nextProps.publicApiConfig?.enable_webhook})
    } return true
  }

  handleRefreshToken = () => {
    this.setState({ showNewToken: true });
    const { store_code } = this.props;
    this.props.changeToken(store_code);
  };

  handleCopyClick = () => {
    const { publicApiConfig } = this.props;
    const textToCopy = publicApiConfig.token;
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Đã sao chép: ' + textToCopy);
  };

  handleUpdateConfigPublicApiConfig = () => {
    const { store_code } = this.props;
    if (this.state.webhook_url === '') {
      this.setState({ errMsgWebHookUrl: true });
    } else {
      const data = {
        enable: this.state.checked_switch1,
        webhook_url: this.state.webhook_url,
        enable_webhook: this.state.checked_switch2,
      };
      this.props.UpdateConfigPublicApiConfig(store_code, data);
    }
  };

  handChangeCheckbox1 = () => {
    this.setState({ checked_switch1: !this.state.checked_switch1 });
  }

  handChangeCheckbox2 = () => {
    this.setState({ checked_switch2: !this.state.checked_switch2 });
  }

  Onchange = (e) => {
    this.setState({ webhook_url: e.target.value });
    this.setState({ errMsgWebHookUrl: false });
  };

  render() {
    const { publicApiConfig } = this.props;
    return (
      <SettingStyles className="">
        <div className="wrap-card">
          <div
            className="wrap-setting"
            style={{
              maxWidth: '100%',
              padding: '10px 0',
              position: 'relative',
              borderBottom: '1px solid #aaa',
            }}
          >
            <h5 style={{ fontWeight: '600' }}>Token</h5>
            <div
              className="wrap-setting"
              style={{
                maxWidth: '430px',
                display: 'flex',
                padding: '10px 0',
              }}
            >
              <div>Trạng thái: </div>
              <div class="custom-control custom-switch" style={{ marginLeft: '60px' }}>
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="switch1"
                  name="checked_switch1"
                  checked={this.state.checked_switch1}
                  onChange={this.handChangeCheckbox1}
                />
                <label style={{cursor: 'pointer'}} class="custom-control-label" for="switch1"></label>
              </div>
            </div>
            <div
              className="wrap-setting"
              style={{
                maxWidth: '100%',
                display: 'flex',
                padding: '10px 0',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex' }} onClick={this.handleCopyClick}>
                Mã Token: <span style={{ marginLeft: '70px', cursor: 'pointer' }}>{publicApiConfig.token}</span>{' '}
                <i
                  class="far fa-copy"
                  style={{ cursor: 'pointer', color: '#6868e1', fontSize: '24px', marginLeft: '10px' }}
                ></i>
              </div>

              <div class="custom-control custom-switch">
                <button class="btn btn-primary btn-sm" style={{background: '#27AE60', borderColor: '#27AE60', outline: 'none'}} onClick={this.handleRefreshToken}>
                  Làm mới
                </button>
              </div>
            </div>

            <div
              className="wrap-setting"
              style={{
                maxWidth: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                alignItems: 'center',
              }}
            >
              <div>
                Tài liệu tham khảo:{' '}
                <a style={{ marginLeft: '10px' }} href="https://tailieuweb.myiki.vn/khac/public-api" target="_blank" >
                  Hướng dẫn sử dụng public api  
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: '100%',
              padding: '10px 0',
              marginTop: '10px',
            }}
          >
            <h5 style={{ fontWeight: '600' }}>Webhook</h5>
          </div>

          <div
            className="wrap-setting"
            style={{
              maxWidth: '430px',
              display: 'flex',
              padding: '10px 0',
            }}
          >
            <div>Trạng thái:</div>
            <div class="custom-control custom-switch" style={{ marginLeft: '60px' }}>
              <input
                type="checkbox"
                class="custom-control-input"
                id="switch2"
                name="checked_switch2"
                checked={this.state.checked_switch2}
                onChange={this.handChangeCheckbox2}
              />
              <label style={{cursor: 'pointer'}} class="custom-control-label" for="switch2"></label>
            </div>
          </div>
          <div
            className="wrap-setting"
            style={{
              maxWidth: '100%',
              padding: '10px 0',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>Webhook url: </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  name="webhook_url"
                  value={this.state.webhook_url}
                  onChange={(e) => this.Onchange(e)}
                  style={{ width: '550px', marginLeft: '50px' }}
                />
                {this.state.errMsgWebHookUrl && <span style={{ color: '#f24d4d' }}>Bạn chưa nhập Webhook url</span>}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              Tài liệu tham khảo:{' '}
              <a style={{ marginLeft: '10px' }} href="https://tailieuweb.myiki.vn/khac/web-hook" target="_blank">
                Hướng dẫn sử dụng Web hook  
              </a>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button class="btn btn-primary btn-sm" onClick={this.handleUpdateConfigPublicApiConfig}>
              <i class="fa fa-save"></i> Lưu thay đổi
            </button>
          </div>
        </div>
      </SettingStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    publicApiConfig: state.notificationReducers.publicApiConfig,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPublicApiConfig: (store_code) => {
      dispatch(SettingAction.fetchPublicApiConfig(store_code));
    },
    changeToken: (store_code) => {
      dispatch(SettingAction.changeToken(store_code));
    },
    UpdateConfigPublicApiConfig: (store_code, data) => {
      dispatch(SettingAction.UpdateConfigPublicApiConfig(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
