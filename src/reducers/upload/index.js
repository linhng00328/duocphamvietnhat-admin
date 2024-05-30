import { combineReducers } from 'redux';
import {productImg} from './product'
import {discountImg} from './discount'
import {voucherImg} from './voucher'
import {comboImg} from './combo'
import {categoryBImg} from "./category_blog"
import {alert} from './alert'
import { blogImg } from './blog';
import { userImg } from './user';
import { storeImg } from './store';
import { popupImg } from './popup';
import { themeImg } from './theme';
import { bannerAdsImg } from './banner_ads';
import {configVipImg} from "./config_vip"






export const UploadReducers = combineReducers({
    productImg,
    alert,
    discountImg,
    voucherImg,
    comboImg,
    categoryBImg,
    blogImg,
    userImg,
    storeImg,
    popupImg,
    themeImg,
    bannerAdsImg,
    configVipImg

});

