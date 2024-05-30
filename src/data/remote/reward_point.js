import callApi from "../../ultis/apiCaller";

export const fetchRewardPoint = (store_code) => {
  return callApi(`/store/${store_code}/reward_points`, "get", null);
};

export const updateRewardPoint = (store_code,data) =>{
  return callApi(`/store/${store_code}/reward_points`, "post", data);
}

export const resetRewardPoint = (store_code) =>{
  return callApi(`/store/${store_code}/reward_points/reset`, "get", null);
}
