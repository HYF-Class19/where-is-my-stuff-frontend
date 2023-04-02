
import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonActionSheet,
import React from "react";
import {
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem,
    IonLabel, IonButtons, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonActionSheet, IonAlert,

} from "@ionic/react";
import { chevronBackOutline, ellipsisHorizontalOutline } from "ionicons/icons";

import { UseActionSheet } from "../hooks/UseActionSheet";
import { ActionSheetToDeleteAndUpdate } from "./ActionSheet";



interface ReminderDetailsModalProps {

  isOpen: any;
  onDismiss: () => void;
  itemName: string;
  description: string;
  to: string;
  on: string;
}

export const ReminderDetailsModal: React.FC<ReminderDetailsModalProps> = ({
  isOpen,
  onDismiss,
  itemName,
  description,
  to,
  on,
}) => {
  const [isAction, setIsAction] = useState(false);
  const [action, setAction] = useState("");

  const handleActionSheet = (action: string) => {
    setIsAction(true);
    setAction(action);
  };

  const handleActionSheetDismiss = () => {
    setIsAction(false);
  };

  function handleDeleteClick(): boolean | void | Promise<boolean | void> {
    throw new Error("Function not implemented.");
  }

  function setShowUpdateModal(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDismiss}>
                <IonIcon
                  icon={chevronBackOutline}
                  slot="icon-only"
                  color="primary"
                />
              </IonButton>
            </IonButtons>
            <IonTitle>Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => handleActionSheet("reminder")}>
                <IonIcon
                  icon={ellipsisHorizontalOutline}
                  slot="icon-only"
                  color="primary"
                />
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
          </IonList>
        </IonContent>
      </IonModal>
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
                           
                        },
                        data: {
                            action: 'update'
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            
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
    </>
  );
