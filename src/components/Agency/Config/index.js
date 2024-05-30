import React, { Component } from "react";
import * as AgencyAction from "../../../actions/agency";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber } from "../../../ultis/helpers";
import * as Types from "../../../constants/ActionType";
import styled from "styled-components";
import ModalHistoryChangeLevelAgency from "./ModalHistoryChangeLevelAgency";
const AgencyStyles = styled.div`
  .bonusTypeForAgency_note {
    position: relative;
    &:hover {
      .bonusTypeForAgency_noteTooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .bonusTypeForAgency_noteIcon {
      text-decoration: underline;
      color: #3498db;
      margin-left: 10px;
      cursor: pointer;
    }
    .bonusTypeForAgency_noteTooltip {
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
  .bonusTypeForAgency {
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
    margin-bottom: 0;
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
  .agency-note {
    ul {
      list-style: disc;
      padding-left: 15px;
      margin-bottom: 5px;
    }
    p {
      color: #bb1f25;
      display: flex;
      column-gap: 10px;
      font-style: italic;
    }
  }
`;
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      steps: [],
      allow_payment_request: false,
      payment_1_of_month: false,
      payment_16_of_month: false,
      payment_limit: "",
      percent_agency_t1: "",
      bonus_type_for_ctv_t2: 0,
      allow_rose_referral_customer: false,
      auto_set_level_agency: false,
      auto_set_type_period: 0,
      showModalHistoryChangeLevel: false,
    };
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchAgencyConf(store_code);
    // this.props.fetchAllSteps(store_code);
  }
  componentWillUnmount() {
    const { resetFetchAgencyConfig } = this.props;

    resetFetchAgencyConfig();
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (name == "percent_agency_t1") {
      if (value <= 100) {
        if (value == "") {
          this.setState({ [name]: "" });
        } else {
          this.setState({ [name]: value });
        }
      } else {
        this.setState({ [name]: 100 });
      }
    } else if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      value = value.toString().replace(/\./g, ",");

      if (target.value == "") {
        this.setState({ [name]: "" });
      } else {
        this.setState({ [name]: value });
      }
    }
  };

  onChangeSelect = (e) => {
    var name = e.target.name;
    var checked = e.target.checked;
    this.setState({
      [name]: checked,
    });
  };
  setBonusTypeForAgencyT2 = (bonusType) => {
    this.setState({ bonus_type_for_ctv_t2: bonusType });
  };
  handleDelCallBack = (e, id) => {
    this.props.handleDelCallBack({ title: "Mức", id: id });
    e.preventDefault();
  };

  handleEditCallBack = (e, id, limit, bonus) => {
    this.props.handleEditCallBack({ id: id, limit: limit, bonus: bonus });
    e.preventDefault();
  };
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.config, this.props.config) ||
      this.state.id == null ||
      nextProps.tabId != this.props.tabId
    ) {
      var config = nextProps.config;
      this.setState({
        id: config.id,
        allow_payment_request: config.allow_payment_request,
        payment_1_of_month: config.payment_1_of_month,
        payment_16_of_month: config.payment_16_of_month,
        bonus_type_for_ctv_t2: config.bonus_type_for_ctv_t2,
        payment_limit:
          config.payment_limit == null
            ? null
            : new Intl.NumberFormat().format(config.payment_limit.toString()),
        percent_agency_t1:
          config.percent_agency_t1 == null ? null : config.percent_agency_t1,
        allow_rose_referral_customer: config.allow_rose_referral_customer,
        auto_set_level_agency: config.auto_set_level_agency,
        auto_set_type_period: config.auto_set_type_period,
      });
    }
    if (
      !shallowEqual(nextProps.steps, this.props.steps) ||
      this.state.id == null ||
      nextProps.tabId != this.props.tabId
    ) {
      this.setState({
        steps: nextProps.steps,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(
        this.state.auto_set_level_agency,
        nextState.auto_set_level_agency
      )
    ) {
      this.props.setIsAutoSetLevelAgency(nextState.auto_set_level_agency);
    }
    return true;
  }
  setShowModalHistoryChangeLevel = (isShowed) => {
    this.setState({
      showModalHistoryChangeLevel: isShowed,
    });
  };

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
                class="btn btn-outline-warning btn-sm"
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
                class={`btn btn-outline-danger btn-sm `}
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
    var {
      allow_payment_request,
      payment_1_of_month,
      payment_16_of_month,
      payment_limit,
      percent_agency_t1,
      bonus_type_for_ctv_t2,
      allow_rose_referral_customer,
      auto_set_level_agency,
      auto_set_type_period,
    } = this.state;
    window.$(".modal").modal("hide");
    this.props.updateConfig(this.props.store_code, {
      allow_payment_request,
      payment_1_of_month,
      payment_16_of_month,
      payment_limit:
        payment_limit == null ? payment_limit : formatNumber(payment_limit),
      allow_rose_referral_customer,
      bonus_type_for_ctv_t2: Number(bonus_type_for_ctv_t2),
      percent_agency_t1,
      auto_set_level_agency: auto_set_level_agency,
      auto_set_type_period: auto_set_type_period,
    });
  };
  render() {
    var {
      steps,
      payment_16_of_month,
      payment_limit,
      payment_1_of_month,
      allow_payment_request,
      percent_agency_t1,
      bonus_type_for_ctv_t2,
      allow_rose_referral_customer,
      auto_set_level_agency,
      auto_set_type_period,
      showModalHistoryChangeLevel,
    } = this.state;
    return (
      <AgencyStyles className="agency-config">
        {/* <h6
          style={{
            marginTop: "25px",
          }}
          className="font-weight-bold text-primary"
        >
          Cấu hình hoa hồng
        </h6> */}
        <form
          onSubmit={this.onSave}
          role="form"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <div>
            <div
              className="form-group"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                }}
              >
                <span>
                  Tự động cập nhật cấp đại lý theo doanh số và hoa hồng
                </span>
                <label
                  className="status-product"
                  onClick={this.handleChangeStatusProduct}
                >
                  <input
                    type="checkbox"
                    hidden
                    name="auto_set_level_agency"
                    value={auto_set_level_agency}
                    checked={auto_set_level_agency}
                    onChange={this.onChangeSelect}
                  />
                  <div></div>
                </label>
              </div>
            </div>
            {auto_set_level_agency == true && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    columnGap: "10px",
                    alignItems: "center",
                  }}
                >
                  <span>Kỳ đặt lại</span>
                  <select
                    value={auto_set_type_period}
                    name="auto_set_type_period"
                    id="input"
                    class="form-control"
                    required="required"
                    onChange={this.onChange}
                    style={{
                      width: "150px",
                    }}
                  >
                    <option value="0">Theo tháng</option>
                    <option value="1">Theo tuần</option>
                    <option value="2">Theo quý</option>
                    <option value="3">Theo năm</option>
                  </select>
                </div>
              </div>
            )}
            {auto_set_level_agency == true && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <div
                  className="btn btn-outline-primary"
                  onClick={() => this.setShowModalHistoryChangeLevel(true)}
                >
                  Lịch sử thay đổi cấp đại lý
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  name="allow_rose_referral_customer"
                  onChange={this.onChangeSelect}
                  checked={allow_rose_referral_customer}
                />
                <label class="form-check-label" for="gridCheck">
                  Cho phép hưởng hoa hồng từ khách hàng giới thiệu
                </label>
              </div>
            </div>
            <div className="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="allow_payment_request"
                  onChange={this.onChangeSelect}
                  id="gridCheck"
                  checked={allow_payment_request}
                />
                <label class="form-check-label" for="gridCheck">
                  Cho phép gửi yêu cầu thanh toán
                </label>
              </div>
            </div>
            <div className="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  name="payment_1_of_month"
                  onChange={this.onChangeSelect}
                  checked={payment_1_of_month}
                />
                <label class="form-check-label" for="gridCheck">
                  Cho phép quyết toán ngày 1 hàng tháng
                </label>
              </div>
            </div>
            <div className="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  name="payment_16_of_month"
                  onChange={this.onChangeSelect}
                  checked={payment_16_of_month}
                />
                <label class="form-check-label" for="gridCheck">
                  Cho phép quyết toán ngày 16 hàng tháng
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Số tiền hoa hồng đủ để quyết toán</label>

              <input
                type="text"
                class="form-control"
                name="payment_limit"
                onChange={this.onChange}
                value={payment_limit}
                style={{ maxWidth: "40%" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                Đại lý nhận % chiết khấu nhập hàng theo từng nhóm đại lý
              </label>

              <div className="agency-note">
                Đại lý nhập hàng, VD: Đại lý cấp 1 (40%), Đại lý cấp 2 (35%),
                Đại lý cấp N...
              </div>
            </div>{" "}
            <div className="form-group">
              <label htmlFor="name">
                Đại lý nhận % hoa hồng trực tiếp qua 2 hình thức:
              </label>

              <div className="agency-note">
                <ul>
                  <li>Dropship (Đặt hộ): Đại lý đặt hàng hộ khách hàng</li>
                  <li>
                    Affiliate: Đại lý giới thiệu khách hàng mua hàng qua link
                    hoặc mã số giới thiệu (ưu tiên)
                  </li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">
                Đại lý giới thiệu CTV sẽ nhận được % hoa hồng gián tiếp qua 3
                hình thức sau:
              </label>

              <div className="agency-note">
                <ul>
                  <li>TH1: CTV đặt hàng hộ khách hàng</li>
                  <li>TH2: CTV nhập hàng</li>
                  <li>
                    TH3: CTV giới thiệu khách hàng mua hàng qua link hoặc mã số
                    giới thiệu (ưu tiên)
                  </li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">
                Phần trăm hoa hồng đại lí giới thiệu CTV{" "}
              </label>
              <div className="bonusTypeForAgency">
                <input
                  type="text"
                  class="form-control"
                  name="percent_agency_t1"
                  onChange={this.onChange}
                  value={percent_agency_t1}
                  style={{ width: "100px" }}
                />
                <div className="bonusTypeBtn">
                  <div>
                    <input
                      type="radio"
                      name="bonus_type_for_ctv_t2"
                      value={0}
                      id="bonus_type_for_ctv_t2_option1"
                      checked={bonus_type_for_ctv_t2 == 0}
                      onChange={(e) =>
                        this.setBonusTypeForAgencyT2(e.target.value)
                      }
                    />{" "}
                    <label htmlFor="bonus_type_for_ctv_t2_option1">
                      trên tổng đơn hàng phát sinh từ CTV
                    </label>
                    <span className="bonusTypeForAgency_note">
                      <span className="bonusTypeForAgency_noteIcon">?</span>
                      <div className="bonusTypeForAgency_noteTooltip">
                        Nhận phần trăm từ tổng đơn hàng, ví dụ đơn hàng tổng
                        100.000đ bạn nhập 10% thì Đại lý giới thiệu nhận được
                        10.000đ
                      </div>
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="bonus_type_for_ctv_t2"
                      value={1}
                      id="bonus_type_for_ctv_t2_option2"
                      onChange={(e) =>
                        this.setBonusTypeForAgencyT2(e.target.value)
                      }
                      checked={bonus_type_for_ctv_t2 == 1}
                    />{" "}
                    <label htmlFor="bonus_type_for_ctv_t2_option2">
                      trên hoa hồng trực tiếp của đại lí bán hàng affilate hoặc
                      dropship ( hoa hồng các cấp cấu hình đại lí tương ứng)
                    </label>
                    <span className="bonusTypeForAgency_note">
                      <span className="bonusTypeForAgency_noteIcon">?</span>
                      <div className="bonusTypeForAgency_noteTooltip">
                        Nhận phần trăm hoa hồng từ chính Đại lý được hưởng(phần
                        tiền này sẽ được tính tọa dựa trên số % hoa hồng của đại
                        lý từng sản phẩm cộng lại theo cấu hình cấp đại lý), ví
                        dụ hóa đơn Đại lý nhận được 100.000đ hoa hồng bạn nhập ô
                        này 10% thì Đại lý nhận được 10.000đ
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" class={`btn btn-primary btn-sm `}>
                <i class="fa fa-save"></i> Lưu
              </button>
            </div>
          </div>
        </form>
        {showModalHistoryChangeLevel ? (
          <ModalHistoryChangeLevelAgency
            store_code={this.props.store_code}
            showModalHistoryChangeLevel={showModalHistoryChangeLevel}
            setShowModalHistoryChangeLevel={this.setShowModalHistoryChangeLevel}
          />
        ) : null}
      </AgencyStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    steps: state.agencyReducers.agency.allStep,
    config: state.agencyReducers.agency.config,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateConfig: (store_code, data) => {
      dispatch(AgencyAction.updateConfig(store_code, data));
    },
    fetchAgencyConf: (store_code) => {
      dispatch(AgencyAction.fetchAgencyConf(store_code));
    },
    fetchAllSteps: (store_code) => {
      dispatch(AgencyAction.fetchAllSteps(store_code));
    },
    resetFetchAgencyConfig: () => {
      dispatch({
        type: Types.FETCH_ALL_AGENCY_CONFIG,
        data: {},
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Config);
