import { getAxios } from '../axios';
import { getJiterConfig } from '../config';
import { encrypt } from '../utils';
import { eventsPath } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { CreateEventOptions } from './types/CreateEventOptions';

/**
 * Create an event
 */
export const createEvent = async ({ overrides, ...createEventOptions }: CreateEventOptions) => {
  const config = getJiterConfig();
  const response = await getAxios().post<BaseEvent>(
    eventsPath,
    { ...createEventOptions },
    {
      transformRequest: (data: CreateEventOptions) => {
        if (overrides?.encryption === false || !config.encryption) return data;

        const payload = encrypt(data.payload);

        return { ...data, payload };
      },
    },
  );
  return response.data;
};
