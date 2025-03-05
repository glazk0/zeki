import { ClientEvents } from 'discord.js';

export abstract class Event {
	/**
	 * Event identifier.
	 */
	readonly id: string;

	/**
	 * Event to trigger.
	 */
	readonly event: keyof ClientEvents;

	/**
	 * Whether the event should only be triggered once.
	 */
	readonly once: boolean;

	/**
	 * @param id - Event identifier.
	 * @param event - Event to trigger.
	 * @param once - Whether the event should only be triggered once.
	 */
	constructor(id: string, event: keyof ClientEvents, once = false) {
		this.id = id;
		this.event = event;
		this.once = once;
	}

	/**
	 * @param args - The arguments.
	 */
	abstract run(...args: any[]): Promise<void>;
}
