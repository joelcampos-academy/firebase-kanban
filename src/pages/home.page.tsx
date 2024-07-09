import { useState } from "react";
import Kanban from "../components/kanban/kanban";
import Rating from "../components/rating/rating";

import styles from "./home.page.module.css";
import SelectDepartment from "../components/department/select-department";

export default function HomePage() {
  const [departmentId, setDepartmentId] = useState<string>();

  return (
    <div className={styles.container}>
      <div>
        <SelectDepartment
          departmentId={departmentId}
          onSelect={setDepartmentId}
        />
      </div>
      {departmentId && (
        <div className={styles.kanban}>
          <Kanban departmentId={departmentId} />
        </div>
      )}
      <div className={styles.rating}>
        <h3>¿Cómo te ha ido usando la web?</h3>
        <Rating />
      </div>
    </div>
  );
}
