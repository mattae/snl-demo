package org.lamisplus.plugins.ai.conf;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatbotConfiguration {

    @Bean
    public ChatMemory chatMemory() {
        return new InMemoryChatMemory();
    }

    @Bean
    public ChatClient chatClient(@Qualifier("huggingfaceChatModel") ChatModel chatModel, ChatMemory chatMemory) {
        return ChatClient
            .builder(chatModel)
            .defaultAdvisors(new MessageChatMemoryAdvisor(chatMemory))
            .build();
    }

}
