# Zeki

![GitHub](https://img.shields.io/github/license/glazk0/zeki)

A simple & user-friendly Discord bot integration of [paliapedia.com](https://paliapedia.com/) for Palia.

## Features

- Retrieve information about villagers, items, and more from [paliapedia.com](https://paliapedia.com/)
- Receive notifications when S6 publishes a new blog post
- Receive notifications when the weekly wants list has been updated

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [Localization](#localization)
- [Self-Hosting](#self-hosting)
- [Issues](#issues)
- [License](#license)

## Usage

1. Invite the bot to your Discord server and ensure it has the necessary permissions.
2. Make sure the .env file is configured correctly. (*Only if you are self-hosting*)
3. Start the bot using the installation instructions. (*Only if you are self-hosting*)

## Installation

> [!NOTE]  
> We recommend using our hosted version of Zeki cause API access is not guaranteed for self-hosted instances.

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/glazk0/zeki.git
```

2. Install dependencies

```bash
pnpm install
```

3. Copy the example config file and fill in the values

```bash
cp .env.example .env
```

4. Build the bot

```bash
pnpm build
```

5. Start the bot

```bash
pnpm start
```

## Contributing

We welcome contributions from the community. If you have ideas for improvements or find issues, please open a pull request or submit an issue.

<a href="https://github.com/glazk0/zeki/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=glazk0/zeki" />
</a>

## Localization

Zeki is currently available in the following languages:

- English

If you would like to contribute to the localization of Zeki, please refer to the [Localization](.github/LOCALIZATION.md) guide.

## Self-Hosting

The inclusion of the bot's source code herein is primarily intended to foster transparency and facilitate other developers in incorporating similar functionalities into their respective projects.

Given the inherent simplicity of the bot, utilizing the publicly-hosted version is generally sufficient for the majority of users. It is strongly recommended to employ the public version, unless specific reasons necessitate an alternative approach, such as for experimental purposes.

While users are granted the autonomy to host the bot on their own servers, it is imperative to note that support for self-hosted instances will not be provided. Undertaking self-hosting is at the sole risk and responsibility of the user. Moreover, any attempts to monetize the hosted bot are expressly prohibited. The bot is designed to serve the community and self hosted instances are prohibited from monetization.

## Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/glazk0/zeki/issues/new/choose) on GitHub.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
