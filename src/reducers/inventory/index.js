import { combineReducers } from 'redux';
import {alert} from './alert'
import  {inventory_reducer} from './inventory'



export const inventoryReducers = combineReducers({
    inventory_reducer,
    alert
});

