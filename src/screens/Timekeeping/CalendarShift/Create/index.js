import React, { Component } from "react";
import Sidebar from "../../../../components/Partials/Sidebar";
import Topbar from "../../../../components/Partials/Topbar";
import Footer from "../../../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../../../Loading";
import NotAccess from "../../../../components/Partials/NotAccess";
import Form from "../../../../components/Timekeeping/CalendarShift/Create/Form";
import * as Types from "../../../../constants/ActionType";
import Alert from "../../../../components/Partials/Alert";
import * as staffAction from "../../../../actions/staff";
import * as shiftAction from "../../../../actions/shift";
import { getBranchId } from "../../../../ultis/branchUtils";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId()
    var params = `limit=${10}&branch_id=${getBranchId()}`;
    this.props.fetchAllStaff(store_code , null , params , null );
    this.props.fetchAllShift(store_code, branch_id, 1, params);
  }
  // componentWillReceiveProps(nextProps) {
  //     if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
  //         var permissions = nextProps.permission

  //         var isShow = permissions.promotion_discount_add
  //         this.setState({ isLoading: true, isShow })
  //     }
  // }

  render() {
    var { store_code } = this.props.match.params;
    const branch_id = getBranchId();
    var { history, auth, staff, shifts } = this.props;
    var { isShow } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        {auth != "a" ? (
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Tạo lịch làm việc
                      </h4>
                    </div>
                    <br></br>
                    <Alert
                      type={Types.ALERT_UID_STATUS}
                      alert={this.props.alert}
                    />
                    <div class="card shadow mb-4">
                      <div class="card-body">
                        <section class="content">
                          <div class="row">
                            <div class="col-md-12 col-xs-12">
                              <div id="messages"></div>

                              <div class="box">
                                <Form
                                  store_code={store_code}
                                  history={history}
                                  staff={staff}
                                  shifts={shifts}
                                  branch_id={branch_id}
                                />
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
        ) : auth == false ? (
          <Redirect to="/login" />
        ) : (
          <Loading />
        )}
      </div>
    );
    // } else if (this.props.auth === false) {
    //     return <Redirect to="/login" />;
    // } else {
    //     return <Loading />;
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.categoryBReducers.alert.alert_uid,
    permission: state.authReducers.permission.data,
    staff: state.staffReducers.staff.allStaff,
    shifts: state.shiftReducers.shift.allShift,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id , page , params , branch_id) => {
      dispatch(staffAction.fetchAllStaff(id , page , params , branch_id));
    },
    fetchAllShift: (store_code, branch_id, page, params) => {
      dispatch(shiftAction.fetchAllShift(store_code, branch_id, page, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
