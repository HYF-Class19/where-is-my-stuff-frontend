import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { dbRef, auth } from "../database/db"
import { child, onValue } from "firebase/database"

export const LendingHistory: React.FC = () => {
    const [lendingData, setLendingData] = useState<string[]>([]);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const email = currentUser?.email;
        const sanitizedEmail = email?.replace(/[\\[\].#$]/g, '-');
        const emailInfo = sanitizedEmail?.split('@gmailcom');
        const itemsRef = child(dbRef, `users/${emailInfo}/items`);

        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            const lendingDates = [];
            for (let key in data) {
                lendingDates.push(data[key].lendingDate);
            }
            setLendingData(lendingDates);
        });
    }, [currentUser?.email]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/settings"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Your History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList style={{
                    marginTop: "20px",
                    marginLeft: "20px"
                }}>
                    {lendingData.length === 0 && <IonLabel>No lending history</IonLabel>}
                    {lendingData.map((lendingDate) => (
                        <IonList style={{
                            marginTop: "20px",
                            marginLeft: "20px"
                        }} key={lendingDate}>
                            <IonLabel>
                                Lending date: {lendingDate}
                            </IonLabel>
                        </IonList>
                    ))}
                </IonList>

            </IonContent>
        </IonPage>
    );
};
