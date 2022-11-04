import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, CreateCronJobOptions } from './types';

/**
 * Create a cron job
 */
export const createCronJob = async (createCronJobOptions: CreateCronJobOptions) => {
  const response = await getAxios().post<BaseCronJob>(cronJobsPath, createCronJobOptions);
  return response.data;
};
