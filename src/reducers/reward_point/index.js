import { combineReducers } from 'redux';
import {reward_point} from './reward_point'
import {alert} from "./alert"




export const rewardPointReducers = combineReducers({
    reward_point,
    alert
    
});

