import { combineReducers } from 'redux';
import {bill} from './bill'
import {alert} from './alert'




export const billReducers = combineReducers({
    bill,
    alert
    
});

