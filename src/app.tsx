import EnsureAuthentication from "./components/auth/ensure-authentication";
import LoginPage from "./pages/login.page";

import styles from "./app.module.css";

export default function App() {
  return (
    <div className={styles.container}>
      <EnsureAuthentication UnauthenticatedComponent={<LoginPage />}>
        <p>{"Has iniciado sesión :)"}</p>
      </EnsureAuthentication>
    </div>
  );
}
