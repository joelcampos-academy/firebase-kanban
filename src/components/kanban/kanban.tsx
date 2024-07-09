import { useEffect, useMemo, useState } from "react";
import { TaskModel } from "../../models/kanban/task.model";
import { TaskState } from "../../models/kanban/task-state.enum";
import { filterTasksByState } from "../../utils/kanban/filter-tasks-by-state.util";
import KanbanColumnTasks from "./kanban-column-tasks";

import styles from "./kanban.module.css";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";

type Props = {
  departmentId: string;
};

export default function Kanban({ departmentId }: Props) {
  const [tasks, setTasks] = useState<({ id: string } & TaskModel)[]>([]);

  useEffect(() => {
    KanbanDatabaseService.getDepartmentTasks(departmentId).then((tasks) => {
      setTasks(tasks);
    });
  }, [departmentId]);

  const groupedTasks = useMemo(() => {
    return {
      [TaskState.TODO]: filterTasksByState(tasks, TaskState.TODO),
      [TaskState.WIP]: filterTasksByState(tasks, TaskState.WIP),
      [TaskState.DONE]: filterTasksByState(tasks, TaskState.DONE),
    };
  }, [tasks]);

  return (
    <div className={styles.kanban}>
      <div className={styles.column}>
        <div className={styles.header}>
          <h3>Por hacer 📦</h3>
        </div>
        <div className={styles.content}>
          <KanbanColumnTasks tasks={groupedTasks[TaskState.TODO]} />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.header}>
          <h3>En proceso ⚙️</h3>
        </div>
        <div className={styles.content}>
          <KanbanColumnTasks tasks={groupedTasks[TaskState.WIP]} />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.header}>
          <h3>Terminadas ✅</h3>
        </div>
        <div className={styles.content}>
          <KanbanColumnTasks tasks={groupedTasks[TaskState.DONE]} />
        </div>
      </div>
    </div>
  );
}
