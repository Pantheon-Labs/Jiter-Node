import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';

interface CreateEventOptions extends Required<BaseEvent> {}

export const createEvent = async (createEventOptions: CreateEventOptions) => {
  try {
    const response = await axiosInstance.post(baseRoute, { ...createEventOptions });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
