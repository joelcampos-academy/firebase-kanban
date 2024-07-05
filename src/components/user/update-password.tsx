import { AuthError } from "firebase/auth";
import { useState, useTransition } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { AuthService } from "../../services/auth/auth.service";

import styles from "./update-password.module.css";

export default function UpdatePassword() {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<AuthError>();

  const [, startTransition] = useTransition();

  const onUpdatePasswordClick = async () => {
    if (password) {
      setLoading(true);
      const response = await AuthService.updatePassword(password);

      startTransition(() => {
        setLoading(false);
        setErrorState(response?.error);
        setPassword("");
      });
    }
  };

  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </Form.Group>
      {errorState && <Alert variant="danger">{errorState.message}</Alert>}
      <Button
        className="w-100"
        disabled={isLoading}
        onClick={onUpdatePasswordClick}
      >
        Actualizar contraseña
      </Button>
    </Form>
  );
}
