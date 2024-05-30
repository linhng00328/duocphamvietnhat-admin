import callApi from "../../ultis/apiCaller";

export const fetchAllData = (store_code) => {
  return callApi(`/store/${store_code}/banner_webad`, "get", null);
};

export const createBannerAds = (store_code, data) => {
  return callApi(`/store/${store_code}/banner_webad`, "post", data);
};

export const updateBannerAds = (bannerAdsId, categoryB, store_code) => {
  return callApi(
    `/store/${store_code}/banner_webad/${bannerAdsId}`,
    "put",
    categoryB
  );
};

export const destroyBannerAds = (store_code, bannerAdsId) => {
  return callApi(
    `/store/${store_code}/banner_webad/${bannerAdsId}`,
    "delete",
    null
  );
};
