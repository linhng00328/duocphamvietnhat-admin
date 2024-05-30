import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Footer from "../../../components/Partials/Footer";
import Alert from "../../../components/Partials/Alert";
import * as Types from "../../../constants/ActionType";
import Table from "../../../components/Promotion/Discount/Table";
import Pagination from "../../../components/Promotion/Discount/Pagination";
import { Link, Redirect } from "react-router-dom";
import * as discountAction from "../../../actions/discount";
import ModalDelete from "../../../components/Promotion/Discount/Delete/Modal";
import ModalIsEnd from "../../../components/Promotion/Discount/Edit/Modal";
import NotAccess from "../../../components/Partials/NotAccess";
import { getQueryParams, removeAscent } from "../../../ultis/helpers";

import Loading from "../../Loading";
import styled from "styled-components";
import history from "../../../history";

const DiscountStyles = styled.div`
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
class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        table: "",
        id: "",
        store_code: "",
      },
      modalIsEnd: {},
      discountProducts: [],
      is_end: getQueryParams("type") || 2,
      page: getQueryParams("page") || 1,
      searchValue: getQueryParams("search") || "",
    };
  }

  setPage = (page) => {
    this.setState({ page });
  };
  setDiscountProducts = (discounts) => {
    this.setState({
      discountProducts: discounts,
    });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = Number(target.value);
    var { store_code } = this.props.match.params;
    var params = `?type=${value}`;
    history.push(`/discount/${store_code}${params}`);
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
          this.props.fetchAllDiscount(store_code);
          break;
        case 1:
          this.props.fetchAllDiscountEnd(store_code, page);
          break;
        case 2:
          this.props.fetchAllDiscount(store_code);
          break;
        default:
          break;
      }
    }
    const { discounts } = this.props;
    const { searchValue } = this.state;
    if (!shallowEqual(discounts, nextProps.discounts)) {
      let newDiscountProducts = JSON.parse(JSON.stringify(nextProps.discounts));
      if (Array.isArray(nextProps.discounts)) {
        newDiscountProducts = nextProps.discounts.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(searchValue.trim().toLowerCase())
          )
        );
      } else {
        newDiscountProducts.data = nextProps.discounts.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(searchValue.trim().toLowerCase())
          )
        );
      }
      this.setDiscountProducts(newDiscountProducts);
    }
    return true;
  }

  componentDidMount() {
    var { store_code } = this.props.match.params;
    const { page, is_end } = this.state;

    if ((is_end && is_end == 0) || is_end == 1 || is_end == 2) {
      var type = Number(is_end);

      switch (type) {
        case 0:
          this.props.fetchAllDiscount(store_code);
          break;
        case 1:
          this.props.fetchAllDiscountEnd(store_code, page);
          break;
        case 2:
          this.props.fetchAllDiscount(store_code);
          break;
        default:
          break;
      }
    } else {
      this.props.fetchAllDiscount(this.props.match.params.store_code);
    }
  }

  componentDidUpdate() {
    if (
      this.state.isLoading != true &&
      typeof this.props.permission.product_list != "undefined"
    ) {
      var permissions = this.props.permission;
      var isShow = permissions.promotion_discount_list;

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
    const { discounts } = this.props;
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
    history.push(`/discount/${store_code}${params}`);
    if (value === "") {
      this.setDiscountProducts(discounts);
    } else {
      let newDiscountProducts = JSON.parse(JSON.stringify(discounts));
      if (Array.isArray(discounts)) {
        newDiscountProducts = discounts.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      } else {
        newDiscountProducts.data = discounts.data.filter((product) =>
          removeAscent(product.name.trim().toLowerCase()).includes(
            removeAscent(e.target.value.trim().toLowerCase())
          )
        );
      }
      this.setDiscountProducts(newDiscountProducts);
    }
  };

  render() {
    var { params } = this.props.match;
    var { is_end, modal, modalIsEnd, searchValue, discountProducts } =
      this.state;
    var { discounts } = this.props;
    var { store_code } = this.props.match.params;
    var displayPag = is_end == 0 ? "hide" : null;
    var { insert, update, _delete, isShow, page } = this.state;
    if (this.props.auth) {
      return (
        <DiscountStyles id="wrapper">
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
                        Giảm giá sản phẩm
                      </h3>

                      <Link
                        to={`/discount/create/${params.store_code}`}
                        class={`btn btn-info btn-icon-split  ${
                          insert == true ? "show" : "hide"
                        }`}
                      >
                        <span
                          style={{
                            display: "flex",
                            margin: "auto",
                            height: "100%",
                            "justify-content": "center",
                            "align-items": "center",
                          }}
                          class="icon text-white-50"
                        >
                          <i class="fas fa-plus"></i>
                        </span>
                        <span style={{ margin: "auto" }} class="text">
                          Tạo giảm giá
                        </span>
                      </Link>
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
                                placeholder="Tìm kiếm chương trình..."
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
                          Danh sách chương trình
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
                          discounts={discountProducts}
                        />
                        <Pagination
                          display={displayPag}
                          params={params}
                          discounts={discountProducts}
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
        </DiscountStyles>
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
    discounts: state.discountReducers.discount.allDiscount,
    alert: state.discountReducers.alert.alert_success,
    permission: state.authReducers.permission.data,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllDiscount: (store_code) => {
      dispatch(discountAction.fetchAllDiscount(store_code));
    },
    fetchAllDiscountEnd: (store_code, page) => {
      dispatch(discountAction.fetchAllDiscountEnd(store_code, page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Discount);
