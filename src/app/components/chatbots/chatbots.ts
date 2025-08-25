// chatyourdocs/src/app/components/dashboard/chatbots/chatbots.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Chatbot {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'offline';
  users?: number;
  updatedAt?: string;
}

@Component({
  selector: 'app-chatbots',      // must match <app-chatbots> usage
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbots.html',
  styleUrls: ['./chatbots.scss']
})
export class Chatbots {
  @Input() chatbotsCount: number | null = null;    // <-- this is required
  // example data
  chatbots: Chatbot[] = [
    { id: 'cb-1', name: 'Support Assistant', status: 'active', users: 120, updatedAt: '2025-07-01' },
    { id: 'cb-2', name: 'Docs Helper', status: 'active', users: 57, updatedAt: '2025-06-22' },
    { id: 'cb-3', name: 'Sales Bot', status: 'paused', users: 8, updatedAt: '2025-05-12' },
    { id: 'cb-4', name: 'Onboarding', status: 'offline', users: 0, updatedAt: '2025-06-01' }
  ];
}
