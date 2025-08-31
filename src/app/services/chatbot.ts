// servies/chatbot.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private ragApiUrl = 'http://localhost:8000';
  private expressApiUrl = 'http://localhost:8085/chatbots';

  constructor(private http: HttpClient, private auth: Auth) {}

  // -------------------
  // Python RAG backend
  // -------------------
  createRagChatbot(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.ragApiUrl}/chatbots`, formData);
  }

  askRag(query: string, chatbotId: string): Observable<any> {
    const userId = this.auth.getDecodedToken()?.uid;
    if (!userId) throw new Error('User not authenticated');

    const params = new HttpParams()
      .set('query', query)
      .set('user_id', userId)
      .set('chatbot_id', chatbotId)
      .set('include_images', 'true');

    return this.http.get(`${this.ragApiUrl}/ask`, { params });
  }

  // -------------------
  // Express backend
  // -------------------
  createExpressChatbot(name: string): Observable<any> {
    return this.http.post(this.expressApiUrl, { nom: name });
  }

  listUserExpressChatbots(): Observable<any> {
    return this.http.get(`${this.expressApiUrl}/my`);
  }

  deleteExpressChatbot(chatbotId: number): Observable<any> {
    return this.http.delete(`${this.expressApiUrl}/delete/${chatbotId}`);
  }

  getExpressChatbot(id: string): Observable<any> {
    return this.http.get(`${this.expressApiUrl}/${id}`);
  }
}
