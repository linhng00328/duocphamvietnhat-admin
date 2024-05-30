import React, { Component } from "react";
import { connect } from "react-redux";
import NotAccess from "../../components/Partials/NotAccess";
import * as SettingAction from "../../actions/notification";
import styled from "styled-components";

const TermsAgencyCollaboratorStyles = styled.div`
  .setting__percentVar {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(130%, -50%);
  }
`;

class TermsAgencyCollaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_default_terms_agency_collaborator: true,
      terms_agency: null,
      terms_collaborator: null,
    };
  }

  handChangeCheckbox2 = (e) => {
    this.setState({
      is_default_terms_agency_collaborator:
        !this.state.is_default_terms_agency_collaborator,
    });
  };

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  handleUpdate = () => {
    const { store_code } = this.props;
    const formData = {
      is_default_terms_agency_collaborator:
        this.state.is_default_terms_agency_collaborator,
      terms_agency: this.state.terms_agency,
      terms_collaborator: this.state.terms_collaborator,
    };
    this.props.updateGeneralSetting(store_code, formData);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.generalSetting !== this.props.generalSetting) {
      this.setState({
        is_default_terms_agency_collaborator:
          nextProps.generalSetting.is_default_terms_agency_collaborator,
        terms_agency: nextProps.generalSetting.terms_agency,
        terms_collaborator: nextProps.generalSetting.terms_collaborator,
      });
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.branch_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.config_terms_agency_collaborator;
      this.setState({ isLoading: true, isShow });
    }
  };

  componentDidMount() {
    const { store_code } = this.props;
    this.props.fetchAllGeneralSetting(store_code);
  }

  render() {
    const { store_code } = this.props;
    var { isShow } = this.state;
    return (
      <TermsAgencyCollaboratorStyles className="">
        {typeof isShow == "undefined" ? (
          <div></div>
        ) : isShow == true ? (
          <>
            <div className="wrap-card">
              <div
                className="wrap-setting"
                style={{
                  maxWidth: "430px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                }}
              >
                <div>Điều khoản đăng ký đại lý, ctv mặc định</div>

                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="switch2"
                    name="is_default_terms_agency_collaborator"
                    checked={this.state.is_default_terms_agency_collaborator}
                    onChange={this.handChangeCheckbox2}
                  />
                  <label class="custom-control-label" for="switch2"></label>
                </div>
              </div>

              {!this.state.is_default_terms_agency_collaborator ? (
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <div
                    className="wrap-setting"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                      maxWidth: "650px",
                      padding: "5px 0",
                    }}
                  >
                    <div>Điều khoản đăng ký cộng tác viên</div>
                    <textarea
                      type="text"
                      class="form-control"
                      id="terms_collaborator"
                      name="terms_collaborator"
                      placeholder="Nhập điều khoản..."
                      value={this.state.terms_collaborator}
                      onChange={this.onChange}
                      rows="4"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div
                    className="wrap-setting"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                      maxWidth: "650px",
                      padding: "5px 0",
                    }}
                  >
                    <div>Điều khoản đăng ký đại lý</div>
                    <textarea
                      type="text"
                      class="form-control"
                      id="terms_agency"
                      name="terms_agency"
                      placeholder="Nhập điều khoản..."
                      value={this.state.terms_agency}
                      onChange={this.onChange}
                      rows="4"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <button class="btn btn-primary btn-sm" onClick={this.handleUpdate}>
              <i class="fa fa-save"></i> Lưu
            </button>
          </>
        ) : (
          <NotAccess />
        )}
      </TermsAgencyCollaboratorStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    generalSetting: state.notificationReducers.generalSetting,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllGeneralSetting: (store_code) => {
      dispatch(SettingAction.fetchAllGeneralSetting(store_code));
    },
    updateGeneralSetting: (store_code, data) => {
      dispatch(SettingAction.updateGeneralSetting(store_code, data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsAgencyCollaborator);
