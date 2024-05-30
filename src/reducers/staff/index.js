import { combineReducers } from 'redux';
import {staff} from './staff'
import {alert} from './alert'




export const staffReducers = combineReducers({
    staff,
    alert
});

