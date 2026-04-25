import { Component } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { Lead } from '../../interfaces/lead';
import { TaskItem } from '../../interfaces/task-item';

@Component({
  selector: 'app-consulta',
  imports: [],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class LeadsComponent {
  leads: Lead[] = [];

  constructor(private leadService: LeadService) {
    this.listarLeads();
  }

  listarLeads() {
    this.leadService.getLeads().subscribe(data => {
      this.leads = data;
    });
  }

  editarLead(lead: Lead) {
    // aqui você pode abrir um formulário com os dados do lead
    console.log('Editar lead:', lead);
  }

  excluirLead(id: number) {
    this.leadService.deleteLead(id).subscribe(() => {
      this.leads = this.leads.filter(l => l.id !== id);
    });
  }

  editarTask(leadId: number, task: TaskItem) {
    // abrir formulário para editar a task
    console.log('Editar task:', task, 'do lead', leadId);
  }

  excluirTask(leadId: number, taskId: number) {
    const lead = this.leads.find(l => l.id === leadId);
    if (lead) {
      lead.tasks = lead.tasks?.filter(t => t.id !== taskId) || [];
      lead.tasksCount = lead.tasks.length;
    }
  }
}

