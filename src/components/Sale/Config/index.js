import React, { Component } from "react";
import * as saleAction from "../../../actions/sale";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import * as Types from "../../../constants/ActionType";
const ConfigStyles = styled.div`
  .bonusTypeForSale_note {
    position: relative;
    &:hover {
      .bonusTypeForSale_noteTooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .bonusTypeForSale_noteIcon {
      text-decoration: underline;
      color: #3498db;
      margin-left: 10px;
      cursor: pointer;
    }
    .bonusTypeForSale_noteTooltip {
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      font-weight: 400;
      width: 400px;
      padding: 10px;
      border-radius: 10px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }
  }
  .bonusTypeForSale {
    display: flex;
    align-items: center;
    column-gap: 30px;
    .bonusTypeBtn {
      & > div {
        display: flex;
        align-items: center;
        column-gap: 5px;
        label {
          margin-bottom: 0;
        }
      }
    }
  }
  .status-product {
    width: 42px;
    height: 24px;
    border-radius: 100rem;
    background-color: #ecf0f1;
    border: 1px solid #dfe6e9;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0 2px;
    cursor: pointer;
    & > div {
      width: 18px;
      height: 18px;
      border-radius: 100rem;
      background-color: #7f8c8d;
      transition: all 0.3s;
    }
    &:has(input:checked) {
      background-color: #2ecc71;
    }
    input:checked + div {
      transform: translateX(100%);
      background-color: white;
    }
  }
  .config__item {
    display: flex;
    margin-bottom: 10px;
    span {
      width: 150px;
      flex-shrink: 0;
    }
    select {
      width: auto;
    }
  }
`;
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      steps: [],
      allow_sale: false,
      type_bonus_period: 0,
    };
  }

  componentDidMount() {
    var { store_code, fetchAllSteps, fetchStaffConfig } = this.props;
    fetchStaffConfig(store_code);
    fetchAllSteps(store_code);
  }

  componentWillUnmount() {
    const { resetAllSteps, resetStaffConfig } = this.props;
    resetAllSteps();
    resetStaffConfig();
  }

  handleDelCallBack = (e, id) => {
    this.props.handleDelCallBack({ title: "Mức", id: id });
    e.preventDefault();
  };

  handleEditCallBack = (e, id, limit, bonus) => {
    this.props.handleEditCallBack({ id: id, limit: limit, bonus: bonus });
    e.preventDefault();
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { steps, config, tabId } = this.props;
    if (!shallowEqual(config, nextProps.config) || nextProps.tabId != tabId) {
      this.setState({
        allow_sale: nextProps.config.allow_sale,
        type_bonus_period: nextProps.config.type_bonus_period,
      });
    }
    if (!shallowEqual(steps, nextProps.steps) || nextProps.tabId != tabId) {
      this.setState({
        steps: nextProps.steps,
      });
    }

    return true;
  }

  showAllStep = (configs) => {
    var result = null;
    if (configs.length > 0) {
      result = configs.map((data, index) => {
        var limit =
          data.limit == null
            ? null
            : new Intl.NumberFormat().format(data.limit.toString());
        var bonus =
          data.bonus == null
            ? null
            : new Intl.NumberFormat().format(data.bonus.toString());
        return (
          <tr>
            <td>{index + 1}</td>
            <td>
              <div class="input-group">
                <input name="" value={limit} id="input" class="form-control" />
              </div>
            </td>
            <td>
              <input name="" value={bonus} id="input" class="form-control" />
            </td>
            <td style={{ display: "flex" }}>
              <button
                onClick={(e) => {
                  this.handleEditCallBack(e, data.id, data.limit, data.bonus);
                }}
                data-toggle="modal"
                data-target="#updateModal"
                class="btn btn-warning btn-sm"
              >
                <i class="fa fa-edit"></i> Sửa
              </button>
              <button
                type="button"
                onClick={(e) => {
                  this.handleDelCallBack(e, data.id);
                }}
                data-toggle="modal"
                data-target="#removeModal"
                style={{ marginLeft: "10px" }}
                class={`btn btn-danger btn-sm `}
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
  onSave = (e) => {
    e.preventDefault();
    const { allow_sale, type_bonus_period } = this.state;
    const { updateConfig, store_code } = this.props;

    const form = {
      allow_sale,
      type_bonus_period: Number(type_bonus_period),
    };
    updateConfig(store_code, form);
  };
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    this.setState({
      [name]: name === "allow_sale" ? checked : value,
    });
  };
  render() {
    var { steps, allow_sale, type_bonus_period } = this.state;
    return (
      <ConfigStyles className="collaborator-config">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label htmlFor="name">Cách tính thưởng Sale theo doanh số:</label>
            <p>
              <i>
                ( Là phần thưởng dành cho Sale khi chinh phục được các mức doanh
                số )
              </i>
            </p>
            <p>
              Doanh số sale được tính từ tổng đơn hàng không bao gồm phí ship và
              trừ chương trình khuyến mại{" "}
              <span className="bonusTypeForSale_note">
                <span className="bonusTypeForSale_noteIcon">?</span>
                <div className="bonusTypeForSale_noteTooltip">
                  Đơn hàng của đại lí là 1.000.000đ , sau khi triết khấu 50% ,
                  khuyến mại 10% , thì doanh số sale nhận được là 40% = 400.000đ
                </div>
              </span>
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="name">Thông tin cấu hình</label>

            <div class="table-responsive col-7">
              <table class="table table-border table-hover">
                <thead className="thead-quantity">
                  <tr>
                    <th>STT</th>
                    <th>Mức doanh số</th>
                    <th>Thưởng</th>
                    <th>
                      <button
                        type="button"
                        style={{ marginLeft: "10px", float: "right" }}
                        data-toggle="modal"
                        data-target="#createModal"
                        class="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> Thêm
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.showAllStep(steps)}</tbody>
              </table>
            </div>
          </div>

          {/* <div className="config__item">
            <span>Cho phép sale</span>
            <label
              className="status-product"
              onClick={this.handleChangeStatusProduct}
            >
              <input
                type="checkbox"
                hidden
                name="allow_sale"
                value={allow_sale}
                checked={allow_sale}
                onChange={this.onChange}
              />
              <div></div>
            </label>
          </div> */}
          <div className="config__item">
            <span>Kỳ thưởng</span>
            <select
              value={type_bonus_period}
              name="type_bonus_period"
              id="input"
              class="form-control"
              required="required"
              onChange={this.onChange}
            >
              <option value="0">Theo tháng</option>
              <option value="1">Theo tuần</option>
              <option value="2">Theo quý</option>
              <option value="3">Theo năm</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" class={`btn btn-primary btn-sm `}>
              <i class="fa fa-save"></i> Lưu
            </button>
          </div>
        </form>
      </ConfigStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    steps: state.saleReducers.sale.allStep,
    config: state.saleReducers.sale.config,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStaffConfig: (store_code) => {
      dispatch(saleAction.fetchStaffConfig(store_code));
    },
    fetchAllSteps: (store_code) => {
      dispatch(saleAction.fetchAllSteps(store_code));
    },
    updateConfig: (store_code, data) => {
      dispatch(saleAction.updateConfig(store_code, data));
    },
    resetAllSteps: () => {
      dispatch({ type: Types.FETCH_ALL_SALE_STEP, data: [] });
    },
    resetStaffConfig: () => {
      dispatch({ type: Types.FETCH_ALL_SALE_CONFIG, data: {} });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Config);
