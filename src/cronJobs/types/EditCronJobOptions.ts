import { BaseCronJob } from './BaseCronJob';
import { CronJobStatus } from './CronJobStatus';

type EditableProperties = Partial<
  Pick<BaseCronJob, 'payload' | 'destination'> & { status: CronJobStatus }
>;
type RequiredProperties = Pick<BaseCronJob, 'id'>;

export type EditCronJobOptions = EditableProperties & RequiredProperties;
