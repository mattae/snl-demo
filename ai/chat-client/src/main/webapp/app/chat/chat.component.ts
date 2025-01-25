import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ChatService } from './chat.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { catchError, EMPTY } from 'rxjs';
import { marked } from 'marked';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    imports: [
        NgClass,
        FormsModule,
        MatFormField,
        MatInput,
        MatButton,
        TranslocoPipe
    ]
})
export class ChatComponent {
    inputText = ''; // Text input from the user
    error = signal(false);
    errorMessage = signal('');
    messages = signal<{ role: 'user' | 'model'; text: string; chatId?: string }[]>([]);
    loading = signal(false);
    messageContainer = viewChild('messageContainer', {read: ElementRef});
    #chatService = inject(ChatService);

    sendMessage() {
        if (!this.inputText.trim()) return;
        this.loading.set(true);
        this.messages.update(prev => ([...prev, {role: 'user', text: this.inputText}]));

        const userMessage = this.inputText;
        this.inputText = '';
        let lastId = this.messages().filter(m => m.role === 'model').at(-1)?.chatId

        this.#chatService.chat({chatId: lastId, question: userMessage}).pipe(
            catchError(err => {
                console.log('Error', err)
                this.loading.set(false);
                this.error.set(true);
                this.errorMessage.set(err);
                return EMPTY;
            })
        ).subscribe(res => {
            this.messages.update(prev =>
                ([...prev, {role: 'model', text: marked(res.answer) as string, chatId: res.chatId}]));
            this.loading.set(false);
            setTimeout(() => {
                this.messageContainer().nativeElement.scrollTop = this.messageContainer().nativeElement.scrollHeight;
            }, 10);
        })
    }

    retrySendMessage() {
        // Retry sending the last message
        this.sendMessage();
    }

    clearError() {
        // Clear error state
        this.error.set(false);
        this.errorMessage.set('');
    }
}
