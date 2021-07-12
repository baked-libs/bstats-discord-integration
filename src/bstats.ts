import * as fetch from 'node-fetch'
import { Project } from './types'
import { ChartType, Chart, convert } from './charts'

const apiUrl: string = 'https://bstats.org/api/v1'
const maxElements: number = 2 * 24 * 30 * 3

export async function getCharts(project: Project): Promise<any> {
    return getProjectInfo(project).then(async info => {
        console.log(`Found ${Object.keys(info.charts).length} charts!`)
        console.log(`Querying ${project.charts.length} charts...`)

        let data = await Promise.all(getAllCharts(project.id, project.charts, info.charts));
        let charts = {};

        for (let i in data) {
            let chart = data[i];
            charts[chart.id] = chart;
        }

        return charts;
    })
}

function getAllCharts(projectId: number, requestedCharts: string[], charts: any): Promise<Chart>[] {
    let promises = []

    for (let i in requestedCharts) {
        let chartId = requestedCharts[i]

        // Verify the chart does actually exist
        if (chartId in charts) {
            let chartType = charts[chartId].type as ChartType
            promises.push(getChartData(projectId, chartId, chartType))
        } else {
            console.log(`[!] Unknown chartId: '${chartId}', chart does not seem to exist.`)
        }
    }

    return promises
}

/**
 * Helper method to fetch a JSON object from an url.
 *
 * @param  url The url to fetch data from
 * @return     A Promise with the resulting JSON object
 */
async function fetchJSON(url: string): Promise<any> {
    return fetch(url, {
        method: "GET",
        follow: 0,
        timeout: 60000,
        compress: true,
        headers: {
            'User-Agent': 'bstats-discord-webhook v1.0.0 (https://github.com/baked-libs/bstats-discord-integration)',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
}

async function getProjectInfo(project: Project): Promise<any> {
    console.log(`Querying project '${project.name}' with id '${project.id}'`)
    return fetchJSON(`${apiUrl}/plugins/${project.id}`)
}

async function getChartData(projectId: number, chartId: string, chartType: ChartType): Promise<Chart> {
    console.log(`-> Querying chart '${chartId}'...`)

    return fetchJSON(`${apiUrl}/plugins/${projectId}/charts/${chartId}/data?maxElements=${maxElements}`).then(chartData => {
        console.log(`--> Processing chart '${chartId}'...`)
        return convert(chartId, chartType, chartData)
    })
}
