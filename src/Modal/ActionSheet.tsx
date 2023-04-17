import { IonActionSheet, IonAlert, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonToast, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { UseAlertAction } from "../hooks/UseAlert";
import { useState } from "react";
import { child, remove, update } from "firebase/database";
import { dbRef, auth } from "../database/db";



interface ActionProps {
    isAction: boolean;
    action: string;
    onDismiss: () => void;
    onAction: (action: string) => void;
    id: string;
    itemName: string;
    description: string;
    borrowerName: string;
    lendingDate?: string;
    reminderDate?: string;
}

export const ActionSheetToDeleteAndUpdate = ({ isAction, action, onDismiss, onAction, ...selectedReminder }: ActionProps) => {
    const { showDeleteWarning, handleDeleteClick, handleDeleteCancel } = UseAlertAction();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [messageDelete, setMessageDelete] = useState("");
    const [messageUpdate, setMessageUpdate] = useState("");

    const user = auth.currentUser;



    const handleDelete = () => {
        const sanitizedEmail = user?.email?.replace(/[[\].#$]/g, '-') || '';
        const emailInfo = sanitizedEmail.split('@gmailcom');
        const dbRemindersRef = child(dbRef, `users/${emailInfo}/items/${selectedReminder.id}`);
        remove(dbRemindersRef).then(() => {
            setTimeout(() => {
                setMessageDelete("Item deleted successfully.");
            }, 2000)
        }).catch((error) => {
            console.error("Error deleting item:", error);
        });
    };

    const handleUpdate = () => {
        const sanitizedEmail = user?.email?.replace(/[\\[\].#$]/g, '-') || '';
        const emailInfo = sanitizedEmail.split('@gmailcom');
        const dbRemindersRef = child(dbRef, `users/${emailInfo}/items/${selectedReminder.id}`);

        const updates = {
            name: selectedReminder.itemName,
            description: selectedReminder.description,
            borrowerName: selectedReminder.borrowerName,
            lendingDate: selectedReminder.lendingDate,
            reminderDate: selectedReminder.reminderDate,
        };

        update(dbRemindersRef, updates)
            .then(() => {
                setMessageUpdate("Item updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
    };

    return (
        <>
            <IonToast
                isOpen={messageDelete !== ""}
                onDidDismiss={() => setMessageDelete("")}
                message={messageDelete}
                duration={2000}
            />
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
                            handleDelete()
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
                                handleUpdate();
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
                        <IonInput
                            value={selectedReminder.itemName}
                            onIonChange={(e) => {
                                selectedReminder.itemName = e.detail.value!;
                            }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Description</IonLabel>
                        <IonInput
                            value={selectedReminder.description}
                            onIonChange={(e) => {
                                selectedReminder.description = e.detail.value!;
                            }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Lend To</IonLabel>
                        <IonInput
                            value={selectedReminder.borrowerName}
                            onIonChange={(e) => {
                                selectedReminder.borrowerName = e.detail.value!;
                            }}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Lend Date</IonLabel>
                        <IonDatetimeButton datetime="datetime"
                        ></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="datetime"
                                value={selectedReminder.lendingDate}
                            ></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Return Date</IonLabel>
                        <IonDatetimeButton datetime="reminderTime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime id="reminderTime"
                                value={selectedReminder.reminderDate}
                            ></IonDatetime>
                        </IonModal>
                    </IonItem>
                </IonContent>
            </IonModal>
            <IonToast
                isOpen={messageUpdate !== ""}
                onDidDismiss={() => setMessageUpdate("")}
                message={messageUpdate}
                duration={1000}
            />
        </>
    );
}