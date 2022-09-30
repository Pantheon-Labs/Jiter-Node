import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';

interface EditEventOptions extends Partial<BaseEvent> {
  /**
   * ID of the event that you would like to edit
   */
  id: string;
}

export const editEvent = async (editEventOptions: EditEventOptions) => {
  try {
    const response = await axiosInstance.put(`${baseRoute}/${editEventOptions.id}`, {
      ...editEventOptions,
      id: undefined,
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    return error;
  }
};


