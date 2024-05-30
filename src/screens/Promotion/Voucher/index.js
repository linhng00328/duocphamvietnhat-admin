import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import Table from "../../../components/Promotion/Voucher/Table";
import Pagination from "../../../components/Promotion/Voucher/Pagination";
import { Link, Redirect } from "react-router-dom";
import * as voucherAction from "../../../actions/voucher";
import ModalDelete from "../../../components/Promotion/Voucher/Delete/Modal";
import ModalIsEnd from "../../../components/Promotion/Voucher/Edit/Modal";
import NotAccess from "../../../components/Partials/NotAccess";

import { getQueryParams, removeAscent } from "../../../ultis/helpers";

import Loading from "../../Loading";
import styled from "styled-components";
import history from "../../../history";

const VoucherStyles = styled.div`
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    .form-inputSearch {
      max-width: 25%;
      width: 100%;
      position: relative;
      input {
        width: 100%;
        padding-right: 30px !important;
      }
      .search-icon {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
class Voucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        table: "",
        id: "",
        store_code: "",
      },
      modalIsEnd: {},
      voucherProducts: [],
      is_end: getQueryParams("type") || 2,
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
    };
  }
  setPage = (page) => {
    this.setState({ page });
  };
  setVoucherProducts = (vouchers) => {
    this.setState({
      voucherProducts: vouchers,
    });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = Number(target.value);
    var { store_code } = this.props.match.params;
    var params = `?type=${value}`;
    history.push(`/voucher/${store_code}${params}`);
    this.setState({ [name]: value, searchValue: "" });
  };
  handleDelCallBack = (modal) => {
    this.setState({ modal: modal });
  };
  handleIsEndCallback = (modal) => {
    this.setState({ modalIsEnd: modal });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.is_end !== this.state.is_end) {
      var { store_code } = this.props.match.params;
      const { page } = this.state;
      var is_end = Number(nextState.is_end);
      switch (is_end) {
        case 0:
          this.props.fetchAllVoucher(store_code);
          break;
        case 1:
          this.props.fetchAllVoucherEnd(store_code, page);
          break;
        case 2:
          this.props.fetchAllVoucher(store_code);
          break;
        default:
          break;
      }
    }
    const { vouchers } = this.props;
    const { searchValue } = this.state;
    if (!shallowEqual(vouchers, nextProps.vouchers)) {
      let newVoucherProducts = JSON.parse(JSON.stringify(nextProps.vouchers));
      if (Array.isArray(nextProps.vouchers)) {
        newVoucherProducts = nextProps.vouchers.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(searchValue.trim().toLowerCase())
          )
        );
      } else {
        newVoucherProducts.data = nextProps.vouchers.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(searchValue.trim().toLowerCase())
          )
        );
      }
      this.setVoucherProducts(newVoucherProducts);
    }
    return true;
  }

  componentDidMount() {
    var type = getQueryParams("type");
    var { store_code } = this.props.match.params;
    const { page, is_end } = this.state;
    if ((is_end && is_end == 0) || is_end == 1 || is_end == 2) {
      var type = Number(is_end);

      switch (type) {
        case 0:
          this.props.fetchAllVoucher(store_code);
          break;
        case 1:
          this.props.fetchAllVoucherEnd(store_code, page);
          break;
        case 2:
          this.props.fetchAllVoucher(store_code);
          break;
        default:
          break;
      }
    } else {
      this.props.fetchAllVoucher(this.props.match.params.store_code);
    }
  }
  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var isShow = permissions.promotion_voucher_list;

      this.setState({
        isLoading: true,
        insert: true,
        update: true,
        _delete: true,
        isShow,
      });
    }
  }
  handleSearchValueChange = (e) => {
    const value = e.target.value;
    const { vouchers } = this.props;
    const { store_code } = this.props.match.params;
    const { is_end } = this.state;

    this.setState({
      searchValue: value,
      page: 1,
    });
    var params = "";
    if (Number(is_end) === 1) {
      params += `?page=1&type=${is_end}`;
    } else {
      params += `?search=${value}&type=${is_end}`;
    }
    history.push(`/voucher/${store_code}${params}`);
    if (value === "") {
      this.setVoucherProducts(vouchers);
    } else {
      let newVoucherProducts = JSON.parse(JSON.stringify(vouchers));
      if (Array.isArray(vouchers)) {
        newVoucherProducts = vouchers.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      } else {
        newVoucherProducts.data = vouchers.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      }
      this.setVoucherProducts(newVoucherProducts);
    }
  };
  render() {
    var { params } = this.props.match;
    var { is_end, modal, modalIsEnd } = this.state;
    var { vouchers } = this.props;
    var displayPag = is_end == 0 ? "hide" : null;
    var { store_code } = this.props.match.params;
    var {
      insert,
      update,
      _delete,
      isShow,
      voucherProducts,
      searchValue,
      page,
    } = this.state;
    console.log(is_end);
    if (this.props.auth) {
      return (
        <VoucherStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={params.store_code} />
                {typeof isShow == "undefined" ? (
                  <div></div>
                ) : isShow == true ? (
                  <div class="container-fluid">
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
                      <h3 class="h3 title_content mb-2 text-gray-800">
                        Voucher giảm giá
                      </h3>
                      <div>
                        <Link
                          style={{ marginRight: "10px" }}
                          to={`/voucher/create/store/${params.store_code}`}
                          class={`btn btn-warning btn-icon-split ${
                            insert == true ? "show" : "hide"
                          }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Tạo Voucher toàn shop</span>
                        </Link>
                        <Link
                          to={`/voucher/create/product/${params.store_code}`}
                          class={`btn btn-info btn-icon-split  ${
                            insert == true ? "show" : "hide"
                          }`}
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Tạo Voucher sản phẩm</span>
                        </Link>
                      </div>
                    </div>

                    <div
                      class="form-group"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <div className="form-header">
                        <div
                          class="col-sm-3"
                          style={{
                            paddingLeft: "0px",
                            paddingRight: 0,
                            maxWidth: "20%",
                          }}
                        >
                          <select
                            name="is_end"
                            id="input"
                            class="form-control"
                            required="required"
                            value={is_end}
                            onChange={this.onChange}
                          >
                            <option value="0">Chuẩn bị diễn ra</option>

                            <option value="2">Đang diễn ra</option>

                            <option value="1">Đã kết thúc</option>
                          </select>
                        </div>
                        <div className="form-inputSearch">
                          {is_end != 1 ? (
                            <>
                              <input
                                className="form-control"
                                value={searchValue}
                                onChange={this.handleSearchValueChange}
                                type="text"
                                placeholder="Tìm kiếm voucher..."
                              />
                              <span className="search-icon">
                                <i className="fa fa-search"></i>
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div class="card shadow mb-4">
                      <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">
                          Danh sách Voucher
                        </h6>
                      </div>
                      <div class="card-body">
                        <Table
                          update={update}
                          _delete={_delete}
                          is_end={is_end}
                          page={page}
                          searchValue={searchValue}
                          handleIsEndCallback={this.handleIsEndCallback}
                          handleDelCallBack={this.handleDelCallBack}
                          params={params}
                          vouchers={voucherProducts}
                        />
                        <Pagination
                          display={displayPag}
                          params={params}
                          vouchers={voucherProducts}
                          store_code={store_code}
                          setPage={this.setPage}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotAccess />
                )}
              </div>
              <ModalDelete modal={modal} />
              <ModalIsEnd modal={modalIsEnd} />

              <Footer />
            </div>
          </div>
        </VoucherStyles>
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
    vouchers: state.voucherReducers.voucher.allVoucher,
    alert: state.voucherReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllVoucher: (store_code) => {
      dispatch(voucherAction.fetchAllVoucher(store_code));
    },
    fetchAllVoucherEnd: (store_code, page) => {
      dispatch(voucherAction.fetchAllVoucherEnd(store_code, page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
