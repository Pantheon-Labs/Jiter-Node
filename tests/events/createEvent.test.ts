import Jiter, { BaseEvent } from '../../src';
import { eventsPath } from '../../src/events/consts';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('Events.createEvent', () => {
  it('creates an event in an hour', async () => {
    const mockData: Partial<BaseEvent> = { id: 'hello world' };
    axiosMock.post.mockReturnValueOnce({ data: mockData });

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'https://your.app/webhooks',
    };
    const response = await Jiter.Events.createEvent(createEventOptions);

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(
      eventsPath,
      expect.objectContaining({ ...createEventOptions }),
    );
    expect(response).toBe(mockData);
  });
});
