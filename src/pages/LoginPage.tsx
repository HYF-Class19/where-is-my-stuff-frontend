import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles/Login.css";
import { useState } from "react";
import Footer from "../components/Footer";
import { loginWithGoogle, registerUser } from "../authentication/auth";
import useAuth from "../hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/db";

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

      //if login success then show success toast
      if (res) {
        setError("");
        setShowError(false);
        setShowSuccess(true);

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
        setShowSuccess(true);
        setShowError(false);



      }
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);

    }


  };
  const handleSignUp = async () => {
    try {
      const res = await registerUser(email, password);
      if (res) {
        setShowSuccess(true);
        setShowError(false);

      }
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);

    }
  };
  const toggleFormMode = () => {
    setIsSignUp(!isSignUp);

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
    return <Footer />;
  }

  return (
    <>
      <div>
        <IonPage className="page-container">
          <IonHeader>
            <IonToolbar>
              <IonTitle>login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonImg src="./assets/logo1.png" className="login-logo"></IonImg>
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
                // load
                onClick={isSignUp ? handleSignUp : handleLogin}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </IonButton>
              <IonButton
                expand="block"
                color="ffffff"
                className="forgot-button"
              >
                Forgot Password
              </IonButton>
            </div>
            <IonButton expand="block" color="danger" className="google-button" onClick={handleGoogleLogin}>
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
              onClick={toggleFormMode}
            >
              {isSignUp ? "Switch to Login" : "Sign Up"}
            </IonButton>
          </IonContent>
        </IonPage>
      </div>

    </>
  );
};