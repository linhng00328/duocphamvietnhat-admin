import { combineReducers } from 'redux';
import {payment} from './payment'
import {alert} from './alert'




export const paymentReducers = combineReducers({
    payment,
    alert
});

