import React, { Component } from "react";
import $ from "jquery";
import * as Types from "../../constants/ActionType";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import ModalDelete from "../../components/BannerAds/Delete/Modal";
import NotAccess from "../../components/Partials/NotAccess";

import Table from "../../components/BannerAds/Table";
import Alert from "../../components/Partials/Alert";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import * as bannerAdsAction from "../../actions/banner_ads";
import config from "../../ultis/datatable";
class BannerAds extends Component {
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
    this.props.fetchAllBannerAds(this.props.match.params.store_code);
  }
  componentWillReceiveProps(nextProps) {
    $("#dataTable").DataTable().destroy();
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.product_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.banner_ads;

      this.setState({
        isLoading: true,
        insert: true,
        update: true,
        _delete: true,
        isShow,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    $("#dataTable").DataTable(config());

    $("#dataTable").DataTable(config());

    window.$(".dataTables_info").hide();
  }

  render() {
    var { store_code } = this.props.match.params;
    var { banner_ads } = this.props;
    var { insert, update, _delete, isShow } = this.state;
    console.log(banner_ads);
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
                        Quảng cáo
                      </h4>{" "}
                      <Link
                        to={`/banner_ads/create/${store_code}`}
                        class={`btn btn-info btn-icon-split btn-sm ${
                          insert == true ? "show" : "hide"
                        }`}
                      >
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                        <span class="text">Thêm banner quảng cáo</span>
                      </Link>
                    </div>

                    <br></br>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 title_content font-weight-bold text-primary">
                          Danh sách banner quảng cáo
                        </h6>
                      </div>
                      <div className="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          store_code={store_code}
                          handleDelCallBack={this.handleDelCallBack}
                          data={banner_ads}
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
            <ModalDelete store_code={store_code} modal={this.state.modal} />
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
    banner_ads: state.bannerAdsReducers.bannerAds.allBannerAds,
    auth: state.authReducers.login.authentication,
    alert: state.bannerAdsReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllBannerAds: (id) => {
      dispatch(bannerAdsAction.fetchAllBannerAds(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BannerAds);
