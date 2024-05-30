import { combineReducers } from 'redux';
import {combo} from './combo'
import {alert} from './alert'




export const comboReducers = combineReducers({
    combo,
    alert
});

