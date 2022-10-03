import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { EditEventOptions } from './types/EditEventOptions';

/**
 * Edit a single event
 */
export const editEvent = async (editEventOptions: EditEventOptions) => {
  const { id, ...editableProperties } = editEventOptions;
  const response = await axiosInstance.put<BaseEvent>(`${baseRoute}/${id}`, {
    ...editableProperties,
  });
  return response.data;
};
