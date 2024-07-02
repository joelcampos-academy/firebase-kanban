import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { setupFirebase } from "./utils/firebase/setup-firebase.util.ts";

import "./index.css";

// Cargamos el CSS de Bootstrap en la app
import "bootstrap/dist/css/bootstrap.min.css";

// Cargamos Firebase
setupFirebase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
