import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {reloadOutline, starSharp, calendarNumber, phoneLandscape } from "ionicons/icons";


const Menu: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">

              <IonBackButton defaultHref="/profile"></IonBackButton>
              <IonTitle>Items Listining</IonTitle>
            </IonButtons>
          </IonToolbar>
          <IonItem routerLink="/history" routerDirection="none">
            <IonIcon slot="start" icon={reloadOutline}></IonIcon>
            <IonLabel>Borrowing process</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon slot="start" icon={calendarNumber}></IonIcon>
            <IonLabel>Lending history</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon slot="start" icon={phoneLandscape}></IonIcon>
            <IonLabel>Communication</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon slot="start" icon={starSharp}></IonIcon>
            <IonLabel>User ratings</IonLabel>
          </IonItem>
        </IonHeader>
      </IonMenu>
      <IonPage id="main-content" >
        <IonMenuButton slot="start" />
      </IonPage>

    </>
  );
};
export default Menu;
