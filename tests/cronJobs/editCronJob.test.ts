import Jiter, { BaseEvent, EditEventOptions, EventStatus } from '../../src';
import { eventsPath } from '../../src/events/consts';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('Events.editEvent', () => {
  it('edits an event with editable properties', async () => {
    const id = '123';
    const mockResponseData: Partial<BaseEvent> = { id };
    axiosMock.put.mockReturnValueOnce({ data: mockResponseData });

    const eventData: Partial<EditEventOptions> = {
      payload: 'beep',
      destination: 'the moon',
      status: EventStatus.Cancelled,
    };
    const editEventOptions: EditEventOptions = {
      ...eventData,
      id,
    };

    const response = await Jiter.Events.editEvent({ ...editEventOptions });

    expect(axiosMock.put).toHaveBeenCalledTimes(1);
    expect(axiosMock.put).toHaveBeenCalledWith(
      `${eventsPath}/${id}`,
      expect.objectContaining({ ...eventData }),
    );
    expect(response).toBe(mockResponseData);
  });
});
