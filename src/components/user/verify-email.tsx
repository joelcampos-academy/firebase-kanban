import { Alert, Button } from "react-bootstrap";
import { getCurrentUser } from "../../utils/auth/get-current-user.util";
import { AuthService } from "../../services/auth/auth.service";
import { useState, useTransition } from "react";
import { AuthError } from "firebase/auth";

export default function VerifyEmail() {
  const [errorState, setErrorState] = useState<AuthError>();
  const [isLoading, setLoading] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const [, startTransition] = useTransition();

  const { email } = getCurrentUser();

  const onVerifyEmailClick = async () => {
    setLoading(true);

    const response = await AuthService.verifyEmail();

    startTransition(() => {
      setErrorState(response.error);
      setLoading(false);
      setHasSent(true);
    });
  };

  return (
    <div>
      <p>
        Se enviará un correo a <b>{email}</b> con un enlace de verificación.
      </p>
      {errorState && <Alert variant="danger">{errorState.message}</Alert>}
      {!errorState && hasSent && (
        <Alert variant="success">
          Se ha enviado un correo de verificación a <b>{email}</b>. Si no lo has
          recibido puedes reenviarlo.
        </Alert>
      )}
      <Button
        disabled={isLoading}
        onClick={onVerifyEmailClick}
        className="w-100"
      >
        {hasSent
          ? "Reenviar correo de verificación"
          : "Verificar correo electónico"}
      </Button>
    </div>
  );
}
