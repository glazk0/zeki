export interface INews {
	key?: string;
	title?: string;
	locale?: string;
	date?: string;
	type?: string;
	image?: string;
	url?: string;
}

export interface ITimeObject {
	hour: number;
	minute: number;
}

export interface IPeriod {
	start: ITimeObject;
	end: ITimeObject;
}
