import { EventStatus } from './EventStatus';
// TODO

type FilterableProperties = {
  /**
   * Filter events based on status
   * See {@link EventStatus}
   */
  status: EventStatus | EventStatus[];

  /**
   * An ISO timestamp in the _future_ to get any events scheduled **after** this time
   */
  scheduledStartDate: string;

  /**
   * An ISO timestamp in the _future_ to get any events scheduled **before** this time
   */
  scheduledEndDate: string;

  /**
   * An ISO timestamp in the _past_ to get any events sent **after** this time.
   *
   * By default, events will only be returned if this date is in the last 7 days.
   * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
   */
  sentAtStartDate: string;

  /**
   * An ISO timestamp in the _past_ to get any events sent **before** this time.
   *
   * By default, events will only be returned if this date is in the last 7 days.
   * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
   */
  sentAtEndDate: string;

  /**
   * An ISO timestamp in the _past_ to get any events that failed **after** this time.
   *
   * By default, events will only be returned if this date is in the last 7 days.
   * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
   */
  failedAtStartDate: string;

  /**
   * An ISO timestamp in the _past_ to get any events that failed **before** this time.
   *
   * By default, events will only be returned if this date is in the last 7 days.
   * See {@link https://docs.jiter.dev/docs/quotas-and-limits/#events-searching---get-events--getmanyevents} for more info
   */
  failedAtEndDate: string;
};

export type GetManyEventsOptions = Partial<FilterableProperties>;
