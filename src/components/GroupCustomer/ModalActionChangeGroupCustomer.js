import moment from "moment";
import { connect } from "react-redux";
import styled from "styled-components";
import * as groupCustomerAction from "../../actions/group_customer";
import { genders } from "../../ultis/groupCustomer/genders";
import { options } from "../../ultis/groupCustomer/options";
import { expressions } from "../../ultis/groupCustomer/expressions";
import { formatNumberV2 } from "../../ultis/helpers";
import themeData from "../../ultis/theme_data";
import ConditionGroupCustomer from "./details/AddGroupCustomer/ConditionGroupCustomer";
import * as Types from "../../constants/ActionType";
import { Component } from "react";
import { shallowEqual } from "../../ultis/shallowEqual";
import * as AgencyAction from "../../actions/agency";
import ListCustomerInGroup from "./ListCustomerInGroup";

const ModalAddGroupCustomerStyles = styled.div`
  background-color: rgba(0, 0, 0, 0.3);

  .model-header-modal {
    button {
      margin-right: 10px;
    }
  }
  .modal-dialog {
    animation: popup 1s ease-in-out 1;
  }
  .modal-body {
    padding: 1rem 0 0;
    .modal-body-tabs {
      ul {
        display: flex;
        margin: 0;
        border-bottom: 1px solid #e3e6f0;
        li {
          border-bottom: 1px solid transparent;
          cursor: pointer;
          padding: 8px 10px;
        }
      }
    }
    .modal-body-content {
      padding: 20px 10px;
      .form-group-customer {
        display: flex;
        align-items: center;
        label {
          width: 25%;
          font-size: 15px;
          font-weight: 600;
          sup {
            color: rgb(193, 32, 38);
          }
        }
        & > div {
          width: 100%;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dadae1;
          .form-group-input {
            width: 100%;
            padding: 10px;
          }
          svg {
            color: #a1a09e;
          }
        }
      }
      .form-group-customer-condition {
        margin-top: 10px;
        p {
          font-size: 15px;
          color: #a1a09e;
        }
      }
      .form-group-customer-addCondition {
        margin-top: 10px;
        padding: 6px 12px;
        border-radius: 5px;
        display: inline-block;
        border: 1px solid #dadae1;
        cursor: pointer;
        background-color: transparent;
        text-align: center;
        transition: 0.3s all;
        cursor: pointer;
        &:hover {
          color: #7f8c8d;
        }
        span:first-child {
          font-size: 14px;
        }
        span:last-child {
          font-size: 14px;
          margin-left: 5px;
        }
      }
      .form-group-customer-error {
        margin-top: 10px;
        color: rgb(193, 32, 38);

        h4 {
          font-size: 18px;
          margin-bottom: 5px;
          font-weight: 500;
        }
        p {
          margin-bottom: 5px;
          font-size: 14px;
          color: rgb(193, 32, 38);
        }
      }
    }
  }
  .modal-footer {
    border-top-color: transparent;
    .btn-info {
      border: 1px solid transparent;
      transition: all 0.3s;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .conditionGroup__main {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 15px;
  }
  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    50% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

class ModalActionChangeGroupCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: 1,
      conditionItems: [
        {
          typeCompareGroupCustomer: options[0].id,
          comparisonExpressionGroupCustomer: expressions[0].value,
          valueCompareGroupCustomer: 0,
        },
      ],
      errors: null,
      nameGroupCustomer: "",
      noteGroupCustomer: "",
      group_type: Types.GROUP_TYPE_CONDITION,
      listCustomers: [],
    };
  }

  setListCustomers = (customers) => {
    this.setState({ listCustomers: customers });
  };
  handleCloseModalAddGroupCustomer = () => {
    this.props.setOpenModalActionChangeGroupCustomer();
    this.props.setIdGroupCustomer(null);
  };
  setActiveTabId(id) {
    this.setState({ activeTabId: id });
  }

  handleChangeInput = (e, indexCondition) => {
    const name = e.target.name;
    const value = e.target.value;
    if (
      name === "group_type_condition" ||
      name === "group_type_list_customer"
    ) {
      this.setState({
        group_type: value,
      });
    } else if (typeof indexCondition === "undefined") {
      this.setState({
        [name]: value,
      });
    } else {
      if (
        name === "typeCompareGroupCustomer" &&
        Number(value) < Types.TYPE_COMPARE_MONTH_BIRTH
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[0].value,
              valueCompareGroupCustomer: 0,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else if (
        name === "typeCompareGroupCustomer" &&
        (Number(value) === Types.TYPE_COMPARE_MONTH_BIRTH ||
          Number(value) === Types.TYPE_COMPARE_AGE)
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[0].value,
              valueCompareGroupCustomer: 1,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else if (
        name === "typeCompareGroupCustomer" &&
        Number(value) === Types.TYPE_COMPARE_SEX
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[2].value,
              valueCompareGroupCustomer: genders[0].value,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else if (
        name === "typeCompareGroupCustomer" &&
        Number(value) === Types.TYPE_COMPARE_PROVINCE
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[2].value,
              valueCompareGroupCustomer: this.props?.province[0]?.id,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else if (
        name === "typeCompareGroupCustomer" &&
        Number(value) === Types.TYPE_COMPARE_DATE_REG
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[0].value,
              valueCompareGroupCustomer: moment().format("YYYY-MM-DD"),
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else if (
        name === "typeCompareGroupCustomer" &&
        (Number(value) === Types.TYPE_COMPARE_CTV ||
          Number(value) === Types.TYPE_COMPARE_AGENCY ||
          Number(value) === Types.TYPE_COMPARE_CUSTOMER_NORMAL)
      ) {
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]: value,
              comparisonExpressionGroupCustomer: expressions[2].value,
              valueCompareGroupCustomer:
                Number(value) === Types.TYPE_COMPARE_CTV ||
                Number(value) === Types.TYPE_COMPARE_CUSTOMER_NORMAL
                  ? 0
                  : -1,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      } else {
        //Handle change condition input,select
        const newConditionItems = [];
        this.state.conditionItems.forEach((conditionItem, index) => {
          if (index === indexCondition) {
            newConditionItems.push({
              ...conditionItem,
              [name]:
                name === "valueCompareGroupCustomer" &&
                this.state.conditionItems[indexCondition]
                  .typeCompareGroupCustomer < Types.TYPE_COMPARE_MONTH_BIRTH
                  ? formatNumberV2(value)
                  : name === "valueCompareGroupCustomer" &&
                    Number(
                      this.state.conditionItems[indexCondition]
                        .typeCompareGroupCustomer
                    ) === Types.TYPE_COMPARE_AGE
                  ? Math.floor(Math.min(Math.max(Number(value), 1), 99))
                  : value,
            });
          } else {
            newConditionItems.push(conditionItem);
          }
        });
        this.setState({
          conditionItems: newConditionItems,
        });
      }
    }
  };

  handleAddGroupCustomer = () => {
    const errors = {};
    if (this.state.nameGroupCustomer === "") {
      errors.nameGroupCustomer = {
        message: "Tên nhóm không được để trống!",
      };
    }
    if (this.state.noteGroupCustomer === "") {
      errors.noteGroupCustomer = {
        message: "Ghi chú không được để trống!",
      };
    }
    if (
      Number(this.state.conditionItems[0].valueCompareGroupCustomer) === -1 &&
      this.state.group_type != Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      errors.conditionItems = {
        message: "Vui lòng chọn đại lý!",
      };
    }
    if (Object.entries(errors).length > 0) {
      this.setState({
        errors,
      });
    }
    if (
      this.state.nameGroupCustomer !== "" &&
      this.state.noteGroupCustomer !== "" &&
      Number(this.state.conditionItems[0].valueCompareGroupCustomer) !== -1 &&
      this.state.group_type != Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      this.setState({
        errors: null,
      });
      const condition_items = this.state.conditionItems.map((conditionItem) => {
        return {
          type_compare: conditionItem.typeCompareGroupCustomer,
          comparison_expression:
            conditionItem.comparisonExpressionGroupCustomer,
          value_compare: conditionItem.valueCompareGroupCustomer
            .toString()
            .replace(/\./g, ""),
        };
      });
      const values = {
        name: this.state.nameGroupCustomer,
        note: this.state.noteGroupCustomer,
        condition_items,
        group_type: Types.GROUP_TYPE_CONDITION,
      };
      const { store_code } = this.props;
      this.props.createGroupCustomer(store_code, values);
      this.props.setOpenModalActionChangeGroupCustomer();
      this.props.setIdGroupCustomer(null);
    } else if (
      this.state.nameGroupCustomer !== "" &&
      this.state.noteGroupCustomer !== "" &&
      this.state.group_type == Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      const { listCustomers } = this.state;
      const values = {
        name: this.state.nameGroupCustomer,
        note: this.state.noteGroupCustomer,
        customer_ids:
          listCustomers.length > 0
            ? listCustomers.map((customer) => customer.id)
            : [],
        group_type: Types.GROUP_TYPE_LIST_CUSTOMER,
      };
      const { store_code } = this.props;
      this.props.createGroupCustomer(store_code, values);
      this.props.setOpenModalActionChangeGroupCustomer();
      this.props.setIdGroupCustomer(null);
    }
  };
  handleUpdateGroupCustomer = () => {
    const errors = {};
    if (this.state.nameGroupCustomer === "") {
      errors.nameGroupCustomer = {
        message: "Tên nhóm không được để trống!",
      };
    }
    if (this.state.noteGroupCustomer === "") {
      errors.noteGroupCustomer = {
        message: "Ghi chú không được để trống!",
      };
    }
    if (
      Number(this.state.conditionItems[0].valueCompareGroupCustomer) === -1 &&
      this.state.group_type != Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      errors.conditionItems = {
        message: "Vui lòng chọn đại lý!",
      };
    }
    if (Object.entries(errors).length > 0) {
      this.setState({
        errors,
      });
    }
    if (
      this.state.nameGroupCustomer !== "" &&
      this.state.noteGroupCustomer !== "" &&
      Number(this.state.conditionItems[0].valueCompareGroupCustomer) !== -1 &&
      this.state.group_type != Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      this.setState({
        errors: null,
      });
      const condition_items = this.state.conditionItems.map((conditionItem) => {
        return {
          type_compare: conditionItem.typeCompareGroupCustomer,
          comparison_expression:
            conditionItem.comparisonExpressionGroupCustomer,
          value_compare: conditionItem.valueCompareGroupCustomer
            .toString()
            .replace(/\./g, ""),
        };
      });
      const values = {
        name: this.state.nameGroupCustomer,
        note: this.state.noteGroupCustomer,
        condition_items,
        group_type: Types.GROUP_TYPE_CONDITION,
      };
      const { store_code, idGroupCustomer } = this.props;
      this.props.updateGroupCustomer(
        store_code,
        idGroupCustomer,
        values,
        `page=${this.props.page}`
      );
      this.props.setOpenModalActionChangeGroupCustomer();
      this.props.setIdGroupCustomer(null);
    } else if (
      this.state.nameGroupCustomer !== "" &&
      this.state.noteGroupCustomer !== "" &&
      this.state.group_type == Types.GROUP_TYPE_LIST_CUSTOMER
    ) {
      const { listCustomers } = this.state;
      const values = {
        name: this.state.nameGroupCustomer,
        note: this.state.noteGroupCustomer,
        customer_ids:
          listCustomers.length > 0
            ? listCustomers.map((customer) => customer.id)
            : [],
        group_type: Types.GROUP_TYPE_LIST_CUSTOMER,
      };
      const { store_code, idGroupCustomer } = this.props;
      this.props.updateGroupCustomer(
        store_code,
        idGroupCustomer,
        values,
        `page=${this.props.page}`
      );
      this.props.setOpenModalActionChangeGroupCustomer();
      this.props.setIdGroupCustomer(null);
    }
  };
  handleAddConditionGroupCustomer = () => {
    this.setState({
      conditionItems: [
        ...this.state.conditionItems,
        {
          typeCompareGroupCustomer: options[0].id,
          comparisonExpressionGroupCustomer: expressions[0].value,
          valueCompareGroupCustomer: 0,
        },
      ],
    });
  };
  handleRemoveConditionGroupCustomer = (indexCondition) => {
    const newConditionItems = this.state.conditionItems.filter(
      (conditionItem, index) => index !== indexCondition
    );
    this.setState({
      conditionItems: newConditionItems,
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { groupCustomerById } = nextProps;
    if (
      shallowEqual(this.state, nextState) &&
      nextProps.idGroupCustomer !== null
      // groupCustomerById?.condition_items?.length > 0
    ) {
      const newConditionItems =
        groupCustomerById?.condition_items?.length > 0
          ? groupCustomerById?.condition_items.map((group) => {
              return {
                typeCompareGroupCustomer: group.type_compare,
                comparisonExpressionGroupCustomer: group.comparison_expression,
                valueCompareGroupCustomer:
                  Number(group.type_compare) < Types.TYPE_COMPARE_MONTH_BIRTH
                    ? formatNumberV2(group.value_compare)
                    : group.value_compare,
              };
            })
          : this.state.conditionItems;
      this.setState({
        nameGroupCustomer: groupCustomerById.name,
        noteGroupCustomer: groupCustomerById.note,
        conditionItems: newConditionItems,
        group_type: groupCustomerById.group_type
          ? Types.GROUP_TYPE_LIST_CUSTOMER
          : Types.GROUP_TYPE_CONDITION,
        listCustomers:
          groupCustomerById?.customers?.length > 0
            ? groupCustomerById?.customers
            : [],
      });
    }
    return true;
  }
  componentDidMount() {
    const { idGroupCustomer, store_code } = this.props;
    if (idGroupCustomer !== null) {
      this.props.fetchGroupCustomerById(store_code, idGroupCustomer);
    }
    this.props.fetchAllAgencyType(store_code);
  }
  render() {
    const { province, idGroupCustomer, types, store_code } = this.props;
    return (
      <ModalAddGroupCustomerStyles
        className="modal"
        style={{
          display: "block",
        }}
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div
              className="model-header-modal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: themeData().backgroundColor,
              }}
            >
              <h4 style={{ color: "white", margin: "10px" }}>
                {idGroupCustomer ? "Cập nhật" : "Tạo "} điều kiện cho nhóm khách
                hàng
              </h4>
              <button
                type="button"
                className="close"
                onClick={this.handleCloseModalAddGroupCustomer}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-body-tabs">
                <ul>
                  <li
                    style={{
                      borderColor: themeData().backgroundColor,
                      color: "#34495e",
                    }}
                  >
                    Thông tin
                  </li>
                </ul>
              </div>
              <div className="modal-body-content">
                <form>
                  <div class="form-group-customer">
                    <label htmlFor="name">
                      Tên nhóm <sup>*</sup>
                    </label>
                    <div>
                      <input
                        type="text"
                        class="form-group-input"
                        id="name"
                        placeholder="Nhập tên nhóm khách hàng..."
                        autoComplete="off"
                        value={this.state.nameGroupCustomer}
                        onChange={this.handleChangeInput}
                        name="nameGroupCustomer"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="form-group-customer">
                    <label htmlFor="note">
                      Ghi chú <sup>*</sup>
                    </label>
                    <div>
                      <input
                        type="text"
                        className="form-group-input"
                        id="note"
                        placeholder="Ghi chú điều gì đó..."
                        autoComplete="off"
                        value={this.state.noteGroupCustomer}
                        onChange={this.handleChangeInput}
                        name="noteGroupCustomer"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    class="form-group-customer"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <label
                      htmlFor="group_type"
                      style={{
                        marginBottom: "0px",
                      }}
                    >
                      Loại nhóm KH <sup>*</sup>
                    </label>
                    <div
                      style={{
                        borderBottom: "none",
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <input
                          type="radio"
                          name="group_type_condition"
                          id="group_type_condition"
                          value={Types.GROUP_TYPE_CONDITION}
                          checked={
                            Types.GROUP_TYPE_CONDITION == this.state.group_type
                          }
                          onChange={this.handleChangeInput}
                        />
                        <label
                          style={{
                            width: "100%",
                            marginBottom: "0px",
                            fontWeight: "normal",
                          }}
                          htmlFor="group_type_condition"
                        >
                          Theo điều kiện
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <input
                          type="radio"
                          name="group_type_list_customer"
                          id="group_type_list_customer"
                          value={Types.GROUP_TYPE_LIST_CUSTOMER}
                          checked={
                            Types.GROUP_TYPE_LIST_CUSTOMER ==
                            this.state.group_type
                          }
                          onChange={this.handleChangeInput}
                        />
                        <label
                          style={{
                            width: "100%",
                            marginBottom: "0px",
                            fontWeight: "normal",
                          }}
                          htmlFor="group_type_list_customer"
                        >
                          Theo danh sách
                        </label>
                      </div>
                    </div>
                  </div>
                  {this.state.group_type == Types.GROUP_TYPE_LIST_CUSTOMER ? (
                    <ListCustomerInGroup
                      store_code={store_code}
                      listCustomers={this.state.listCustomers}
                      setListCustomers={this.setListCustomers}
                    ></ListCustomerInGroup>
                  ) : (
                    <>
                      <div class="form-group-customer-condition">
                        <p>Thiết lập điều kiện thêm khách hàng vào nhóm:</p>
                        <div className="conditionGroup__main">
                          <ConditionGroupCustomer
                            conditionItems={this.state.conditionItems}
                            province={province}
                            types={types}
                            handleChangeInput={this.handleChangeInput}
                            handleRemoveConditionGroupCustomer={
                              this.handleRemoveConditionGroupCustomer
                            }
                          ></ConditionGroupCustomer>
                        </div>
                      </div>
                      <div
                        className="form-group-customer-addCondition"
                        onClick={this.handleAddConditionGroupCustomer}
                      >
                        <span>
                          <i className="fas fa-plus"></i>
                        </span>
                        <span>Thêm điều kiện</span>
                      </div>
                    </>
                  )}

                  {this.state.errors !== null && (
                    <div className="form-group-customer-error">
                      <h4>Lưu ý:</h4>
                      {this.state.errors.nameGroupCustomer && (
                        <p>- {this.state.errors.nameGroupCustomer.message}</p>
                      )}
                      {this.state.errors.noteGroupCustomer && (
                        <p>- {this.state.errors.noteGroupCustomer.message}</p>
                      )}
                      {this.state.errors.conditionItems &&
                      this.state.group_type !=
                        Types.GROUP_TYPE_LIST_CUSTOMER ? (
                        <p>- {this.state.errors.conditionItems.message}</p>
                      ) : null}
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.handleCloseModalAddGroupCustomer}
              >
                Đóng
              </button>
              {idGroupCustomer === null ? (
                <button
                  type="submit"
                  style={{
                    backgroundColor: themeData().backgroundColor,
                    width: "100px",
                  }}
                  onClick={this.handleAddGroupCustomer}
                  className="btn btn-info"
                >
                  Tạo
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ backgroundColor: themeData().backgroundColor }}
                  onClick={this.handleUpdateGroupCustomer}
                  className="btn btn-info"
                >
                  Cập nhật
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalAddGroupCustomerStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    groupCustomerById:
      state.groupCustomerReducers.group_customer.groupCustomerById,
    types: state.agencyReducers.agency.allAgencyType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createGroupCustomer: (store_code, data) => {
      dispatch(groupCustomerAction.createGroupCustomer(store_code, data));
    },
    updateGroupCustomer: (store_code, idGroupCustomer, data, params) => {
      dispatch(
        groupCustomerAction.updateGroupCustomer(
          store_code,
          idGroupCustomer,
          data,
          params
        )
      );
    },
    fetchGroupCustomerById: (store_code, idGroupCustomer) => {
      dispatch(
        groupCustomerAction.fetchGroupCustomerById(store_code, idGroupCustomer)
      );
    },
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalActionChangeGroupCustomer);
