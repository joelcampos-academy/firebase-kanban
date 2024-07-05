import {
  type AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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

  static createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return { credentials };
    } catch (e) {
      return { error: e as AuthError };
    }
  };

  static signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return { credentials: await signInWithPopup(firebaseAuth, provider) };
    } catch (e) {
      return { error: e as AuthError };
    }
  };

  static signOut = () => signOut(firebaseAuth);

  static recoverPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return {};
    } catch (e) {
      return { error: e as AuthError };
    }
  };

  static onAuthChange = ({
    onSignIn,
    onSignOut,
  }: {
    onSignIn: () => void;
    onSignOut: () => void;
  }) =>
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) onSignIn();
      else onSignOut();
    });
}
