import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getCurrentUser } from "../../utils/auth/get-current-user.util";

import styles from "./user-profile-panel.module.css";
import { AuthService } from "../../services/auth/auth.service";

export default function UserProfilePanel() {
  const user = getCurrentUser();

  const [name, setName] = useState<string>(user.displayName ?? "");
  const [photoURL, setPhotoURL] = useState<string>(user.photoURL ?? "");

  const onUpdateProfileClick = async () => {
    await AuthService.updateProfileData({ displayName: name, photoURL });
  };

  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={name}
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>
      <div className={styles["avatar-form"]}>
        {photoURL && (
          <div>
            <img src={photoURL} alt="User avatar" />
          </div>
        )}
        <Form.Group className={styles["form-item"]}>
          <Form.Label>Foto de perfil</Form.Label>
          <Form.Control
            value={photoURL}
            type="url"
            onChange={(event) => setPhotoURL(event.target.value)}
          />
        </Form.Group>
      </div>
      <Button
        onClick={onUpdateProfileClick}
        disabled={name === user.displayName && photoURL === user.photoURL}
        className="w-100"
      >
        Modificar datos
      </Button>
    </Form>
  );
}
