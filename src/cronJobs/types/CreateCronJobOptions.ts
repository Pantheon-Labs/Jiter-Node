import { BaseEvent } from './BaseEvent';
// TODO

export type CreateEventOptions = Required<
  Pick<BaseEvent, 'scheduledTime' | 'payload' | 'destination'>
>;
