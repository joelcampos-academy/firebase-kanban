import {
  type AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

  static verifyEmail = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error("Debes tener la sesión iniciada");

      await sendEmailVerification(user);
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

  // Profile data

  static updateProfileData = async ({
    displayName,
    photoURL,
  }: {
    displayName?: string;
    photoURL?: string;
  }) => {
    const user = getAuth().currentUser;

    if (!user) throw new Error("Se esperaba un usuario");

    try {
      await updateProfile(user, { displayName, photoURL });
    } catch (e) {
      return { error: e as AuthError };
    }
  };
}
