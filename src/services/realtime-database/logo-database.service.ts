import { get, ref } from "firebase/database";
import { realtimeDatabase } from "../../utils/firebase/setup-firebase.util";

export class LogoDatabaseService {
  static getFirebaseLogoCodeByUserId = async (userId: string) => {
    // Referencia al valor. Aún no hemos accedido a él. Vemos que la ruta es 'logo/{userId}'.
    const valueRef = ref(realtimeDatabase, `logo/${userId}`);

    // Snapshot del valor (ahora si se hace una solicitud a la base de datos, por eso hay que hacer await).
    const valueSnapshot = await get(valueRef);

    // Sacamos el valor de la snapshot. Aquí no se hacen peticiones a la DB ya que ya teníamos el dato en la snapshot.
    const value: string = valueSnapshot.val();

    return value;
  };
}
