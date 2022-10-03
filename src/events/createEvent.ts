import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { CreateEventOptions } from './types/CreateEventOptions';

interface SuccessResponse {
  success: BaseEvent;
  failure: undefined;
}

interface FailureResponse {
  success: undefined;
  failure: AxiosError;
}

/**
 * Create an event
 */
export const createEvent = async (
  createEventOptions: CreateEventOptions,
): Promise<SuccessResponse | FailureResponse> => {
  try {
    const response = await axiosInstance.post(baseRoute, { ...createEventOptions });
    return {
      success: response.data as BaseEvent,
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
