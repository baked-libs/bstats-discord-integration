import { WebhookClient, MessageEmbed, Message, EmbedFieldData } from 'discord.js'
import { Config, ChartEmbed, Project } from './types'
import * as bstats from './bstats'

export async function sendEmbed(cfg: Config): Promise<Message> {
    let client = new WebhookClient(cfg.webhook.id, cfg.webhook.token)
    let project = cfg.project

    return sendWebhook(client, project, cfg)
}

async function sendWebhook(client: WebhookClient, project: Project, cfg: Config): Promise<Message> {
    return bstats.getCharts(project).then(charts => {
        let content = cfg.getContent(charts)
        let fields = []

        for (let i in content) {
            fields.push(parseEmbedField(content[i]))
        }

        let embed = new MessageEmbed()
            .setTitle(`bStats data for ${project.name} (${project.id})`)
            .setURL(`https://bstats.org/plugin/${project.platform}/${project.name}/${project.id}`)
            .setTimestamp(Date.now())
            .addFields(fields)
            .setColor(project.color)

        if (project.icon) {
            embed.setThumbnail(project.icon)
        }

        console.log('Dispatched webhook embed!')
        return client.send(embed)
    })
}

/**
 * This method converts our custom ChartEmbed interface into a format that is
 * readable for discord.js, an EmbedFieldData object.
 *
 * @param  chartEmbed Our ChartEmbed
 * @return            The converted EmbedFieldData
 */
function parseEmbedField(chartEmbed: ChartEmbed): EmbedFieldData {
    let fieldData = {} as EmbedFieldData

    fieldData.name = chartEmbed.name
    fieldData.inline = chartEmbed.inline
    fieldData.value = chartEmbed.lines.join('\n')

    return fieldData
}
