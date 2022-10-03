import Jiter, { BaseEvent, CreateEventOptions, EventStatus } from '../src';

describe('events', () => {
  Jiter.init({
    baseUrl: 'asd',
    apiKey: 'test',
  });

  it('creates an event in 1hr', async () => {
    const futureTime = new Date(Date() + 1000 * 60 * 60).toISOString();
    const eventOptions: CreateEventOptions = {
      destination: `https://joswayski.requestcatcher.com`,
      payload: 'beans',
      scheduledTime: futureTime,
    };
    const event = await Jiter.Events.createEvent(eventOptions);

    expect(event.destination).toBe(eventOptions.destination);
    expect(event.payload).toBe(eventOptions.payload);
    expect(event.scheduledTime).toBe(eventOptions.scheduledTime);
    expect(event.status).toBe(EventStatus.Pending);
  });
});
