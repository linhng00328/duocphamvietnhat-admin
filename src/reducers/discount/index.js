import { combineReducers } from 'redux';
import {discount} from './discount'
import {alert} from './alert'




export const discountReducers = combineReducers({
    discount,
    alert
});

