import EnsureAuthentication from "./components/auth/ensure-authentication";
import LoginPage from "./pages/login.page";

import styles from "./app.module.css";
import MainLayout from "./layouts/main.layout";
import HomePage from "./pages/home.page";

export default function App() {
  return (
    <div className={styles.container}>
      <EnsureAuthentication UnauthenticatedComponent={<LoginPage />}>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </EnsureAuthentication>
    </div>
  );
}
