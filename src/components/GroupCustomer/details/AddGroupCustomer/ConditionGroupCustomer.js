import { PureComponent } from "react";
import styled from "styled-components";
import { expressions } from "../../../../ultis/groupCustomer/expressions";
import { genders } from "../../../../ultis/groupCustomer/genders";
import { options } from "../../../../ultis/groupCustomer/options";
import * as Types from "../../../../constants/ActionType";

const ConditionGroupCustomerStyles = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  input,
  select {
    background-color: white;
  }
  .form-condition-type {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-condition-expression {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .form-condition-select {
      width: 100%;
      padding: 10px 0;
      border: transparent;
      border-bottom: 1px solid #dadae1;
      background-color: white;
      outline: none;
    }
  }
  .form-condition-value {
    width: 30%;
    display: flex;
    & > div {
      max-height: 41px;
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dadae1;
      input {
        width: 100%;
        height: 100%;
        padding: 10px 0;
        border: transparent;
        text-align: right;
      }
      .form-group-input-number {
        text-align: left;
      }
    }
    .form-condition-select {
      height: 41px;
    }
  }
  .form-condition-deleteBtn {
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 8px;
    width: 18px;
    color: #a1a09e;
    transition: 0.3s all;
    cursor: pointer;
    &:hover {
      color: #7f8c8d;
      transform: scale(1.2);
    }
  }
  .form-condition-required {
    color: rgb(193, 32, 38);
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 8px;
    width: 18px;
  }
  .form-condition-select {
    width: 100%;
    padding: 10px 0;
    border: transparent;
    border-bottom: 1px solid #dadae1;
    outline: none;
    height: 100%;
  }
`;

class ConditionGroupCustomer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.conditionItems.map((item, index) => (
      <ConditionGroupCustomerStyles className="form-condition" key={index}>
        <div className="form-condition-type">
          <select
            className="form-condition-select"
            name="typeCompareGroupCustomer"
            value={this.props.conditionItems[index].typeCompareGroupCustomer}
            onChange={(e) => this.props.handleChangeInput(e, index)}
          >
            {options.length > 0 &&
              options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
          </select>
        </div>
        <div className="form-condition-expression">
          <select
            className="form-condition-select"
            name="comparisonExpressionGroupCustomer"
            onChange={(e) => this.props.handleChangeInput(e, index)}
            value={
              this.props.conditionItems[index].comparisonExpressionGroupCustomer
            }
            disabled={
              Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) === Types.TYPE_COMPARE_SEX ||
              Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) === Types.TYPE_COMPARE_PROVINCE ||
              Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) === Types.TYPE_COMPARE_CTV ||
              Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) === Types.TYPE_COMPARE_CUSTOMER_NORMAL ||
              Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) === Types.TYPE_COMPARE_AGENCY
            }
            style={{
              opacity:
                Number(
                  this.props.conditionItems[index].typeCompareGroupCustomer
                ) === Types.TYPE_COMPARE_SEX ||
                Number(
                  this.props.conditionItems[index].typeCompareGroupCustomer
                ) === Types.TYPE_COMPARE_PROVINCE ||
                Number(
                  this.props.conditionItems[index].typeCompareGroupCustomer
                ) === Types.TYPE_COMPARE_CTV ||
                Number(
                  this.props.conditionItems[index].typeCompareGroupCustomer
                ) === Types.TYPE_COMPARE_CUSTOMER_NORMAL ||
                Number(
                  this.props.conditionItems[index].typeCompareGroupCustomer
                ) === Types.TYPE_COMPARE_AGENCY
                  ? "0.6"
                  : "1",
            }}
          >
            {expressions.length > 0 &&
              expressions.map((expression) => (
                <option key={expression.id} value={expression.value}>
                  {expression.value}
                </option>
              ))}
          </select>
        </div>
        <div className="form-condition-value">
          {Number(this.props.conditionItems[index].typeCompareGroupCustomer) <
          Types.TYPE_COMPARE_MONTH_BIRTH ? (
            <div>
              <input
                type="text"
                className="form-group-input"
                autoComplete="off"
                value={
                  this.props.conditionItems[index].valueCompareGroupCustomer
                }
                onChange={(e) => this.props.handleChangeInput(e, index)}
                name="valueCompareGroupCustomer"
              />
              {Number(
                this.props.conditionItems[index].typeCompareGroupCustomer
              ) < Types.TYPE_COMPARE_POINT && <span>đ</span>}
            </div>
          ) : Number(
              this.props.conditionItems[index].typeCompareGroupCustomer
            ) === Types.TYPE_COMPARE_MONTH_BIRTH ? (
            <select
              className="form-condition-select"
              name="valueCompareGroupCustomer"
              value={this.props.conditionItems[index].valueCompareGroupCustomer}
              onChange={(e) => this.props.handleChangeInput(e, index)}
            >
              {Array(12)
                .fill()
                .map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          ) : Number(
              this.props.conditionItems[index].typeCompareGroupCustomer
            ) === Types.TYPE_COMPARE_AGE ? (
            <div>
              <input
                type="number"
                className="form-group-input form-group-input-number"
                min="1"
                max="99"
                autoComplete="off"
                value={
                  this.props.conditionItems[index].valueCompareGroupCustomer
                }
                onChange={(e) => this.props.handleChangeInput(e, index)}
                name="valueCompareGroupCustomer"
              />
            </div>
          ) : Number(
              this.props.conditionItems[index].typeCompareGroupCustomer
            ) === Types.TYPE_COMPARE_SEX ? (
            <select
              className="form-condition-select"
              name="valueCompareGroupCustomer"
              value={this.props.conditionItems[index].valueCompareGroupCustomer}
              onChange={(e) => this.props.handleChangeInput(e, index)}
            >
              {genders.length > 0 &&
                genders.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.type}
                  </option>
                ))}
            </select>
          ) : Number(
              this.props.conditionItems[index].typeCompareGroupCustomer
            ) === Types.TYPE_COMPARE_PROVINCE ? (
            <select
              className="form-condition-select"
              value={this.props.conditionItems[index].valueCompareGroupCustomer}
              name="valueCompareGroupCustomer"
              onChange={(e) => this.props.handleChangeInput(e, index)}
            >
              {this.props.province.length > 0 &&
                this.props.province.map((province, index) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
            </select>
          ) : Number(
              this.props.conditionItems[index].typeCompareGroupCustomer
            ) === Types.TYPE_COMPARE_DATE_REG ? (
            <div>
              <input
                type="date"
                className="form-group-input form-group-input-number"
                autoComplete="off"
                value={
                  this.props.conditionItems[index].valueCompareGroupCustomer
                }
                onChange={(e) => this.props.handleChangeInput(e, index)}
                name="valueCompareGroupCustomer"
              />
            </div>
          ) : (Number(
            this.props.conditionItems[index].typeCompareGroupCustomer
          ) === Types.TYPE_COMPARE_CTV  || Number(
            this.props.conditionItems[index].typeCompareGroupCustomer
          ) === Types.TYPE_COMPARE_CUSTOMER_NORMAL ) ? (
            <div>
              <input
                type="text"
                className="form-group-input form-group-input-number"
                autoComplete="off"
                value="All"
                disabled
                onChange={(e) => this.props.handleChangeInput(e, index)}
                name="valueCompareGroupCustomer"
              />
            </div>
          ) : (
            <select
              className="form-condition-select"
              value={this.props.conditionItems[index].valueCompareGroupCustomer}
              name="valueCompareGroupCustomer"
              onChange={(e) => this.props.handleChangeInput(e, index)}
            >
              <option value="-1" disabled>
                Chọn cấp đại lý
              </option>
              <option value="0">Tất cả</option>
              {this.props.types.length > 0 &&
                this.props.types.map((type, index) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
          )}

          {index > 0 ? (
            <span
              className="form-condition-deleteBtn"
              onClick={() =>
                this.props.handleRemoveConditionGroupCustomer(index)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          ) : (
            <span className="form-condition-required">*</span>
          )}
        </div>
      </ConditionGroupCustomerStyles>
    ));
  }
}
export default ConditionGroupCustomer;
