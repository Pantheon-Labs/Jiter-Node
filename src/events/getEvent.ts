import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetEventOptions } from './types/GetEventOptions';

interface SuccessResponse {
  success: BaseEvent;
  failure: undefined;
}

interface FailureResponse {
  success: undefined;
  failure: AxiosError;
}

/**
 * Retrieve info about a single event
 */
export const getEvent = async (
  getEventOptions: GetEventOptions,
): Promise<SuccessResponse | FailureResponse> => {
  const { id } = getEventOptions;
  try {
    const response = await axiosInstance.get(`${baseRoute}/${id}`);
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
