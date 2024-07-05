import EnsureAuthentication from "./components/auth/ensure-authentication";
import LoginPage from "./pages/login.page";

import styles from "./app.module.css";
import MainLayout from "./layouts/main.layout";

export default function App() {
  return (
    <div className={styles.container}>
      <EnsureAuthentication UnauthenticatedComponent={<LoginPage />}>
        <MainLayout>
          <p>{"Has iniciado sesión :)"}</p>
        </MainLayout>
      </EnsureAuthentication>
    </div>
  );
}
