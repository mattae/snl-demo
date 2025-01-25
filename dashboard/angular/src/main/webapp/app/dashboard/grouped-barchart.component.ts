import { Component } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { multi } from './multi.data';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'grouped-barchart',
    imports: [
        BarChartModule,
        MatCard,
        MatCardContent
    ],
    template: `
        <div class="max-w-fit max-h-fit  shadow-md overflow-x-scroll">
            <ngx-charts-bar-vertical-2d
                    [view]="view"
                    [results]="multi"
                    [scheme]="'cool'"
                    [schemeType]=""
                    [gradient]="gradient"
                    [xAxis]="showXAxis"
                    [yAxis]="showYAxis"
                    [legend]="showLegend"
                    [showXAxisLabel]="showXAxisLabel"
                    [showYAxisLabel]="showYAxisLabel"
                    [xAxisLabel]="xAxisLabel"
                    [yAxisLabel]="yAxisLabel"
                    [legendTitle]="legendTitle"
                    style="fill: var(--mat-sys-on-surface);background: black;">
            </ngx-charts-bar-vertical-2d>
        </div>
    `,
    styles: [
        `
          ngx-charts-outer {
            
          }
        `
    ]
})
export class GroupedBarchartComponent {
    multi: any[];
    view: [number, number] = [525, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Country';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Population';
    legendTitle: string = 'Years';

    constructor() {
        Object.assign(this, {multi})
    }
}
