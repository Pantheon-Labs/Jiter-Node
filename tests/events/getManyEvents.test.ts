import Jiter, { BaseEvent, EventStatus, GetManyEventsOptions } from '../../src';
import { eventsPath } from '../../src/events/consts';
import { mockGetAxios } from '../testUtils/getAxiosMock';

const getAxiosMock = mockGetAxios();

describe('Events.getManyEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets many events matching specified properties', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseEvent>[] = [{ id }];
    getAxiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const eventData: GetManyEventsOptions = {
      scheduledEndDate: new Date().toISOString(),
      status: EventStatus.Sent,
    };

    const expectedQueryString = new URLSearchParams(eventData).toString();

    const response = await Jiter.Events.getManyEvents(eventData);

    expect(getAxiosMock.get).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.get).toHaveBeenCalledWith(`${eventsPath}?${expectedQueryString}`);
    expect(response).toBe(mockResponseData);
  });

  it('does not include query parameters if options are not specified', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseEvent>[] = [{ id }];
    getAxiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const response = await Jiter.Events.getManyEvents();

    expect(getAxiosMock.get).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.get).toHaveBeenCalledWith(`${eventsPath}`);
    expect(response).toBe(mockResponseData);
  });

  it('correctly parses an array of statuses', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseEvent>[] = [{ id }];
    getAxiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const eventData: GetManyEventsOptions = {
      scheduledEndDate: new Date().toISOString(),
      status: [EventStatus.Sent, EventStatus.Pending],
    };

    const expectedQueryString = new URLSearchParams(eventData).toString();

    const response = await Jiter.Events.getManyEvents(eventData);

    expect(getAxiosMock.get).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.get).toHaveBeenCalledWith(`${eventsPath}?${expectedQueryString}`);
    expect(response).toBe(mockResponseData);
  });
});
