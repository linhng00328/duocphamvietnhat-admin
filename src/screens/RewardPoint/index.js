import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { Redirect, Link } from "react-router-dom";
import Form from "../../components/RewardPoint/Form";
import FormPos from "../../components/RewardPoint/FormPos";

import { connect } from "react-redux";
import Loading from "../Loading";
import * as rewardPointAction from "../../actions/reward_point";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import ModalReset from "../../components/RewardPoint/ModalReset";
import NotAccess from "../../components/Partials/NotAccess";
import getChannel, { IKITECH, IKIPOS } from "../../ultis/channel";
class RewardPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRewardPoint(this.props.match.params.store_code);
  }
  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var isShow = permissions.customer_config_point;

      this.setState({ isLoading: true, isShow });
    }
  }
  render() {
    var { store_code } = this.props.match.params;
    var { rewardPoints } = this.props;
    var { isShow } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div style={{ height: "500px" }}></div>
              ) : isShow == true ? (
                <div className="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Xu thưởng khách hàng
                    </h4>{" "}
                  </div>

                  <br></br>
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      {getChannel() == IKITECH ? (
                        <Form
                          rewardPoints={rewardPoints}
                          store_code={store_code}
                        ></Form>
                      ) : (
                        <FormPos
                          rewardPoints={rewardPoints}
                          store_code={store_code}
                        ></FormPos>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
            <ModalReset store_code={store_code} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.rewardPointReducers.alert.alert_uid,
    rewardPoints: state.rewardPointReducers.reward_point.allRewardPoint,

    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchRewardPoint: (store_code) => {
      dispatch(rewardPointAction.fetchRewardPoint(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RewardPoint);
