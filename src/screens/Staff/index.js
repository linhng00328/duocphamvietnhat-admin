import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/Staff/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/Staff/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect, shallowEqual } from "react-redux";
import Loading from "../Loading";
import * as staffAction from "../../actions/staff";
import config from "../../ultis/datatable";
import { getBranchId } from "../../ultis/branchUtils";
class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        title: "",
        id: "",
        name: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };

  componentDidMount() {
    var params = `branch_id=${getBranchId()}`;

    this.props.fetchAllStaff(
      this.props.match.params.store_code,
      null,
      params,
      null
    );
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { staff } = this.props;
    if (!shallowEqual(staff, nextProps.staff)) {
      this.setState({
        staffSearch: nextProps.staff,
      });
    }
    return true;
  };
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.staff_list;

      this.setState({
        isLoading: true,
        insert: true,
        update: true,
        _delete: true,
        isShow,
      });
    }

    var dataTable = $("#dataTable").DataTable(config());
    dataTable
      .on("order.dt search.dt", function () {
        let i = 1;

        dataTable
          .cells(null, 0, { search: "applied", order: "applied" })
          .every(function (cell) {
            this.data(i++);
          });
      })
      .draw();

    window.$(".dataTables_info").hide();
  }

  render() {
    var { store_code } = this.props.match.params;
    var { staff } = this.props;
    var { insert, update, _delete, isShow } = this.state;

    if (this.props.auth) {
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
                        Nhân viên
                      </h4>{" "}
                      <Link
                        to={`/staff/create/${store_code}`}
                        class={`btn btn-info btn-icon-split btn-sm ${
                          insert == true ? "show" : "hide"
                        }`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span class="text">Thêm nhân viên</span>
                      </Link>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 title_content font-weight-bold text-primary">
                          Danh sách nhân viên
                        </h6>
                      </div>
                      <div className="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          data={staff}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>

              <Footer />
            </div>
            <ModalDelete
              params={`?branch_id=${getBranchId()}`}
              store_code={store_code}
              modal={this.state.modal}
            />
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
    staff: state.staffReducers.staff.allStaff,
    auth: state.authReducers.login.authentication,
    alert: state.staffReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllStaff: (id, page, params, branch_id) => {
      dispatch(staffAction.fetchAllStaff(id, page, params, branch_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Staff);
