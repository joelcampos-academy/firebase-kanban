import { type ReactNode, useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth.service";

type Props = {
  children: ReactNode;
  UnauthenticatedComponent: ReactNode;
};

/**
 * Este componente se encarga de asegurar que su hijo solo se renderiza si
 * la sesión de usuario está inciada.
 * De lo contrario, muestra el componente configurado como UnauthenticatedComponent.
 */
export default function EnsureAuthentication({
  children,
  UnauthenticatedComponent,
}: Readonly<Props>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.onAuthChange({
      onSignIn: () => setIsAuthenticated(true),
      onSignOut: () => setIsAuthenticated(false),
    });
  }, []);

  if (isAuthenticated) return children;

  return UnauthenticatedComponent;
}
