import React, { Component } from "react";
import * as ecommerceAction from "../../../actions/ecommerce";
import { connect } from "react-redux";
import Select from "react-select";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { getQueryParams } from "../../../ultis/helpers";

const SyncLoaderStyles = styled.div`
  @keyframes react-spinners-SyncLoader-sync {
    33% {
      transform: translateY(5px);
    }
    60% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;
const SyncLoaderTotalStyles = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  .syncLoader__item {
    display: flex;
    flex-direction: column;
    text-align: center;
    span {
      &:first-child {
        font-size: 24px;
        font-weight: 600;
      }
      &:last-child {
        color: #a39b9b;
      }
    }
  }
`;

class ModalSyncOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStoreSelected: [],
      page: 1,
      listTotal: {
        sync_created: 0,
        sync_updated: 0,
        total_in_page: 0,
      },
      completeSync: false,
      created_from_date:
        getQueryParams("created_from_date") || this.handleShowDateBeforeAWeek(),
      created_to_date:
        getQueryParams("created_to_date") ||
        moment(new Date(), "DD-MM-YYYY").format("DD-MM-YYYY"),
    };
  }

  handleChangeStore = (listStore) => {
    this.setState({
      listStoreSelected: listStore,
    });
  };
  handleSyncOrder = () => {
    const { page } = this.state;
    this.syncProduct(page);
    this.setState({
      completeSync: false,
    });
  };
  syncProduct = (page) => {
    const { listStoreSelected, created_from_date, created_to_date } =
      this.state;

    const fromTime = created_from_date
      ? created_from_date?.split("-").reverse().join("-")
      : "";
    const toTime = created_to_date
      ? created_to_date?.split("-").reverse().join("-")
      : "";
    const { syncOrderEcommerce, store_code } = this.props;
    const data = {
      page: page,
      shop_ids:
        listStoreSelected?.length > 0
          ? listStoreSelected.map((store) => store.value)
          : [],
      created_from_date: fromTime,
      created_to_date: toTime,
    };

    syncOrderEcommerce(store_code, data, (totalSync) => {
      const { listTotal } = this.state;

      const newListTotal = {
        sync_created: listTotal.sync_created + totalSync?.sync_created,
        sync_updated: listTotal.sync_updated + totalSync?.sync_updated,
        total_in_page: listTotal.total_in_page + totalSync?.total_in_page,
      };

      this.setState({
        listTotal: newListTotal,
        page: page + 1,
      });
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { page } = this.state;
    if (page !== nextState.page && nextProps.totalSync?.total_in_page === 0) {
      this.setState({ completeSync: true });
    }
    if (page !== nextState.page && nextProps.totalSync?.total_in_page !== 0) {
      this.syncProduct(nextState.page);
    }

    return true;
  }

  handleCloseModal = () => {
    this.setState({
      listStoreSelected: [],
      completeSync: false,
      listTotal: {
        sync_created: 0,
        sync_updated: 0,
        total_in_page: 0,
      },
    });
  };
  onchangeDateFrom = (date) => {
    var from = "";
    from = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";

    this.setState({ created_from_date: from });
  };
  onchangeDateTo = (date) => {
    var to = "";
    to = date ? moment(date, "DD-MM-YYYY").format("DD-MM-YYYY") : "";

    this.setState({ created_to_date: to });
  };
  handleShowDateBeforeAWeek = () => {
    const now = new Date();

    return moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
      "DD-MM-YYYY"
    ).format("DD-MM-YYYY");
  };

  render() {
    const { listStore, isLoadingSpinner } = this.props;
    const {
      listStoreSelected,
      listTotal,
      completeSync,
      created_from_date,
      created_to_date,
    } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalSyncOrder"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div
          class="modal-dialog modal-lg"
          role="document"
          style={{
            maxWidth: "750px",
          }}
        >
          <div class="modal-content">
            <div
              class="modal-header"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <h4
                class="modal-title"
                style={{
                  color: "#414141",
                }}
              >
                Đồng bộ đơn hàng
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div>
              <div
                class="modal_ecommerce"
                style={{
                  display: "flex",
                  padding: "20px",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                <Select
                  options={listStore}
                  placeholder={"Chọn cửa hàng"}
                  value={listStoreSelected}
                  onChange={this.handleChangeStore}
                  isMulti={true}
                  noOptionsMessage={() => "Không tìm thấy kết quả"}
                ></Select>
                <div>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "20px",
                    }}
                  >
                    <Flatpickr
                      data-enable-time
                      value={new Date(moment(created_from_date, "DD-MM-YYYY"))}
                      className="created_from_date"
                      placeholder="Chọn ngày bắt đầu..."
                      options={{
                        altInput: true,
                        dateFormat: "DD-MM-YYYY",
                        altFormat: "DD-MM-YYYY",
                        allowInput: true,
                        enableTime: false,
                        maxDate: created_to_date,
                        parseDate: (datestr, format) => {
                          return moment(datestr, format, true).toDate();
                        },
                        formatDate: (date, format, locale) => {
                          // locale can also be used
                          return moment(date).format(format);
                        },
                      }}
                      onChange={([date]) => this.onchangeDateFrom(date)}
                    />
                    <Flatpickr
                      data-enable-time
                      value={new Date(moment(created_to_date, "DD-MM-YYYY"))}
                      className="created_to_date"
                      placeholder="Chọn ngày kết thúc..."
                      options={{
                        altInput: true,
                        dateFormat: "DD-MM-YYYY",
                        altFormat: "DD-MM-YYYY",
                        allowInput: true,
                        enableTime: false,
                        minDate: created_from_date,
                        parseDate: (datestr, format) => {
                          return moment(datestr, format, true).toDate();
                        },
                        formatDate: (date, format, locale) => {
                          // locale can also be used
                          return moment(date).format(format);
                        },
                      }}
                      onChange={([date]) => this.onchangeDateTo(date)}
                    />
                  </div>
                </div>
                <div>
                  <div className="card card-product-condition-sync">
                    <div className="card-header">
                      <div
                        className="row"
                        style={{
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div
                          className="typeName fontsize-150 nextstep"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <b>
                            Lấy đơn hàng từ{" "}
                            {this.props.isCheckedEcommerce() === "tiki"
                              ? "Tiki"
                              : this.props.isCheckedEcommerce() === "lazada"
                              ? "Lazada"
                              : this.props.isCheckedEcommerce() === "tiktok"
                              ? "Tiktok"
                              : this.props.isCheckedEcommerce() === "shopee"
                              ? "Shopee"
                              : ""}{" "}
                            về và cập nhập dữ liệu đơn hàng trên hệ thống
                          </b>
                        </div>
                        <div
                          className="header-elements pt-0 text-right"
                          onClick={this.handleSyncOrder}
                        >
                          <button
                            className="btn btn-success pull-right nextstep"
                            disabled={listStoreSelected?.length === 0}
                          >
                            <i className="fa fa-download"></i> Tải về
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        - Dành cho trường hợp shop đã có đơn hàng trên{" "}
                        {this.props.isCheckedEcommerce() === "tiki"
                          ? "Tiki"
                          : this.props.isCheckedEcommerce() === "lazada"
                          ? "Lazada"
                          : this.props.isCheckedEcommerce() === "tiktok"
                          ? "Tiktok"
                          : this.props.isCheckedEcommerce() === "shopee"
                          ? "Shopee"
                          : ""}
                        , chưa có đơn hàng trên hệ thống, hoặc đã có đơn hàng
                        trên cả{" "}
                        {this.props.isCheckedEcommerce() === "tiki"
                          ? "Tiki"
                          : this.props.isCheckedEcommerce() === "lazada"
                          ? "Lazada"
                          : this.props.isCheckedEcommerce() === "tiktok"
                          ? "Tiktok"
                          : this.props.isCheckedEcommerce() === "shopee"
                          ? "Shopee"
                          : ""}{" "}
                        và hệ thống.
                      </p>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        minHeight: "100px",
                      }}
                    >
                      <SyncLoaderStyles
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          height: "20px",
                        }}
                      >
                        <SyncLoader
                          loading={isLoadingSpinner}
                          size={12}
                          color="#36d7b7"
                        />
                      </SyncLoaderStyles>
                      <SyncLoaderTotalStyles className="syncLoader__main">
                        <div className="syncLoader__item">
                          <span>{listTotal.total_in_page}</span>
                          <span>SL đơn hàng sẽ tải</span>
                        </div>
                        <div className="syncLoader__item">
                          <span
                            style={{
                              color: "#eb1818",
                            }}
                          >
                            {listTotal.sync_created}
                          </span>
                          <span>SL đơn hàng đã lấy từ sàn</span>
                        </div>
                        <div className="syncLoader__item">
                          <span
                            style={{
                              color: "#23d423",
                            }}
                          >
                            {listTotal.sync_updated}
                          </span>
                          <span>SL đơn hàng đã thêm</span>
                        </div>
                      </SyncLoaderTotalStyles>
                      {completeSync ? (
                        <div
                          class="alert alert-success"
                          role="alert"
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          Đã đồng bộ hoàn tất đơn hàng vào hệ thống.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalSync: state.ecommerceReducers.order.totalSync,
    isLoadingSpinner: state.ecommerceReducers.order.isLoadingSpinner,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    syncOrderEcommerce: (store_code, data, funcModal) => {
      dispatch(ecommerceAction.syncOrderEcommerce(store_code, data, funcModal));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalSyncOrder);
