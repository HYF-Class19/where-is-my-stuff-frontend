import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { enterOutline } from "ionicons/icons";
import "./Navbar.css";
import { logoutUser } from "../../firebase/auth";

import LendOut from "./LendOut";
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Navbar: React.FC = () => {

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      //if login success then show success toast
      if (res) {
        console.log("logout success");
      }
    } catch (error) {
      console.log("logout failed");
    }
  };
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>
              <IonImg src="./assets/logo1.png" style={
                {
                  width: "100px", height: "44px",
                  margin: "2px",
                  backgroundColor: "#ffffff",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              }></IonImg>
            </IonTitle>
            <IonButtons collapse={true} slot="end">
              <IonButton onClick={handleLogout } >Logout</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="btn-home">
          <LendOut />
        </IonContent>
        <IonContent className="btn-home">
          <IonTabButton tab="radio" href="/radio">
            <IonIcon icon={enterOutline} className="ion-icon-borrow" />
            <IonButton disabled className="ion-button-borrow">Borrowed</IonButton>
          </IonTabButton>
        </IonContent>
      </IonPage>
    </>
  );
};
export default Navbar;
