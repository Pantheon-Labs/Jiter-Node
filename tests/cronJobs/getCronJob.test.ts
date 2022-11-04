import Jiter from '../../src';
import { cronJobsPath } from '../../src/cronJobs/consts';
import { CronJobWithHistory, GetCronJobOptions } from '../../src/cronJobs/types';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('CronJobs.getCronJob', () => {
  it('gets a cron job matching the specified properties', async () => {
    const id = '1337';
    const mockResponseData: Partial<CronJobWithHistory> = { id };
    axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const cronJobData: GetCronJobOptions = {
      id,
    };

    const response = await Jiter.CronJobs.getCronJob(cronJobData);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(`${cronJobsPath}/${id}`);
    expect(response).toBe(mockResponseData);
  });
});
