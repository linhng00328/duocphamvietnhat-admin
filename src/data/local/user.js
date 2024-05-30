export const getToken = () =>{
    return  localStorage.getItem('token')
}
export const getUserId = () =>{
    return  localStorage.getItem('userId')

}
export const setToken = (token) =>{
    localStorage.setItem("token", token);

}
export const setUserId = (userId) =>{
    localStorage.setItem("userId", userId);
}

export const removeToken = () =>{
    localStorage.clear();
}
