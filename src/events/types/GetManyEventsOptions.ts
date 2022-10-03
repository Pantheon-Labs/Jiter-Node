import { EventStatus } from './EventStatus';

type FilterableProperties = {
  /**
   * Filter events that are scheduled to start after this ISO timestamp
   */
  scheduledStartTime: string;
  /**
   * Filter events that are scheduled to start before this ISO timestamp
   */
  scheduledEndTime: string;
  /**
   * Filter events that were created after this ISO timestamp
   */
  createdAtStartTime: string;

  /**
   * Filter events that were created before this time
   */
  createdAtEndTime: string;

  /**
   * Filter events  based on status
   */
  status: EventStatus;
};

export type GetManyEventsOptions = Partial<FilterableProperties>;
