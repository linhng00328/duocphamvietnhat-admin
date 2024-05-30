import { combineReducers } from 'redux';
import {bannerAds} from './category_blog'
import {alert} from './alert'




export const bannerAdsReducers = combineReducers({
    bannerAds,
    alert
});

