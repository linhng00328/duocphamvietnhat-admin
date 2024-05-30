export const ikipos_menu = [
    {
        title: "Menu",
        link: [
            {
                name: "Tổng quan",
                class: null,

                to: "/dashboard",
                icon: "fa fa-eye",

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

                icon: "fa-file-invoice",
                exact: true,
                to: "/order",
            },

          
            {
                name: "Sản phẩm",
                setOpenKey : ["/product/"],
                icon: "fas fa-th-large",
                open: "product",
                children: [
                    {
                        class: "product_category_list",
                        display: "hide",
                        name: "Danh mục sản phẩm",
                        exact: true,
                        to: "/product/category",
                    },
                    {
                        class: "product_list",
                        display: "hide",
                        name: "Sản phẩm",
                        exact: true,
                        to: "/product/index",
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
                name: "Kho hàng",
                setOpenKey : ["/product_inventory/index" , "/inventory/index" , "/import_stocks/index" , "/transfer_stocks/index" , "/supplier" ],

                icon: "fas fa-store",
                open: "inventory",
                children: [
                    {
                        class: "inventory_list",
                        display: "hide",
                        name: "Tồn kho",
                        exact: true,
                        to: "/product_inventory/index",
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
                ],
            },


           
         
            // {   
            //     class: ["add_revenue", "add_expenditure"],

            //     name: "Thu chi",
            //     display: "hide",
            //     icon: "fa fa-money",
            //     exact: true,
            //     to: "/revenue_expenditure",
            //     itemHasTabName: "agency",
            // },
            // {
            //     class : "revenue_expenditure",
            //     name: "Kế toán",
            //     display: "hide",
            //     icon: "fa-coins",
            //     exact: true,
            //     to: "/accountant",
            //     itemHasTabName: "agency",
            // },

            {
                name: "Báo cáo",
                setOpenKey : ["/report" , "/report_"],

                icon: "fas fa-chart-bar",
                open: "report",
                children: [
                    {
                        class: "report_overview",
                        display: "hide",
                        name: "Báo cáo chung",
                        exact: true,
                        to: "/report",
                    },
                    {
                        class: "report_inventory",
                        display: "hide",
                        name: "Báo cáo kho ",
                        exact: true,
                        to: "/report_inventory",
                    },
                    {
                        class: "report_finance",
                        display: "hide",
                        name: "Báo cáo tài chính",
                        exact: true,
                        to: "/report_finance",
                    },
                    {
                        class: null,
                        display: "show",
                        name: "Báo cáo thanh toán",
                        exact: true,
                        to: "/report_payment",
                    },
                ],
            },
            {
                name: "Kế toán",
                setOpenKey : ["/revenue_expenditure" , "/time_sheet"],

                icon: "fas fa-coins",
                open: "revenue_expenditure",
                children: [
                  {
                    class: "report_finance",
                    display: "hide",
                    name: "Thu chi",
                    exact: true,
                    to: "/revenue_expenditure",
                  },
        
                  {
        
                    name: "Bảng công",
                    class: "timekeeping",
        
                    display: "hide",
                    icon: "fas fa-fw fa-calendar-days",
                    exact: true,
                    to: "/time_sheet",
                  },
                
                 
                ],
              },
              {
                name: "Khách hàng",
                setOpenKey : ["/customer" , "/reward_point" , "chat"],

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
                ],
            },
            {
                name: "Nhà cung cấp",
                class: "supplier",
                display: "hide",
                icon: "fas fa-building",
                exact: true,
                to: "/supplier",
            },


            {
                name: "Chấm công",
                icon: "fa fa-calendar",
                class  : "timekeeping",
                setOpenKey : ["/shift" , "/calendar_shift" , "/time_sheet" , "/work_location" , "/request"],
                open: "timekeeping",
        
                children: [
                  {
                      class: "timekeeping",
                    name: "Ca làm việc",
                    display: "hide",
                    icon: "fas fa-clock-nin",
                    exact: true,
                    to: "/shift",
        
                    // class: "timekeeping_shift",
                  },
                  {
        
                    name: "Lịch làm việc",
                    class  : "timekeeping",
                    display: "hide",
                    icon: "fas fa-fw fa-calendar-days",
                    exact: true,
                    to: "/calendar_shift",
                  },
                  {
        
                    name: "Bảng công",
                    class  : "timekeeping",

                    display: "hide",
                    icon: "fas fa-fw fa-calendar-days",
                    exact: true,
                    to: "/time_sheet",
                  },
                  {
        
                    name: "Địa điểm làm việc",
                    class  : "timekeeping",
                    display: "hide",
                    icon: "fas fa-fw fa-location-dot",
        
                    exact: true,
                    to: "/work_location",
                  },
                  {
        
                    name: "Xử lý yêu cầu",
                    class  : "timekeeping",
                    display: "hide",
                    icon: "fas fa-fw fa-location-dot",
        
                    exact: true,
                    to: "/request",
                  },
                ],
              },


              {
                  class : "promotion",
                name: "Chương trình khuyến mại",
                setOpenKey : ["/discount" , "/voucher" , "/combo" ],

                icon: "fas fa-money-bill-alt",
                open: "promotion",
                children: [
                    {
                        name: "Giảm giá sản phẩm",
                        class: "promotion",
                        display: "hide",
                        icon: "fas-usd-circle",
                        exact: true,
                        to: "/discount",
                    },
                    {
                        name: "Voucher giảm giá hóa đơn",
                        class: "promotion",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/voucher",
                    },
                    {
                        name: "Combo giảm giá",
                        class: "promotion",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/combo",
                    },
                ],
            },
            {
                name: "Cài đặt",
                setOpenKey : ["/theme" , "/branch/index" , "/staff/index" , "/decentralization/index" ],

                icon: "fas fa-cogs",
                open: "setting",
                children: [
                    // {
                    //   name: "Chỉnh sửa giao diện",
                    //   class : "web_theme_edit",
                    //   display : "hide",
                    //   exact: true,
                    //   to: "/theme",
                    // },
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
                        name: "Cài đặt phân quyền",
                        class: "decentralization_list",
                        display: "hide",
                        exact: true,
                        to: "/decentralization/index",
                    },
                
                    {
                        name: "Cài đặt chung",
                        class: "config_setting",
                        display: "hide",
                        exact: true,
                        to: "/setting/index",
                    },
                ],
            },


        ],
    },

];
