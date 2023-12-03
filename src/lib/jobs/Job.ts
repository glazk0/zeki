export abstract class Job {
	/**
	 * The name of the job.
	 */
	abstract name: string;
	/**
	 * The schedule of the job, in cron format.
	 */
	abstract schedule: string;
	/**
	 * Whether the job should run only once.
	 */
	once = false;
	/**
	 * The delay of the job, in milliseconds.
	 */
	delay = 0;
	/**
	 * The job's function.
	 */
	abstract run(): Promise<void>;
}
