import { getAxios } from '../axios';
import { eventsPath } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { CreateEventOptions } from './types/CreateEventOptions';

/**
 * Create an event
 */
export const createEvent = async (createEventOptions: CreateEventOptions) => {
  const response = await getAxios().post<BaseEvent>(eventsPath, { ...createEventOptions });
  return response.data;
};
