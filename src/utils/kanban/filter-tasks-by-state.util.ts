import { TaskState } from "../../models/kanban/task-state.enum";
import { TaskModel } from "../../models/kanban/task.model";

/**
 * Esta función recibe una lista de tareas y un estado de tarea.
 * A partir de esto devuelve solo las tareas que estén en el estado especificado.
 */
export const filterTasksByState = (
  tasks: ({ id: string } & TaskModel)[],
  state: TaskState
) => tasks.filter((task) => task.state === state);
