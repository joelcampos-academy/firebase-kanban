import { useState } from "react";
import Kanban from "../components/kanban/kanban";
import Rating from "../components/rating/rating";
import SelectDepartment from "../components/department/select-department";
import EditDepartmentPicture from "../components/department/forms/edit-department-picture";

import styles from "./home.page.module.css";

export default function HomePage() {
  const [departmentId, setDepartmentId] = useState<string>();

  return (
    <div className={styles.container}>
      <div className={styles["select-department"]}>
        {departmentId && <EditDepartmentPicture departmentId={departmentId} />}
        <div>
          <SelectDepartment
            departmentId={departmentId}
            onSelect={setDepartmentId}
          />
        </div>
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
