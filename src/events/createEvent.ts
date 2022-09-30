import { AxiosError } from "axios";
import { axiosInstance } from "../axios";
const baseRoute = "/events";

interface CreateEventProps {
  // TODO: other properties
  payload: string;
}
export const createEvent = async ({ payload }: CreateEventProps) => {
  try {
    await axiosInstance.post(baseRoute, { payload });
  } catch (err) {
    const error = err as AxiosError;

    error.status
  }
};
