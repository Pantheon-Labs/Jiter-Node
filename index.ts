import { JiterInit } from './src/config';
import { BaseEvent } from './src/events/types/BaseEvent';
import Jiter from './src/jiter';

//  TODO: Remove
// Example:
const main = async () => {
  JiterInit({ apiKey: 'asd' });

  let createdEvent: BaseEvent;
  try {
    createdEvent = await Jiter.Events.createEvent({
      destination: `https://joswayski.requestcatcher.com`,
      payload: 'Hello there!',
      scheduledTime: new Date(Date() + 8000).toISOString(),
    });

    console.log(createdEvent);
  } catch (error) {
    console.error(error);
  }
};

void main();
