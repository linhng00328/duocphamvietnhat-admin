import React, { Component } from "react";
import Loading from "./Loading";
import LoadingLazy from "./LoadingLazy";
import Error from "./Alert"
import * as Types from "../../constants/ActionType"
import { connect } from "react-redux"
import packageJson from '../../../package.json';
import * as dashboardAction from "../../actions/dashboard";
class Footer extends Component {

  componentDidMount() {

  }

  render() {

    var { badges } = this.props;

    return (
      <React.Fragment>
        <Loading />
        <LoadingLazy />
        <Error
          type={Types.ERROR_RESPONSE}
          alert={this.props.alert}
        />
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>  Copyright &copy; {badges?.config_user_vip?.user_copyright != null ? badges?.config_user_vip?.user_copyright : "CÔNG TY CỔ PHẦN IKI TECH VIỆT NAM "}  - Version 3.0.0 </span>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    badges: state.badgeReducers.allBadge,
    alert: state.errResposeReducers.correctResponse,

  };
};
export default connect(mapStateToProps, null)(Footer);
