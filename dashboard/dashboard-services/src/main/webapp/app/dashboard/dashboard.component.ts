import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dashboard, DashboardService } from './dashboard.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { WidgetComponent } from './widget.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
        FormsModule,
        TranslocoPipe,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        MatCard,
        MatCardContent,
        WidgetComponent,
        MatCardTitle
    ]
})
export class DashboardComponent implements OnInit {
    dashboards = signal<Dashboard[]>([])
    #dashboardService = inject(DashboardService);

    ngOnInit(): void {
        this.#dashboardService.dashboards().subscribe(res => {
            this.dashboards.set(res);
            console.log('Dashboards', res)
        });
    }
}
