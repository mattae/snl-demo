package org.lamisplus.plugins.ai.services;

import lombok.RequiredArgsConstructor;
import org.lamisplus.plugins.ai.extensions.ChatRequest;
import org.lamisplus.plugins.ai.extensions.ChatResponse;
import org.lamisplus.plugins.ai.extensions.ChatServiceExtension;
import org.pf4j.Extension;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Extension
public class ChatServiceImpl implements ChatServiceExtension {
    private final ChatClient chatClient;

    public ChatResponse chat(ChatRequest chatRequest) {
        UUID chatId = Optional
                .ofNullable(chatRequest.chatId())
                .orElse(UUID.randomUUID());
        String answer = chatClient
                .prompt()
                .user(chatRequest.question())
                .advisors(advisorSpec ->
                        advisorSpec
                                .param("chat_memory_conversation_id", chatId))
                .call()
                .content();
        return new ChatResponse(chatId, answer);
    }
}
