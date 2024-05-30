import { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import NotAccess from "../../../components/Partials/NotAccess";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Loading from "../../Loading";
import * as gamificationAction from "../../../actions/gamification";
import Table from "../../../components/Gamification/GuessNumber/Table";
import Pagination from "../../../components/Gamification/GuessNumber/Pagination";
import { getQueryParams } from "../../../ultis/helpers";
import ModalDeleteGameGuessNumber from "../../../components/Gamification/GuessNumber/ModalDeleteGameGuessNumber";
import * as Types from "../../../constants/ActionType";
import Footer from "../../../components/Partials/Footer";
const GuessNumberStyles = styled.div`
  .btn-addGuessNumber {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
`;

class GuessNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: getQueryParams("page") || 1,
      openModalDeleteGameGuessNumber: false,
      idGameGuessNumber: null,
    };
  }
  componentDidMount() {
    const { page } = this.state;
    this.handleFetchListGameGuessNumbers(page);
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
      this.handleFetchListGameGuessNumbers(nextState.page);
    }
    if (
      !shallowEqual(deletedSuccessfully, nextProps.deletedSuccessfully) &&
      nextProps.deletedSuccessfully
    ) {
      this.handleFetchListGameGuessNumbers(page);
      this.setOpenModalDeleteGameGuessNumber(false);
      this.setIdGameGuessNumber(null);
      deletedSuccessfullyReturn();
    }
    return true;
  }
  setOpenModalDeleteGameGuessNumber = (openModalDelete) => {
    this.setState({
      openModalDeleteGameGuessNumber: openModalDelete,
    });
  };
  setIdGameGuessNumber = (id) => {
    this.setState({
      idGameGuessNumber: id,
    });
  };
  handleFetchListGameGuessNumbers = (page) => {
    const { store_code } = this.props.match.params;
    const params = `page=${page}`;
    this.props.fetchListGameGuessNumbers(store_code, params);
  };
  setPage = (page) => {
    this.setState({ page });
  };
  render() {
    const { isShow, openModalDeleteGameGuessNumber, idGameGuessNumber } =
      this.state;
    const { auth, listGameGuessNumbers } = this.props;
    const { store_code } = this.props.match.params;
    if (auth) {
      return (
        <GuessNumberStyles id="wrapper">
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
                        Danh sách game dự đoán kết quả
                      </h4>
                      <Link
                        className="btn btn-info btn-icon-split btn-sm show"
                        to={`/game_guess_numbers/${store_code}/create`}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span className="text">Thêm game dự đoán</span>
                      </Link>
                    </div>
                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <Table
                          store_code={store_code}
                          listGameGuessNumbers={listGameGuessNumbers}
                          setOpenModalDeleteGameGuessNumber={
                            this.setOpenModalDeleteGameGuessNumber
                          }
                          setIdGameGuessNumber={this.setIdGameGuessNumber}
                        />
                        <Pagination
                          setPage={this.setPage}
                          store_code={store_code}
                          listGameGuessNumbers={listGameGuessNumbers}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess></NotAccess>
                )}
                <Footer />
                <ModalDeleteGameGuessNumber
                  store_code={store_code}
                  idGameGuessNumber={idGameGuessNumber}
                  openModalDeleteGameGuessNumber={
                    openModalDeleteGameGuessNumber
                  }
                  setOpenModalDeleteGameGuessNumber={
                    this.setOpenModalDeleteGameGuessNumber
                  }
                  setIdGameGuessNumber={this.setIdGameGuessNumber}
                />
              </div>
            </div>
          </div>
        </GuessNumberStyles>
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
    listGameGuessNumbers:
      state.gamificationReducers.guess_numbers.listGameGuessNumbers,
    deletedSuccessfully:
      state.gamificationReducers.guess_numbers.deletedSuccessfully,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListGameGuessNumbers: (store_code, params) => {
      dispatch(
        gamificationAction.fetchListGameGuessNumbers(store_code, params)
      );
    },
    deletedSuccessfullyReturn: () => {
      dispatch({ type: Types.DELETE_GAME_GUESS_NUMBERS, data: false });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuessNumber);
