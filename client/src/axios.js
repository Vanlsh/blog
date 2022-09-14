import axios from "axios";
import { URL_BACK_END } from "./config.js";

const instance = axios.create({
  baseURL: `${URL_BACK_END}/api`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
