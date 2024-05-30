import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
class Custom_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_home_type: null,
    };
  }

  chooseProduct = (index) => {
    this.props.chooseProduct(index);
  };

  checkExsitItem = (index, _isVip, isVip, list_id_theme) => {
    console.log(index, _isVip, isVip, list_id_theme);
    if (_isVip == true) {
      if (isVip == true) {
        var bool = false;
        if (list_id_theme == null) {
          return false;
        }
        for (const item of list_id_theme) {
          if (item == index) {
            bool = true;
          }
        }
        return bool;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    var { product_home_type, v, indexProduct } = this.props;

    var isVip =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip == null
        ? false
        : true;
    var list_id_theme =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip != null
        ? this.props.badges.config_user_vip.list_id_theme_vip
        : [];
    return (
      <div
        class={`form-group col-xs-12 col-lg-12 col-md-12 col-sm-12 ${
          this.checkExsitItem(v.index, v.isVip, isVip, list_id_theme) == true
            ? ""
            : "hide"
        }`}
      >
        <div class="row">
          <div class="col-12 kv-avatar" style={{ paddingLeft: 0 }}>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => this.chooseProduct(v.index)}
                type="button"
                style={{ margin: "10px auto" }}
                class={`btn btn-primary btn-sm btn-product ${
                  product_home_type !== v.index ? "show" : "hide"
                }`}
              >
                <i class="fa fa-plus"></i> Chọn
              </button>
              <button
                type="button"
                style={{ margin: "10px auto" }}
                class={`btn btn-success btn-sm ${
                  product_home_type === v.index ? "show" : "hide"
                }`}
              >
                <i class="fa fa-check"></i> Đã chọn
              </button>
            </div>
          </div>
          <div class="col-12 col-product">
            <img src={v.product} />

            <span>
              Product {indexProduct + 1} #{v.index}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Custom_Screen);
