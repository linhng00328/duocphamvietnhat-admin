import { combineReducers } from 'redux';
import {alert} from './alert'
import  {import_reducer} from './importStock'



export const importStockReducers = combineReducers({
    import_reducer,
    alert
});

