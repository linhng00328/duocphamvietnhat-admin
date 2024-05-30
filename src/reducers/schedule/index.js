import { combineReducers } from 'redux';
import {schedule} from './schedule'
import {alert} from './alert'




export const scheduleReducers = combineReducers({
    schedule,
    alert
});

