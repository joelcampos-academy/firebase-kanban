import { useEffect, useMemo, useState } from "react";
import { TaskModel } from "../../models/kanban/task.model";
import { TaskState } from "../../models/kanban/task-state.enum";
import { filterTasksByState } from "../../utils/kanban/filter-tasks-by-state.util";
import KanbanColumnTasks from "./kanban-column-tasks";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";
import { Button, Modal } from "react-bootstrap";
import TaskCreateForm from "./forms/task-create-form";

import styles from "./kanban.module.css";

type Props = {
  departmentId: string;
};

export default function Kanban({ departmentId }: Props) {
  const [isCreateTaskOpen, setCreateModalOpenState] = useState(false);
  const [tasks, setTasks] = useState<({ id: string } & TaskModel)[]>([]);

  useEffect(() => {
    const unsubscribe = KanbanDatabaseService.omDepartmentTasksChange(
      departmentId,
      (tasks) => setTasks(tasks)
    );

    return () => unsubscribe();
  }, [departmentId]);

  const groupedTasks = useMemo(() => {
    return {
      [TaskState.TODO]: filterTasksByState(tasks, TaskState.TODO),
      [TaskState.WIP]: filterTasksByState(tasks, TaskState.WIP),
      [TaskState.DONE]: filterTasksByState(tasks, TaskState.DONE),
    };
  }, [tasks]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <Button onClick={() => setCreateModalOpenState(true)}>
            Crear tarea
          </Button>
        </div>
        <div className={styles.kanban}>
          <div className={styles.column}>
            <div className={styles.header}>
              <h3>Por hacer 📦</h3>
            </div>
            <div className={styles.content}>
              <KanbanColumnTasks
                departmentId={departmentId}
                tasks={groupedTasks[TaskState.TODO]}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              <h3>En proceso ⚙️</h3>
            </div>
            <div className={styles.content}>
              <KanbanColumnTasks
                departmentId={departmentId}
                tasks={groupedTasks[TaskState.WIP]}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.header}>
              <h3>Terminadas ✅</h3>
            </div>
            <div className={styles.content}>
              <KanbanColumnTasks
                departmentId={departmentId}
                tasks={groupedTasks[TaskState.DONE]}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isCreateTaskOpen}
        onHide={() => setCreateModalOpenState(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskCreateForm
            departmentId={departmentId}
            close={() => setCreateModalOpenState(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
