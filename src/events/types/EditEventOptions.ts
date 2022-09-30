import { BaseEvent } from './BaseEvent';

export type EditEventOptions = Required<
  Pick<BaseEvent, 'scheduledTime' | 'payload' | 'destination' | 'id'>
>;

