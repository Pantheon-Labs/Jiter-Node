import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';

interface GetEventOptions {
  /**
   * ID of the event that you would like to retrieve
   */
  id: string;
}

/**
 * Retrieve info about a single event
 */
export const getEvent = async (getEventOptions: GetEventOptions) => {
  const { id } = getEventOptions;
  try {
    const response = await axiosInstance.get(`${baseRoute}/${id}`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
