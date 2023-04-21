/* eslint-disable jsx-a11y/img-redundant-alt */
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonList
} from '@ionic/react';

import { useState, useEffect } from "react";
import { getFirestore, collectionGroup, getDocs } from "firebase/firestore";

interface Item {
    itemId: string;
    imageUrl: string;
    name: string;
    description: string;
}

export const Borrow: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const db = getFirestore();
        const getItems = async () => {
            const itemSnapshot = await getDocs(collectionGroup(db, "items"));
            const itemData = itemSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    itemId: data.itemId,
                    imageUrl: data.imageUrl,
                    name: data.name,
                    description: data.description,
                };
            });
            setItems(itemData);
        };
        getItems();

    }, []);

    const handleCardClick = () => {
        setExpanded(!expanded);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton defaultHref="/profile" />
                    </IonButtons>
                    <IonTitle>Market place</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {items.map(item => (
                        <IonItem key={item.itemId} onClick={handleCardClick}>
                            <IonCard style={{
                                maxWidth: "90%",
                                maxHeight: "100%",
                                margin: "auto",
                            }}>
                                <img alt="Item Image" src={item.imageUrl} />
                                <IonCardHeader>
                                    <IonCardTitle>{item.name}</IonCardTitle>
                                </IonCardHeader>
                                {expanded && (
                                    <IonCardContent>
                                        {item.description}
                                        {/* chat box */}
                                        
                                    </IonCardContent>
                                )}
                            </IonCard>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};


