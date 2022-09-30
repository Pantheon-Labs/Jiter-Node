import { EventStatus } from './EventStatus';

export interface BaseEvent {
  /**
   * ID of this event
   */
  id: string;
  /**
   * Your stringified payload
   * @example '{"action":"buyGroceries","values":["eggs","bacon","pasta","bread"]}'
   */
  payload: string;
  /**
   * An ISO timestamp of when you would like your event sent back to you
   * @example '2022-09-30T22:22:06.390Z'
   */
  scheduledTime: string;
  /**
   * The endpoint that we should POST events to.
   * @example
   * https://your.app/webhooks/jiter
   */
  destination: string;

  /**
   * The current event status. See {@link EventStatus}
   */
  status: EventStatus;

  /**
   * When this event was created
   */
  createdAt: string;

  /**
   * When this event was last updated
   */
  updatedAt: string;

  /**
   * ID of the org this event belongs to
   */
  org: string;

  /**
   * Date when this event was sent to your destination. This will only be here if the event was successfully sent.
   */
  sentAt?: string;

  /**
   * Date when this event failed. Either to queue or to send to your endpoint.
   */
  failedAt?: string;
}
