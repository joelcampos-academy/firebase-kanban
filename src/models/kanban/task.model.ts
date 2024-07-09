import { TaskState } from "./task-state.enum";

export interface TaskModel {
  title: string;
  description: string;
  state: TaskState;
}
