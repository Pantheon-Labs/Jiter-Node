import { BaseEvent } from './BaseEvent';
import { EventHistory } from './EventHistory';

export type EventWithHistory = BaseEvent & {
  history: EventHistory;
};
