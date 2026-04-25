// Interface usada apenas no formulário
export interface TaskForm {
  title: string;
  status: 'Todo' | 'Doing' | 'Done';
  dueDate?: string;
}

