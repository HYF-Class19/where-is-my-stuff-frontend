/* eslint-disable jsx-a11y/img-redundant-alt */
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonList} from '@ionic/react';

import { useState, useEffect, Key } from "react";
import { getFirestore, collectionGroup, getDocs } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

import '../services/styles/chat.css'

interface Item {
    itemId: string;
    imageUrl: string;
    name: string;
    description: string;

}

interface ChatMessage {
    id: Key | null | undefined;
    sender: string;
    message: string;
}


export const Borrow: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [, setMessages] = useState<ChatMessage[]>([]);
    // const [message, setMessage] = useState("");


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


    const handleCardClick = (itemId: string) => {
        setExpanded(!expanded);
        setMessages([]);

        const db = getDatabase();
        const chatRef = ref(db, `chats/${itemId}`);

        onValue(chatRef, (snapshot) => {
            const messages: any[] | ((prevState: string[]) => string[]) = [];
            snapshot.forEach((child) => {
                messages.push({
                    id: child.key,
                    ...child.val(),
                });
            });
            setMessages(messages);
        });
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
                        <IonItem key={item.itemId}
                            onClick={() => handleCardClick(item.itemId)}
                        >
                            <div style={{
                                maxWidth: "90%",
                                maxHeight: "100%",
                                margin: "auto",
                            }}>
                                <img alt="Item Image" src={item.imageUrl} />
                                <IonCardHeader>
                                    <IonCardTitle>{item.name}</IonCardTitle>
                                </IonCardHeader>
                                {expanded && (
                                    <>
                                        <IonCardContent>
                                            {item.description}

                                        </IonCardContent>
                                    </>
                                )}

                                {/* <IonCard>

                                    <IonItem>
                                        {messages.map((msg) => (
                                            <div key={msg.id}>
                                                <span>me{msg.sender}:</span>
                                                <span>{msg.message}</span>
                                            </div>
                                        ))}
                                    </IonItem>

                                    <IonInput
                                        type="text"
                                        value={message}
                                        onIonChange={(e) => setMessage(e.detail.value!)}

                                        placeholder="Type your message here..."
                                    />
                                <IonButton onClick={sendMessage}>Send</IonButton>
                                </IonCard> */}
                                
                            </div>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};


