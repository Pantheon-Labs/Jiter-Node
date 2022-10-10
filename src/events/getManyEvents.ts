import { getAxios } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys
 */
export const getManyEvents = async (getManyEventsOptions?: GetManyEventsOptions) => {
  const query = getManyEventsOptions
    ? new URLSearchParams(getManyEventsOptions).toString()
    : undefined;
  const queryString = query ? `?${query}` : '';
  const baseUrl = `${baseRoute}${queryString}`;

  const response = await getAxios().get<BaseEvent[]>(baseUrl);
  return response.data;
};
