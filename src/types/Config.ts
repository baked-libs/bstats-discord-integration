import { Project, WebhookCredentials, ChartEmbed } from '../types'

export interface Config {

    project: Project
    webhook: WebhookCredentials

    getContent(charts: any): ChartEmbed[]

}
