import cron from "node-schedule";

import { logger } from "./Logger.js";

import { Job } from "./jobs/Job.js";

export class Scheduler {
	/**
	 * The jobs to run.
	 */
	private jobs: Job[] = [];

	/**
	 * @param jobs - The jobs to run.
	 */
	constructor(jobs: Job[]) {
		this.jobs = jobs;
	}

	/**
	 * Initializes the jobs.
	 */
	init(): void {
		for (const job of this.jobs) {
			cron.scheduleJob(
				{
					start: new Date(Date.now() + job.delay),
					rule: job.schedule,
				},
				async () => {
					try {
						logger.info(`Running job ${job.name}`);
						await job.run();
						logger.info(`Finished running job ${job.name}`);
					} catch (error) {
						logger.error(`Failed to run job ${job.name}: ${error}`);
					}
				},
			);
			logger.info(`Scheduled job ${job.name}`);
		}
	}
}
