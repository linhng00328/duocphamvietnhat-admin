import callApi from "../../ultis/apiCaller";

export const fetchAllSchedule = (store_code) => {
  return callApi(`/store/${store_code}/notifications/schedule`, "get", null);
};



export const createSchedule = (store_code,data) =>{
  return callApi(`/store/${store_code}/notifications/schedule`, "post", data);
}

export const updateSchedule = (scheduleId, schedule, store_code) =>{
  return callApi(`/store/${store_code}/notifications/schedule/${scheduleId}`, "put", schedule);
}

export const destroySchedule = (store_code , scheduleId) =>{
  return callApi(`/store/${store_code}/notifications/schedule/${scheduleId}`, "delete", null);
}
