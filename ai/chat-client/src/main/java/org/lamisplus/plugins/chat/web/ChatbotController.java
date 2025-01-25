package org.lamisplus.plugins.chat.web;

import lombok.RequiredArgsConstructor;
import org.lamisplus.plugins.ai.extensions.ChatRequest;
import org.lamisplus.plugins.ai.extensions.ChatResponse;
import org.lamisplus.plugins.ai.extensions.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cs")
public class ChatbotController {
    private final ChatService chatbotService;

    @PostMapping("/chat")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest chatRequest) {
        ChatResponse chatResponse = chatbotService.chat(chatRequest);
        return ResponseEntity.ok(chatResponse);
    }
}
