import { combineReducers } from 'redux';
import {storeAddress} from './store_address'
import {alert} from './alert'




export const storeAReducers = combineReducers({
    storeAddress,
    alert
});

