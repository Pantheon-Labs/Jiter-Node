import { getAxios } from '../axios';
import { eventsPath } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetManyEventsOptions } from './types/GetManyEventsOptions';

/**
 * Retrieve info about many events. See {@link GetManyEventsOptions} for filterable keys.
 *
 * Note: If an event has a `sentAt` or `failedAt` date, by default, it will only be retrieved if that date is within the last 7 days.
 * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
 */
export const getManyEvents = async (getManyEventsOptions?: GetManyEventsOptions) => {
  let queryString = '';
  if (getManyEventsOptions) {
    const { status, ...options } = getManyEventsOptions;

    const query: Record<string, string> = {
      ...options,
    };
    if (status) {
      query.status = Array.isArray(status) ? status.toString() : status;
    }
    queryString = new URLSearchParams(query).toString();
  }

  const url = queryString ? `${eventsPath}?${queryString}` : eventsPath;

  const response = await getAxios().get<BaseEvent[]>(url);
  return response.data;
};
