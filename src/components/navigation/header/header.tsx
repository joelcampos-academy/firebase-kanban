import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

import logo from "../../../assets/branding/logo.png";
import oldLogo from "../../../assets/branding/old-logo.png";

import styles from "./header.module.css";
import UserModal from "../../user/user-modal";
import { useEffect, useState } from "react";
import { AuthService } from "../../../services/auth/auth.service";
import { LogoDatabaseService } from "../../../services/realtime-database/logo-database.service";
import { getCurrentUser } from "../../../utils/auth/get-current-user.util";

export default function Header() {
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [displayNewLogo, setDisplayNewLogo] = useState<boolean | null>(null);

  useEffect(() => {
    // Obtenemos nuestro usuario y sacamos nuestro ID
    const user = getCurrentUser();
    const userId = user.uid;

    // Obtenemos el código del logo de nuestro usuario
    LogoDatabaseService.getFirebaseLogoCodeByUserId(userId).then((logoCode) => {
      setDisplayNewLogo(logoCode === "new"); // <- Cargamos en el estado si es el nuevo logo
    });
  }, []);

  const onUserClick = () => {
    setUserModalVisible(true);
  };
  const onBrandClick = () => {};
  const onSignOutClick = () => AuthService.signOut();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={onBrandClick} className={styles.brand}>
            <div className={styles.logo}>
              {displayNewLogo === null ? (
                <Spinner />
              ) : (
                <img src={displayNewLogo ? logo : oldLogo} alt="App logo" />
              )}
            </div>
            Firebase Kanban
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={onUserClick}>Usuario</Nav.Link>
              <Nav.Link onClick={onSignOutClick}>Cerrar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <UserModal
        isVisible={isUserModalVisible}
        onClose={() => setUserModalVisible(false)}
      />
    </>
  );
}
