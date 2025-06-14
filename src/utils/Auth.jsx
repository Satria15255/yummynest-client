export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.role === "admin"
}
export const getToken = () => localStorage.getItem("token")
export const getUserId = () => localStorage.getItem("userId")

export const isLoggedIn = () => {
    return !!getToken() && !!getUserId()
}