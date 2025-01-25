package org.lamisplus.plugins.dash;

import io.github.mattae.snl.core.api.bootstrap.EnhancedSpringBootstrap;
import org.laxture.sbp.SpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;

public class DashboardPlugin extends SpringBootPlugin {
    public DashboardPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new EnhancedSpringBootstrap(this, DashboardPluginApp.class);
    }
}
