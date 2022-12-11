import { BaseEvent } from './BaseEvent';

export type CreateEventOptions = Required<
  Pick<BaseEvent, 'scheduledTime' | 'payload' | 'destination'>
> & {
  disableEncryption?: boolean;
};
