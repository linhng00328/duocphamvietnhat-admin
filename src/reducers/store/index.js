import { combineReducers } from 'redux';
import {store} from './store'
import {alert} from './alert'




export const storeReducers = combineReducers({
    store,
    alert
});

