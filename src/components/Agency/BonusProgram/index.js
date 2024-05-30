import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import * as agencyAction from "../../../actions/agency";
import ModalCreateBonus from "./ModalCreateBonus";
import moment from "moment";
import { randomString } from "../../../ultis/helpers";
import { Link } from "react-router-dom";
import ModalRemove from "./ModalRemove";
import * as Types from "../../../constants/ActionType";
import * as ENV_default from "../../../ultis/default";
import styled from "styled-components";

const BonusProgramStyles = styled.div`
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
`;
class BonusProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_end: false,
      start_time: moment().format("DD-MM-YYYY"),
      end_time: moment().format("DD-MM-YYYY"),
      modal: {
        threshold: "",
        id: "",
        store_code: "",
      },
      steps: [],
      stepsImport: [],
      type_bonus_period_import: 0,
    };
  }

  componentDidMount() {
    this.props.getBonusAgencyConfig(this.props.store_code);
    this.props.fetchAllSteps(this.props.store_code);
    this.props.fetchAgencyConf(this.props.store_code);
    this.props.fetchAllStepsImport(this.props.store_code);
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.steps, this.props.steps)) {
      this.setState({
        steps: nextProps.steps,
      });
    }
    if (!shallowEqual(nextProps.stepsImport, this.props.stepsImport)) {
      this.setState({
        stepsImport: nextProps.stepsImport,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!shallowEqual(nextProps.config, this.props.config)) {
      this.setState({
        type_bonus_period_import: nextProps.config?.type_bonus_period_import,
      });
    }
    return true;
  }

  onChangeStatus() {
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;

    var startTime = moment(this.state.start_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(this.state.end_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    if (
      bonusAgencyConfig?.config?.end_time != null &&
      bonusAgencyConfig?.config?.start_time != null
    ) {
      startTime = moment(bonusAgencyConfig?.config.start_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      endTime = moment(bonusAgencyConfig?.config.end_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    this.props.updateBonusAgencyConfig(store_code, {
      is_end: !is_end,
      start_time: startTime,
      end_time: endTime,
    });
  }

  handleDelBonusCallBack = (e, data) => {
    this.setState({
      modal: {
        threshold: data.threshold,
        reward_name: data.reward_name,
        id: data.id,
        store_code: this.props.store_code,
      },
    });
    e.preventDefault();
  };

  handleDelCallBack = (e, id) => {
    this.props.handleDelCallBack({ title: "Mức", id: id });
    e.preventDefault();
  };

  handleEditCallBack = (e, id, limit, bonus) => {
    this.props.handleEditCallBack({ id: id, limit: limit, bonus: bonus });
    e.preventDefault();
  };
  handleDelCallBackImport = (e, id) => {
    this.props.handleDelCallBackImport({ title: "Mức", id: id });
    e.preventDefault();
  };

  handleEditCallBackImport = (e, id, limit, bonus) => {
    this.props.handleEditCallBackImport({ id: id, limit: limit, bonus: bonus });
    e.preventDefault();
  };
  onChangeBonusPeriod = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onSave = (e) => {
    e.preventDefault();
    const { updateConfigImport, store_code } = this.props;
    const { type_bonus_period_import } = this.state;
    const data = {
      type_bonus_period_import: type_bonus_period_import,
    };
    updateConfigImport(store_code, data);
  };
  onChangeDatePrime = (e) => {
    try {
      var from = moment(e.value[0], "DD-MM-YYYY").format("DD-MM-YYYY");
      var to = moment(e.value[1], "DD-MM-YYYY").format("DD-MM-YYYY  ");
      this.setState({
        start_time: from,
        end_time: to,
      });
    } catch (error) {
      this.setState({
        start_time: moment().format("DD-MM-YYYY"),
        end_time: moment().format("DD-MM-YYYY"),
      });
    }
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;
    var startTime = moment(this.state.start_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    var endTime = moment(this.state.end_time, "DD-MM-YYYY HH:mm").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    var valueStartTime = startTime.valueOf();
    var valueEndTime = endTime.valueOf();
    console.log(valueEndTime, valueStartTime);
    if (valueEndTime < valueStartTime) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Thất bại ",
          disable: "show",
          content: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
        },
      });
      return;
    }

    this.props.updateBonusAgencyConfig(store_code, {
      is_end: is_end,
      start_time: startTime,
      end_time: endTime,
    });
  };
  showDataCommissionBonus = () => {
    const { steps } = this.state;
    return (
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Cách tính thưởng đại lý theo hoa hồng</label>
          <p>
            <i>
              ( Là phần thưởng dành cho đại lý khi chinh phục được các mức hoa
              hồng )
            </i>
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="name">Thông tin cấu hình</label>

          <div class="table-responsive">
            <table class="table table-border table-hover">
              <thead className="thead-quantity">
                <tr>
                  <th>STT</th>
                  <th>Mức</th>
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
              <tbody>{this.showAllStepCommission(steps)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  showAllStepCommission = (configs) => {
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
  showDataImportBonus = () => {
    const { stepsImport, type_bonus_period_import } = this.state;
    return (
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div className="form-group">
          <label htmlFor="name">
            Cách tính thưởng đại lý theo doanh số nhập hàng
          </label>
          <p>
            <i>
              ( Là phần thưởng dành cho đại lý khi chinh phục được các mức doanh
              số nhập hàng )
            </i>
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="name">Thông tin cấu hình</label>

          <div class="table-responsive">
            <table class="table table-border table-hover">
              <thead className="thead-quantity">
                <tr>
                  <th>STT</th>
                  <th>Mức</th>
                  <th>Thưởng</th>
                  <th>
                    <button
                      type="button"
                      style={{ marginLeft: "10px", float: "right" }}
                      data-toggle="modal"
                      data-target="#createModalImport"
                      class="btn btn-primary btn-sm"
                    >
                      <i class="fa fa-plus"></i> Thêm
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>{this.showAllStepImport(stepsImport)}</tbody>
            </table>
          </div>
          <form onSubmit={this.onSave}>
            <div
              className="config__item"
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div>Kỳ thưởng</div>
              <select
                value={type_bonus_period_import}
                name="type_bonus_period_import"
                id="input"
                class="form-control"
                required="required"
                onChange={this.onChangeBonusPeriod}
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
            <button
              type="submit"
              className="btn btn-primary btn-sm "
              style={{
                marginTop: "20px",
              }}
            >
              <i className="fa fa-save"></i> Lưu
            </button>
          </form>
        </div>
      </div>
    );
  };
  showAllStepImport = (configs) => {
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
                  this.handleEditCallBackImport(
                    e,
                    data.id,
                    data.limit,
                    data.bonus
                  );
                }}
                data-toggle="modal"
                data-target="#updateModalImport"
                class="btn btn-outline-warning btn-sm"
              >
                <i class="fa fa-edit"></i> Sửa
              </button>
              <button
                type="button"
                onClick={(e) => {
                  this.handleDelCallBackImport(e, data.id);
                }}
                data-toggle="modal"
                data-target="#removeModalImport"
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

  render() {
    var { bonusAgencyConfig, store_code } = this.props;
    var is_end = bonusAgencyConfig?.config?.is_end ?? true;
    var { start_time, end_time, modal } = this.state;

    if (
      bonusAgencyConfig?.config?.end_time != null &&
      bonusAgencyConfig?.config?.start_time != null
    ) {
      start_time = moment(bonusAgencyConfig?.config.start_time).format(
        "DD-MM-YYYY"
      );
      end_time = moment(bonusAgencyConfig?.config.end_time).format(
        "DD-MM-YYYY"
      );
    }

    return (
      <BonusProgramStyles id="wrapper">
        <div style={{ width: "100%" }}>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-item nav-link active"
                id="nav-order-tab"
                data-toggle="tab"
                href="#nav-order"
                role="tab"
                aria-controls="nav-order"
                aria-selected="true"
              >
                Thưởng khi lên đơn
              </a>
              <a
                class="nav-item nav-link"
                id="nav-commission-tab"
                data-toggle="tab"
                href="#nav-commission"
                role="tab"
                aria-controls="nav-commission"
                aria-selected="false"
              >
                Thưởng hoa hồng
              </a>
              <a
                class="nav-item nav-link"
                id="nav-import-tab"
                data-toggle="tab"
                href="#nav-import"
                role="tab"
                aria-controls="nav-import"
                aria-selected="false"
              >
                Thưởng doanh số nhập hàng
              </a>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-order"
              role="tabpanel"
              aria-labelledby="nav-order-tab"
            >
              <div className="card-body">
                <div
                  className="form-group"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                    }}
                  >
                    <div style={{ fontWeight: "500" }}>Hành động</div>
                    <label className="status-product">
                      <input
                        type="checkbox"
                        hidden
                        name={`${randomString(10)}`}
                        checked={!is_end}
                        onChange={(e) => this.onChangeStatus()}
                      />
                      <div></div>
                    </label>
                  </div>
                  <Link
                    to={`/agency_bonus_steps/${store_code}/create?tab-index=3`}
                    class={`btn btn-info btn-icon-split show`}
                  >
                    <span class="icon text-white-50">
                      <i style={{ marginTop: "3px" }} class="fas fa-plus"></i>
                    </span>
                    <span class="text">Thêm phần thưởng</span>
                  </Link>
                </div>

                {is_end == true ? (
                  ""
                ) : (
                  <div class="form-group">
                    <label for="">Ngày bắt đầu và kết thúc</label>

                    <div>
                      <DateRangePickerComponent
                        min={new Date()}
                        id="daterangepicker"
                        placeholder="Chọn từ ngày... đến ngày..."
                        format="dd/MM/yyyy"
                        width="100%"
                        value={start_time + " đến " + end_time}
                        onChange={this.onChangeDatePrime}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <div class="table-responsive col-12">
                    <table class="table table-border table-hover">
                      <thead className="thead-quantity">
                        <tr>
                          <th>STT</th>
                          <th style={{ textAlign: "center" }}>Hình ảnh</th>

                          <th>Tên phần thưởng</th>
                          <th>Đơn đạt tối thiểu</th>

                          <th>Giá trị thưởng</th>
                          <th>Giới hạn</th>

                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.showAllStep(bonusAgencyConfig?.step_bonus ?? [])}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-commission"
              role="tabpanel"
              aria-labelledby="nav-commission-tab"
            >
              {this.showDataCommissionBonus()}
            </div>
            <div
              class="tab-pane fade"
              id="nav-import"
              role="tabpanel"
              aria-labelledby="nav-import-tab"
            >
              {this.showDataImportBonus()}
            </div>
          </div>
        </div>
        <ModalCreateBonus store_code={store_code} />
        <ModalRemove modal={modal} store_code={this.props.store_code} />
      </BonusProgramStyles>
    );
  }

  showAllStep = (steps) => {
    var result = null;
    if (steps.length > 0) {
      result = steps.map((data, index) => {
        var threshold =
          data.threshold == null
            ? null
            : new Intl.NumberFormat().format(data.threshold.toString());
        var reward_value =
          data.reward_value == null
            ? null
            : new Intl.NumberFormat().format(data.reward_value.toString());

        var reward_name = data.reward_name;
        var reward_image_url = data.reward_image_url;
        var reward_description = data.reward_description;
        var limit =
          data.limit == null
            ? null
            : new Intl.NumberFormat().format(data.limit.toString());
        return (
          <tr>
            <td>{index + 1}</td>
            <td style={{ textAlign: "center" }}>
              <img
                src={
                  reward_image_url == null || reward_image_url == ""
                    ? ENV_default.IMG_NOT_FOUND
                    : reward_image_url
                }
                class="img-responsive"
                width="100px"
                height="115px"
                alt="Image"
              />
            </td>
            <td>{reward_name}</td>
            <td>{threshold}</td>

            <td>{reward_value}</td>
            <td>{limit}</td>

            <td>
              <Link
                to={`/agency_bonus_steps/${this.props.store_code}/update/${data.id}?tab-index=3`}
                class="btn btn-outline-warning btn-sm"
              >
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
                <span class="text">Sửa</span>
              </Link>

              <button
                type="button"
                onClick={(e) => {
                  this.handleDelBonusCallBack(e, data);
                }}
                data-toggle="modal"
                data-target="#removeFormStepBonus"
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
}

const mapStateToProps = (state) => {
  return {
    bonusAgencyConfig: state.agencyReducers.agency.bonusAgencyConfig,
    steps: state.agencyReducers.agency.allStep,
    stepsImport: state.agencyReducers.agency.allStepImport,
    config: state.agencyReducers.agency.config,
    state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    getBonusAgencyConfig: (store_code) => {
      dispatch(agencyAction.getBonusAgencyConfig(store_code));
    },
    updateBonusAgencyConfig: (store_code, form) => {
      dispatch(agencyAction.updateBonusAgencyConfig(store_code, form));
    },
    fetchAgencyConf: (store_code) => {
      dispatch(agencyAction.fetchAgencyConf(store_code));
    },
    updateConfigImport: (store_code, form) => {
      dispatch(agencyAction.updateConfigImport(store_code, form));
    },
    deleteBonusSteps: (store_code, id) => {
      dispatch(agencyAction.deleteBonusSteps(store_code, id));
    },
    fetchAllSteps: (store_code) => {
      dispatch(agencyAction.fetchAllSteps(store_code));
    },
    fetchAllStepsImport: (store_code) => {
      dispatch(agencyAction.fetchAllStepsImport(store_code));
    },
    showError: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusProgram);
