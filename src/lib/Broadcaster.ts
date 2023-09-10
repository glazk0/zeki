import { Message, MessageCreateOptions, MessagePayload } from 'discord.js';
import { container } from 'tsyringe';
import { Client } from '../structures/Client';
import { clientSymbol } from '../utils/Constants';

export class Broadcaster {
  /**
   * The client instance.
   * @type {Client}
   * @private
   * @readonly
   */
  private readonly client: Client;

  constructor() {
    this.client = container.resolve<Client>(clientSymbol);
  }

  /**
   * Broadcasts a message to a channel.
   *
   * @param channel - The channel to broadcast the message to.
   * @param message - The message to broadcast.
   * @param key - The key to use for the message.
   */
  public async broadcast(
    channelId: string,
    message: string | MessagePayload | MessageCreateOptions,
  ): Promise<Message<true> | Message<false> | null> {
    const channel = this.client.channels.cache.get(channelId);

    console.log(channel);

    if (!channel || !channel.isTextBased()) return null;

    console.log(message);

    return await channel.send(message).catch((e) => {
      this.client.logger.error(`Unable to send message`, e);
      return null;
    });
  }
}