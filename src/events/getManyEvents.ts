import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

interface SuccessResponse {
  success: BaseEvent[];
  failure: undefined;
}

interface FailureResponse {
  success: undefined;
  failure: AxiosError;
}

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys
 */
export const getManyEvents = async (
  getManyEventsOptions: GetManyEventsOptions,
): Promise<SuccessResponse | FailureResponse> => {
  let baseUrl = `${baseRoute}?`;

  Object.keys(getManyEventsOptions).forEach((key) => {
    baseUrl += `${key}=${getManyEventsOptions[key as keyof GetManyEventsOptions]}`;
  });

  try {
    const response = await axiosInstance.get(baseUrl);
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
