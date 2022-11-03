import Jiter, { EventWithHistory, GetEventOptions } from '../../src';
import { eventsPath } from '../../src/events/consts';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('Events.getEvent', () => {
  it('gets an event matching specified properties', async () => {
    const id = '1337';
    const mockResponseData: Partial<EventWithHistory> = { id };
    axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const eventData: GetEventOptions = {
      id,
    };

    const response = await Jiter.Events.getEvent(eventData);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(`${eventsPath}/${id}`);
    expect(response).toBe(mockResponseData);
  });
});
