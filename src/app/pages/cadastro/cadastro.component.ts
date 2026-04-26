import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- IMPORTANTE
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  leadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leadForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['New', Validators.required],
      tasks: this.fb.array([])
    });
  }

  get tasks(): FormArray {
    return this.leadForm.get('tasks') as FormArray;
  }

  adicionarTask() {
    const taskGroup = this.fb.group({
      title: ['', Validators.required],
      status: ['Todo', Validators.required],
      dueDate: ['']
    });
    this.tasks.push(taskGroup);
  }

  salvar() {
    console.log('Lead cadastrado:', this.leadForm.value);
  }
}
