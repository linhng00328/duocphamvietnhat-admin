import { Component } from "react";
import styled from "styled-components";
import * as Types from "../../constants/ActionType";
import { expressions } from "../../ultis/groupCustomer/expressions";
import { genders } from "../../ultis/groupCustomer/genders";
import moment from "moment";

const ConditionFilterCustomerStyles = styled.div`
  display: flex;
  column-gap: 20px;
  max-height: 38px;

  .sidebar__conditions__dropdown__expression {
    height: 100%;
    width: 80px;
    flex-shrink: 0;
    select {
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      width: 100%;
      outline: none;
      height: 38px;
      cursor: pointer;
    }
  }
  .sidebar__conditions__dropdown__value {
    width: 180px;
    & > div {
      display: flex;
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      height: 38px;

      input {
        width: 100%;
        text-align: right;
      }
      .sidebar__conditions__dropdown__input__number,
      .sidebar__conditions__dropdown__date {
        text-align: left;
      }
      .sidebar__conditions__dropdown__collab {
        background-color: transparent;
        text-align: left;
      }
    }
    select {
      width: 100%;
      border: 1px solid transparent;
      border-bottom-color: #d1d3e2;
      padding: 0.375rem 0.75rem;
      height: 38px;
      outline: none;
    }
  }
`;

class ConditionFilterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { types, indexOption, province, optionsFilter } = this.props;

    return (
      <ConditionFilterCustomerStyles className="sidebar__conditions__dropdown__content">
        <div className="sidebar__conditions__dropdown__expression">
          <select
            className="sidebar__conditions__dropdown__select"
            name="comparison_expression"
            onChange={(e) =>
              this.props.handleChangeInputFilterSearch(e, indexOption)
            }
            value={optionsFilter[indexOption].comparison_expression}
            disabled={
              Number(optionsFilter[indexOption].type_compare) ===
                Types.TYPE_COMPARE_SEX ||
              Number(optionsFilter[indexOption].type_compare) ===
                Types.TYPE_COMPARE_PROVINCE ||
              Number(optionsFilter[indexOption].type_compare) ===
                Types.TYPE_COMPARE_CTV ||
              Number(optionsFilter[indexOption].type_compare) ===
                Types.TYPE_COMPARE_CUSTOMER_NORMAL ||
              Number(optionsFilter[indexOption].type_compare) ===
                Types.TYPE_COMPARE_AGENCY
            }
            style={{
              opacity:
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_SEX ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_PROVINCE ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_CTV ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_CUSTOMER_NORMAL ||
                Number(optionsFilter[indexOption].type_compare) ===
                  Types.TYPE_COMPARE_AGENCY
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
        <div className="sidebar__conditions__dropdown__value">
          {Number(optionsFilter[indexOption].type_compare) <
          Types.TYPE_COMPARE_MONTH_BIRTH ? (
            <div>
              <input
                type="text"
                className="sidebar__conditions__dropdown__input"
                autoComplete="off"
                value={optionsFilter[indexOption].value_compare}
                onChange={(e) =>
                  this.props.handleChangeInputFilterSearch(e, indexOption)
                }
                name="value_compare"
              />
              {Number(optionsFilter[indexOption].type_compare) <
                Types.TYPE_COMPARE_POINT && <span>đ</span>}
            </div>
          ) : Number(optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_MONTH_BIRTH ? (
            <select
              className="sidebar__conditions__dropdown__select"
              name="value_compare"
              value={optionsFilter[indexOption].value_compare}
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              {Array(12)
                .fill()
                .map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          ) : Number(this.props.optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_AGE ? (
            <div>
              <input
                type="number"
                className="sidebar__conditions__dropdown__input sidebar__conditions__dropdown__input__number"
                min="1"
                max="99"
                autoComplete="off"
                value={optionsFilter[indexOption].value_compare}
                onChange={(e) =>
                  this.props.handleChangeInputFilterSearch(e, indexOption)
                }
                name="value_compare"
              />
            </div>
          ) : Number(optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_SEX ? (
            <select
              className="sidebar__conditions__dropdown__select"
              name="value_compare"
              value={optionsFilter[indexOption].value_compare}
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              {genders.length > 0 &&
                genders.map((gender) => (
                  <option key={gender.id} value={gender.value}>
                    {gender.type}
                  </option>
                ))}
            </select>
          ) : Number(optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_PROVINCE ? (
            <select
              className="sidebar__conditions__dropdown__select"
              value={optionsFilter[indexOption].value_compare}
              name="value_compare"
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              {province.length > 0 &&
                province.map((province, index) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
            </select>
          ) : Number(optionsFilter[indexOption].type_compare) ===
            Types.TYPE_COMPARE_DATE_REG ? (
            <div>
              <input
                type="date"
                className="sidebar__conditions__dropdown__input sidebar__conditions__dropdown__date"
                autoComplete="off"
                value={optionsFilter[indexOption].value_compare}
                onChange={(e) =>
                  this.props.handleChangeInputFilterSearch(e, indexOption)
                }
                name="value_compare"
                max={moment().format("YYYY-MM-DD")}
              />
            </div>
          ) : Number(optionsFilter[indexOption].type_compare) ===
              Types.TYPE_COMPARE_CTV ||
            Number(optionsFilter[indexOption].type_compare) ===
              Types.TYPE_COMPARE_CUSTOMER_NORMAL ? (
            <div>
              <input
                type="text"
                className="sidebar__conditions__dropdown__input sidebar__conditions__dropdown__collab"
                autoComplete="off"
                value="Tất cả"
                disabled
                onChange={(e) =>
                  this.props.handleChangeInputFilterSearch(e, indexOption)
                }
                name="value_compare"
              />
            </div>
          ) : (
            <select
              className="sidebar__conditions__dropdown__select"
              value={optionsFilter[indexOption].value_compare}
              name="value_compare"
              onChange={(e) =>
                this.props.handleChangeInputFilterSearch(e, indexOption)
              }
            >
              <option value="-1" disabled>
                Chọn cấp đại lý
              </option>
              <option value="0">Tất cả</option>
              {types.length > 0 &&
                types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
          )}
        </div>
      </ConditionFilterCustomerStyles>
    );
  }
}

export default ConditionFilterCustomer;
