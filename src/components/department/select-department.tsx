import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { DepartmentModel } from "../../models/department/department.model";
import { KanbanDatabaseService } from "../../services/cloud-firestore/kanban-database.service";

type Props = {
  onSelect: (departmentId: string) => void;
  departmentId?: string;
};

export default function SelectDepartment({ departmentId, onSelect }: Props) {
  const [departments, setDepartments] = useState<
    ({ id: string } & DepartmentModel)[]
  >([]);

  useEffect(() => {
    KanbanDatabaseService.getDepartments().then((deps) => {
      const processedDocs = deps.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as DepartmentModel),
      }));

      setDepartments(processedDocs);
    });
  }, []);

  return (
    <div>
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
    </div>
  );
}
