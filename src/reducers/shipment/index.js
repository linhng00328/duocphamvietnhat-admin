import { combineReducers } from 'redux';
import {shipment} from './shipment'
import {alert} from './alert'




export const shipmentReducers = combineReducers({
    shipment,
    alert
});

