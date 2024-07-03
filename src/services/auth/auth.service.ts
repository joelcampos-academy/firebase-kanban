import { type AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase/setup-firebase.util";

export class AuthService {
  static signIn = async (email: string, password: string) => {
    try {
      const authenticationResult = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      return { credentials: authenticationResult };
    } catch (e) {
      return { error: e as AuthError };
    }
  };
}
