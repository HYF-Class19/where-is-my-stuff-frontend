import React, { useState, useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  useIonModal,
  IonIcon,
  IonTabButton,
  IonList,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { exitOutline } from "ionicons/icons";

const ModalExample = ({
  onDismiss,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>New lend out </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Item name</IonLabel>
            <IonInput placeholder="Name of the item"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Description</IonLabel>
            <IonInput placeholder="Description of the item"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>To</IonLabel>
            <IonInput placeholder="Name of the borrower"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>On</IonLabel>
            <IonInput type="number" placeholder="22 Mar 2023 19:24"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Set reminder for</IonLabel>
            <IonInput type="tel" placeholder="21 Apr 2023 19:24"></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const LendOut: React.FC = () => {
  const [present, dismiss] = useIonModal(ModalExample, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  const [message, setMessage] = useState("");

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
      },
    });
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonTabButton tab="radio" href="/radio">
          <IonIcon icon={exitOutline} className="ion-icon" />
          <IonButton expand="block" onClick={() => openModal()}>
            Lend out
          </IonButton>
        </IonTabButton>
        <p>{message}</p>
      </IonContent>
    </IonPage>
  );
};

export default LendOut;
