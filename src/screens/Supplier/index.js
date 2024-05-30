import React, { Component } from "react";
import Alert from "../../components/Partials/Alert";
import Sidebar from "../../components/Partials/Sidebar";
import Topbar from "../../components/Partials/Topbar";
import * as dashboardAction from "../../actions/dashboard";
import Footer from "../../components/Partials/Footer";
import * as placeAction from "../../actions/place";
import * as Types from "../../constants/ActionType";
import { connect } from "react-redux";
import ModalDelete from "../../components/Supplier/ModalDelete";
import ModalCreate from "../../components/Supplier/ModalCreate";
import Pagination from "../../components/Supplier/Pagination";
import { getQueryParams } from "../../ultis/helpers";
import NotAccess from "../../components/Partials/NotAccess";

import ModalEdit from "../../components/Supplier/ModalEdit";
import { format, formatNumber } from "../../ultis/helpers";
import history from "../../history";
import { Link } from "react-router-dom";
class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_supplier: "",
      modal: "",
      openModal: false,
      paginate: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
    };
  }

  handleSetIdBranch = (id) => {
    this.setState({
      id_supplier: id,
    });
  };

  handleSetInfor = (item) => {
    this.setState({ modal: item });
  };
  openModal = () => {
    this.setState({ openModal: true });
  };
  resetModal = () => {
    this.setState({ openModal: false });
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.supplier != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.supplier;
      this.setState({ isLoading: true, isShow });
    }
  }
  changePage = (e, store_code, supplierId) => {
    var { paginate, searchValue } = this.state;

    if (e.target.name !== "toggle")
      history.push(
        `/supplier/detail/${store_code}/${supplierId}?page=${paginate}&search=${searchValue}`
      );
  };
  componentDidMount() {
    const { store_code } = this.props.match.params;
    const { searchValue, paginate } = this.state;

    const params = `&search=${searchValue}`;
    this.props.fetchAllSupplier(store_code, paginate, params);
    this.props.fetchPlaceProvince();
  }
  showData = (listSupplier) => {
    const { supplier: dataSupplier } = this.props;
    var result = null;
    var { store_code } = this.props.match.params;
    if (listSupplier.length > 0) {
      result = listSupplier.map((data, index) => {
        return (
          <tr
            className="hover-product"
            onClick={(e) => this.changePage(e, store_code, data.id)}
          >
            <td>{(dataSupplier.current_page - 1) * 20 + index + 1}</td>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{format(data.debt)}</td>
            <td>{data.wards_name}</td>
            <td>{data.district_name}</td>
            <td>{data.province_name}</td>

            <td>
              {/* <Link
                to={`/supplier/detail/${store_code}/${data.id}`}
                style={{ marginLeft: "10px" }}
                class={`btn btn-warning btn-sm `}
              >
                <i class="fa fa-edit"></i> Sửa
              </Link> */}
              <button
                onClick={() => this.handleSetIdBranch(data.id)}
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                name="toggle"
                data-target="#removeModal"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-trash"></i> Xóa
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  getPaginate = (num) => {
    this.setState({ paginate: num });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props.match.params;
    var { searchValue } = this.state;
    this.setState({
      paginate: 1,
    });
    history.push(`/supplier/${store_code}?page=1&search=${searchValue}`);
    var params = `&search=${searchValue}`;
    this.props.fetchAllSupplier(store_code, 1, params);
  };

  render() {
    var { store_code } = this.props.match.params;
    var listSupplier = this.props.supplier.data ? this.props.supplier.data : [];
    var { id_supplier, modal, openModal, isShow } = this.state;
    var { wards, district, province, supplier } = this.props;
    var { searchValue, paginate } = this.state;
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
                      Nhà cung cấp
                    </h4>{" "}
                    <a
                      onClick={this.openModal}
                      data-toggle="modal"
                      data-target="#modalAddress"
                      class={`btn btn-info btn-icon-split btn-sm `}
                    >
                      <span
                        class="icon text-white-50"
                        style={{ marginRight: 0 }}
                      >
                        <i class="fas fa-plus"></i>
                      </span>
                      <span style={{ color: "white" }} class={`text `}>
                        Thêm nhà cung cấp
                      </span>
                    </a>
                  </div>

                  <br></br>
                  <div className="card shadow ">
                    <div className="card-header py-3">
                      <br></br>
                      <div className="card">
                        <form onSubmit={this.searchData}>
                          <div
                            class="input-group mb-6"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ maxWidth: "400px" }}
                              type="search"
                              name="txtSearch"
                              value={searchValue}
                              onChange={this.onChangeSearch}
                              class="form-control"
                              placeholder="Tìm nhà cung cấp"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="card-body">
                          <div class="table-responsive">
                            <table
                              class="table  "
                              id="dataTable"
                              width="100%"
                              cellspacing="0"
                            >
                              <thead>
                                <tr>
                                  <th>STT</th>
                                  <th>Tên nhà cung cấp</th>

                                  <th>Số điện thoại</th>

                                  <th>Công nợ</th>

                                  <th>Phường/xã</th>
                                  <th>Quận/huyện</th>

                                  <th>Tỉnh/thành phố</th>

                                  <th>Hành động</th>
                                </tr>
                              </thead>

                              <tbody>{this.showData(listSupplier)}</tbody>
                            </table>
                          </div>

                          <Pagination
                            searchValue={searchValue}
                            getPaginate={this.getPaginate}
                            store_code={store_code}
                            suppliers={supplier}
                          />
                        </div>
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
          <ModalDelete
            store_code={store_code}
            id_supplier={id_supplier}
            paginate={paginate}
            searchValue={searchValue}
          />
          <ModalCreate
            openModal={openModal}
            resetModal={this.resetModal}
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
          />
          <ModalEdit
            store_code={store_code}
            wards={wards}
            district={district}
            province={province}
            modal={modal}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supplier: state.storeReducers.store.supplier,
    wards: state.placeReducers.wards,
    province: state.placeReducers.province,
    district: state.placeReducers.district,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPlaceProvince: () => {
      dispatch(placeAction.fetchPlaceProvince());
    },
    fetchAllSupplier: (store_code, page, param) => {
      dispatch(dashboardAction.fetchAllSupplier(store_code, page, param));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
