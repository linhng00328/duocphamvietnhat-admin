import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "../../components/Decentralization/Detail/Form";
import Loading from "../Loading";
import * as decentralizationAction from "../../actions/decentralization";
import * as Types from "../../constants/ActionType";
import NotAccess from "../../components/Partials/NotAccess";

import Alert from "../../components/Partials/Alert";
class DecentralizationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var {store_code , id } = this.props.match.params;
    // this.props.fetchDecentralizationId(store_code,id);
    this.props.fetchAllDecentralization(store_code);

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != true && typeof nextProps.permission.product_list != "undefined") {
      var permissions = nextProps.permission

      var isShow = permissions.decentralization_list
      this.setState({ isLoading: true, isShow })
    }
  }

  render() {
    var { id, store_code } = this.props.match.params;
    var { decentralization, history } = this.props
    var { isShow } = this.state
    if (this.props.auth) {
      return (
        <div id="wrapper">
          <Sidebar store_code={store_code} />
<div className="col-10 col-10-wrapper">

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar store_code= {store_code} />
              {typeof isShow == "undefined" ?             <div style = {{height : "500px"}}></div> :
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
                    Sửa phân quyền
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
                            <Form history={history} data={decentralization} id = {id}  store_code={store_code} />
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
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    decentralization: state.decentralizationReducers.decentralization.allDecentralization,
    auth: state.authReducers.login.authentication,

    permission: state.authReducers.permission.data,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllDecentralization: (id) => {
      dispatch(decentralizationAction.fetchAllDecentralization(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DecentralizationEdit);
