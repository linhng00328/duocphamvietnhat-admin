import * as helpers from "../ultis/helpers";
import { getBranch } from "../ultis/branchUtils";

// export const API_URL  = 'https://doshop.sahavi.vn/api';
// export const API_URL_SOCKET = "https://doshop.sahavi.vn:6441/"
export const API_URL_DEV = "https://maildpnhatban.ikitech.vn/api";
// export const API_URL_DEV = "http://127.0.0.1:8000/api";
export const API_URL_MAIN = "https://maildpnhatban.ikitech.vn/api";
export const API_URL_SOCKET_DEV = "https://main.doapp.vn:6441/";
export const API_URL_SOCKET_MAIN = "https://main.doapp.vn:6441/";
export const getApiImageStore = (store_code) => {
  return `${helpers.callUrl()}/store/${store_code}/images`;
};
