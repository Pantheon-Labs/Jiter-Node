import { getAxios } from '../axios';
import { eventsPath } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { EditEventOptions } from './types/EditEventOptions';

/**
 * Edit a single event
 */
export const editEvent = async (editEventOptions: EditEventOptions) => {
  const { id, ...editableProperties } = editEventOptions;
  const response = await getAxios().put<BaseEvent>(`${eventsPath}/${id}`, {
    ...editableProperties,
  });
  return response.data;
};
