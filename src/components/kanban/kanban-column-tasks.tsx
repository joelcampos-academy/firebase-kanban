import { Button, Modal } from "react-bootstrap";
import { TaskModel } from "../../models/kanban/task.model";

import styles from "./kanban-column-tasks.module.css";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";
import { useState } from "react";
import TaskUpdateForm from "./forms/task-update-form";

type Props = {
  tasks: ({ id: string } & TaskModel)[];
  departmentId: string;
};

export default function KanbanColumnTasks({ tasks, departmentId }: Props) {
  const [editTask, setEditTask] = useState<({ id: string } & TaskModel) | null>(
    null
  );

  if (tasks.length <= 0)
    return <div className={styles.empty}>No hay tareas</div>;

  const onDeleteClick = (taskId: string) =>
    KanbanDatabaseService.removeDepartmentTask(departmentId, taskId);

  return (
    <>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.item}>
            <div className={styles.header}>
              <h4>{task.title}</h4>
              <div className={styles.actions}>
                <Button onClick={() => setEditTask(task)}>Editar</Button>
                <Button variant="danger" onClick={() => onDeleteClick(task.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      <Modal show={editTask !== null} onHide={() => setEditTask(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTask && (
            <TaskUpdateForm
              task={editTask}
              close={() => setEditTask(null)}
              departmentId={departmentId}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
