import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DepartmentModel } from "../../models/department/department.model";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";

import styles from "./select-department.module.css";
import CreateDepartmentForm from "./forms/create-department-form";

type Props = {
  onSelect: (departmentId: string) => void;
  departmentId?: string;
};

export default function SelectDepartment({ departmentId, onSelect }: Props) {
  const [isCreateDepartmentVisible, setCreateDepartmentVisibility] =
    useState(false);

  const [departments, setDepartments] = useState<
    ({ id: string } & DepartmentModel)[]
  >([]);

  useEffect(() => {
    KanbanDatabaseService.onDepartmentsChange((deps) => {
      setDepartments(deps);
    });
  }, []);

  return (
    <>
      <Form className={styles.form}>
        <Form.Select
          disabled={departments.length <= 0}
          value={departmentId}
          onChange={(e) => onSelect(e.target.value)}
          aria-label="Seleccionar departamento"
        >
          <option hidden>Selecciona un departamento</option>
          {departments.map((doc) => (
            <option value={doc.id} key={doc.id}>
              {doc.name}
            </option>
          ))}
        </Form.Select>
        <Button onClick={() => setCreateDepartmentVisibility(true)}>
          Crear departamento
        </Button>
      </Form>

      <Modal
        show={isCreateDepartmentVisible}
        onHide={() => setCreateDepartmentVisibility(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDepartmentForm
            close={() => setCreateDepartmentVisibility(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
