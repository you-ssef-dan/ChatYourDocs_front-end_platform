// chatbot-create.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatbotService } from "../../services/chatbot";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-chatbot-create',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chatbot-create.html',
  styleUrls: ['./chatbot-create.scss']
})
export class ChatbotCreateComponent {
  chatbot = { name: '' };
  selectedFiles: File[] = [];

  constructor(
    private router: Router,
    private chatbotService: ChatbotService,
    private auth: Auth
  ) {}

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  createChatbot() {
  if (!this.chatbot.name) {
    alert('Please enter a chatbot name.');
    return;
  }
  if (this.selectedFiles.length === 0) {
    alert('Please select at least one document.');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.chatbot.name);
  // user_id and chatbot_id will be handled by server; no need to set user_id here.
  this.selectedFiles.forEach(file => formData.append('files', file, file.name));

  this.chatbotService.createExpressChatbot(formData).subscribe({
    next: (res: any) => {
      console.log('✅ Chatbot created (Express + Python):', res);
      this.chatbot = { name: '' };
      this.selectedFiles = [];
      this.router.navigate(['/dashboard/chatbots']);
    },
    error: async (err) => {
      console.error('❌ Chatbot creation failed', err);
      alert('Failed to create chatbot. Please try again.');
    }
  });
}

}
