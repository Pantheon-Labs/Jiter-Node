import Jiter, { cronJobsPath } from '../../src';
import { BaseCronJob } from '../../src/cronJobs/types';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('CronJobs.getManyCronJobs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets all of the cron jobs in your org', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseCronJob>[] = [{ id }];
    axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    // TODO: No filters yet!
    // const cronJobData: GetManyCronJobsOptions = {
    //   nextExecutionDate: new Date().toISOString(),
    //   status: CronJobStatus.Active,
    // };

    // const expectedQueryString = new URLSearchParams(eventData).toString();

    const response = await Jiter.CronJobs.getManyCronJobs({});
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(cronJobsPath);
    expect(response).toBe(mockResponseData);
  });

  // TODO: No filters yet!
  //   it('does not include query parameters if options are not specified', async () => {
  //     const id = '1337';
  //     const mockResponseData: Partial<BaseEvent>[] = [{ id }];
  //     axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

  //     const response = await Jiter.Events.getManyEvents();

  //     expect(axiosMock.get).toHaveBeenCalledTimes(1);
  //     expect(axiosMock.get).toHaveBeenCalledWith(`${eventsPath}`);
  //     expect(response).toBe(mockResponseData);
  //   });

  // TODO: No filters yet!
  //   it('correctly parses an array of statuses', async () => {
  //     const id = '1337';
  //     const mockResponseData: Partial<BaseEvent>[] = [{ id }];
  //     axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

  //     const eventData: GetManyEventsOptions = {
  //       scheduledEndDate: new Date().toISOString(),
  //       status: [EventStatus.Sent, EventStatus.Pending],
  //     };

  //     const expectedQueryString = new URLSearchParams(eventData).toString();

  //     const response = await Jiter.Events.getManyEvents(eventData);

  //     expect(axiosMock.get).toHaveBeenCalledTimes(1);
  //     expect(axiosMock.get).toHaveBeenCalledWith(`${eventsPath}?${expectedQueryString}`);
  //     expect(response).toBe(mockResponseData);
  //   });
});
