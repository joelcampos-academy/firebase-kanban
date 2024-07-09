import { Button } from "react-bootstrap";
import { TaskModel } from "../../models/kanban/task.model";

import styles from "./kanban-column-tasks.module.css";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";

type Props = {
  tasks: ({ id: string } & TaskModel)[];
  departmentId: string;
};

export default function KanbanColumnTasks({ tasks, departmentId }: Props) {
  if (tasks.length <= 0)
    return <div className={styles.empty}>No hay tareas</div>;

  const onDeleteClick = (taskId: string) =>
    KanbanDatabaseService.removeDepartmentTask(departmentId, taskId);

  return (
    <div className={styles.tasks}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.item}>
          <div className={styles.header}>
            <h4>{task.title}</h4>
            <div>
              <Button variant="danger" onClick={() => onDeleteClick(task.id)}>
                Delete
              </Button>
            </div>
          </div>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
