import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { EditEventOptions } from './types/EditEventOptions';

/**
 * Edit a single event
 */
export const editEvent = async (editEventOptions: EditEventOptions) => {
  const { id, ...editableProperties } = editEventOptions;
  try {
    const response = await axiosInstance.put<BaseEvent>(`${baseRoute}/${id}`, {
      ...editableProperties,
    });
    return {
      success: response.data,
      failure: undefined,
    };
  } catch (err) {
    const error = err as AxiosError;
    return {
      success: undefined,
      failure: error,
    };
  }
};
