import React, { Component } from "react";

import Form from "../../../../components/Promotion/BonusProduct/Edit/Form";
import * as Types from "../../../../constants/ActionType";

import Alert from "../../../../components/Partials/Alert";

import { connect, shallowEqual } from "react-redux";
import * as bonusProductAction from "../../../../actions/bonus_product";

import * as comboAction from "../../../../actions/combo";
import * as productAction from "../../../../actions/product";
import { getQueryParams } from "../../../../ultis/helpers";
import FormGroupProduct from "../../../../components/Promotion/BonusProduct/Edit/FormGroupProduct";
import styled from "styled-components";
import ModalDelete from "../../../../components/Promotion/BonusProduct/Edit/ModalDelete";

const SectionStyles = styled.section`
  ul#myTab {
    &::-webkit-scrollbar {
      height: 5px;
    }
    .group__nav-link {
      display: flex;
      column-gap: 8px;
      align-items: center;
      svg {
        color: #919191;
        width: 16px;
        height: 16px;
      }
    }
  }
`;
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 0,
      groupId: null,
      indexgroupRemove: null,
      ladder_reward: false,
    };
  }

  componentDidMount() {
    var { store_code, bonusProductId } = this.props;
    this.props.fetchBonusProductId(store_code, bonusProductId);
    this.props.fetchBonusProductItem(store_code, bonusProductId);
    const branch_id = localStorage.getItem("branch_id");
    this.props.fetchAllProductV2(store_code, branch_id, 1, null);
    this.props.fetchAllCombo(store_code);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextProps.bonusProductItem, this.props.bonusProductItem)
    ) {
      var { bonusProductItem } = nextProps;
      var listProductsBonus = [];

      if (bonusProductItem?.bonus_products?.length > 0) {
        listProductsBonus = bonusProductItem?.bonus_products.map((item) => {
          return {
            id: item.product?.id,
            quantity: item.quantity,
            distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.distribute_name,
            element_distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.element_distribute_name,
            sub_element_distribute_name:
              item.allows_choose_distribute === true
                ? null
                : item.sub_element_distribute_name,
            sku: item.product?.sku,
            name: item.product?.name,
            allows_choose_distribute: item.allows_choose_distribute,
            product: {
              id: item.product?.id,
              quantity: item.quantity,
              distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.distribute_name,
              element_distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.element_distribute_name,
              sub_element_distribute_name:
                item.allows_choose_distribute === true
                  ? null
                  : item.sub_element_distribute_name,
              sku: item.product?.sku,
              name: item.product?.name,
              allows_choose_distribute: item.allows_choose_distribute,
            },
          };
        });
      }

      var listProducts = [];

      if (bonusProductItem.select_products?.length > 0) {
        listProducts = bonusProductItem?.select_products.map((item) => {
          return {
            id: item.product?.id,
            quantity: item.quantity,
            distribute_name: item.distribute_name,
            element_distribute_name: item.element_distribute_name,
            sub_element_distribute_name: item.sub_element_distribute_name,
            sku: item.product?.sku,
            name: item.product?.name,
            allows_all_distribute: item.allows_all_distribute,
            product: {
              id: item.product?.id,
              quantity: item.quantity,
              distribute_name: item.distribute_name,
              element_distribute_name: item.element_distribute_name,
              sub_element_distribute_name: item.sub_element_distribute_name,
              sku: item.product?.sku,
              name: item.product?.name,
              allows_all_distribute: item.allows_all_distribute,
            },
          };
        });
      }

      this.setState({
        listProducts: listProducts || [],
        saveListProducts: listProducts || [],
        listProductsBonus: listProductsBonus || [],
        saveListProductsBonus: listProductsBonus || [],
        isLoading: true,
        loadCript: true,
        form: {},
      });
    }
    if (!shallowEqual(nextProps.bonusProduct, this.props.bonusProduct)) {
      this.setState({
        ladder_reward: nextProps.bonusProduct.ladder_reward,
      });
    }
    return true;
  }

  handleSelectedGroup = (e, group, index) => {
    if (e.target.closest(".removeBonusProductItemModal")) return;
    const { store_code, bonusProductId } = this.props;
    const params = `group_product=${group}`;
    this.props.fetchBonusProductItem(store_code, bonusProductId, params);
    this.setState({ tabSelected: index });
  };
  handleCreateGroup = () => {
    const { resetBonusProductItem } = this.props;
    this.setState({ tabSelected: -1 });
    resetBonusProductItem();
  };
  handleRemoveBonusProductItem = (group, index) => {
    this.setState({ groupId: group, indexgroupRemove: index });
  };
  handleFetchDataByRemoveGroup = () => {
    const { tabSelected, indexgroupRemove } = this.state;
    const {
      bonusProduct,
      resetBonusProductItem,
      fetchBonusProductItem,
      store_code,
      bonusProductId,
    } = this.props;
    if (tabSelected === indexgroupRemove) {
      if (bonusProduct.group_products.length <= 1) {
        this.setTabSelected(-1);
        resetBonusProductItem();
      } else if (indexgroupRemove === bonusProduct.group_products.length - 1) {
        const params = `group_product=${
          bonusProduct.group_products[indexgroupRemove - 1]
        }`;
        this.setTabSelected(indexgroupRemove - 1);
        fetchBonusProductItem(store_code, bonusProductId, params);
      } else {
        const params = `group_product=${
          bonusProduct.group_products[indexgroupRemove + 1]
        }`;
        fetchBonusProductItem(store_code, bonusProductId, params);
      }
    } else {
      if (indexgroupRemove < tabSelected) {
        this.setTabSelected(tabSelected - 1);
      }
    }
  };
  setTabSelected = (tabSelected) => {
    this.setState({ tabSelected });
  };
  setStatusDefault = () => {
    this.setState({ groupId: null, indexgroupRemove: null });
  };

  onSetLadderReward = () => {
    var { ladder_reward } = this.state;

    this.setState({ ladder_reward: !ladder_reward });
  };

  render() {
    var { bonusProduct, products, history, combos } = this.props;
    var { store_code, bonusProductId, bonusProductItem } = this.props;
    var { tabSelected, groupId } = this.state;

    return (
      <>
        <ModalDelete
          store_code={store_code}
          groupId={groupId}
          setStatusDefault={this.setStatusDefault}
          bonusProductId={bonusProductId}
          handleFetchDataByRemoveGroup={this.handleFetchDataByRemoveGroup}
        ></ModalDelete>
        <div class="container-fluid">
          <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="h4 title_content mb-0 text-gray-800">
              {getQueryParams("type") == 1
                ? "Chương trình thưởng sản phẩm đã kết thúc"
                : "Chỉnh sửa chương trình thưởng sản phẩm"}
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
                      <Form
                        store_code={store_code}
                        history={history}
                        bonusProductId={bonusProductId}
                        products={products}
                        bonusProduct={bonusProduct}
                        combos={combos}
                        onSetLadderReward={this.onSetLadderReward}
                        ladder_reward={this.state.ladder_reward}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        {!this.state.ladder_reward && (
          <div class="container-fluid">
            <Alert type={Types.ALERT_UID_STATUS} alert={this.props.alert} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 className="h4 title_content mb-0 text-gray-800">
                Các nhóm sản phẩm mua tặng thưởng
              </h4>{" "}
            </div>
            <br></br>
            <div class="card shadow mb-4">
              <div class="card-body">
                <SectionStyles class="content">
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <ul
                      class="nav nav-tabs"
                      id="myTab"
                      role="tablist"
                      style={{
                        flexWrap: "nowrap",
                        display: "-webkit-box",
                        overflowY: "hidden",
                        paddingBottom: "10px",
                        borderBottom: "none",
                      }}
                    >
                      {bonusProduct.group_products?.length > 0
                        ? bonusProduct.group_products.map((group, index) => (
                            <li
                              class="nav-item"
                              key={group}
                              onClick={(e) =>
                                this.handleSelectedGroup(e, group, index)
                              }
                              style={{
                                borderBottom:
                                  index === tabSelected
                                    ? "1px solid transparent"
                                    : "1px solid #dddfeb",
                              }}
                            >
                              <a
                                class={`group__nav-link nav-link ${
                                  index === tabSelected ? "active" : ""
                                }`}
                                id={`${group}-tab`}
                                dataToggle="tab"
                                // href={`#${group}`}
                                role="tab"
                                ariaControls={group}
                                ariaSelected="true"
                                style={{
                                  color: index === tabSelected ? "" : "#5e72e4",
                                }}
                              >
                                <span>Nhóm {index + 1}</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  data-toggle="modal"
                                  data-target="#removeBonusProductItemModal"
                                  className="removeBonusProductItemModal"
                                  onClick={() =>
                                    this.handleRemoveBonusProductItem(
                                      group,
                                      index
                                    )
                                  }
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </a>
                            </li>
                          ))
                        : null}
                      <li
                        class="nav-item"
                        onClick={() => this.handleCreateGroup()}
                        style={{
                          borderBottom:
                            tabSelected === -1 ||
                            bonusProduct.group_products?.length === 0
                              ? "1px solid transparent"
                              : "1px solid #dddfeb",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <a
                          class={`nav-link ${
                            tabSelected === -1 ? "active" : ""
                          }`}
                          id={`create-tab`}
                          dataToggle="tab"
                          role="tab"
                          aria-controls="create"
                          aria-selected="true"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: tabSelected === -1 ? "" : "#5e72e4",
                          }}
                        >
                          <span>Thêm nhóm</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            style={{
                              width: "18px",
                              height: "18px",
                              paddingLeft: "4px",
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-xs-12">
                      <div id="messages"></div>
                      <div class="box">
                        <FormGroupProduct
                          store_code={store_code}
                          history={history}
                          bonusProductId={bonusProductId}
                          products={products}
                          bonusProduct={bonusProductItem}
                          combos={combos}
                          setTabSelected={this.setTabSelected}
                          isFormCreate={
                            tabSelected !== -1 &&
                            bonusProduct.group_products?.length > 0
                              ? false
                              : true
                          }
                        />
                      </div>
                    </div>
                  </div>
                </SectionStyles>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
    bonusProduct: state.bonusProductReducers.bonusProduct.bonusProductId,
    bonusProductItem: state.bonusProductReducers.bonusProduct.bonusProductItem,
    products: state.productReducers.product.allProduct,
    combos: state.comboReducers.combo.allCombo,
    alert: state.comboReducers.alert.alert_uid,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBonusProductId: (store_code, comboId) => {
      dispatch(bonusProductAction.fetchBonusProductId(store_code, comboId));
    },
    fetchBonusProductItem: (store_code, bonusId, params) => {
      dispatch(
        bonusProductAction.fetchBonusProductItem(store_code, bonusId, params)
      );
    },

    resetBonusProductItem: () => {
      dispatch({
        type: Types.FETCH_BONUS_PRODUCT_ITEM,
        data: {},
      });
    },
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    fetchAllCombo: (store_code) => {
      dispatch(comboAction.fetchAllCombo(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
