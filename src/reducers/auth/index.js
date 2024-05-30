import { combineReducers } from 'redux';
import {forgot} from "./forgot";
import {login} from "./login";
import {register} from "./register";
import {alert} from "./alert";
import {permission} from "./permission";





export const authReducers = combineReducers({
   forgot,
   login,
   register,
   alert,
   permission

});

