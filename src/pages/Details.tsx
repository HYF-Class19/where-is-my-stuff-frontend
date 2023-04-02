import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import {
  ellipsisHorizontalOutline,
} from "ionicons/icons";
/*import { Reminder } from "./Reminder";*/

interface Product {
  productName: string;
  productDetails: string;
  to: string;
  on: string;
  reminder: string;
}
/*this is just for demo, can be integrated with back end*/
const product: Product = {
  productName: "Grinder",
  productDetails:
    "Grinder with portafilter holder .Dosing Hopper 1 kilo each. Dosing Hopper ½ or 1 lb.specify right or left side.",
  to: "Chala",
  on: "22 mar 2023 - 14:50",
  reminder: "22 Apr 2023 - 14:50",
};

const Details: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Reminders" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton id="open-modal" expand="block">
              <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard style={{ margin: "0px" }}>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{product.productDetails}</IonCardContent>
        </IonCard>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">To</IonLabel>
            <IonLabel>{product.to}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">On</IonLabel>
            <IonLabel>{product.on}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Remiinder</IonLabel>
            <IonLabel>{product.reminder}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Details;
