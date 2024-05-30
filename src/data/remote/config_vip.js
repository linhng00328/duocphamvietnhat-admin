import callApi from "../../ultis/apiCaller";

export const getConfigVipUser = () => {
  return callApi(`/vip_user/config`, "get", null);
};


export const configVipUser = (data) =>{
  return callApi(`/vip_user/config`, "post", data);
}

