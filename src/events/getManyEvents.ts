import { getAxios } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys.
 *
 * Note: If an event has a `sentAt` or `failedAt` date, by default, it will only be retrieved if that date is within the last 7 days.
 * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
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
