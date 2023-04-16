import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth } from "../database/db";

export async function registerUser(email: string, password: string) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const logoutUser = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}