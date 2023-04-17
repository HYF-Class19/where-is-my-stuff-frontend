import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import UserList from "../components/UserList"
import React, { useState, useEffect } from 'react';
import { dbRef } from "../database/db";
import { child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


export const Lend: React.FC = () => {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser?.uid;

  const handleClose = () => {
  };

  useEffect(() => {
    if (userId) {
      const sanitizedEmail = currentUser?.email?.replace(/[\\[\].#$]/g, '-');
      const emailInfo = sanitizedEmail?.split('@gmailcom');
      const itemsRef = child(dbRef, `users/${emailInfo}/items/`);
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const newItems: { id: string; name: string }[] = [];
        if (data) {
          Object.keys(data).forEach((key) => {
            newItems.push({
              id: key,
              name: data[key].name,

            });
          });
        }
        setItems(newItems);
      });
    }
  }, [
    userId
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class='ion-text-center'>Lend out items</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <UserList items={items}
          detailComponentProps={
            {
            isOpen: true,
            onDismiss: handleClose,
            itemName: "",
            description: "",
            to: "",
            on: "",
            reminder: "",
          }
        }
        />
      </IonContent>
    </IonPage>
  );
};
