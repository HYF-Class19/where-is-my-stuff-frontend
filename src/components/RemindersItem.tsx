import React from 'react';
import { IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from "@ionic/react";
import { chevronForward } from "ionicons/icons";

import { reminders } from "../data/MockUpData";
import { useReminder } from "../hooks/UseReminder";
// import ReminderModal from '../Modal/IonModal';

interface ReminderProps { }

export const RemindersItem: React.FC<ReminderProps> = () => {
    const { selectedReminder, isModalOpen, handleModalDismiss, handleItemClick } = useReminder();

    return (
        <div key={selectedReminder?.id}>
            <IonList>
                {reminders.map((reminder) => (
                    <React.Fragment key={reminder.id}>
                        <IonItemDivider>
                            {reminder.on}
                        </IonItemDivider>
                        <IonItem onClick={() => handleItemClick(reminder)}>
                            <IonLabel slot="end">
                                <IonIcon icon={chevronForward} />
                            </IonLabel>
                            {reminder.itemName}
                        </IonItem>
                    </React.Fragment>
                ))}
            </IonList>
            {/* <ReminderModal
                isOpen={isModalOpen}
                onDismiss={handleModalDismiss}
                itemName={selectedReminder?.itemName ?? ""}
                description={selectedReminder?.description ?? ""}
                to={selectedReminder?.to ?? ""}
                on={selectedReminder?.on ?? ""}
            /> */}
        </div>
    );
};



