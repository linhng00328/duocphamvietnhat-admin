import React, { Component } from "react";
import * as CollaboratorAction from "../../../actions/collaborator";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber, formatNoD } from "../../../ultis/helpers";
import styled from "styled-components";

const CollaboratorStyles = styled.div`
  .bonusTypeForCTV_note {
    position: relative;
    &:hover {
      .bonusTypeForCTV_noteTooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .bonusTypeForCTV_noteIcon {
      text-decoration: underline;
      color: #3498db;
      margin-left: 10px;
      cursor: pointer;
    }
    .bonusTypeForCTV_noteTooltip {
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
  .bonusTypeForCTV {
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
  .ctv-note {
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
      percent_collaborator_t1: "",
      allow_rose_referral_customer: false,
      setting_for_all_products: false,
      percent_commission_for_products: "",
      bonus_type_for_ctv_t2: 0,
      type_rose: 0,
    };
  }

  componentDidMount() {
    var { store_code } = this.props;
    this.props.fetchCollaboratorConf(store_code);
    this.props.fetchAllSteps(store_code);
  }
  setBonusTypeForCTVT2 = (bonusType) => {
    this.setState({ bonus_type_for_ctv_t2: bonusType });
  };
  setTypeRose = (type_rose) => {
    this.setState({ type_rose: type_rose });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    const _value = formatNumber(value);
    if (
      name == "percent_collaborator_t1" ||
      name == "percent_commission_for_products"
    ) {
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
      value = formatNoD(_value);
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
        type_rose: config.type_rose,
        payment_limit:
          config.payment_limit == null
            ? null
            : new Intl.NumberFormat().format(config.payment_limit.toString()),
        percent_collaborator_t1:
          config.percent_collaborator_t1 == null
            ? null
            : config.percent_collaborator_t1,
        setting_for_all_products: config.setting_for_all_products,
        percent_commission_for_products: config.percent_commission_for_products,
        allow_rose_referral_customer: config.allow_rose_referral_customer,
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
    var {
      setting_for_all_products,
      allow_payment_request,
      allow_rose_referral_customer,
      payment_1_of_month,
      payment_16_of_month,
      payment_limit,
      percent_collaborator_t1,
      bonus_type_for_ctv_t2,
      type_rose,
      percent_commission_for_products,
    } = this.state;
    window.$(".modal").modal("hide");
    this.props.updateConfig(this.props.store_code, {
      bonus_type_for_ctv_t2: Number(bonus_type_for_ctv_t2),
      allow_payment_request,
      payment_1_of_month,
      payment_16_of_month,
      type_rose,
      payment_limit:
        payment_limit == null ? payment_limit : formatNumber(payment_limit),
      percent_collaborator_t1,
      allow_rose_referral_customer,
      // setting_for_all_products,
      // percent_commission_for_products : percent_commission_for_products ? formatNumber(percent_commission_for_products) : null
    });
  };
  render() {
    var {
      allow_rose_referral_customer,
      steps,
      payment_16_of_month,
      payment_limit,
      payment_1_of_month,
      allow_payment_request,
      percent_collaborator_t1,
      bonus_type_for_ctv_t2,
      type_rose,
      percent_commission_for_products,
      setting_for_all_products,
    } = this.state;
    return (
      <CollaboratorStyles className="collaborator-config">
        <form onSubmit={this.onSave} role="form">
          <div className="form-group">
            <label htmlFor="name">
              Cách tính thưởng cộng tác viên theo doanh số
            </label>
            <p>
              <i>
                ( Là phần thưởng dành cho CTV khi chinh phục được các mức doanh
                số )
              </i>
            </p>
          </div>

          <div className="bonusTypeBtn">
            <div>
              <input
                type="radio"
                name="type_rose_op1"
                value={0}
                id="type_rose_op1"
                checked={type_rose == 0}
                onChange={(e) => this.setTypeRose(e.target.value)}
              />{" "}
              <label htmlFor="type_rose_op1">Thưởng theo doanh số</label>
            </div>
            <div>
              <input
                type="radio"
                name="type_rose_op2"
                value={1}
                id="type_rose_op2"
                onChange={(e) => this.setTypeRose(e.target.value)}
                checked={type_rose == 1}
              />{" "}
              <label htmlFor="type_rose_op2">Thưởng theo hoa hồng</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Thông tin cấu hình</label>

            <div class="table-responsive col-7">
              <table class="table table-border table-hover">
                <thead className="thead-quantity">
                  <tr>
                    <th>STT</th>
                    <th>{type_rose == 0 ? "Mức doanh số" : "Mức hoa hồng"}</th>
                    <th>Thưởng</th>
                    <th>
                      <button
                        type="button"
                        style={{ marginLeft: "10px", float: "right" }}
                        data-toggle="modal"
                        data-target="#createModal"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fa fa-plus"></i> Thêm
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.showAllStep(steps)}</tbody>
              </table>
            </div>
          </div>

          <div class="form-group">
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

          <div class="form-group">
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
          <div class="form-group">
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
          <div class="form-group">
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
              CTV nhận % hoa hồng trực tiếp qua 3 hình thức:
            </label>

            <div className="ctv-note">
              <ul>
                <li>Dropship (Đặt hộ): CTV đặt hàng hộ khách hàng</li>
                <li>CTV nhập hàng</li>
                <li>
                  Affiliate: CTV giới thiệu khách hàng mua hàng qua link hoặc mã
                  số giới thiệu (ưu tiên)
                </li>
              </ul>
              <p>
                <span>*</span>% hoa hồng trực tiếp mà CTV được nhận sẽ được cài
                trong phần sản phẩm
              </p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              CTV1 giới thiệu CTV2 sẽ nhận được hoa hồng gián tiếp qua 3 hình
              thức sau:
            </label>

            <div className="ctv-note">
              <ul>
                <li>TH1: CTV2 đặt hàng hộ khách hàng</li>
                <li>TH2: CTV2 nhập hàng</li>
                <li>
                  TH3: CTV2 giới thiệu khách hàng mua hàng qua link hoặc mã số
                  giới thiệu (ưu tiên)
                </li>
              </ul>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              Phần trăm hoa hồng cho người giới thiệu CTV mua hàng{" "}
            </label>
            <div className="bonusTypeForCTV">
              <input
                type="text"
                class="form-control"
                name="percent_collaborator_t1"
                onChange={this.onChange}
                value={percent_collaborator_t1}
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
                    onChange={(e) => this.setBonusTypeForCTVT2(e.target.value)}
                  />{" "}
                  <label htmlFor="bonus_type_for_ctv_t2_option1">
                    % hoa hồng CTV1 được nhận từ tổng tiền đơn hàng
                  </label>
                  <span className="bonusTypeForCTV_note">
                    <span className="bonusTypeForCTV_noteIcon">?</span>
                    <div className="bonusTypeForCTV_noteTooltip">
                      Nhận phần trăm từ tổng đơn hàng, ví dụ đơn hàng tổng
                      100.000đ bạn nhập 10% thì CTV T1 giới thiệu nhận được
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
                    onChange={(e) => this.setBonusTypeForCTVT2(e.target.value)}
                    checked={bonus_type_for_ctv_t2 == 1}
                  />{" "}
                  <label htmlFor="bonus_type_for_ctv_t2_option2">
                    % hoa hồng CTV1 được nhận từ số hoa hồng CTV2 được hưởng
                  </label>
                  <span className="bonusTypeForCTV_note">
                    <span className="bonusTypeForCTV_noteIcon">?</span>
                    <div className="bonusTypeForCTV_noteTooltip">
                      Nhận phần trăm hoa hồng từ chính CTV T2 được hưởng, ví dụ
                      hóa đơn CTV T2 nhận được 100.000đ hoa hồng bạn nhập ô này
                      10% thì CTV T1 nhận được 10.000đ
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="form-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="gridCheck"
                name="setting_for_all_products "
                onChange={() =>
                  this.setState({
                    setting_for_all_products: !setting_for_all_products,
                  })
                }
                checked={setting_for_all_products}
              />
              <label class="form-check-label" for="gridCheck">
                Thiết định % hoa hồng chung cho tất cả các sản phẩm
              </label>
            </div>
            {setting_for_all_products === true && (
              <input
                type="text"
                class="form-control"
                name="percent_commission_for_products"
                onChange={this.onChange}
                value={percent_commission_for_products}
                style={{ maxWidth: "40%", marginTop: "10px" }}
              />
            )}
          </div> */}

          <div className="form-group">
            <button type="submit" class={`btn btn-primary btn-sm `}>
              <i class="fa fa-save"></i> Lưu
            </button>
          </div>
        </form>
      </CollaboratorStyles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    steps: state.collaboratorReducers.collaborator.allStep,
    config: state.collaboratorReducers.collaborator.config,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateConfig: (store_code, data) => {
      dispatch(CollaboratorAction.updateConfig(store_code, data));
    },
    fetchCollaboratorConf: (store_code) => {
      dispatch(CollaboratorAction.fetchCollaboratorConf(store_code));
    },
    fetchAllSteps: (store_code) => {
      dispatch(CollaboratorAction.fetchAllSteps(store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Config);
