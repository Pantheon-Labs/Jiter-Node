export type CronJobHistory = {
  cron: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  responseData?: string;
  requestData?: string;
};
