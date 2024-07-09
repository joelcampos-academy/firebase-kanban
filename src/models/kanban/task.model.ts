import { TaskState } from "./task-state.enum";

export interface TaskModel {
  title: string;
  description: string;
  assignedTo: string; // User Id
  state: TaskState;
}
