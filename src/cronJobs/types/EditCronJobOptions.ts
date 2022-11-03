import { BaseCronJob } from './BaseCronJob';

type EditableProperties = Partial<
  Pick<BaseCronJob, 'payload' | 'destination' | 'status' | 'expression'>
>;
type RequiredProperties = Pick<BaseCronJob, 'id'>;

export type EditCronJobOptions = EditableProperties & RequiredProperties;
