import axios, { AxiosInstance } from 'axios';
import { getJiterConfig } from './config';

let axiosInstance: AxiosInstance;

export const getAxios = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;

  const config = getJiterConfig();

  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout,
    headers: {
      'x-api-key': config.apiKey,
    },
  });

  return axiosInstance;
};
