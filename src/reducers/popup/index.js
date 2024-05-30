import { combineReducers } from 'redux';
import {popup} from './popup'
import {alert} from './alert'




export const popupReducers = combineReducers({
    popup,
    alert
});

