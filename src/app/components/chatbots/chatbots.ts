// chatyourdocs/src/app/components/chatbots.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatbotService } from '../../services/chatbot';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, RouterModule,HttpClientModule],
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

  deleteChatbot(chatbotId: number | string) {
    if (!confirm('Are you sure you want to delete this chatbot?')) return;

    // normalize id to number
    const idNum = typeof chatbotId === 'string' ? parseInt(chatbotId, 10) : chatbotId;
    if (isNaN(Number(idNum))) {
      console.error('Invalid chatbot id:', chatbotId);
      alert('Unable to delete: invalid chatbot id.');
      return;
    }

    this.chatbotService.deleteExpressChatbot(Number(idNum)).subscribe({
      next: () => {
        // remove from local array so UI updates immediately
        const idStr = String(idNum);
        this.chatbots = this.chatbots.filter(cb => String(cb.id) !== idStr);
      },
      error: (err) => {
        console.error('Error deleting chatbot', err);
        const msg = err?.error?.message || err?.message || 'Failed to delete chatbot.';
        alert(msg);
      }
    });
  }
}