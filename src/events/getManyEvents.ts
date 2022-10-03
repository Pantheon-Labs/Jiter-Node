import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys
 */
export const getManyEvents = async (getManyEventsOptions: GetManyEventsOptions) => {
  let baseUrl = `${baseRoute}?`;

  Object.keys(getManyEventsOptions).forEach((key) => {
    baseUrl += `${key}=${getManyEventsOptions[key as keyof GetManyEventsOptions]}`;
  });

  try {
    const response = await axiosInstance.get(baseUrl);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
