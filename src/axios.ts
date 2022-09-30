import axios from 'axios';
import { getJiterConfig } from './init';

const config = getJiterConfig();
export const axiosInstance = axios.create({
  baseURL: config.defaultUrl,
  timeout: config.defaultTimeout,
});
