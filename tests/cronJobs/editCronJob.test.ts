import Jiter, { cronJobsPath } from '../../src';
import { BaseCronJob, CronJobStatus, EditCronJobOptions } from '../../src/cronJobs/types';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('CronJobs.editCronJob', () => {
  it('edits a cron job with editable properties', async () => {
    const id = '123';
    const mockResponseData: Partial<BaseCronJob> = { id };
    axiosMock.put.mockReturnValueOnce({ data: mockResponseData });

    const cronJobData: Partial<EditCronJobOptions> = {
      payload: 'beep',
      destination: 'the moon',
      status: CronJobStatus.Disabled,
    };
    const editCronJobOptions: EditCronJobOptions = {
      ...cronJobData,
      id,
    };

    const response = await Jiter.CronJobs.editCronJob(editCronJobOptions);

    expect(axiosMock.put).toHaveBeenCalledTimes(1);
    expect(axiosMock.put).toHaveBeenCalledWith(
      `${cronJobsPath}/${id}`,
      expect.objectContaining({ ...cronJobData }),
    );
    expect(response).toBe(mockResponseData);
  });
});
