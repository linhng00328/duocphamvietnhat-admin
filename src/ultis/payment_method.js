export const PAYMENT_TYPE_CASH = 0; //Tiền mặt
export const PAYMENT_TYPE_SWIPE = 1; // Quẹt
export const PAYMENT_TYPE_COD = 2; //COD
export const PAYMENT_TYPE_TRANSFER = 3; //Chuyển khoản

export default function  getNamePaymentMethod(payment_method_id) {

    if (PAYMENT_TYPE_CASH == payment_method_id) {
        return "Tiền mặt";
    }
    if (PAYMENT_TYPE_SWIPE == payment_method_id) {
        return "Quẹt thẻ";
    }
    if (PAYMENT_TYPE_COD == payment_method_id) {
        return "COD";
    }
    if (PAYMENT_TYPE_TRANSFER == payment_method_id) {
        return "Chuyển khoản";
    }
    return "Tiền mặt";

}