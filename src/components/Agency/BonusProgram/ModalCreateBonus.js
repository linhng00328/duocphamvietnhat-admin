import React, { Component } from "react";
import * as agencyAction from "../../../actions/agency";
import { connect } from "react-redux";
import * as helper from "../../../ultis/helpers";
import { formatNumber } from "../../../ultis/helpers";
import ModalUpload from "./ModalUpload";

class ModalCreateBonus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: 0,
      reward_name: "",
      reward_description: "",
      reward_image_url: "",
      reward_value: 0,
      limit: 0,
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    const _value = formatNumber(value);
    if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: value });
    }
  };
  onSave = (e) => {
    e.preventDefault();
    window.$(".modal").modal("hide");
    var {
      threshold,
      reward_name,
      reward_description,
      reward_image_url,
      reward_value,
      limit,
    } = this.state;
    this.props.addBonusSteps(this.props.store_code, {
      threshold: threshold == null ? threshold : formatNumber(threshold),
      reward_name: reward_name,
      reward_description: reward_description,
      reward_image_url: reward_image_url,
      reward_value:
        reward_value == null ? reward_value : formatNumber(reward_value),
      limit: limit == null ? limit : formatNumber(limit),
    });
    this.setState({
      threshold: 0,
      reward_name: "",
      reward_description: "",
      reward_image_url: "",
      reward_value: 0,
      limit: 0,
    });
  };
  render() {
    var {
      threshold,
      reward_name,
      reward_description,
      reward_image_url,
      reward_value,
      limit,
    } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModalBonus"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ background: "white" }}>
              <h4 class="modal-title" style={{ color: "black" }}>
                Thêm bậc thang thưởng
              </h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <form onSubmit={this.onSave} role="form" action="#" method="post">
              <div class="modal-body">
                <div class="form-group">
                  <label>Ảnh: &nbsp; </label>
                  <img src={`${"image"}`} width="150" height="150" />
                </div>
                <div class="form-group">
                  <div class="kv-avatar">
                    <div>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#uploadModalBannerAds"
                      >
                        <i class="fa fa-plus"></i> Upload ảnh
                      </button>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_name">Số tiền đơn hàng tối thiểu</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="threshold"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={threshold}
                    onChange={this.onChange}
                    name="threshold"
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Tên phần thưởng</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="reward_name"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={reward_name}
                    onChange={this.onChange}
                    name="reward_name"
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Mô tả phần thưởng</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="reward_description"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={reward_description}
                    onChange={this.onChange}
                    name="reward_description"
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Giá trị phần thưởng</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="reward_value"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={reward_value}
                    onChange={this.onChange}
                    name="reward_value"
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Số lượng còn lại</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="limit"
                    placeholder="Nhập..."
                    autoComplete="off"
                    value={limit}
                    onChange={this.onChange}
                    name="limit"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-info">
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>

        <ModalUpload />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addBonusSteps: (store_code, form) => {
      dispatch(agencyAction.addBonusSteps(store_code, form));
    },
    getBonusAgencyConfig: (store_code) => {
      dispatch(agencyAction.getBonusAgencyConfig(store_code));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreateBonus);
