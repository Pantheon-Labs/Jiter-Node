import Jiter, { BaseEvent, GetEventOptions } from '../../src';
import { baseRoute } from '../../src/events/consts';
import { mockGetAxios } from '../testUtils/getAxiosMock';

const getAxiosMock = mockGetAxios();

describe('Events.getEvent', () => {
  it('gets an event matching specified properties', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseEvent> = { id };
    getAxiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const eventData: GetEventOptions = {
      id,
    };

    const response = await Jiter.Events.getEvent(eventData);

    expect(getAxiosMock.get).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.get).toHaveBeenCalledWith(`${baseRoute}/${id}`);
    expect(response).toBe(mockResponseData);
  });
});
