import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Chart = {
    title: string;
    component: string;
}
export type Dashboard = {
    section: string;
    charts: Chart[];
}

@Injectable()
export class DashboardService {
    #url = 'api/dbf/dashboards';
    #http = inject(HttpClient);

    dashboards() {
        return this.#http.get<Dashboard[]>(`${this.#url}`);
    }
}
