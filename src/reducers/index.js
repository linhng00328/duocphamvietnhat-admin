import { combineReducers } from "redux";
import { authReducers } from "./auth/index";
import { storeReducers } from "./store/index";
import { storeAReducers } from "./store_address/index";
import { categoryPReducers } from "./category_product/index";
import { productReducers } from "./product/index";
import { attributePReducers } from "./attribute_product/index";
import { UploadReducers } from "./upload/index";
import { discountReducers } from "./discount/index";
import { voucherReducers } from "./voucher/index";
import { comboReducers } from "./combo/index";
import { categoryBReducers } from "./category_blog/index";
import { blogReducers } from "./blog/index";
import { shipmentReducers } from "./shipment/index";
import { paymentReducers } from "./payment/index";
import { customerReducers } from "./customer/index";
import { groupCustomerReducers } from "./group_customer/index";
import { historyOperationReducers } from "./history_operation/index";
import { gamificationReducers } from "./gamification";
import { customerSaleReducers } from "./customer_sales/index";
import { userReducers } from "./user/index";
import { billReducers } from "./bill/index";
import { chatReducers } from "./chat/index";
import { loadingReducers } from "./loading";
import { badgeReducers } from "./badge";
import { reviewReducers } from "./review";
import { collaboratorReducers } from "./collaborator";
import { rewardPointReducers } from "./reward_point";
import { scheduleReducers } from "./schedule";
import { popupReducers } from "./popup";
import { reportReducers } from "./report";
import { placeReducers } from "./place";
import { themeReducers } from "./theme";
import { notificationReducers } from "./notification";
import { errResposeReducers } from "./alert";
import { decentralizationReducers } from "./decentralization";
import { staffReducers } from "./staff";
import { bannerAdsReducers } from "./banner_ads";
import { vipUserReducers } from "./vip_user";
import { agencyReducers } from "./agency";
import { orderReducers } from "./order_product";
import { inventoryReducers } from "./inventory";
import { importStockReducers } from "./ImportStock";
import { posReducers } from "./pos_order";
import { branchReducers } from "./branch";
import { revenueExpendituresReducers } from "./revenue_expenditures/index";
import { shiftReducers } from "./shift/index";
import { calendarShiftReducers } from "./calendar_shift/index";
import { timeSheetReducers } from "./time_sheet/index";
import { requestMobileReducers } from "./request_mobile/index";
import { requestRemoteReducers } from "./request_remote/index";
import { mobileCheckinReducers } from "./mobile_checkin/index";
import { bonusProductReducers } from "./bonus_product/index";
import { trainReducers } from "./train/index";
import { saleReducers } from "./sale";
import { attributeSearchReducers } from "./attribute_search";
import { ecommerceReducers } from "./ecommerce";
import { configSmsReducers } from "./config_sms";
import { otpUnitReducers } from "./otp_unit";

const appReducers = combineReducers({
  authReducers,
  branchReducers,
  storeReducers,
  storeAReducers,
  categoryPReducers,
  productReducers,
  attributePReducers,
  UploadReducers,
  discountReducers,
  voucherReducers,
  comboReducers,
  categoryBReducers,
  blogReducers,
  shipmentReducers,
  paymentReducers,
  customerReducers,
  groupCustomerReducers,
  customerSaleReducers,
  userReducers,
  billReducers,
  chatReducers,
  loadingReducers,
  badgeReducers,
  reviewReducers,
  collaboratorReducers,
  rewardPointReducers,
  scheduleReducers,
  popupReducers,
  reportReducers,
  placeReducers,
  themeReducers,
  notificationReducers,
  errResposeReducers,
  decentralizationReducers,
  staffReducers,
  bannerAdsReducers,
  vipUserReducers,
  agencyReducers,
  orderReducers,
  inventoryReducers,
  importStockReducers,
  posReducers,
  historyOperationReducers,
  revenueExpendituresReducers,
  shiftReducers,
  calendarShiftReducers,
  timeSheetReducers,
  requestMobileReducers,
  requestRemoteReducers,
  mobileCheckinReducers,
  bonusProductReducers,
  trainReducers,
  gamificationReducers,
  saleReducers,
  attributeSearchReducers,
  ecommerceReducers,
  configSmsReducers,
  otpUnitReducers,
});

export default appReducers;
