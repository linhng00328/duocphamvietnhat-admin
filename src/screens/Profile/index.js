import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import Form from "../../components/Profile/Form"
import { connect } from "react-redux";
import Loading from "../Loading";
import * as profileAction from "../../actions/profile";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import Modal from "../../components/Auth/ChangePassword/Modal"
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount() {
    this.props.fetchUserId();
  }

  render() {
    var {store_code} = this.props.match.params
    var {user} = this.props
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
<div className="col-10 col-10-wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar isExistUser = {true} store_code = {store_code} />
              <div className="container-fluid">
              <Alert
                  type={Types.ALERT_UID_STATUS}
                  alert={this.props.alert}

                />
                 <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                       Hồ sơ
                      </h4>
                      <a
                        data-toggle="modal"
                        data-target="#changePassword"
                        class={`btn btn-info btn-icon-split btn-sm `}
                        style={{ height: "fit-content", width: "fit-content" }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          class={`text `}
                        >
                          Thay đổi mật khẩu
                        </span>
                      </a>
                    </div>

                <br></br>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 title_content font-weight-bold text-primary">
                      Thông tin cá nhân
                    </h6>
                  </div>
                  <div className="card-body">
                    <Form user = {user}></Form>
                  
                  </div>
                </div>
              </div>
            </div>
                          <Modal></Modal>
            <Footer />
          </div>
        </div>
        </div>

      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user.userID,
    auth: state.authReducers.login.authentication,
    alert: state.userReducers.alert.alert_success,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchUserId: () => {
      dispatch(profileAction.fetchUserId());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
