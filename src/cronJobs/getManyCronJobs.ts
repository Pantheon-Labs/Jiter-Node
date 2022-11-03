import { getAxios } from '../axios';
import { cronJobsPath } from './consts';

/**
 * Create a cron job
 */
export const getManyCronJobs = async (createCronJobOptions: CreateCronJobOptions) => {
  const response = await getAxios().post<BaseEvent>(cronJobsPath, { ...createEventOptions });
  return response.data;
};
