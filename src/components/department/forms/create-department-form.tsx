import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { KanbanDatabaseService } from "../../../services/cloud-firestore/kanban-database.service";

import styles from "./create-department-form.module.css";

type Props = {
  close: () => void;
};

export default function CreateDepartmentForm({ close }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string>("");

  const onCreateClick = () => {
    setIsLoading(true);
    KanbanDatabaseService.createDepartment({ name })
      .then(() => close())
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </Form.Group>
      <Button disabled={isLoading} onClick={onCreateClick}>
        Crear departamento
      </Button>
    </Form>
  );
}
