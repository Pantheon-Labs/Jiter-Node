import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, GetCronJobOptions } from './types';

/**
 * Get info about a specific cron job
 */
export const getCronJob = async (getCronJobOptions: GetCronJobOptions) => {
  const response = await getAxios().post<BaseCronJob>(cronJobsPath, { ...getCronJobOptions });
  return response.data;
};
