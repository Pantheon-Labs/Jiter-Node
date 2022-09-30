import { BaseEvent } from './BaseEvent';

type EditableProperties = Partial<Pick<BaseEvent, 'scheduledTime' | 'payload' | 'destination'>>;
type RequiredProperties = Pick<BaseEvent, 'id'>;
export type EditEventOptions = EditableProperties & RequiredProperties;
