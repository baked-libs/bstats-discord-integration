import { Project, Platform, WebhookCredentials, ChartEmbed } from './types';

export const project = {
    name: 'Your project',
    id: 0,
    platform: Platform.BUKKIT,
    color: '0x1A62D6',
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
    id: '*****************',
    token: '****************************************************'
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
