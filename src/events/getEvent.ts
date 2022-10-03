import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetEventOptions } from './types/GetEventOptions';

/**
 * Retrieve info about a single event
 */
export const getEvent = async (getEventOptions: GetEventOptions) => {
  const { id } = getEventOptions;
  try {
    const response = await axiosInstance.get(`${baseRoute}/${id}`);
    return response.data as BaseEvent;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
