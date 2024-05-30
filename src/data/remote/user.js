import callApi from "../../ultis/apiCaller";

export const checkExsitEmailPhone = (form) => {
  return callApi("/login/check_exists", "post", form);
};

export const postRegister = (form) => {
  return callApi("/register", "post", form);
};

export const postLogin = (form) => {
  return callApi("/login", "post", form);
};

export const changePassword = (form) => {
  return callApi("/change_password", "post", form);
};


export const postResetPassword = (form) =>{
    return callApi("/reset_password", "post", form);
}

export const sendOtp = (form) =>{
  return callApi("/send_otp", "post", form);
}

export const sendOtpToEmail = (form) =>{
  return callApi("/send_email_otp", "post", form);
}

export const fetchUserId = () => {
  return callApi("/profile", "get", null);
};

export const updateUser = (user) => {
  return callApi("/profile", "PUT", user);
};
