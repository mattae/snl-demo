package org.lamisplus.plugins.ai.configurer;

import org.lamisplus.plugins.ai.extensions.ChatService;
import org.lamisplus.plugins.ai.extensions.ChatServiceExtension;
import org.laxture.sbp.spring.boot.IPluginConfigurer;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.laxture.spring.util.ApplicationContextProvider;
import org.springframework.context.support.GenericApplicationContext;

public class AIServiceConfigurer implements IPluginConfigurer {
    @Override
    public void onBootstrap(SpringBootstrap bootstrap, GenericApplicationContext pluginApplicationContext) {
        var chatService = ApplicationContextProvider.getApplicationContext(ChatServiceExtension.class).getBean(ChatServiceExtension.class);

        pluginApplicationContext.registerBean("chatService", ChatService.class, () -> chatService);
    }
}
