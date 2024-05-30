import { combineReducers } from 'redux';
import {alert} from './alert'
import  {order_product} from './order_product'



export const orderReducers = combineReducers({
    order_product,
    alert
});

