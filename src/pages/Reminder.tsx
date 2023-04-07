import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { RemindersItem } from "../components/RemindersItem";

import './styles/Reminder.css';

export const Reminder: React.FC = () => {

    return (
        <div>
            <IonPage className="reminder-container">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="reminder-title" id="reminder">
                            Reminders
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <RemindersItem />
                </IonContent>
            </IonPage>
        </div>
    );
};