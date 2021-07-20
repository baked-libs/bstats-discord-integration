# :speech_balloon: Discord Integration for bStats.org
This is a simple program written in TypeScript which allows you to query https://bstats.org/ and format it in a nice and human-friendly manner to post to your discord server via a webhook.

## :question: Usage
**TODO...**

## :framed_picture: Screenshots / Examples
We tested this integration on two projects, here are these two examples along with their configuration script.

| Slimefun ([4574](https://bstats.org/plugin/bukkit/Slimefun/4574)) | Craftory ([7804](https://bstats.org/plugin/bukkit/Craftory/7804)) |
| :---------------------------------: | :------------------------------: |
| ![bStats data for Slimefun](https://raw.githubusercontent.com/baked-libs/bstats-discord-integration/main/.github/screenshots/slimefun.png) | ![bStats data for Craftory](https://raw.githubusercontent.com/baked-libs/bstats-discord-integration/main/.github/screenshots/craftory.png) |

<details><summary>See the config script for 'Slimefun'...</summary>

```typescript
import { Project, Platform, WebhookCredentials, ChartEmbed } from './types'

export const project = {
    name: 'Slimefun',
    id: 4574,
    platform: Platform.BUKKIT,
    color: '0x1A62D6',
    charts: [
        'servers',
        'players',
        'serverSoftware',
        'minecraftVersion',
        'javaVersion',
        'location',
        'compatibility_mode',
        'auto_updates',
        'cs-corelib_installed'
    ]
} as Project

export const webhook = {
    id: '******************',
    token: '*******************************************************************'
} as WebhookCredentials

export function getContent(charts: any): ChartEmbed[] {
    let prefix = ':small_blue_diamond:'

    return [
        {
            name: ':bar_chart:  Statistics',
            inline: false,
            lines: [
                `${prefix} ${charts['servers'].current} servers (peak: ${charts['servers'].peak})`,
                `${prefix} ${charts['players'].current} players (peak: ${charts['players'].peak})`
            ]
        },
        {
            name: ':bulb:  Interesting facts',
            inline: false,
            lines: [
                `${prefix} ${charts['auto_updates'].for('enabled').percentage} have enabled automatic updates.`,
                `${prefix} ${charts['compatibility_mode'].for('disabled').percentage} have disabled compatibility-mode.`,
                `${prefix} ${charts['cs-corelib_installed'].for('No').percentage} have removed CS-CoreLib.`
            ]
        },
        {
            name: ':computer:  Server software',
            inline: true,
            lines: [
                `${prefix} Paper: ${charts['serverSoftware'].for('Paper').percentage}`,
                `${prefix} Spigot: ${charts['serverSoftware'].for('Spigot').percentage}`,
                `${prefix} Tuinity: ${charts['serverSoftware'].for('Tuinity').percentage}`,
                `${prefix} Other: ${charts['serverSoftware'].forAllExcept(['Paper', 'Spigot', 'Tuinity']).percentage}`
            ]
        },
        {
            name: ':video_game:  Minecraft version',
            inline: true,
            lines: [
                `${prefix} 1.17: ${charts['minecraftVersion'].forAny(/1\.17(?:\.\d+)?/).percentage}`,
                `${prefix} 1.16: ${charts['minecraftVersion'].forAny(/1\.16(?:\.\d+)?/).percentage}`,
                `${prefix} 1.15: ${charts['minecraftVersion'].forAny(/1\.15(?:\.\d+)?/).percentage}`,
                `${prefix} 1.14: ${charts['minecraftVersion'].forAny(/1\.14(?:\.\d+)?/).percentage}`
            ]
        },
        {
            name: ':floppy_disk:  Java version',
            inline: true,
            lines: [
                `${prefix} Java 16: ${charts['javaVersion'].for('Java 16').percentage}`,
                `${prefix} Java 11: ${charts['javaVersion'].for('Java 11').percentage}`,
                `${prefix} Java 8: ${charts['javaVersion'].for('Java 8').percentage}`,
                `${prefix} Other: ${charts['javaVersion'].forAllExcept(['Java 16', 'Java 11', 'Java 8']).percentage}`
            ]
        }
    ];
}
```
</details>
<details><summary>See the config script for 'Craftory'...</summary>

```typescript
import { Project, Platform, WebhookCredentials, ChartEmbed } from './types'

export const project = {
    name: 'Craftory',
    id: 7804,
    platform: Platform.BUKKIT,
    color: '0x1A62D6',
    icon: 'https://avatars.githubusercontent.com/u/71320561',
    charts: [
        'servers',
        'players',
        'serverSoftware',
        'minecraftVersion',
        'javaVersion',
        'location',
        'os'
    ]
} as Project

export const webhook = {
    id: '******************',
    token: '*******************************************************************'
} as WebhookCredentials

export function getContent(charts: any): ChartEmbed[] {
    return [
        {
            name: ':bar_chart:  Statistics',
            inline: false,
            lines: [
                `:small_blue_diamond: ${charts['servers'].current} servers (peak: ${charts['servers'].peak})`,
                `:small_blue_diamond: ${charts['players'].current} players (peak: ${charts['players'].peak})`
            ]
        },
        {
            name: ':computer:  Server software',
            inline: true,
            lines: [
                `:small_blue_diamond: Paper: ${charts['serverSoftware'].for('Paper').percentage}`,
                `:small_blue_diamond: Spigot: ${charts['serverSoftware'].for('Spigot').percentage}`,
                `:small_blue_diamond: Other: ${charts['serverSoftware'].forAllExcept(['Paper', 'Spigot']).percentage}`
            ]
        },
        {
            name: ':video_game:  Minecraft version',
            inline: true,
            lines: [
                `:small_blue_diamond: 1.17: ${charts['minecraftVersion'].forAny(/1\.17(?:\.\d+)?/).percentage}`,
                `:small_blue_diamond: 1.16: ${charts['minecraftVersion'].forAny(/1\.16(?:\.\d+)?/).percentage}`,
                `:small_blue_diamond: 1.15: ${charts['minecraftVersion'].forAny(/1\.15(?:\.\d+)?/).percentage}`
            ]
        },
        {
            name: ':floppy_disk:  Java version',
            inline: true,
            lines: [
                `:small_blue_diamond: Java 16: ${charts['javaVersion'].for('Java 16').percentage}`,
                `:small_blue_diamond: Java 11: ${charts['javaVersion'].for('Java 11').percentage}`,
                `:small_blue_diamond: Java 8: ${charts['javaVersion'].for('Java 8').percentage}`
            ]
        },
        {
            name: ':bulb:  Interesting facts',
            inline: false,
            lines: [
                `:small_blue_diamond: Most ${project.name} servers are based in ${charts['location'].top().label}.`,
                `:small_blue_diamond: Most ${project.name} servers are running on ${charts['os'].top().label}.`
            ]
        }
    ]
}
```
</details>


## :balance_scale: Disclaimer / Licensing
This projet is licensed under the [MIT license](https://github.com/baked-libs/bstats-discord-integration/blob/main/LICENSE), the code is open-source and contributions are very much welcome!
This is just a little fun project, we are not affiliated with https://bstats.org/ in any way or form.

The project is built upon [bStats' REST-API](https://bstats.org/help/rest-api).
This API may be subject to change, potentially breaking this software.
Be aware of this and simply [file an issue](https://github.com/baked-libs/bstats-discord-integration/issues) when that happens.
