import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react"

import { RemindersItem } from "../components/RemindersItem";
import { chevronBack, chevronForward } from "ionicons/icons";

import './styles/Reminder.css';

export const Reminder: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="icon__nav">
                        <IonButton disabled>
                            <IonIcon icon={chevronBack} />
                            back
                        </IonButton>
                    </IonButtons>
                    <IonTitle className="reminder">
                        Reminders
                    </IonTitle>
                    <IonButtons slot="end" className="icon__nav">
                        <IonButton disabled>
                            <IonIcon icon={chevronForward} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Reminder</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <RemindersItem />
            </IonContent>
        </IonPage>
    );
};