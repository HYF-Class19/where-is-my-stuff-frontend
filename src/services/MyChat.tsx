import { useEffect, useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
} from "@ionic/react";

import { getDatabase, ref, push, onValue } from "firebase/database";
import { auth } from "../database/realTimeDatabase";

interface Message {
    text: string;
    sender: string;
}

interface MyChatProps {
    chatId: string;
}

export const MyChat: React.FC<MyChatProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState("");

    const db = getDatabase();
    const user = auth.currentUser;

    const handleSend = () => {
        const chatRef = ref(db, `chats/${chatId}`);
        push(chatRef, {
            text: messageInput,
            sender: user?.uid,
        });
        setMessageInput("");
    };

    useEffect(() => {
        const chatRef = ref(db, `chats/${chatId}`);
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messages: Message[] = Object.values(data);
                setMessages(messages);
            }
        });
    }, [chatId, db]);


    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons>
                            <IonBackButton defaultHref="/profile" />
                        </IonButtons>
                        <IonTitle>My Chat</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {messages.map((message, index) => (
                            <IonItem key={index}>
                                <p>{message.text}</p>

                            </IonItem>
                        ))}
                    </IonList>
                    <IonInput
                        value={messageInput}
                        onIonChange={(e) => setMessageInput(e.detail.value!)}
                    />
                    <IonButton onClick={handleSend}>Send</IonButton>


                </IonContent>
            </IonPage>
        </>
    );
};
