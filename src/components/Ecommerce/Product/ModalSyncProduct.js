import React, { Component } from "react";
import * as ecommerceAction from "../../../actions/ecommerce";
import { connect } from "react-redux";
import Select from "react-select";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";

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

class ModalSyncProduct extends Component {
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
      error: "",
    };
  }

  handleChangeStore = (listStore) => {
    this.setState({
      listStoreSelected: listStore,
      error: "",
    });
  };
  handleSyncProduct = () => {
    const { page, listStoreSelected } = this.state;
    this.setState({
      completeSync: false,
    });
    if (listStoreSelected?.length === 0) {
      this.setState({
        error: "Chọn cửa hàng để tải về đồng bộ sản phẩm",
      });

      return;
    }
    this.syncProduct(page);
  };
  syncProduct = (page) => {
    const { listStoreSelected } = this.state;
    const { syncProductEcommerce, store_code } = this.props;
    const data = {
      page: page,
      shop_ids:
        listStoreSelected?.length > 0
          ? listStoreSelected.map((store) => store.value)
          : [],
    };

    syncProductEcommerce(store_code, data, (totalSync) => {
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

  render() {
    const { listStore, isLoadingSpinner } = this.props;
    const { listStoreSelected, listTotal, completeSync, error } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalSyncProduct"
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
                Đồng bộ sản phẩm
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
                            Lấy sản phẩm từ{" "}
                            {this.props.isCheckedEcommerce() === "tiki"
                              ? "Tiki"
                              : this.props.isCheckedEcommerce() === "lazada"
                              ? "Lazada"
                              : this.props.isCheckedEcommerce() === "tiktok"
                              ? "Tiktok"
                              : this.props.isCheckedEcommerce() === "shopee"
                              ? "Shopee"
                              : ""}{" "}
                            về và tạo luôn sản phẩm trên hệ thống
                          </b>
                        </div>
                        <div
                          className="header-elements pt-0 text-right"
                          onClick={this.handleSyncProduct}
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
                        - Dành cho trường hợp shop đã có sản phẩm trên{" "}
                        {this.props.isCheckedEcommerce() === "tiki"
                          ? "Tiki"
                          : this.props.isCheckedEcommerce() === "lazada"
                          ? "Lazada"
                          : this.props.isCheckedEcommerce() === "tiktok"
                          ? "Tiktok"
                          : this.props.isCheckedEcommerce() === "shopee"
                          ? "Shopee"
                          : ""}{" "}
                        , chưa có sản phẩm trên hệ thống, hoặc đã có sản phẩm
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
                          <span>SL sản phẩm sẽ tải</span>
                        </div>
                        <div className="syncLoader__item">
                          <span
                            style={{
                              color: "#eb1818",
                            }}
                          >
                            {listTotal.sync_created}
                          </span>
                          <span>SL sản phẩm đã lấy từ sàn</span>
                        </div>
                        <div className="syncLoader__item">
                          <span
                            style={{
                              color: "#23d423",
                            }}
                          >
                            {listTotal.sync_updated}
                          </span>
                          <span>SL sản phẩm đã thêm</span>
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
                          Đã đồng bộ hoàn tất sản phẩm vào hệ thống.
                        </div>
                      ) : null}
                      {error ? (
                        <div
                          class="alert alert-danger"
                          role="alert"
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          {error}
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
    totalSync: state.ecommerceReducers.product.totalSync,
    isLoadingSpinner: state.ecommerceReducers.product.isLoadingSpinner,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    syncProductEcommerce: (store_code, data, funcModal) => {
      dispatch(
        ecommerceAction.syncProductEcommerce(store_code, data, funcModal)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalSyncProduct);
