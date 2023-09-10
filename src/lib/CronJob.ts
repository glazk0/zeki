import cron from 'node-cron';

export type TaskFunction = () => Promise<void> | void;

export function createCronJob(task: TaskFunction, schedule: string) {
  return cron.schedule(schedule, async () => {
    await task();
  });
}
