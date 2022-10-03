import { AxiosError } from 'axios';
import { axiosInstance } from '../axios';
import { baseRoute } from './consts';
import { BaseEvent } from './types/BaseEvent';
import { EditEventOptions } from './types/EditEventOptions';

interface SuccessResponse {
  success: BaseEvent;
  failure: undefined;
}

interface FailureResponse {
  success: undefined;
  failure: AxiosError;
}

/**
 * Edit a single event
 */
export const editEvent = async (
  editEventOptions: EditEventOptions,
): Promise<SuccessResponse | FailureResponse> => {
  const { id, ...editableProperties } = editEventOptions;
  try {
    const response = await axiosInstance.put(`${baseRoute}/${id}`, {
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
