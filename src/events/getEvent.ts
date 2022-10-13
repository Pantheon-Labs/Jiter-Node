import { getAxios } from '../axios';
import { eventsPath } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { GetEventOptions } from './types/GetEventOptions';

/**
 * Retrieve info about a single event
 */
export const getEvent = async (getEventOptions: GetEventOptions) => {
  const { id } = getEventOptions;
  const response = await getAxios().get<BaseEvent>(`${eventsPath}/${id}`);
  return response.data;
};
