import { ReactNode } from "react";
import Header from "../components/navigation/header/header";

import styles from "./main.layout.module.css";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
