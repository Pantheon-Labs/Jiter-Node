import { getAxios } from '../axios';

/**
 * Create a cron job
 */
export const createCronJob = async (createCronJobOptions: CreateCronJobOptions) => {
  const response = await getAxios().post<BaseEvent>(eventsPath, { ...createEventOptions });
  return response.data;
};
