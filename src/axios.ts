import axios from 'axios';
import { getJiterConfig } from './config';

const config = getJiterConfig();
export const axiosInstance = axios.create({
  baseURL: config.defaultUrl,
  timeout: config.defaultTimeout,
});
