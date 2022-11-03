import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob } from './types';

/**
 * Get all the cron jobs in your org
 */
export const getManyCronJobs = async () => {
  const response = await getAxios().get<BaseCronJob>(cronJobsPath);
  return response.data;
};
