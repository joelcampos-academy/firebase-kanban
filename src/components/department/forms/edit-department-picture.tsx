import { Form } from "react-bootstrap";
import { StorageService } from "../../../services/storage/storage.service";

import styles from "./edit-department-picture.module.css";
import { useEffect, useState } from "react";

type Props = {
  departmentId: string;
};

export default function EditDepartmentPicture({ departmentId }: Props) {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  const editPicture = async (fileList: FileList | null) => {
    if (fileList === null || fileList.length <= 0) return;

    const [file] = fileList;

    await StorageService.uploadDepartmentImage(file, departmentId);
    fetchPicture(departmentId);
  };

  const fetchPicture = (departmentId: string) => {
    StorageService.getDepartmentImageUrl(departmentId).then((downloadUrl) =>
      setPictureUrl(downloadUrl)
    );
  };

  useEffect(() => {
    fetchPicture(departmentId);
  }, [departmentId]);

  return (
    <div className={styles.container}>
      <img
        src={pictureUrl || undefined}
        className={styles.picture}
        alt="Department picture"
      />
      <Form className={styles.file}>
        <Form.Group>
          <Form.Control
            type="file"
            max={1}
            min={1}
            onChange={(e) =>
              editPicture((e.target as unknown as HTMLInputElement).files)
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}
