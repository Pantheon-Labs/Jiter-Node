import axios from 'axios';
import { JiterError } from './types';

export const isJiterError = (error: unknown): error is JiterError => axios.isAxiosError(error);
