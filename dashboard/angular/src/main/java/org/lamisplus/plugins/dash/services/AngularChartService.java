package org.lamisplus.plugins.dash.services;

import org.lamisplus.plugins.dashboard.extensions.Chart;
import org.lamisplus.plugins.dashboard.extensions.DashboardProviderExtension;
import org.pf4j.Extension;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Extension
public class AngularChartService implements DashboardProviderExtension {
    @Override
    public String getSection() {
        return "Charts from Angular";
    }

    @Override
    public List<Chart> getCharts() {
        List<Chart> charts = new ArrayList<>();
        var chart = new Chart("Line Chart", UUID.fromString("019499bf-874e-7579-8c77-f06bc705fa69"));
        charts.add(chart);
        chart = new Chart("Bar Chart", UUID.fromString("019499bf-874e-706a-bec9-524b5bb20202"));
        charts.add(chart);
        return charts;
    }
}
