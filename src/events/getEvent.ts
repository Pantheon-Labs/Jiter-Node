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
    const response = await axiosInstance.get<BaseEvent>(`${baseRoute}/${id}`);
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
