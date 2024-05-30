import React, { Component } from "react";
import * as Types from "../../../constants/ActionType";
import { connect } from "react-redux";
import ModalUpload from "./ModalUpload";
import * as Env from "../../../ultis/default";
import { isEmpty } from "../../../ultis/helpers";
import Table from "./List";
import * as decentralization from "../../../actions/decentralization";
import { shallowEqual } from "../../../ultis/shallowEqual";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      report_payment: true,
      product_list: false,
      product_add: false,
      product_update: false,
      product_remove_hide: false,
      product_category_list: false,
      product_category_add: false,
      product_category_update: false,
      product_category_remove: false,
      product_attribute_list: false,
      product_attribute_add: false,
      product_attribute_update: false,
      product_attribute_remove: false,
      product_ecommerce: false,
      product_import_from_exel: false,
      product_export_to_exel: false,
      customer_list: false,
      customer_config_point: false,
      customer_review_list: false,
      customer_review_censorship: false,
      promotion_discount_list: false,
      promotion_discount_add: false,
      promotion_discount_update: false,
      promotion_discount_end: false,
      promotion_voucher_list: false,
      promotion_voucher_add: false,
      promotion_voucher_update: false,
      promotion_voucher_end: false,
      promotion_combo_list: false,
      promotion_combo_add: false,
      promotion_combo_update: false,
      promotion_combo_end: false,
      order_list: true,
      order_allow_change_status: true,
      post_list: false,
      post_add: false,
      post_update: false,
      post_remove_hide: false,
      post_category_list: false,
      post_category_add: false,
      post_category_update: false,
      post_category_remove: false,
      app_theme_edit: false,
      app_theme_main_config: false,
      app_theme_button_contact: false,
      app_theme_home_screen: false,
      app_theme_main_component: false,
      app_theme_category_product: false,
      app_theme_product_screen: false,
      app_theme_contact_screen: false,
      web_theme_edit: false,
      web_theme_overview: false,
      web_theme_contact: false,
      web_theme_help: false,
      web_theme_footer: false,
      web_theme_banner: false,
      delivery_pick_address_list: false,
      delivery_pick_address_update: false,
      delivery_provider_update: false,
      payment_list: false,
      payment_on_off: false,
      notification_schedule_list: false,
      notification_schedule_add: false,
      notification_schedule_remove_pause: false,
      notification_schedule_update: false,
      popup_list: false,
      popup_add: false,
      popup_update: false,
      popup_remove: false,
      collaborator_config: false,
      collaborator_list: false,
      collaborator_payment_request_list: false,
      collaborator_payment_request_solve: false,
      collaborator_payment_request_history: false,
      notification_to_stote: false,
      chat_list: false,
      chat_allow: false,
      report_view: false,
      report_overview: false,
      report_product: false,
      report_order: false,
      decentralization_list: false,
      decentralization_update: false,
      decentralization_add: false,
      decentralization_remove: false,
      staff_list: false,
      staff_update: false,
      staff_add: false,
      staff_remove: false,
      staff_delegating: false,
    };

    this.initialData = [
      { value: "order_list", name: "Xem danh sách đơn hàng" },
      {
        value: "order_allow_change_status",
        name: "Thay đổi trạng thái đơn hàng",
      },

      { value: "product_list", name: "Xem danh sách sản phẩm" },
      { value: "product_add", name: "Thêm sản phẩm" },
      { value: "product_update", name: "Cập nhật sản phẩm" },
      { value: "product_remove_hide", name: "Xóa sản phẩm" },
      {
        value: "product_category_list",
        name: "Xem danh sách danh mục sản phẩm",
      },
      { value: "product_category_add", name: "Thêm danh mục sản phẩm" },
      { value: "product_category_update", name: "Cập nhật danh mục sản phẩm" },
      { value: "product_category_remove", name: "Xóa danh mục sản phẩm" },
      { value: "product_attribute_list", name: "Xem thuộc tính sản phẩm" },
      { value: "product_attribute_add", name: "Thêm thuộc tính sản phẩm" },
      {
        value: "product_attribute_update",
        name: "Cập nhật thuộc tính sản phẩm",
      },
      { value: "product_attribute_remove", name: "Xóa thuộc tính sản phẩm" },
      { value: "product_ecommerce", name: "Lấy sản phảm từ sàn TMĐT " },
      { value: "product_import_from_exel", name: "Import Excel sản phẩm" },
      { value: "product_export_to_exel", name: "Export Excel sản phẩm" },
      { value: "customer_list", name: "Xem danh sách khách hàng" },
      { value: "customer_config_point", name: "Cấu hình điểm thưởng" },
      { value: "customer_review_list", name: "Xem danh sáchđánh giá" },
      {
        value: "promotion_discount_list",
        name: "Xem danh sách Chương trình giảm giá sản phẩm",
      },
      {
        value: "promotion_discount_add",
        name: "Thêm Chương trình giảm giá sản phẩm",
      },
      {
        value: "promotion_discount_update",
        name: "Cập nhật Chương trình giảm giá sản phẩm",
      },
      {
        value: "promotion_discount_end",
        name: "Kết thúc Chương trình giảm giá sản phẩm",
      },
      {
        value: "promotion_voucher_list",
        name: "Xem danh sách Chương trình Voucher sản phẩm",
      },
      {
        value: "promotion_voucher_add",
        name: "Thêm Chương trình Voucher sản phẩm",
      },
      {
        value: "promotion_voucher_update",
        name: "Cập nhật Chương trình Voucher sản phẩm",
      },
      {
        value: "promotion_voucher_end",
        name: "Kết thúc Chương trình Voucher sản phẩm",
      },
      {
        value: "promotion_combo_list",
        name: "Xem danh sách Chương trình Combo sản phẩm",
      },
      {
        value: "promotion_combo_add",
        name: "Thêm Chương trình Combo sản phẩm",
      },
      {
        value: "promotion_combo_update",
        name: "Cập nhật Chương trình Combo sản phẩm",
      },
      {
        value: "promotion_combo_end",
        name: "Kết thúc Chương trình Combo sản phẩm",
      },
      { value: "post_list", name: "Xem danh sách bài viết" },
      { value: "post_add", name: "Thêm bài viết" },
      { value: "post_update", name: "Sửa bài viết" },
      { value: "post_remove_hide", name: "Xóa bài viết" },
      { value: "post_category_list", name: "Xem danh mục bài viết" },
      { value: "post_category_add", name: "Thêm danh mục bài viết" },
      { value: "post_category_update", name: "Cập nhật danh mục bài viết" },
      { value: "post_category_remove", name: "Xóa danh mục bài viết" },
      { value: "app_theme_edit", name: "Cập nhật App" },
      { value: "app_theme_main_config", name: "Cập nhật cấu hình App" },
      { value: "app_theme_button_contact", name: "Nút liên hệ App" },
      { value: "app_theme_home_screen", name: "Màn hình trang chủ App" },
      { value: "app_theme_main_component", name: "Thành phần chính App" },
      {
        value: "app_theme_category_product",
        name: "Màn hình danh mục sản phẩm App ",
      },
      { value: "app_theme_product_screen", name: "Màn hình  sản phẩm App" },
      { value: "app_theme_contact_screen", name: "Màn hình liên hệ App" },
      { value: "web_theme_edit", name: "Cập nhật web" },
      { value: "web_theme_overview", name: "Tổng quan web" },
      { value: "web_theme_contact", name: "Liên hệ web" },
      { value: "web_theme_help", name: "Hỗ trợ web" },
      { value: "web_theme_footer", name: "Chân trang web" },
      { value: "web_theme_banner", name: "Banner web" },
      {
        value: "delivery_pick_address_list",
        name: "Xem danh sách danh mục sản phẩm",
      },
      {
        value: "delivery_pick_address_update",
        name: "Cập nhật địa chỉ lấy hàng",
      },
      {
        value: "delivery_provider_update",
        name: "Cập nhật bên cung cấp giao vận",
      },
      { value: "payment_list", name: "Danh sách thanh toán" },
      { value: "payment_on_off", name: "Bật tắt nhà thanh toán" },
      { value: "notification_schedule_list", name: "Danh sách lịch thông báo" },
      { value: "notification_schedule_add", name: "Thêm lịch thông báo" },
      {
        value: "notification_schedule_remove_pause",
        name: "Xóa lịch thông báo",
      },
      {
        value: "notification_schedule_update",
        name: "Cập nhật lịch/Tiếp tục/Tạm dừng",
      },
      { value: "popup_list", name: "Xem danh sách Popup" },
      { value: "popup_add", name: "Thêm  Popup" },
      { value: "popup_update", name: "Cập nhật  Popup" },
      { value: "popup_remove", name: "Xòa Popup" },
      { value: "collaborator_config", name: "Cấu hình cộng tác viên" },
      { value: "collaborator_list", name: "Danh sách cộng tác viên" },
      {
        value: "collaborator_payment_request_list",
        name: "Danh sách yêu cầu thanh toán",
      },
      {
        value: "collaborator_payment_request_solve",
        name: "Cho phép hủy hoặc thanh toán",
      },
      {
        value: "collaborator_payment_request_history",
        name: "Lịch sử yêu cầu thanh toán",
      },
      { value: "notification_to_stote", name: "Xem thông báo đến cửa hàng" },
      { value: "chat_list", name: "Danh sách chat" },
      { value: "chat_allow", name: "Cho phép chat với khách hàng" },
      { value: "report_overview", name: "Báo cáo tổng quan" },
      { value: "report_product", name: "Báo cáo sản phẩm" },
      { value: "report_order", name: "Báo cáo hóa đơn" },
      { value: "decentralization_list", name: "Xem danh sách phân quyền" },

      { value: "decentralization_update", name: "Cập nhật phân quyền" },
      { value: "decentralization_add", name: "Thêm phân quyền" },
      ,
      { value: "decentralization_remove", name: "Xóa phân quyền" },
      { value: "staff_list", name: "Xem danh sách nhân viên" },
      { value: "staff_update", name: "Cập nhật nhân viên" },
      { value: "staff_add", name: "Thêm nhân viên" },
      { value: "staff_remove", name: "Xóa nhân viên" },
      { value: "report_payment", name: "Báo cáo thanh toán" },
      // { value: "staff_delegating", name: "Uỷ quyền cho nhân viên" },
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.data, this.props.data)) {
      var { data, id } = nextProps;
      this.getData(data, id);
    }
  }

  componentDidMount() {
    var { data, id } = this.props;

    this.getData(data, id);
  }

  getData = (data, id) => {
    if (data.length > 0) {
      for (const item of data) {
        if (item.id == id) {
          this.setState({
            name: item.name,
            description: item.description,
            product_list: item.product_list,
            product_add: item.product_add,
            product_update: item.product_update,
            product_remove_hide: item.product_remove_hide,
            product_category_list: item.product_category_list,
            product_category_add: item.product_category_add,
            product_category_update: item.product_category_update,
            item,
            item,
            product_category_remove: item.product_category_remove,
            product_attribute_list: item.product_attribute_list,
            product_attribute_add: item.product_attribute_add,
            product_attribute_update: item.product_attribute_update,
            product_attribute_remove: item.product_attribute_remove,
            product_ecommerce: item.product_ecommerce,
            product_import_from_exel: item.product_import_from_exel,
            product_export_to_exel: item.product_export_to_exel,
            customer_list: item.customer_list,
            customer_config_point: item.customer_config_point,
            customer_review_list: item.customer_review_list,
            customer_review_censorship: item.customer_review_censorship,
            promotion_discount_list: item.promotion_discount_list,
            promotion_discount_add: item.promotion_discount_add,
            promotion_discount_update: item.promotion_discount_update,
            promotion_discount_end: item.promotion_discount_end,
            promotion_voucher_list: item.promotion_voucher_list,
            promotion_voucher_add: item.promotion_voucher_add,
            promotion_voucher_update: item.promotion_voucher_update,
            promotion_voucher_end: item.promotion_voucher_end,
            promotion_combo_list: item.promotion_combo_list,
            promotion_combo_add: item.promotion_combo_add,
            promotion_combo_update: item.promotion_combo_update,
            promotion_combo_end: item.promotion_combo_end,
            post_list: item.post_list,
            post_add: item.post_add,
            post_update: item.post_update,
            post_remove_hide: item.post_remove_hide,
            post_category_list: item.post_category_list,
            post_category_add: item.post_category_add,
            post_category_update: item.post_category_update,
            post_category_remove: item.post_category_remove,
            app_theme_edit: item.app_theme_edit,
            app_theme_main_config: item.app_theme_main_config,
            app_theme_button_contact: item.app_theme_button_contact,
            app_theme_home_screen: item.app_theme_home_screen,
            app_theme_main_component: item.app_theme_main_component,
            app_theme_category_product: item.app_theme_category_product,
            app_theme_product_screen: item.app_theme_product_screen,
            app_theme_contact_screen: item.app_theme_contact_screen,
            web_theme_edit: item.web_theme_edit,
            web_theme_overview: item.web_theme_overview,
            web_theme_contact: item.web_theme_contact,
            web_theme_help: item.web_theme_help,
            web_theme_footer: item.web_theme_footer,
            web_theme_banner: item.web_theme_banner,
            delivery_pick_address_list: item.delivery_pick_address_list,
            delivery_pick_address_update: item.delivery_pick_address_update,
            delivery_provider_update: item.delivery_provider_update,
            payment_list: item.payment_list,
            payment_on_off: item.payment_on_off,
            notification_schedule_list: item.notification_schedule_list,
            notification_schedule_add: item.notification_schedule_add,
            notification_schedule_remove_pause:
              item.notification_schedule_remove_pause,
            notification_schedule_update: item.notification_schedule_update,
            popup_list: item.popup_list,
            popup_add: item.popup_add,
            popup_update: item.popup_update,
            popup_remove: item.popup_remove,
            collaborator_config: item.collaborator_config,
            collaborator_list: item.collaborator_list,
            collaborator_payment_request_list:
              item.collaborator_payment_request_list,
            collaborator_payment_request_solve:
              item.collaborator_payment_request_solve,
            collaborator_payment_request_history:
              item.collaborator_payment_request_history,
            notification_to_stote: item.notification_to_stote,
            chat_list: item.chat_list,
            chat_allow: item.chat_allow,
            report_view: item.report_view,
            report_overview: item.report_overview,
            report_product: item.report_product,
            report_order: item.report_order,
            decentralization_list: item.decentralization_list,
            decentralization_update: item.decentralization_update,
            decentralization_add: item.decentralization_add,
            decentralization_remove: item.decentralization_remove,
            staff_list: item.staff_list,
            staff_update: item.staff_update,
            staff_add: item.staff_add,
            staff_remove: item.staff_remove,
            staff_delegating: item.staff_delegating,
            report_payment: item.report_payment,
          });
        }
      }
    }
  };

  handleChangeValue = (checked, item) => {
    this.setState({ [item]: checked });
  };

  showListPermission = (data) => {
    var result = null;
    var state = { ...this.state };
    result = data.map((item, index) => {
      var disable = state[item.value] == true ? "show" : "hide";
      return (
        <tr className={disable}>
          <td>
            {" "}
            <i class="fas fa-arrow-alt-circle-right"></i>
            &nbsp;{item.name}
          </td>
        </tr>
      );
    });
    return result;
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
    console.log(this.state);
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

            <div class="form-group">
              <label for="group_name">Quyền truy cập</label>
              <table class="table table-border table-hover">
                <tbody>{this.showListPermission(this.initialData)}</tbody>
              </table>
            </div>
          </div>

          <div class="box-footer">
            <a
              style={{ marginLeft: "10px" }}
              onClick={this.goBack}
              class="btn btn-warning"
              class="btn btn-warning btn-icon-split  btn-sm"
            >
              <span class="icon text-white-50">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span class="text"> Trở về</span>
            </a>
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
