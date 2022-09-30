import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';

const baseRoute = '/events';

interface CreateEventProps {
  // TODO: other properties
  payload: string;
}

// TODO: Example
export const createEvent = async ({ payload }: CreateEventProps) => {
  try {
    const response = await axiosInstance.post(baseRoute, { payload });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
