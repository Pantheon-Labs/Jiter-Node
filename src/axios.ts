import axios from 'axios';
import { DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';

export const axiosInstance = axios.create({
  baseURL: DEFAULT_URL,
  timeout: DEFAULT_TIMEOUT,
});
