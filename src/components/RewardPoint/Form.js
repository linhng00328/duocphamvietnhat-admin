import React, { Component } from "react";
import { connect } from "react-redux";
import * as rewardPointAtion from "../../actions/reward_point";
import { shallowEqual } from "../../ultis/shallowEqual";
import {
  format,
  formatNoDWithEmpty,
  formatNumber,
  removeSignNumber,
  stringToInit,
  randomString,
} from "../../ultis/helpers";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allow_use_point_order: "",
      id: "",
      is_set_order_max_point: "",
      money_a_point: "",
      order_max_point: "",
      percent_refund: "",
      point_introduce_customer: "",
      point_register_customer: "",
      point_review: "",
      store_id: "",
      ex: 1000000,
      percent_use_max_point: "",
      is_percent_use_max_point: false,
      bonus_point_bonus_product_to_agency: false,
      bonus_point_product_to_agency: false,
    };
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    if (name == "percent_refund") {
      this.setState({ [name]: value });
      return;
    }

    if (name == "percent_use_max_point") {
      if ((parseInt(value) || 0) < 100) this.setState({ [name]: value });
      else return;
    }

    const valueFormat = formatNumber(value);
    console.log(valueFormat);
    if (!isNaN(Number(valueFormat))) {
      if (name == "percent_use_max_point") {
        if (parseInt(valueFormat) < 100) {
          if (valueFormat === 0) this.setState({ [name]: "" });
          else this.setState({ [name]: valueFormat });
        }
      } else {
        if (value == "") this.setState({ [name]: "" });
        else this.setState({ [name]: valueFormat });
      }
    }
  };

  onChangeCheckBox = (e) => {
    var { value, name, checked } = e.target;
    this.setState({
      [name]: checked,
    });
  };

  componentDidMount() {
    var { rewardPoints } = this.props;
    this.setData(rewardPoints);
  }

  setData(rewardPoints) {
    this.setState({
      allow_use_point_order: rewardPoints.allow_use_point_order,
      id: rewardPoints.id,
      is_set_order_max_point: rewardPoints.is_set_order_max_point,
      money_a_point: rewardPoints.money_a_point,
      order_max_point: rewardPoints.order_max_point,
      percent_refund: rewardPoints.percent_refund,
      point_introduce_customer: rewardPoints.point_introduce_customer,
      point_register_customer: rewardPoints.point_register_customer,
      point_review: rewardPoints.point_review,
      is_percent_use_max_point: rewardPoints.is_percent_use_max_point,
      percent_use_max_point: rewardPoints.percent_use_max_point,
      bonus_point_bonus_product_to_agency:
        rewardPoints.bonus_point_bonus_product_to_agency,
      bonus_point_product_to_agency: rewardPoints.bonus_point_product_to_agency,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.rewardPoints, this.props.rewardPoints) ||
      this.state.id == ""
    ) {
      var { rewardPoints } = nextProps;

      this.setData(rewardPoints);
    }
  }

  onSave = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var {
      allow_use_point_order,
      is_set_order_max_point,
      money_a_point,
      order_max_point,
      percent_refund,
      point_introduce_customer,
      point_register_customer,
      percent_use_max_point,
      is_percent_use_max_point,
      bonus_point_product_to_agency,
      bonus_point_bonus_product_to_agency,
      point_review,
    } = this.state;
    var form = {
      allow_use_point_order,
      is_set_order_max_point,
      bonus_point_product_to_agency,
      bonus_point_bonus_product_to_agency,
      money_a_point:
        money_a_point == null
          ? money_a_point
          : money_a_point.toString().replace(/,/g, "").replace(/-/g, ""),
      order_max_point:
        order_max_point == null
          ? order_max_point
          : order_max_point.toString().replace(/,/g, "").replace(/-/g, ""),
      percent_refund:
        percent_refund == null
          ? percent_refund
          : percent_refund.toString().replace(/,/g, "").replace(/-/g, ""),
      point_introduce_customer:
        point_introduce_customer == null
          ? point_introduce_customer
          : point_introduce_customer
              .toString()
              .replace(/,/g, "")
              .replace(/-/g, ""),
      point_register_customer:
        point_register_customer == null
          ? point_register_customer
          : point_register_customer
              .toString()
              .replace(/,/g, "")
              .replace(/-/g, ""),
      point_review:
        point_review == null
          ? point_review
          : point_review.toString().replace(/,/g, "").replace(/-/g, ""),
      is_percent_use_max_point,
    };

    if (is_percent_use_max_point == false) form.percent_use_max_point = null;
    else
      form.percent_use_max_point =
        percent_use_max_point == null
          ? percent_use_max_point
          : percent_use_max_point
              .toString()
              .replace(/,/g, "")
              .replace(/-/g, "");

    if (is_set_order_max_point == false) form.order_max_point = null;
    else
      form.order_max_point =
        order_max_point == null
          ? order_max_point
          : order_max_point.toString().replace(/,/g, "").replace(/-/g, "");

    this.props.updateRewardPoint(store_code, form);
  };

  render() {
    var {
      allow_use_point_order,
      is_set_order_max_point,
      money_a_point,
      order_max_point,
      percent_refund,
      point_introduce_customer,
      point_register_customer,
      is_percent_use_max_point,
      percent_use_max_point,
      point_review,
      ex,
      bonus_point_product_to_agency,
      bonus_point_bonus_product_to_agency,
    } = this.state;
    var checkedAllow = allow_use_point_order == true ? true : false;
    var checkMaxPoint = is_set_order_max_point == true ? true : false;
    var disableValueMaxPoint = is_set_order_max_point == true ? "show" : "hide";

    var isPercentUseMaxPoint = is_percent_use_max_point == true ? true : false;
    var disablePercentUseMaxPont =
      is_percent_use_max_point == true ? "show" : "hide";

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div className="box-body">
              <React.Fragment>
                <div className="form-group">
                  <label htmlFor="lname">Quy đổi xu thành VNĐ</label>
                  <div className="group" style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span style={{ margin: "auto", minWidth: "100px " }}>
                        1 Xu bằng:{" "}
                      </span>
                    </div>
                    <div
                      class="input-group"
                      style={{ marginLeft: "20px", maxWidth: "100%" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        onChange={this.onChange}
                        name="money_a_point"
                        value={formatNoDWithEmpty(money_a_point)}
                        placeholder="Nhập số tiền..."
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phần trăm hoàn xu cho mỗi đơn hàng
                  </label>
                  <div className="group" style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span style={{ margin: "auto", minWidth: "100px " }}>
                        Phần trăm:{" "}
                      </span>
                    </div>
                    <div
                      class="input-group"
                      style={{ marginLeft: "20px", maxWidth: "100%" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        value={percent_refund}
                        onChange={this.onChange}
                        name="percent_refund"
                        placeholder="Nhập phần trăm... VD: 0.1"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ paddingTop: "10px" }}>
                    <i>
                      ( Ví dụ: {new Intl.NumberFormat().format(ex.toString())}{" "}
                      VNĐ hoàn{" "}
                      {percent_refund == null || percent_refund == ""
                        ? 0
                        : percent_refund}
                      % =&nbsp;
                      {percent_refund == null
                        ? 0
                        : new Intl.NumberFormat().format(
                            ((ex * percent_refund) / 100).toString()
                          )}{" "}
                      VNĐ =
                      {percent_refund == null ||
                      money_a_point == null ||
                      percent_refund == "" ||
                      money_a_point == ""
                        ? 0
                        : new Intl.NumberFormat().format(
                            (
                              (ex * percent_refund) /
                              100 /
                              Number(
                                money_a_point
                                  .toString()
                                  .replace(/,/g, "")
                                  .replace(/-/g, "")
                              )
                            ).toString()
                          )}{" "}
                      Xu )
                    </i>
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Số xu nhận được khi đánh giá sản phẩm
                  </label>
                  <div className="group" style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span style={{ margin: "auto", minWidth: "100px " }}>
                        Số Xu:{" "}
                      </span>
                    </div>
                    <div
                      class="input-group"
                      style={{ marginLeft: "20px", maxWidth: "100%" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        onChange={this.onChange}
                        value={formatNoDWithEmpty(point_review)}
                        name="point_review"
                        placeholder="Nhập số xu..."
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">
                          Xu
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Số xu nhận được khi Giới thiệu 'Được' bạn bè
                  </label>
                  <div className="group" style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span style={{ margin: "auto", minWidth: "100px " }}>
                        Số Xu:{" "}
                      </span>
                    </div>
                    <div
                      class="input-group"
                      style={{ marginLeft: "20px", maxWidth: "100%" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        value={formatNoDWithEmpty(point_introduce_customer)}
                        onChange={this.onChange}
                        name="point_introduce_customer"
                        placeholder="Nhập số xu..."
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">
                          Xu
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    Số xu nhận được khi đăng ký và đăng nhập lần đầu
                  </label>
                  <div className="group" style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span style={{ margin: "auto", minWidth: "100px " }}>
                        Số Xu:{" "}
                      </span>
                    </div>
                    <div
                      class="input-group"
                      style={{ marginLeft: "20px", maxWidth: "100%" }}
                    >
                      <input
                        type="text"
                        class="form-control"
                        value={formatNoDWithEmpty(point_register_customer)}
                        onChange={this.onChange}
                        name="point_register_customer"
                        placeholder="Nhập số xu..."
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">
                          Xu
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label htmlFor="phone">Sử dụng xu mua hàng</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={checkedAllow}
                      name="allow_use_point_order"
                      onChange={this.onChangeCheckBox}
                      id="gridCheck33"
                    />
                    <label class="form-check-label" for="gridCheck33">
                      Cho phép sử dụng xu khi mua hàng
                    </label>
                  </div>
                </div>
                {checkedAllow == true && (
                  <>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          checked={checkMaxPoint}
                          name="is_set_order_max_point"
                          onChange={this.onChangeCheckBox}
                          type="checkbox"
                          id="gridCheck22"
                        />
                        <label class="form-check-label" for="gridCheck22">
                          Xét giới hạn xu nhận được khi mua hàng
                        </label>
                      </div>
                    </div>
                    <div className={`form-group ${disableValueMaxPoint}`}>
                      <label htmlFor="phone">
                        Số xu nhận được tối đa khi mua hàng
                      </label>
                      <div className="group" style={{ display: "flex" }}>
                        <div style={{ display: "flex" }}>
                          <span style={{ margin: "auto", minWidth: "100px " }}>
                            Số Xu:{" "}
                          </span>
                        </div>
                        <div
                          class="input-group"
                          style={{ marginLeft: "20px", maxWidth: "100%" }}
                        >
                          <input
                            type="text"
                            class="form-control"
                            onChange={this.onChange}
                            value={formatNoDWithEmpty(order_max_point)}
                            name="order_max_point"
                            placeholder="Nhập số xu..."
                          />
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">
                              Xu
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          checked={isPercentUseMaxPoint}
                          name="is_percent_use_max_point"
                          onChange={this.onChangeCheckBox}
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label class="form-check-label" for="gridCheck">
                          Xét giới hạn số tiền có thể sử dụng bởi xu trong một
                          đơn hàng
                        </label>
                      </div>
                    </div>
                    <div className={`form-group ${disablePercentUseMaxPont}`}>
                      <label htmlFor="phone">
                        Phần trăm số tiền tối đa sử dụng bằng xu trên mỗi đơn
                        hàng
                      </label>
                      <div className="group" style={{ display: "flex" }}>
                        <div style={{ display: "flex" }}>
                          <span style={{ margin: "auto", minWidth: "100px " }}>
                            Số phần trăm:{" "}
                          </span>
                        </div>
                        <div
                          class="input-group"
                          style={{ marginLeft: "20px", maxWidth: "100%" }}
                        >
                          <input
                            type="number"
                            class="form-control"
                            onChange={this.onChange}
                            value={percent_use_max_point}
                            name="percent_use_max_point"
                            placeholder="Nhập số phần trăm..."
                          />
                          <div class="input-group-append"></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="phone">Xu cho đại lý</label>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={bonus_point_product_to_agency}
                      name="bonus_point_product_to_agency"
                      onChange={this.onChangeCheckBox}
                      id="gridCheck333"
                    />
                    <label class="form-check-label" for="gridCheck333">
                      Cho phép đại lý được hưởng xu sản phẩm
                    </label>
                  </div>

                  {bonus_point_product_to_agency && (
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={bonus_point_bonus_product_to_agency}
                        name="bonus_point_bonus_product_to_agency"
                        onChange={this.onChangeCheckBox}
                        id="gridCheck111"
                      />
                      <label class="form-check-label" for="gridCheck111">
                        Cho phép tặng thêm xu từ sản phẩm thưởng
                      </label>
                    </div>
                  )}
                </div>
              </React.Fragment>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-info  btn-sm">
              <i class="fas fa-save"></i>
              Lưu
            </button>
            <button
              type="button"
              data-toggle="modal"
              data-target="#resetModal"
              class="btn btn-primary  btn-sm"
              style={{ marginLeft: "10px" }}
            >
              <i class="fas fa-reset"></i>
              Khôi phục
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.userImg.user_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateRewardPoint: (store_code, form) => {
      dispatch(rewardPointAtion.updateRewardPoint(store_code, form));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
