import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, CreateCronJobOptions } from './types';

/**
 * Edit a cron job
 */
export const editCronJob = async (createCronJobOptions: CreateCronJobOptions) => {
  const response = await getAxios().post<BaseCronJob>(cronJobsPath, { ...createCronJobOptions });
  return response.data;
};
