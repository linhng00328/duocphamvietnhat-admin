import React, { Component } from "react";
import * as Types from "../../constants/ActionType";
import * as ecommerceAction from "../../actions/ecommerce";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import Footer from "../../components/Partials/Footer";
import Alert from "../../components/Partials/Alert";
import { connect } from "react-redux";

import NotAccess from "../../components/Partials/NotAccess";
import Table from "../../components/Ecommerce/Connect/Table";
import ModalChooseEcommerce from "../../components/Ecommerce/Connect/ModalChooseEcommerce";

const ecommerces = [
  {
    id: 1,
    name: "Tất cả",
    value: "",
  },
  {
    id: 2,
    name: "Shopee.vn",
    value: "SHOPEE",
  },
  {
    id: 3,
    name: "Tiktok.com",
    value: "TIKTOK",
  },
  {
    id: 4,
    name: "Lazada.vn",
    value: "LAZADA",
  },
  {
    id: 5,
    name: "Tiki.vn",
    value: "TIKI",
  },
];

class Ecommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform_name: null,
    };
  }
  componentDidMount() {
    this.handleFetchListConnectEcommerce();
  }
  handleFetchListConnectEcommerce = (params) => {
    const { fetchListConnectEcommerce } = this.props;
    var { store_code } = this.props.match.params;
    fetchListConnectEcommerce(store_code, params);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var payment_request_list = permissions.agency_payment_request_list;
      var config = permissions.agency_config;
      var payment_request_history = permissions.agency_payment_request_history;
      var agency_list = permissions.agency_list;
      var payment_request_solve = permissions.agency_payment_request_solve;

      var isShow =
        payment_request_list == false &&
        config == false &&
        payment_request_history == false &&
        agency_list == false
          ? false
          : true;

      this.setState({
        isLoading: true,
        isShow: true,
      });
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const params = `platform_name=${value}`;
    this.handleFetchListConnectEcommerce(params);
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { store_code } = this.props.match.params;
    var { listConnectEcommerce } = this.props;
    var { isShow, platform_name } = this.state;
    return (
      <div id="wrapper">
        <Sidebar store_code={store_code} />
        <ModalChooseEcommerce
          store_code={store_code}
          handleFetchListConnectEcommerce={() =>
            this.handleFetchListConnectEcommerce(
              platform_name ? `platform_name=${platform_name}` : ""
            )
          }
        ></ModalChooseEcommerce>
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 className="h4 title_content mb-0 text-gray-800">
                      Kết nối sàn TMĐT
                    </h4>{" "}
                  </div>
                  <br></br>

                  <div className="card shadow mb-4">
                    <div
                      class="row"
                      style={{
                        marginTop: "10px",
                        marginLeft: "20px",
                        columnGap: "20px",
                      }}
                    >
                      {platform_name === "TIKI" ? (
                        <button
                          style={{ margin: "auto 0px" }}
                          className={`btn btn-primary`}
                          onClick={() => {
                            document.getElementById("connect-TIKI").click();
                          }}
                        >
                          <i className="fa fa-plus"></i>
                          Thêm kết nối
                        </button>
                      ) : platform_name === "LAZADA" ? (
                        <button
                          style={{ margin: "auto 0px" }}
                          className={`btn btn-primary`}
                          onClick={() => {
                            document.getElementById("connect-LAZADA").click();
                          }}
                        >
                          <i className="fa fa-plus"></i>
                          Thêm kết nối
                        </button>
                      ) : platform_name === "TIKTOK" ? (
                        <button
                          style={{ margin: "auto 0px" }}
                          className={`btn btn-primary`}
                          onClick={() => {
                            document.getElementById("connect-TIKTOK").click();
                          }}
                        >
                          <i className="fa fa-plus"></i>
                          Thêm kết nối
                        </button>
                      ) : platform_name === "SHOPEE" ? (
                        <button
                          style={{ margin: "auto 0px" }}
                          className={`btn btn-primary`}
                          onClick={() => {
                            document.getElementById("connect-SHOPEE").click();
                          }}
                        >
                          <i className="fa fa-plus"></i>
                          Thêm kết nối
                        </button>
                      ) : (
                        <button
                          style={{ margin: "auto 0px" }}
                          className={`btn btn-primary`}
                          data-toggle="modal"
                          data-target="#modalChooseEcommerce"
                        >
                          <i className="fa fa-plus"></i>
                          Thêm kết nối
                        </button>
                      )}
                      <select
                        style={{
                          width: "200px",
                        }}
                        onChange={this.onChange}
                        value={platform_name}
                        name="platform_name"
                        class="form-control"
                      >
                        <option value="" disabled>
                          ---Chọn sàn TMĐT---
                        </option>
                        {ecommerces.map((ecommerce) => (
                          <option value={ecommerce.value} key={ecommerce.id}>
                            {ecommerce.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="card-body"
                      style={{
                        overflow: "auto",
                      }}
                    >
                      <Table
                        store_code={store_code}
                        listConnectEcommerce={listConnectEcommerce}
                        fetchListConnectEcommerce={() => {
                          this.handleFetchListConnectEcommerce(
                            `${
                              platform_name
                                ? `platform_name=${platform_name}`
                                : ""
                            }`
                          );
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        {/* <Pagination
              numPage={numPage}
              searchValue={searchValue}
              getParams={this.getParams}
              store_code={store_code}
              agencys={agencys}
              setPage={this.setPage}
              typeAgency={typeAgency}
            /> */}
                      </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    alert: state.agencyReducers.alert.alert_uid_config,
    permission: state.authReducers.permission.data,
    listConnectEcommerce: state.ecommerceReducers.connect.listConnectEcommerce,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListConnectEcommerce: (store_code, params) => {
      dispatch(ecommerceAction.fetchListConnectEcommerce(store_code, params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
