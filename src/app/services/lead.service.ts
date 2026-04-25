import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from '../interfaces/lead';
import { TaskItem } from '../interfaces/task-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiLeads = `${environment.apiUrl}/Leads`;
  private apiTasks = `${environment.apiUrl}/Tasks`;

  constructor(private http: HttpClient) {}

  // CRUD de Leads
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiLeads);
  }

  getLead(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiLeads}/${id}`);
  }

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.apiLeads, lead);
  }

  updateLead(lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiLeads}/${lead.id}`, lead);
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiLeads}/${id}`);
  }

  filtrarLeads(status?: string, termo?: string): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiLeads}/filtrar`, {
      params: { status: status || '', termo: termo || '' }
    });
  }

  // CRUD de Tasks
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiTasks);
  }

  getTask(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiTasks}/${id}`);
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiTasks, task);
  }

  updateTask(task: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiTasks}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTasks}/${id}`);
  }
}
