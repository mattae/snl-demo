package org.lamisplus.plugins.dashboard.web;

import lombok.RequiredArgsConstructor;
import org.lamisplus.plugins.dashboard.extensions.DashboardProviderExtension;
import org.lamisplus.plugins.dashboard.services.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dbf")
@RequiredArgsConstructor
public class DashboardResource {
    private final DashboardService dashboardService;

    @GetMapping("dashboards")
    public List<DashboardProviderExtension> getDashboards() {
        return dashboardService.getDashboardProviders();
    }
}
