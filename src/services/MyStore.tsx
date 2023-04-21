/* eslint-disable jsx-a11y/img-redundant-alt */
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../database/fireStoreDatabase";

interface Item {
    itemId: string;
    imageUrl: string;
    name: string;
    description: string;
}

export const MyStore: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [expanded, setExpanded] = useState(false);
 
    useEffect(() => {

        const db = getFirestore();
        const user = auth.currentUser;
        const itemsCollection = collection(db, `users/${user?.email}/items`);
        const getItems = async () => {
            const itemSnapshot = await getDocs(itemsCollection);
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
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons>
                            <IonBackButton defaultHref="/profile" />
                        </IonButtons>
                        <IonTitle>My Store</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {items.map(item => (
                            <IonItem key={item.itemId} onClick={handleCardClick}>
                                <IonCard style={{
                                    maxWidth: "70%",
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
                                        </IonCardContent>
                                    )}
                                </IonCard>
                            </IonItem>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>
        </>
    )
}
