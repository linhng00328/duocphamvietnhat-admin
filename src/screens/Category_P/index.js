import React, { Component } from "react";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import ModalRemove from "../../components/Category_P/ModalRemove";
import ModelRemoveChild from "../../components/Category_P/ModelRemoveChild";
import ModalCreateChild from "../../components/Category_P/ModalCreateChild";
import ModalUpdatechild from "../../components/Category_P/ModalUpdatechild";
import Footer from "../../components/Partials/Footer";
import ModalUpdate from "../../components/Category_P/ModalUpdate";
import ModalCreate from "../../components/Category_P/ModalCreate";
import Alert from "../../components/Partials/Alert";
import * as Types from "../../constants/ActionType";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Table from "../../components/Category_P/Table";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as CategoryPAction from "../../actions/category_product";
import NotAccess from "../../components/Partials/NotAccess";

import config from "../../ultis/datatable";

class Store extends Component {
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
        description: "",
        meta_robots_index: "",
        meta_robots_follow: "",
        canonical_url: "",
        category_children_url: "",
      },
      modalupdate: {
        name: "",
        id: "",
        image_url: "",
        is_show_home: "",
        description: "",
        meta_robots_index: "",
        meta_robots_follow: "",
        canonical_url: "",
        product_category_url: "",
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
    this.props.fetchAllCategoryP(this.props.match.params.store_code);
  }
  componentWillReceiveProps(nextProps) {
    // $("#dataTable").DataTable().destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;

      var isShow = permissions.product_category_list;
      var insert = permissions.product_category_add;
      var update = permissions.product_category_update;
      var _delete = permissions.product_category_remove;

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
    var { alert, category_product } = this.props;
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
                        Danh mục sản phẩm
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
                          Thêm danh mục
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
                          category_product={category_product}
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
              category_product={category_product}
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
              category_product={category_product}
            />
            <ModalUpdatechild
              store_code={store_code}
              modal={this.state.modalupdatechild}
              category_product={category_product}
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
    category_product: state.categoryPReducers.category_product.allCategoryP,
    alert: state.categoryPReducers.alert.alert_create,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategoryP: (store_code) => {
      dispatch(CategoryPAction.fetchAllCategoryP(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
