import { BaseEvent } from './BaseEvent';
import { EventStatus } from './EventStatus';

type EditableProperties = Partial<
  Pick<BaseEvent, 'payload' | 'destination'> & { status: EventStatus.Cancelled }
>;
type RequiredProperties = Pick<BaseEvent, 'id'>;

export type EditEventOptions = EditableProperties & RequiredProperties;
