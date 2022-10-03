import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys
 */
export const getManyEvents = async (getManyEventsOptions: GetManyEventsOptions) => {
  let baseUrl = `${baseRoute}?`;

  Object.keys(getManyEventsOptions).forEach((key) => {
    baseUrl += `${key}=${getManyEventsOptions[key as keyof GetManyEventsOptions]}`;
  });

  const response = await axiosInstance.get<BaseEvent[]>(baseUrl);
  return response.data;
};
