import axios from "axios"

console.log(import.meta.env.VITE_BASE_URL)
export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const DataKereta = axios.create({
    baseURL: "https://api.npoint.io/b9b0d2c4e9e10b319790"
})


export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common['Authorization']
    }
}
