import React from "react";
import {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem,
    IonLabel, IonButtons, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonActionSheet, IonAlert,
} from "@ionic/react";
import { chevronBackOutline, ellipsisHorizontalOutline } from "ionicons/icons";

import { UseActionSheet } from "../hooks/UseActionSheet";
import { ActionSheetToDeleteAndUpdate } from "./ActionSheet";



interface ReminderDetailsModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    itemName: string;
    description: string;
    to: string;
    on: string;
    dayOfReturn: string;
    id: string;
}

export const ReminderDetailsModal: React.FC<ReminderDetailsModalProps> = ({ isOpen, onDismiss, itemName, description, to, on, dayOfReturn, id}) => {
    const { showActionSheet, handleActionSheet } = UseActionSheet();

    return (
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Details</IonTitle>
                        <IonButtons slot="start">
                            <IonIcon icon={chevronBackOutline} color="primary"></IonIcon>
                            <IonButton onClick={onDismiss}>Back</IonButton>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonButton onClick={() => handleActionSheet()}>
                                <IonIcon icon={ellipsisHorizontalOutline} color="primary"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard style={{ margin: "0px" }}>
                        <IonCardHeader>
                            <IonCardTitle>{itemName}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>{description}</IonCardContent>
                    </IonCard>
                    <IonList>
                        <IonItem>
                            <IonLabel position="fixed">To</IonLabel>
                            <IonLabel>{to}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="fixed">On</IonLabel>
                            <IonLabel>{on}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="fixed">Reminder</IonLabel>
                            <IonLabel>
                                {dayOfReturn}
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
            <ActionSheetToDeleteAndUpdate
                isAction={showActionSheet}
                action="reminder"
                onDismiss={() => handleActionSheet()}
                onAction={(action) => console.log(action)}
                id={id}
                itemName={itemName}
                description={description}
                borrowerName={to}
                lendingDate={on}
                reminderDate={dayOfReturn}
                 />
        </>
    );
};
