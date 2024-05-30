import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import ModalRemove from "../../components/AttributeSearch/ModalRemove";
import ModelRemoveChild from "../../components/AttributeSearch/ModelRemoveChild";
import ModalCreateChild from "../../components/AttributeSearch/ModalCreateChild";
import ModalUpdatechild from "../../components/AttributeSearch/ModalUpdatechild";
import Footer from "../../components/Partials/Footer";
import ModalUpdate from "../../components/AttributeSearch/ModalUpdate";
import ModalCreate from "../../components/AttributeSearch/ModalCreate";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Table from "../../components/AttributeSearch/Table";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as attributeActions from "../../actions/attribute_search";
import NotAccess from "../../components/Partials/NotAccess";

class AttributeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalremove: {
        title: "",
        id: "",
        name: "",
      },
      modalremovechild: {
        title: "",
        id: "",
        idChild: "",
        name: "",
      },
      modalcreatechild: {
        id: "",
      },
      modalupdatechild: {
        name: "",
        id: "",
        idChild: "",
        image: "",
      },
      modalupdate: {
        name: "",
        id: "",
        image_url: "",
        is_show_home: "",
      },
    };
  }

  handleDelCallBack = (modal) => {
    this.setState({ modalremove: modal });
  };
  handleDeleteChild = (modal) => {
    this.setState({ modalremovechild: modal });
  };
  handleCreateChild = (modal) => {
    this.setState({ modalcreatechild: modal });
  };
  handleUpdateChild = (modal) => {
    this.setState({ modalupdatechild: modal });
  };
  handleUpdateCallBack = (modal) => {
    this.setState({ modalupdate: modal });
  };

  componentDidMount() {
    this.props.fetchAllAttributeSearch(this.props.match.params.store_code);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.product_attribute_list;
      var insert = permissions.product_attribute_add;
      var update = permissions.product_attribute_update;
      var _delete = permissions.product_attribute_remove;

      this.setState({
        isLoading: true,
        insert,
        update,
        _delete,
        isShow,
      });
    }
    // $("#dataTable").DataTable(config());

    // window.$(".dataTables_info").hide()
  }
  render() {
    var { store_code } = this.props.match.params;
    var { alert, attribute_search } = this.props;
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
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
                    <Alert type={Types.ALERT_UID_STATUS} alert={alert} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="h4 title_content mb-0 text-gray-800">
                        Danh sách thuộc tính
                      </h4>
                      <a
                        data-toggle="modal"
                        data-target="#createModal"
                        class={`btn btn-info btn-icon-split btn-sm ${
                          insert == true ? "show" : "hide"
                        }`}
                        style={{ height: "fit-content", width: "fit-content" }}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span
                          style={{
                            color: "white",
                          }}
                          class={`text `}
                        >
                          Thêm thuộc tính
                        </span>
                      </a>
                    </div>
                    <br></br>
                    <div
                      class="card shadow mb-4"
                      style={{ overflowY: "scroll" }}
                    >
                      <div class="card-body card-body123">
                        <Table
                          store_code={store_code}
                          insert={insert}
                          update={update}
                          _delete={_delete}
                          attribute_search={attribute_search}
                          handleUpdateCallBack={this.handleUpdateCallBack}
                          handleDelCallBack={this.handleDelCallBack}
                          handleDeleteChild={this.handleDeleteChild}
                          handleCreateChild={this.handleCreateChild}
                          handleUpdateChild={this.handleUpdateChild}
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
            <ModalCreate
              store_code={store_code}
              attribute_search={attribute_search}
            />
            <ModalUpdate
              modal={this.state.modalupdate}
              store_code={store_code}
            />
            <ModalRemove
              modal={this.state.modalremove}
              store_code={store_code}
            />
            <ModelRemoveChild
              modal={this.state.modalremovechild}
              store_code={store_code}
            />
            <ModalCreateChild
              store_code={store_code}
              modal={this.state.modalcreatechild}
              attribute_search={attribute_search}
            />
            <ModalUpdatechild
              store_code={store_code}
              modal={this.state.modalupdatechild}
              attribute_search={attribute_search}
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
    auth: state.authReducers.login.authentication,
    attribute_search:
      state.attributeSearchReducers.attribute_search.allAttribute,
    alert: state.attributeSearchReducers.alert.alert_create,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAttributeSearch: (store_code) => {
      dispatch(attributeActions.fetchAllAttributeSearch(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AttributeSearch);
