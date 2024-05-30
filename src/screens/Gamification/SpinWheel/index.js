import { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import NotAccess from "../../../components/Partials/NotAccess";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Loading from "../../Loading";
import * as gamificationAction from "../../../actions/gamification";
import Table from "../../../components/Gamification/SpinWheel/Table";
import Pagination from "../../../components/Gamification/SpinWheel/Pagination";
import { getQueryParams } from "../../../ultis/helpers";
import ModalDeleteGameSpinWheel from "../../../components/Gamification/SpinWheel/ModalDeleteGameSpinWheel";
import * as Types from "../../../constants/ActionType";
import Footer from "../../../components/Partials/Footer";
const SpinWheelStyles = styled.div`
  .btn-addSpinWheel {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
`;

class SpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      openModalDeleteGameSpinWheel: false,
      idGameSpinWheel: null,
    };
  }
  componentDidMount() {
    const { page } = this.state;
    this.handleFetchListGameSpinWheels(page);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.gamification;

      this.setState({
        isLoading: true,
        isShow,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { page } = this.state;
    const { deletedSuccessfully, deletedSuccessfullyReturn } = this.props;
    if (!shallowEqual(page, nextState.page)) {
      this.handleFetchListGameSpinWheels(nextState.page);
    }
    if (
      !shallowEqual(deletedSuccessfully, nextProps.deletedSuccessfully) &&
      nextProps.deletedSuccessfully
    ) {
      this.handleFetchListGameSpinWheels(page);
      this.setOpenModalDeleteGameSpinWheel(false);
      this.setIdGameSpinWheel(null);
      deletedSuccessfullyReturn();
    }
    return true;
  }
  setOpenModalDeleteGameSpinWheel = (openModalDelete) => {
    this.setState({
      openModalDeleteGameSpinWheel: openModalDelete,
    });
  };
  setIdGameSpinWheel = (id) => {
    this.setState({
      idGameSpinWheel: id,
    });
  };
  handleFetchListGameSpinWheels = (page) => {
    const { store_code } = this.props.match.params;
    const params = `page=${page}`;
    this.props.fetchListGameSpinWheels(store_code, params);
  };
  setPage = (page) => {
    this.setState({ page });
  };
  render() {
    const { isShow, openModalDeleteGameSpinWheel, idGameSpinWheel } =
      this.state;
    const { auth, listGameSpinWheels } = this.props;
    const { store_code } = this.props.match.params;
    if (auth) {
      return (
        <SpinWheelStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div className="container-fluid">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Danh sách game quay thưởng
                      </h4>
                      <Link
                        className="btn btn-info btn-icon-split btn-sm show"
                        to={`/game_spin_wheels/${store_code}/create`}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span className="text">Thêm game quay thưởng</span>
                      </Link>
                    </div>
                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <Table
                          store_code={store_code}
                          listGameSpinWheels={listGameSpinWheels}
                          setOpenModalDeleteGameSpinWheel={
                            this.setOpenModalDeleteGameSpinWheel
                          }
                          setIdGameSpinWheel={this.setIdGameSpinWheel}
                        />
                        <Pagination
                          setPage={this.setPage}
                          store_code={store_code}
                          listGameSpinWheels={listGameSpinWheels}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess></NotAccess>
                )}
                <Footer />
                <ModalDeleteGameSpinWheel
                  store_code={store_code}
                  idGameSpinWheel={idGameSpinWheel}
                  openModalDeleteGameSpinWheel={openModalDeleteGameSpinWheel}
                  setOpenModalDeleteGameSpinWheel={
                    this.setOpenModalDeleteGameSpinWheel
                  }
                  setIdGameSpinWheel={this.setIdGameSpinWheel}
                />
              </div>
            </div>
          </div>
        </SpinWheelStyles>
      );
    } else if (auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    listGameSpinWheels:
      state.gamificationReducers.spin_wheel.listGameSpinWheels,
    deletedSuccessfully:
      state.gamificationReducers.spin_wheel.deletedSuccessfully,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListGameSpinWheels: (store_code, params) => {
      dispatch(gamificationAction.fetchListGameSpinWheels(store_code, params));
    },
    deletedSuccessfullyReturn: () => {
      dispatch({ type: Types.DELETE_GAME_SPIN_WHEELS, data: false });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpinWheel);
