import React, { useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack, ellipsisHorizontal } from "ionicons/icons";


interface ReminderModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    itemName: string;
    description: string;
    to: string;
    on: string;
}

export const ReminderDetailsModal: React.FC<ReminderModalProps> = ({ isOpen, onDismiss, itemName, description, to, on }) => {
    const [showActionSheet, setShowActionSheet] = useState(false);

    const handleDelete = () => {
        // handle delete logic here
        onDismiss();
    };

    const handleUpdate = () => {
        // handle update logic here
    };


    return (
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={onDismiss}>
                                <IonIcon icon={chevronBack}></IonIcon>
                                Back
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Details</IonTitle>
                        <IonButtons slot="end">
                            <IonButton
                                onClick={() => setShowActionSheet(true)}
                            >
                                <IonIcon icon={ellipsisHorizontal}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <h1>{itemName}</h1>
                    <IonInput value={description} />
                    <IonInput value={to} />
                    <IonInput value={on} />
                </IonContent>
            </IonModal>
        </>
    );
};


