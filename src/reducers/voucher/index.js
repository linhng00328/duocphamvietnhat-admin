import { combineReducers } from 'redux';
import {voucher} from './voucher'
import {alert} from './alert'




export const voucherReducers = combineReducers({
    voucher,
    alert
});

