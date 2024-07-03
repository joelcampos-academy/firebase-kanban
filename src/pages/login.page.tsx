import { Alert, Button, Card, CardBody, Form } from "react-bootstrap";
import { AuthService } from "../services/auth/auth.service";
import { useEffect, useState, useTransition } from "react";

import styles from "./login.page.module.css";
import { AuthError } from "firebase/auth";

export default function LoginPage() {
  const [isAuthenticating, setIsAuthenticating] = useState();

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardBody>
          <EmailAndPasswordForm
            setIsAuthenticating={setIsAuthenticating}
            isAuthenticating={isAuthenticating}
          />
        </CardBody>
      </Card>
    </div>
  );
}

type FormProps = {
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  isAuthenticating: boolean;
};

/**
 * Componente que contiene el formulario de inicio de sesión por
 * correo electrónico y contraseña.
 */
const EmailAndPasswordForm = ({
  setIsAuthenticating,
  isAuthenticating,
}: Readonly<FormProps>) => {
  const [emailState, setEmailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  const [errorState, setErrorState] = useState<AuthError>();

  const [, startTransition] = useTransition();

  // Cada vez que se modifiquen el usuario o contraseña se reiniciará el estado de error
  useEffect(() => {
    if (errorState) setErrorState(undefined);
  }, [emailState, passwordState]);

  // Función que se llama al hacer click en login
  const onLoginClick = async () => {
    if (emailState && passwordState) {
      setIsAuthenticating(true);

      const authResult = await AuthService.signIn(emailState, passwordState);
      startTransition(() => {
        if (authResult.error) setErrorState(authResult.error);
        else setErrorState(undefined);
        setIsAuthenticating(false);
      });
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
      {errorState && <Alert variant="danger">{errorState.message}</Alert>}
      <Button disabled={isAuthenticating} onClick={onLoginClick}>
        Iniciar sesión
      </Button>
    </Form>
  );
};
