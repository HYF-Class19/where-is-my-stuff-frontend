import { IonActionSheet, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack, ellipsisHorizontal } from "ionicons/icons";

import { UseActionSheet } from '../hooks/UseActionSheet';

interface ReminderModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    itemName: string;
    description: string;
    to: string;
    on: string;
}

export const ReminderDetailsModal: React.FC<ReminderModalProps> = ({ isOpen, onDismiss, itemName, description, to, on }) => {
    const { handleActionSheet, isActionSheetOpen } = UseActionSheet();

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
                                onClick={handleActionSheet}>
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
            <IonActionSheet
                isOpen={isActionSheetOpen}
                onDidDismiss={() => handleActionSheet()}
                buttons={[
                    {
                        text: 'Delete',
                        role: 'destructive',
                        data: {
                            action: 'delete'
                        }
                    },
                    {
                        text: 'Share',
                        data: {
                            action: 'share'
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        data: {
                            action: 'cancel'
                        }
                    }
                ]}></IonActionSheet>
        </>
    );
};



