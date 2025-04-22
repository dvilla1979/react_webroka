import axios from "axios"

const BASE_URL: string = (process.env.REACT_APP_API_URL as string)

console.log(BASE_URL);

export const instance = axios.create({
    baseURL: BASE_URL,
   // withCredentials: true,
})