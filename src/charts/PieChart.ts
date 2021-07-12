import { Chart } from "./Chart";

export class PieChart extends Chart {

    id: string
    values: any

    constructor(id: string, values: any) {
        super(id)

        this.values = values
    }

    for(key: string) {
        let slice = this.values[key]
        return slice ? slice : new PieChartSlice(0, 1, key)
    }

    forAny(regex: RegExp) {
        let total = 0;
        let sum = 0;

        for (let key in this.values) {
            total += this.values[key].value

            if (key.match(regex)) {
                sum += this.values[key].value
            }
        }

        return new PieChartSlice(sum, total)
    }

    forAll(keys: string[]) {
        let total = 0
        let sum = 0

        for (let key in this.values) {
            total += this.values[key].value

            if (keys.indexOf(key) > -1) {
                sum += this.values[key].value
            }
        }

        return new PieChartSlice(sum, total)
    }

    forAllExcept(keys: string[]) {
        let total = 0
        let remaining = 0

        for (let key in this.values) {
            total += this.values[key].value

            if (keys.indexOf(key) === -1) {
                remaining += this.values[key].value
            }
        }

        return new PieChartSlice(remaining, total)
    }

    top() {
        let topSlice: PieChartSlice

        for (let key in this.values) {
            let slice = this.values[key]

            if (!topSlice || slice.value > topSlice.value) {
                topSlice = slice
            }
        }

        return topSlice
    }

}

class PieChartSlice {

    label?: string
    value: number
    percentage: string

    constructor(value: number, total: number, label?: string) {
        this.value = value
        this.percentage = Number((value / total) * 100.0).toFixed(2) + '%'
        this.label = label
    }

}
