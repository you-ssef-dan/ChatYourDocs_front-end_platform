// src/app/components/chat/chat.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatbotService } from '../../services/chatbot';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit {
  chatbotId!: string;
  chatbotName: string = '';
  status: 'active' | 'paused' | 'offline' = 'offline';

  messages: Message[] = [];
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatbotService: ChatbotService
  ) {}

ngOnInit(): void {
  this.chatbotId = this.route.snapshot.paramMap.get('id')!;

  this.chatbotService.getExpressChatbot(this.chatbotId).subscribe({
    next: (cb: any) => {
      this.chatbotName = cb?.name || `Chatbot #${this.chatbotId}`;
      this.status = 'active'; // map real status if you store it
    },
    error: (err) => {
      console.error('Failed to fetch chatbot', err);
      this.chatbotName = `Chatbot #${this.chatbotId}`;
      this.status = 'offline';
    }
  });
}


  sendMessage() {
    const msg = this.newMessage.trim();
    if (!msg) return;

    // Add user message locally
    this.messages.push({ sender: 'user', text: msg });
    this.newMessage = '';

    // Call RAG service
    this.chatbotService.askRag(msg, this.chatbotId).subscribe({
      next: (res: any) => {
        // res.result contains the LLM response from your FastAPI
        alert("Response from RAG is returned: " );
        const answer = res?.result || "angular response!! .";
        this.messages.push({ sender: 'bot', text: answer });
      },
      error: (err) => {
        console.error('Error fetching LLM response:', err);
        this.messages.push({ sender: 'bot', text: '⚠️ Failed to get response from RAG service.' });
      }
    });
  }
}
