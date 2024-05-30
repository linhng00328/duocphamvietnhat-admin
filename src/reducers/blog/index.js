import { combineReducers } from 'redux';
import {blog} from './blog'
import {alert} from './alert'




export const blogReducers = combineReducers({
    blog,
    alert
});

