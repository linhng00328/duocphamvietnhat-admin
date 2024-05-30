import callApi from "../../ultis/apiCaller";

export const fetchAllPopup = (store_code) => {
  return callApi(`/store/${store_code}/popups`, "get", null);
};



export const createPopup = (store_code,data) =>{
  return callApi(`/store/${store_code}/popups`, "post", data);
}

export const updatePopup = (popupId, popup, store_code) =>{
  return callApi(`/store/${store_code}/popups/${popupId}`, "put", popup);
}

export const destroyPopup = (store_code , popupId) =>{
  return callApi(`/store/${store_code}/popups/${popupId}`, "delete", null);
}
