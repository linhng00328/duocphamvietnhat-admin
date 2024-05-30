import { combineReducers } from 'redux';
import {user} from './user'
import {alert} from "./alert"




export const userReducers = combineReducers({
    user,
    alert
    
});

