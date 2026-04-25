import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';   // <-- importa aqui
import { CommonModule } from '@angular/common'; // boa prática para diretivas básicas

import { LeadService } from '../../services/lead.service';
import { Lead } from '../../interfaces/lead';
import { TaskItem } from '../../interfaces/task-item';
import { TaskForm } from '../../interfaces/TakForm';

@Component({
  selector: 'app-cadastro',
  standalone: true,              // <-- standalone habilitado
  imports: [CommonModule, FormsModule], // <-- módulos usados no template
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent {
  lead: Lead = {
    id: 0,
    name: '',
    email: '',
    status: 'New',
    createdAt: '',
    updatedAt: '',
    tasks: [],
    tasksCount: 0
  };

  novaTask: TaskForm = { title: '', status: 'Todo' };

  constructor(private leadService: LeadService) {}

  adicionarTask() {
    const id = (this.lead.tasks?.length || 0) + 1;
    const task: TaskItem = {
      id,
      leadId: this.lead.id,
      title: this.novaTask.title,
      status: this.novaTask.status,
      dueDate: this.novaTask.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.lead.tasks?.push(task);
    this.lead.tasksCount = this.lead.tasks?.length;
    this.novaTask = { title: '', status: 'Todo' };
  }

  salvar() {
    this.leadService.addLead(this.lead).subscribe(() => {
      alert('Lead cadastrado com sucesso!');
      this.resetForm();
    });
  }

  private resetForm() {
    this.lead = {
      id: 0,
      name: '',
      email: '',
      status: 'New',
      createdAt: '',
      updatedAt: '',
      tasks: [],
      tasksCount: 0
    };
    this.novaTask = { title: '', status: 'Todo' };
  }
}
