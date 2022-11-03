import { getAxios } from '../axios';
import { cronJobsPath } from './consts';
import { BaseCronJob, EditCronJobOptions } from './types';

/**
 * Edit a cron job
 */
export const editCronJob = async (editCronJobOptions: EditCronJobOptions) => {
  const { id, ...editableProperties } = editCronJobOptions;
  const response = await getAxios().put<BaseCronJob>(`${cronJobsPath}/${id}`, editableProperties);
  return response.data;
};
