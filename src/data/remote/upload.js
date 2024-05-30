import callApi from "../../ultis/apiCaller";

export const upload = (file,store_code) => {
  if(store_code)
  return callApi(`/store/${store_code}/images`, "post", file);

  return callApi(`/images`, "post", file);
};
export const uploadVideo = (file,store_code) => {
  if(store_code)
  return callApi(`/store/${store_code}/videos`, "post", file);

  return callApi(`/videos`, "post", file);
};

// export const upload = (file , store_code) => {
//   return callApi(`/store/${store_code}/images`, "post", file);
// };
