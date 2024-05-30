import React, { Component } from "react";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "./Form";
import * as agencyAction from "../../../actions/agency"
import * as Types from "../../../constants/ActionType";
import NotAccess from "../../../components/Partials/NotAccess";

import Alert from "../../../components/Partials/Alert";
class BonusStepEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var { store_code, step_id } = this.props.match.params;
    this.props.getBonusAgencyConfig(this.props.match.params.store_code);


  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
      var permissions = nextProps.permission

      var isShow = permissions.post_add
      this.setState({ isLoading: true, isShow })
    }
  }

  getStepDataById(id) {
    var { store_code, step_id } = this.props.match.params;
    var listStep = this.props?.bonusAgencyConfig?.step_bonus ?? [];
    for (let i = 0; i < listStep.length; i++) {

     if(listStep[i].id == step_id) {
          return listStep[i];
     }
    }
  }
  
  render() {
    var { store_code } = this.props.match.params;
    var { history, categories } = this.props
    var { isShow } = this.state
    var { store_code, step_id } = this.props.match.params;

    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">

            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? <div style={{ height: "500px" }}></div> :
                  isShow == true ?

                    <div class="container-fluid">
                      <Alert
                        type={Types.ALERT_UID_STATUS}
                        alert={this.props.alert}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <h4 className="h4 title_content mb-0 text-gray-800">
                          {step_id != null ? "Chỉnh sửa phần thưởng" :   "Tạo thêm phần thưởng"}
                        </h4>
                      </div>
                      <br></br>
                      <div class="card shadow mb-4">
                        <div class="card-body">
                          <section class="content">
                            <div class="row">
                              <div class="col-md-12 col-xs-12">
                                <div id="messages"></div>

                                <div class="box">
                                  <Form history={history} categories={categories} store_code={store_code} step_data={ this.getStepDataById(step_id)} />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                    : <NotAccess />}

              </div>

              <Footer />
            </div>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login" />;
    } else {
      return "";
    }
  }
}

const mapStateToProps = (state) => {
  return {
  
    auth: state.authReducers.login.authentication,

    permission: state.authReducers.permission.data,
    bonusAgencyConfig: state.agencyReducers.agency.bonusAgencyConfig,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getBonusAgencyConfig: (store_code) => {
      dispatch(agencyAction.getBonusAgencyConfig(store_code));
  },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusStepEdit);
