import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';

interface GetManyEventsOptions extends Omit<{}

/**
 * Retrieve info about a single event
 */
export const getEvent = async (getManyEventsOptions: GetManyEventsOptions) => {
  let baseUrl = `${baseRoute}`;

  try {
    const response = await axiosInstance.get(baseUrl);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
