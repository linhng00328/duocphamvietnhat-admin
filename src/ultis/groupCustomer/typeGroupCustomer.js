import * as Types from "../../constants/ActionType";

export const typeGroupCustomer = [
  {
    id: 1,
    title: "Tất cả",
    value: Types.GROUP_CUSTOMER_ALL,
  },
  {
    id: 2,
    title: "Đại lý",
    value: Types.GROUP_CUSTOMER_AGENCY,
  },
  {
    id: 3,
    title: "Cộng tác viên",
    value: Types.GROUP_CUSTOMER_CTV,
  },
  {
    id: 4,
    title: "Khách lẻ đã đăng nhập",
    value: Types.GROUP_CUSTOMER_NORMAL_GUEST,
  },
  {
    id: 5,
    title: "Nhóm khách hàng",
    value: Types.GROUP_CUSTOMER_BY_CONDITION,
  },
  {
    id: 6,
    title: "Khách lẻ chưa đăng nhập",
    value: Types.GROUP_CUSTOMER_NORMAL_GUEST_NOT_LOGGED,
  },
];
