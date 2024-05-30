import React from "react";

import StoreCreate from "./screens/Store/Create";
import StoreEdit from "./screens/Store/Edit";

import StoreAEdit from "./screens/Store_Address/StoreAEdit";

import ProductCreate from "./screens/Product/ProductCreate/index";
import ProductCreate_C from "./screens/Product/ProductCreate_C/index";

import ProductEdit from "./screens/Product/ProductEdit/index";
import ProductAgencyEdit from "./screens/ProductAgency/EditPrice/index";

import Index from "./screens/index";
import Dashboard from "./screens/Dashboard";
import Accountant from "./screens/Accountant";

import Blog from "./screens/Blog/index";
import BlogEdit from "./screens/Blog/Edit/index";
import BlogCreate from "./screens/Blog/Create";

import Bill from "./screens/Bill";
import BillDetail from "./screens/Bill/Detail";

import Customer from "./screens/Customer";
import CustomerDetail from "./screens/Customer/Detail";
import CustomerDetailPos from "./screens/Customer/DetailPos/index";
import SupplierDetailPos from "./screens/Supplier/DetailPos/index";

import RevenueExpenditures from "./screens/RevenueExpenditures";
import RewardPoint from "./screens/RewardPoint/index";

import Product from "./screens/Product";
import ProductAgency from "./screens/ProductAgency";

import Category_P from "./screens/Category_P";
import Profile from "./screens/Profile";
import Report from "./screens/Report";

import Discount from "./screens/Promotion/Discount/index";
import DiscountEdit from "./screens/Promotion/Discount/Edit/index";
import DiscountCreate from "./screens/Promotion/Discount/Create/index";

import Voucher from "./screens/Promotion/Voucher/index";
import VoucherEdit from "./screens/Promotion/Voucher/Edit/index";
import VoucherCreate from "./screens/Promotion/Voucher/Create/index";

import Combo from "./screens/Promotion/Combo/index";
import ComboEdit from "./screens/Promotion/Combo/Edit/index";
import ComboCreate from "./screens/Promotion/Combo/Create/index";

import BonusProduct from "./screens/Promotion/BonusProduct/index";
import BonusProductEdit from "./screens/Promotion/BonusProduct/Edit/index";
import BonusProductCreate from "./screens/Promotion/BonusProduct/Create/index";

import Shift from "./screens/Timekeeping/Shift/index";
import WorkLocation from "./screens/Timekeeping/WorkLocation/index";
import Request from "./screens/Timekeeping/Request/index";
import CalendarShift from "./screens/Timekeeping/CalendarShift/index";
import CalendarShiftCreate from "./screens/Timekeeping/CalendarShift/Create/index";
import TimeSheet from "./screens/Timekeeping/TimeSheet/index";
// import WorkSchedule from "./screens/Timekeeping/WorkSchedule/index";
// import WorkLocation from "./screens/Timekeeping/WorkLocation/index";

import CategoryB from "./screens/Category_B/index";
import CategoryBEdit from "./screens/Category_B/Edit/index";
import CategoryBCreate from "./screens/Category_B/Create";

import Course from "./screens/Train/Course/index";
import CourseEdit from "./screens/Train/Course//Edit/index";
import CourseCreate from "./screens/Train/Course/Create";

import QuizQuestion from "./screens/Train/Question/index";

import Chapter from "./screens/Train/Chapter/index";
import Lesson from "./screens/Train/Lesson/index";

import LessonEdit from "./screens/Train/Lesson//Edit/index";
import LessonCreate from "./screens/Train/Lesson//Create";

import BannerAds from "./screens/BannerAds/index";
import BannerAdsEdit from "./screens/BannerAds/Edit/index";
import BannerAdsCreate from "./screens/BannerAds/Create";

import Schedule from "./screens/Schedule/index";
import ScheduleEdit from "./screens/Schedule/Edit/index";
import ScheduleCreate from "./screens/Schedule/Create";

import Popup from "./screens/Popup/index";
import PopupEdit from "./screens/Popup/Edit/index";
import PopupCreate from "./screens/Popup/Create";

import Notfound from "./screens/Notfound";
import Login from "./screens/Auth";
import Register from "./screens/Auth/Register";
import Forgot from "./screens/Auth/Forgot";

import Store_Address from "./screens/Store_Address";

import Shipment from "./screens/Shipment";

import Payment from "./screens/Payment";
import PaymentEdit from "./screens/Payment/Edit/index";

import Chat from "./screens/Chat";
import Review from "./screens/Review";
import Notification from "./screens/Notification";

import StoreACreate from "./screens/Store_Address/StoreACreate";
import AuthRegister from "./screens/Auth/AuthRegister";
import AuthForgot from "./screens/Auth/AuthForgot";
import ShipConfig from "./screens/ShipConfig";


import Collaborator from "./screens/Collaborator/index";
import Agency from "./screens/Agency/index";

import Theme from "./screens/Theme/index";

import Decentralization from "./screens/Decentralization/index";
import DecentralizationCreate from "./screens/Decentralization/Create";
import DecentralizationEdit from "./screens/Decentralization/Edit";
import DecentralizationDetail from "./screens/Decentralization/Detail";

import Staff from "./screens/Staff/index";
import StaffCreate from "./screens/Staff/Create";
import StaffEdit from "./screens/Staff/Edit";
import ConfigVip from "./screens/Vip/ConfigVip";
import BonusStepEdit from "./components/Agency/BonusProgram/BonusStepEdit";
import ReportAgency from "./components/Agency/ReportAgency/ReportAgency";
import ReportCollaborator from "./components/Collaborator/ReportCollaborator/ReportCollaborator";
import AddOrder from "./screens/Add_order";
import Branch from "./screens/BranchStore";
import Supplier from "./screens/Supplier";
import Inventory from "./screens/Inventory";
import CreateInventory from "./screens/Inventory/create";
import DetailInventory from "./screens/Inventory/detail";
import EditInventory from "./screens/Inventory/edit";

import ImportStock from "./screens/ImportStock";

import CreateImportStock from "./screens/ImportStock/create";
import DetailImportStock from "./screens/ImportStock/detail";
import EditImportStock from "./screens/ImportStock/edit";

import TransferStock from "./screens/TransferStock/index";

import CreateTransferStock from "./screens/TransferStock/Sender/create";
import DetailTransferStock from "./screens/TransferStock/Sender/detail";
import EditTransferStock from "./screens/TransferStock/Sender/edit";

import ReportInventory from "./screens/Report/ReportInventory";
import ImportExpostStock from "./screens/Report/import_export/ImportExpostStock";
import InventoryHistory from "./screens/Report/report_history/InventoryHistory";
import ReportFinance from "./screens/Report/report_finance";
import ReportPayment from "./screens/Report/report_payment";
import ReportProfit from "./screens/Report/report_finance/report_profit/ReportProfit";
import CustomerDebt from "./screens/Report/report_finance/customer_debt/CustomerDebt";
import SupplierDebt from "./screens/Report/report_finance/supplier_debt/SupplierDebt";
import Expenditure from "./screens/Report/report_finance/revenue_expenditure/Expenditure";
import PostOrder from "./screens/Pos_order";
import Setting from "./screens/Setting";
import ProductInventory from "./screens/ProductInventory";
import getChannel, { IKIPOS, IKITECH } from "./ultis/channel";
import PrintOrderScreen from "./screens/Bill/PrintOrderScreen";
import PrintBarcode from "./screens/PrintBarcode";
import CustomerSale from "./screens/CustomerSale";
import GroupCustomer from "./screens/GroupCustomer";
import InvoiceTemplate from "./screens/InvoiceTemplate";
import Manual from "./screens/Manual";
import HistoryOperation from "./screens/HistoryOperation";
import SpinWheel from "./screens/Gamification/SpinWheel";
import ActionsGameSpinWheel from "./screens/Gamification/SpinWheel/ActionsGameSpinWheel";
import Sale from "./screens/Sale";
import Statistical from "./screens/Statistical";
import GuessNumber from "./screens/Gamification/GuessNumber";
import ActionsGameGuessNumber from "./screens/Gamification/GuessNumber/ActionsGameGuessNumber";
import AttributeSearch from "./screens/AttributeSearch";
import Ecommerce from "./screens/Ecommerce";
import ProductEcommerce from "./screens/Ecommerce/product";
import OrderEcommerce from "./screens/Ecommerce/order";
import ConfigSms from "./screens/ConfigSms";
import PublicApiHook from "./screens/PublicApiHook/index.js";
import HistoryQuiz from "./screens/Train/HistoryQuiz/index.js";
import HistoryDetailQuizForCustomer from "./screens/Train/HistoryQuiz/historyDetail/HistoryDetailQuizForCustomer.js";
import ReportProduct from "./screens/Report/report_product";

const routes = [
  {
    path: "/invoice_template/index/:store_code",
    exact: true,

    main: ({ match }) => <InvoiceTemplate match={match} />,
  },
  {
    path: "/decentralization/index/:store_code",
    exact: true,

    main: ({ match }) => <Decentralization match={match} />,
  },
  {
    path: "/config_public_api_hook/:store_code",
    exact: true,

    main: ({ match }) => <PublicApiHook match={match} />,
  },
  {
    path: "/setting/index/:store_code",
    exact: true,

    main: ({ match }) => <Setting match={match} />,
  },
  {
    path: "/decentralization/detail/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <DecentralizationDetail match={match} history={history} />
    ),
  },
  {
    path: "/staff/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <StaffCreate match={match} history={history} />
    ),
  },
  {
    path: "/staff/index/:store_code",
    exact: true,

    main: ({ match }) => <Staff match={match} />,
  },
  {
    path: "/inventory/index/:store_code",
    exact: true,

    main: ({ match, history }) => <Inventory match={match} history={history} />,
  },
  {
    path: "/inventory/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CreateInventory match={match} history={history} />
    ),
  },
  {
    path: "/inventory/edit/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <EditInventory match={match} history={history} />
    ),
  },
  {
    path: "/accountant/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <Accountant match={match} history={history} />
    ),
  },

  {
    path: "/inventory/detail/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <DetailInventory match={match} history={history} />
    ),
  },

  {
    path: "/transfer_stocks/index/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <TransferStock match={match} history={history} />
    ),
  },
  {
    path: "/transfer_stock/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CreateTransferStock match={match} history={history} />
    ),
  },
  {
    path: "/transfer_stock/edit/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <EditTransferStock match={match} history={history} />
    ),
  },
  {
    path: "/transfer_stocks/detail/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <DetailTransferStock match={match} history={history} />
    ),
  },

  {
    path: "/import_stocks/index/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ImportStock match={match} history={history} />
    ),
  },
  {
    path: "/import_stock/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CreateImportStock match={match} history={history} />
    ),
  },
  {
    path: "/import_stock/edit/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <EditImportStock match={match} history={history} />
    ),
  },
  {
    path: "/import_stocks/detail/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <DetailImportStock match={match} history={history} />
    ),
  },

  {
    path: "/branch/index/:store_code",
    exact: true,

    main: ({ match }) => <Branch match={match} />,
  },
  {
    path: "/supplier/:store_code",
    exact: true,

    main: ({ match }) => <Supplier match={match} />,
  },
  {
    path: "/staff/edit/:store_code/:id",
    exact: true,

    main: ({ match, history }) => <StaffEdit match={match} history={history} />,
  },

  {
    path: "/decentralization/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <DecentralizationCreate match={match} history={history} />
    ),
  },

  {
    path: "/decentralization/edit/:store_code/:id",
    exact: true,

    main: ({ match, history }) => (
      <DecentralizationEdit match={match} history={history} />
    ),
  },
  {
    path: "/collaborator/:store_code/report/:collaborator_by_customer_id?",
    exact: true,

    main: ({ match }) => <ReportCollaborator match={match} />,
  },
  {
    path: "/collaborator/:store_code/:action?/:id?",
    exact: true,

    main: ({ match }) => <Collaborator match={match} />,
  },
  {
    path: "/sale/:store_code?",
    exact: true,

    main: ({ match }) => <Sale match={match} />,
  },

  {
    path: "/agency/:store_code/report/:agency_by_customer_id?",
    exact: true,

    main: ({ match }) => <ReportAgency match={match} />,
  },

  {
    path: "/report_inventory/:store_code",
    exact: true,

    main: ({ match }) => <ReportInventory match={match} />,
  },
  {
    path: "/customer_debt/:store_code",
    exact: true,

    main: ({ match }) => <CustomerDebt match={match} />,
  },
  {
    path: "/supplier_debt/:store_code",
    exact: true,

    main: ({ match }) => <SupplierDebt match={match} />,
  },
  {
    path: "/supplier/detail/:store_code/:supplierId",
    exact: true,

    main: ({ match, history }) => (
      <SupplierDetailPos match={match} history={history} />
    ),
  },

  {
    path: "/expenditure/:store_code",
    exact: true,

    main: ({ match }) => <Expenditure match={match} />,
  },
  {
    path: "/import_export_stock/:store_code",
    exact: true,

    main: ({ match }) => <ImportExpostStock match={match} />,
  },
  {
    path: "/inventory_histories/:store_code",
    exact: true,

    main: ({ match }) => <InventoryHistory match={match} />,
  },
  {
    path: "/report_finance/:store_code",
    exact: true,

    main: ({ match }) => <ReportFinance match={match} />,
  },
  {
    path: "/report_profit/:store_code",
    exact: true,

    main: ({ match }) => <ReportProfit match={match} />,
  },
  {
    path: "/agency/:store_code/:action?/:id?",
    exact: true,

    main: ({ match }) => <Agency match={match} />,
  },
  {
    path: "/ecommerce/manage/:store_code",
    exact: true,

    main: ({ match }) => <Ecommerce match={match} />,
  },
  {
    path: "/agency_bonus_steps/:store_code/create",
    exact: true,

    main: ({ match, history }) => (
      <BonusStepEdit match={match} history={history} />
    ),
  },
  {
    path: "/agency_bonus_steps/:store_code/update/:step_id",
    exact: true,

    main: ({ match, history }) => (
      <BonusStepEdit match={match} history={history} />
    ),
  },
  {
    path: "/theme/:store_code",
    exact: true,

    main: ({ match }) => <Theme match={match} />,
  },
  {
    path: "/dashboard/:store_code?",
    exact: true,
    main: ({ match }) => <Dashboard match={match} />,
  },
  {
    path: "/statistical/:store_code?",
    exact: true,

    main: ({ match }) => <Statistical match={match} />,
  },
  {
    path: "/dashboard/:store_code/:branch_id",
    exact: true,

    main: ({ match }) => <Dashboard match={match} />,
  },
  {
    path: "/order/:store_code/:status_code?",
    exact: true,

    main: ({ match }) => <Bill match={match} />,
  },
  {
    path: "/cusSale/:store_code/order",
    exact: true,

    main: ({ match }) => <Bill match={match} />,
  },
  {
    path: "/order/detail/:store_code/:order_code",
    exact: true,

    main: ({ match, history }) => (
      <BillDetail match={match} history={history} />
    ),
  },

  {
    path: "/order/print/:store_code/:order_code",
    exact: true,

    main: ({ match, history }) => (
      <PrintOrderScreen match={match} history={history} />
    ),
  },

  {
    path: "/store/create/",
    exact: true,

    main: ({ history }) => <StoreCreate history={history} />,
  },
  {
    path: "/store/edit/:store_code/",
    exact: true,

    main: ({ match, history }) => <StoreEdit match={match} history={history} />,
  },

  {
    path: "/customer/:store_code",
    exact: true,

    main: ({ match }) => <Customer match={match} />,
  },
  {
    path: "/customer/:store_code/customerSale",
    exact: true,

    main: ({ match }) => <Customer match={match} />,
  },
  {
    path: "/group_customer/:store_code",
    exact: true,

    main: ({ match }) => <GroupCustomer match={match} />,
  },
  {
    path: "/history_operation/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <HistoryOperation match={match} history={history} />
    ),
  },
  {
    path: "/game_spin_wheels/:store_code",
    exact: true,

    main: ({ match, history }) => <SpinWheel match={match} history={history} />,
  },
  {
    path: "/game_spin_wheels/:store_code/create",
    exact: true,

    main: ({ match, history }) => (
      <ActionsGameSpinWheel match={match} history={history} />
    ),
  },
  {
    path: "/game_spin_wheels/:store_code/update/:id",
    exact: true,

    main: ({ match, history }) => (
      <ActionsGameSpinWheel match={match} history={history} />
    ),
  },
  {
    path: "/game_guess_numbers/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <GuessNumber match={match} history={history} />
    ),
  },
  {
    path: "/game_guess_numbers/:store_code/create",
    exact: true,

    main: ({ match, history }) => (
      <ActionsGameGuessNumber match={match} history={history} />
    ),
  },
  {
    path: "/game_guess_numbers/:store_code/update/:id",
    exact: true,

    main: ({ match, history }) => (
      <ActionsGameGuessNumber match={match} history={history} />
    ),
  },
  {
    path: "/customer_sales/:store_code",
    exact: true,

    main: ({ match }) => <CustomerSale match={match} />,
  },

  {
    path: "/customer/detail/:store_code/:customerId",
    exact: true,

    main: ({ match, history }) => (
      <CustomerDetailPos match={match} history={history} />
    ),
  },
  {
    path: "/customer/customerSale/detail/:store_code/:customerId",
    exact: true,

    main: ({ match, history }) => (
      <CustomerDetailPos match={match} history={history} />
    ),
  },

  {
    path: "/revenue_expenditure/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <RevenueExpenditures match={match} history={history} />
    ),
  },
  {
    path: "/report_pay/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ReportPayment match={match} history={history} />
    ),
  },
  {
    path: "/report_product/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ReportProduct match={match} history={history} />
    ),
  },
  {
    path: "/reward_point/:store_code",
    exact: true,

    main: ({ match }) => <RewardPoint match={match} />,
  },
  {
    path: "/product/print_barcode/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <PrintBarcode match={match} history={history} />
    ),
  },
  {
    path: "/product/index/:store_code",
    exact: true,

    main: ({ match }) => <Product match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_products/shopee/:store_code",
    exact: true,

    main: ({ match }) => <ProductEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_products/tiktok/:store_code",
    exact: true,

    main: ({ match }) => <ProductEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_products/lazada/:store_code",
    exact: true,

    main: ({ match }) => <ProductEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_products/tiki/:store_code",
    exact: true,

    main: ({ match }) => <ProductEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_orders/shopee/:store_code",
    exact: true,

    main: ({ match }) => <OrderEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_orders/tiktok/:store_code",
    exact: true,

    main: ({ match }) => <OrderEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_orders/lazada/:store_code",
    exact: true,

    main: ({ match }) => <OrderEcommerce match={match} />,
  },
  {
    path: "/ecommerce/ecommerce_orders/tiki/:store_code",
    exact: true,

    main: ({ match }) => <OrderEcommerce match={match} />,
  },

  {
    path: "/product_inventory/index/:store_code/:page?",
    exact: true,

    main: ({ match }) => <ProductInventory match={match} />,
  },

  {
    path: "/product-agency/index/:store_code/:agency_type_id",
    exact: true,

    main: ({ match }) => <ProductAgency match={match} />,
  },
  {
    path: "/product-agency/edit-price/:store_code/:productId/:agency_type_id",
    exact: true,

    main: ({ match, history }) => (
      <ProductAgencyEdit match={match} history={history} />
    ),
  },

  {
    path: "/product/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ProductCreate history={history} match={match} />
    ),
  },

  {
    path: "/product/edit/:store_code/:productId",
    exact: true,

    main: ({ match, history }) => (
      <ProductEdit history={history} match={match} />
    ),
  },

  {
    path: "/product/create/:store_code/:productId",
    exact: true,

    main: ({ match, history }) => (
      <ProductCreate_C history={history} match={match} />
    ),
  },

  {
    path: "/product/category/:store_code",
    exact: true,

    main: ({ match }) => <Category_P match={match} />,
  },
  {
    path: "/product/attribute_searches/:store_code",
    exact: true,

    main: ({ match }) => <AttributeSearch match={match} />,
  },
  {
    path: "/profile/:store_code",
    exact: true,

    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/report/:store_code",
    exact: true,

    main: ({ match }) => <Report match={match} />,
  },
  {
    path: "/addorder/:store_code",
    exact: true,

    main: ({ match, history }) => <AddOrder match={match} history={history} />,
  },
  {
    path: "/pos/:store_code",
    exact: true,

    main: ({ match, history }) => <PostOrder match={match} history={history} />,
  },
  {
    path: "/pos/:store_code/:order_code",
    exact: true,

    main: ({ match, history }) => <PostOrder match={match} history={history} />,
  },
  {
    path: "/discount/:store_code",
    exact: true,

    main: ({ match }) => <Discount match={match} />,
  },

  {
    path: "/discount/edit/:store_code/:discountId",
    exact: true,

    main: ({ match, history }) => (
      <DiscountEdit match={match} history={history} />
    ),
  },

  {
    path: "/discount/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <DiscountCreate match={match} history={history} />
    ),
  },

  {
    path: "/combo/:store_code",
    exact: true,

    main: ({ match }) => <Combo match={match} />,
  },

  {
    path: "/combo/edit/:store_code/:comboId",
    exact: true,

    main: ({ match, history }) => <ComboEdit match={match} history={history} />,
  },

  {
    path: "/combo/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ComboCreate match={match} history={history} />
    ),
  },

  {
    path: "/bonus_product/:store_code",
    exact: true,

    main: ({ match }) => <BonusProduct match={match} />,
  },

  {
    path: "/bonus_product/edit/:store_code/:bonusProductId",
    exact: true,

    main: ({ match, history }) => (
      <BonusProductEdit match={match} history={history} />
    ),
  },

  {
    path: "/bonus_product/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <BonusProductCreate match={match} history={history} />
    ),
  },

  {
    path: "/voucher/create/:type/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <VoucherCreate match={match} history={history} />
    ),
  },

  {
    path: "/voucher/:store_code",
    exact: true,

    main: ({ match }) => <Voucher match={match} />,
  },

  {
    path: "/voucher/edit/:store_code/:voucherId",
    exact: true,

    main: ({ match, history }) => (
      <VoucherEdit match={match} history={history} />
    ),
  },
  {
    path: "/voucher/edit/:store_code/:voucherId",
    exact: true,

    main: ({ match, history }) => (
      <VoucherEdit match={match} history={history} />
    ),
  },
  {
    path: "/shift/:store_code",
    exact: true,

    main: ({ match }) => <Shift match={match} />,
  },
  {
    path: "/calendar_shift/:store_code",
    exact: true,

    main: ({ match }) => <CalendarShift match={match} />,
  },
  {
    path: "/work_location/:store_code",
    exact: true,

    main: ({ match }) => <WorkLocation match={match} />,
  },
  {
    path: "/request/:store_code",
    exact: true,

    main: ({ match }) => <Request match={match} />,
  },
  {
    path: "/calendar_shift/putALot/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CalendarShiftCreate match={match} history={history} />
    ),
  },
  {
    path: "/time_sheet/:store_code",
    exact: true,

    main: ({ match }) => <TimeSheet match={match} />,
  },
  {
    path: "/accountant/time_sheet/:store_code",
    exact: true,

    main: ({ match }) => <TimeSheet match={match} />,
  },
  {
    path: "/login",
    exact: true,

    main: () => <Login />,
  },
  {
    path: "/register",
    exact: true,

    main: () => <Register />,
  },
  {
    path: "/register/otp",
    exact: true,

    main: ({ history }) => <AuthRegister history={history} />,
  },
  {
    path: "/forgot",
    exact: true,

    main: () => <Forgot />,
  },

  {
    path: "/forgot/otp",
    exact: true,

    main: ({ history }) => <AuthForgot history={history} />,
  },
  /////////////////////////////
  {
    path: "/store_address/:store_code",
    exact: true,

    main: ({ match }) => <Store_Address match={match} />,
  },

  {
    path: "/store_address/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <StoreACreate match={match} history={history} />
    ),
  },
  {
    path: "/ship_config/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ShipConfig match={match} history={history} />
    ),
  },

  {
    path: "/store_address/edit/:store_code/:storeAId",
    exact: true,

    main: ({ match, history }) => (
      <StoreAEdit match={match} history={history} />
    ),
  },

  //////////////////////////

  {
    path: "/posts/category/:store_code",
    exact: true,

    main: ({ match }) => <CategoryB match={match} />,
  },

  {
    path: "/posts/category/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CategoryBCreate match={match} history={history} />
    ),
  },

  {
    path: "/posts/category/edit/:store_code/:categoryBId",
    exact: true,

    main: ({ match, history }) => (
      <CategoryBEdit match={match} history={history} />
    ),
  },

  ////////////////////
  {
    path: "/train/course/:store_code",
    exact: true,

    main: ({ match }) => <Course match={match} />,
  },
  {
    path: "/train/history/:store_code",
    exact: true,

    main: ({ match }) => <HistoryQuiz match={match} />,
  },
  {
    path: "/train/history/:store_code/:customerId",
    exact: true,

    main: ({ match }) => <HistoryDetailQuizForCustomer match={match} />,
  },

  {
    path: "/train/course/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <CourseCreate match={match} history={history} />
    ),
  },

  {
    path: "/train/course/edit/:store_code/:courseId",
    exact: true,

    main: ({ match, history }) => (
      <CourseEdit match={match} history={history} />
    ),
  },

  {
    path: "/train/quiz/question/:store_code/:courseId/:quizId",
    exact: true,

    main: ({ match, history }) => (
      <QuizQuestion match={match} history={history} />
    ),
  },

  {
    path: "/train/chapter/index/:store_code/:courseId",
    exact: true,

    main: ({ match }) => <Chapter match={match} />,
  },
  ////////////////////
  {
    path: "/train/lesson/index/:store_code/:courseId",
    exact: true,

    main: ({ match }) => <Lesson match={match} />,
  },

  {
    path: "/train/lesson/create/:store_code/:courseId",
    exact: true,

    main: ({ match, history }) => (
      <LessonCreate match={match} history={history} />
    ),
  },

  {
    path: "/train/lesson/edit/:store_code/:lessonId/:courseId",
    exact: true,

    main: ({ match, history }) => (
      <LessonEdit match={match} history={history} />
    ),
  },
  ////////////////////////
  {
    path: "/posts/index/:store_code",
    exact: true,

    main: ({ match }) => <Blog match={match} />,
  },

  {
    path: "/banner_ads/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <BannerAdsCreate match={match} history={history} />
    ),
  },

  {
    path: "/banner_ads/edit/:store_code/:bannerAdsId",
    exact: true,

    main: ({ match, history }) => (
      <BannerAdsEdit match={match} history={history} />
    ),
  },
  ////////////////////////
  {
    path: "/banner_ads/:store_code",
    exact: true,

    main: ({ match }) => <BannerAds match={match} />,
  },

  {
    path: "/posts/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <BlogCreate match={match} history={history} />
    ),
  },

  {
    path: "/posts/edit/:store_code/:blogId",
    exact: true,

    main: ({ match, history }) => <BlogEdit match={match} history={history} />,
  },

  ///////////
  {
    path: "/shipment/:store_code",
    exact: true,

    main: ({ match }) => <Shipment match={match} />,
  },
  ////////////
  {
    path: "/config_sms/:store_code",
    exact: true,

    main: ({ match }) => <ConfigSms match={match} />,
  },
  {
    path: "/payment/:store_code",
    exact: true,

    main: ({ match }) => <Payment match={match} />,
  },

  {
    path: "/payment/edit/:store_code/:paymentId",
    exact: true,

    main: ({ match, history }) => (
      <PaymentEdit history={history} match={match} />
    ),
  },
  //////////////////////
  {
    path: "/chat/:store_code/:id?",
    exact: true,

    main: ({ match }) => <Chat match={match} />,
  },
  ////////////////////////

  {
    path: "/vip/:store_code",
    exact: true,
    main: ({ match }) => <ConfigVip match={match} />,
  },

  //////////////////
  {
    path: "/review/:store_code",
    exact: true,

    main: ({ match }) => <Review match={match} />,
  },

  {
    path: "/notification/:store_code",
    exact: true,

    main: () => <Notification />,
  },
  {
    path: "/",
    exact: true,

    main: () => <Index />,
  },
  {
    path: "/notifications/schedule/:store_code",
    exact: true,

    main: ({ match }) => <Schedule match={match} />,
  },

  {
    path: "/notifications/schedule/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <ScheduleCreate match={match} history={history} />
    ),
  },

  {
    path: "/notifications/schedule/edit/:store_code/:scheduleId",
    exact: true,

    main: ({ match, history }) => (
      <ScheduleEdit match={match} history={history} />
    ),
  },
  {
    path: "/manual/:store_code",
    exact: true,

    main: ({ match }) => <Manual match={match} />,
  },

  {
    path: "/popup/:store_code",
    exact: true,

    main: ({ match }) => <Popup match={match} />,
  },

  {
    path: "/popup/create/:store_code",
    exact: true,

    main: ({ match, history }) => (
      <PopupCreate match={match} history={history} />
    ),
  },

  {
    path: "/popup/edit/:store_code/:popupId",
    exact: true,

    main: ({ match, history }) => <PopupEdit match={match} history={history} />,
  },

  {
    path: "",
    exact: true,

    main: () => <Notfound />,
  },
];
export default routes;
