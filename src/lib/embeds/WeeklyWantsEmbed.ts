import { bold, hyperlink } from 'discord.js';

import { Embed } from './Embed';

import { PALIA_URL } from '../../utils/Constants';

export class WeeklyWantsEmbed extends Embed {
  constructor(weeklyWants: IWeeklyWantsItem) {
    super();

    const now = new Date().toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });

    this.data.title = `Weekly Wants Rotation`;

    this.data.url = `${PALIA_URL}/tools/weekly-wants`;

    this.data.description = `The weekly wants rotation for ${bold(
      now,
    )} is now available! You can find the full list of weekly wants on [Paliapedia](${PALIA_URL}).`;

    const entries = weeklyWants.entries?.splice(
      0,
      Math.floor(weeklyWants.entries.length / 2),
    );

    for (const entry of entries!) {
      this.addFields({
        name: `${entry.villager.name}`,
        value:
          entry.weeklyWants
            .map((item) => {
              return `- ${item.rewardLevel} ${hyperlink(
                item.item?.name as string,
                `${PALIA_URL}/item/${item.item?.key}`,
              )}`;
            })
            .join('\n') || 'No weekly wants available.',
        inline: true,
      });
    }
  }
}
