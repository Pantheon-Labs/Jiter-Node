import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { CreateEventOptions } from './types/CreateEventOptions';

/**
 * Create an event
 */
export const createEvent = async (createEventOptions: CreateEventOptions) => {
  try {
    const response = await axiosInstance.post<BaseEvent>(baseRoute, { ...createEventOptions });
    return {
      success: response.data,
      failure: undefined,
    };
  } catch (err) {
    const error = err as AxiosError;
    return {
      success: undefined,
      failure: error,
    };
  }
};
