import React, { useEffect, useState } from "react";
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
import { child, push, set } from "firebase/database";
import { User } from "firebase/auth";
import { dbRef, auth } from "../../database/db";

function createItem(name: string, description: string, borrowerName: string, lendingDate: string, reminderDate: string, email: string) {
  const sanitizedEmail = email.replace(/[\\[\].#$]/g, '-');
  const emailInfo = sanitizedEmail.split('@gmailcom');
  const itemsRef = child(dbRef, `users/${emailInfo}/items`);
  const newItemRef = push(itemsRef);
  const newItemId = newItemRef.key;
  const itemRef = child(
    dbRef,
    `users/${emailInfo}/items/${newItemId}`
  );
  set(itemRef, {
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
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [lendingDate, setLendingDate] = useState(new Date().toISOString());
  const [reminderDate, setReminderDate] = useState(new Date().toISOString());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleConfirm = () => {
    if (name === '' || description === '' || borrowerName === '') {
      displayToast('Please fill in all fields', 'danger');
    } else {
      const newItemId = createItem(name, description, borrowerName, lendingDate, reminderDate, user?.email || '');
      displayToast('Item created successfully', 'success');
      console.log('New item ID:', newItemId);
      onDismiss();
    }
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
        } />
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

