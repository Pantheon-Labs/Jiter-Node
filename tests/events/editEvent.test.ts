import Jiter, { BaseEvent, EditEventOptions, EventStatus } from '../../src';
import { baseRoute } from '../../src/events/consts';
import { mockGetAxios } from '../testUtils/getAxiosMock';

const getAxiosMock = mockGetAxios();

describe('Events.editEvent', () => {
  it('edits an event with editable properties', async () => {
    const id = '123';
    const mockResponseData: Partial<BaseEvent> = { id };
    getAxiosMock.put.mockReturnValueOnce({ data: mockResponseData });

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

    expect(getAxiosMock.put).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.put).toHaveBeenCalledWith(
      `${baseRoute}/${id}`,
      expect.objectContaining({ ...eventData }),
    );
    expect(response).toBe(mockResponseData);
  });
});
