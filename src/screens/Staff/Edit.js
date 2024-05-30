import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "../../components/Staff/Edit/Form";
import Loading from "../Loading";
import * as Types from "../../constants/ActionType";
import * as decentralizationAction from "../../actions/decentralization";
import * as staffAction from "../../actions/staff";
import NotAccess from "../../components/Partials/NotAccess";

import Alert from "../../components/Partials/Alert";
import { getBranchId } from "../../ultis/branchUtils";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var params = `?branch_id=${getBranchId()}`;

    var { store_code, id } = this.props.match.params;
    this.props.fetchAllStaff(
      this.props.match.params.store_code,
      null,
      params,
      null
    );
    this.props.fetchAllDecentralization(store_code);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.staff_list;
      this.setState({ isLoading: true, isShow });
    }
  }
  render() {
    var { id, store_code } = this.props.match.params;
    var { history, decentralization, staff } = this.props;
    var { isShow } = this.state;
    console.log(staff);
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <div className="col-10 col-10-wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code={store_code} />
              {typeof isShow == "undefined" ? (
                <div></div>
              ) : isShow == true ? (
                <div class="container-fluid">
                  <Alert
                    type={Types.ALERT_UID_STATUS}
                    alert={this.props.alert}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Chỉnh sửa nhân viên
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
                              {staff?.length > 0 && (
                                <Form
                                  history={history}
                                  id={id}
                                  staff={staff}
                                  decentralization={decentralization}
                                  store_code={store_code}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              ) : (
                <NotAccess />
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    staff: state.staffReducers.staff.allStaff,

    auth: state.authReducers.login.authentication,
    alert: state.staffReducers.alert.alert_uid,
    decentralization:
      state.decentralizationReducers.decentralization.allDecentralization,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
    fetchAllDecentralization: (id) => {
      dispatch(decentralizationAction.fetchAllDecentralization(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
