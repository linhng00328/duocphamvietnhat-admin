import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmail, isPhone } from "../../../ultis/helpers";
import { getQueryParams } from "../../../ultis/helpers";

import * as auth from "../../../actions/auth";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPhone: "",
      txtEmail: "",
      txtFormat: "",
    };
  }

  componentWillMount() {
    var redirect_forgot = getQueryParams("redirect_forgot");
    console.log(redirect_forgot, this.props.user);
    if (
      redirect_forgot &&
      (typeof this.props.user.phone_number != "undefined" ||
        typeof this.props.user.email != "undefined")
    ) {
      var { user } = this.props;
      this.setState({
        txtFormat: user.phone_number == "" ? user.email : user.phone_number,
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var { txtPhone, txtEmail, txtFormat } = this.state;
    if (isEmail(txtFormat))
      this.props.forgot({ txtPhone: "", txtEmail: txtFormat });
    else if (isPhone(txtFormat)) {
      this.props.forgot({ txtPhone: txtFormat, txtEmail: "" });
    } else {
      this.props.forgot({ txtPhone: txtFormat, txtEmail: "" });
    }
  };

  render() {
    var { txtPhone, txtFormat } = this.state;
    var { products } = this.props;
    console.log(products);
    return (
      <React.Fragment>
        <form onSubmit={this.onSave} className="user">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Nhập số điện thoại hoặc Email"
              autoComplete="off"
              name="txtFormat"
              value={txtFormat}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Tiếp tục
          </button>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    alert: state.authReducers.alert.alert_forgotOTP,
    user: state.authReducers.forgot.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    forgot: ($form) => {
      dispatch(auth.forgot($form));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
