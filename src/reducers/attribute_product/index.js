import { combineReducers } from 'redux';
import {attribute_product} from './attribute'
import {alert} from "./alert"





export const attributePReducers = combineReducers({
    attribute_product,
    alert
    
});

