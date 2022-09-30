import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { EditEventOptions } from './types/EditEventOptions';

/**
 * Edit a single event
 */
export const editEvent = async (editEventOptions: EditEventOptions) => {
  const { id, ...editableProperties } = editEventOptions;
  try {
    const response = await axiosInstance.put(`${baseRoute}/${id}`, {
      ...editableProperties,
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};
