import { useEffect, useState } from "react";
import { TaskModel } from "../../models/kanban/task.model";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";

import styles from "./latest-tasks.module.css";
import { Card } from "react-bootstrap";

type Props = {
  departmentId: string;
};

export default function LatestTasks({ departmentId }: Props) {
  const [tasks, setTasks] = useState<({ id: string } & TaskModel)[]>([]);

  useEffect(() => {
    KanbanDatabaseService.getLatestInProgressDepartmentTasks(departmentId).then(
      (tasks) => setTasks(tasks)
    );
  }, [departmentId]);

  return (
    <div>
      <h4>Últimas tareas en progreso</h4>
      <div className={styles.container}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <Card.Body>{task.title}</Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
