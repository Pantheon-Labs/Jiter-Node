export interface BaseEvent {
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
}
