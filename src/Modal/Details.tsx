// src/components/ReminderDetailsModal.tsx

import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import {
  chevronBackOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";

interface ReminderDetailsModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  itemName: string;
  description: string;
  to: string;
  on: string;
}

export const ReminderDetailsModal: React.FC<ReminderDetailsModalProps> = ({
  isOpen,
  onDismiss,
  itemName,
  description,
  to,
  on,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details</IonTitle>
          <IonButtons slot="start">
            <IonIcon icon={chevronBackOutline} color="primary"></IonIcon>
            <IonButton onClick={onDismiss}>Back</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisHorizontalOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard style={{ margin: "0px" }}>
          <IonCardHeader>
            <IonCardTitle>{itemName}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{description}</IonCardContent>
        </IonCard>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">To</IonLabel>
            <IonLabel>{to}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">On</IonLabel>
            <IonLabel>{on}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Reminder</IonLabel>
            <IonLabel>{on}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
