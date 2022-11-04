import { CronJobStatus } from './CronJobStatus';

export type BaseCronJob = {
  /**
   * ID of this cron job
   */
  id: string;

  /**
   * Your stringified payload
   * @example '{"action":"buyGroceries","values":["eggs","bacon","pasta","bread"]}'
   */
  payload: string;

  /**
   * A valid cron expression
   * @example '* * * * *'
   *
   * @see {@link https://crontab.guru} for more examples
   *
   */
  expression: string;

  /**
   * The endpoint that we should POST cron jobs to at your desired schedule
   * @example
   * 'https://your.app/webhooks/jiter'
   */
  destination: string;

  /**
   * The current cron job status. See {@link CronJobStatus}
   */
  status: CronJobStatus;

  /**
   * When this cron job was created
   */
  createdAt: string;

  /**
   * When this cron job was last updated
   */
  updatedAt: string;

  /**
   * ID of the org this cron job belongs to
   */
  org: string;

  /**
   * When the next execution date of this cron job will be
   */
  nextExecutionDate?: string;
};
