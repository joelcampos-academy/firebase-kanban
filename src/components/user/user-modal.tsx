import { Modal, Alert } from "react-bootstrap";
import UserProfilePanel from "./user-profile-panel";
import VerifyEmail from "./verify-email";
import { getCurrentUser } from "../../utils/auth/get-current-user.util";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function UserModal({ isVisible, onClose }: Props) {
  const { emailVerified } = getCurrentUser();

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mi perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserProfilePanel />
        <hr />
        {emailVerified ? (
          <Alert variant="success">Tu correo electrónico está verificado</Alert>
        ) : (
          <VerifyEmail />
        )}
      </Modal.Body>
    </Modal>
  );
}
