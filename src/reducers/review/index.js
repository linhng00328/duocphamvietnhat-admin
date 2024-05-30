import { combineReducers } from 'redux';
import {review} from './review'
import {alert} from './alert'




export const reviewReducers = combineReducers({
    review,
    alert
});

