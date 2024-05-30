export const getBranchId = () => {
  return localStorage.getItem("branch_id");
};

export const setBranchId = (id) => {
  localStorage.setItem("branch_id", id);
};

export const setBranchName = (name) => {
  localStorage.setItem("branch_name", name);
};

export const getBranchName = () => {
  return localStorage.getItem("branch_name");
};

export const setStoreCode = (store_code) => {
  localStorage.setItem("store_code", store_code);
};

export const getStoreCode = () => {
  return localStorage.getItem("store_code");
};

export const getBranchIds = () => {
  return localStorage.getItem("branch_ids");
};

export const setBranchIds = (id) => {
  localStorage.setItem("branch_ids", id);
};
