import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { baseURL } from "./services.constants";

const axiosConfig: AxiosRequestConfig = {
  baseURL:baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const baseClient: AxiosInstance = axios.create(axiosConfig);