import { Button, Card, CardBody, Form } from "react-bootstrap";
import { AuthService } from "../services/auth/auth.service";
import { useState } from "react";

import styles from "./login.page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardBody>
          <EmailAndPasswordForm />
        </CardBody>
      </Card>
    </div>
  );
}

/**
 * Componente que contiene el formulario de inicio de sesión por
 * correo electrónico y contraseña.
 */
const EmailAndPasswordForm = () => {
  const [emailState, setEmailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();

  const onLoginClick = () => {
    if (emailState && passwordState) {
      AuthService.signIn(emailState, passwordState);
    }
  };

  return (
    <Form className={styles["password-form"]}>
      <Form.Group>
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          onChange={(event) => setEmailState(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPasswordState(event.target.value)}
        />
      </Form.Group>
      <Button onClick={onLoginClick}>Iniciar sesión</Button>
    </Form>
  );
};
