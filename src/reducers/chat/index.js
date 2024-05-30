import { combineReducers } from 'redux';
import {chat} from './chat'
import {alert} from './alert'




export const chatReducers = combineReducers({
    chat,
    alert
});

