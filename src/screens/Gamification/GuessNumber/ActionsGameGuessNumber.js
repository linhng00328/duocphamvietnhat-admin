import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Loading from "../../Loading";
import NotAccess from "../../../components/Partials/NotAccess";
import ActionsGameGuessNumberContent from "./child/ActionsGameGuessNumberContent";
import Footer from "../../../components/Partials/Footer";
import * as AgencyAction from "../../../actions/agency";
import * as groupCustomerAction from "../../../actions/group_customer";
const ActionsGameSpinWheelStyles = styled.div``;

class ActionsGameGuessNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { fetchAllAgencyType, fetchGroupCustomer } = this.props;
    const { store_code } = this.props.match.params;
    fetchAllAgencyType(store_code);
    fetchGroupCustomer(store_code);
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

  render() {
    const { auth } = this.props;
    const { store_code, id } = this.props.match.params;
    const { isShow } = this.state;
    if (auth) {
      return (
        <ActionsGameSpinWheelStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <ActionsGameGuessNumberContent
                    store_code={store_code}
                    idGameGuessNumber={id}
                  />
                ) : (
                  <NotAccess></NotAccess>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </ActionsGameSpinWheelStyles>
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
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameGuessNumber);
