import { getAxios } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { CreateEventOptions } from './types/CreateEventOptions';

/**
 * Create an event
 */
export const createEvent = async (createEventOptions: CreateEventOptions) => {
  const response = await getAxios().post<BaseEvent>(baseRoute, { ...createEventOptions });
  return response.data;
};
