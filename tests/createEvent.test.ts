import Jiter, { BaseEvent, CreateEventOptions, EventStatus } from '../src';
import { getAxios } from '../src/axios';
import { baseRoute } from '../src/events/consts';

const apiKey = 'test';

jest.mock('../src/axios');
describe('Events Resource', () => {
  beforeAll(() => {
    Jiter.init({
      apiKey,
    });
  });

  it('creates an event in an hour', async () => {
    const mockData = { id: 5 };
    const mockPost = jest.fn(async (...args: any[]) => ({
      data: mockData,
    }));
    (getAxios as unknown as jest.Mock).mockImplementationOnce(() => ({
      post: mockPost,
    }));

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'asd',
    };
    const response = await Jiter.Events.createEvent(createEventOptions);

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith(
      baseRoute,
      expect.objectContaining({ ...createEventOptions }),
    );
    expect(response).toEqual(mockData);
  });
});
