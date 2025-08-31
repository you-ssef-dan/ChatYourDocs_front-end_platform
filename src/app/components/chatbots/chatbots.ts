// chatyourdocs/src/app/components/chatbots.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatbotService } from '../../services/chatbot';

interface Chatbot {
  id: string | number;
  name: string;
  status?: 'active' | 'paused' | 'offline';
  updatedAt?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-chatbots',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chatbots.html',
  styleUrls: ['./chatbots.scss']
})
export class Chatbots implements OnInit {
  @Input() chatbotsCount: number | null = null;

  chatbots: Chatbot[] = []; // start empty

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.loadChatbots();
  }

  loadChatbots() {
    // Optionally: keep existing Python RAG chatbots logic here

    // Fetch Express backend chatbots
    this.chatbotService.listUserExpressChatbots().subscribe({
      next: (res) => {
        // Map to your interface if needed
        this.chatbots = res.map((cb: any) => ({
          id: cb.id,
          name: cb.name,
          createdAt: cb.createdAt,
          updatedAt: cb.updatedAt,
          status: 'active', // default or map if you have status
        }));
      },
      error: (err) => console.error('Error loading Express chatbots', err)
    });
  }
}
