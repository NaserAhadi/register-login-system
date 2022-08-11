/* eslint-disable no-undef */
import axios from "axios";

export const apiService = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}`
})

 