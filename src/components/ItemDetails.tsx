import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';


interface ItemDetailsProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  item: {
    name: string;
    description: string;
    borrowerName: string;
    lendingDate: string;
    reminderDate: string;
  };
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  isOpen,
  onDidDismiss,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>
              <IonIcon slot="icon-only" icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{item.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>{item.description}</p>
        <p>Borrower Name: {item.borrowerName}</p>
        <p>Lending Date: {item.lendingDate}</p>
        <p>Reminder Date: {item.reminderDate}</p>
      </IonContent>
    </IonModal>
  );
};