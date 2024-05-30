import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import ModalUpload from "./ModalUpload";
import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";
import Table from "./List";
import * as decentralization from "../../../actions/decentralization";
import { shallowEqual } from "../../../ultis/shallowEqual";
import permission, { initialPermission } from "../../../ultis/permission";
import { forEach } from "lodash";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialPermission();
    this.initialTable = permission();
    this.isLoading = false;
  }

  componentDidMount() {
    var { data, id } = this.props;
    this.getData(data, id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data);
    if (
      !shallowEqual(nextProps.data, this.props.data) ||
      this.isLoading != false
    ) {
      this.isLoading = true;
      var { data, id } = nextProps;
      this.getData(data, id);
    }
  }

  getData = (data, id) => {
    if (data.length > 0) {
      for (const item of data) {
        if (item.id == id) {
          var newItem = { ...this.state };
          for (const [key, value] of Object.entries(item)) {
            if (typeof newItem[key] != "undefined") {
              newItem[key] = value;
            }
          }
          console.log(newItem);
          this.setState({ ...newItem });
          // this.setState({
          //   order_list: item.order_list,
          //   order_allow_change_status: item.order_allow_change_status,
          //   name: item.name,
          //   description: item.description,
          //   product_list: item.product_list,
          //   product_add: item.product_add,
          //   product_update: item.product_update,
          //   product_remove_hide: item.product_remove_hide,
          //   product_category_list: item.product_category_list,
          //   product_category_add: item.product_category_add,
          //   product_category_update: item.product_category_update, item, item,
          //   product_category_remove: item.product_category_remove,
          //   product_attribute_list: item.product_attribute_list,
          //   product_attribute_add: item.product_attribute_add,
          //   product_attribute_update: item.product_attribute_update,
          //   product_attribute_remove: item.product_attribute_remove,
          //   product_ecommerce: item.product_ecommerce,
          //   product_import_from_exel: item.product_import_from_exel,
          //   product_export_to_exel: item.product_export_to_exel,
          //   customer_list: item.customer_list,
          //   customer_config_point: item.customer_config_point,
          //   customer_review_list: item.customer_review_list,
          //   customer_review_censorship: item.customer_review_censorship,
          //   promotion_discount_list: item.promotion_discount_list,
          //   promotion_discount_add: item.promotion_discount_add,
          //   promotion_discount_update: item.promotion_discount_update,
          //   promotion_discount_end: item.promotion_discount_end,
          //   promotion_voucher_list: item.promotion_voucher_list,
          //   promotion_voucher_add: item.promotion_voucher_add,
          //   promotion_voucher_update: item.promotion_voucher_update,
          //   promotion_voucher_end: item.promotion_voucher_end,
          //   promotion_combo_list: item.promotion_combo_list,
          //   promotion_combo_add: item.promotion_combo_add,
          //   promotion_combo_update: item.promotion_combo_update,
          //   promotion_combo_end: item.promotion_combo_end,
          //   post_list: item.post_list,
          //   post_add: item.post_add,
          //   post_update: item.post_update,
          //   post_remove_hide: item.post_remove_hide,
          //   post_category_list: item.post_category_list,
          //   post_category_add: item.post_category_add,
          //   post_category_update: item.post_category_update,
          //   post_category_remove: item.post_category_remove,
          //   app_theme_edit: item.app_theme_edit,
          //   app_theme_main_config: item.app_theme_main_config,
          //   app_theme_button_contact: item.app_theme_button_contact,
          //   app_theme_home_screen: item.app_theme_home_screen,
          //   app_theme_main_component: item.app_theme_main_component,
          //   app_theme_category_product: item.app_theme_category_product,
          //   app_theme_product_screen: item.app_theme_product_screen,
          //   app_theme_contact_screen: item.app_theme_contact_screen,
          //   web_theme_edit: item.web_theme_edit,
          //   web_theme_overview: item.web_theme_overview,
          //   web_theme_contact: item.web_theme_contact,
          //   web_theme_help: item.web_theme_help,
          //   web_theme_footer: item.web_theme_footer,
          //   web_theme_banner: item.web_theme_banner,
          //   delivery_pick_address_list: item.delivery_pick_address_list,
          //   delivery_pick_address_update: item.delivery_pick_address_update,
          //   delivery_provider_update: item.delivery_provider_update,
          //   payment_list: item.payment_list,
          //   payment_on_off: item.payment_on_off,
          //   notification_schedule_list: item.notification_schedule_list,
          //   notification_schedule_add: item.notification_schedule_add,
          //   notification_schedule_remove_pause: item.notification_schedule_remove_pause,
          //   notification_schedule_update: item.notification_schedule_update,
          //   popup_list: item.popup_list,
          //   popup_add: item.popup_add,
          //   popup_update: item.popup_update,
          //   popup_remove: item.popup_remove,
          //   collaborator_config: item.collaborator_config,
          //   collaborator_list: item.collaborator_list,
          //   collaborator_payment_request_list: item.collaborator_payment_request_list,
          //   collaborator_payment_request_solve: item.collaborator_payment_request_solve,
          //   collaborator_payment_request_history: item.collaborator_payment_request_history,
          //   notification_to_stote: item.notification_to_stote,
          //   chat_list: item.chat_list,
          //   chat_allow: item.chat_allow,
          //   report_view: item.report_view,
          //   report_overview: item.report_overview,
          //   report_product: item.report_product,
          //   report_order: item.report_order,
          //   decentralization_list: item.decentralization_list,
          //   decentralization_update: item.decentralization_update,
          //   decentralization_add: item.decentralization_add,
          //   decentralization_remove: item.decentralization_remove,
          //   staff_list: item.staff_list,
          //   staff_update: item.staff_update,
          //   staff_add: item.staff_add,
          //   staff_remove: item.staff_remove,
          //   staff_delegating: item.staff_delegating,

          // })
        }
      }
    }
  };

  handleChangeValue = (checked, item) => {
    this.setState({ [item]: checked });
  };

  showListTable = (data) => {
    return (
      <Table
        handleChangeValue={this.handleChangeValue}
        state={this.state}
        data={data}
      />
    );
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    var { store_code, id } = this.props;
    e.preventDefault();
    var { name } = this.state;
    if (name == null || !isEmpty(name)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tiêu đề không được để trống",
        },
      });
      return;
    }
    this.props.updateDecentralization(id, this.state, store_code);
  };
  goBack = () => {
    var { history } = this.props;
    history.goBack();
  };
  render() {
    var { name, description } = this.state;
    var image = image == "" || image == null ? Env.IMG_NOT_FOUND : image;

    return (
      <React.Fragment>
        <form role="form" onSubmit={this.onSave}>
          <div class="box-body">
            <div class="form-group">
              <label for="group_name">Tên phân quyền</label>

              <input
                type="text"
                value={name}
                class="form-control"
                id="group_name"
                name="name"
                placeholder="Nhập tên phân quyền"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <label for="group_name">Mô tả phân quyền</label>
              <input
                type="text"
                value={description}
                class="form-control"
                id="id_group"
                name="description"
                placeholder="Nhập mô tả"
                autoComplete="off"
                onChange={this.onChange}
              />
            </div>
            {this.showListTable(this.initialTable)}
          </div>

          <div class="box-footer">
            <button type="submit" class="btn btn-info   btn-sm">
              <i class="fas fa-save"></i> Lưu
            </button>
            <button
              style={{ marginLeft: "10px" }}
              type="button"
              onClick={this.goBack}
              class="btn btn-warning   btn-sm"
            >
              <i class="fas fa-arrow-left"></i> Trở về
            </button>
          </div>
        </form>
        <ModalUpload />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    updateDecentralization: (id, data, store_code) => {
      dispatch(decentralization.updateDecentralization(id, data, store_code));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
