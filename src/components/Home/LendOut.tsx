import React, { useState } from "react";
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
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonAlert,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { exitOutline } from "ionicons/icons";
import { getDatabase, ref, push, set } from "firebase/database";

function createItem(name: string, description: string, borrowerName: string, lendingDate: string, reminderDate: string) {
  const db = getDatabase();
  const newItemRef = push(ref(db, 'items')); 
  const newItemId = newItemRef.key; 
  set(newItemRef, {
    id: newItemId,
    name: name,
    description: description,
    borrowerName: borrowerName,
    lendingDate: lendingDate,
    reminderDate: reminderDate,
  });
  return newItemId;
}

const ModalExample = ({ onDismiss }: { onDismiss: (e?: OverlayEventDetail) => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [lendingDate, setLendingDate] = useState(new Date().toLocaleString());
  const [reminderDate, setReminderDate] = useState(new Date().toLocaleString());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('');

  const handleConfirm = () => {
    const isInputValid = name && description && borrowerName && lendingDate && reminderDate;
  
    if (!isInputValid) {
      displayToast('Please fill out all fields', 'danger');
    } else {
      const itemId = createItem(name, description, borrowerName, lendingDate, reminderDate);
  
      if (itemId) {
        displayToast(`Item ${name} created successfully`, 'success');
        setTimeout(() => onDismiss(), 2000);
      } else {
        displayToast('Error creating item', 'danger');
      }
    }
  
    setTimeout(() => setShowToast(false), 10000);
  };
  
  const displayToast = (message: string, color: string) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };
  

  return (
    <>
      <IonAlert
        isOpen={showToast}
        message={toastMessage}
        cssClass={toastColor === 'success' ? 'ion-text-success' : 'ion-text-danger'}
        buttons={
          [
            {
              text: 'OK',
              handler: () => {
                setShowToast(false);
              }
            }
          ]
        }/>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium"
                onClick={() => onDismiss()}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>New lend out </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleConfirm}>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel>Item name</IonLabel>
              <IonInput placeholder="Name of the item"
                onIonChange={(event: CustomEvent) => {
                    const target = event.target as HTMLInputElement;
                    setName(target.value);
                  }}>
                  </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonInput value={description} placeholder="Description of the item" onIonChange={
                (event: CustomEvent) => {
                  const target = event.target as HTMLInputElement;
                  setDescription(target.value);
                }
              }></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>To</IonLabel>
              <IonInput placeholder="Name of the borrower" onIonChange={
                (event: CustomEvent) => {
                  const target = event.target as HTMLInputElement;
                  setBorrowerName(target.value);
                }
              }></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>On</IonLabel>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime"
                  onIonChange={
                    (event: CustomEvent) => {
                      const target = event.target as HTMLInputElement;
                      setLendingDate(target.value);
                    }}>
                </IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel>Set reminder for</IonLabel>
              <IonDatetimeButton datetime="reminderTime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="reminderTime"
                  onIonChange={
                    (event: CustomEvent) => {
                      const target = event.target as HTMLInputElement;
                      setReminderDate(target.value);
                    }
                  }
                ></IonDatetime>
              </IonModal>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </>
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

