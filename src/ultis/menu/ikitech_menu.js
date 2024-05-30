export const ikitech_menu = [
  {
    title: "Menu",
    hasLinkShowWhenManyBranch: true,
    link: [
      {
        name: "Tổng quan",
        class: null,

        to: "/dashboard",
        icon: "fa fa-eye",
        isShowWhenManyBranch: true,
        exact: true,
      },

      {
        name: "Bán hàng tại quầy",
        class: "create_order_pos",

        icon: "fa-credit-card",
        exact: true,
        to: "/pos",
      },
      {
        name: "Đơn hàng",
        class: "order_list",
        isShowWhenManyBranch: true,
        icon: "fa-file-invoice",
        exact: true,
        to: "/order",
      },

      {
        name: "Sản phẩm",
        setOpenKey: ["/product/"],
        isShowWhenManyBranch: true,
        icon: "fas fa-th-large",
        open: "product",
        children: [
          {
            class: "product_list",
            display: "hide",
            name: "Sản phẩm",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/product/index",
          },
          {
            class: "product_category_list",
            display: "hide",
            name: "Danh mục sản phẩm",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/product/category",
          },
          {
            class: "product_attribute_list",
            display: "hide",
            name: "Thuộc tính tìm kiếm",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/product/attribute_searches",
          },

          // {
          //     class: "customer_config_point",
          //     display: "hide",
          //     name: "In mã vạch",
          //     exact: true,
          //     to: "/product/index",
          // },
        ],
      },
      // {
      //   name: "Sàn TMĐT",
      //   class: "ecommerce_list",
      //   setOpenKey: [
      //     "/ecommerce/manage",
      //     "/ecommerce/ecommerce_products/shopee",
      //     "/ecommerce/ecommerce_products/tiktok",
      //     "/ecommerce/ecommerce_products/lazada",
      //     "/ecommerce/ecommerce_products/tiki",
      //     "/ecommerce/ecommerce_orders/shopee",
      //     "/ecommerce/ecommerce_orders/tiktok",
      //     "/ecommerce/ecommerce_orders/lazada",
      //     "/ecommerce/ecommerce_orders/tiki",
      //   ],
      //   icon: "fas fa-th-large",
      //   open: "ecommerce",
      //   children: [
      //     {
      //       name: "Kết nối sàn TMĐT",
      //       class: "ecommerce_connect",
      //       display: "hide",
      //       exact: true,
      //       to: "/ecommerce/manage",
      //     },
      //     {
      //       class: "ecommerce_products",
      //       display: "hide",
      //       name: "Sản phẩm",
      //       exact: true,
      //       to: "",
      //       children: [
      //         {
      //           class: "ecommerce_products",
      //           display: "hide",
      //           name: "Shopee.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_products/shopee",
      //         },
      //         {
      //           class: "ecommerce_products",
      //           display: "hide",
      //           name: "Tiktok.com",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_products/tiktok",
      //         },
      //         {
      //           class: "ecommerce_products",
      //           display: "hide",
      //           name: "Lazada.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_products/lazada",
      //         },
      //         {
      //           class: "ecommerce_products",
      //           display: "hide",
      //           name: "Tiki.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_products/tiki",
      //         },
      //       ],
      //     },
      //     {
      //       class: "ecommerce_orders",
      //       display: "hide",
      //       name: "Đơn hàng",
      //       exact: true,
      //       to: "",
      //       children: [
      //         {
      //           class: "ecommerce_orders",
      //           display: "hide",
      //           name: "Shopee.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_orders/shopee",
      //         },
      //         {
      //           class: "ecommerce_orders",
      //           display: "hide",
      //           name: "Tiktok.com",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_orders/tiktok",
      //         },
      //         {
      //           class: "ecommerce_orders",
      //           display: "hide",
      //           name: "Lazada.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_orders/lazada",
      //         },
      //         {
      //           class: "ecommerce_orders",
      //           display: "hide",
      //           name: "Tiki.vn",
      //           exact: true,
      //           to: "/ecommerce/ecommerce_orders/tiki",
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        name: "Kho",
        setOpenKey: [
          "/product_inventory/index",
          "/inventory/index",
          "/import_stocks/index",
          "/transfer_stocks/index",
          "/supplier",
        ],
        isShowWhenManyBranch: true,
        icon: "fas fa-store",
        open: "inventory",
        children: [
          {
            class: "inventory_list",
            display: "hide",
            name: "Tồn kho",
            exact: true,
            to: "/product_inventory/index",
            isShowWhenManyBranch: true,
          },
          {
            class: "inventory_tally_sheet",
            display: "hide",
            name: "Phiếu kiểm kho",
            exact: true,
            to: "/inventory/index",
          },
          {
            class: "inventory_import",
            display: "hide",
            name: "Nhập hàng",
            exact: true,
            to: "/import_stocks/index",
          },
          {
            class: "transfer_stock",
            display: "hide",
            name: "Chuyển kho",
            exact: true,
            to: "/transfer_stocks/index",
          },
          {
            name: "Nhà cung cấp",
            class: "supplier",
            display: "hide",
            exact: true,
            to: "/supplier",
          },
        ],
      },

      {
        name: "Tin tức - Bài viết",
        setOpenKey: ["/posts/category", "/posts/index"],

        icon: "fas fa-newspaper",
        open: "posts",
        children: [
          {
            class: "post_list",
            display: "hide",
            name: "Danh mục bài viết",
            exact: true,
            to: "/posts/category",
          },
          {
            class: "post_list",
            display: "hide",
            name: "Tin tức - Bài viết",
            exact: true,
            to: "/posts/index",
          },

          // {
          //     class: "customer_config_point",
          //     display: "hide",
          //     name: "In mã vạch",
          //     exact: true,
          //     to: "/product/index",
          // },
        ],
      },

      {
        name: "Báo cáo",
        setOpenKey: [
          "/report",
          "/report_",
          "/revenue_expenditure",
          "/accountant/time_sheet/",
        ],
        isShowWhenManyBranch: true,
        icon: "fas fa-chart-bar",
        open: "report",
        children: [
          {
            class: "report_overview",
            display: "hide",
            name: "Báo cáo chung",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/report",
          },
          {
            class: "report_inventory",
            display: "hide",
            name: "Báo cáo kho ",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/report_inventory",
          },
          {
            class: "report_finance",
            display: "hide",
            name: "Báo cáo tài chính",
            isShowWhenManyBranch: true,
            exact: true,
            to: "/report_finance",
          },
          {
            // class: "report_finance",
            class: "revenue_expenditure",
            display: "hide",
            name: "Thu chi",
            exact: true,
            to: "/revenue_expenditure",
          },
          {
            class: "report",
            display: "show",
            name: "Báo cáo thanh toán",
            exact: true,
            to: "/report_pay",
          },
          {
            class: "report_product",
            display: "show",
            name: "Báo cáo sản phẩm",
            exact: true,
            to: "/report_product",
          },

          // {
          //   name: "Bảng công",
          //   // class: "timekeeping",
          //   class: "accountant_time_sheet",

          //   display: "hide",
          //   icon: "fas fa-fw fa-calendar-days",
          //   exact: true,
          //   to: "/accountant/time_sheet",
          // },
        ],
      },
      // {
      //   name: "Kế toán",
      //   setOpenKey: ["/revenue_expenditure", "/accountant/time_sheet/"],

      //   icon: "fas fa-coins",
      //   open: "revenue_expenditure",
      //   children: [
      //     {
      //       // class: "report_finance",
      //       class: "revenue_expenditure",
      //       display: "hide",
      //       name: "Thu chi",
      //       exact: true,
      //       to: "/revenue_expenditure",
      //     },

      //     {
      //       name: "Bảng công",
      //       // class: "timekeeping",
      //       class: "accountant_time_sheet",

      //       display: "hide",
      //       icon: "fas fa-fw fa-calendar-days",
      //       exact: true,
      //       to: "/accountant/time_sheet",
      //     },
      //   ],
      // },
      {
        name: "Khách hàng",
        setOpenKey: ["/customer", "/reward_point", "chat", "/group_customer"],
        ExcludeSetOpenKey: ["customer_sales"],
        icon: "fas fa-user",
        open: "customer",
        children: [
          {
            class: "customer_list",
            display: "hide",
            name: "Danh sách khách hàng",
            exact: true,
            to: "/customer",
          },
          {
            class: "customer_config_point",
            display: "hide",
            name: "Xu thưởng",
            exact: true,
            to: "/reward_point",
          },
          {
            name: "Chat với khách hàng",
            class: "chat_list",
            display: "hide",
            icon: "fa fa-comment-alt",
            exact: true,
            to: "/chat",
          },
          {
            name: "Nhóm khách hàng",
            class: "group_customer",
            display: "hide",
            icon: "fa fa-comment-alt",
            exact: true,
            to: "/group_customer",
          },
        ],
      },
      {
        name: "Đối tác bán hàng",
        setOpenKey: ["/collaborator", "/agency", "/sale"],
        icon: "fa fa-user",
        open: "setting2",
        children: [
          {
            name: "Cộng tác viên",
            class: "collaborator_list",
            display: "hide",
            exact: true,
            to: "/collaborator",
          },
          {
            name: "Đại lý",
            class: "agency_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/agency",
          },
          {
            name: "Sale",
            class: "sale_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/sale",
          },
        ],
      },
      // {
      //   name: "Onsale",
      //   setOpenKey: ["/customer_sales"],
      //   icon: "fas fa-user",
      //   open: "onsale_list",
      //   children: [
      //     {
      //       class: "onsale_list",
      //       display: "hide",
      //       name: "Tất cả",
      //       exact: true,
      //       params: "?status=",

      //       to: "/customer_sales",
      //     },
      //     {
      //       class: "onsale_list",
      //       display: "hide",
      //       name: "Cần tư vấn",
      //       exact: true,
      //       params: "?status=0",

      //       to: "/customer_sales",
      //     },
      //     {
      //       class: "onsale_list",
      //       display: "hide",
      //       name: "Đang tư vấn",
      //       exact: true,
      //       params: "?status=1",
      //       to: "/customer_sales",
      //     },
      //     {
      //       class: "onsale_list",
      //       display: "hide",
      //       name: "Thành công",
      //       exact: true,
      //       params: "?status=2",

      //       to: "/customer_sales",
      //     },
      //     {
      //       class: "onsale_list",
      //       display: "hide",
      //       name: "Thất bại",

      //       exact: true,
      //       params: "?status=3",

      //       to: "/customer_sales",
      //     },
      //   ],
      // },

      // {
      //   class: "revenue_expenditure",
      //   name: "Kế toán",
      //   display: "hide",
      //   icon: "fa-coins",
      //   exact: true,
      //   to: "/accountant",
      //   itemHasTabName: "agency",
      // },

      // {
      //   name: "Chấm công",
      //   icon: "fa fa-calendar",
      //   class: "timekeeping",
      //   setOpenKey: [
      //     "/shift",
      //     "/calendar_shift",
      //     "/time_sheet",
      //     "/work_location",
      //     "/request",
      //   ],
      //   ExcludeSetOpenKey: ["/accountant/time_sheet/"],

      //   open: "timekeeping",

      //   children: [
      //     {
      //       class: "timekeeping",
      //       name: "Ca làm việc",
      //       display: "hide",
      //       icon: "fas fa-clock-nin",
      //       exact: true,
      //       to: "/shift",

      //       // class: "timekeeping_shift",
      //     },
      //     {
      //       name: "Lịch làm việc",
      //       class: "timekeeping",
      //       display: "hide",
      //       icon: "fas fa-fw fa-calendar-days",
      //       exact: true,
      //       to: "/calendar_shift",
      //     },
      //     {
      //       name: "Bảng công",
      //       class: "timekeeping",

      //       display: "hide",
      //       icon: "fas fa-fw fa-calendar-days",
      //       exact: true,
      //       to: "/time_sheet",
      //     },
      //     {
      //       name: "Địa điểm làm việc",
      //       class: "timekeeping",
      //       display: "hide",
      //       icon: "fas fa-fw fa-location-dot",

      //       exact: true,
      //       to: "/work_location",
      //     },
      //     {
      //       name: "Xử lý yêu cầu",
      //       class: "timekeeping",
      //       display: "hide",
      //       icon: "fas fa-fw fa-location-dot",

      //       exact: true,
      //       to: "/request",
      //     },
      //   ],
      // },
      // {
      //   name: "Đào tạo",
      //   class: "train",

      //   icon: "fas fa-book-open",
      //   exact: true,
      //   to: "/train/course",
      // },

      {
        name: "Đào tạo",
        setOpenKey: ["/train/course", "/train/history"],
        icon: "fas fa-book-open",
        open: "train",
        children: [
          {
            name: "Khóa học đào tạo",
            class: "train",
            display: "hide",
            exact: true,
            to: "/train/course",
          },
          {
            name: "Lịch sử đào tạo",
            class: "train_exam_history",
            display: "hide",
            icon: "fa fa-history",
            exact: true,
            to: "/train/history",
          },
        ],
      },
      // {
      //   name: "Đào tạo",
      //   icon: "fas fa-book-open",
      //   class: "timekeeping",
      //   setOpenKey : ["/shift" , "/calendar_shift" , "/time_sheet" , "/work_location" , "/request"],
      //   ExcludeSetOpenKey : ["/accountant/time_sheet/"],

      //   open: "timekeeping",

      //   children: [

      //     {

      //       name: "Khóa học",
      //       class: "timekeeping",
      //       display: "hide",
      //       icon: "fas fa-fw fa-location-dot",

      //       exact: true,
      //       to: "/train/course",
      //     },
      //     // {

      //     //   name: "Chương - Bài học",
      //     //   class: "timekeeping",
      //     //   display: "hide",
      //     //   icon: "fas fa-book",

      //     //   exact: true,
      //     //   to: "/train/lesson",
      //     // },
      //   ],
      // },

      {
        class: "promotion",
        name: "Chương trình khuyến mại",
        icon: "fas fa-money-bill-alt",
        setOpenKey: ["/discount", "/voucher", "/combo", "/bonus_product"],
        open: "promotion",
        children: [
          {
            name: "Giảm giá sản phẩm",
            class: "promotion_discount_list",
            display: "hide",
            icon: "fas-usd-circle",
            exact: true,
            to: "/discount",
          },
          {
            name: "Voucher giảm giá hóa đơn",
            class: "promotion_voucher_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/voucher",
          },
          {
            name: "Combo giảm giá",
            class: "promotion_combo_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/combo",
          },
          {
            name: "Thưởng sản phẩm",
            class: "promotion_bonus_product_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/bonus_product",
          },
        ],
      },
      {
        name: "Gamification",
        icon: "fas fa-dice-d20",
        setOpenKey: ["/game_spin_wheels", "/game_guess_numbers"],
        open: "gamification",
        children: [
          {
            name: "Game quay thưởng",
            class: "gamification",
            display: "hide",
            exact: true,
            to: "/game_spin_wheels",
          },
          {
            name: "Game dự đoán kết quả",
            class: "gamification",
            display: "hide",
            exact: true,
            to: "/game_guess_numbers",
          },
        ],
      },
      {
        name: "Cài đặt",
        icon: "fas fa-cogs",
        setOpenKey: [
          "/theme",
          "/setting/index",
          "/branch/index",
          "/staff/index",
          "/decentralization/index",
          "/config_sms",
          "/invoice_template/index",
          "/banner_ads",
        ],

        open: "setting",
        children: [
          {
            name: "Chỉnh sửa website",
            class: "web_theme_overview",
            display: "hide",
            exact: true,
            to: "/theme",
          },

          {
            name: "Chi nhánh",
            class: "branch_list",
            display: "hide",
            exact: true,
            to: "/branch/index",
          },
          {
            name: "Nhân viên",
            class: "staff_list",
            display: "hide",
            exact: true,
            to: "/staff/index",
          },

          {
            name: "Chọn mẫu in",
            class: "invoice_template",
            display: "hide",
            exact: true,
            to: "/invoice_template/index",
          },
          {
            name: "Cài đặt phân quyền",
            class: "decentralization_list",
            display: "hide",
            exact: true,
            to: "/decentralization/index",
          },

          {
            name: "Cài đặt quảng cáo",
            display: "hide",
            exact: true,
            to: "/banner_ads",
            class: "banner_ads",
          },
          {
            name: "Cài đặt chung",
            class: "config_setting",
            display: "hide",
            exact: true,
            to: "/setting/index",
          },
          {
            name: "Cài đặt SMS",
            class: "config_sms",
            display: "hide",
            exact: true,
            to: "/config_sms",
          },
        ],
      },

      {
        name: "Khác",
        icon: "fas fa-th-list",
        open: "another",
        setOpenKey: [
          "/store_address",
          "/shipment",
          "payment",
          "review",
          "/notifications/schedule",
          "popup",
          "/history_operation",
          "/manual",
        ],

        children: [
          {
            name: "Địa chỉ giao vận",
            class: "delivery_pick_address_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/store_address",
          },
          {
            name: "Đơn vị vận chuyển",
            class: "delivery_pick_address_list",

            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/shipment",
          },

          {
            name: "Phương thức thanh toán",
            class: "payment_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/payment",
          },

          {
            name: "Đánh giá",
            class: "customer_review_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/review",
          },
          {
            name: "Lên lịch thông báo",
            class: "notification_schedule_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/notifications/schedule",
          },
          {
            name: "Lịch sử thao tác",
            class: "history_operation",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/history_operation",
          },
          {
            name: "Public API Hook",
            class: "config_setting",
            display: "show",
            exact: true,
            to: "/config_public_api_hook",
          },
          {
            name: "Hỗ trợ & hướng dẫn",
            class: "notification_schedule_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/manual",
          },
        ],
      },
    ],
  },
  {
    title: "Cài đặt riêng",
    hasLinkShowWhenManyBranch: false,
    link: [
      {
        class: "isVip",
        display: "hide",
        name: "Cài đặt cho VIP",
        icon: "fa-suitcase",
        exact: true,
        to: "/vip",
        isVip: true,
      },
    ],
  },
];
