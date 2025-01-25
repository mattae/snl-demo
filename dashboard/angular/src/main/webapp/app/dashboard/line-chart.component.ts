import { Component } from '@angular/core';
import { census } from './census.data';
import { LineChartModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'line-chart',
    imports: [
        LineChartModule
    ],
    template: `
        <div class="max-w-fit max-h-fit bg-gray-200 shadow-md overflow-x-scroll">
            <ngx-charts-line-chart
                    [view]="view"
                    [scheme]="'cool'"
                    [legend]="legend"
                    [showXAxisLabel]="showXAxisLabel"
                    [showYAxisLabel]="showYAxisLabel"
                    [xAxis]="xAxis"
                    [yAxis]="yAxis"
                    [xAxisLabel]="xAxisLabel"
                    [yAxisLabel]="yAxisLabel"
                    [timeline]="timeline"
                    [results]="census"
            >
            </ngx-charts-line-chart>
        </div>
    `
})
export class LineChartComponent {
    census: any[];
    view:[number, number] = [520, 420];

    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Year';
    yAxisLabel: string = 'Population';
    timeline: boolean = true;

    constructor() {
        Object.assign(this, {census});
    }
}
