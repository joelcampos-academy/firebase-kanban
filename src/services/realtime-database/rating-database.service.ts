import { get, ref, set } from "firebase/database";
import { realtimeDatabase } from "../../utils/firebase/setup-firebase.util";

export class RatingDatabaseService {
  static getRatingByUserId = async (userId: string) => {
    // Referencia al valor
    const valueRef = ref(realtimeDatabase, `ratings/${userId}`);

    // Leemos el valor de la DB
    const valueSnapshot = await get(valueRef);

    // Podemos comprobar si el valor existe
    if (!valueSnapshot.exists()) return null;

    // Devolvemos el valor
    return valueSnapshot.val() as number;
  };

  static setUserRating = async (userId: string, rating: number) => {
    // Referencia al valor
    const valueRef = ref(realtimeDatabase, `ratings/${userId}`);

    // Si el valor existía lo reemplaza, si no existía lo crea
    await set(valueRef, rating);
  };
}
