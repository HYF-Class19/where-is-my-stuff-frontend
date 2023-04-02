import { IonActionSheet, IonAlert, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { UseAlertAction } from "../hooks/UseAlert";
import { useState } from "react";

interface ActionProps {
    isAction: boolean;
    action: string;
    onDismiss: () => void;
    onAction: (action: string) => void;
}

export const ActionSheetToDeleteAndUpdate = ({ isAction, action, onDismiss, onAction }: ActionProps) => {
    const { showDeleteWarning, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel } = UseAlertAction();
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    return (
        <>
            <IonActionSheet
                isOpen={isAction}
                onDidDismiss={onDismiss}
                header={"You have ability to delete or update this " + action}
                buttons={[
                    {
                        text: 'Delete',
                        role: 'destructive',
                        handler: handleDeleteClick,
                        data: {
                            action: 'delete'
                        }
                    },
                    {
                        text: 'Update',
                        handler: () => {
                            setShowUpdateModal(true);
                            onAction("update");
                        },
                        data: {
                            action: 'update'
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            onAction("cancel");
                        },
                        data: {
                            action: 'cancel'
                        }
                    }
                ]}
                cssClass='my-custom-class'
                mode="ios"
                translucent={true}
            ></IonActionSheet>

            <IonAlert
                isOpen={showDeleteWarning}
                onDidDismiss={handleDeleteCancel}
                header="Warning!"
                message="Are you sure you want to delete this?"
                buttons={[
                    {
                        text: "Delete",
                        cssClass: "delete-button",
                        role: 'destructive',
                        handler: () => {
                            handleDeleteConfirm();
                            onAction("delete");
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: () => {
                            handleDeleteCancel();
                            onAction("cancel");
                        },


                    },
                ]}
            />
            {/* update modal  */}
            <IonModal isOpen={showUpdateModal}
                onDidDismiss={() => setShowUpdateModal(false)}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => {
                                setShowUpdateModal(false);
                                onAction("cancel");
                            }}>
                                Cancel
                            </IonButton>
                        </IonButtons>
                        <IonTitle>
                            Update lend Out
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {
                                setShowUpdateModal(false);
                                onAction("update");
                            }}>
                                Update
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent
                    style={
                        { paddingTop: "56px" }
                    }
                >
                    <IonItem>
                        <IonLabel position="fixed">Item Name</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Description</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Lend To</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Lend Date</IonLabel>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="datetime"></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Return Date</IonLabel>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="datetime"></IonDatetime>
                        </IonModal>
                    </IonItem>
                </IonContent>
            </IonModal>
        </>
    );
}