import { combineReducers } from 'redux';
import {train} from './train'
import {alert} from './alert'




export const trainReducers = combineReducers({
    train,
    alert
});

