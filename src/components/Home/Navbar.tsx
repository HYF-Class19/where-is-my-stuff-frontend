import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { enterOutline } from "ionicons/icons";
import "./Navbar.css";

import LendOut from "./LendOut";
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Navbar: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>
              <img className="img-logo" src="./assets/logo.png" alt="My logo" />
            </IonTitle>
            <IonButtons collapse={true} slot="end">
              <IonButton disabled={true}>Logout</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="btn-home">
          <LendOut />
        </IonContent>
        <IonContent className="btn-home">
          <IonTabButton tab="radio" href="/radio">
            <IonIcon icon={enterOutline} className="ion-icon" />
            <IonButton disabled={true}>Borrowed</IonButton>
          </IonTabButton>
        </IonContent>
      </IonPage>
    </>
  );
};
export default Navbar;
