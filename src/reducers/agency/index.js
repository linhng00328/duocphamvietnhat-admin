import { combineReducers } from 'redux';
import {agency} from './agency'
import {alert} from './alert'




export const agencyReducers = combineReducers({
    agency,
    alert
});

