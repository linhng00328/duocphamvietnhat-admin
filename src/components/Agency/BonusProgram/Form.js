import React, { Component } from "react";
import { connect } from "react-redux";
import ModalUpload from "./ModalUpload";
import { formatNumber, isEmpty } from "../../../ultis/helpers";
import * as agencyAction from "../../../actions/agency";
import "suneditor/dist/css/suneditor.min.css";
import * as Types from "../../../constants/ActionType";
import history from "../../../history";
import * as ENV_default from "../../../ultis/default";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: 0,
      reward_name: "",
      reward_description: "",
      reward_image_url: null,
      reward_value: 0,
      limit: 0,
    };
  }
  componentDidMount() {
    if (this.props.step_data != null) {
      this.setState({
        threshold: this.props.step_data.threshold,
        reward_name: this.props.step_data.reward_name,
        reward_description: this.props.step_data.reward_description,
        reward_image_url: this.props.step_data.reward_image_url,
        reward_value: this.props.step_data.reward_value,
        limit: this.props.step_data.limit,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ reward_image_url: nextProps.image });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    const _value = formatNumber(value);
    if (name == "reward_description") {
      this.setState({ [name]: value });
      return;
    }
    if (!isNaN(Number(_value))) {
      value = new Intl.NumberFormat().format(_value);
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: value });
    }
  };
  onChangeName = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({ [name]: value });
  };
  onChangeSelect = (selectValue) => {
    this.setState({ txtCategories: selectValue });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var {
      threshold,
      reward_name,
      reward_description,
      reward_image_url,
      reward_value,
      limit,
    } = this.state;
    if (
      isEmpty(reward_name) == false ||
      isEmpty(reward_value) == false ||
      isEmpty(limit) == false ||
      isEmpty(threshold) == false ||
      reward_value == 0 ||
      limit == 0 ||
      threshold == 0
    ) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Thất bại ",
          disable: "show",
          content: "Nhập giá trị không hợp lệ",
        },
      });
      return;
    }
    if (this.props.step_data != null) {
      this.props.updateBonusSteps(
        this.props.store_code,
        this.props.step_data.id,
        {
          threshold: threshold == null ? threshold : formatNumber(threshold),
          reward_name: reward_name,
          reward_description: reward_description,
          reward_image_url: reward_image_url,
          reward_value:
            reward_value == null ? reward_value : formatNumber(reward_value),
          limit: limit == null ? limit : formatNumber(limit),
        }
      );
    } else {
      this.props.addBonusSteps(this.props.store_code, {
        threshold: threshold == null ? threshold : formatNumber(threshold),
        reward_name: reward_name,
        reward_description: reward_description,
        reward_image_url: reward_image_url,
        reward_value:
          reward_value == null ? reward_value : formatNumber(reward_value),
        limit: limit == null ? limit : formatNumber(limit),
      });
    }
  };

  goBack = () => {
    var { store_code } = this.props;
    history.replace(`/agency/${store_code}?tab-index=4`);
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
      <React.Fragment>
        <form role="form" onSubmit={this.onSave} method="post">
          <div class="box-body">
            <div class="row">
              <div
                class="col-xs-7 col-sm-7 col-md-7 col-lg-7"
                style={{ borderRight: "0.5px solid #cac9c9" }}
              >
                <div class="form-group">
                  <label for="product_name">Tên phần thưởng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="reward_name"
                    value={reward_name}
                    name="reward_name"
                    placeholder="Nhập tên"
                    autoComplete="off"
                    onChange={this.onChangeName}
                  />
                </div>
                <div class="form-group">
                  <label for="product_name">Đơn đạt tối thiểu</label>
                  <input
                    type="text"
                    class="form-control"
                    id="threshold"
                    value={threshold}
                    name="threshold"
                    placeholder="Nhập số tiền"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>

                <div class="form-group">
                  <label for="product_name">Giá trị thưởng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="reward_value"
                    value={reward_value}
                    name="reward_value"
                    placeholder="Nhập giá trị"
                    autoComplete="off"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <div class="form-group">
                  <label>Ảnh: &nbsp; </label>
                  <img
                    src={`${reward_image_url ?? ENV_default.IMG_NOT_FOUND}`}
                    width="150"
                    height="150"
                  />
                </div>
                <div class="form-group">
                  <div class="kv-avatar">
                    <div>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#uploadModalBlog"
                      >
                        <i class="fa fa-plus"></i> Upload ảnh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="product_name">Giới hạn thưởng</label>
              <input
                type="text"
                class="form-control"
                id="limit"
                value={limit}
                name="limit"
                placeholder="Nhập số lượng"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="product_name">Mô tả</label>

              <textarea
                name="reward_description"
                onChange={this.onChange}
                value={reward_description}
                id="input"
                class="form-control"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-primary btn-sm">
              <i class="fa fa-save"></i> Lưu
            </button>
            <button
              type="button"
              className="color-white"
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class={`btn btn-warning btn-sm color-white `}
            >
              <i class="fa fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>

        <ModalUpload />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.UploadReducers.blogImg.blog_img,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addBonusSteps: (store_code, form) => {
      dispatch(agencyAction.addBonusSteps(store_code, form));
    },
    getBonusAgencyConfig: (store_code) => {
      dispatch(agencyAction.getBonusAgencyConfig(store_code));
    },
    updateBonusSteps: (store_code, id, form) => {
      dispatch(agencyAction.updateBonusSteps(store_code, id, form));
    },
    showError: (action) => {
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
