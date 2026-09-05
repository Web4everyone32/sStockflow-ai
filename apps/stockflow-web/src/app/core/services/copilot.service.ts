import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { COPILOT_API_BASE_URL, GEMINI_API_KEY } from '../config/api.config';
import { COPILOT_QA_DATA } from './copilot-qa-data';

export interface CopilotChatRequest {
  conversationId: string;
  message: string;
  currentWorkspace?: string;
  selectedWarehouseId?: string;
  selectedSkuId?: string;
}

export interface CopilotEvidence {
  source: string;
  asOf: string;
  freshness: string;
  correlationId: string;
}

export interface CopilotChatResponse {
  answer: string;
  answerType: 'GROUNDED_EXPLANATION' | 'NO_DATA' | 'ERROR';
  confidence?: string;
  toolsUsed?: string[];
  evidence?: CopilotEvidence[];
  suggestedActions?: Record<string, unknown>[];
  warnings?: string[];
}

@Injectable({ providedIn: 'root' })
export class CopilotService {
  private readonly endpoint = `${COPILOT_API_BASE_URL}/api/v1/copilot/chat`;

  constructor(private readonly http: HttpClient) {}

  chat(request: CopilotChatRequest): Observable<CopilotChatResponse> {
    const normalizedMessage = request.message.toLowerCase().replace(/[?,.!]/g, '').trim();
    
    if (COPILOT_QA_DATA[normalizedMessage]) {
      return of(COPILOT_QA_DATA[normalizedMessage]).pipe(delay(800));
    }

    return of({
      answer: "I am a demo version of StockFlow Copilot. I can only answer specific hardcoded questions. Please use the suggestion bar to see what I can help with.",
      answerType: 'ERROR'
    } as CopilotChatResponse).pipe(delay(800));
  }
}
