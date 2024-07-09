import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TaskState } from "../../../models/kanban/task-state.enum";

import styles from "./task-create-form.module.css";
import { KanbanDatabaseService } from "../../../services/cloud-firestore/kanban-database.service";

const TASK_STATES_I18n: Record<TaskState, string> = {
  [TaskState.DONE]: "Hecha",
  [TaskState.TODO]: "Por hacer",
  [TaskState.WIP]: "En progreso",
};

type Props = {
  departmentId: string;
  close: () => void;
};

export default function TaskCreateForm({ departmentId, close }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [taskState, setTaskState] = useState<TaskState>(TaskState.TODO);

  const [isLoading, setIsLoading] = useState(false);

  const onCreateClick = async () => {
    setIsLoading(true);

    KanbanDatabaseService.createDepartmentTask(departmentId, {
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
      <Button disabled={isLoading} onClick={onCreateClick} className="w-100">
        Crear tarea
      </Button>
    </Form>
  );
}
