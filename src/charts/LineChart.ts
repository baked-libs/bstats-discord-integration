import { Chart } from "./Chart";

export class LineChart extends Chart {

    current: number
    peak: number

    constructor(chartId: string, current: number, peak: number) {
        super(chartId)

        this.current = current
        this.peak = peak
    }

}
