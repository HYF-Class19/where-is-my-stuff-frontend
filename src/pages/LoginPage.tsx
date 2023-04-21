import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./styles/Login.css";
import { useState } from "react";
import Footer from "../components/Footer";
import { loginWithGoogle, registerUser } from "../authentication/auth";
import useAuth from "../hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, dbRef } from "../database/realTimeDatabase";
import { child, set } from "firebase/database";


import 'spin.js/spin.css';
import { IonSpinner } from "@ionic/react";


export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { user, loading } = useAuth();


  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      if (res) {
        setError("Please enter your username and password");
        setShowSuccess(true);
        setShowError(false);

        const user = auth.currentUser;
        if (user) {
          const userRef = child(dbRef, "users/" + user.uid);
          set(userRef, {
            username: username,
            email: email,
            uid: user.uid,
          });
        }

      }
    } catch (error) {

      setShowError(true);
      setShowSuccess(false);

    }
  };
  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        setError("Please enter your username and password");
        setShowSuccess(true);
        setShowError(false);
        const user = auth.currentUser;
        if (user) {
          const userRef = child(dbRef, "users/" + user.uid);
          set(userRef, {
            username: username,
            email: email,
            uid: user.uid,
          });
        }
      }
    } catch (error) {
      setError("Invalid username or password");
      setShowSuccess(false);
      setShowError(true);
    }
  };



  const handleSignUp = async () => {
    try {
      const res = await registerUser(email, password);
      if (res) {
        setError("Please enter your username and password");
        setShowSuccess(true);
        setShowError(false);
        const user = auth.currentUser;
        if (user) {
          const userRef = child(dbRef, "users/" + user.uid);
          set(userRef, {
            username: username,
            email: email,
            uid: user.uid,
          });
        }
      }
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
    }
  };

  // loading
  if (loading) {
    return (
      <IonSpinner
        name="crescent"
        color="primary"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)"

        }}
      />
    );
  }

  if (user) {
    return <Footer page1="/profile" />;

  }

  return (
    <>
      <div>
        <IonPage className="page-container">
          <IonHeader>
            <IonToolbar>
              <IonImg src="./assets/logo1.png" className="login-logo"></IonImg>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1
              style={
                {
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }
              }
            >login</h1>
            <p className="message">
              <IonLabel color="danger" hidden={!showError}>{error}</IonLabel>
              <IonLabel color="success" hidden={!showSuccess}>Login Success</IonLabel>
            </p>
            <IonItem>
              {isSignUp && (
                <>
                  <IonLabel position="fixed">Display Name</IonLabel>
                  <IonInput
                    placeholder="Your Display Name"
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  ></IonInput>
                </>
              )}
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput
                placeholder="Your Email"
                type="text"
                value={email}
                onIonChange={(e) => setUserEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput
                placeholder="Your Password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <div className="button-group" id="button-group">
              <IonButton
                expand="block"
                id="button-login"
                onClick={isSignUp ? handleSignUp : handleLogin}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </IonButton>
              <IonButton
                expand="block"
                color="ffffff"
                className="forgot-button"
                disabled
              >
                Forgot Password
              </IonButton>
            </div>
            <IonButton expand="block" color="danger" className="google-button" disabled onClick={handleGoogleLogin}>
              Login with Google
            </IonButton>
            <h1 className="subtitle">Dear user</h1>
            <p className="description">
              Create an account to start using the app. With an account, you can
              easily browse and borrow items from other users in your community.
            </p>
            <IonButton
              expand="block"
              color="ffffff"
              className="sign-up-button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Switch to Login" : "Sign Up"}
            </IonButton>
          </IonContent>
        </IonPage>
      </div>

    </>
  );
};