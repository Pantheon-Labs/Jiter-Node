import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, GetCronJobOptions } from './types';

/**
 * Get info about a specific cron job
 */
export const getCronJob = async (getCronJobOptions: GetCronJobOptions) => {
  const { id } = getCronJobOptions;
  const response = await getAxios().get<BaseCronJob>(`${cronJobsPath}/${id}`);
  return response.data;
};
