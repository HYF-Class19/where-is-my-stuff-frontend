import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import  UserList from   "../components/UserList"
import React, { useState, useEffect } from 'react';

import {dbRef} from "../db";
import { child, onValue } from "firebase/database";


export const Lend: React.FC = () => {
    const [items, setItems] = useState<{ id: string; name: string }[]>([]);
    
    useEffect(() => {
        if (dbRef) {
          const itemsRef = child(dbRef, 'items');
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
      }, []);
       
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle  class='ion-text-center'>Lend out items</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                
                <UserList items={items} />
            </IonContent>
        </IonPage>
    );
};
