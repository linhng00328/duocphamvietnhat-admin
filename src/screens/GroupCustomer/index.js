import { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as groupCustomerAction from "../../actions/group_customer";
import Footer from "../../components/Partials/Footer";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Loading from "../Loading";
import NotAccess from "../../components/Partials/NotAccess";
import Table from "../../components/GroupCustomer/Table";
import Pagination from "../../components/GroupCustomer/Pagination";
import * as placeAction from "../../actions/place";
import ModalDeleteGroupCustomer from "../../components/GroupCustomer/ModalDeleteGroupCustomer";
import ModalActionChangeGroupCustomer from "../../components/GroupCustomer/ModalActionChangeGroupCustomer";
import SidebarShowCustomerByGroup from "../../components/GroupCustomer/SidebarShowCustomerByGroup";

class GroupCustomer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModalActionChangeGroupCustomer: false,
      openModalDeleteGroupCustomer: false,
      idGroupCustomer: null,
      showCustomerByGroup: false,
      groupInfo: {},
      page: 1,
    };
  }
  setGroupInfo = (groupInfo) => {
    this.setState({
      groupInfo,
    });
  };
  setPage = (page) => {
    this.setState({ page });
  };
  setShowCustomerByGroup = (isShowed) => {
    this.setState({
      showCustomerByGroup: isShowed,
    });
  };
  setOpenModalActionChangeGroupCustomer = () => {
    this.setState({
      openModalActionChangeGroupCustomer:
        !this.state.openModalActionChangeGroupCustomer,
    });
  };
  setOpenModalDeleteGroupCustomer = () => {
    this.setState({
      openModalDeleteGroupCustomer: !this.state.openModalDeleteGroupCustomer,
    });
  };
  setIdGroupCustomer = (id) => {
    this.setState({
      idGroupCustomer: id,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading !== true &&
      typeof nextProps.permission.customer_list !== "undefined"
    ) {
      const isShow = nextProps.permission.group_customer;
      this.setState({ isShow, isLoading: true });
    }
  }
  componentDidMount() {
    this.props.fetchGroupCustomer(this.props.match.params.store_code, "");
    this.props.fetchPlaceProvince();
  }

  render() {
    const { groupCustomer, province, fetchGroupCustomer } = this.props;
    const { store_code } = this.props.match.params;
    const { isShow, showCustomerByGroup, groupInfo } = this.state;
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />

          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow === "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow === true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Danh sách nhóm khách hàng
                      </h4>{" "}
                      <button
                        className="btn btn-info btn-icon-split btn-sm"
                        style={{ height: "fit-content", width: "fit-content" }}
                        onClick={this.setOpenModalActionChangeGroupCustomer}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          className={`text `}
                        >
                          Thêm nhóm khách hàng
                        </span>
                      </button>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        {groupCustomer?.data?.length > 0 ? (
                          <>
                            <Table
                              store_code={store_code}
                              groupCustomer={groupCustomer.data}
                              province={province}
                              setOpenModalDeleteGroupCustomer={
                                this.setOpenModalDeleteGroupCustomer
                              }
                              setOpenModalActionChangeGroupCustomer={
                                this.setOpenModalActionChangeGroupCustomer
                              }
                              setIdGroupCustomer={this.setIdGroupCustomer}
                              setGroupInfo={this.setGroupInfo}
                              setShowCustomerByGroup={
                                this.setShowCustomerByGroup
                              }
                            />
                            <div>
                              <Pagination
                                setPage={this.setPage}
                                store_code={store_code}
                                groupCustomer={groupCustomer}
                                fetchGroupCustomer={fetchGroupCustomer}
                              />
                            </div>
                          </>
                        ) : (
                          <div
                            className="card-groupEmpty"
                            style={{
                              textAlign: "center",
                              color: "#858796",
                            }}
                          >
                            Chưa có nhóm khách hàng nào!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>
              <SidebarShowCustomerByGroup
                store_code={store_code}
                showSidebar={showCustomerByGroup}
                setShowSidebar={this.setShowCustomerByGroup}
                groupInfo={groupInfo}
                setGroupInfo={this.setGroupInfo}
              ></SidebarShowCustomerByGroup>
              {this.state.openModalActionChangeGroupCustomer && (
                <ModalActionChangeGroupCustomer
                  openModalActionChangeGroupCustomer={
                    this.state.openModalActionChangeGroupCustomer
                  }
                  province={province}
                  store_code={store_code}
                  idGroupCustomer={this.state.idGroupCustomer}
                  setOpenModalActionChangeGroupCustomer={
                    this.setOpenModalActionChangeGroupCustomer
                  }
                  setIdGroupCustomer={this.setIdGroupCustomer}
                  page={this.state.page}
                ></ModalActionChangeGroupCustomer>
              )}
              {this.state.openModalDeleteGroupCustomer && (
                <ModalDeleteGroupCustomer
                  openModalDeleteGroupCustomer={
                    this.state.openModalDeleteGroupCustomer
                  }
                  store_code={store_code}
                  idGroupCustomer={this.state.idGroupCustomer}
                  setOpenModalDeleteGroupCustomer={
                    this.setOpenModalDeleteGroupCustomer
                  }
                  setIdGroupCustomer={this.setIdGroupCustomer}
                  page={this.state.page}
                ></ModalDeleteGroupCustomer>
              )}

              <Footer />
            </div>
          </div>
        </div>
      );
    } else if (this.props.auth === false) {
      return <Redirect to="/login"></Redirect>;
    } else {
      return <Loading></Loading>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    groupCustomer: state.groupCustomerReducers.group_customer.groupCustomer,
    auth: state.authReducers.login.authentication,
    permission: state.authReducers.permission.data,
    province: state.placeReducers.province,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroupCustomer: (store_code, params) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code, params));
    },
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupCustomer);
