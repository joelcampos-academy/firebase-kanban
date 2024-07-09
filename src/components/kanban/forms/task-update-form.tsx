import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TaskState } from "../../../models/kanban/task-state.enum";
import { KanbanDatabaseService } from "../../../services/cloud-firestore/kanban-database.service";
import { TaskModel } from "../../../models/kanban/task.model";

import styles from "./task-update-form.module.css";

const TASK_STATES_I18n: Record<TaskState, string> = {
  [TaskState.DONE]: "Hecha",
  [TaskState.TODO]: "Por hacer",
  [TaskState.WIP]: "En progreso",
};

type Props = {
  departmentId: string;
  task: { id: string } & TaskModel;
  close: () => void;
};

export default function TaskUpdateForm({ departmentId, close, task }: Props) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [taskState, setTaskState] = useState<TaskState>(task.state);

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateClick = async () => {
    setIsLoading(true);

    KanbanDatabaseService.updateDepartmentTask(departmentId, task.id, {
      title,
      description,
      state: taskState,
    })
      .then(() => {
        close();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textarea"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select
          value={taskState}
          onChange={(e) => setTaskState(e.target.value as TaskState)}
          aria-label="Seleccionar estado de la tarea"
        >
          {Object.values(TaskState).map((state) => (
            <option value={state} key={state}>
              {TASK_STATES_I18n[state]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button disabled={isLoading} onClick={onUpdateClick} className="w-100">
        Actualizar tarea
      </Button>
    </Form>
  );
}
