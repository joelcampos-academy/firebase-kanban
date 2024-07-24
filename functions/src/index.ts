import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Documentación para crear tus funciones
// https://firebase.google.com/docs/functions/typescript

export const getInfo = onCall((request) => {
  if (!request.auth) logger.info("Llamada anónima a la función");
  else logger.info(`${request.auth.token.email} ha llamado a la función`);

  return {
    status: "ok",
    message: "Servidor encendido y listo para atender llamadas 🔥",
  };
});
