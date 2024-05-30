import getChannel, { IKITECH, IKIPOS } from "./channel";
const permission = (channel) => {
  // if (getChannel() == IKITECH) {
  //     return [
  //         {
  //             name: "Quản lý chung",
  //             header: [
  //                 "Xem thông báo đến cửa hàng",
  //                 "Xem DS Chat",
  //                 "Cho phép chat",
  //                 "Xem báo cáo",
  //                 "Xem đơn hàng",
  //                 "Thay đổi trạng thái đơn hàng"
  //             ]
  //             , body: ["notification_to_stote", "chat_list", "chat_allow", "report_view", "order_list", "order_allow_change_status"]
  //         },
  //         {
  //             name: "Quản lý phân quyền",
  //             header: [
  //                 "Xem danh sách",
  //                 "Cập nhật",
  //                 "Thêm mới",
  //                 "Xóa"]
  //             , body: ["decentralization_list", "decentralization_update", "decentralization_add", "decentralization_remove"]
  //         },
  //         {
  //             name: " Quản lý nhân viên ",
  //             header: [
  //                 "Xem danh sách",
  //                 "Cập nhật",
  //                 "Thêm mới",
  //                 "Xóa",
  //                 // "Uỷ quyền"

  //             ]
  //             , body: ["staff_list", "staff_update", "staff_add", "staff_remove"]
  //         },
  //         {
  //             name: " Quản lý khách hàng ",
  //             header: [
  //                 "Xem DS khách hàng",
  //                 "Cấu hình điểm thưởng",
  //                 "Danh sách đánh giá",
  //                 "Kiểm duyệt đánh giá"]
  //             , body: ["customer_list", "customer_config_point", "customer_review_list", "customer_review_censorship"]
  //         },
  //         {
  //             name: "Chỉnh sửa Web",
  //             header: [
  //                 "Truy cập chỉnh sửa",
  //                 "Tổng quan Web",
  //                 "Liên hệ Web",
  //                 "Hỗ trợ Web",
  //                 "Chân trang web",
  //                 "Banner Web",
  //                 "Chỉnh sửa App",
  //                 "Chỉnh sửa cấu hình",
  //                 "Nút liên hệ",
  //                 "Màn hình trang chủ",
  //                 "Thành phần chính",
  //                 "Màn hình danh mục sản phẩm",
  //                 "Màn hình sản phẩm",
  //                 "Màn hình liên hệ",

  //             ]
  //             , body: ["web_theme_edit",
  //                 "web_theme_overview",
  //                 "web_theme_contact", "web_theme_help", "web_theme_footer", "web_theme_banner", "app_theme_edit",
  //                 "app_theme_main_config",
  //                 "app_theme_button_contact",
  //                 "app_theme_home_screen", "app_theme_main_component",
  //                 "app_theme_category_product", "app_theme_product_screen", "app_theme_contact_screen"]
  //         },

  //         {
  //             name: "  Quản lý sản phẩm",
  //             header: [
  //                 "Xem danh sách sản phẩm",
  //                 "Cập nhật sản phẩm",
  //                 "Thêm mới sản phẩm",
  //                 "Xóa sản phẩm",

  //                 "Xem danh sách thuộc tính sản phẩm",
  //                 "Thêm mới thuộc tính sản phẩm",
  //                 "Xóa thuộc tính sản phẩm",

  //                 "Import Excel",
  //                 "Export Export",
  //                 "Lấy sản phẩm từ sàn TMĐT",

  //                 "Xem danh sách danh mục sản phẩm",
  //                 "Cập nhật danh mục sản phẩm",
  //                 "Thêm mới sản phẩm",
  //                 "Xóa danh mục sản phẩm",
  //             ]
  //             , body: ["product_list", "product_update", "product_add",
  //                 "product_remove_hide", "product_attribute_list",

  //                 "product_attribute_add",
  //                 "product_attribute_remove",
  //                 "product_import_from_exel",
  //                 "product_export_to_exel", "product_ecommerce", "product_category_list", "product_category_update",
  //                 "product_category_add", "product_category_remove"]
  //         },
  //         {
  //             name: "CT Giảm giá ",
  //             header: [
  //                 "Xem danh sách giảm giá SP ",
  //                 "Cập nhật chương trình giảm giá SP",
  //                 "Thêm mới chương trình giảm giá SP",
  //                 "Kết thúc chường trình giảm giá SP",
  //                 "Xem danh sách Voucher SP ",
  //                 "Cập nhật chương trình Voucher SP",
  //                 "Thêm mới chương trình Voucher SP",
  //                 "Kết thúc chường trình Voucher SP",
  //                 "Xem danh sách Combo SP ",
  //                 "Cập nhật chương trình Combo SP",
  //                 "Thêm mới chương trình Combo SP",
  //                 "Kết thúc chường trình Combo SP",

  //             ]
  //             , body: ["promotion_discount_list", "promotion_discount_update", "promotion_discount_add", "promotion_discount_end",
  //                 "promotion_voucher_list", "promotion_voucher_update", "promotion_voucher_add", "promotion_voucher_end", "promotion_combo_list", "promotion_combo_update", "promotion_combo_add", "promotion_combo_end"]
  //         },

  //         {
  //             name: "Quản lý bài viết",
  //             header: [
  //                 "Xem danh sách bái viết",
  //                 "Cập nhật bài viết",
  //                 "Thêm mới bài viết",
  //                 "Xóa bài viết",
  //                 "Xem danh sách danh mục bài viết",
  //                 "Cập nhật danh mục bài viết",
  //                 "Thêm mới danh mục bài viết",
  //                 "Xóa danh mục danh mục",

  //             ]
  //             , body: ["post_list", "post_update", "post_add", "post_remove_hide", "post_category_list", "post_category_update", "post_category_add", "post_category_remove"]
  //         },

  //         {
  //             name: "Quản lý giao hàng và địa chỉ",
  //             header: [
  //                 "Danh sách địa chỉ lấy hàng",
  //                 "Chỉnh sửa địa chỉ",
  //                 "Chỉnh sửa bên cung cấp giao vận",

  //             ]
  //             , body: ["delivery_pick_address_list", "delivery_pick_address_update", "delivery_provider_update"]
  //         },
  //         {
  //             name: "Quản lý thanh toán",
  //             header: [
  //                 "Xem danh sách",
  //                 "Bật tắt nhà thanh toán",

  //             ]
  //             , body: ["payment_list", "payment_on_off"]
  //         },
  //         {
  //             name: "Quản lý thông báo",
  //             header: [
  //                 "Danh sách",
  //                 "Cập nhật lịch/Tiếp tục/Tạm dừng",
  //                 "Thêm lịch",
  //                 "Xóa lịch",
  //                 "Danh sách Popup",
  //                 "Cập nhật Popup",
  //                 "Thêm Popup",
  //                 "Xóa Popup",
  //             ]
  //             , body: ["notification_schedule_list", "notification_schedule_update",
  //                 "notification_schedule_add", "notification_schedule_remove_pause",
  //                 "popup_list", "popup_update", "popup_add", "popup_remove"]
  //         },
  //         {
  //             name: " Quản lý CTV ",
  //             header: [
  //                 "Cấu hình",
  //                 "Xem DS",
  //                 "Xem DS yêu cầu thanh toán",
  //                 "Cho phép hủy hoặc thanh toán",
  //                 "Xem lịch sử yêu cầu thanh toán",
  //             ]
  //             , body: ["collaborator_config", "collaborator_list", "collaborator_payment_request_list", "collaborator_payment_request_solve", "collaborator_payment_request_history"]
  //         },

  //     ]
  // }
  if (getChannel() == IKITECH) {
    return [
      {
        name: "Quản lý chung",
        header: [
          "Thông tin cửa hàng",
          "Khóa học",
          "Chương trình KM",
          "Thông báo tới cửa hàng",
          "Chi nhánh",
          "Kế toán",
          "Chat",
        ],
        body: [
          "store_info",
          "train",
          "promotion",
          "notification_to_stote",
          "branch_list",
          "revenue_expenditure",
          "chat_list",
        ],
      },
      // {
      //     name: "Quản lý đơn hàng",
      //     header: [

      //         "Tạo đơn hàng",
      //         "Xem hóa đơn"
      //     ]
      //     , body: ["create_order_pos", "order_list"]
      // },
      {
        name: "Quản lý kho & đơn hàng",
        header: [
          "Nhập hàng",
          "Kiểm kho",
          "Chuyển kho",
          "Kho hàng",
          "Tạo đơn hàng",
          "Xem hóa đơn",
        ],
        body: [
          "inventory_import",
          "inventory_tally_sheet",
          "transfer_stock",
          "inventory_list",
          "create_order_pos",
          "order_list",
        ],
      },
      {
        name: "Quản lý sản phẩm & Bài viết",
        header: ["Danh sách sản phẩm", "Danh mục sản phẩm", "Tin tức bài viết"],
        body: ["product_list", "product_category_list", "post_list"],
      },
      // {
      //     name: "Quản lý thu chi",
      //     header: [

      //         "Tạo khoản thu",
      //         "Tạo khoản chi"
      //     ]
      //     , body: ["add_revenue", "add_expenditure"]
      // },
      {
        name: "Báo cáo & Thu chi",
        header: [
          "Báo cáo bán hàng",
          "Báo cáo kho",
          "Báo cáo tài chính",
          "Tạo khoản thu",
          "Tạo khoản chi",
        ],
        body: [
          "report_overview",
          "report_inventory",
          "report_finance",
          "add_revenue",
          "add_expenditure",
          "report_payment",
        ],
      },
      {
        name: "Đối tác bán hàng & Onsale",
        header: [
          "Cộng tác viên",
          "Đại lý",
          "Sale",
          "Truy cập onsale",
          "Danh sách onsale",
          "Phân công nhân viên",
          "Xóa onsale",
          "Thay đổi số dư cộng tác viên",
          "Thay đổi số dư đại lý",
        ],
        body: [
          "collaborator_list",
          "agency_list",
          "sale_list",
          "onsale",
          "onsale_assignment",
          "onsale_edit",
          "onsale_remove",
          "collaborator_add_sub_balance",
          "agency_add_sub_balance",
        ],
      },
      {
        name: "Quản lý nhân viên & khách hàng",
        header: ["Khách hàng", "Nhân viên", "Nhà cung cấp"],
        body: ["customer_list", "staff_list", "supplier"],
      },
      {
        name: "Gamification",
        header: ["Cài đặt Game"],
        body: ["gamification"],
      },
      {
        name: "Sàn thương mại điện tử",
        header: [
          "Danh sách kết nối",
          "Danh sách sản phẩm",
          "Danh sách đơn hàng",
          "Quản lý tồn kho",
        ],
        body: [
          "ecommerce_connect",
          "ecommerce_products",
          "ecommerce_orders",
          "ecommerce_inventory",
        ],
      },
      {
        name: "Cài đặt",
        header: [
          "Cài đặt máy in",
          "Cài đặt xu KH",
          "Cài đặt chung",
          "Cài đặt SMS",
          "In mã vạch",
          "Chấm công",
          "Phân quyền",
        ],
        body: [
          "setting_print",
          "customer_config_point",
          "config_setting",
          "config_sms",
          "barcode_print",
          "timekeeping",
          "decentralization_list",
        ],
      },
      {
        name: "Khác",
        header: [
          "Vận chuyển",
          "Thanh toán",
          "Lên lịch thông báo",
          "Đánh giá khách hàng",
          "Giao diện khách hàng",
        ],
        body: [
          "delivery_pick_address_list",
          "payment_list",
          "notification_schedule_list",
          "customer_review_list",
          "web_theme_edit",
        ],
      },
    ];
  }
  if (getChannel() == IKIPOS) {
    return [
      {
        name: "Quản lý chung",
        header: [
          "Thông tin cửa hàng",
          "Phân quyền",
          "Chương trình KM",
          "Thông báo tới khách hàng",
          "Chi nhánh",
          "Chấm công",
          "Kế toán",
        ],
        body: [
          "store_info",
          "decentralization_list",
          "promotion",
          "notification_to_stote",
          "branch_list",
          "timekeeping",
          "revenue_expenditure",
        ],
      },
      {
        name: "Quản lý đơn hàng",
        header: ["Tạo đơn hàng", "Xem hóa đơn"],
        body: ["create_order_pos", "order_list"],
      },
      {
        name: "Quản lý kho",
        header: ["Nhập hàng", "Kiểm kho", "Kho hàng"],
        body: ["inventory_import", "inventory_tally_sheet", "inventory_list"],
      },
      {
        name: "Quản lý sản phẩm",
        header: ["Danh sách sản phẩm", "Danh mục sản phẩm"],
        body: ["product_list", "product_category_list"],
      },
      {
        name: "Quản lý thu chi",
        header: ["Tạo khoản thu", "Tạo khoản chi"],
        body: ["add_revenue", "add_expenditure"],
      },
      {
        name: "Báo cáo",
        header: ["Báo cáo bán hàng", "Báo cáo kho", "Báo cáo tài chính", "Báo cáo thanh toán"],
        body: ["report_overview", "report_inventory", "report_finance", "report_payment"],
      },
      {
        name: "Quản lý nhân viên & khách hàng",
        header: ["Khách hàng", "Nhân viên", "Nhà cung cấp"],
        body: ["customer_list", "staff_list", "supplier"],
      },
      {
        name: "Sàn thương mại điện tử",
        header: [
          "Danh sách kết nối",
          "Danh sách sản phẩm",
          "Danh sách đơn hàng",
          "Quản lý tồn kho",
        ],
        body: [
          "ecommerce_connect",
          "ecommerce_products",
          "ecommerce_orders",
          "ecommerce_inventory",
        ],
      },
      {
        name: "Cài đặt",
        header: [
          "Cài đặt máy in",
          "Cài đặt xu KH",
          "Cài đặt chung",
          "In mã vạch",
        ],
        body: [
          "setting_print",
          "customer_config_point",
          "config_setting",
          "barcode_print",
        ],
      },
    ];
  }
};

export const initialPermission = () => {
  var state = {
    revenue_expenditure: false,
    name: "",
    description: "",
    report_payment: true,
    product_list: false,
    product_add: false,
    product_update: false,
    product_remove_hide: false,
    product_category_list: false,
    product_category_add: false,
    agency_list: false,
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
    sale_list: false,
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
    order_list: true,
    order_allow_change_status: true,
    gamification: false,
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
    collaborator_list: false,
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
    barcode_print: false,
    create_order_pos: false,
    order_list: false,
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
    onsale: false,
    train: false,
    ecommerce_list: false,
    ecommerce_products: false,
    ecommerce_connect: false,
    ecommerce_orders: false,
    ecommerce_inventory: false,
    config_sms: false,
  };
  return { ...state };
};

export default permission;
