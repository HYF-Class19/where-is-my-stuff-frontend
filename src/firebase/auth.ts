import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,} from "firebase/auth";
import {auth} from "../db";

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
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logoutUser() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}