import callApi from "../../ultis/apiCaller";

export const fetchTheme = (store_code) => {
  return callApi(`/web-theme/${store_code}`, "get", null);
};


export const updateTheme = (store_code,data) =>{
  return callApi(`/web-theme/${store_code}`, "post", data);
}

