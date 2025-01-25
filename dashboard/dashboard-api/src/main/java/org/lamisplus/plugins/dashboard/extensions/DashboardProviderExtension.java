package org.lamisplus.plugins.dashboard.extensions;

import io.github.mattae.snl.core.api.extensions.OrderedExtension;

import java.util.List;

public interface DashboardProviderExtension extends OrderedExtension {
    String getSection();
    List<Chart> getCharts();
}

