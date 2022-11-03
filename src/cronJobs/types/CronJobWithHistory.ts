import { BaseCronJob } from './BaseCronJob';
import { CronJobHistory } from './CronJobHistory';

export type CronJobWithHistory = BaseCronJob & {
  history: CronJobHistory;
};
