import { Chart, ChartType, PieChart, LineChart } from '../charts'

export function convert(chartId: string, chartType: ChartType, chartData: any): Chart {
    switch (chartType) {
        case ChartType.SINGLE_LINE:
            return prepareLineChart(chartId, chartData)
        case ChartType.SIMPLE_PIE:
            return preparePieChart(chartId, chartData)
        case ChartType.DRILLDOWN_PIE:
            return prepareDrillDownPieChart(chartId, chartData)
        default:
            throw new Error(`Unsupported chart type: ${chartType}`)
    }
}

function prepareLineChart(chartId: string, chartData: any): LineChart {
    let record = 0;

    for (let i in chartData) {
        let number = chartData[i][1]

        if (number > record) {
            record = number
        }
    }

    let current = chartData[chartData.length - 1][1]

    return new LineChart(chartId, current, record)
}

function preparePieChart(chartId: string, chartData: any): PieChart {
    let data = {}
    let total = 0

    for (let i in chartData) {
        let slice = chartData[i]
        total += slice.y

        data[slice.name] = {
            label: slice.name,
            value: slice.y
        }
    }

    // Calculate percentages
    for (let i in data) {
        data[i].percentage = Number((data[i].value / total) * 100.0).toFixed(2) + '%'
    }

    return new PieChart(chartId, data)
}

function prepareDrillDownPieChart(chartId: string, chartData: any): PieChart {
    return preparePieChart(chartId, chartData.seriesData)
}
