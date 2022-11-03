import { CronJobStatus } from './CronJobStatus';
// TODO
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
   *
   */
  expression: string;

  /**
   * The endpoint that we should POST events to.
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

};
