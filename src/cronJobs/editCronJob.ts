import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, EditCronJobOptions } from './types';

/**
 * Edit a cron job
 */
export const editCronJob = async (editCronJobOptions: EditCronJobOptions) => {
  const response = await getAxios().post<BaseCronJob>(cronJobsPath, { ...editCronJobOptions });
  return response.data;
};
