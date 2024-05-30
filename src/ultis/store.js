export const getStoreId = () => {
    return localStorage.getItem("store_id")
}

export const setStoreId = (id) => {
    localStorage.setItem("store_id", id);
}
