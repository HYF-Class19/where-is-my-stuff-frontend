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
import { loginUser } from "../firebase/auth";
import Toast from "../Modal/Toast";
import useAuth from "../useAuth";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToest, setShowToast] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { user, loading } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);
      //if login success then show success toast
      if (res) {
        setShowSuccess(true);
      }
    } catch (error) {
      setShowSuccess(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonImg src="./assets/logo1.png" className="login-logo"></IonImg>
            <p className="message">
              <Toast
                message="Login Success"
                isOpen={showSuccess}
                onDismiss={() => setShowSuccess(false)}
              />
              <Toast
                message="Login Failed"
                isOpen={showToest}
                onDismiss={() => setShowToast(false)}
              />
            </p>
            <IonItem>
              <IonLabel position="fixed">Username</IonLabel>
              <IonInput
                placeholder="Your username"
                type="text"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
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
              <IonButton expand="block" id="button-login" onClick={handleLogin}>
                Login
              </IonButton>
              <IonButton
                expand="block"
                color="ffffff"
                className="forgot-button"
              >
                Forgot Password
              </IonButton>
            </div>

            <IonButton expand="block" color="danger" className="google-button">
              Login with Google
            </IonButton>

            <h1 className="subtitle">Dear user</h1>
            <p className="description">
              Create an account to start using the app. With an account, you can
              easily browse and borrow items from other users in your community.
            </p>
            <IonButton expand="block" color="ffffff" className="sign-up-button">
              Sign Up
            </IonButton>
          </IonContent>
        </IonPage>
      </div>
    </>
  );
};
