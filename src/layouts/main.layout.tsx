import { ReactNode } from "react";
import Header from "../components/navigation/header/header";

import styles from "./main.layout.module.css";
import Rating from "../components/rating/rating";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        {children}
        <div className={styles.rating}>
          <h3>¿Cómo te ha ido usando la web?</h3>
          <Rating />
        </div>
      </div>
    </div>
  );
}
