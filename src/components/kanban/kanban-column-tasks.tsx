import { Button } from "react-bootstrap";
import { TaskModel } from "../../models/kanban/task.model";

import styles from "./kanban-column-tasks.module.css";

type Props = {
  tasks: ({ id: string } & TaskModel)[];
};

export default function KanbanColumnTasks({ tasks }: Props) {
  if (tasks.length <= 0)
    return <div className={styles.empty}>No hay tareas</div>;

  return (
    <div className={styles.tasks}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.item}>
          <div className={styles.header}>
            <h4>{task.title}</h4>
            <div>
              <Button variant="danger">Delete</Button>
            </div>
          </div>
          <p>{task.description}</p>
          <small>{task.assignedTo}</small>
        </div>
      ))}
    </div>
  );
}
