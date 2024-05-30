import { combineReducers } from 'redux';
import {bonusProduct} from './bonus_product'
import {alert} from './alert'




export const bonusProductReducers = combineReducers({
    bonusProduct,
    alert
});

