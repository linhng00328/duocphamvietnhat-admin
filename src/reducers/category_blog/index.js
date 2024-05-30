import { combineReducers } from 'redux';
import {categoryBlog} from './category_blog'
import {alert} from './alert'




export const categoryBReducers = combineReducers({
    categoryBlog,
    alert
});

