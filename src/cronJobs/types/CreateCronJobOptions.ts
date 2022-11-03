import { BaseCronJob } from './BaseCronJob';

export type CreateEventOptions = Required<
  Pick<BaseCronJob, 'payload' | 'destination' | 'expression'>
>;
