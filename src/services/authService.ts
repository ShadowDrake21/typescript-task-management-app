import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebaseConfig';
import { FirebaseError } from 'firebase/app';

const auth = getAuth(app);

export async function authorize() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
}

export function signOut() {
  auth.signOut();
}
