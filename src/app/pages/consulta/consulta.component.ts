import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeadService } from '../../services/lead.service';
import { Lead } from '../../interfaces/lead';
import { TaskItem } from '../../interfaces/task-item';

@Component({
  selector: 'app-consulta',
  standalone: true, // importante para Angular 17+
  imports: [CommonModule, FormsModule], // aqui entram os módulos usados no template
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'] // cuidado: é styleUrls (plural)
})
export class ConsultaComponent {
  leads: Lead[] = [];

  searchTerm: string = '';
  statusFilter: string = '';

  constructor(private leadService: LeadService) {
    this.listarLeads();
  }

  listarLeads() {
    this.leadService.getLeads().subscribe(data => {
      this.leads = data;
    });
  }

  filteredLeads(): Lead[] {
    return this.leads.filter(lead => {
      const matchesSearch =
        lead.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.statusFilter === '' || lead.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  editarLead(lead: Lead) {
    console.log('Editar lead:', lead);
  }

  excluirLead(id: number) {
    this.leadService.deleteLead(id).subscribe(() => {
      this.leads = this.leads.filter(l => l.id !== id);
    });
  }

  editarTask(leadId: number, task: TaskItem) {
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
