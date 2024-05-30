import { combineReducers } from 'redux';
import {decentralization} from './decentralization'
import {alert} from './alert'




export const decentralizationReducers = combineReducers({
    decentralization,
    alert
});

