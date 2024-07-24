import { httpsCallable } from "firebase/functions";
import { firebaseFunctions } from "../../utils/firebase/setup-firebase.util";

export class FunctionsService {
  static getInfo = async () => {
    // Creamos una instancia para llamar a la función 'getInfo'
    const callable = httpsCallable(firebaseFunctions, "getInfo");

    // Llamamos a la instancia (esto realiza la llamada al servidor y recibe la respuesta)
    const response = await callable();
    const data = response.data as { status: string; message: string };

    return data;
  };
}
