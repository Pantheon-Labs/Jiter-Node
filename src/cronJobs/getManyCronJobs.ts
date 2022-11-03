import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, GetManyCronJobsOptions } from './types';

/**
 * Get all the cron jobs in your org
 */
export const getManyCronJobs = async (getManyCronJobsOptions: GetManyCronJobsOptions) => {
  const response = await getAxios().post<BaseCronJob>(cronJobsPath, { ...getManyCronJobsOptions });
  return response.data;
};
