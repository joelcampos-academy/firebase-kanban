import { Container, Nav, Navbar } from "react-bootstrap";

import logo from "../../../assets/branding/logo.png";

import styles from "./header.module.css";
import UserModal from "../../user/user-modal";
import { useState } from "react";
import { AuthService } from "../../../services/auth/auth.service";

export default function Header() {
  const [isUserModalVisible, setUserModalVisible] = useState(false);

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
            <img src={logo} alt="App logo" />
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
