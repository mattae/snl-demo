package org.lamisplus.plugins.chat;

import io.github.mattae.snl.core.api.bootstrap.EnhancedSpringBootstrap;
import org.lamisplus.plugins.ai.configurer.AIServiceConfigurer;
import org.laxture.sbp.SpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;

public class ChatServicesPlugin extends SpringBootPlugin {
    public ChatServicesPlugin(PluginWrapper wrapper) {
        super(wrapper, new AIServiceConfigurer());
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new EnhancedSpringBootstrap(this, ChatServicesPluginApp.class);
    }
}
