import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';

interface CreateEventOptions {
  /**
   * Your stringified payload
   */
  payload: string;
  /**
   * An ISO timestamp of when you would like your event sent back to you
   */
  scheduledTime: string;
  /**
   * The endpoint that we should POST events to. https://your.app/webhooks/jiter
   */
  destination: string;
}

export const createEvent = async (options: CreateEventOptions) => {
  try {
    const response = await axiosInstance.post(baseRoute, { ...options });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
