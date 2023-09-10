import { IPeriod, ITimeObject } from '../types';

/**
 * Thanks adain for the original code!
 */
class PaliaTime {
  private currentRealSeconds: number;

  private currentPaliaSeconds: number;

  private periods: { [key: string]: IPeriod } = {
    day: { start: { hour: 6, minute: 0 }, end: { hour: 18, minute: 0 } },
    evening: { start: { hour: 18, minute: 0 }, end: { hour: 21, minute: 0 } },
    morning: { start: { hour: 3, minute: 0 }, end: { hour: 6, minute: 0 } },
    night: { start: { hour: 21, minute: 0 }, end: { hour: 3, minute: 0 } },
  };

  constructor() {
    const now = new Date();
    this.currentRealSeconds = now.getMinutes() * 60 + now.getSeconds();
    this.currentPaliaSeconds = this.currentRealSeconds * 24;
    this.initializePeriods();
  }

  private initializePeriods() {
    for (const period in this.periods) {
      const { start, end } = this.periods[period];
      this.periods[period] = {
        start,
        end,
      };
    }
  }

  formatPaliaTime(paliaSeconds: number): string {
    const hours = Math.floor(paliaSeconds / 3600);
    const minutes = Math.floor((paliaSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  formatRealTime(realSeconds: number): string {
    const minutes = Math.floor(realSeconds / 60);
    const seconds = realSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  isActive(startTime: ITimeObject, endTime: ITimeObject): boolean {
    const startInSeconds = this.convertToSeconds(startTime);
    const endInSeconds = this.convertToSeconds(endTime);
    const isInSamePeriod =
      startInSeconds <= endInSeconds
        ? this.currentPaliaSeconds >= startInSeconds &&
          this.currentPaliaSeconds <= endInSeconds
        : this.currentPaliaSeconds >= startInSeconds ||
          this.currentPaliaSeconds <= endInSeconds;
    return isInSamePeriod;
  }

  getTimeTillStart(startTime: ITimeObject): string {
    const startInSeconds = this.convertToSeconds(startTime);
    const secondsTillStart =
      (startInSeconds - this.currentPaliaSeconds + 24 * 3600) % (24 * 3600);
    return this.formatRealTime(secondsTillStart);
  }

  getTimeTillEnd(endTime: ITimeObject): string {
    const endInSeconds = this.convertToSeconds(endTime);
    const secondsTillEnd =
      (endInSeconds - this.currentPaliaSeconds + 24 * 3600) % (24 * 3600);
    return this.formatRealTime(secondsTillEnd);
  }

  getCurrentPeriod(): string {
    for (const period in this.periods) {
      const { start, end } = this.periods[period];

      const startInSeconds = this.convertToSeconds(start);
      const endInSeconds = this.convertToSeconds(end);

      if (
        startInSeconds !== undefined &&
        endInSeconds !== undefined &&
        (startInSeconds <= this.currentPaliaSeconds ||
          endInSeconds <= this.currentPaliaSeconds)
      ) {
        return period;
      }
    }
    return 'Night';
  }

  getPeriodTime(period: string): IPeriod {
    return (
      this.periods[period] || {
        start: { hour: 0, minute: 0 },
        end: { hour: 0, minute: 0 },
      }
    );
  }

  private convertToSeconds(timeObj: ITimeObject): number {
    return timeObj.hour * 3600 + timeObj.minute * 60;
  }
}

export default PaliaTime;
