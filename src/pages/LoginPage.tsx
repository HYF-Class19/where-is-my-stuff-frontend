import {
    IonButton, IonContent, IonHeader, IonImg, IonInput,
    IonItem, IonLabel, IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import "./styles/Login.css"
import { useState } from "react";
import Footer from "../components/Footer";


export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showFooter, setShowFooter] = useState<boolean>(false);

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setError("");
            setShowError(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowFooter(true);
            }, 2000);
        } else {
            setError("Invalid username or password");
            setShowError(true);
            setShowSuccess(false);
        }
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
                            <IonLabel color="danger" hidden={!showError}>{error}</IonLabel>
                            <IonLabel color="success" hidden={!showSuccess}>Login Success</IonLabel>
                        </p>
                        <IonItem>
                            <IonLabel position="fixed">Username</IonLabel>
                            <IonInput placeholder="Your username"
                                type="text"
                                value={username}
                                onIonChange={e => setUsername(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="fixed">Password</IonLabel>
                            <IonInput placeholder="Your Password"
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <div className="button-group" id="button-group">
                            <IonButton expand="block" id="button-login" onClick={handleLogin} >Login</IonButton>
                            <IonButton expand="block" color="ffffff" className="forgot-button">Forgot Password</IonButton>
                        </div>

                        <IonButton expand="block" color="danger" className="google-button">Login with Google</IonButton>

                        <h1 className="subtitle">Dear user</h1>
                        <p className="description">
                            Create an account to start using the app.
                            With an account, you can easily browse and borrow items from other users in your community.
                        </p>
                        <IonButton expand="block" color="ffffff" className="sign-up-button">Sign Up</IonButton>
                    </IonContent>
                </IonPage>
            </div>
            {showFooter && <Footer />}
        </>

    );
};

