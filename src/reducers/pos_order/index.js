import { combineReducers } from 'redux';
import {alert} from './alert'
import  {pos_reducer} from './posOrder'



export const posReducers = combineReducers({
    pos_reducer,
    alert
});

