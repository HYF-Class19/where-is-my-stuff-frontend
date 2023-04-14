import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { chevronBackOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import { UseActionSheet } from "../hooks/UseActionSheet";
import { ActionSheetToDeleteAndUpdate } from "./ActionSheet";


export interface DetailComponentProps {
    isOpen: boolean;
    onDismiss: () => void;
    itemName: string;
    description: string;
    to: string;
    on: string;
    handleActionSheet: () => void;
  }
export const DetailComponent: React.FC<DetailComponentProps> = ({
  isOpen,
  onDismiss,
  itemName,
  description,
  to,
  on,
}) => {
    const { showActionSheet, handleActionSheet } = UseActionSheet();


  return (
    <><IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Details</IonTitle>
                  <IonButtons slot="start">
                      <IonIcon icon={chevronBackOutline} color="primary" />
                      <IonButton onClick={onDismiss}>Back</IonButton>
                  </IonButtons>
                  <IonButtons slot="end">
                      <IonButton onClick={handleActionSheet}>
                          <IonIcon icon={ellipsisHorizontalOutline} color="primary" />
                      </IonButton>
                  </IonButtons>
              </IonToolbar>
          </IonHeader>
          <IonContent>
              <IonCard style={{ margin: '0px' }}>
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
      </IonModal><ActionSheetToDeleteAndUpdate
              isAction={showActionSheet}
              action="reminder"
              onDismiss={() => handleActionSheet()}
              onAction={(action) => console.log(action)} /></>
  );
};


