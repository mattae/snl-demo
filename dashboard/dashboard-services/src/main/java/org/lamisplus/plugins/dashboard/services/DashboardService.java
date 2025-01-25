package org.lamisplus.plugins.dashboard.services;

import lombok.RequiredArgsConstructor;
import org.lamisplus.plugins.dashboard.extensions.DashboardProviderExtension;
import org.pf4j.PluginManager;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final PluginManager pluginManager;


    public List<DashboardProviderExtension> getDashboardProviders() {
        return pluginManager.getExtensions(DashboardProviderExtension.class);
    }
}
