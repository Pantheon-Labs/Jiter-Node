import { BaseCronJob } from './BaseCronJob';

export type CreateCronJobOptions = Required<
  Pick<BaseCronJob, 'payload' | 'destination' | 'expression'>
>;
