import { combineReducers } from 'redux';
import {collaborator} from './collaborator'
import {alert} from './alert'




export const collaboratorReducers = combineReducers({
    collaborator,
    alert
});

