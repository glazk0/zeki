import cron, { type ScheduleOptions } from 'node-cron';

export type TaskFunction = () => Promise<void> | void;

export function createCronJob(
  task: TaskFunction,
  schedule: string,
  options?: ScheduleOptions,
) {
  return cron.schedule(
    schedule,
    async () => {
      await task();
    },
    options,
  );
}
