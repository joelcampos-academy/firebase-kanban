import { get, onValue, ref } from "firebase/database";
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

  static onFirebaseLogoCodeByUserIdChanged = (
    userId: string,
    onChange: (logoCode: string) => void
  ) => {
    // Referencia al valor. Aún no hemos accedido a él. Vemos que la ruta es 'logo/{userId}'.
    const valueRef = ref(realtimeDatabase, `logo/${userId}`);

    // Usamos on value, que llamará a la función pasada por parámetro cada vez que el dato cambie en la DB
    const unsubscribe = onValue(valueRef, (valueSnapshot) => {
      // Esto se llama cuando Firebase detecta un cambio en la DB

      // Igual que en la función getFirebaseLogoCodeByUserId, leemos el valor desde la snapshot (que recibimos por parámetro).
      const value: string = valueSnapshot.val();

      // Llamamos a la función que hemos creado y que recibimos por parámetro.
      onChange(value);
    });

    // Unsubscribe se utiliza para detener la escucha de cambios. La devolvemos por si se desea usar.
    return unsubscribe;
  };
}
