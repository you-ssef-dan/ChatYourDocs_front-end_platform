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

  // 1️⃣ First, create the chatbot metadata in Express
    this.chatbotService.createExpressChatbot(this.chatbot.name).subscribe({
      next: (res: any) => {
        console.log('✅ Express chatbot created', res);

        const chatbotId = res.chatbot.id; // <-- assume Express returns { id: ... }
        alert(`Chatbot metadata created with ID: ${chatbotId}`);
      const formData = new FormData();
      formData.append('name', this.chatbot.name);
      formData.append('chatbot_id', chatbotId);
      const decodedToken = this.auth.getDecodedToken();
      if (!decodedToken?.sub) { // assuming the token has `sub` as user ID
          alert('User not authenticated');
          return;
        }
      formData.append('user_id', decodedToken?.uid.toString() || '');

      this.selectedFiles.forEach(file => formData.append('files', file));

      // 2️⃣ Call Python RAG service
      this.chatbotService.createRagChatbot(formData).subscribe({
        next: (ragRes) => {
          console.log('✅ RAG chatbot created', ragRes);
          this.chatbot = { name: '' };
          this.selectedFiles = [];
          this.router.navigate(['/dashboard/chatbots']);
        },
        error: async (err) => {
          console.error('❌ RAG creation failed, rolling back Express chatbot', err);
          
          // Rollback Express chatbot
          await this.chatbotService.deleteExpressChatbot(chatbotId).toPromise();

          alert('Failed to create RAG chatbot. Chatbot creation canceled.');
        }
      });
    },
    error: (err) => {
      console.error('❌ Error creating Express chatbot', err);
      alert('Failed to create chatbot metadata');
    }
  });
}

}
