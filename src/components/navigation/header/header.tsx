import { Container, Nav, Navbar } from "react-bootstrap";

import logo from "../../../assets/branding/logo.png";

import styles from "./header.module.css";

export default function Header() {
  const onUserClick = () => {};
  const onBrandClick = () => {};

  return (
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
