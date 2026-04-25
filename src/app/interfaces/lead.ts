import { LeadStatus } from "./lead-status";
import { TaskItem } from "./task-item";

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  tasks?: TaskItem[];
  tasksCount?: number;
}
