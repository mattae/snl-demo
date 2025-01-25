import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type ChatRequest = {
    chatId: string;
    question: string;
}
export type ChatResponse = {
    chatId: string;
    answer: string;
}

@Injectable()
export class ChatService {
    #url = 'api/cs/chat';
    #http = inject(HttpClient);

    chat(request: ChatRequest) {
        return this.#http.post<ChatResponse>(`${this.#url}`, request);
    }
}
