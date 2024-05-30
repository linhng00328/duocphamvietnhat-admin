import getChannel, { IKITECH, IKIPOS } from "./channel";
const permission = (channel) => {
  if (getChannel() == IKITECH) {
    return [
      {
        name: "Hệ thống",
        components: [
          {
            name: "Thông tin hệ thống",
            decentralizationName: "store_info",
            componentChilds: [
              {
                name: "Thông tin cửa hàng",
                decentralizationName: "store_info",
              },
              {
                name: "Thông báo tới cửa hàng",
                decentralizationName: "notification_to_stote",
              },
              {
                name: "Tin tức bài viết",
                decentralizationName: "post_list",
              },
              {
                name: "Xem chỉ số và báo cáo doanh thu",
                decentralizationName: "report_view",
              },
            ],
          },
          {
            name: "Chương trình khuyến mãi",
            decentralizationName: "promotion",
            componentChilds: [
              {
                name: "Giảm giá sản phẩm",
                decentralizationName: "promotion_discount_list",
              },
              {
                name: "Voucher giảm giá",
                decentralizationName: "promotion_voucher_list",
              },
              {
                name: "Combo giảm giá",
                decentralizationName: "promotion_combo_list",
              },
              {
                name: "Thưởng sản phẩm",
                decentralizationName: "promotion_bonus_product_list",
              },
            ],
          },
          {
            name: "Đào tạo",
            decentralizationName: "train",
            componentChilds: [
              {
                name: "DS khóa học",
                decentralizationName: "train",
                componentChilds: [],
              },
              {
                name: "Thêm khóa học",
                decentralizationName: "train_add",
                componentChilds: [],
              },
              {
                name: "Chỉnh sửa khóa học",
                decentralizationName: "train_update",
                componentChilds: [],
              },
              {
                name: "Xóa khóa học",
                decentralizationName: "train_delete",
                componentChilds: [],
              },
              {
                name: "DS bài thi",
                decentralizationName: "train_exam_list",
                componentChilds: [],
              },
              {
                name: "Thêm bài thi",
                decentralizationName: "train_exam_add",
                componentChilds: [],
              },
              {
                name: "Sửa bài thi",
                decentralizationName: "train_exam_update",
                componentChilds: [],
              },
              {
                name: "Xóa bài thi",
                decentralizationName: "train_exam_delete",
                componentChilds: [],
              },
              {
                name: "Lịch sử thi",
                decentralizationName: "train_exam_history",
                componentChilds: [],
              },
            ],
          },
          {
            name: "Cộng đồng",
            decentralizationName: "communication_list",
            componentChilds: [
              {
                name: "DS tin đăng",
                decentralizationName: "communication_list",
                componentChilds: [],
              },
              {
                name: "Chỉnh sửa bài đăng",
                decentralizationName: "communication_update",
                componentChilds: [],
              },
              {
                name: "Đăng lại bài đăng",
                decentralizationName: "communication_add",
                componentChilds: [],
              },
              {
                name: "Xóa bài đăng",
                decentralizationName: "communication_delete",
                componentChilds: [],
              },
              {
                name: "Duyệt bài đăng",
                decentralizationName: "communication_approve",
                componentChilds: [],
              },
            ],
          },
        ],
      },
      {
        name: "Hàng hóa",
        components: [
          {
            name: "Quản lý sản phẩm",
            decentralizationName: "product_list",
            componentChilds: [
              {
                name: "DS sản phẩm",
                decentralizationName: "product_list",
              },
              {
                name: "Thêm mới",
                decentralizationName: "product_add",
              },
              {
                name: "Cập nhập",
                decentralizationName: "product_update",
              },
              {
                name: "Sao chép",
                decentralizationName: "product_copy",
              },
              {
                name: "Xóa",
                decentralizationName: "product_remove_hide",
              },
              {
                name: "Lấy phẩm sàn TMĐT",
                decentralizationName: "product_ecommerce",
              },
              {
                name: "In mã vạch",
                decentralizationName: "barcode_print",
              },
              {
                name: "Cài đặt hoa hồng",
                decentralizationName: "product_commission",
              },
              {
                name: "Xuất file excel",
                decentralizationName: "product_export_to_excel",
              },
              {
                name: "Nhập file excel",
                decentralizationName: "product_import_from_excel",
              },
            ],
          },
          {
            name: "Danh mục sản phẩm",
            decentralizationName: "product_category_list",
            componentChilds: [
              {
                name: "DS danh mục",
                decentralizationName: "product_category_list",
              },
              {
                name: "Thêm mới",
                decentralizationName: "product_category_add",
              },
              {
                name: "Cập nhập",
                decentralizationName: "product_category_update",
              },
              {
                name: "Xóa",
                decentralizationName: "product_category_remove",
              },
            ],
          },
          {
            name: "Thuộc tính sản phẩm",
            decentralizationName: "product_attribute_list",
            componentChilds: [
              {
                name: "DS thuộc tính sản phẩm",
                decentralizationName: "product_attribute_list",
              },
              {
                name: "Thêm mới",
                decentralizationName: "product_attribute_add",
              },
              {
                name: "Cập nhập",
                decentralizationName: "product_attribute_update",
              },
              {
                name: "Xóa",
                decentralizationName: "product_attribute_remove",
              },
            ],
          },
        ],
      },
      {
        name: "Quản lý đơn hàng và kho",
        components: [
          {
            name: "Đơn hàng",
            decentralizationName: "order_list",
            componentChilds: [
              {
                name: "Xem hóa đơn",
                decentralizationName: "order_list",
              },
              {
                name: "Xuất file excel",
                decentralizationName: "order_export_to_excel",
              },
              // {
              //   name: "Nhập file excel",
              //   decentralizationName: "order_import_from_excel",
              // },
              {
                name: "Thay đổi trạng thái đơn hàng",
                decentralizationName: "order_allow_change_status",
              },
            ],
          },
          {
            name: "Quản lý tại pos",
            decentralizationName: "create_order_pos",
            componentChilds: [
              {
                name: "Bán hàng tại quầy",
                decentralizationName: "create_order_pos",
              },
              {
                name: "Chỉnh sửa giá sản phẩm tại quầy",
                decentralizationName: "change_price_pos",
              },
              {
                name: "Chỉnh sửa chiết khấu tại quầy",
                decentralizationName: "change_discount_pos",
              },
            ],
          },
          {
            name: "Quản lý kho",
            decentralizationName: "inventory_list",
            componentChilds: [
              {
                name: "Tồn kho",
                decentralizationName: "inventory_list",
              },
              {
                name: "Phiếu kiểm kho",
                decentralizationName: "inventory_tally_sheet",
              },
              {
                name: "Nhập hàng",
                decentralizationName: "inventory_import",
              },
              {
                name: "Chuyển kho",
                decentralizationName: "transfer_stock",
              },
              {
                name: "Nhà cung cấp",
                decentralizationName: "supplier",
              },
            ],
          },
        ],
      },
      {
        name: "Quản lý báo cáo",
        components: [
          {
            name: "Báo cáo",
            decentralizationName: "report_overview",
            componentChilds: [
              {
                name: "Báo cáo chung",
                decentralizationName: "report_overview",
              },
              {
                name: "Báo cáo kho",
                decentralizationName: "report_inventory",
              },
              {
                name: "Báo cáo tài chính",
                decentralizationName: "report_finance",
              },
              {
                name: "Thu chi",
                decentralizationName: "revenue_expenditure",
                componentChilds: [],
              },
              {
                name: "Báo cáo thanh toán",
                decentralizationName: "report_payment",
                componentChilds: [],
              },
            ],
          },
        ],
      },
      {
        name: "Khách hàng/Đối tác",
        components: [
          {
            name: "Khách hàng",
            decentralizationName: "customer_list",
            componentChilds: [
              {
                name: "DS khách hàng",
                decentralizationName: "customer_list",
                componentChilds: [],
              },
              {
                name: "Xu thưởng",
                decentralizationName: "customer_config_point",
                componentChilds: [],
              },
              {
                name: "Chat với khách hàng",
                decentralizationName: "chat_list",
                componentChilds: [],
              },
              {
                name: "Nhóm khách hàng",
                decentralizationName: "group_customer",
                componentChilds: [],
              },
              {
                name: "Chỉnh sửa vai trò",
                decentralizationName: "customer_role_edit",
                componentChilds: [],
              },
              {
                name: "Chỉnh sửa xu",
                decentralizationName: "customer_change_point",
                componentChilds: [],
              },
              {
                name: "Chỉnh sửa SĐT người giới thiệu",
                decentralizationName: "customer_change_referral",
                componentChilds: [],
              },
              {
                name: "Export DS khách hàng",
                decentralizationName: "customer_list_export",
                componentChilds: [],
              },
              {
                name: "Import DS khách hàng",
                decentralizationName: "customer_list_import",
                componentChilds: [],
              },
            ],
          },
          {
            name: "Cộng tác viên",
            decentralizationName: "collaborator_list",
            componentChilds: [
              {
                name: "Quản lý cộng tác viên",
                decentralizationName: "collaborator_list",
                componentChilds: [],
              },
              {
                name: "Danh sách CTV",
                decentralizationName: "collaborator_view",
                componentChilds: [],
              },
              {
                name: "Cấu hình CTV",
                decentralizationName: "collaborator_config",
                componentChilds: [],
              },
              {
                name: "Yêu cầu làm CTV",
                decentralizationName: "collaborator_register",
                componentChilds: [],
              },
              {
                name: "Top doanh số",
                decentralizationName: "collaborator_top_sale",
                componentChilds: [],
              },
              {
                name: "Danh sách yêu cầu thanh toán",
                decentralizationName: "collaborator_payment_request_list",
                componentChilds: [],
              },
              {
                name: "Lịch sử thanh toán",
                decentralizationName: "collaborator_payment_request_history",
                componentChilds: [],
              },
              {
                name: "Thay đổi số dư CTV",
                decentralizationName: "collaborator_add_sub_balance",
                componentChilds: [],
              },
            ],
          },
          {
            name: "Đại lý",
            decentralizationName: "agency_list",
            componentChilds: [
              {
                name: "Quản lý đại lý",
                decentralizationName: "agency_list",
                componentChilds: [],
              },
              {
                name: "Danh sách đại lý",
                decentralizationName: "agency_view",
                componentChilds: [],
              },
              {
                name: "Cấu hình đại lý",
                decentralizationName: "agency_config",
                componentChilds: [],
              },
              {
                name: "Yêu cầu làm đại lý",
                decentralizationName: "agency_register",
                componentChilds: [],
              },
              {
                name: "Top nhập hàng",
                decentralizationName: "agency_top_import",
                componentChilds: [],
              },
              {
                name: "Chương trình thưởng đại lý",
                decentralizationName: "agency_bonus_program",
                componentChilds: [],
              },
              {
                name: "Top hoa hồng",
                decentralizationName: "agency_top_commission",
                componentChilds: [],
              },
              {
                name: "Danh sách yêu cầu thanh toán",
                decentralizationName: "agency_payment_request_list",
                componentChilds: [],
              },
              {
                name: "Lịch sử thanh toán",
                decentralizationName: "agency_payment_request_history",
                componentChilds: [],
              },
              {
                name: "Thay đổi số dư đại lý",
                decentralizationName: "agency_add_sub_balance",
                componentChilds: [],
              },
              {
                name: "Thay đổi cấp  đại lý",
                decentralizationName: "agency_change_level",
                componentChilds: [],
              },
            ],
          },
          {
            name: "Sale",
            decentralizationName: "sale_list",
            componentChilds: [
              {
                name: "Quản lý sale",
                decentralizationName: "sale_list",
                componentChilds: [],
              },
              {
                name: "Danh sách sale",
                decentralizationName: "sale_view",
                componentChilds: [],
              },
              {
                name: "Cấu hình sale",
                decentralizationName: "sale_config",
                componentChilds: [],
              },
              {
                name: "Top sale",
                decentralizationName: "sale_top",
                componentChilds: [],
              },
            ],
          },
          // {
          //   name: "Onsale",
          //   decentralizationName: "onsale_list",
          //   componentChilds: [
          //     {
          //       name: "Danh sách onsale",
          //       decentralizationName: "onsale_list",
          //       componentChilds: [],
          //     },
          //     {
          //       name: "Thêm khách hàng onsale",
          //       decentralizationName: "onsale_add",
          //       componentChilds: [],
          //     },
          //     {
          //       name: "Cập nhập khách hàng onsale",
          //       decentralizationName: "onsale_edit",
          //       componentChilds: [],
          //     },
          //     {
          //       name: "Xóa khách hàng onsale",
          //       decentralizationName: "onsale_remove",
          //       componentChilds: [],
          //     },
          //     {
          //       name: "Gán khách hàng onsale cho nhân viên",
          //       decentralizationName: "onsale_assignment",
          //       componentChilds: [],
          //     },
          //   ],
          // },
        ],
      },
      {
        name: "Cài đặt và khác",
        components: [
          {
            name: "Cài đặt",
            decentralizationName: "setting",
            componentChilds: [
              {
                name: "Chi nhánh",
                decentralizationName: "branch_list",
              },
              {
                name: "Nhân viên",
                decentralizationName: "staff_list",
                componentChilds: [],
              },
              {
                name: "Public API Hook",
                decentralizationName: "config_setting",
              },
              {
                name: "Cài đặt chung",
                decentralizationName: "config_setting",
              },
              {
                name: "Cài đặt điều khoản đăng ký đại lý, ctv",
                decentralizationName: "config_terms_agency_collaborator",
              },
              {
                name: "Cài đặt SMS",
                decentralizationName: "config_sms",
              },
              {
                name: "Cài đặt mẫu in",
                decentralizationName: "invoice_template",
              },
              {
                name: "Cài đặt phân quyền",
                decentralizationName: "decentralization_list",
              },
              {
                name: "Cài đặt quảng cáo",
                decentralizationName: "banner_ads",
              },
            ],
          },
          {
            name: "Giao diện khách hàng",
            decentralizationName: "web_theme",
            componentChilds: [
              {
                name: "Tổng quan",
                decentralizationName: "web_theme_overview",
              },
              {
                name: "Màn hình trang chủ",
                decentralizationName: "web_theme_edit",
              },
              {
                name: "Liên hệ",
                decentralizationName: "web_theme_contact",
              },
              {
                name: "Hỗ trợ",
                decentralizationName: "web_theme_help",
              },
              {
                name: "Chân trang",
                decentralizationName: "web_theme_footer",
              },
              {
                name: "Banners",
                decentralizationName: "web_theme_banner",
              },
              {
                name: "SEO",
                decentralizationName: "web_theme_seo",
              },
            ],
          },
          {
            name: "Khác",
            decentralizationName: "delivery_pick_address_list",
            componentChilds: [
              {
                name: "Vận chuyển",
                decentralizationName: "delivery_pick_address_list",
              },
              {
                name: "Thanh toán",
                decentralizationName: "payment_list",
              },
              {
                name: "Lên lịch thông báo",
                decentralizationName: "notification_schedule_list",
              },
              {
                name: "Đánh giá khách hàng",
                decentralizationName: "customer_review_list",
              },
              {
                name: "Lịch sử thao tác",
                decentralizationName: "history_operation",
              },
              {
                name: "Gamification",
                decentralizationName: "gamification",
              },
            ],
          },
        ],
      },
    ];
  }
};

export const initialPermission = () => {
  var state = {
    name: "",
    description: "",
    report_payment: true,
    revenue_expenditure: false,
    accountant_time_sheet: false,
    product_list: false,
    product_add: false,
    product_update: false,
    product_copy: false,
    product_remove_hide: false,
    product_category_list: false,
    product_category_add: false,
    agency_list: false,
    agency_view: false,
    agency_change_level: false,
    communication_list: false,
    communication_update: false,
    communication_delete: false,
    communication_add: false,
    communication_approve: false,
    agency_register: false,
    agency_top_import: false,
    agency_bonus_program: false,
    agency_top_commission: false,
    agency_payment_request_list: false,
    agency_config: false,
    agency_payment_request: false,
    agency_payment_request_solve: false,
    agency_payment_request_history: false,
    product_category_update: false,
    product_category_remove: false,
    product_attribute_list: false,
    product_attribute_add: false,
    product_attribute_update: false,
    product_attribute_remove: false,
    product_ecommerce: false,
    product_commission: false,
    product_import_from_excel: true,
    product_export_to_excel: true,
    customer_list: false,
    customer_list_export: false,
    customer_list_import: false,
    customer_config_point: false,
    customer_review_list: false,
    customer_role_edit: false,
    customer_change_point: false,
    customer_change_referral: false,
    customer_review_censorship: false,
    promotion_discount_list: false,
    promotion_discount_add: false,
    promotion_discount_update: false,
    promotion_discount_end: false,
    promotion_voucher_list: false,
    sale_list: false,
    sale_view: false,
    sale_config: false,
    sale_top: false,
    onsale_list: false,
    onsale_edit: false,
    onsale_add: false,
    onsale_remove: false,
    onsale_assignment: false,
    promotion_voucher_add: false,
    promotion_voucher_update: false,
    promotion_voucher_end: false,
    promotion_combo_list: false,
    promotion_combo_add: false,
    promotion_combo_update: false,
    promotion_combo_end: false,
    promotion_bonus_product_list: false,
    promotion_bonus_product_add: false,
    promotion_bonus_product_update: false,
    promotion_bonus_product_end: false,
    promotion: false,
    post_list: false,
    store_info: false,
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
    order_list: false,
    order_export_to_excel: false,
    order_import_from_excel: false,
    order_allow_change_status: false,
    gamification: false,
    web_theme_edit: false,
    web_theme_overview: false,
    web_theme_contact: false,
    web_theme_help: false,
    web_theme_footer: false,
    web_theme_banner: false,
    web_theme_seo: false,
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
    collaborator_list: false,
    collaborator_view: false,
    collaborator_register: false,
    collaborator_top_sale: false,
    collaborator_config: false,
    collaborator_payment_request_list: false,
    collaborator_payment_request_solve: false,
    collaborator_payment_request_history: false,
    notification_to_stote: false,
    branch_list: false,
    timekeeping: false,
    supplier: false,
    setting_print: false,
    config_setting: false,
    config_terms_agency_collaborator: false,
    barcode_print: false,
    create_order_pos: false,
    change_price_pos: false,
    change_discount_pos: false,
    inventory_import: false,
    inventory_tally_sheet: false,
    inventory_list: false,
    add_revenue: false,
    add_expenditure: false,
    report_order: false,
    report_inventory: false,
    report_finance: false,
    chat_list: false,
    chat_allow: false,
    transfer_stock: false,
    report_view: false,
    report_overview: false,
    report_product: false,
    decentralization_list: false,
    decentralization_update: false,
    decentralization_add: false,
    decentralization_remove: false,
    staff_list: false,
    staff_update: false,
    staff_add: false,
    staff_remove: false,
    staff_delegating: false,
    collaborator_add_sub_balance: false,
    agency_add_sub_balance: false,
    onsale: false,
    train: false,
    train_add: false,
    train_update: false,
    train_delete: false,
    train_exam_list: false,
    train_exam_add: false,
    train_exam_update: false,
    train_exam_delete: false,
    train_exam_history: false,
    ecommerce_list: false,
    ecommerce_products: false,
    ecommerce_connect: false,
    ecommerce_orders: false,
    ecommerce_inventory: false,
    config_sms: false,
    invoice_template: false,
    banner_ads: false,
    group_customer: false,
    history_operation: false,
  };
  return { ...state };
};

export default permission;
