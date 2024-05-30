import React, { Component } from "react";
import * as auth from "../../../actions/auth";
import { connect } from "react-redux";
import themeData from "../../../ultis/theme_data";
import * as Types from "../../../constants/ActionType";
import { isEmpty } from "../../../ultis/helpers";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: "",
      new_password: "",
      toggleOld: false,
      toggleNew: false,

      iconShow: "fa fa-fw fa-eye",
      iconHide: "fa fa-fw fa-eye-slash",
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = async (e) => {
    e.preventDefault();
    // window.$('.modal').modal('hide');
    var { old_password, new_password } = this.state;
    this.props.changePassword(
      { old_password, new_password },
      function () {
        window.$(".modal").modal("hide");
      },
      this
    );
  };
  toggleOld = () => {
    this.setState({ toggleOld: !this.state.toggleOld });
  };
  toggleNew = () => {
    this.setState({ toggleNew: !this.state.toggleNew });
  };
  render() {
    console.log("render");
    var {
      old_password,
      new_password,
      toggleNew,
      toggleOld,
      iconHide,
      iconShow,
    } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="changePassword"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thay đổi mật khẩu</h4>

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
              id="createForm"
            >
              <div class="modal-body" style={{ padding: " 0 10px" }}>
                <div class="form-group">
                  <div style={{ fontWeight: "bold" }} for="product_name">
                    Mật khẩu cũ
                  </div>
                  <input
                    type={toggleOld == true ? "text" : "password"}
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập mật khẩu cũ"
                    autoComplete="off"
                    value={old_password}
                    onChange={this.onChange}
                    name="old_password"
                  />
                  <span
                    onClick={this.toggleOld}
                    toggle="#password-field"
                    class={toggleOld ? iconShow : iconHide}
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "-26px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  ></span>
                </div>
                <div class="form-group">
                  <div style={{ fontWeight: "bold" }} for="product_name">
                    Mật khẩu mới
                  </div>
                  <input
                    type={toggleNew == true ? "text" : "password"}
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập mật khẩu mới"
                    autoComplete="off"
                    value={new_password}
                    onChange={this.onChange}
                    name="new_password"
                  />
                  <span
                    onClick={this.toggleNew}
                    toggle="#password-field"
                    class={toggleNew ? iconShow : iconHide}
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "-26px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  ></span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Lưu
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
    changePassword: ($form, funcModal, $this) => {
      dispatch(auth.changePassword($form, funcModal, $this));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
