import { combineReducers } from 'redux';
import {category_product} from './category_product'
import {alert} from './alert'




export const categoryPReducers = combineReducers({
    category_product,
    alert
});

