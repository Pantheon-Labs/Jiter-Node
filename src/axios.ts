import axios, { AxiosResponse } from "axios";
import { DEFAULT_TIMEOUT, DEFAULT_URL } from "./consts";

export const axiosInstance = axios.create({
  baseURL: DEFAULT_URL,
  timeout: DEFAULT_TIMEOUT,
});

export interface ApiError
  extends Pick<AxiosResponse, "data" | "status" | "headers"> {}
